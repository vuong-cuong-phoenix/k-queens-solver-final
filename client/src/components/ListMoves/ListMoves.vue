<template>
    <div
        class="mt-8 overflow-hidden border border-blue-500 rounded-lg shadow-lg "
        style="height: calc(100vh - 4rem - 1rem - 2rem - 1rem)"
    >
        <div class="px-4 py-3 text-xl font-bold text-center uppercase border-b border-blue-400">List Moves</div>

        <div
            ref="listMovesRef"
            class="overflow-y-scroll"
            style="height: calc(100% - 3.5rem)"
        >
            <ListMovesItem
                ref="moves"
                v-for="(step, index) in steps"
                :key="index"
                :step="step"
                :index="index"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUpdate, onUpdated } from "@vue/composition-api";
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
        const listMovesRef = ref<Element>();
        const moves = ref<Vue[]>([]);

        onMounted(() => {
            bus.$emit("listMovesRef", listMovesRef.value);
        });

        onUpdated(() => {
            context.emit(
                "moveRefsChanged",
                moves.value.map((vueComponent) => vueComponent.$el)
            );
        });

        onBeforeUpdate(() => {
            moves.value = [];
        });

        return {
            listMovesRef,
            moves,
        };
    },
});
</script>

