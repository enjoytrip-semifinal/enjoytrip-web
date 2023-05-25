<template>
  <div class="plan-write-root">
    <div><h2 class="title">여행 계획 작성</h2></div>
    <div class="content">
      <div class="map" id="map" ref="map"></div>
      <div class="input-area">
        <form class="input-form">
          <div class="title-area">
            <label for="title">제목</label>
            <input type="text" id="title" placeholder="제목을 입력해주세요." />
          </div>
          <div class="content-area">
            <label for="title">내용</label>
            <textarea
              id="content"
              class="content-input"
              placeholder="여행 계획에 대한 설명을 50자 이내로 설명해주세요."
            />
          </div>
        </form>
        <div class="button-section">
          <button class="upload-button" @click.prevent="onClickSubmitBtn">
            등록
          </button>
          <button class="cancel-button" @click.prevent="onClickCancelBtn">
            취소
          </button>
        </div>
      </div>
    </div>
    <div class="plan-list">
      <div class="line"></div>
      <div class="plan-item" v-for="(item, index) in planList" :key="index">
        <PlanCard :plan="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
import PlanCard from '../../components/plan/PlanCard.vue';

let kakao = window.kakao;

export default {
  name: 'TripPlanWrite',
  components: { PlanCard },
  data() {
    return {
      mapInstance: null,
      planList: JSON.parse(this.$route.params.planList),
      mapOption: {
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        level: 6,
      },
    };
  },
  created() {},

  mounted() {
    const container = this.$refs.map;
    kakao = kakao || window.kakao;

    const { center, level } = this.mapOption;
    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level,
    });
  },

  methods: {},
};
</script>

<style scoped lang="scss">
.plan-write-root {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  margin-bottom: 30px;
  max-width: 1200px;

  .title {
    margin-top: 48px;
    font-size: 32px;
    font-weight: 700;
  }
  .content {
    display: flex;
    margin-top: 48px;
    height: 100%;
    max-height: 1080px;

    .map {
      width: 580px;
      height: 700px;
    }
    .input-area {
      width: 480px;
      margin-left: 20px;
      height: 700px;

      .input-form {
        display: flex;
        flex-direction: column;

        label {
          font-size: 18px;
          font-weight: 700;
          margin-right: 48px;
          margin-left: 12px;
          margin-top: 8px;
          margin-bottom: 8px;
        }

        input {
          padding-left: 12px;
          height: 40px;
          border: 1px solid #d1d1d1;
          border-radius: 6px;
          font-family: 'Noto Sans KR', sans-serif;
          font-weight: 500;
          font-size: 18px;
        }

        .title-area {
          display: flex;
          flex-direction: column;
          padding: 0 20px;
        }

        .content-area {
          display: flex;
          flex-direction: column;
          padding: 0 20px;

          .content-input {
            border-radius: 8px;
            height: 120px;
            font-size: 18px;
            font-weight: 500;
            padding: 10px;
            resize: none;
            border: 1px solid #d1d1d1;
          }
        }
      }

      .button-section {
        position: relative;
        bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 420px;
        gap: 16px;
        justify-self: flex-end;
        button {
          width: 100px;
          height: 44px;
          text-align: center;
          border-radius: 8px;
          cursor: pointer;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 32px;
        }
        .upload-button {
          background-color: #ff8080;
          color: white;
        }

        .cancel-button {
          background-color: #707070;
          color: white;
        }
      }
    }
  }

  .plan-list {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 48px;
    padding-top: 20px;
    border-top: 1px solid #9c9b9b;
    width: 100%;
    gap: 42px;

    .line {
      position: absolute;
      width: 2px;
      background-color: #bcbcbc;
      height: 100%;
      left: 35%;
      z-index: -1;
    }
  }
}
</style>
