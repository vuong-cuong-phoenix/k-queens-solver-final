import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

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
        component: () => import("@/views/MinConflict.vue"),
    },
    {
        path: "/genetic-algorithm",
        name: "GeneticAlgorithm",
        component: () => import("@/views/GeneticAlgorithm.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
