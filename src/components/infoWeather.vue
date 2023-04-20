<template lang="">
  <div v-if="getWeatherInformation.lat" class="wrapper-info">
    <div class="date">{{ date }}</div>
    <div class="name">{{ country?.name }}, {{ country?.sys.country }}</div>
    <div class="temp d-flex mt-3">
      <div class="icon">
        <img
          :src="
            `https://openweathermap.org/img/wn/` +
            weatherInfo?.weather[0].icon +
            `@2x.png`
          "
          alt=""
        />
      </div>
      {{ Math.round(weatherInfo?.temp) }}°C
    </div>
    <div class="description">
      {{ $t("feelsLike") }} {{ Math.round(weatherInfo?.feels_like) }}°C.
      {{ weatherInfo?.weather[0].description }}
    </div>
    <ul class="weather-items d-flex my-2">
      <li>{{ weatherInfo?.wind_speed.toFixed(1) }}m/s SE</li>
      <li>{{ weatherInfo?.pressure }}hPa</li>
      <li>{{ $t("humidity") }}: {{ weatherInfo?.humidity }}%</li>
      <li>{{ $t("dewPoint") }}: {{ Math.round(weatherInfo?.dew_point) }}°C</li>
      <li>{{ $t("visibility") }}: {{ weatherInfo?.visibility / 1000 }}km</li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "info-weather",

  data() {
    return {
      weatherInfo: {},
      country: {},
      date: "",
      check: false,
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
        this.weatherInfo = this.getWeatherInformation.current;
        this.country = this.getCountryInformation;
        this.date = this.getDate(this.getWeatherInformation.current.dt);
        this.check = true;
    },
    getDate(value) {
      const date = new Date(value * 1000);
      const dayOfWeek = date.toLocaleString(this.getLanguage, { weekday: "short" });
      const month = date.toLocaleString(this.getLanguage, { month: "short" });
      const dayOfMonth = date.getDate();
      const formattedDate = `${dayOfWeek} ${month} ${dayOfMonth}`;
      return formattedDate;
    },
  },
  computed: {
    ...mapGetters("weather", [
      "getWeatherInformation",
      "getCountryInformation",
    ]),
    ...mapGetters("language", ["getLanguage"]),
  },

  watch: {
    getWeatherInformation(newVal) {
      this.weatherInfo = newVal.current;
      const timestamp = newVal.current.dt;
      this.date = this.getDate(timestamp);
    },
    getCountryInformation(newVal) {
      this.country = newVal;
    },
  },
};
</script>
<style scoped>
.wrapper-info {
  width: 100%;
}
.date {
  color: rgb(235, 93, 93);
  font-size: 14px;
}
.name {
  font-size: 25px;
  font-weight: bold;
}
.temp {
  width: 100%;
  font-size: 35px;
  align-items: center;
}
.temp .icon {
  width: 60px;
}
img {
  width: 100%;
}
.weather-items {
  flex-wrap: wrap;
  border-left: 1px solid orange;
  padding-left: 15px;
}
li {
  list-style-type: none;
  margin: 0px 15px;
  font-size: 14px;
}
</style>
