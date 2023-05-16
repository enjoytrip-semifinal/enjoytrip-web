<template>
  <div class="login-root">
    <div class="login-container">
      <div class="title">로그인</div>
      <form class="content">
        <input
          type="input"
          class="id box"
          v-model="user.id"
          placeholder="아이디"
        />
        <input
          type="input"
          class="pw box"
          v-model="user.password"
          placeholder="비밀번호"
        />
        <div class="auto">
          <input type="checkbox" id="auto-login" />
          <label for="auto-login">로그인 상태 유지</label>
        </div>
        <button class="login-button" v-on:click.prevent="onClickLoginButton">
          로그인
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import http from '../utils/http';
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
  methods: {
    onClickLoginButton() {
      http.post('/user/login', this.user).then((data) => {
        console.log(data);
      });
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

    .content {
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

      .auto {
        margin-right: auto;
        /* margin-top: 16px; */
        #auto-login {
          margin-right: 8px;
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
      }
    }
  }
}
</style>
