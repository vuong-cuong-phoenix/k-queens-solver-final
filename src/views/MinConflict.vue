<template>
    <div class="flex flex-wrap">
        <div class="w-full md:w-8/12">
            <GameActions />
            <ChessBoard
                :kNumber="4"
                :edgeLength="3"
            />
        </div>
        <div class="w-full md:w-4/12">ListMoves</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import GameActions from "@/components/GameActions/GameActions.vue";
import ChessBoard from "@/components/ChessBoard/ChessBoard.vue";

export default defineComponent({
    name: "MinConflict",
    components: {
        GameActions,
        ChessBoard,
    },
});
</script>
