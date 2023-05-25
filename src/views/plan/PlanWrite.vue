<template>
  <div>
    <div>이거 뭐임?</div>
    <!-- <div>{{ planList[0].title }}</div> -->
  </div>
</template>

<script>
export default {
  name: 'TripPlanWrite',
  components: {},
  data() {
    return {
      planList: this.$route.params.planList,
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
