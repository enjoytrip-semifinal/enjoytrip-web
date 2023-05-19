<template>
  <div class="tour-container">
    <TourSidebarVue />
    <TourMapVue />
  </div>
</template>

<script>
import TourMapVue from '../components/tour/TourMap.vue';
import TourSidebarVue from '../components/tour/TourSidebar.vue';
export default {
  name: 'TripTour',
  components: {TourMapVue, TourSidebarVue},
  data() {
    return {
      message: '',
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.tour-container {
  min-height: calc(100vh - 100px);
  padding-top: 100px;
  display: flex;
}
</style>
