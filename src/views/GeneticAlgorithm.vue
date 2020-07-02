<template>
    <div class="flex flex-wrap mt-4 -mx-4">
        <div class="w-full px-4 md:w-4/12">
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

        <div class="w-full px-4 md:w-4/12">

        </div>

        <div class="flex items-center justify-center w-full px-4 mt-8 md:w-4/12 md:mt-0">
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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "@vue/composition-api";
import gsap from "gsap";
import ChessBoard from "@/components/ChessBoard/ChessBoard.vue";
import { bus } from "@/main";
import * as interfaces from "@/interfaces/interfaces";
import * as simulation from "@/simulation/genetic-algorithm";

export default defineComponent({
    name: "GeneticAlgorithm",
    components: {
        ChessBoard,
    },

    setup() {
        // Essentials
        const kNumber = ref<number>(4);
        const edgeLength = ref<number>(2);
        const crossOverPoint = ref<number>(Math.floor(kNumber.value / 2 - 1));

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
            parents,
            individual,
            currentIndividual,
        };
    },
});
</script>
