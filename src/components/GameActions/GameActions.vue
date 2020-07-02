<template>
    <div class="pb-4 space-y-3">
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
                class="shadow-md btn btn-success"
                @click="solve"
            >
                Solve
            </button>

            <!-- <button class="shadow-md btn btn-primary">Pause</button> -->
            <!-- <button class="shadow-md btn btn-primary">Resume</button> -->
        </div>

        <div class="flex items-center w-full mx-auto sm:w-8/12 xl:w-6/12 space-x-4">
            <span class="font-semibold">Speed: </span>
            <VueSlider
                class="flex-grow"
                v-model="speedComputed"
                :data="['0.25x', '0.5x', '1x', '2x', '3x', '4x']"
                :marks="true"
                :absorb="true"
                :lazy="true"
            />
            <font-awesome-icon
                :icon="['fas', 'running']"
                size="lg"
                class="text-blue-600"
            ></font-awesome-icon>
        </div>

    </div>

</template>

<script lang="ts">
import { defineComponent, computed, ref } from "@vue/composition-api";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default defineComponent({
    name: "GameActions",

    components: {
        VueSlider,
    },

    props: {
        speed: {
            type: Number,
            required: true,
        },
    },

    setup(props, context) {
        function randomize() {
            context.emit("randomize");
        }

        function reset() {
            context.emit("reset");
        }

        function solve() {
            context.emit("solve");
        }

        const speedComputed = computed({
            get: () => {
                return props.speed + "x";
            },
            set: (value) => {
                context.emit("speedChanged", parseFloat(value));
            },
        });

        return {
            randomize,
            reset,
            solve,
            speedComputed,
        };
    },
});
</script>
