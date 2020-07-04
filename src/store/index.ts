import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        kNumber: 4,
        sidebarShowing: false,
    },

    getters: {
        getKNumber(state) {
            return state.kNumber;
        },
        getSidebarShowing(state) {
            return state.sidebarShowing;
        },
    },

    mutations: {
        setSidebarShowing(state, payload) {
            state.sidebarShowing = payload;
        },
    },

    actions: {
        setSidebarShowing({ commit }, payload) {
            commit("setSidebarShowing", payload);
        },
    },

    modules: {},
});
