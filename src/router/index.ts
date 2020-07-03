import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import MinConflict from "../views/MinConflict.vue";
import GeneticAlgorithm from "../views/MinConflict.vue";
import About from "../views/MinConflict.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/min-conflict",
        name: "MinConflict",
        component: MinConflict,
    },
    {
        path: "/genetic-algorithm",
        name: "GeneticAlgorithm",
        component: GeneticAlgorithm,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
