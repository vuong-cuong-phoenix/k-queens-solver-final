<template>
    <div class="flex items-center justify-between hidden px-12 py-3 border-b border-blue-400 opacity-0">
        <!-- style="padding-left: calc(50% - 5rem); padding-right: calc(50% - 6rem)" -->
        <div class="w-2/12 font-semibold text-blue-700 index">
            <span># {{ index + 1 }}</span>
        </div>
        <div class="w-8/12 text-center">
            <font-awesome-icon
                :icon="['fas', 'crown']"
                class="text-blue-700"
            ></font-awesome-icon>
            <span class="ml-4 font-semibold">Queen {{ step.choice.x }}</span>
        </div>
        <div class="w-2/12 ml-4 font-semibold text-blue-700">
            <span class="float-right">({{ step.choice.x }},{{ step.choice.y }})</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import * as interfaces from "@/interfaces/interfaces";

export default defineComponent({
    name: "ListMovesItem",

    props: {
        step: {
            type: Object as () => interfaces.Step,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
});
</script>

<style scoped>
.index {
    left: 1rem;
}
</style>
