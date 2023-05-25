<template>
  <div class="place-container">
    <div class="title">핫플레이스</div>
    <div class="top-line">
      <div class="search-line">
        <div class="selectBox">
          <select name="search" class="select">
            <option value="all">검색조건</option>
            <option value="title">제목</option>
            <option value="writer">작성자</option>
            <option value="content">내용</option>
          </select>
          <span class="icoArrow"
            ><img src="@/assets/images/arrow-down.png" alt=""
          /></span>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="검색어를 입력해주세요." />
          <span class="icoSearch"
            ><img src="@/assets/images/search.png" alt=""
          /></span>
        </div>
      </div>
      <button class="register-button" @click="onClickRegisterBtn">
        핫플등록
      </button>
    </div>
    <div class="place-content">
      <div v-for="(place, index) in hotPlaces" :key="index">
        <PlaceCardVue
          :imgUrl="encode(place.image)"
          :content="place.content"
          :address="place.address"
          :title="place.title"
          :type="'s'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlaceCardVue from '@/components/home/PlaceCard.vue';
import { listHotPlace } from '@/utils/place';
export default {
  name: 'TripPlaceMain',
  components: {
    PlaceCardVue,
  },
  data() {
    return {
      param: {
        pgno: 1,
        sido: '',
        gugun: '',
        type: '',
        season: '',
      },
      hotPlaces: [],
      imgUrl: [
        require('@/assets/images/KakaoTalk_20230526_014027246.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_01.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_02.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_03.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_04.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_05.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_06.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_07.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_08.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_09.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_10.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_11.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_12.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_13.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_14.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_15.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_16.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_17.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_18.jpg'),
        require('@/assets/images/KakaoTalk_20230526_014027246_19.jpg'),
      ],
    };
  },
  created() {
    this.loadHotPlace();
    this.param.pgno++;
    this.loadHotPlace();
    // this.param.pgno++;
    // this.loadHotPlace();
    // this.param.pgno++;
  },
  methods: {
    onClickRegisterBtn() {
      this.$router.push('/place/write');
    },
    loadHotPlace() {
      listHotPlace(
        this.param,
        ({ data }) => {
          data.hotplaceList.forEach((place) => {
            this.hotPlaces.push(place);
          });
          console.log('[data]', data);
          this.articles = data.bordList;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    encode(url) {
      return process.env.VUE_APP_S3_BASE_URL + encodeURI(url);
    },
  },
};
</script>

<style scoped lang="scss">
/* IE */
select::-ms-expand {
  display: none;
}
.select {
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.place-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 1200px;

  .title {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    border-bottom: 3px solid #ff8080;
    margin-top: 42px;
  }

  .top-line {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 60px;
    margin-bottom: 24px;
    .search-line {
      display: flex;
      width: 580px;
      min-width: 320px;

      .selectBox {
        position: relative;
        width: 138px;
        height: 40px;
        border-radius: 4px;
        background-color: #ededed;
        margin-right: 24px;
        .select {
          width: inherit;
          height: inherit;
          background: transparent;
          border: 0 none;
          outline: 0 none;
          padding: 0 5px;
          position: relative;
          z-index: 3; // select가 위로 올라와야 함
          padding-left: 16px;
          color: #8f8f8f;
          font-weight: 700;

          option {
            background: lightcoral;
            color: #fff;
            padding: 3px 0;
            font-size: 16px;
          }
        }
        .icoArrow {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
          width: 35px;
          height: inherit;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 12px;
            height: 10px;
            transition: 0.3s;
          }
        }

        &:focus + .icoArrow img {
          transform: rotate(180deg);
        }
      }

      .search-bar {
        position: relative;
        display: flex;
        flex: 1;
        height: 40px;

        input {
          flex: 1;
          height: inherit;
          border: none;
          background-color: #ededed;
          border-radius: 4px;
          padding-left: 12px;
          font-weight: 700;
          font-size: 16px;
        }
        .icoSearch {
          display: flex;
          position: absolute;
          right: 0;
          top: 0;
          justify-content: center;
          align-items: center;
          height: inherit;
          width: 35px;
          cursor: pointer;
          img {
            height: 20px;
            width: 20px;
          }
        }
      }
    }

    .register-button {
      width: 100px;
      height: 40px;
      color: white;
      font-size: 16px;
      font-weight: 700;
      background-color: #ff8080;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .place-content {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
    justify-content: center;
  }
}
</style>
