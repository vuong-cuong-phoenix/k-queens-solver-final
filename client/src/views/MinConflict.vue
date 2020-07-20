<template>
    <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4 md:w-8/12">
            <!-- ref="boardContainerRef" -->
            <!-- Main Chess's board -->
            <ChessBoard
                class="mx-auto"
                :style="{
                    marginTop: (edgeLength * 1.5) + 'rem',
                }"
                :showLegends="true"
                :kNumber="kNumber"
                :edgeLength="edgeLength"
            />

            <div class="mt-10 space-y-3 ">
                <div class="flex flex-col items-center justify-around space-y-4 md:flex-row md:space-y-0">
                    <!-- Input 'kNumber' -->
                    <div class="w-full text-center space-x-2 md:w-4/12 md:text-right">
                        <span class="text-lg font-semibold">K</span>
                        <span> = </span>
                        <div class="relative inline-block">
                            <select
                                v-model.number="kNumber"
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

                    <div class="w-full md:w-1/12">
                        <ArrowIcon class="w-8 h-auto mx-auto md:w-1/2 processing-icon" />
                    </div>

                    <!-- Game actions -->
                    <div class="w-full md:w-3/12 space-y-2">
                        <div class="flex items-center justify-center text-center space-x-2 md:flex-col md:space-x-0 md:space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
                            <button
                                class="shadow-md btn btn-primary"
                                @click="randomize"
                                :disabled="isSolving || isRunning"
                            >Randomize</button>

                            <button
                                class="shadow-md btn btn-primary"
                                @click="reset"
                                :disabled="!isSolved || isRunning"
                            >Reset</button>
                        </div>

                        <div class="text-center space-x-2">
                            <button
                                class="shadow-md btn btn-success"
                                @click="solve"
                                :disabled="isSolving"
                            >Solve</button>
                        </div>
                    </div>

                    <div class="w-full md:w-1/12">
                        <ArrowIcon class="w-8 h-auto mx-auto md:w-1/2 processing-icon" />
                    </div>

                    <div class="flex items-center justify-center w-full md:w-4/12 md:justify-start">
                        <div class="flex items-center justify-center w-full md:w-4/12 md:justify-start">
                            <Spinner v-if="isSolving && !isSolved"></Spinner>

                            <div
                                v-if="!isSolving && isSolved && !solveError.checked"
                                class="text-center"
                            >
                                <div class="flex md:flex-col">
                                    <span class="text-lg font-semibold">Solved in:</span>
                                    <span>
                                        <span class="ml-2 font-semibold text-blue-700">{{ solvedTime }}</span>
                                        <span class="ml-1 italic">seconds</span>
                                    </span>
                                </div>
                                <div class="text-lg font-semibold">
                                    <span class="text-blue-700">{{ steps.length }}</span>
                                    <span class="ml-1">moves</span>
                                </div>
                            </div>

                            <div v-if="solveError.checked && !isSolving">
                                <span class="text-lg font-semibold text-red-600">{{ solveError.message }}</span>
                            </div>
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

        <!-- List of steps -->
        <div class="w-full px-4 md:w-4/12">
            <ListMoves
                :steps="steps"
                @moveRefsChanged="(refs) => moveRefs = refs"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    watch,
    reactive,
    onMounted,
    watchEffect,
    onBeforeUnmount,
} from "@vue/composition-api";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import gsap from "gsap";
import axios, { AxiosResponse } from "axios";
import { bus } from "@/main";
import * as interfaces from "@/interfaces/interfaces";
import ChessBoard from "@/components/ChessBoard/ChessBoard.vue";
import ListMoves from "@/components/ListMoves/ListMoves.vue";

export default defineComponent({
    name: "MinConflict",

    components: {
        VueSlider,
        ChessBoard,
        ListMoves,
    },

    setup() {
        //---------------- Essentials ----------------
        const timelines = reactive({
            queens: gsap.timeline({
                default: {
                    ease: "none",
                    force3D: false,
                },
            }),
            moves: gsap.timeline({
                default: {
                    ease: "none",
                    force3D: false,
                },
            }),
        });

        const kNumber = ref<number>(8);
        const kNumberList: number[] = [];
        for (let i = 4; i <= 20; ++i) {
            kNumberList.push(i);
        }

        const edgeLength = ref<number>(3.5);

        const isSolving = ref<boolean>(false);
        const isSolved = ref<boolean>(false);
        const isRunning = ref<boolean>(false);
        const solveError = ref<{ checked: boolean; message: string }>({ checked: false, message: "" });
        const solvedTime = ref<number>(0);

        //---------------- Default's state ----------------
        const defaultY = 1;
        function generateDefaultState(k: number) {
            const result: interfaces.Position[] = [];
            for (let i = 1; i <= k; ++i) {
                result.push({
                    x: i,
                    y: defaultY,
                });
            }

            return result;
        }

        //---------------- Solving's logics ----------------
        const currentState = ref<interfaces.Position[]>(generateDefaultState(kNumber.value));

        const steps = ref<interfaces.Step[]>([]);

        //---------------- Animation's speed ----------------
        const baseDuration = 0.5;
        const speed = ref<number>(1);
        const speedMaxValue = 50;
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

        //---------------- Template's references ----------------
        const queenRefs = ref<Element[]>([]);
        bus.$on("queenRefs", (refs: Element[]) => (queenRefs.value = refs));

        const listMovesRef = ref<Element>();
        bus.$on("listMovesRef", (ref: Element) => (listMovesRef.value = ref));

        const moveRefs = ref<Element[]>([]);

        //---------------- Functionalities ----------------
        function resetMoves() {
            if (moveRefs.value.length !== 0) {
                gsap.to(moveRefs.value, {
                    opacity: 0,
                    duration: 0.25,
                    onComplete: () => {
                        steps.value = [];
                    },
                });
            }
        }

        function randomize() {
            isSolved.value = false;
            isRunning.value = true;
            solveError.value = {
                checked: false,
                message: "",
            };

            currentState.value = [];
            for (let col = 1; col <= kNumber.value; ++col) {
                const row = Math.floor(Math.random() * (kNumber.value - 1)) + 1;

                gsap.to(queenRefs.value[col - 1], {
                    // x: `${col * edgeLength.value}rem`,
                    y: `${(row - defaultY) * edgeLength.value}rem`,
                    ease: "none",
                    duration: 0.5,
                    force3D: false,
                    onComplete: () => {
                        isRunning.value = false;
                    },
                });

                currentState.value.push({
                    x: col,
                    y: row,
                });
            }

            resetMoves();
        }

        function reset() {
            isSolved.value = false;
            isRunning.value = true;
            solveError.value = {
                checked: false,
                message: "",
            };

            gsap.to(queenRefs.value, {
                // x: 0,
                y: 0,
                ease: "none",
                duration: 0.25,
                force3D: false,
                onComplete: () => {
                    currentState.value = generateDefaultState(kNumber.value);
                    isRunning.value = false;
                },
            });

            resetMoves();
        }

        async function solve() {
            steps.value = [];

            const postData: interfaces.MinConflictPostRequest = {
                k: kNumber.value,
                initState: currentState.value.map((pos) => pos.y - 1),
                iteration: 1000 * kNumber.value,
            };

            isSolving.value = true;
            isSolved.value = false;
            solveError.value = {
                checked: false,
                message: "",
            };

            try {
                const response: AxiosResponse<interfaces.MinConflictPostResponse> = await axios.post(
                    "/min-conflict",
                    postData
                );

                solvedTime.value = +response.data.time.toFixed(4);
                steps.value = response.data.steps;

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

        //---------------- Watchers ----------------
        // Reset 'currentState' whenever 'kNumber' change
        watch(kNumber, (curr) => {
            console.log("[watch] 'kNumber' changed...");

            switch (true) {
                case curr <= 4: {
                    edgeLength.value = 4;
                    break;
                }
                case curr > 4 && curr <= 8: {
                    edgeLength.value = 3.5;
                    break;
                }
                case curr > 8 && curr <= 11: {
                    edgeLength.value = 3;
                    break;
                }
                case curr > 11 && curr <= 14: {
                    edgeLength.value = 2.5;
                    break;
                }
                case curr > 14 && curr <= 17: {
                    edgeLength.value = 2;
                    break;
                }
                case curr > 17 && curr <= 20: {
                    edgeLength.value = 1.75;
                    break;
                }
                default: {
                    edgeLength.value = 1.25;
                    break;
                }
            }

            reset();
        });

        // Animate whenever solved a solution
        watch(steps, (curr) => {
            console.log("[watch] 'steps' changed...");
            if (curr.length === 0) {
                return;
            }

            isRunning.value = true;

            curr.forEach((step) => {
                timelines.queens.to(queenRefs.value[step.choice.x - 1], {
                    duration: 0,
                    color: "#2b6cb0",
                });
                timelines.queens.to(queenRefs.value[step.choice.x - 1], {
                    //x: `${step.choice.x * edgeLength.value}rem`,
                    y: `${(step.choice.y - defaultY) * edgeLength.value}rem`,
                    duration: baseDuration,
                });
                timelines.queens.to(queenRefs.value[step.choice.x - 1], {
                    //x: `${step.choice.x * edgeLength.value}rem`,
                    //duration: baseDuration,
                    duration: 0,
                    color: "#000000",
                });
            });

            timelines.queens.eventCallback("onComplete", () => {
                currentState.value = generateDefaultState(kNumber.value);
                isRunning.value = false;
            });
        });

        watch(moveRefs, (curr) => {
            console.log("[watch] 'moveRefs' changed...");
            curr.forEach((element) => {
                timelines.moves.to(element, {
                    display: "flex",
                    duration: 0,
                    onComplete: () => {
                        listMovesRef.value!.scrollTop = listMovesRef.value!.scrollHeight;
                    },
                });
                timelines.moves.to(element, {
                    opacity: 1,
                    duration: baseDuration,
                });
            });
        });

        // Change animation's speed
        watch(speed, (curr) => {
            console.log("[watch] 'speed' changed...");
            timelines.queens.timeScale(curr);
            timelines.moves.timeScale(curr);
        });

        onBeforeUnmount(() => {
            timelines.queens.kill();
            timelines.moves.kill();
        });

        return {
            kNumber,
            kNumberList,
            edgeLength,
            isSolving,
            isSolved,
            isRunning,
            solveError,
            solvedTime,
            steps,
            speedComputed,
            listMovesRef,
            moveRefs,
            randomize,
            reset,
            solve,
        };
    },
});
</script>

<style scoped>
.processing-icon {
    transform: rotate(90deg);
}

@media only screen and (min-width: 768px) {
    .processing-icon {
        transform: rotate(0);
    }
}
</style>
