const kakao = window.kakao;

class MarkerHandler {
  constructor(vueKakaoMap, options) {
    console.log('[vue component]', vueKakaoMap);
    this.vueMap = vueKakaoMap;
    this.options = options;
  }
  add(userData, fnConv) {
    const markerList = [];
    userData.forEach((data) => {
      const option = fnConv(data); // this is place
      // option.lat, option.lng
      const markerInstance = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(option.lat, option.lng),
      });
      markerInstance.$$ = {
        data, // reference to user data
      };
      if (this.options.markerClicked) {
        kakao.maps.event.addListener(markerInstance, 'click', () => {
          this.options.markerClicked(markerInstance.$$.data);
        });
      }
      markerInstance.setMap(this.vueMap);
      markerList.push(markerInstance);
    });
    return markerList;
  }

  removeAll(markerList) {
    markerList.forEach((markerInstance) => {
      markerInstance.forEach((item) => {
        item.setMap(null);
      });
    });
  }
}

export default MarkerHandler;
