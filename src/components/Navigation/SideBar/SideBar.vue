<template>
    <div class="fixed inset-y-0 left-0 z-10 flex flex-col w-64 h-full text-black bg-white">
        <div class="flex items-center h-32 text-white bg-blue-600">
            <div class="mx-auto">
                <font-awesome-icon
                    :icon="['fas', 'crown']"
                    size="2x"
                ></font-awesome-icon>
                <span class="ml-2 text-xl font-semibold"> K-Queens Solver</span>
            </div>
        </div>

        <div class="mt-8">
            <SideBarItem
                link="/"
                :icon="['fas', 'home']"
                name="Home"
            />
            <SideBarItem
                link="/min-conflict"
                :icon="['fas', 'home']"
                name="Min-Conflict"
            />
            <SideBarItem
                link="/genetic-algorithm"
                :icon="['fas', 'home']"
                name="Genetic Algorithm"
            />
            <SideBarItem
                link="/about"
                :icon="['fas', 'info-circle']"
                name="About"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import SideBarItem from "@/components/Navigation/SideBar/SideBarItem/SideBarItem.vue";

export default defineComponent({
    name: "SideBar",
    components: {
        SideBarItem,
    },
});
</script>

