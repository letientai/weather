export default {
  async setWeather(state, payload) {
    state.weatherInformation = payload;
  },
  setCountry(state, payload) {
    state.country = payload;
  },
};
