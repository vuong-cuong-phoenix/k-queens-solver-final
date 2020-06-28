<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to My Vue.js App" />
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    name: "Home",
    components: {
        HelloWorld,
    },
});
</script>
