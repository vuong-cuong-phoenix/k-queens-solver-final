<template>
    <div>
        <NavBar />

        <transition name="backdrop-fade">
            <Backdrop
                v-if="sidebarShowing"
                :isShowing="sidebarShowing"
                @close="sidebarShowing = false"
            />
        </transition>
        <transition name="sidebar-slide">
            <Sidebar v-if="sidebarShowing" />
        </transition>

        <div class="max-w-full px-2 py-4 mt-12 sm:px-4 ">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import NavBar from "@/components/Navigation/NavBar/NavBar.vue";
import Sidebar from "@/components/Navigation/Sidebar/Sidebar.vue";
import Backdrop from "@/components/Backdrop/Backdrop.vue";

export default defineComponent({
    name: "App",
    components: {
        NavBar,
        Sidebar,
        Backdrop,
    },

    setup(props, context) {
        const sidebarShowing = computed<boolean>({
            get: () => context.root.$store.getters.getSidebarShowing,
            set: (value) => context.root.$store.dispatch("setSidebarShowing", value),
        });

        return {
            sidebarShowing,
        };
    },
});
</script>

<style>
html {
    font-family: Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
    transition: opacity 0.25s ease-in-out;
}

.backdrop-fade-enter,
.backdrop-fade-leave-to {
    opacity: 0;
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
    transition: transform 0.25s ease-in-out;
}

.sidebar-slide-enter,
.sidebar-slide-leave-to {
    transform: translateX(-100%);
}
</style>
