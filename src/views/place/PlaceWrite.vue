<template>
  <div class="write-root">
    <div class="write-container">
      <div class="title">나만의 장소 등록!</div>
      <div class="content-section">
        <div class="map" id="map" ref="map"></div>
        <div class="input-area">
          <form class="place-register-form">
            <div class="input-section">
              <div class="address-input-area input-line">
                <label for="address">주소</label>
                <input
                  type="text"
                  v-model="place.address"
                  id="address"
                  placeholder="주소를 입력해주세요."
                  @click="onPostcode()"
                  readonly
                />
              </div>
              <div class="name-area input-line">
                <label for="name">핫플레이스 이름</label>
                <input
                  type="text"
                  v-model="place.name"
                  id="name"
                  placeholder="핫플레이스 이름을 입력해주세요."
                />
              </div>
              <div class="type-area input-line">
                <label for="name">장소 유형</label>
                <div class="selectBox">
                  <select
                    name="search"
                    class="select"
                    :value="selected"
                    @change="setSelect($event)"
                  >
                    <option v-for="item in selectList" :key="item.value">
                      {{ item.name }}
                    </option>
                  </select>
                  <span class="icoArrow"
                    ><img src="@/assets/images/arrow-down.png" alt=""
                  /></span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const userStore = 'userStore';

let kakao = window.kakao;
export default {
  name: 'TripPlaceWrite',
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
      place: {
        name: '',
        type: 0,
        nickname: '',
        email: '',
        address: '',
        extraAddress: '',
      },
      selectList: [
        { name: '유형을 선택해주세요.', value: '' },
        { name: '관광지', value: 12 },
        { name: '문화시설', value: 14 },
        { name: '축제공연행사', value: 15 },
        { name: '여행코스', value: 25 },
        { name: '레포츠', value: 28 },
        { name: '숙박', value: 32 },
        { name: '쇼핑', value: 38 },
        { name: '음식점', value: 39 },
      ],
      selected: '유형을 선택해주세요.',
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
  methods: {
    // 다음 주소 api
    onPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.place.extraAddress !== '') {
            this.place.extraAddress = '';
          }
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            this.place.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.place.address = data.jibunAddress;
          }
          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              this.place.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              this.place.extraAddress +=
                this.place.extraAddress !== ''
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.place.extraAddress !== '') {
              this.place.extraAddress = `(${this.place.extraAddress})`;
            }
          } else {
            this.place.extraAddress = '';
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },

    setSelect(event) {
      // 변경 적용
      this.selected = event.target.value;
      console.log(this.selected);
    },

    changeStringToType(code) {
      if (code === '관광지') {
        return 12;
      }
      if (code === '문화시설') {
        return 14;
      }
      if (code === '축제공연행사') {
        return 15;
      }
      if (code === '여행코스') {
        return 25;
      }
      if (code === '레포츠') {
        return 28;
      }
      if (code === '숙박') {
        return 32;
      }
      if (code === '쇼핑') {
        return 38;
      }
      if (code === '음식점') {
        return 39;
      }
      return 0;
    },
  },

  watch: {
    selected() {
      this.place.type = this.changeStringToType(this.selected);
    },
  },
};
</script>

<style scoped lang="scss">
.write-root {
  min-height: calc(100vh - 100px);
  display: flex;
  .write-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    .title {
      font-size: 32px;
      font-weight: 700;
      text-align: center;
      border-bottom: 3px solid #ff8080;
      margin-top: 42px;
      width: 260px;
    }
    .content-section {
      display: flex;
      height: 100%;
      margin-top: 60px;

      .map {
        width: 700px;
        height: 100%;
        background-color: aqua;
      }
      .input-area {
        width: 400px;
        height: 100%;
        margin-left: 32px;
        padding: 0px 20px 20px 20px;

        .selectBox {
          position: relative;
          width: 100%;
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

        .place-register-form {
          display: flex;
          .input-section {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 12px;
            .input-line {
              display: flex;
              flex-direction: column;
              width: 100%;
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
                font-size: 16px;
                font-family: 'Noto Sans KR', sans-serif;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
}
</style>
