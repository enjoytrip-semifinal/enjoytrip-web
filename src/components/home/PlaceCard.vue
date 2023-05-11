<template>
  <div class="card-box">
    <img :src="this.imgUrl" alt="" />
    <div class="card-body">
      <div class="title">제목</div>
      <div class="content">
        {{
          `여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...`
        }}
      </div>
      <div class="address">
        {{ `경북 구미시 3공단3로 302 ` }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaceCard',
  components: {},
  props: ['imgUrl'],
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.card-box {
  display: flex;
  height: 424px;
  width: 424px;
  border-radius: 24px;

  img {
    transition-duration: 0.25s;
  }

  .card-body {
    z-index: 5;
    display: flex;
    position: absolute;
    height: 424px;
    width: 424px;
    flex-direction: column;
    align-items: center;
    color: rgba($color: #ffffff, $alpha: 0);
    transition-duration: 0.25s;

    .title {
      font-size: 28px;
      font-weight: 700;
      margin-top: 64px;
    }

    .content {
      flex: 1;
      font-size: 16px;
      font-weight: 400;
      margin-top: 48px;
      margin-left: 44px;
      margin-right: 44px;
    }

    .address {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 32px;
      margin-left: auto;
      margin-right: 32px;
    }
  }

  &:hover {
    img {
      filter: brightness(30%);
      transition-duration: 0.4s;
    }
    .card-body {
      display: flex;
      color: rgba($color: #ffffff, $alpha: 1);
      transition-duration: 0.4s;
    }
  }
}
</style>
