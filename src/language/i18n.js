// import Vue from "vue";
import { createI18n } from "vue-i18n";
import enMessage from "./en.json";
import viMessage from "./vi.json";

// Vue.use(VueI18n);

const messages = {
  en: enMessage,
  vi: viMessage,
};
const i18n = createI18n({
  locale: process.env.VUE_APP_LANG_DEFAULT, // set locale
  fallbackLocale: "vi",
  messages, // set locale messages
});

export default i18n;
