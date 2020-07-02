<template>
    <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4 md:w-8/12">
            <!-- Main Chess's board -->
            <ChessBoard
                class="mx-auto mt-16 md:mt-24"
                :showLegends="true"
                :kNumber="kNumber"
                :edgeLength="edgeLength"
                :steps="steps"
            />

            <!-- Game actions -->
            <div class="mt-10 space-y-3 ">
                <div class="text-center space-x-2">
                    <button
                        class="shadow-md btn btn-primary"
                        @click="randomize"
                    >Randomize</button>

                    <button
                        class="shadow-md btn btn-primary"
                        @click="reset"
                    >Reset</button>
                </div>

                <div class="text-center space-x-2">
                    <button
                        class="shadow-md btn btn-success"
                        @click="solve"
                    >Solve</button>
                </div>

                <div class="flex items-center w-full pb-4 mx-auto sm:w-8/12 xl:w-6/12 space-x-4">
                    <span class="font-semibold">Speed: </span>
                    <VueSlider
                        class="flex-grow"
                        v-model="speedComputed"
                        :data="['0.25x', '0.5x', '1x', '2x', '3x', '4x']"
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
            <ListMoves :steps="steps" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "@vue/composition-api";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import gsap from "gsap";
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
        // Initial objects
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

        // Essentials
        const kNumber = ref<number>(4);

        const edgeLength = ref<number>(4);

        const steps = ref<interfaces.Step[]>([
            {
                conflicts: [],
                queen: 1,
                destination: {
                    x: 1,
                    y: 2,
                },
            },
            {
                conflicts: [],
                queen: 2,
                destination: {
                    x: 2,
                    y: 4,
                },
            },
            {
                conflicts: [],
                queen: 3,
                destination: {
                    x: 3,
                    y: 1,
                },
            },
            {
                conflicts: [],
                queen: 4,
                destination: {
                    x: 4,
                    y: 3,
                },
            },
        ]);

        // Speed
        const baseDuration = 0.5;
        const speed = ref<number>(1);
        const speedComputed = computed({
            get: () => {
                return speed.value + "x";
            },
            set: (value) => {
                speed.value = parseFloat(value);
            },
        });

        // Template references
        const queens = ref<Element[] | Vue[]>([]);
        bus.$on("queensMinConflict", (queensRef: Element[] | Vue[]) => (queens.value = queensRef));

        const moves = ref<Element[] | Vue[]>([]);
        bus.$on("movesMinConflict", (movesRef: Element[] | Vue[]) => (moves.value = movesRef));

        // Helper functions
        function resetMoves() {
            steps.value.forEach((_, index) => {
                gsap.to((moves.value[index] as Vue).$el, {
                    opacity: 0,
                    duration: 0.25,
                });
            });
        }

        // Game actions
        function randomize() {
            for (let col = 1; col <= kNumber.value; ++col) {
                const row = Math.floor(Math.random() * (kNumber.value - 1)) + 1;

                gsap.to(queens.value[col - 1], {
                    x: `${col * edgeLength.value}rem`,
                    y: `${row * edgeLength.value}rem`,
                    ease: "none",
                    duration: 0.5,
                    force3D: false,
                });
            }

            resetMoves();
        }

        function reset() {
            for (let i = 0; i < kNumber.value; ++i) {
                gsap.to(queens.value[i], {
                    x: 0,
                    y: 0,
                    ease: "none",
                    duration: 0.25,
                    force3D: false,
                });
            }

            resetMoves();
        }

        function solve() {
            steps.value.forEach((step, index) => {
                timelines.queens.to(queens.value[step.queen - 1], {
                    x: `${step.destination.x * edgeLength.value}rem`,
                    y: `${step.destination.y * edgeLength.value}rem`,
                    duration: baseDuration,
                });

                timelines.moves.to((moves.value[index] as Vue).$el, {
                    opacity: 1,
                    duration: baseDuration,
                });
            });
        }

        // Funtionalities
        watch(speed, (curr) => {
            timelines.queens.timeScale(curr);
            timelines.moves.timeScale(curr);
        });

        return {
            kNumber,
            edgeLength,
            steps,
            speed,
            speedComputed,
            randomize,
            reset,
            solve,
        };
    },
});
</script>
