import { createStore } from "vuex";
import weather from "./module/weather/weather";
import loader from "./module/loader/loader";
import language from "./module/language/language";
import unit from "./module/unit/unit";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {},
  modules: { weather, loader, language, unit },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],
});
export default store;
