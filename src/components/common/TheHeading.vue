<template>
  <div
    class="header-root"
    :class="{
      white_type: isTop && isHome,
    }"
  >
    <img
      class="logo"
      src="@/assets/images/logo.png"
      @click="onClickLogo"
      alt="logo"
    />
    <nav>
      <ul
        class="gnb"
        :class="{ white_type: isTop && isHome, black_type: !isHome || !isTop }"
      >
        <router-link to="/notice"
          ><li @click="onClickNotice">공지사항</li></router-link
        >
        <router-link to="/board"
          ><li @click="onClickBoard">게시판</li></router-link
        >
        <router-link to="/tour"
          ><li @click="onClickTour">관광지 조회</li></router-link
        >
        <router-link to="/place"
          ><li @click="onClickHotPlace">핫플레이스</li></router-link
        >
        <router-link to="/plan"
          ><li @click="onClickPlan">여행 계획</li></router-link
        >
        <router-link to="/login"
          ><li @click="onClickLogin">로그인</li></router-link
        >
        <router-link to="/signup"
          ><li @click="onClickSingUp">회원가입</li></router-link
        >
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TheHeading',
  components: {},
  data() {
    return {
      isHome: true,
      isTop: true,
      scrollPosition: null,
    };
  },
  created() {
    if (this.$route.fullPath !== '/') {
      this.isHome = false;
    }
    console.log(this.$route.fullPath);
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (this.scrollPosition < screen.height - screen.height * 0.2) {
        this.isTop = true;
      } else {
        this.isTop = false;
      }
      this.scrollPosition = window.scrollY;
    },
    onClickLogo() {
      if (this.$route.path != '/') {
        this.$router.push('/');
      }
      this.isTop = true;
      this.isHome = true;
    },
    onClickNotice() {
      this.isHome = false;
    },
    onClickBoard() {
      this.isHome = false;
    },
    onClickTour() {
      this.isHome = false;
    },
    onClickHotPlace() {
      this.isHome = false;
    },
    onClickPlan() {
      this.isHome = false;
    },
    onClickLogin() {
      this.isHome = false;
    },
    onClickSingUp() {
      this.isHome = false;
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.header-root {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100px;
  z-index: 999;
  background-color: white;
  opacity: 0.95;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  transition-duration: 1s;
  .logo {
    /* position: absolute; */
    width: 220px;
    height: 51px;
    margin-left: 41px;
    margin-top: 24px;
  }

  .gnb {
    width: 100%;
    display: flex;
    gap: 16px;
    align-items: center;
    text-align: center;
    margin-right: 41px;
    margin-top: 38px;
    transition-duration: 1s;
  }
}

.white_type {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.25);
  transition-duration: 0.25s;
  font-weight: 500;
  font-size: 20px;
  a {
    color: white;
  }
  a.router-link-active {
    color: red;
    line-height: 40px;
    border-bottom: 2px red solid;
  }
}

.black_type {
  font-weight: 500;
  font-size: 20px;
  a {
    color: black;
  }
  a.router-link-active {
    color: red;
    /* line-height: 40px; */
    border-bottom: 2px red solid;
  }
}
</style>
