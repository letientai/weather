import weatherActions from "./weatherActions";
import weatherMutations from "./weatherMutations";
import weatherGetters from "./weatherGetters";


export default {
  namespaced: true,
  state: () => ({
    weatherInformation: {},
    country: {},
    listCountry: []
  }),
  getters: weatherGetters,
  mutations: weatherMutations,
  actions: weatherActions,
};
