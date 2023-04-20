import weatherAPI from "@/service/weatherAPI";
export default {
  async findCountry(state, payload) {
    try {
      const res = await weatherAPI.findCountries(payload);
      state.listCountry = res.data.list;
    } catch (error) {
      console.log(error);
    }
  },
  async calloneWeather(state, payload) {
    try {
      const res = await weatherAPI.getWeather(payload.lat, payload.lon)
      state.weatherInformation = res.data;
    } catch (error) {
      console.log(error);
    }
  },

   async getCountry(state, payload) {
    try {
      const res =  await weatherAPI.getCountry(payload)
      state.country = res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
