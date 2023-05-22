<template>
  <div id="map" ref="map"></div>
</template>

<script>
let kakao = window.kakao;
export default {
  components: {},
  data() {
    return {
      mapInstance: null,
    };
  },
  props: ['option'],
  mounted() {
    kakao = kakao || window.kakao;
    console.log(this.$refs.map);

    const container = this.$refs.map;

    const { center, level } = this.option;
    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level,
    });
  },
  created() {},
  methods: {},
  watch: {
    'option.level'(cur, prev) {
      this.mapInstance.setLevel(cur);
      console.log(`[LEVEL CHANGED] ${prev} => ${cur}`);
    },
    'option.center'(cur) {
      // console.log('[NEW CENTER]', cur.lat, cur.lng);
      this.mapInstance.setCenter(new kakao.maps.LatLng(cur.lat, cur.lng));
    },
  },
};
</script>

<style scoped lang="scss">
#map {
  height: 100%;
  flex: 1 1 auto;
}
</style>
