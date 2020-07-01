<template>
    <div>
        <div
            class="relative mx-auto board"
            style="z-index: -20"
            :style="{ 
                height: kNumber * edgeLength + 'rem',
                width: kNumber * edgeLength + 'rem',
                marginTop: (edgeLength + 1) + 'rem',
            }"
        >
            <ChessBoardLegend
                :isRow="true"
                :kNumber="kNumber"
                :edgeLength="edgeLength"
            />
            <ChessBoardLegend
                :kNumber="kNumber"
                :edgeLength="edgeLength"
            />

            <Board
                :kNumber="kNumber"
                :edgeLength="edgeLength"
            />

            <Queens
                :kNumber="kNumber"
                :edgeLength="edgeLength"
                :initPosition="{
                    x: 1,
                    y: 2
                }"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUpdate } from "@vue/composition-api";
import { bus } from "@/main";
import * as interfaces from "@/interfaces/interfaces";
import ChessBoardLegend from "@/components/ChessBoard/ChessBoardLegend/ChessBoardLegend.vue";
import Board from "@/components/ChessBoard/Board/Board.vue";
import Queens from "@/components/ChessBoard/Queens/Queens.vue";

export default defineComponent({
    name: "ChessBoard",

    components: {
        ChessBoardLegend,
        Board,
        Queens,
    },

    props: {
        kNumber: {
            type: Number,
            required: true,
        },
        edgeLength: {
            type: Number,
            required: true,
        },
        steps: {
            type: Array as () => Array<interfaces.Step>,
            required: true,
        },
    },

    setup(props, context) {
        return {};
    },
});
</script>

<style scoped>
</style>
