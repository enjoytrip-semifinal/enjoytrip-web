<template>
  <div class="map-container">
    <div class="controller">
      <button class="zoom-in" @click="zoom(-1)">
        <span class="material-symbols-outlined"> zoom_in </span>
      </button>
      <button class="zoom-out" @click="zoom(1)">
        <span class="material-symbols-outlined"> zoom_out </span>
      </button>
    </div>
    <div class="map-category">
      <div
        class="tour tag"
        @click="onClickTourTag"
        :class="{ active: category === 'tour' }"
      >
        <span class="material-symbols-outlined"> tour </span>
        <div class="name">관광지</div>
      </div>
      <div
        class="tour tag"
        @click="onClickCultureTag"
        :class="{ active: category === 'culture' }"
      >
        <span class="material-symbols-outlined"> home_work </span>
        <div class="name">문화시설</div>
      </div>
      <div
        class="tour tag"
        @click="onClickFestivalTag"
        :class="{ active: category === 'festival' }"
      >
        <span class="material-symbols-outlined"> festival </span>
        <div class="name">축제공연행사</div>
      </div>
      <div
        class="tour tag"
        @click="onClickPlanTag"
        :class="{ active: category === 'plan' }"
      >
        <span class="material-symbols-outlined"> next_plan </span>
        <div class="name">여행코스</div>
      </div>
      <div
        class="tour tag"
        @click="onClickLeportsTag"
        :class="{ active: category === 'reports' }"
      >
        <span class="material-symbols-outlined"> surfing </span>
        <div class="name">레포츠</div>
      </div>
      <div
        class="tour tag"
        @click="onClickLodgmentTag"
        :class="{ active: category === 'lodgment' }"
      >
        <span class="material-symbols-outlined"> bed </span>
        <div class="name">숙박</div>
      </div>
      <div
        class="tour tag"
        @click="onClickShoppingTag"
        :class="{ active: category === 'shopping' }"
      >
        <span class="material-symbols-outlined"> shopping_cart </span>
        <div class="name">쇼핑</div>
      </div>
      <div
        class="tour tag"
        @click="onClickRestaurantTag"
        :class="{ active: category === 'restaurant' }"
      >
        <span class="material-symbols-outlined"> restaurant </span>
        <div class="name">음식점</div>
      </div>
    </div>
    <div class="tour-plan-button" v-if="!isPlanShow" @click="onClickPlanBtn()">
      <span class="material-symbols-outlined"> distance </span>
    </div>
    <div class="tour-plan-sidebar" :class="{ active: isPlanShow }">
      <h3 class="plan-title">여행 계획</h3>
      <div class="close-button" @click="onClickSidebarCloseBtn(plan)">
        <span class="material-symbols-outlined"> chevron_right </span>
      </div>
      <div class="plans">
        <draggable
          v-model="planList"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <transition-group>
            <div class="plan" v-for="(plan, index) in planList" :key="index">
              <span
                class="material-symbols-outlined"
                @click="onClickPlanClose(plan)"
              >
                close
              </span>
              <img :src="plan.firstimage" alt="" />
              <div class="top-section">
                <h4 class="title">{{ plan.title }}</h4>
                <p class="address">{{ plan.addr1 + ' ' + plan.addr2 }}</p>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="button-area">
        <div class="reset-button" @click="onClickResetPlanBtn()">
          <span class="material-symbols-outlined"> delete </span>
        </div>
        <div class="resgister-button" @click="onClickGoPlanBtn()">
          <span class="material-symbols-outlined"> arrow_forward </span>
        </div>
      </div>
    </div>
    <div class="map-area">
      <div class="sidebar-container">
        <div class="search-area">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            v-model="input"
          />
          <div class="search-button" @click="onClickSearchBtn">
            <span class="material-symbols-outlined"> search </span>
          </div>
        </div>

        <div class="places">
          <div
            class="place"
            v-for="(place, index) in places"
            :key="index"
            @click="showOnMap(place)"
            :class="{ active: place === activePlace }"
          >
            <img :src="place.firstimage" alt="" />
            <div class="top-section">
              <h4 class="title">{{ place.title }}</h4>
              <p class="type">{{ changeTypeToString(place.contenttypeid) }}</p>
            </div>
            <div class="bottom-section">
              <p class="address">{{ place.addr1 + ' ' + place.addr2 }}</p>
              <div class="add-plan" @click="onClickPlanAddBtn(place)">
                내 계획에 담기
              </div>
            </div>
          </div>
          <infinite-loading :identifier="keyword" @infinite="infiniteHandler">
            <template #no-more>
              <span></span>
            </template>
          </infinite-loading>
        </div>
      </div>
      <div class="map" id="map" ref="map">
        <div class="overlay-popup" ref="placeOverlay" slot="overlay">
          <div v-if="overlayPlace">
            <img class="overlay-image" :src="overlayPlace.firstimage" />
            <h3 class="overlay-title">{{ overlayPlace.title }}</h3>
            <div class="overlay-address">
              {{ overlayPlace.addr1 + ' ' + overlayPlace.addr2 }}
            </div>
            <a class="close" href="#" @click.prevent="closeOverlay()"
              ><span class="material-symbols-outlined"> close </span></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tripInstance } from '@/utils/api';
import MarkerHandler from '@/utils/map/marker-handler';
import KakaoOverlay from '@/utils/map/overlay';
import InfiniteLoading from 'vue-infinite-loading';
import { mapState } from 'vuex';
import draggable from 'vuedraggable';

const userStore = 'userStore';

let kakao = window.kakao;
export default {
  name: 'TripMap',
  components: { InfiniteLoading, draggable },
  data() {
    return {
      mapInstance: null,
      mapOption: {
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        level: 3,
      },
      places: [], // empty
      markerList: [],
      markers: null, // marker handler
      activePlace: null, // selected place!
      overlay: null, // overlay 인스턴스
      overlayPlace: null, // overlay에 보여줄 장소
      page: 1,
      input: '', // 검색어
      keyword: '구미', // 타겟 검색어
      category: '', // 현재 카테고리
      contentType: '',
      isPlanShow: false,
      planList: [], // 내 여행계획 리스트
      planLine: null, // 여행 경로
      dots: [], // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.
      circleOverlay: null,
      distanceOverlay: null,
      totalDistanceOverlay: null,
    };
  },

  mounted() {
    const container = this.$refs.map;
    kakao = kakao || window.kakao;

    const { center, level } = this.mapOption;
    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level,
    });

    this.markers = new MarkerHandler(this.mapInstance, {
      markerClicked: (place) => {
        console.log('[clicked]', place);
        this.showOnMap(place);
        // 마커 클릭시
        this.overlayPlace = place;
        console.log(place);
        this.overlay.showAt(place.mapy, place.mapx);
      },
    });

    this.overlay = new KakaoOverlay(this.mapInstance, this.$refs.placeOverlay);
  },
  created() {},
  methods: {
    zoom(delta) {
      let curLevel = this.mapInstance.getLevel();
      // 변경 시 level이 달라져있는 경우
      if (curLevel !== this.mapOption.level) {
        this.mapOption.level = curLevel;
      }
      const level = this.mapOption.level + delta;
      this.mapOption.level = level;
    },
    showOnMap(place) {
      this.activePlace = place;
      this.mapOption.center = {
        lat: place.mapy,
        lng: place.mapx,
      };
    },
    closeOverlay() {
      this.overlay.hide();
    },
    updateLevel(level) {
      this.mapOption.level = level;
      console.log('[level]', this.mapOption.level);
    },

    loadSearchTripData(input) {
      tripInstance()
        .get(
          `/searchKeyword1?serviceKey=${process.env.VUE_APP_TRIP_API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${input}${this.contentType}`
        )
        .then((res) => {
          this.places = res.data.response.body.items.item;
          // 첫번째 검색 위치로 이동
          this.mapInstance.panTo(
            new kakao.maps.LatLng(this.places[0].mapy, this.places[0].mapx)
          );
          // 스크롤 맨 위로 이동
          window.document.getElementsByClassName('places')[0].scrollTo(0, 0);
          // create markers
          this.markerList.push(
            this.markers.add(this.places, (place) => {
              console.log('[maker 생성]', place);
              return { lat: place.mapy, lng: place.mapx };
            })
          );
        })
        .catch(() => {
          alert('관련 정보가 없습니다!');
          return;
        });
    },

    onClickSearchBtn() {
      if (this.keyword === '') {
        return;
      }

      this.page = 1;
      this.keyword = this.input;
      // 기존 마커들 삭제
      this.markers.removeAll(this.markerList);
      this.markerList = [];

      // 키워드로 api 불러오기
      this.loadSearchTripData(this.keyword);
    },

    infiniteHandler($state) {
      console.log('호출');
      let paramKeyword = this.keyword ? `${this.keyword}` : '구미';
      tripInstance()
        .get(
          `/searchKeyword1?serviceKey=${process.env.VUE_APP_TRIP_API_KEY}&numOfRows=10&pageNo=${this.page}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${paramKeyword}${this.contentType}`
        )
        .then(({ data }) => {
          if (data.response.body.items !== '') {
            console.log(data);
            this.page += 1;
            this.places.push(...data.response.body.items.item);
            $state.loaded();
            // create markers
            this.markerList.push(
              this.markers.add(data.response.body.items.item, (place) => {
                console.log('[maker 생성]', place);
                return { lat: place.mapy, lng: place.mapx };
              })
            );
          } else {
            $state.complete();
          }
        })
        .catch(() => {
          console.log('error!!');
        });
    },

    onClickTourTag() {
      if (this.category === 'tour') {
        this.category = '';
        return;
      }
      this.category = 'tour';
    },

    onClickCultureTag() {
      if (this.category === 'culture') {
        this.category = '';
        return;
      }
      this.category = 'culture';
    },

    onClickFestivalTag() {
      if (this.category === 'festival') {
        this.category = '';
        return;
      }
      this.category = 'festival';
    },

    onClickPlanTag() {
      if (this.category === 'plan') {
        this.category = '';
        return;
      }
      this.category = 'plan';
    },

    onClickLeportsTag() {
      if (this.category === 'reports') {
        this.category = '';
        return;
      }
      this.category = 'reports';
    },

    onClickLodgmentTag() {
      if (this.category === 'lodgment') {
        this.category = '';
        return;
      }
      this.category = 'lodgment';
    },

    onClickShoppingTag() {
      if (this.category === 'shopping') {
        this.category = '';
        return;
      }
      this.category = 'shopping';
    },

    onClickRestaurantTag() {
      if (this.category === 'restaurant') {
        this.category = '';
        return;
      }
      this.category = 'restaurant';
    },

    changeTypeToString(code) {
      if (code === '12') {
        return '관광지';
      }
      if (code === '14') {
        return '문화시설';
      }
      if (code === '15') {
        return '축제공연행사';
      }
      if (code === '25') {
        return '여행코스';
      }
      if (code === '28') {
        return '레포츠';
      }
      if (code === '32') {
        return '숙박';
      }
      if (code === '38') {
        return '쇼핑';
      }
      if (code === '39') {
        return '음식점';
      }
    },

    contentTypeChange(category) {
      if (category === 'tour') {
        this.contentType = '&contentTypeId=12';
        return;
      }
      if (category === 'culture') {
        this.contentType = '&contentTypeId=14';
        return;
      }
      if (category === 'festival') {
        this.contentType = '&contentTypeId=15';
        return;
      }
      if (category === 'plan') {
        this.contentType = '&contentTypeId=25';
        return;
      }
      if (category === 'reports') {
        this.contentType = '&contentTypeId=28';
        return;
      }
      if (category === 'lodgment') {
        this.contentType = '&contentTypeId=32';
        return;
      }
      if (category === 'shopping') {
        this.contentType = '&contentTypeId=38';
        return;
      }
      if (category === 'restaurant') {
        this.contentType = '&contentTypeId=39';
        return;
      }
      this.contentType = '';
    },
    onClickPlanBtn() {
      this.isPlanShow = true;
    },
    onClickSidebarCloseBtn() {
      this.isPlanShow = false;
    },
    onClickPlanAddBtn(place) {
      for (let i = 0; i < this.planList.length; i++) {
        if (
          this.planList[i].contentid + this.planList[i].contenttypeid ===
          place.contentid + place.contenttypeid
        ) {
          return;
        }
      }
      this.planList.push(place);
    },
    onClickPlanClose(place) {
      console.log(place);
      this.planList = this.planList.filter(
        (plan) =>
          plan.contentid + plan.contenttypeid !==
          place.contentid + place.contenttypeid
      );
    },
    onClickResetPlanBtn() {
      this.planList = [];
    },
    drawLine() {
      const linePath = this.planList.map((plan) => {
        console.log(plan);
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
      } else {
        // 선을 구성하는 좌표의 개수가 1개 이하이면
        // 지도에 표시되고 있는 선과 정보들을 지도에서 제거합니다.
        this.deleteClickLine();
        this.deleteCircleDot();
        this.deleteDistnce();
      }
    },
    deleteClickLine() {
      if (this.planLine) {
        this.planLine.setMap(null);
        this.planLine = null;
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

    // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
    deleteCircleDot() {
      for (let i = 0; i < this.dots.length; i++) {
        if (this.dots[i].circle) {
          this.dots[i].circle.setMap(null);
        }

        if (this.dots[i].distance) {
          this.dots[i].distance.setMap(null);
        }
      }

      this.dots = [];
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

    onClickGoPlanBtn() {
      console.log('[planList]', this.planList);
      this.$router.push({
        name: 'planWrite',
        params: {
          planList: JSON.stringify(this.planList),
        },
      });
    },
  },
  computed: {
    ...mapState(userStore, ['userInfo']),
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  watch: {
    'mapOption.level'(cur, prev) {
      this.mapInstance.setLevel(cur);
      console.log(`[LEVEL CHANGED] ${prev} => ${cur}`);
    },
    'mapOption.center'(cur) {
      this.mapInstance.panTo(new kakao.maps.LatLng(cur.lat, cur.lng));
    },
    activePlace() {
      setTimeout(() => {
        window.document
          .getElementsByClassName('place active')[0]
          .scrollIntoView({
            block: 'nearest',
          });
      }, 10);
    },
    category() {
      this.contentTypeChange(this.category);
      this.loadSearchTripData(this.keyword);
      this.page = 1;
      // 기존 마커들 삭제
      this.markers.removeAll(this.markerList);
      this.markerList = [];
    },
    planList() {
      this.deleteCircleDot();
      this.deleteClickLine();
      this.deleteDistnce();
      this.drawLine();
    },
  },
};
</script>

<style lang="scss">
.dot {
  overflow: hidden;
  float: left;
  width: 12px;
  height: 12px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png');
}
.dotOverlay {
  position: relative;
  bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
  font-size: 12px;
  padding: 5px;
  background: #fff;
}
.dotOverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.number {
  font-weight: bold;
  color: #ee6152;
}
.dotOverlay:after {
  content: '';
  position: absolute;
  margin-left: -6px;
  left: 50%;
  bottom: -8px;
  width: 11px;
  height: 8px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png');
}
.distanceInfo {
  position: relative;
  top: 5px;
  left: 5px;
  list-style: none;
  margin: 0;
}
.distanceInfo .label {
  display: inline-block;
  width: 50px;
}
.distanceInfo:after {
  content: none;
}
.map-container {
  position: relative;
  flex: 1;
  overflow: hidden;

  .controller {
    position: absolute;
    right: 20px;
    top: 30%;
    z-index: 10;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px 0px;
    border-radius: 6px;
    overflow: hidden;
    button {
      display: flex;
      width: 28px;
      height: 28px;
      border: 1px solid transparent;
      background-color: #f9f9f9;

      align-items: center;
      justify-content: center;
      &:hover {
        background-color: #ddd;
        border-color: #ddd;
        cursor: pointer;
      }
      &:active {
        background-color: #aaa;
        border-color: #aaa;
      }
    }
    .zoom-in {
      border-bottom: 1px solid #d5d5d5;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    .zoom-out {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  .map-category {
    position: absolute;
    display: flex;
    gap: 12px;
    left: 450px;
    top: 20px;
    z-index: 10;
    .tag {
      display: flex;
      background: #ffffff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 36px;
      font-size: 16px;
      font-weight: 700;
      padding: 6px 16px;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: #4a4a4a;
      cursor: pointer;
      &:hover {
        color: black;
      }
      &:active {
        background-color: #ffdaf6;
        color: #f95374;
      }

      &.active {
        background-color: #ffdaf6;
        color: #f95374;
      }

      span {
        height: 18px;
        width: 18px;
      }
    }
  }

  .tour-plan-button {
    display: flex;
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 10;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    margin: 10px;
    color: #4a4a4a;

    &:hover {
      color: black;
    }

    &:active {
      color: black;
      background-color: #ddd;
    }

    .material-symbols-outlined {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-variation-settings: 'FILL' 1, 'wght' 800, 'GRAD' 100, 'opsz' 48;
    }
  }

  .tour-plan-sidebar {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    transform: translatex(110%);
    transition: transform 0.4s ease-in-out;
    width: 400px;
    height: 100%;
    background-color: white;
    z-index: 10;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    background-color: #eee;

    &.active {
      transform: translateX(0px);
    }

    .plan-title {
      display: flex;
      font-size: 24px;
      font-weight: 700;
      align-items: center;
      justify-content: center;
      margin-top: 24px;
      margin-bottom: 24px;
    }

    .close-button {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 0px;
      top: 45%;
      left: -24px;
      background-color: white;
      border-radius: 4px 0px 0px 4px;
      cursor: pointer;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    }

    .button-area {
      height: 44px;
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      margin-bottom: 4px;
      .resgister-button {
        margin-right: 20px;
        cursor: pointer;
      }
      .reset-button {
        margin-right: 20px;
        cursor: pointer;
      }
    }

    .plans {
      display: flex;
      flex-direction: column;
      border-radius: 4px;
      margin: 0 12px;
      gap: 12px;
      height: 100%;
      overflow: scroll;
      -ms-overflow-style: none; /* 인터넷 익스플로러 */
      scrollbar-width: none; /* 파이어폭스 */
      &::-webkit-scrollbar {
        display: none; /* 크롬, 사파리, 오페라, 엣지 */
      }

      span {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .plan {
        position: relative;
        display: flex;
        height: 160px;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
          0 6px 6px rgba(0, 0, 0, 0.23);

        .material-symbols-outlined {
          position: absolute;
          top: 10px;
          right: 10px;
        }

        img {
          width: 160px;
          height: 160px;
          object-fit: cover;
          justify-self: flex-start;
          border-radius: 4px 0 0 4px;
        }
      }

      .top-section {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .title {
          font-size: 14px;
          font-weight: 600;
          margin-top: 20px;
          max-width: 166px;
        }

        .address {
          font-size: 12px;
          color: #8f8f8f;
          font-weight: 500;
          margin-top: 4px;
        }
      }
    }
  }

  .map-area {
    display: flex;
    height: 100%;
    #map {
      height: 100%;
      flex: 1 1 auto;
    }

    .sidebar-container {
      position: relative;
      display: flex;
      flex-direction: column;
      height: calc(100vh - 100px);
      width: 420px;
      background: #fefefe;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      z-index: 10;

      .search-area {
        position: fixed;
        width: 420px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 20px;
        border-bottom: 1px solid #ddd;
        background-color: white;
        z-index: 10;

        .search-button {
          position: absolute;
          top: 20px;
          right: 30px;
          cursor: pointer;
        }

        input {
          flex: 1;
          height: 44px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
            0 -1px 0px rgba(0, 0, 0, 0.02);
          padding-left: 12px;
        }
      }

      .places {
        flex: 1;
        margin-top: 69px;
        overflow: scroll;
        -ms-overflow-style: none; /* 인터넷 익스플로러 */
        scrollbar-width: none; /* 파이어폭스 */
        &::-webkit-scrollbar {
          display: none; /* 크롬, 사파리, 오페라, 엣지 */
        }
        .place {
          padding: 20px 12px;
          border: 1px solid transparent;
          border-bottom: 1px solid #ddd;
          img {
            width: 100%;
            height: 240px;
            object-fit: cover;
            border-radius: 6px;
          }
          .top-section {
            display: flex;
            align-items: center;
            margin-top: 12px;
            .title {
              display: flex;
              font-size: 16px;
              font-weight: 700;
              align-content: center;
            }
            .type {
              display: flex;
              font-size: 12px;
              font-weight: 500;
              color: #8f8f8f;
              align-content: center;
              margin-left: 6px;
            }
          }

          .bottom-section {
            display: flex;
            justify-content: space-between;
            .address {
              font-size: 12px;
              font-weight: 500;
              margin-top: 4px;
            }
            .add-plan {
              font-size: 12px;
              font-weight: 400;
              color: #cccccc;
              &:hover {
                color: black;
              }
            }
          }

          &:hover {
            background-color: aliceblue;
            cursor: pointer;
          }
          &:active {
            background-color: rgb(166, 197, 244);
          }
          &.active {
            background-color: rgb(236, 255, 172);
          }
          h4 {
            margin: 0;
          }
        }
      }
    }
    .overlay-popup {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 300px;
      height: 240px;
      background: url('@/assets/images/overlay-background.png') no-repeat;
      background-size: 300px 240px;
      padding: 15px 10px 55px 10px;
      filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.35));

      .overlay-image {
        position: absolute;
        width: 100%;
        top: 0px;
        left: 0px;
        height: 120px;
        object-fit: cover;
        border-radius: 14px 14px 0 0;
      }

      .overlay-title {
        position: absolute;
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;
        top: 130px;
      }

      .overlay-address {
        position: absolute;
        top: 10px;
        left: 20px;
        font-size: 12px;
        font-weight: 400;
        color: #8f8f8f;
        top: 156px;
      }

      .close {
        color: white;
        position: absolute;
        top: 10px;
        right: 10px;
        filter: drop-shadow(3px 3px 6px #00000d);
      }
    }
  }
}
</style>
