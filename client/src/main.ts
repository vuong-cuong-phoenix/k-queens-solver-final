import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import "./assets/styles/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faBars,
    faCrown,
    faHome,
    faInfoCircle,
    faChevronDown,
    faChevronUp,
    faRunning,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Spinner from "./components/UI/Spinner/Spinner.vue";
import ArrowIcon from "./components/UI/Icons/ArrowIcon.vue";
import GenerateIcon from "./components/UI/Icons/GenerateIcon.vue";

// Libraries
Vue.use(VueCompositionAPI);

library.add(faBars, faCrown, faGithub, faHome, faInfoCircle, faChevronDown, faChevronUp, faRunning);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Custom components
Vue.component("Spinner", Spinner);
Vue.component("ArrowIcon", ArrowIcon);
Vue.component("GenerateIcon", GenerateIcon);

// Defaults
axios.defaults.baseURL = "http://localhost:8000";

Vue.config.productionTip = false;

export const bus = new Vue();

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
