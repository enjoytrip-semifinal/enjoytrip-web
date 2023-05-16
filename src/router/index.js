import Vue from 'vue';
import VueRouter from 'vue-router';
import TripHome from '@/views/TripHome.vue';
import TripNotice from '@/views/TripNotice';
import TripBoard from '@/views/TripBoard';
import TripTour from '@/views/TripTour';
import TripPlace from '@/views/TripPlace';
import TripPlan from '@/views/TripPlan';
import TripLogin from '@/views/TripLogin';
import TripSignUp from '@/views/TripSignUp';
import TripMyPage from '@/views/TripMyPage';
import TripBoardList from '@/views/board/BoardList';
import TripBoardWrite from '@/views/board/BoardWrite';
import TripBoardListView from '@/views/board/BoardListView';
import PlaceMain from '@/views/place/PlaceMain';
import PlaceView from '@/views/place/PlaceView';

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
    redirect: '/board/list',
    children: [
      {
        path: 'list',
        name: 'boardList',
        component: TripBoardList,
      },
      {
        path: 'list/:id',
        name: 'boardListView',
        component: TripBoardListView,
      },
      {
        path: 'write',
        name: 'boardWrite',
        component: TripBoardWrite,
      },
    ],
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
    children: [
      {
        path: '',
        name: 'placeHome',
        component: PlaceMain,
      },
      {
        path: ':id',
        name: 'placeView',
        component: PlaceView,
      },
    ],
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
  {
    path: '/mypage',
    name: 'mypage',
    component: TripMyPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
