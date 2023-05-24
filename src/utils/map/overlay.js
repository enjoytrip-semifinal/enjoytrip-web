const kakao = window.kakao;

class KakaoOverlay {
  constructor(vueMap, content) {
    this.vueMap = vueMap;
    this.content = content;
    // init instance
    this.customOverlay = new kakao.maps.CustomOverlay({
      map: null,
      clickable: true,
      content: content,
      position: null, // 나중에 클릭하면
      /*
        좌표 바로 위에 가운데로 위치시킴
      */
      xAnchor: 0.2,
      yAnchor: 1.2,
      zIndex: 3,
    });
  }
  showAt(lat, lng) {
    console.log('overlay show!!', lat, lng);
    const pos = new kakao.maps.LatLng(lat, lng);
    console.log(this.customOverlay);
    this.customOverlay.setPosition(pos);
    this.customOverlay.setMap(this.vueMap);
  }
  hide() {
    this.customOverlay.setMap(null);
  }
}

export default KakaoOverlay;
