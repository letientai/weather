<template>
  <div id="app">
    <loader v-show="getLoader" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import loader from "./components/ultil/loader.vue";
export default {
  name: "App",
  components: {
    loader,
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters("loader", ["getLoader"]),
  },
 
};
</script>

<style>
body {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #48484a;
  position: relative;
}
</style>
