<template>
    <div class="flex flex-wrap -m-4">
        <div
            v-for="i in 2"
            :key="i"
            class="w-6/12 p-4 md:w-full md:p-12"
        >
            <ChessBoard
                class="mx-auto"
                :kNumber="kNumber"
                :edgeLength="edgeLength"
                :isStatic="true"
                :initPosition="parentsInitPosition[i-1]"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "@vue/composition-api";
import ChessBoard from "@/components/ChessBoard/ChessBoard.vue";
import * as interfaces from "@/interfaces/interfaces";

export default defineComponent({
    name: "Parents",
    components: {
        ChessBoard,
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
        crossOverPoint: {
            type: Number,
            required: true,
        },
        individual: {
            type: Object as () => interfaces.Individual,
            required: true,
        },
    },

    setup(props, context) {
        const parentsInitPosition = computed(() => {
            return [props.individual.parents[0]!.state, props.individual.parents[1]!.state];
        });

        return {
            parentsInitPosition,
        };
    },
});
</script>
