<template>
    <div
        class="absolute flex flex-no-wrap text-xl"
        :class="{ 'flex-col': !isRow }"
        :style="{
            top: isRow ? -edgeLength + 'rem' : 0,
            left: isRow? 0 : -edgeLength + 'rem',
        }"
    >
        <div
            v-for="i in kNumber"
            :key="i"
            class="flex items-center justify-center"
            :style="{ 
                width: edgeLength + 'rem',
                height: edgeLength + 'rem',
            }"
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
