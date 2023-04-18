// import languageAction from "./languageAction";
// import languageMutations from "./languageMutations";
import i18n from "@/language/i18n";
export default {
  namespaced: true,
  mutations: {
    setLanguage(state, payload) {
      i18n.locale = payload;
    },
  },
  actions: {
    setLanguage(context, payload) {
      context.commit("setLanguage", payload);
    },
  },
};
