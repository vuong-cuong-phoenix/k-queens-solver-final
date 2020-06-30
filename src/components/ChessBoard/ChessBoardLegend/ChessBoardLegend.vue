<template>
    <div
        class="absolute flex flex-no-wrap"
        :class="{ 'flex-col': !isRow }"
        :style="isRow ? { top: -edgeLength + 'rem' } : { left: -edgeLength + 'rem' }"
    >
        <div
            class="flex items-center justify-center"
            :style="{ width: edgeLength + 'rem', height: edgeLength + 'rem' }"
            v-for="i in kNumber"
            :key="i"
        >{{ i }}</div>
    </div>

</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
export default defineComponent({
    name: "ChessBoardLegend",

    props: {
        isRow: {
            type: Boolean,
            required: false,
            default: false,
        },
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
