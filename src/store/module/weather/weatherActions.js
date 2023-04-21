import weatherAPI from "@/service/weatherAPI";

export default {

  async findCountry(context, payload) {
    try {
      const res = await weatherAPI.findCountries(payload);
      context.commit("findCountry", res);
    } catch (error) {
      console.log(error);
    }
  },

  async calloneWeather(context, payload) {
    try {
      const res = await weatherAPI.getWeather(payload.lat, payload.lon);
      context.commit("calloneWeather", res);
    } catch (error) {
      console.log(error);
    }
  },

  async getCountry(context, payload) {
    try {
      const res = await weatherAPI.getCountry(payload);
      context.commit("getCountry", res);
    } catch (error) {
      console.log(error);
    }
  },
};
