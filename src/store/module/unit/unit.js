export default {
    namespaced: true,
    state: () => ({
      unit: process.env.VUE_APP_UNIT_DEFAULT,
    }),
    getters: {
      getUnit: (state) => state.unit,
    },
    mutations: {
      setUnit(state, payload) {
        state.unit = payload;
      },
    },
    actions: {
        setUnit(context, payload) {
        context.commit("setUnit", payload);
      },
    },
  };
  