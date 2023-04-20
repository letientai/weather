export default {
  findCountry(context, payload) {
    context.commit("findCountry", payload);
  },
  calloneWeather(context, payload) {
    context.commit("calloneWeather", payload);
  },
  getCountry(context, payload) {
    context.commit("getCountry", payload);
  },
};
