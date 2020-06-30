<template>
    <div>
        <div
            class="relative mx-auto board"
            style="z-index: -1"
            :style="{ height: kNumber * edgeLength + 'rem', width: kNumber * edgeLength + 'rem', marginTop: (edgeLength + 1) + 'rem'}"
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

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ChessBoardLegend from "@/components/ChessBoard/ChessBoardLegend/ChessBoardLegend.vue";

export default defineComponent({
    name: "ChessBoard",

    components: {
        ChessBoardLegend,
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
    },
});
</script>

<style scoped>
</style>
