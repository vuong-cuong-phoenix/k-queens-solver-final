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

            <!-- Chich nhau icon -->
            <div class="flex items-center justify-center w-full px-4 mt-8 md:w-2/12 md:mt-0">
                <svg
                    class="w-20 h-20 md:w-32 md:h-32 generate-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 334.505 334.505"
                >
                    <defs>
                        <linearGradient
                            id="generateGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop
                                offset="0%"
                                style="stop-color:#7F7FD5;stop-opacity:1"
                            />
                            <stop
                                offset="50%"
                                style="stop-color:#86A8E7;stop-opacity:1"
                            />
                            <stop
                                offset="100%"
                                style="stop-color:#91EAE4;stop-opacity:1"
                            />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#generateGradient)"
                        d="M332.406 162.328l-98.98-95.048c-8.067-7.75-21.187-7.748-29.254-.002-4 3.838-6.2 8.963-6.2 14.428 0 5.465 2.2 10.588 6.2 14.427v-.002l74.061 71.12-74.066 71.117c-3.994 3.842-6.193 8.97-6.193 14.437 0 5.463 2.2 10.585 6.2 14.423 4.033 3.872 9.332 5.81 14.626 5.808 5.294 0 10.593-1.937 14.619-5.811l98.987-95.049c1.34-1.287 2.099-3.065 2.099-4.924 0-1.858-.759-3.637-2.099-4.924zm-108.445 95.057c-2.794 2.695-7.526 2.683-10.334-.002-1.287-1.241-2-2.867-2-4.581 0-1.715.713-3.345 2-4.588l79.186-76.034c1.34-1.289 2.099-3.067 2.099-4.925s-.759-3.637-2.099-4.924l-79.186-76.044v-.002c-1.287-1.239-2-2.864-2-4.577 0-1.715.713-3.342 2-4.581 1.399-1.347 3.287-2.021 5.173-2.021 1.881 0 3.767.672 5.166 2.019l93.862 90.129-93.867 90.131z"
                    />
                    <path
                        fill="url(#generateGradient)"
                        d="M230.006 162.328l-98.98-95.051c-8.067-7.743-21.187-7.745-29.254.002-4 3.838-6.2 8.963-6.2 14.428 0 5.465 2.2 10.588 6.2 14.427v-.002l74.061 71.12-74.066 71.117c-3.994 3.842-6.193 8.97-6.193 14.437 0 5.463 2.2 10.585 6.2 14.423 4.033 3.871 9.327 5.806 14.626 5.806 5.301 0 10.593-1.935 14.626-5.81l98.98-95.049c1.34-1.287 2.099-3.065 2.099-4.924 0-1.858-.759-3.637-2.099-4.924zm-108.433 95.053c-2.799 2.693-7.545 2.691-10.346.002-1.287-1.241-2-2.867-2-4.581 0-1.715.713-3.345 2-4.588l79.186-76.034c1.34-1.289 2.099-3.067 2.099-4.925s-.759-3.637-2.099-4.924l-79.186-76.044v-.002c-1.287-1.239-2-2.864-2-4.577 0-1.715.713-3.342 2-4.581 1.399-1.347 3.287-2.021 5.173-2.021 1.888 0 3.773.672 5.175 2.017l93.853 90.127-93.855 90.131z"
                    />
                    <path
                        fill="url(#generateGradient)"
                        d="M134.434 162.328l-98.98-95.053c-8.067-7.738-21.2-7.731-29.254.003-4 3.839-6.2 8.964-6.2 14.429s2.2 10.588 6.199 14.427v-.002l74.061 71.12-74.066 71.117C2.2 242.211 0 247.339 0 252.806c0 5.463 2.2 10.585 6.2 14.423 4.026 3.869 9.325 5.804 14.619 5.803 5.301 0 10.6-1.935 14.635-5.806l98.98-95.049c1.34-1.287 2.099-3.065 2.099-4.924 0-1.859-.759-3.638-2.099-4.925zm-108.435 95.05c-2.852 2.737-7.492 2.737-10.346.003-1.287-1.241-2-2.867-2-4.581 0-1.715.713-3.345 2-4.588l79.186-76.034c1.34-1.289 2.099-3.067 2.099-4.925 0-1.859-.759-3.637-2.099-4.924L15.654 86.286v-.002c-1.287-1.239-2-2.864-2-4.577 0-1.715.713-3.342 2-4.581 1.427-1.369 3.299-2.051 5.173-2.051s3.746.684 5.173 2.051l93.855 90.126-93.856 90.126z"
                    />
                </svg>
            </div>

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
                                v-for="k in kNumberList"
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

                <div class="w-1/12">
                    <svg
                        class="w-8 h-auto mx-auto md:w-1/2 processing-icon"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clip-rule="evenodd"
                            d="M32 16.009c0-.267-.11-.522-.293-.714l-9.899-9.999c-.391-.395-1.024-.394-1.414 0-.391.394-.391 1.034 0 1.428l8.193 8.275H1c-.552 0-1 .452-1 1.01s.448 1.01 1 1.01h27.586l-8.192 8.275c-.391.394-.39 1.034 0 1.428.391.394 1.024.394 1.414 0l9.899-9.999c.187-.189.29-.449.293-.714z"
                            fill="#121313"
                            fill-rule="evenodd"
                        />
                    </svg>
                </div>

                <!-- Game actions -->
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

                <div class="w-1/12">
                    <svg
                        class="w-8 h-auto mx-auto md:w-1/2 processing-icon"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clip-rule="evenodd"
                            d="M32 16.009c0-.267-.11-.522-.293-.714l-9.899-9.999c-.391-.395-1.024-.394-1.414 0-.391.394-.391 1.034 0 1.428l8.193 8.275H1c-.552 0-1 .452-1 1.01s.448 1.01 1 1.01h27.586l-8.192 8.275c-.391.394-.39 1.034 0 1.428.391.394 1.024.394 1.414 0l9.899-9.999c.187-.189.29-.449.293-.714z"
                            fill="#121313"
                            fill-rule="evenodd"
                        />
                    </svg>
                </div>

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
            </div>

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
        </div>
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
        //---------------- Essentials ----------------
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

        const kNumber = ref<number>(4);
        const kNumberList: number[] = [];
        for (let i = 4; i <= 20; ++i) {
            kNumberList.push(i);
        }

        const edgeLength = ref<number>(2.5);

        const crossOverPoint = ref<number>(Math.floor(kNumber.value / 2 - 1));

        const isSolving = ref<boolean>(false);
        const isSolved = ref<boolean>(false);
        const isRunning = ref<boolean>(false);
        const solveError = ref<{ checked: boolean; message: string }>({ checked: false, message: "" });
        const solvedTime = ref<number>(0);
        const countGeneration = ref<number>(-1);

        // Core
        const generations = ref<interfaces.Individual[]>([]);
        // Initialize state
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
        const initialState = ref<interfaces.Position[]>([]);
        for (let i = 1; i <= kNumber.value; ++i) {
            initialState.value.push({
                x: i,
                y: 1,
            });
        }
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

        // Template references
        const parentRefs = ref<Vue[]>([]);
        const individualRef = ref<Vue>();
        const countGenerationRef = ref<Element>();

        function reset() {
            if (generations.value.length !== 0) {
                isSolved.value = false;
                solveError.value = {
                    checked: false,
                    message: "",
                };

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
                });
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

        // Animate whenever getting a solution
        watch(generations, (curr) => {
            console.log("[watch] 'generations' changed...");
            if (curr.length === 0) {
                return;
            }

            isRunning.value = true;

            countGeneration.value = -1;

            // Start animations
            timelines.generateIcon.play();

            curr.forEach((gen) => {
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
        });

        const kNumberComputed = computed({
            get: () => kNumber.value,
            set: (value: number) => {
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

        // Change animation's speed
        watch(speed, (curr) => {
            console.log("[watch] 'speed' changed...");
            timelines.boards.timeScale(curr);
            timelines.generateIcon.timeScale(curr);
        });

        onMounted(() => {
            // Initialize animation for 'generateIcon'
            timelines.generateIcon.to("#generateGradient stop", {
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
            kNumber,
            kNumberList,
            kNumberComputed,
            edgeLength,
            isSolving,
            isSolved,
            isRunning,
            solveError,
            solvedTime,
            countGeneration,
            speedComputed,
            currentIndividual,
            parentsComputed,
            parentRefs,
            individualRef,
            countGenerationRef,
            solve,
            reset,
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

@media only screen and (max-width: 768px) {
    .chessboard-parent {
        padding: 1rem !important;
    }
}

@media only screen and (min-width: 768px) {
    .generate-icon,
    .processing-icon {
        transform: rotate(0);
    }
}
</style>
