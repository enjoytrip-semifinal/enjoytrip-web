<template>
  <div class="plan-card-box">
    <div class="card-header">
      <div class="number">{{ `${index + 1}` }}</div>
      {{ changeType(plan.contenttypeid) }}
    </div>
    <div class="card-body">
      <div class="card-content">
        <h4 class="content-title">
          {{ plan.title }}
        </h4>
        <p class="content-content">{{ `${plan.addr1} ${plan.addr2}` }}</p>
      </div>
      <img :src="plan.firstimage" alt="" />
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
import { changeTypeToString } from '@/utils/tour';

export default {
  name: 'TripPlanCard',
  components: {},
  props: ['plan', 'index'],
  data() {
    return {
      message: '',
    };
  },
  created() {},
  methods: {
    changeType(code) {
      return changeTypeToString(code);
    },
  },
};
</script>

<style scoped lang="scss">
.plan-card-box {
  width: 400px;
  height: 220px;
  border-radius: 8px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 20px;
  z-index: 100;
  background-color: white;
  margin-top: 22px;
  margin-bottom: 40px;

  .card-header {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
    color: #ff8080;

    .number {
      height: 28px;
      width: 28px;
      background-color: #ff8080;
      color: white;
      border-radius: 50%;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }
  }

  .card-body {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;

    .card-content {
      .content-title {
        font-size: 18px;
        font-weight: 600;
      }

      .content-content {
        font-size: 14px;
        font-weight: 500;
        color: #707070;
        margin-right: 10px;
      }
    }

    img {
      width: 120px;
      height: 120px;
      border-radius: 8px;
      object-fit: cover;
    }
  }
}
</style>
