<template>
  <div class="sidebar-container">
    <div class="harbors">
      <div
        class="harbor"
        v-for="hbr in harbors"
        :key="hbr.seq"
        @click="showOnMap(hbr)"
      >
        <h4 @click="test()">{{ hbr.place }}ㅎㅇ</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TourSidebar',
  components: {},
  props: ['harbors'],
  data() {
    return {
      message: '',
    };
  },
  created() {},
  methods: {
    test() {
      console.log(this.harbors);
    },
  },
};
</script>

<style scoped lang="scss">
.sidebar-container {
  display: flex;
  width: 420px;
  background: #fefefe;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;

  .harbors {
    flex: 1;
    .harbor {
      padding: 10px;
      border: 1px solid transparent;
      &:hover {
        background-color: aliceblue;
        border-color: #6a9dff;
        cursor: pointer;
      }
      &:active {
        background-color: rgb(166, 197, 244);
        border-color: #4471c5;
      }
      h4 {
        margin: 0;
      }
    }
  }
}
</style>
