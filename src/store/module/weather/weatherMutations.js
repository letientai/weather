export default {
  async findCountry(state, payload) {
    state.listCountry = payload.data.list;
  },
  
  async calloneWeather(state, payload) {
    state.weatherInformation = payload.data;
  },

  async getCountry(state, payload) {
    state.country = payload.data;
  },
};
