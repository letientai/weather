// import Vue from "vue";
import { createI18n } from 'vue-i18n'
import vnMessage from "./vn.json";
import enMessage from "./en.json";

// Vue.use(VueI18n);

const messages = {
  en: enMessage,
  vn: vnMessage,
};
const i18n = createI18n({
  locale: "vn", // set locale
  fallbackLocale: "vn", // set fallback locale
  messages, // set locale messages
});

export default i18n;
