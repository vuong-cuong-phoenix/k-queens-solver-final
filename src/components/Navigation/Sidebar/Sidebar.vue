<template>
    <div class="fixed inset-y-0 left-0 z-10 flex flex-col w-64 h-full text-black bg-white shadow-2xl">
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
            <SidebarItem
                link="/"
                :icon="['fas', 'home']"
                name="Home"
            />
            <!-- <SidebarGroupItem -->
            <!--     :headerIcon="['fas', 'home']" -->
            <!--     headerTitle="Algorithms" -->
            <!--     :showing="algorithmShowing" -->
            <!--     @toggle="algorithmShowing = !algorithmShowing" -->
            <!-- > -->
            <!--     <SidebarItem -->
            <!--         link="/min-conflict" -->
            <!--         name="Min-Conflict" -->
            <!--         class="pl-8" -->
            <!--     /> -->
            <!--     <SidebarItem -->
            <!--         link="/genetic-algorithm" -->
            <!--         name="Genetic Algorithm" -->
            <!--         class="pl-8" -->
            <!--     /> -->
            <!-- </SidebarGroupItem> -->
            <SidebarItem
                link="/min-conflict"
                name="Min-Conflict"
            />
            <SidebarItem
                link="/genetic-algorithm"
                name="Genetic Algorithm"
            />

            <SidebarItem
                link="/about"
                :icon="['fas', 'info-circle']"
                name="About"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "@vue/composition-api";
import SidebarItem from "@/components/Navigation/Sidebar/SidebarItem/SidebarItem.vue";
import SidebarGroupItem from "@/components/Navigation/Sidebar/SidebarGroupItem/SidebarGroupItem.vue";

export default defineComponent({
    name: "Sidebar",
    components: {
        SidebarItem,
        SidebarGroupItem,
    },

    setup(props, context) {
        const algorithmShowing = ref(false);

        const sidebarGroupItemLinks = ["/min-conflict", "/genetic-algorithm"];

        return {
            algorithmShowing,
        };
    },
});
</script>

