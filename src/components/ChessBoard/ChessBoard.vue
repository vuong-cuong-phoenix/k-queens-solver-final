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

            <div>
                <div
                    class="absolute flex items-center justify-center"
                    :style="{ 
                        left: -edgeLength + 'rem',
                        top: -edgeLength + 'rem',
                        height: edgeLength  + 'rem',
                        width: edgeLength + 'rem',
                    }"
                    v-for="queen in kNumber"
                    :key="queen"
                    ref="queens"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 264.695 264.695"
                        :style="{ 
                            height: (edgeLength/2) + 'rem',
                            width: (edgeLength/2) + 'rem',
                        }"
                    >
                        <path
                            stroke-width="10"
                            stroke="#F7FAFC"
                            d="M209.735 231.402a7.5 7.5 0 01-7.5 7.5h-139a7.5 7.5 0 01-7.5-7.5v-16a7.5 7.5 0 017.5-7.5h139a7.5 7.5 0 017.5 7.5v16zm54.96-190.761c0-8.188-6.66-14.848-14.848-14.848S235 32.453 235 40.641c0 4.121 1.69 7.853 4.41 10.545l-33.372 66.406-.325-64.168c4.379-2.585 7.332-7.34 7.332-12.783 0-8.188-6.66-14.848-14.848-14.848s-14.848 6.66-14.848 14.848c0 4.959 2.452 9.346 6.197 12.043l-23.913 72.474-24.332-72.44c3.771-2.695 6.243-7.098 6.243-12.077 0-8.188-6.66-14.848-14.848-14.848s-14.848 6.66-14.848 14.848c0 4.979 2.472 9.383 6.244 12.078l-24.335 72.544-23.926-72.566c3.755-2.697 6.214-7.09 6.214-12.056 0-8.188-6.66-14.848-14.848-14.848S52.35 32.453 52.35 40.641c0 5.443 2.953 10.199 7.332 12.783l-.326 64.265-33.7-66.9c2.497-2.658 4.039-6.222 4.039-10.148 0-8.188-6.66-14.848-14.848-14.848S0 32.453 0 40.641c0 6.775 4.566 12.492 10.779 14.267L59.677 185.04a7.5 7.5 0 007.021 4.862h132a7.499 7.499 0 007.022-4.866l48.878-130.341c5.861-1.987 10.097-7.529 10.097-14.054z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUpdate } from "@vue/composition-api";
import { bus } from "@/main";
import ChessBoardLegend from "@/components/ChessBoard/ChessBoardLegend/ChessBoardLegend.vue";
import Board from "@/components/ChessBoard/Board/Board.vue";

export default defineComponent({
    name: "ChessBoard",

    components: {
        ChessBoardLegend,
        Board,
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
            type: Array,
            required: true,
        },
    },

    setup(props, context) {
        const queens = ref<Element[] | Vue[]>([]);

        onMounted(() => {
            bus.$emit("queensMinConflict", queens.value);
        });

        onBeforeUpdate(() => {
            queens.value = [];
        });

        return {
            queens,
        };
    },
});
</script>

<style scoped>
</style>
