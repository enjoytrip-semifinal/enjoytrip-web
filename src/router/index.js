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
// import PlaceView from '@/views/place/PlaceView';
import TripNoticeList from '@/views/notice/NoticeList';
import TripNoticeWrite from '@/views/notice/NoticeWrite';
import TripNoticeListView from '@/views/notice/NoticeListView';
import MyPageMain from '@/views/mypage/MyPageMain';
import MyPageReview from '@/views/mypage/MyPageReview';
import MyPageEdit from '@/views/mypage/MyPageEdit';
import TripBoardEdit from '@/views/board/BoardEdit';
import PlanWrite from '@/views/plan/PlanWrite';
import PlaceWrite from '@/views/place/PlaceWrite';
import PlanList from '@/views/plan/PlanList';
import PlanListView from '@/views/plan/PlanListView';

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
      {
        path: 'edit/:id',
        name: 'boardEdit',
        component: TripBoardEdit,
      },
    ],
  },
  {
    path: '/notice',
    name: 'notice',
    component: TripNotice,
    redirect: 'notice/list',
    children: [
      {
        path: 'list',
        name: 'noticeList',
        component: TripNoticeList,
      },
      {
        path: 'list/:id',
        name: 'noticeListView',
        component: TripNoticeListView,
      },
      {
        path: 'write',
        name: 'noticeWrite',
        component: TripNoticeWrite,
      },
    ],
  },
  {
    path: '/tour',
    name: 'Tour',
    component: TripTour,
  },
  {
    path: '/place',
    component: TripPlace,
    children: [
      {
        path: '',
        name: 'placeHome',
        component: PlaceMain,
      },
      // {
      //   path: ':id',
      //   name: 'placeView',
      //   component: PlaceView,
      // },
      {
        path: 'write',
        name: 'placeWrite',
        component: PlaceWrite,
      },
    ],
  },
  {
    path: '/plan',
    component: TripPlan,
    redirect: '/plan/list',
    children: [
      {
        path: 'write',
        name: 'planWrite',
        component: PlanWrite,
      },
      {
        path: 'list',
        name: 'planList',
        component: PlanList,
      },
      {
        path: 'list/:id',
        name: 'boardListView',
        component: PlanListView,
      },
    ],
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
    component: TripMyPage,
    children: [
      {
        path: '',
        name: 'myPageMain',
        component: MyPageMain,
      },
      {
        path: 'edit',
        name: 'myPageEdit',
        component: MyPageEdit,
      },
      {
        path: 'review',
        name: 'myPageReview',
        component: MyPageReview,
      },
    ],
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
