<template>
    <div class="space-y-2">
        <div class="text-center space-x-2">
            <button
                class="shadow-md btn btn-primary"
                @click="randomize"
            >
                Randomize
            </button>

            <button
                class="shadow-md btn btn-primary"
                @click="reset"
            >
                Reset
            </button>

        </div>

        <div class="text-center space-x-2">
            <button
                class="shadow-md btn btn-primary"
                @click="start"
            >
                Start
            </button>

            <!-- <button class="shadow-md btn btn-primary">Pause</button> -->
            <!-- <button class="shadow-md btn btn-primary">Resume</button> -->
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    name: "GameActions",

    setup(props, context) {
        function randomize() {
            context.emit("randomize");
        }

        function reset() {
            context.emit("reset");
        }

        function start() {
            context.emit("start");
        }

        return {
            randomize,
            reset,
            start,
        };
    },
});
</script>
