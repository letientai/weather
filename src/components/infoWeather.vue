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
      {{ Math.round(weatherInfo?.temp) }}&deg;{{ unit.temp }}
    </div>
    <div class="description">
      {{ $t("feelsLike") }} {{ Math.round(weatherInfo?.feels_like) }}°{{
        unit.temp
      }}.
      {{ weatherInfo?.weather[0].description }}
    </div>
    <ul class="weather-items d-flex my-2">
      <li class="d-flex">
        <div class="imgage">
          <img
            class="wind-line"
            src="../assets/location-arrow-solid.svg"
            alt=""
            :style="`transform: rotate(${
              135 + (weatherInfo?.wind_deg || 0)
            }deg)`"
          />
        </div>
        <div class="text mx-1">
          {{ weatherInfo?.wind_speed.toFixed(1) }}{{ unit.wind }}
        </div>
      </li>
      <li>{{ weatherInfo?.pressure }}hPa</li>
      <li>{{ $t("humidity") }}: {{ weatherInfo?.humidity }}%</li>
      <li>
        {{ $t("dewPoint") }}: {{ Math.round(weatherInfo?.dew_point) }}°{{
          unit.temp
        }}
      </li>
      <li>{{ $t("UV") }}: {{ weatherInfo?.uvi }}°{{ unit.temp }}</li>
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
      unit: {
        temp: "",
        wind: "",
      },
    };
  },

  created() {
    this.fetchData();
    if (this.getUnit === "metric") {
      this.unit.temp = "C";
      this.unit.wind = "m/s";
    } else {
      this.unit.temp = "F";
      this.unit.wind = "mph";
    }
  },

  methods: {
    fetchData() {
      this.weatherInfo = this.getWeatherInformation.current;
      this.country = this.getCountryInformation;
      this.date = this.getDate(this.getCountryInformation.dt);
      this.check = true;
    },
    getDate(value) {
      // const date = new Date(value * 1000);
      // const dayOfWeek = date.toLocaleString(this.getLanguage, {
      //   weekday: "short",
      // });
      // const month = date.toLocaleString(this.getLanguage, { month: "short" });
      // const dayOfMonth = date.getDate();
      // const hour = date.getHours();
      // const minutes = date.getMinutes()
      // const formattedDate = `${dayOfWeek} ${month} ${dayOfMonth}, ${hour}: ${minutes}`;
      // return formattedDate;

      const date = new Date(value * 1000); // Convert seconds to milliseconds
      const timezoneOffset = date.getTimezoneOffset() * 60; // Convert offset to seconds
      const gmtOffset = this.country.timezone;
      const localTime = date.getTime() + (gmtOffset + timezoneOffset) * 1000; // Convert to local time
      const formattedTime = new Date(localTime).toLocaleString(
        this.getLanguage,
        {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }
      );
      return formattedTime;
    },
  },
  computed: {
    ...mapGetters("weather", [
      "getWeatherInformation",
      "getCountryInformation",
    ]),
    ...mapGetters("language", ["getLanguage"]),
    ...mapGetters("unit", ["getUnit"]),

    windDirection() {
      return this.weatherInfo.wind_deg;
    },
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
    getUnit(newVal) {
      if (newVal === "metric") {
        this.unit.temp = "C";
        this.unit.wind = "m/s";
      } else {
        this.unit.temp = "F";
        this.unit.wind = "mph";
      }
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
.imgage {
  width: 12px;
}
</style>
