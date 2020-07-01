<template>
    <div
        class="mt-8 overflow-auto border border-blue-500 rounded-lg shadow-lg"
        style="height: calc(100vh - 4rem - 1rem - 2rem - 1rem - 2rem - 1rem)"
    >
        <div class="px-4 py-3 text-xl font-bold text-center uppercase border-b border-blue-400">List Moves</div>

        <ListMovesItem
            ref="moves"
            v-for="(step, index) in steps"
            :key="index"
            :step="step"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUpdate } from "@vue/composition-api";
import * as interfaces from "@/interfaces/interfaces";
import ListMovesItem from "@/components/ListMoves/ListMovesItem/ListMovesItem.vue";
import { bus } from "@/main";

export default defineComponent({
    name: "ListMoves",

    components: {
        ListMovesItem,
    },

    props: {
        steps: {
            type: Array as () => interfaces.Step[],
            required: false,
            default: () => [],
        },
    },

    setup(props, context) {
        const moves = ref<Element[] | Vue[]>([]);

        onMounted(() => {
            bus.$emit("movesMinConflict", moves.value);
        });

        onBeforeUpdate(() => {
            moves.value = [];
        });

        return {
            moves,
        };
    },
});
</script>

