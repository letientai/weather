
export default {
  namespaced: true,
  state: () => ({
    loader: false,
  }),
  getters: {
    getLoader: (state) => state.loader,
  },
  mutations: {
    setLoader(state, payload) {
      state.loader = payload;
    },
  },
  actions: {
    setLoader(context, payload) {
      context.commit("setLoader", payload);
    },
  },
};
