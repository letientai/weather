<template>
  <div id="app">
    <loader-vue v-show="getLoader" />
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
// import { computed } from "vue";
// import { useRoute } from "vue-router";
import { mapGetters } from "vuex";

export default {
  name: "App",
  // setup() {
  //   const route = useRoute();
  //   return {
  //     layout: computed(() => route.meta.layout),
  //   };
  // },
  computed: {
    ...mapGetters("loader", ["getLoader"]),
    layout() {
      return this.$route.meta.layout;
    },
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
