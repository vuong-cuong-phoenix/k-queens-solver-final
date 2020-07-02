<template>
    <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4 md:w-8/12">
            <ChessBoard
                :showLegends="true"
                :kNumber="kNumber"
                :edgeLength="edgeLength"
                :steps="steps"
            />
            <GameActions
                @randomize="randomize"
                @solve="solve"
                @reset="reset"
                :speed="speed"
                @speedChanged="value => speed = value"
            />
        </div>

        <div class="w-full px-4 md:w-4/12">
            <ListMoves :steps="steps" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUpdate, watch, reactive } from "@vue/composition-api";
import { bus } from "@/main";
import gsap from "gsap";
import * as interfaces from "@/interfaces/interfaces";
import GameActions from "@/components/GameActions/GameActions.vue";
import ChessBoard from "@/components/ChessBoard/ChessBoard.vue";
import ListMoves from "@/components/ListMoves/ListMoves.vue";

export default defineComponent({
    name: "MinConflict",

    components: {
        GameActions,
        ChessBoard,
        ListMoves,
    },

    setup(props, context) {
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
        function speedChanged(value: number) {
            speed.value = value;
        }

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
        watch(speed, (curr, prev) => {
            timelines.queens.timeScale(curr);
            timelines.moves.timeScale(curr);
        });

        return {
            kNumber,
            edgeLength,
            steps,
            speed,
            speedChanged,
            randomize,
            reset,
            solve,
        };
    },
});
</script>
