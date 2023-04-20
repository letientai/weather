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
    this.center = {
      lat: this.getWeatherInformation.lat,
      lng: this.getWeatherInformation.lon,
    };
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
