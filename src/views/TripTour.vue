<template>
  <div class="tour-container">
    <TourMapVue />
  </div>
</template>

<script>
import TourMapVue from '../components/tour/TourMap.vue';
export default {
  name: 'TripTour',
  components: { TourMapVue },
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
