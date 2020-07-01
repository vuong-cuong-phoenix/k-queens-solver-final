<template>
    <router-link
        class="flex items-center py-3 pl-4 text-base md:text-lg hover:bg-gray-300"
        :to="link"
        @click.native="close"
    >
        <div class="inline-flex w-8">
            <font-awesome-icon
                v-if="icon"
                :icon="icon"
                class="mx-auto"
            ></font-awesome-icon>
        </div>
        <span class="flex-grow ml-2">{{ name }}</span>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    name: "SidebarItem",

    props: {
        icon: {
            type: Array as () => string[],
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
    },

    setup(props, context) {
        function close() {
            context.root.$store.dispatch("setSidebarShowing", false);
        }

        return {
            close,
        };
    },
});
</script>

<style scoped>
.router-link-exact-active {
    @apply bg-gray-300;
    @apply font-semibold;
}
</style>
