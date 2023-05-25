<template>
  <div class="plan-root">
    <div class="plan-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripPlan',
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
.plan-root {
  min-height: calc(100vh);
  padding-top: 100px;
  margin-bottom: 30px;
  display: flex;
  .plan-container {
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
