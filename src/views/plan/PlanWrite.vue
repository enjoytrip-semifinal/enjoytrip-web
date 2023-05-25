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
      dots: [], // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.
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

    this.drawLine();
  },

  methods: {
    drawLine() {
      console.log('그림 그려줭');
      let bounds = new kakao.maps.LatLngBounds();

      const linePath = this.planList.map((plan) => {
        console.log(plan);
        bounds.extend(new kakao.maps.LatLng(plan.mapy, plan.mapx));
        return new kakao.maps.LatLng(plan.mapy, plan.mapx);
      });
      console.log('[planList]', linePath);

      linePath.forEach((line, index) => {
        if (index === 0) {
          this.planLine = new kakao.maps.Polyline({
            map: this.mapInstance, // 선을 표시할 지도입니다
            path: [line], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: '#db4040', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
          });
          this.displayCircleDot(line, 0);
        } else {
          // 그려지고 있는 선의 좌표 배열을 얻어옵니다
          let path = this.planLine.getPath();

          // 좌표 배열에 클릭한 위치를 추가합니다
          path.push(line);

          // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
          this.planLine.setPath(path);

          let distance = Math.round(this.planLine.getLength());
          this.displayCircleDot(line, distance);
        }
      });

      // 마우스 클릭으로 그린 선의 좌표 배열을 얻어옵니다
      var path = this.planLine.getPath();
      // 선을 구성하는 좌표의 개수가 2개 이상이면
      if (path.length > 1) {
        // 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지웁니다
        if (this.dots[this.dots.length - 1].distance) {
          this.dots[this.dots.length - 1].distance.setMap(null);
          this.dots[this.dots.length - 1].distance = null;
        }

        var distance = Math.round(this.planLine.getLength()), // 선의 총 거리를 계산합니다
          content = this.getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

        // 그려진 선의 거리정보를 지도에 표시합니다
        this.showDistance(content, path[path.length - 1]);
      }

      // 지도를 중심으로 이동
      this.mapInstance.setBounds(bounds);
      // console.log('[지도 정보]', linePath);
    },

    getTimeHTML(distance) {
      // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
      var walkkTime = (distance / 67) | 0;
      var walkHour = '',
        walkMin = '';

      // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
      if (walkkTime > 60) {
        walkHour =
          '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 ';
      }
      walkMin = '<span class="number">' + (walkkTime % 60) + '</span>분';

      // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
      var bycicleTime = (distance / 227) | 0;
      var bycicleHour = '',
        bycicleMin = '';

      // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
      if (bycicleTime > 60) {
        bycicleHour =
          '<span class="number">' +
          Math.floor(bycicleTime / 60) +
          '</span>시간 ';
      }
      bycicleMin = '<span class="number">' + (bycicleTime % 60) + '</span>분';

      // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
      var content = '<ul class="dotOverlay distanceInfo">';
      content += '    <li>';
      content +=
        '        <span class="label">총거리</span><span class="number">' +
        distance +
        '</span>m';
      content += '    </li>';
      content += '    <li>';
      content += '        <span class="label">도보</span>' + walkHour + walkMin;
      content += '    </li>';
      content += '    <li>';
      content +=
        '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
      content += '    </li>';
      content += '</ul>';

      return content;
    },

    deleteDistnce() {
      if (this.totalDistanceOverlay) {
        this.totalDistanceOverlay.setMap(null);
        this.totalDistanceOverlay = null;
      }
    },

    // 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여
    // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수입니다
    displayCircleDot(position, distance) {
      // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
      this.circleOverlay = new kakao.maps.CustomOverlay({
        content: '<span class="dot">abc...</span>',
        position: position,
        zIndex: 1,
      });

      // 지도에 표시합니다
      console.log('[circleOverlay]', this.circleOverlay);
      this.circleOverlay.setMap(this.mapInstance);

      if (distance > 0) {
        // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
        this.distanceOverlay = new kakao.maps.CustomOverlay({
          content:
            '<div class="dotOverlay">거리 <span class="number">' +
            distance +
            '</span>m</div>',
          position: position,
          yAnchor: 1,
          zIndex: 2,
        });

        // 지도에 표시합니다
        this.distanceOverlay.setMap(this.mapInstance);
      }

      // 배열에 추가합니다
      this.dots.push({
        circle: this.circleOverlay,
        distance: this.distanceOverlay,
      });
    },

    showDistance(content, position) {
      console.log('[content]', content);

      if (this.totalDistanceOverlay) {
        // 커스텀오버레이가 생성된 상태이면
        console.log('이미있음!!!');
        // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
        this.totalDistanceOverlay.setPosition(position);
        this.totalDistanceOverlay.setContent(content);
      } else {
        // 커스텀 오버레이가 생성되지 않은 상태이면
        console.log('생성!!!');
        // 커스텀 오버레이를 생성하고 지도에 표시합니다
        this.totalDistanceOverlay = new kakao.maps.CustomOverlay({
          map: this.mapInstance, // 커스텀오버레이를 표시할 지도입니다
          content: content, // 커스텀오버레이에 표시할 내용입니다
          position: position, // 커스텀오버레이를 표시할 위치입니다.
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 3,
        });
      }
    },
  },
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
    border-top: 1px solid #9c9b9b;
    width: 100%;
    padding-top: 20px;

    .line {
      position: absolute;
      width: 3px;
      background-color: #bcbcbc;
      height: 100%;
      left: 35%;
      z-index: -1;
    }
  }
}
</style>
