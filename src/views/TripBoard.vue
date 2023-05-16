<template>
  <div class="board-root">
    <div class="trip-board-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripBoard',
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.board-root {
  min-height: calc(100vh - 100px);
  padding-top: 100px;
  display: flex;
  .trip-board-container {
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
