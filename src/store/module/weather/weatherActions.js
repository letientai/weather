export default {
    setWeather(context, payload) {
    context.commit("setWeather", payload);
  },
    setCountry(context, payload) {
    context.commit("setCountry", payload);
  },
};
