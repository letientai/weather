import { createRouter, createWebHistory } from 'vue-router';
import weather from "../views/weather.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: weather
    },
    {
      path: '/about',
      component: weather
    },
    // ...
  ]
});

export default router
