<template lang="">
  <div>
    <div class="header">
      <header-vue />
    </div>
    <div class="section" id="weather-widget">
      <control-vue />
    </div>
    <div class="section-content my-4">
      <div class="grid-container d-flex justify-content-between">
        <div class="col-4">
          <info-weather />
        </div>
        <div class="col-7 bg-dark"><google-map /></div>
      </div>
      <div class="grid-container d-flex justify-content-between mt-4">
        <div class="chart col-6">
          <lineChart v-bind:dataHourly="dataHourly" />
        </div>
        <div class="forecast col ml-2">
          <forecastVue v-bind:listDataDaily="dataDaily" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import controlVue from "../components/control.vue";
import headerVue from "../components/header.vue";
import infoWeather from "../components/infoWeather.vue";
import GoogleMap from "@/components/GoogleMap.vue";
import lineChart from "../components/chart.vue";
import { mapActions, mapGetters } from "vuex";
import forecastVue from "@/components/forecast.vue";

export default {
  name: "weather-vue",
  components: {
    "header-vue": headerVue,
    "control-vue": controlVue,
    "info-weather": infoWeather,
    GoogleMap,
    lineChart,
    forecastVue,
  },

  data() {
    return {
      dataHourly: {
        temp: [],
        hour: [],
        rain: [],
      },
      dataDaily: [],
    };
  },

  computed: {
    ...mapGetters("weather", [
      "getWeatherInformation",
      "getCountryInformation",
    ]),
    ...mapGetters("language", ["getLanguage"]),
  },

  created() {
    this.fetchData();
  },

  methods: {
    ...mapActions("weather", ["calloneWeather"]),
    ...mapActions("loader", ["setLoader"]),
    ...mapActions("weather", ["getCountry"]),

    fetchData() {
      // this.setLoader(true);
      const data = JSON.parse(localStorage.getItem("vuex"));
      // //gán địa chỉ mặc định khi chưa có data ở Localstorage
      // let hourly = [];
      // let lat = 48.8534;
      // let lon = 2.3488;
      // let id = 2988507;
      // if (data?.weather.weatherInformation.hourly) {
      //   hourly = data.weather.weatherInformation.hourly;
      //   lat = data.weather.weatherInformation.lat;
      //   lon = data.weather.weatherInformation.lon;
      //   id = data.weather.country.id;
      //   // Gán dữ liệu cho biểu đồ Chart
      //   this.dataHourly.rain = hourly?.map((x) => {
      //     if (x.rain) {
      //       return x.rain["1h"];
      //     } else {
      //       return 0;
      //     }
      //   });
      //   this.dataHourly.temp = hourly.map((x) => x.temp);
      //   this.dataHourly.hour = hourly.map((x) =>
      //     new Date(x.dt * 1000).getHours()
      //   );
      //   // Gán dữ liệu forecast
      //   this.dataDaily = data.weather.weatherInformation.daily;
      // }
      // //gọi API với địa chỉ mặc đỉnh hoặc địa chỉ trong Localstorage nếu có
      this.$i18n.locale = data.language.lang
      this.setLoader(true);
      const weather = this.getWeatherInformation;
      this.calloneWeather(weather);
      this.getCountry(this.getCountryInformation.id);
      this.setLoader(false);
    },
  },

  watch: {
    getWeatherInformation(newVal) {
      let rain = newVal.hourly.map((x) => {
        if (x.rain) {
          return x.rain["1h"];
        } else {
          return 0;
        }
      });
      let temp = newVal.hourly.map((x) => x.temp);
      let hour = newVal.hourly.map((x) => {
        new Date(x.dt * 1000).getHours();
      });
      this.dataHourly = {
        temp,
        hour,
        rain,
      };
      this.dataDaily = newVal.daily;
    },
    getLanguage() {
      this.fetchData();
    },
  },
};
</script>
<style scoped>
#weather-widget {
  font-family: Space Grotesk, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #48484a;
  width: 100%;
  margin: 0;
  padding: 0;
  position: sticky;
  z-index: 10;
}
.section {
  width: 100%;
}
.chart {
  width: 470px;
  overflow: hidden;
}
</style>
