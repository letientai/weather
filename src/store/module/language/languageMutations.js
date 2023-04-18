import i18n from "@/language/i18n";

export default {
    setLanguage(state, payload) {
    i18n.locale = payload;
  },
};
