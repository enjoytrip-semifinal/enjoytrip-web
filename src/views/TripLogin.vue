<template>
  <div class="login-root">
    <div class="login-container">
      <div class="title">로그인</div>
      <form class="login-form">
        <input
          type="text"
          class="id box"
          v-model="user.id"
          placeholder="아이디"
        />
        <input
          type="password"
          class="pw box"
          v-model="user.password"
          placeholder="비밀번호"
        />
        <div class="auto">
          <input type="checkbox" id="auto-login" />
          <label for="auto-login">로그인 상태 유지</label>
        </div>
        <button class="login-button" @click.prevent="onClickLoginButton">
          로그인
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const userStore = 'userStore';

export default {
  name: 'TripLogin',
  components: {},
  data() {
    return {
      user: {
        id: '',
        password: '',
      },
    };
  },
  created() {},
  computed: {
    ...mapState(userStore, ['isLogin', 'isLoginError', 'userInfo']),
  },
  methods: {
    ...mapActions(userStore, ['userConfirm', 'getUserInfo']),
    async onClickLoginButton() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem('access-token');
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push('/');
      }
      else {
        alert("로그인에 실패하였습니다.");
      }
    },
    moveSignUpPage() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style scoped lang="scss">
.login-root {
  min-height: calc(100vh - 100px);
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 24px;
      font-weight: 600;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-top: 40px;
      margin-bottom: 160px;
      .box {
        width: 480px;
        height: 54px;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        font-weight: 500;
        font-size: 20px;
        padding-left: 24px;
      }

      input {
        font-family: 'Noto Sans KR', sans-serif;
      }

      .auto {
        margin-right: auto;
        #auto-login {
          margin-right: 8px;
        }
        input {
          cursor: pointer;
        }
        label {
          cursor: pointer;
        }
      }

      .login-button {
        width: 504px;
        height: 58px;
        margin-top: 24px;
        border-radius: 4px;
        border: none;
        background-color: #ff8080;
        color: white;
        font-size: 24px;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
}
</style>
