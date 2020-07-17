<template>
    <div>
        <div class="flex flex-wrap mt-4 -mx-4">
            <!-- 2 Parents -->
            <div class="w-full px-4 md:w-5/12">
                <div class="flex flex-wrap -m-4">
                    <div
                        v-for="i in 2"
                        :key="i"
                        class="w-6/12 md:w-full chessboard-parent"
                        :style="{
                            padding: (edgeLength * 1.5) + 'rem',
                        }"
                    >
                        <ChessBoard
                            ref="parentRefs"
                            class="mx-auto"
                            :kNumber="kNumber"
                            :edgeLength="edgeLength"
                            :isStatic="true"
                            :initPosition="parentsComputed[i - 1].state"
                        />
                    </div>
                </div>
            </div>
            <!-- END 2 Parents -->

            <!-- 'Chich nhau' icon -->
            <div class="flex items-center justify-center w-full px-4 mt-8 md:w-2/12 md:mt-0">
                <GenerateIcon class="w-20 h-20 md:w-32 md:h-32 generate-icon" />
            </div>
            <!-- END 'Chich nhau' icon -->

            <!-- Individual -->
            <div class="flex items-center justify-center w-full px-4 mt-8 md:w-5/12 md:mt-0">
                <ChessBoard
                    ref="individualRef"
                    class="mx-auto"
                    :kNumber="kNumber"
                    :edgeLength="edgeLength * 1.5"
                    :isStatic="true"
                    :initPosition="currentIndividual.state"
                />
            </div>
            <!-- END Individual -->
        </div>

        <!-- Game actions -->
        <div class="mt-10 space-y-4">
            <div class="flex flex-col items-center justify-around space-y-4 md:flex-row md:space-y-0 game-actions__cores">
                <!-- Input 'kNumber' -->
                <div class="w-full text-center md:w-4/12 md:text-right space-x-2">
                    <span class="text-lg font-semibold">K</span>
                    <span> = </span>
                    <div class="relative inline-block">
                        <select
                            v-model.number="kNumberComputed"
                            class="block w-full px-4 py-2 pr-8 text-center bg-white border border-gray-700 rounded-lg appearance-none focus:outline-none"
                        >
                            <option
                                v-for="k in generateListKNumber(4, 20, 1)"
                                :key="k"
                            >{{ k }}</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg
                                class="w-4 h-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
                <!-- END Input 'kNumber' -->

                <div class="w-1/12">
                    <ArrowIcon class="w-8 h-auto mx-auto md:w-1/2 processing-icon" />
                </div>

                <!-- Game action's buttons -->
                <div class="flex items-center justify-center w-full text-center space-x-4 md:w-2/12 md:flex-col md:space-x-0 md:space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0">
                    <button
                        class="shadow-md btn btn-primary"
                        @click="reset"
                        :disabled="!isSolved || isRunning"
                    >Reset</button>

                    <button
                        class="shadow-md btn btn-success"
                        @click="solve"
                        :disabled="isSolving"
                    >Solve</button>
                </div>
                <!-- END Game action's buttons -->

                <div class="w-1/12">
                    <ArrowIcon class="w-8 h-auto mx-auto md:w-1/2 processing-icon" />
                </div>

                <!-- Results -->
                <div class="flex items-center justify-center w-full md:w-4/12 md:justify-start">
                    <Spinner v-if="isSolving && !isSolved"></Spinner>

                    <div v-if="!isSolving && isSolved && !solveError.checked">
                        <div>
                            <span class="text-lg font-semibold">Solved in:</span>
                            <span class="ml-2 font-semibold text-blue-700">{{ solvedTime }}</span>
                            <span class="ml-1 italic">seconds</span>
                        </div>
                        <div
                            ref="countGenerationRef"
                            class="text-lg font-semibold text-center opacity-0"
                        >
                            <span class="">Generation</span>
                            <span class="ml-1 text-blue-700">#{{ countGeneration }}</span>
                        </div>
                    </div>

                    <div v-if="solveError.checked && !isSolving">
                        <span class="text-lg font-semibold text-red-600">{{ solveError.message }}</span>
                    </div>
                </div>
                <!-- END Results -->
            </div>

            <!-- Speed Slider -->
            <div class="flex items-center w-full pb-4 mx-auto sm:w-8/12 xl:w-6/12 space-x-4">
                <span class="font-semibold">Speed: </span>
                <VueSlider
                    class="flex-grow"
                    v-model="speedComputed"
                    :data="['0.25x', '0.5x', '1x', '2x', '3x', '4x', '∞']"
                    :marks="true"
                    :absorb="true"
                    :lazy="true"
                />
                <font-awesome-icon
                    :icon="['fas', 'running']"
                    size="lg"
                    class="text-blue-600"
                ></font-awesome-icon>
            </div>
            <!-- END Speed Slider -->
        </div>
        <!-- END Game actions -->
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    computed,
    watch,
    onBeforeUpdate,
    onBeforeUnmount,
} from "@vue/composition-api";
import gsap from "gsap";
import axios, { AxiosResponse } from "axios";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import ChessBoard from "@/components/ChessBoard/ChessBoard.vue";
import Spinner from "@/components/UI/Spinner/Spinner.vue";
import * as interfaces from "@/interfaces/interfaces";

export default defineComponent({
    name: "GeneticAlgorithm",
    components: {
        VueSlider,
        ChessBoard,
        Spinner,
    },

    setup() {
        //-------------------------------- GSAP's Timelines --------------------------------//
        const timelines = reactive({
            boards: gsap.timeline({
                default: {
                    ease: "none",
                    force3D: false,
                },
            }),
            generateIcon: gsap.timeline({
                default: {
                    repeat: -1,
                    repeatDelay: 0.5,
                    yoyo: true,
                    force3D: false,
                },
            }),
        });
        //-------------------------------- Helper functions --------------------------------//
        function generateDefaultState(k: number) {
            const result: interfaces.Position[] = [];
            for (let i = 1; i <= k; ++i) {
                result.push({
                    x: i,
                    y: 1,
                });
            }
            return result;
        }

        function generateListKNumber(start: number, end: number, step = 1) {
            return new Array<number>(Math.floor((end - start) / step) + 1)
                .fill(start)
                .map((value, index) => value + index * step);
        }

        //-------------------------------- Data --------------------------------//
        const kNumber = ref<number>(4);
        const edgeLength = ref<number>(2.5);
        const crossOverPoint = ref<number>(Math.floor(kNumber.value / 2 - 1));

        const isSolving = ref<boolean>(false);
        const isSolved = ref<boolean>(false);
        const isRunning = ref<boolean>(false);
        const solveError = ref<{ checked: boolean; message: string }>({ checked: false, message: "" });
        const solvedTime = ref<number>(0);
        const countGeneration = ref<number>(-1);

        // Cores
        const generations = ref<interfaces.Individual[]>([]);
        const currentIndividual = ref<interfaces.Individual>({
            state: generateDefaultState(kNumber.value),
            fitnessValue: 0,
            parents: [],
        });
        // Handle when 'parents' = []
        const parentsComputed = computed(() => {
            if (currentIndividual.value.parents.length === 0) {
                return [{ ...currentIndividual.value }, { ...currentIndividual.value }] as [
                    interfaces.Individual,
                    interfaces.Individual
                ];
            } else {
                return currentIndividual.value.parents;
            }
        });

        // Handle before 'kNumber' changed
        const kNumberComputed = computed({
            get: () => kNumber.value,
            set: (value: number) => {
                isSolved.value = false;
                solveError.value = {
                    checked: false,
                    message: "",
                };

                generations.value = [];
                currentIndividual.value = {
                    state: generateDefaultState(value),
                    fitnessValue: 0,
                    parents: [],
                };

                switch (true) {
                    case value <= 4: {
                        edgeLength.value = 2.5;
                        break;
                    }
                    case value > 4 && value <= 7: {
                        edgeLength.value = 2;
                        break;
                    }
                    case value > 7 && value <= 10: {
                        edgeLength.value = 1.5;
                        break;
                    }
                    case value > 10 && value <= 13: {
                        edgeLength.value = 1.25;
                        break;
                    }
                    case value > 13 && value <= 16: {
                        edgeLength.value = 1;
                        break;
                    }
                    case value > 16 && value <= 20: {
                        edgeLength.value = 0.75;
                        break;
                    }
                    default: {
                        edgeLength.value = 0.5;
                        break;
                    }
                }

                kNumber.value = value;
            },
        });

        // Speed
        const baseDuration = 1;
        const speed = ref<number>(1);
        const speedMaxValue = 200;
        const speedComputed = computed({
            get: () => {
                if (speed.value === speedMaxValue) {
                    return "∞";
                } else {
                    return speed.value + "x";
                }
            },
            set: (value) => {
                if (value === "∞") {
                    speed.value = speedMaxValue;
                } else {
                    speed.value = parseFloat(value);
                }
            },
        });

        //-------------------------------- Template references --------------------------------//
        const parentRefs = ref<Vue[]>([]);
        const individualRef = ref<Vue>();
        const countGenerationRef = ref<Element>();

        //-------------------------------- Outsourced functions --------------------------------//
        function animateResetting() {
            const resetTimeline = gsap.timeline({
                defaults: {
                    force3D: false,
                },
            });

            resetTimeline.to([parentRefs.value[0].$el, parentRefs.value[1].$el, individualRef.value!.$el], {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    currentIndividual.value = {
                        state: generateDefaultState(kNumber.value),
                        fitnessValue: 0,
                        parents: [],
                    };
                    generations.value = [];
                },
            });

            resetTimeline.to([parentRefs.value[0].$el, parentRefs.value[1].$el, individualRef.value!.$el], {
                opacity: 1,
                duration: 1,
                onComplete: () => {
                    resetTimeline.kill();
                },
            });
        }

        function animateGenerationsAfterSolved(gens: interfaces.Individual[]) {
            countGeneration.value = -1;

            // Start animations
            timelines.generateIcon.play();

            gens.forEach((gen) => {
                // Hide all first
                timelines.boards.to(
                    [
                        parentRefs.value[0].$el,
                        parentRefs.value[1].$el,
                        individualRef.value!.$el,
                        countGenerationRef.value!,
                    ],
                    {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            currentIndividual.value = gen;
                            countGeneration.value++;
                        },
                    }
                );
                // Dummy animation to delay before animate Parents
                timelines.boards.to(individualRef.value!.$el, { duration: 0.25 });
                // Then animate Parents
                timelines.boards.to([parentRefs.value[0].$el, parentRefs.value[1].$el, countGenerationRef.value!], {
                    opacity: 1,
                    duration: baseDuration,
                });
                // Dummy animation to delay before animate Individual
                timelines.boards.to(individualRef.value!.$el, { duration: 0.25 });
                // Finally animate Individual
                timelines.boards.to(individualRef.value!.$el, { opacity: 1, duration: baseDuration });
            });

            timelines.boards.eventCallback("onComplete", () => {
                timelines.generateIcon.paused(true);
                isRunning.value = false;
            });
        }

        //-------------------------------- Methods --------------------------------//
        function reset() {
            console.log("[method] Reseting...");

            isSolved.value = false;
            solveError.value = {
                checked: false,
                message: "",
            };

            if (generations.value.length !== 0) {
                animateResetting();
            }
        }

        async function solve() {
            console.log("[method] Solving...");

            isSolving.value = true;
            isSolved.value = false;
            solveError.value = {
                checked: false,
                message: "",
            };

            const postData: interfaces.GeneticAlgorithmPostRequest = {
                k: kNumber.value,
            };
            try {
                const response: AxiosResponse<interfaces.GeneticAlgorithmPostResponse> = await axios.post(
                    "/genetic-algorithm",
                    postData
                );

                solvedTime.value = +response.data.time.toFixed(4);
                generations.value = response.data.generations;

                isSolving.value = false;
                isSolved.value = true;
            } catch (err) {
                console.error(err);

                isSolving.value = false;
                isSolved.value = true;
                solveError.value = {
                    checked: true,
                    message: err,
                };
            }
        }

        //-------------------------------- Watchers --------------------------------//
        // Animate whenever getting a solution
        watch(generations, (curr) => {
            console.log("[watch] 'generations' changed...");

            if (curr.length === 0) {
                return;
            }

            isRunning.value = true;

            animateGenerationsAfterSolved(curr);
        });

        // Change animation's speed
        watch(speed, (curr) => {
            console.log("[watch] 'speed' changed...");

            timelines.boards.timeScale(curr);
            timelines.generateIcon.timeScale(curr);
        });

        //-------------------------------- Lifecycles --------------------------------//
        onMounted(() => {
            // Initialize animation for 'GenerateIcon'
            timelines.generateIcon.to("#generateIconGradient stop", {
                repeat: -1,
                repeatDelay: baseDuration,
                yoyo: true,
                stopColor: "#ff80b3",
            });
            timelines.generateIcon.paused(true);
        });

        onBeforeUnmount(() => {
            timelines.boards.kill();
            timelines.generateIcon.kill();
        });

        return {
            generateListKNumber,
            kNumber,
            kNumberComputed,
            edgeLength,
            isSolving,
            isSolved,
            isRunning,
            solveError,
            solvedTime,
            countGeneration,
            currentIndividual,
            solve,
            reset,
            speedComputed,
            parentsComputed,
            parentRefs,
            individualRef,
            countGenerationRef,
        };
    },
});
</script>

<style scoped>
.game-actions__cores {
    min-height: 3.5rem;
}

.generate-icon,
.processing-icon {
    transform: rotate(90deg);
}

@media (max-width: 768px) {
    .chessboard-parent {
        padding: 1rem !important;
    }
}

@media (min-width: 768px) {
    .generate-icon,
    .processing-icon {
        transform: rotate(0);
    }
}
</style>
