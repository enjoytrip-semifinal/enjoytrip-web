<template>
  <div class="signup-root">
    <div class="signup-container">
      <div class="title">회원가입</div>
      <div class="comment"><span class="require">*</span> 필수 입력 사항</div>
      <form class="signup-form">
        <div class="content">
          <div class="id-section input-section">
            <label for="id">아이디<span class="require">*</span></label>
            <div class="input-error-box">
              <input
                type="text"
                class="id box"
                id="id"
                v-model="user.id"
                placeholder="아이디를 입력해주세요."
              />
              <div class>
                <p class="error">아이디를 정확하게 입력해주세요.</p>
              </div>
            </div>
          </div>
          <div class="pw-section input-section">
            <label for="pw">비밀번호<span class="require">*</span></label>
            <input
              type="password"
              class="pw box"
              id="pw"
              v-model="user.password"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <div class="pw-verify-section input-section">
            <label for="pw-verify"
              >비밀번호확인<span class="require">*</span></label
            >
            <input
              type="password"
              class="pw-verify box"
              id="pw-verify"
              v-model="passwordCheck"
              placeholder="비밀번호를 다시 입력해주세요."
            />
          </div>
          <div class="nickname-section input-section">
            <label for="nickname">닉네임<span class="require">*</span></label>
            <input
              type="text"
              class="nickname box"
              id="nickname"
              v-model="user.nickname"
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          <div class="email-section input-section">
            <label for="email">이메일<span class="require">*</span></label>
            <input
              type="email"
              class="email box"
              id="email"
              v-model="user.email"
              placeholder="이메일을 입력해주세요."
            />
          </div>
        </div>
        <button class="signup-button" @click.prevent="onClickSignUp">
          가입하기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http';

export default {
  name: 'TripSignUp',
  components: {},
  data() {
    return {
      user: {
        id: '',
        password: '',
        nickname: '',
        email: '',
      },
      passwordCheck: '',
    };
  },
  created() {},
  methods: {
    onClickSignUp() {
      http.post('/user/join').then(() => {
        this.$router.push('/');
      });
      // console.log(
      //   `${this.id} ${this.password} ${this.passwordCheck} ${this.nickname} ${this.email}`
      // );
    },
  },
};
</script>

<style scoped lang="scss">
.signup-root {
  min-height: calc(100vh - 100px);
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  .signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .require {
      color: red;
    }
    .title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 60px;
      margin-top: 80px;
    }
    .comment {
      margin-bottom: 10px;
      margin-left: auto;
    }

    .signup-form {
      display: flex;
      flex-direction: column;
      align-items: center;

      .content {
        display: flex;
        flex-direction: column;
        border: 1px solid #cccccc;
        padding: 70px;
        gap: 16px;
        margin-bottom: 60px;
        .input-section {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          label {
            font-size: 18px;
            font-weight: 500;
            margin-right: 48px;
            margin-top: 12px;
          }

          input {
            padding-left: 12px;
          }
          .input-error-box {
            display: flex;
            flex-direction: column;
            gap: 6px;

            .error {
              font-size: 12px;
            }
          }

          .box {
            width: 480px;
            height: 48px;
            border: 1px solid #d1d1d1;
            border-radius: 4px;
            font-size: 16px;
            font-family: 'Noto Sans KR', sans-serif;
            font-weight: 500;
          }
        }
      }
    }

    .signup-button {
      width: 240px;
      height: 58px;
      border-radius: 4px;
      border: none;
      background-color: #ff8080;
      color: white;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 32px;
      cursor: pointer;
      font-family: 'Noto Sans KR', sans-serif;
    }
  }
}
</style>
