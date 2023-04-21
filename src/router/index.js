import { createRouter, createWebHistory } from "vue-router";
import weather from "../views/weather.vue";
import home from "../views/home.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: home,
      meta: {
        layout: "default-layout",
      },
    },
    {
      path: "/weather",
      component: weather,
      meta: {
        layout: "default-layout",
      },
    },
    // ...
  ],
});

export default router;
