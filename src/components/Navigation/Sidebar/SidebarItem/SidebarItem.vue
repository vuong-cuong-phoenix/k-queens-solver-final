<template>
    <router-link
        class="block py-3 pl-4 text-lg hover:bg-gray-300"
        :to="link"
        @click.native="close"
    >
        <font-awesome-icon :icon="icon"></font-awesome-icon>
        <span class="ml-2">{{ name }}</span>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    name: "SidebarItem",

    props: {
        icon: {
            type: Array,
            required: true,
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

<style lang="postcss" scoped>
.router-link-exact-active {
    @apply bg-gray-300 font-semibold;
}
</style>
