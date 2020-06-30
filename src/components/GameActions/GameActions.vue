<template>
    <div class="text-center space-x-2 space-y-2">
        <button
            class="shadow-md btn btn-primary"
            @click="random"
        >Randomize</button>
        <button
            class="shadow-md btn btn-primary"
            @click="start"
        >Start</button>
        <!-- <button class="shadow-md btn btn-primary">Pause</button> -->
        <!-- <button class="shadow-md btn btn-primary">Resume</button> -->
    </div>

</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
    name: "GameActions",

    setup(props, context) {
        function random() {
            context.emit("randomize");
        }

        function start() {
            context.emit("start");
        }

        return {
            random,
            start,
        };
    },
});
</script>
