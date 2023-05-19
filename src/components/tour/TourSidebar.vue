<template>
  <div class="sidebar-container">사이드 바</div>
</template>

<script>
export default {
  name: 'TourSidebar',
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
.sidebar-container {
  display: flex;
  width: 420px;
  background: #FEFEFE;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
}
</style>