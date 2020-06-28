import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import "./assets/styles/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faCrown, faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.use(VueCompositionAPI);

library.add(faBars, faCrown, faGithub, faHome, faInfoCircle);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
