<template>
  <div v-if="getWeatherInformation.lat" class="gg-map" style="z-index: 1">
    <GMapMap :center="center" :zoom="10" style="width: 100%; height: 265px">
      <GMapMarker></GMapMarker>
    </GMapMap>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GoogleMap",
  data() {
    return {
      center: {},
    };
  },
  created() {
    const data = JSON.parse(localStorage.getItem("vuex"));
    if (data?.weather.weatherInformation) {
      this.center = {
        lat: data?.weather.weatherInformation.lat,
        lng: data?.weather.weatherInformation.lon,
      };
    }
  },
  computed: {
    ...mapGetters("weather", ["getWeatherInformation"]),
  },
  watch: {
    getWeatherInformation(newVal) {
      this.center = {
        lat: newVal.lat,
        lng: newVal.lon,
      };
    },
  },
};
</script>
