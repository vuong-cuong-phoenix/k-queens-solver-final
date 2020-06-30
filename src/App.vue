<template>
    <div>
        <NavBar />

        <div class="mt-16">
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
