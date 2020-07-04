<template>
    <div
        class="relative"
        :style="{ 
            height: (kNumber * edgeLength) + 'rem',
            width: (kNumber * edgeLength) + 'rem',
        }"
    >
        <ChessBoardLegend
            v-if="showLegends"
            :isRow="true"
            :kNumber="kNumber"
            :edgeLength="edgeLength"
        />
        <ChessBoardLegend
            v-if="showLegends"
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
            :isStatic="isStatic"
            :initPosition="initPositionComputed"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
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
        showLegends: {
            type: Boolean,
            required: false,
            default: false,
        },
        isStatic: {
            type: Boolean,
            required: false,
            default: false,
        },
        initPosition: {
            type: Array as () => interfaces.Position[],
            required: false,
        },
    },

    setup(props, context) {
        const initPositionComputed = computed(() => {
            let result = props.initPosition;

            if (!result) {
                result = [];

                for (let i = 1; i <= props.kNumber; ++i) {
                    result.push({
                        x: i,
                        y: 1,
                    });
                }
            }

            return result;
        });

        return {
            initPositionComputed,
        };
    },
});
</script>
