<template>
  <div id="app">
    <TheHeadingVue />
    <router-view></router-view>
  </div>
</template>
<script>
import TheHeadingVue from './components/common/TheHeading.vue';
// import TripNavigateVue from './views/TripNavigate.vue';

export default {
  components: {
    // TripNavigateVue,
    TheHeadingVue,
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Kanit:ital,wght@0,500;0,600;1,500;1,600&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
#app {
  margin: 0 auto;
  min-height: 100vh;
  font-weight: normal;
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}
</style>
