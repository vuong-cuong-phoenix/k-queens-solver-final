<template>
    <div class="flex flex-wrap">
        <div class="w-full md:w-9/12">
            <GameActions
                @randomize="randomize"
                @solve="solve"
                @reset="reset"
            />
            <ChessBoard
                :kNumber="kNumber"
                :edgeLength="edgeLength"
                :steps="steps"
            />
        </div>

        <div class="w-full md:w-3/12">
            <ListMoves :steps="[...randomSteps, ...steps]" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUpdate } from "@vue/composition-api";
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
        const kNumber = ref<number>(4);

        const edgeLength = ref<number>(4);

        const queens = ref<Element[] | Vue[]>([]);
        bus.$on("queensMinConflict", (queensRef: Element[] | Vue[]) => (queens.value = queensRef));

        const timelineQueens = ref(
            gsap.timeline({
                defaults: {
                    duration: 0.5,
                    ease: "none",
                    force3D: false,
                },
            })
        );

        const moves = ref<Element[] | Vue[]>([]);
        bus.$on("movesMinConflict", (movesRef: Element[] | Vue[]) => (moves.value = movesRef));

        const timelineMoves = ref(
            gsap.timeline({
                defaults: {
                    duration: 0.5,
                    ease: "none",
                    force3D: false,
                },
            })
        );

        const randomSteps = ref<interfaces.Step[]>([]);

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

        const speed = ref<number>(500);

        function randomize() {
            randomSteps.value = [];

            for (let col = 1; col <= kNumber.value; ++col) {
                const row = Math.floor(Math.random() * (kNumber.value - 1)) + 1;

                gsap.to(queens.value[col - 1], {
                    x: `${col * edgeLength.value}rem`,
                    y: `${row * edgeLength.value}rem`,
                    ease: "none",
                    duration: speed.value / 1000,
                    force3D: false,
                });

                randomSteps.value.push({
                    conflicts: [],
                    queen: col,
                    destination: {
                        x: col,
                        y: row,
                    },
                });

                gsap.fromTo(
                    (moves.value[col - 1] as Vue).$el,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: speed.value / 1000,
                    }
                );
            }
        }

        function reset() {
            randomSteps.value = [];

            for (let i = 0; i < kNumber.value; ++i) {
                gsap.to(queens.value[i], {
                    x: 0,
                    y: 0,
                    ease: "none",
                    duration: 0.25,
                    force3D: false,
                });
            }
        }

        function solve() {
            steps.value.forEach((step, index) => {
                timelineQueens.value.to(queens.value[step.queen - 1], {
                    x: `${step.destination.x * edgeLength.value}rem`,
                    y: `${step.destination.y * edgeLength.value}rem`,
                });

                timelineMoves.value.to((moves.value[kNumber.value + index] as Vue).$el, {
                    opacity: 1,
                });
            });
        }

        onMounted(() => {
            console.log("abc");
        });

        return {
            kNumber,
            edgeLength,
            steps,
            randomSteps,
            randomize,
            reset,
            solve,
        };
    },
});
</script>
