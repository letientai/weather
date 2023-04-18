import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  // headers: {'X-Custom-Header': 'foobar'}
});
const API_KEY = process.env.VUE_APP_API_KEY;

export default {
  findCountries(data) {
    return instance
      .get(`find?q=${data}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getWeather(lat, lon) {
    return instance
      .get(`onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getCountry(id){
    return instance
      .get(`weather?id=${id}&appid=${API_KEY}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
