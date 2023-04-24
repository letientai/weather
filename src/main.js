import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import i18n from "./language/i18n";
import store from "./store/Index";
import router from "./router";
import VueApexCharts from "vue3-apexcharts";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import { registerGlobalComponent } from "./ultil/import";
const app = createApp(App);

registerGlobalComponent(app)
app.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_API_KEY_GG_MAP,
    libraries: "places,",
  },
});
app.use(router);
app.use(store);
app.use(i18n);
app.use(VueApexCharts);
app.mount("#app");
