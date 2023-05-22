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
    <div class="map-area">
      <div class="sidebar-container">
        <div class="search-area">
          <input type="text" placeholder="검색어를 입력해주세요." />
        </div>
        <div class="places">
          <div
            class="place"
            v-for="place in places"
            :key="place.contentid"
            @click="showOnMap(place)"
          >
            <img :src="place.firstimage" alt="" />
            <div class="top-section">
              <h4 class="title">{{ place.title }}</h4>
              <p class="type">{{ changeTypeToString(place.contenttypeid) }}</p>
            </div>
            <p class="address">{{ place.addr1 + ' ' + place.addr2 }}</p>
          </div>
        </div>
      </div>
      <div id="map" ref="map"></div>
    </div>
  </div>
</template>

<script>
import { tripInstance } from '@/utils/api';
// import { changeTypeToString } from '@/utils/tour';

let kakao = window.kakao;
export default {
  name: 'TripMap',
  components: {},
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
    };
  },
  mounted() {
    kakao = kakao || window.kakao;

    const container = this.$refs.map;
    const { center, level } = this.mapOption;
    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level,
    });

    // 공공 데이터 불러오기
    tripInstance()
      .get(
        `locationBasedList1?serviceKey=${process.env.VUE_APP_TRIP_API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000`
      )
      .then((res) => {
        this.places = res.data.response.body.items.item;
        console.log(res.data.response.body.items.item);
        console.log(
          this.changeTypeToString(
            res.data.response.body.items.item[0].contenttypeid
          )
        );
      });
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
      this.mapOption.center = {
        lat: place.mapy,
        lng: place.mapx,
      };
    },
    updateLevel(level) {
      this.mapOption.level = level;
      console.log('[level]', this.mapOption.level);
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
  },
  computed: {},
  watch: {
    'mapOption.level'(cur, prev) {
      this.mapInstance.setLevel(cur);
      console.log(`[LEVEL CHANGED] ${prev} => ${cur}`);
    },
    'mapOption.center'(cur) {
      this.mapInstance.setCenter(new kakao.maps.LatLng(cur.lat, cur.lng));
    },
  },
};
</script>

<style scoped lang="scss">
.map-container {
  position: relative;
  flex: 1;
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
      overflow: scroll;
      .search-area {
        position: fixed;
        width: 380px;
        /* width: 100%; */
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 20px;
        border-bottom: 1px solid #ddd;
        background-color: white;
        z-index: 10;

        input {
          flex: 1;
          height: 44px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
            0 -1px 0px rgba(0, 0, 0, 0.02);
          /* width: 380px; */
        }
      }

      .places {
        flex: 1;
        margin-top: 69px;
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

          .address {
            font-size: 12px;
            font-weight: 500;
            margin-top: 4px;
          }
          &:hover {
            background-color: aliceblue;
            cursor: pointer;
          }
          &:active {
            background-color: rgb(166, 197, 244);
          }
          h4 {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
