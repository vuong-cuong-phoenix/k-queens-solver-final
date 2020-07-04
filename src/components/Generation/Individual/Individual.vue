<template>
    <div>
        <ChessBoard
            class="mx-auto"
            :kNumber="kNumber"
            :edgeLength="edgeLength * 1.5"
            :isStatic="true"
            :initPosition="individual.state"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ChessBoard from "@/components/ChessBoard/ChessBoard.vue";
import * as interfaces from "@/interfaces/interfaces";

export default defineComponent({
    name: "Individual",
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
        individual: {
            type: Object as () => interfaces.Individual,
            required: true,
        },
    },
});
</script>
