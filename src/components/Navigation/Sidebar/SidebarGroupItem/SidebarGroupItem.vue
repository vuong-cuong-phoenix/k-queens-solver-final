<template>
    <div>
        <div
            class="flex items-center w-full px-4 py-3 text-lg cursor-pointer hover:bg-gray-300 focus:outline-none"
            :class="showing ? 'bg-gray-300' : ''"
            @click="toggle"
        >
            <div class="inline-flex w-8">
                <font-awesome-icon
                    v-if="headerIcon"
                    :icon="headerIcon"
                    class="mx-auto"
                ></font-awesome-icon>
            </div>
            <span class="flex-grow ml-2">{{ headerTitle }}</span>
            <font-awesome-icon
                :icon="!showing ? ['fas', 'chevron-down'] : ['fas', 'chevron-up']"
                size="sm"
                class="ml-4"
            ></font-awesome-icon>
        </div>

        <div v-if="showing">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
    name: "SidebarDropdown",
    props: {
        headerIcon: {
            type: Array,
            required: false,
        },
        headerTitle: {
            type: String,
            required: true,
        },
        showing: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    setup(props, context) {
        function toggle() {
            context.emit("toggle");
        }

        return {
            toggle,
        };
    },
});
</script>
