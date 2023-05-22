<template>
  <div class="notice-root">
    <div class="trip-notice-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "TripNotice",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.notice-root {
  min-height: calc(100vh - 100px);
  padding-top: 100px;
  display: flex;
  .trip-notice-container {
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
