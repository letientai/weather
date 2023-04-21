import axios from "axios";

const instance_2 = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_2_5,
  timeout: 5000,
});

const instance_3 = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_3_0,
  timeout: 5000,
});
const API_KEY_2_5 = process.env.VUE_APP_API_KEY_2_5;
const API_KEY_3_0 = process.env.VUE_APP_API_KEY_3_0;

export default {
  findCountries(data) {
    let vuex = JSON.parse(localStorage.getItem("vuex"));
    let unit = "";
    if (!vuex) {
      unit = process.env.VUE_APP_UNIT_DEFAULT;
    } else {
      unit = vuex.unit.unit;
    }
    return instance_2
      .get(`find?q=${data}&appid=${API_KEY_2_5}&units=${unit}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getWeather(lat, lon) {
    let vuex = JSON.parse(localStorage.getItem("vuex"));
    let lang = "";
    let unit = "";
    if (!vuex) {
      lang = process.env.VUE_APP_LANG_DEFAULT;
      unit = process.env.VUE_APP_UNIT_DEFAULT;
    } else {
      lang = vuex.language.lang;
      unit = vuex.unit.unit;
    }
    return instance_3
      .get(
        `onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY_3_0}&lang=${lang}`
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getCountry(id) {
    return instance_2
      .get(`weather?id=${id}&appid=${API_KEY_2_5}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
