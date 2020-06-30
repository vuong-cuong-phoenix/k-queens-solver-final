<template>
    <div>
        <NavBar />

        <div class="max-w-full px-2 py-4 mt-16 sm:px-4 ">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import NavBar from "@/components/Navigation/NavBar/NavBar.vue";

export default defineComponent({
    name: "App",
    components: {
        NavBar,
    },
});
</script>

<style lang="postcss">
html {
    font-family: Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
