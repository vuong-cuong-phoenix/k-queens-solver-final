<template>
    <div>
        <div class="flex flex-wrap mt-4 -mx-4">
            <!-- 2 Parents -->
            <div class="w-full px-4 md:w-5/12">
                <div class="flex flex-wrap -m-4">
                    <div
                        v-for="i in 2"
                        :key="i"
                        class="w-6/12 p-4 md:w-full md:p-12"
                    >
                        <ChessBoard
                            ref="parents"
                            class="mx-auto"
                            :kNumber="kNumber"
                            :edgeLength="edgeLength"
                            :isStatic="true"
                            :initPosition="currentIndividual.parents[i - 1].state"
                        />
                    </div>
                </div>
            </div>

            <!-- Chich nhau icon -->
            <div class="w-full px-4 md:w-2/12">

            </div>

            <!-- Individual -->
            <div class="flex items-center justify-center w-full px-4 mt-8 md:w-5/12 md:mt-0">
                <ChessBoard
                    ref="individual"
                    class="mx-auto"
                    :kNumber="kNumber"
                    :edgeLength="edgeLength * 1.5"
                    :isStatic="true"
                    :initPosition="currentIndividual.state"
                />
            </div>
        </div>

        <!-- Game actions -->
        <div class="mt-10 space-y-3">
            <div class="text-center space-x-2">
                <button class="shadow-md btn btn-success">Solve</button>

                <button class="shadow-md btn btn-primary">Reset</button>
            </div>

            <div class="flex items-center w-full pb-4 mx-auto sm:w-8/12 xl:w-6/12 space-x-4">
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
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "@vue/composition-api";
import gsap from "gsap";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import ChessBoard from "@/components/ChessBoard/ChessBoard.vue";
import { bus } from "@/main";
import * as interfaces from "@/interfaces/interfaces";
import * as simulation from "@/simulation/genetic-algorithm";

export default defineComponent({
    name: "GeneticAlgorithm",
    components: {
        VueSlider,
        ChessBoard,
    },

    setup() {
        // Essentials
        const kNumber = ref<number>(4);
        const edgeLength = ref<number>(2);
        const crossOverPoint = ref<number>(Math.floor(kNumber.value / 2 - 1));

        // Speed
        const baseDuration = 0.5;
        const speed = ref<number>(1);
        const speedComputed = computed({
            get: () => {
                return speed.value + "x";
            },
            set: (value) => {
                speed.value = parseFloat(value);
            },
        });

        // Template references
        const parents = ref<Vue[]>([]);
        const individual = ref<Vue>();

        // Core
        const generations = ref<interfaces.Generation[]>([]);
        const currentIndividual = ref<interfaces.Individual>({
            state: [],
            fitnessValue: 0,
            parents: [],
        });

        // Simulated data
        currentIndividual.value = simulation.firstIndividual;

        onMounted(() => {
            console.log(
                parents.value.forEach((vElement) => {
                    console.log(vElement.$el);
                })
            );
            console.log(individual.value!.$el);
        });

        return {
            kNumber,
            edgeLength,
            crossOverPoint,
            speedComputed,
            parents,
            individual,
            currentIndividual,
        };
    },
});
</script>
