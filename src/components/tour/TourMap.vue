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
    <div class="tour-plan-button" @click="onClickPlanBtn()">
      <span class="material-symbols-outlined">
        distance
      </span>
    </div>
    <div class="tour-plan-sidebar" :class="{active: isPlanShow}">
      <h3 class="plan-title">여행 계획</h3>
      <div class="close-button" @click="onClickSidebarCloseBtn()"><span class="material-symbols-outlined">
chevron_right
</span></div>
      <div class="plans">
        <div
            class="plan"
            v-for="(plan, index) in planList"
            :key="index"
          >
          <span class="material-symbols-outlined">
            close
          </span>
            <img :src="plan.firstimage" alt="" />
            <div class="top-section">
              <h4 class="title">{{ plan.title }}</h4>
              <p class="address">{{ plan.addr1 + ' ' + plan.addr2 }}</p>
            </div>
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
              <div class="add-plan" @click="onClickPlanAddBtn(place)">내 계획에 담기</div>
            </div>
          </div>
          <infinite-loading :identifier="keyword" @infinite="infiniteHandler">
            <template #no-more>
              <span></span>
            </template>
          </infinite-loading>
        </div>
      </div>
      <div id="map" ref="map">
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

const userStore = 'userStore';

let kakao = window.kakao;
export default {
  name: 'TripMap',
  components: { InfiniteLoading },
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
      this.isPlanShow = true
    },
    onClickSidebarCloseBtn() {
      this.isPlanShow = false
    },
    onClickPlanAddBtn(place) {
      this.planList.push(place);
    },
  },
  computed: {
    ...mapState(userStore, ['userInfo']),
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
  },
};
</script>

<style scoped lang="scss">
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
      font-variation-settings:
      'FILL' 1,
      'wght' 800,
      'GRAD' 100,
      'opsz' 48
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
      top: 50%;
      left: -24px;
      background-color: white;
      border-radius: 4px 0px 0px 4px ;
      cursor: pointer;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
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

      .plan {
        position: relative;
        display: flex;
        height: 160px;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

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
