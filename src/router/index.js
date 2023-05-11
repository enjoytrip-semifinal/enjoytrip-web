import Vue from 'vue';
import VueRouter from 'vue-router';
import TripHome from '../views/TripHome.vue';
import TripNotice from '../views/TripNotice';
import TripBoard from '../views/TripBoard';
import TripTour from '../views/TripTour';
import TripPlace from '../views/TripPlace';
import TripPlan from '../views/TripPlan';
import TripLogin from '../views/TripLogin';
import TripSignUp from '../views/TripSignUp';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: TripHome,
  },
  {
    path: '/board',
    name: 'board',
    component: TripBoard,
  },
  {
    path: '/notice',
    name: 'notice',
    component: TripNotice,
  },
  {
    path: '/tour',
    name: 'Tour',
    component: TripTour,
  },
  {
    path: '/place',
    name: 'place',
    component: TripPlace,
  },
  {
    path: '/plan',
    name: 'plan',
    component: TripPlan,
  },
  {
    path: '/login',
    name: 'login',
    component: TripLogin,
  },
  {
    path: '/signup',
    name: 'signup',
    component: TripSignUp,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
