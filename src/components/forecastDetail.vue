<template>
  <div>
    <div class="content">
      <div class="top-section d-flex">
        <div class="image">
          <img
            :src="
              `https://openweathermap.org/img/wn/` +
              daily?.weather[0].icon +
              `@2x.png`
            "
            alt=""
          />
        </div>
        <div class="description">
          <div class="weather">{{ daily?.weather[0]?.description }}.</div>
          <div>
            {{ $t("maxTemp") }}{{ Math.round(daily?.temp?.max) }}°C,
            {{ $t("minTemp") }} {{ Math.round(daily?.temp?.min) }}°C.
          </div>
        </div>
        <div class="close" @click="closeDetail">
          <img src="../assets/chevron-up.svg" alt="" />
        </div>
      </div>
      <ul class="weather-items d-flex my-2">
        <li>{{ daily?.rain }}mm ({{ daily?.pop * 100 }}%)</li>
        <li>{{ daily?.wind_speed.toFixed(1) }}m/s SSE</li>
        <li>{{ daily?.pressure }}hPa</li>
        <li>{{ $t("humidity") }}: {{ daily?.humidity }}%</li>
        <li>{{ $t("UV") }}:{{ Math.round(daily?.uvi) }}</li>
        <li>{{ $t("dewPoint") }}: {{ Math.round(daily?.dew_point) }}°C</li>
      </ul>

      <div class="temp-detail my-3">
        <table class="table">
          <tbody>
            <tr>
              <td></td>
              <td>{{ $t("morning") }}</td>
              <td>{{ $t("afternoon") }}</td>
              <td>{{ $t("evening") }}</td>
              <td>{{ $t("night") }}</td>
            </tr>
            <tr>
              <td class="title">{{ $t("temperature") }}</td>
              <td>{{ Math.round(daily?.temp?.morn) }}°C</td>
              <td>{{ Math.round(daily?.temp?.day) }}°C</td>
              <td>{{ Math.round(daily?.temp?.eve) }}°C</td>
              <td>{{ Math.round(daily?.temp?.night) }}°C</td>
            </tr>
            <tr>
              <td class="title">{{ $t("feelLike") }}</td>
              <td>{{ Math.round(daily?.feels_like?.morn) }}°C</td>
              <td>{{ Math.round(daily?.feels_like?.day) }}°C</td>
              <td>{{ Math.round(daily?.feels_like?.eve) }}°C</td>
              <td>{{ Math.round(daily?.feels_like?.night) }}°C</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bottom-section d-flex">
        <div class="sunrise text-center">
          <div class="title">{{ $t("sunrise") }}</div>
          <div class="time">{{ getTime(daily?.sunrise) }}</div>
        </div>
        <div class="sunrise text-center mx-3">
          <div class="title">{{ $t("sunset") }}</div>
          <div class="time">{{ getTime(daily?.sunset) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "forecast-detail",
  props: {
    dataDaily: Object,
  },

  data() {
    return {
      daily: this.dataDaily,
    };
  },

  watch: {
    dataDaily(newVal) {
      this.daily = newVal;
    },
  },

  methods: {
    closeDetail() {
      this.$emit("closeDetail", false);
    },
    getTime(value) {
      const dateObj = new Date(value * 1000);
      const hours = dateObj.getHours();
      const minutes = dateObj.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      const formattedTime = `${hours % 12}:${minutes
        .toString()
        .padStart(2, "0")}${ampm}`;
      return formattedTime;
    },
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  font-size: 16px !important;
}
.top-section {
  align-items: center;
  /* background: chocolate; */
  justify-content: space-between;
}
.table {
  border-color: #fff;
  padding: 0;
}
.table > :not(caption) > * > * {
  padding: 0;
}
.title {
  font-size: 11px;
  color: rgb(172, 172, 172);
}
.close {
  /* background-color: rebeccapurple; */
  display: flex;
  justify-content: flex-end;
  width: 25px;
  cursor: pointer;
}
.weather {
  font-weight: bold;
}
.image {
  width: 15%;
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
  margin: 0px 10px;
  width: 140px;
}
</style>
