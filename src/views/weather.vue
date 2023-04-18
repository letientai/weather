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
    </div>
  </div>
</template>
<script>
import weatherAPI from "@/service/weatherAPI";
import controlVue from "../components/control.vue";
import headerVue from "../components/header.vue";
import infoWeather from "../components/infoWeather.vue";
import GoogleMap from "@/components/GoogleMap.vue";
import { mapGetters } from "vuex";

export default {
  name: "weather-vue",
  components: {
    "header-vue": headerVue,
    "control-vue": controlVue,
    "info-weather": infoWeather,
    GoogleMap,
  },
  computed: {
    ...mapGetters("weather", ["getWeatherInformation"]),
  },
  async created() {
    const data = JSON.parse(localStorage.getItem("vuex"));
    let lat = 48.8534;
    let lon = 2.3488;
    let id = 2988507;
    if (data?.weather.weatherInformation) {
      lat = data.weather.weatherInformation.lat;
      lon = data.weather.weatherInformation.lon;
      id = data.weather.country.id;
    }
    const country = await weatherAPI.getCountry(id);
    const res = await weatherAPI.getWeather(lat, lon);
    this.$store.dispatch("weather/setCountry", country.data);
    this.$store.dispatch("weather/setWeather", res.data);
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
</style>
