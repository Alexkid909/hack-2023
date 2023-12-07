import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";
import store from "./store";
import SurveyForm from "./components/SurveyForm";
import SurveyResults from "./components/SurveyResults";
import SurveyRecommendations from "./components/SurveyRecommendations";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.config.productionTip = false;

const routes = [
  {
    path: "/",
    component: SurveyForm,
  },
  {
    path: "/results",
    component: SurveyResults,
  },
  {
    path: "/recommendations",
    component: SurveyRecommendations,
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
