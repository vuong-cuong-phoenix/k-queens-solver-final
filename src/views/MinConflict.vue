<template>
    <div class="flex flex-wrap">
        <div class="w-full md:w-8/12">
            <GameActions
                @randomize="randomize"
                @start="start"
            />
            <ChessBoard
                :kNumber="4"
                :edgeLength="3"
                :steps="steps"
            />
        </div>

        <div class="w-full md:w-4/12">ListMoves</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@vue/composition-api";
import { bus } from "@/main";
import gsap from "gsap";
import GameActions from "@/components/GameActions/GameActions.vue";
import ChessBoard from "@/components/ChessBoard/ChessBoard.vue";

export default defineComponent({
    name: "MinConflict",

    components: {
        GameActions,
        ChessBoard,
    },

    setup(props, context) {
        const queens = ref<Element[] | Vue[]>([]);

        bus.$on("queensMinConflict", (queensRef: Element[] | Vue[]) => (queens.value = queensRef));

        const steps = ref<any[]>([]);

        function randomize() {
            console.log("abc");
        }

        function start() {
            console.log("xyz");
        }

        onMounted(() => {
            console.log(queens.value);
        });

        return {
            steps,
            randomize,
            start,
        };
    },
});
</script>
