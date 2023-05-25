<template>
  <div class="place-container">
    <div class="trip-place-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripHotPlace',
  components: {},
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
.place-container {
  min-height: calc(100vh - 100px);
  padding-top: 100px;
  margin-bottom: 30px;
  display: flex;
  .trip-place-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}
</style>
