<template>
  <main class="home-container">
    <section class="section-1">
      <img class="main-img" src="../assets/images/MainPlace.png" alt="" />
      <div class="main-back"></div>
      <div class="motto-container">
        {{
          `There are no foreign lands.\n
          It is the traveler only who is foreign.`
        }}
        <button @click="onClickStartBtn" class="start-button">시작하기</button>
      </div>
    </section>
    <section class="section-2" ref="stage1">
      <h2 class="sub-title">SERVICE</h2>
      <div class="content-box">
        <div class="content">
          <div>
            <img class="main-img" src="@/assets/images/tour.png" alt="" />
          </div>
          <p class="content-title">전국 관광지 조회</p>
          <p class="content-script">
            전국에 있는 잘 알려진 관광지, 잘 알려지지 않은 관광지를 조회해보실
            수 있습니다. 원하는 지역을 골라 편하게 관광지를 찾아보세요.
          </p>
        </div>
        <div class="content">
          <div>
            <img class="main-img" src="@/assets/images/review.png" alt="" />
          </div>
          <p class="content-title">전국 관광지 조회</p>
          <p class="content-script">
            전국에 있는 잘 알려진 관광지, 잘 알려지지 않은 관광지를 조회해보실
            수 있습니다. 원하는 지역을 골라 편하게 관광지를 찾아보세요.
          </p>
        </div>
        <div class="content">
          <div>
            <img class="main-img" src="@/assets/images/smile.png" alt="" />
          </div>
          <p class="content-title">전국 관광지 조회</p>
          <p class="content-script">
            전국에 있는 잘 알려진 관광지, 잘 알려지지 않은 관광지를 조회해보실
            수 있습니다. 원하는 지역을 골라 편하게 관광지를 찾아보세요.
          </p>
        </div>
      </div>
    </section>
    <section class="section-3">
      <h2 class="sub-title">HOT PLACE</h2>
      <div class="card-container">
        <PlaceCardVue :imgUrl="imgUrl[0]" />
        <PlaceCardVue :imgUrl="imgUrl[1]" />
        <PlaceCardVue :imgUrl="imgUrl[2]" />
      </div>
    </section>
  </main>
</template>

<script>
import PlaceCardVue from '../components/home/PlaceCard.vue';

export default {
  name: 'TripHome',
  components: {
    PlaceCardVue,
  },
  data() {
    return {
      imgUrl: [
        require('@/assets/images/test1.png'),
        require('@/assets/images/test2.png'),
        require('@/assets/images/test3.png'),
      ],
    };
  },
  created() {},
  methods: {
    onClickStartBtn() {
      this.$refs.stage1.scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>

<style scoped lang="scss">
.home-container {
  overflow: hidden;
  .section-1 {
    height: 100vh;
    position: relative;
    min-height: 900;

    .main-img {
      position: absolute;
      top: 0;
      right: 0;
      width: 75%;
      height: 100%;
      z-index: -2;
      object-fit: cover;
    }
    .main-back {
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
      background: linear-gradient(
        90deg,
        #fefefe 2.6%,
        rgba(254, 254, 254, 0) 50%
      );
      width: 76%;
      min-height: 100vh;
    }

    .motto-container {
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 40vh;
      width: 750px;
      display: flex;
      font-family: 'Baloo 2', cursive;
      font-size: 32px;
      font-weight: 800;
      align-items: center;
      text-align: center;
      white-space: pre;
      line-height: 63px;

      .start-button {
        width: 180px;
        height: 64px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        font-family: 'Noto Sans KR', sans-serif;
        border-radius: 16px;
        background-color: #ff8080;
        color: white;
        font-size: 24px;
        font-weight: 700;
        border: none;
        margin-top: 24px;
        cursor: pointer;
      }
    }
  }

  .section-2 {
    /* height: 100vh; */
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 900px;

    .sub-title {
      font-size: 64px;
      font-family: 'Baloo 2', cursive;
      margin-top: 20vh;
    }

    .content-box {
      width: 100%;
      display: flex;
      flex: 1;
      justify-content: space-around;
      margin-top: 84px;

      .content {
        display: flex;
        flex-direction: column;
        align-items: center;

        .content-title {
          font-size: 32px;
          font-weight: 700;
          margin-top: 44px;
        }

        .content-script {
          width: 360px;
          font-size: 16px;
          line-height: 29px;
          font-weight: 500;
          margin-top: 32px;
          text-align: center;
        }

        img {
          height: 128px;
          width: 128px;
          flex: 1;
        }
      }
    }
  }

  .section-3 {
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 900px;

    .sub-title {
      font-size: 64px;
      font-family: 'Baloo 2', cursive;
      margin-top: 20vh;
    }

    .card-container {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      gap: 48px;
      margin-top: 120px;
      justify-content: center;
    }
  }
}
</style>
