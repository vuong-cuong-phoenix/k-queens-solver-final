import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        kNumber: 4,
    },

    getters: {
        getKNumber(state) {
            return state.kNumber;
        },
    },

    mutations: {},
    actions: {},
    modules: {},
});
