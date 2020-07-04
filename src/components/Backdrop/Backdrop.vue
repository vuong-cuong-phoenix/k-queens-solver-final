<template>
    <button
        v-if="isShowing"
        tabindex="-1"
        class="fixed inset-0 z-30 w-full h-full bg-black cursor-default bg-opacity-50 focus:outline-none"
        @click.self="close"
    >
    </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    name: "Backdrop",

    props: {
        isShowing: {
            type: Boolean,
            required: true,
        },
    },

    setup(props, context) {
        function close() {
            context.emit("close");
        }

        return {
            close,
        };
    },
});
</script>
