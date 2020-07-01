<template>
    <div class="flex items-center justify-center px-4 py-3 border-b border-blue-400 opacity-0">
        <font-awesome-icon
            :icon="['fas', 'crown']"
            class="text-blue-700"
        ></font-awesome-icon>
        <span class="ml-4 font-semibold">Queen {{ step.queen }}</span>
        <span class="ml-4 text-blue-700">({{ step.destination.x }},{{ step.destination.y }})</span>
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
    },
});
</script>
