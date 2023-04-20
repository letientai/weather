import { createRouter, createWebHistory } from "vue-router";
import weather from "../views/weather.vue";
import home from "../views/home.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: home,
    },
    {
      path: "/weather",
      component: weather,
    },
    // ...
  ],
});

export default router;
