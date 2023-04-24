<template lang="">
  <div>
    <div class="header">
      <header-vue />
    </div>
    <div class="section" id="weather-widget">
      <control-vue />
    </div>
    <div class="section-content my-4">
      <div
        class="grid-container d-block d-md-flex px-3 px-md-2 px-lg-2 px-xl-0 justify-content-between"
      >
        <div class="col-12 col-md-4">
          <info-weather />
        </div>
        <div class="col-12 col-md-7 bg-dark"><google-map /></div>
      </div>
      <div
        class="grid-container d-block d-md-flex px-3 px-md-2 px-lg-2 px-xl-0 justify-content-between mt-4"
      >
        <div class="chart col-12 col-md-6">
          <lineChart v-bind:dataHourly="dataHourly" />
        </div>
        <div class="forecast col-12 col-md-6 ml-2">
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
    ...mapGetters("unit", ["getUnit"]),
  },

  created() {
    this.fetchData();
  },

  methods: {
    ...mapActions("weather", ["calloneWeather"]),
    ...mapActions("loader", ["setLoader"]),
    ...mapActions("weather", ["getCountry"]),

    async fetchData() {
      const data = JSON.parse(localStorage.getItem("vuex"));
      if (data) {
        this.$i18n.locale = data.language.lang;
        const weather = this.getWeatherInformation;

        try {
          await this.setLoader(true);
          await Promise.all([
            this.calloneWeather(weather),
            this.getCountry(this.getCountryInformation.id),
          ]);
          await this.$router.push("/weather");
        } finally {
          await this.setLoader(false);
        }
      }
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
      let hour = newVal.hourly.map((x) => new Date(x.dt * 1000).getHours());
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
    getUnit() {
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
  max-width: 470px;
  overflow: hidden;
}
@media screen and (max-width: 992px) {
  .chart {
    /* margin: auto; */
    max-width: 50vw;
  }
}
@media screen and (max-width: 768px) {
  .chart {
    /* margin: auto; */
    max-width: 90vw;
  }
}
</style>
