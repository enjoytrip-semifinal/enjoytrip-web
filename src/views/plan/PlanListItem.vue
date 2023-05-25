<template>
  <div class="list-content">
    <div class="body-no">{{ plan.itineraryId }}</div>
    <div class="body-title" @click="onClickArticle">{{ plan.title }}</div>
    <div class="body-writer">{{ plan.nickname }}</div>
    <div class="body-date">{{ elapsedTime(plan.registerDate) }}</div>
  </div>
</template>

<script>
export default {
  name: 'TripPlanListItem',
  components: {},
  props: ['plan'],
  data() {
    return {};
  },
  created() {},
  methods: {
    onClickArticle() {
      this.$router.push(`/plan/list/${this.plan['itineraryId']}`);
    },
    elapsedTime(date) {
      const start = new Date(date);
      const end = new Date(); // 현재 날짜

      const diff = (end - start) / 1000; // 경과 시간

      const times = [
        { name: '시간', milliSeconds: 60 * 60 },
        { name: '분', milliSeconds: 60 },
      ];

      // 년 단위부터 알맞는 단위 찾기
      for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime >= 24) {
          return date.split(' ')[0];
        }
        // 큰 단위는 0보다 작은 소수 단위 나옴
        if (betweenTime > 0) {
          return `${betweenTime}${value.name} 전`;
        }
      }
      // 모든 단위가 맞지 않을 시
      return '방금 전';
    },
  },
};
</script>

<style scoped lang="scss">
.list-content {
  display: flex;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #8f8f8f;
  .body-no {
    flex: 1;
    text-align: center;
  }
  .body-title {
    flex: 5;
    text-align: center;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .body-writer {
    flex: 1;
    text-align: center;
  }
  .body-date {
    flex: 2;
    text-align: center;
  }
  .body-hit {
    flex: 1;
    text-align: center;
  }
}
</style>
