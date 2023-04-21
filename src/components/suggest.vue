<template>
  <ul class="search-dropdown-menu d-block">
    <li
      class="d-flex justify-content-between align-item-center"
      v-for="(item, index) in listSuggest"
      :key="index"
      @click="getWeather(item)"
    >
      <!-- {{ item }} -->
      <div class="name parameter">
        {{ item.name }}, {{ item?.sys?.country }}
      </div>
      <div class="temp parameter">
        {{ Math.round(item.main.temp - 273) }} °C
      </div>
      <div class="icon parameter">
        <img
          :src="
            `https://openweathermap.org/img/wn/` +
            item.weather[0].icon +
            `@2x.png`
          "
          alt=""
        />
      </div>
      <div class="location parameter">
        {{ item.coord.lat.toFixed(3) }}, {{ item.coord.lon.toFixed(3) }}
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "suggest-vue",
  props: {
    listSuggest: Array,
  },
  data() {
    return {
      list: this.listSuggest,
    };
  },

  methods: {
    ...mapGetters("language", ["getLanguage"]),
    ...mapActions("loader", ["setLoader"]),
    ...mapActions("weather", ["calloneWeather", "getCountry"]),

    async getWeather(item) {
      try {
        await this.setLoader(true);
        await Promise.all([
          this.calloneWeather(item.coord),
          this.getCountry(item.id),
        ]);
        await this.$router.push("/weather");
      } finally {
        await this.setLoader(false);
      }
    },
  },

  watch: {
    getLanguage() {
      this.getWeather();
    },
    listSuggest(newVal) {
      console.log(newVal);
    },
  },
};
</script>

<style scoped>
.search-dropdown-menu {
  width: 100%;
  padding: 0px;
  border: 1px solid #e9e9e9;
  border-top: none;
  z-index: 100;
  margin: 0;
}
ul {
  /* background: red; */
  font-size: 14px;
  display: flex;
}
li {
  /* background: darkblue; */
  list-style-type: none;
  padding: 0px 10px;
}
.name {
  width: 30%;
}
.parameter {
  display: flex;
  align-items: center;
  cursor: pointer;
}
li:hover {
  background-color: #f8f8f8;
}

.icon {
  width: 50px;
}
.icon img {
  width: 100%;
}
.location {
  color: #a0a0a0;
  font-size: 10px;
}
</style>
