<template>
    <header class="fixed inset-x-0 top-0 z-20 w-full h-16 px-2 text-white bg-blue-600 sm:px-4">
        <div class="flex items-center justify-between h-full">
            <button
                class="px-3 py-2 border border-white hover:border-gray-300 hover:text-gray-300 focus:outline-none rounded-md"
                @click="sidebarShowing = !sidebarShowing"
            >
                <font-awesome-icon
                    :icon="['fas', 'bars']"
                    size="lg"
                ></font-awesome-icon>
            </button>

            <div class="flex items-center">
                <font-awesome-icon
                    :icon="['fas', 'crown']"
                    size="2x"
                ></font-awesome-icon>
                <span class="ml-2 text-xl font-semibold"> K-Queens Solver</span>
            </div>

            <a
                href="https://github.com/vuong-cuong-phoenix/k-queens-solver"
                class="cursor-pointer hover:text-gray-300 focus:outline-none"
            >
                <font-awesome-icon
                    :icon="['fab', 'github']"
                    size="lg"
                ></font-awesome-icon>
            </a>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";
import { mapGetters } from "vuex";
import Backdrop from "@/components/Backdrop/Backdrop.vue";
import Sidebar from "@/components/Navigation/Sidebar/Sidebar.vue";

export default defineComponent({
    name: "NavBar",

    components: {
        Backdrop,
        Sidebar,
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

