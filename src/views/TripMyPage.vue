<template>
  <div class="mypage-root">
    <div class="mypage-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripMyPage',
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
.mypage-root {
  min-height: calc(100vh - 100px);
  padding-top: 100px;
  display: flex;
  .mypage-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}
</style>
