<template>
  <div class="mypage-home-root">
    <h2 class="title">마이페이지</h2>
    <div class="button-section">
      <div class="edit-area" @click="moveEdit()">회원 정보 수정<img src="@/assets/images/right-arrow.png"/></div>
      <div class="review-area" @click="moveReview()">리뷰 관리<img src="@/assets/images/right-arrow.png"/></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripMyPageMain',
  components: {},
  data() {
    return {
      message: '',
    };
  },
  created() {},
  methods: {
    moveEdit() {
      this.$router.push('/mypage/edit');
    },
    moveReview() {
      this.$router.push('/mypage/review');
    },
  },
};
</script>

<style scoped lang="scss">
.mypage-home-root {
  padding-left: 20px;
  .title {
    font-size: 32px;
    font-weight: 700;
    margin-top: 60px;
    margin-left: 8px;
  }
  .button-section {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    gap: 12px;
    .edit-area {
      display: flex;
      position: relative;
      background: #F5F5F5;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      height: 64px;
      font-size: 24px;
      font-weight: 700;
      align-items: center;
      padding: 0 20px;
      cursor: pointer;
      img {
        position: absolute;
        right: 20px;
      }
    }
    .review-area {
      display: flex;
      position: relative;
      background: #F5F5F5;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      height: 64px;
      font-size: 24px;
      font-weight: 700;
      align-items: center;
      padding: 0 20px;
      cursor: pointer;
      img {
        position: absolute;
        right: 20px;
      }
    }
  }
}
</style>