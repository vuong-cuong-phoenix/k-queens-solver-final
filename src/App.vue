<template>
    <div>
        <div>
            <router-link to="/">Home</router-link> |
            <router-link to="/min-conflict">Min Conflict</router-link> |
            <router-link to="/genetic-algorithm">Genetic Algorithm</router-link> |
            <router-link to="/about">About</router-link>
        </div>

        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    name: "App"
});
</script>

