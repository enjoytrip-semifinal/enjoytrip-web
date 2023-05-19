<template>
  <div class="map-container">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
export default {
  name: 'TripMap',
  components: {},
  mounted() {
    console.log(this.$refs.map);
  },
  created() {},
  methods: {
    // loadScript() {
    //   const script = document.createElement('script');
    //   script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_API_KEY}&autoload=false&libraries=services`
    //   script.onload = () => window.kakao.maps.load(this.loadMap); // 스크립트 로드가 끝나면 지도를 실행할 준비가 되어 있다면 지도가 실행되도록 구현

    //   document.head.appendChild(script);  // html > head 안에 스크립트 소스를 추가
    // },
    // loadMap() {
    //   const mapContainer = document.getElementById('map'); // 지도를 담을 DOM 영역
    //   const options = { //지도를 생성할 때 필요한 기본 옵션
    //     center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    //     level: 3 //지도의 레벨(확대, 축소 정도)
    //   };

    //   // 지도를 생성합니다
    //   this.map = new window.kakao.maps.Map(mapContainer, options); // 지도 생성 및 객체 리턴

    //   // 장소 검색 객체를 생성
    //   this.ps = new window.kakao.maps.services.Places();

    //   // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    //   // this.infowindow = new window.kakao.maps.InfoWindow({zIndex:1});
    // }
  },
};
</script>

<style scoped lang="scss">
.map-container {
  flex: 1;
    #map {
      height: 100%;
    }
}

</style>