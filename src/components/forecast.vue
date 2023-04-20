<template lang="">
  <div class="forecast">
    <div class="title">{{ $t("titleDaily") }}</div>
    <div class="content">
      <ul v-if="!checkShowDetail">
        <li
          v-for="(data, index) in listDataDaily"
          :key="index"
          class="d-flex justify-content-between"
          @click="showDetail(index)"
        >
          <div class="date col d-flex">{{ getDate(data.dt) }}</div>
          <div class="temp col d-flex">
            <div
              class="icon"
              :style="{
                'background-image':
                  'url(https://openweathermap.org/img/wn/' +
                  data.weather[0].icon +
                  '@2x.png)',
              }"
            ></div>
            {{ Math.round(data.temp.max) }} / {{ Math.round(data.temp.min) }}°C
          </div>
          <div class="description col">{{ data.weather[0].description }}</div>
        </li>
      </ul>
      <forecastDetail
        v-else
        v-bind:dataDaily="dataDaily"
        @closeDetail="closeDetail"
      ></forecastDetail>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import forecastDetail from "./forecastDetail.vue";

export default {
  name: "forecaset-vue",
  components: {
    forecastDetail,
  },
  props: {
    listDataDaily: Array,
  },
  data() {
    return {
      dataDaily: {},
      checkShowDetail: false,
      indexDetail: 0,
    };
  },
  computed: {
    ...mapGetters("language", ["getLanguage"]),
  },
  methods: {
    getDate(value) {
      const date = new Date(value * 1000);
      const dayOfWeek = date.toLocaleString(this.getLanguage, {
        weekday: "short",
      });
      const month = date.toLocaleString(this.getLanguage, { month: "short" });
      const dayOfMonth = date.getDate();
      const formattedDate = `${dayOfWeek} ${month} ${dayOfMonth}`;
      return formattedDate;
    },

    showDetail(index) {
      this.dataDaily = this.listDataDaily[index];
      this.indexDetail = index;
      this.checkShowDetail = true;
    },
    
    closeDetail(check){
      this.checkShowDetail = check;
    }
  },
  watch: {
    listDataDaily() {
      this.dataDaily = this.listDataDaily[this.indexDetail];
    },
  },
};
</script>
<style scoped>
.forecast {
  padding-left: 20px;
}
.title {
  font-weight: bold;
  font-size: 20px;
}
ul {
  padding: 0;
  /* background: rebeccapurple; */
}
li {
  list-style-type: none;
  padding: 5px;
  font-size: 13px;
  /* background-color: red; */
  cursor: pointer;
  margin: 5px 0;
}
li:hover {
  background-color: rgb(243, 243, 243);
}
.description {
  font-size: 11px;
  color: #a3a3a3;
  justify-content: flex-end;
}
.col {
  display: flex;
  align-items: center;
}
.icon {
  width: 50px;
  height: 27px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
