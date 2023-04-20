export default {
  namespaced: true,
  state: () => ({
    lang: process.env.VUE_APP_LANG_DEFAULT,
  }),
  getters: {
    getLanguage: (state) => state.lang,
  },
  mutations: {
    setLanguage(state, payload) {
      state.lang = payload;
    },
  },
  actions: {
    setLanguage(context, payload) {
      context.commit("setLanguage", payload);
    },
  },
};
