<template>
    <div class="">
        <div
            v-for="row in kNumber"
            :key="row"
            class="flex"
        >
            <div
                v-for="colInRow in kNumber"
                :key="colInRow"
            >
                <div
                    class="flex items-center justify-center border border-gray-800"
                    :class="(row + colInRow) % 2 == 0 ? 'bg-gray-100' : 'bg-blue-800'"
                    :style="{ 
                        width: edgeLength + 'rem',
                        height: edgeLength + 'rem',
                    }"
                >
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
