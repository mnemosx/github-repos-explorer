import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import FourOhFour from '../views/FourOhFour.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search Results',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Results.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: FourOhFour
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
