<template>
    <div class="">
        <div
            class="flex"
            v-for="row in kNumber"
            :key="row"
        >
            <div
                v-for="colInRow in kNumber"
                :key="colInRow"
            >
                <div
                    class="flex items-center justify-center"
                    :class="(row + colInRow) % 2 === 0 ? 'bg-white' : 'bg-blue-800'"
                    :style="{ width: edgeLength + 'rem', height: edgeLength + 'rem' }"
                >
                    {{ row + ',' + colInRow }}
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
    name: "Board",
    props: {
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
