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
                  id="address"
                  v-model="place.address"
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
                <label for="type">장소 유형</label>
                <div class="selectBox">
                  <select
                    id="place"
                    name="type"
                    class="select"
                    :value="selected"
                    @change="setSelect($event)"
                  >
                    <option v-for="item in selectList" :key="item.value">
                      {{ item.name }}
                    </option>
                  </select>
                  <span class="icoArrow"><img src="@/assets/images/arrow-down.png" alt="" /></span>
                </div>
              </div>

              <div class="season-area input-line">
                <label for="season">계절</label>
                <div class="selectBox">
                  <select
                    id="season"
                    name="season"
                    class="select"
                    :value="selected2"
                    @change="setSelectSeason($event)"
                  >
                    <option v-for="item in selectList2" :key="item.value">
                      {{ item.name }}
                    </option>
                  </select>
                  <span class="icoArrow"><img src="@/assets/images/arrow-down.png" alt="" /></span>
                </div>
              </div>

              <div class="file-section input-line">
                <div class="file-top">
                  <label class="file-label" for="write-file">파일 첨부</label>
                  <div class="file-button-area">
                    <button @click.prevent="">파일 업로드</button>
                    <button @click.prevent="">전체 삭제</button>
                  </div>
                </div>
                <input
                  id="write-file"
                  class="file-input"
                  ref="file"
                  type="file"
                  placeholder="첨부된 파일이 없습니다."
                  @change="registerFile"
                  readonly
                />
              </div>

              <div class="content-area input-line">
                <label for="content">내용</label>
                <textarea
                  v-model="place.content"
                  id="content"
                  class="content-input"
                  placeholder="장소에 대한 설명을 50자 이내로 설명해주세요."
                />
              </div>

              <div class="button-section">
                <button class="upload-button" @click.prevent="onClickSubmitBtn">등록</button>
                <button class="cancel-button" @click.prevent="onClickCancelBtn">취소</button>
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
import AWS from "aws-sdk";
import { writeHotPlace } from "@/utils/place";

let kakao = window.kakao;
export default {
  name: "TripPlaceWrite",
  components: {},
  data() {
    return {
      mapInstance: null,
      geocoderInstance: null,
      markerInstance: null,
      mapOption: {
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        level: 3,
      },
      place: {
        name: "",
        type: 0,
        seasonType: 0,
        content: "",
        address: "",
        extraAddress: "",
        fileInfos: [],
      },
      selectList: [
        { name: "유형을 선택해주세요.", value: "" },
        { name: "관광지", value: 12 },
        { name: "문화시설", value: 14 },
        { name: "축제공연행사", value: 15 },
        { name: "여행코스", value: 25 },
        { name: "레포츠", value: 28 },
        { name: "숙박", value: 32 },
        { name: "쇼핑", value: 38 },
        { name: "음식점", value: 39 },
      ],
      selectList2: [
        { name: "계절을 선택해주세요.", value: "" },
        { name: "봄", value: 1 },
        { name: "여름", value: 2 },
        { name: "가을", value: 3 },
        { name: "겨울", value: 4 },
      ],
      selectSeason: [
        { name: "계절을 선택해주세요.", value: "" },
        { name: "봄", value: 1 },
        { name: "여름", value: 2 },
        { name: "가을", value: 3 },
        { name: "겨울", value: 4 },
      ],
      selected: "유형을 선택해주세요.",
      selected2: "계절을 선택해주세요.",
      selectedSeason: "계절을 선택해주세요.",
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
          if (this.place.extraAddress !== "") {
            this.place.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.place.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.place.address = data.jibunAddress;
          }
          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.place.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.place.extraAddress +=
                this.place.extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.place.extraAddress !== "") {
              this.place.extraAddress = `(${this.place.extraAddress})`;
            }
          } else {
            this.place.extraAddress = "";
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },

    setSelect(event) {
      // 변경 적용
      this.selected = event.target.value;
      console.log(event.target.value);
    },

    setSelectSeason(event) {
      // 변경 적용
      this.selected2 = event.target.value;
      console.log(this.selected2);
    },

    changeStringToType(code) {
      if (code === "관광지") {
        return 12;
      }
      if (code === "문화시설") {
        return 14;
      }
      if (code === "축제공연행사") {
        return 15;
      }
      if (code === "여행코스") {
        return 25;
      }
      if (code === "레포츠") {
        return 28;
      }
      if (code === "숙박") {
        return 32;
      }
      if (code === "쇼핑") {
        return 38;
      }
      if (code === "음식점") {
        return 39;
      }
      return 0;
    },

    changeSeasonToType(code) {
      if (code === "봄") {
        return 1;
      }
      if (code === "여름") {
        return 2;
      }
      if (code === "가을") {
        return 3;
      }
      if (code === "겨울") {
        return 4;
      }
      return 0;
    },

    // 주소-좌표 변환 메서드
    changeAddressToCoordinate() {
      if (!this.geocoderInstance) {
        this.geocoderInstance = new kakao.maps.services.Geocoder();
      }

      if (this.markerInstance) {
        this.markerInstance.setMap(null);
        this.markerInstance = null;
      }

      this.geocoderInstance.addressSearch(
        `${this.place.address} ${this.place.extraAddress}`,
        (result, status) => {
          console.log("[현재 주소]", `${this.place.address} ${this.place.extraAddress}`);
          console.log(result);

          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            console.log("[coords]", coords);

            // 결과값으로 받은 위치를 마커로 표시합니다
            this.markerInstance = new kakao.maps.Marker({
              map: this.mapInstance,
              position: coords,
            });

            this.markerInstance.setMap(this.mapInstance);
            this.markerInstance.setDraggable(true);

            kakao.maps.event.addListener(this.markerInstance, "dragend", () => {
              // 마커 이동 종료 후 주소 반환
              // 현재 마커 좌표로 주소를 검색해서 주소창에 표시합니다
              this.searchAddrFromCoords(this.markerInstance.getPosition(), (data) => {
                console.log(data[0].address.address_name);
                this.place.address = data[0].address.address_name;
                this.place.extraAddress = "";
              });
            });

            console.log("[coords2]", coords);
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            this.mapInstance.setCenter(coords);
          }
        }
      );
    },

    searchAddrFromCoords(coords, callback) {
      if (!this.geocoderInstance) {
        this.geocoderInstance = new kakao.maps.services.Geocoder();
      }
      // 좌표로 행정동 주소 정보를 요청합니다
      this.geocoderInstance.coord2Address(coords.getLng(), coords.getLat(), callback);
    },

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    displayCenterInfo(result, status) {
      console.log("in");

      if (status === kakao.maps.services.Status.OK) {
        console.log("inisds");
        for (let i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          console.log("[주소]", result[i].address_name);
          this.place.address = result[i].address_name;
          this.place.extraAddress = "";
          break;
        }
      }
    },
    onClickSubmitBtn() {
      let err = true;
      let msg = "";
      !this.place.address && ((msg = "주소를 입력해주세요."), (err = false));
      err &&
        !this.place.name &&
        ((msg = "핫플레이스 이름을 입력해주세요."), (err = false), this.$refs["name"].focus());
      err && this.place.type == 0 && ((msg = "관광지 종류를 선택해주세요."), (err = false));
      err && this.place.seasonType == 0 && ((msg = "계절을 선택해주세요."), (err = false));
      err && !this.place.content && ((msg = "내용을 입력해주세요."), (err = false));

      if (!err) {
        alert(msg);
        return;
      }

      writeHotPlace(this.place, ({ status }) => {
        let msg = "등록 처리시 문제가 발생했습니다.";
        console.log(this.place);
        if (status === 200) {
          console.log("200");
        }
      });
    },

    registerFile() {
      let fileNameSlice = this.$refs.file.files[0].name.split(".");
      console.log("[file]", this.$refs.file.files[0]);
      this.photoKey = fileNameSlice[0] + "_" + new Date().getTime() + "." + fileNameSlice[1];
      this.article.fileInfos.push(this.photoKey);
      console.log(this.article.fileInfos);
    },

    uploadFile() {
      AWS.config.update({
        region: process.env.VUE_APP_BUCKET_REGION,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.VUE_APP_IDENTITY_POLL_ID,
        }),
      });

      const s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: {
          Bucket: process.env.VUE_APP_ALBUM_BUCKET_NAME,
        },
      });

      s3.upload(
        {
          Key: this.photoKey,
          Body: this.$refs.file.files[0],
          ACL: "public-read",
        },
        (err) => {
          if (err) {
            return;
          }
        }
      );
    },
  },

  watch: {
    selected() {
      this.place.type = this.changeStringToType(this.selected);
    },

    selected2: function () {
      console.log("변경!!");
      this.place.seasonType = this.changeSeasonToType(this.selected2);
    },

    "place.address"() {
      this.changeAddressToCoordinate();
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
        height: 760px;
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
                font-family: "Noto Sans KR", sans-serif;
                font-weight: 500;
              }

              .content-input {
                border-radius: 8px;
                height: 120px;
                font-size: 18px;
                font-weight: 700;
                padding: 10px;
                resize: none;
                border: 1px solid #bdbdbd;
              }

              .file-top {
                display: flex;
                gap: 8px;
                align-items: center;
                .file-button-area {
                  display: flex;
                  gap: 8px;
                  align-items: center;
                  margin-left: auto;
                  button {
                    color: white;
                    background-color: #8f8f8f;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    text-align: center;
                    padding: 4px 16px;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }

      .button-section {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 16px;
        gap: 16px;
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
}
</style>
