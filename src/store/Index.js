
import { createStore } from 'vuex'
import language from "./module/language/language";
import weather from "./module/weather/weather";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {},
  modules: { language, weather },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],
});
export default store
