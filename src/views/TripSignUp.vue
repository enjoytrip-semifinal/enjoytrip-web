<template>
  <div class="signup-root">
    <div class="signup-container">
      <div class="title">회원가입</div>
      <div class="comment"><span class="require">*</span> 필수 입력 사항</div>
      <form class="signup-form" @submit="onSubmit">
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
              <div v-if="!state.isId">
                <p class="error">{{ errorMsg.idErrorMessage }}</p>
              </div>
            </div>
          </div>
          <div class="pw-section input-section">
            <label for="pw">비밀번호<span class="require">*</span></label>
            <div class="input-error-box">
              <input
                type="password"
                class="pw box"
                id="pw"
                v-model="user.password"
                placeholder="비밀번호를 입력해주세요."
              />
              <div v-if="!state.isPassword">
                <p class="error">{{ errorMsg.passwordErrorMessage }}</p>
              </div>
            </div>
          </div>
          <div class="pw-verify-section input-section">
            <label for="pw-verify"
              >비밀번호확인<span class="require">*</span></label
            >
            <div class="input-error-box">
              <input
                type="password"
                class="pw-verify box"
                id="pw-verify"
                v-model="passwordCheck"
                placeholder="비밀번호를 다시 입력해주세요."
              />
              <div v-if="!state.isPasswordCheck">
                <p class="error">{{ errorMsg.passwordCheckErrorMessage }}</p>
              </div>
            </div>
          </div>
          <div class="nickname-section input-section">
            <label for="nickname">닉네임<span class="require">*</span></label>
            <div class="input-error-box">
              <input
                type="text"
                class="nickname box"
                id="nickname"
                v-model="user.nickname"
                placeholder="닉네임을 입력해주세요."
              />
              <div v-if="!state.isNickName">
                <p class="error">{{ errorMsg.nickNameErrorMessage }}</p>
              </div>
            </div>
          </div>
          <div class="email-section input-section">
            <label for="email">이메일<span class="require">*</span></label>
            <div class="input-error-box">
              <input
                type="email"
                class="email box"
                id="email"
                v-model="user.email"
                placeholder="이메일을 입력해주세요."
              />
              <div v-if="!state.isEmail">
                <p class="error">{{ errorMsg.emailErrorMessage }}</p>
              </div>
            </div>
          </div>
        </div>
        <button class="signup-button" type="submit">가입하기</button>
      </form>
    </div>
  </div>
</template>

<script>
import { signup } from '@/utils/user';
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
      errorMsg: {
        idErrorMessage: '',
        passwordErrorMessage: '',
        passwordCheckErrorMessage: '',
        nickNameErrorMessage: '',
        emailErrorMessage: '',
      },
      state: {
        isId: false,
        isPassword: false,
        isPasswordCheck: false,
        isNickName: false,
        isEmail: false,
      },
    };
  },
  created() {},
  methods: {
    handleId() {
      if (this.user.id.length < 4 || this.user.id.length > 12) {
        this.errorMsg.idErrorMessage =
          '아이디는 4자 이상 12자 이하로 입력해주세요.';
        this.state.isId = false;
      } else {
        this.errorMsg.idErrorMessage = '';
        this.state.isId = true;
      }
    },
    handlePassword() {
      if (this.user.password.length < 4) {
        this.errorMsg.passwordErrorMessage =
          '비밀번호는 4자 이상 입력해주세요.';
        this.state.isPassword = false;
      } else {
        this.errorMsg.passwordErrorMessage = '';
        this.state.isPassword = true;
      }
    },
    handlePasswordCheck() {
      if (this.user.password !== this.passwordCheck) {
        this.errorMsg.passwordCheckErrorMessage = '비밀번호가 다릅니다.';
        this.state.isPasswordCheck = false;
      } else {
        this.errorMsg.passwordCheckErrorMessage = '';
        this.state.isPasswordCheck = true;
      }
    },
    handleNickName() {
      if (this.user.nickname.length < 2 || this.user.nickname.length > 12) {
        this.errorMsg.nickNameErrorMessage =
          '닉네임은 2자이상 12자 이하로 입력해주세요.';
        this.state.isNickName = false;
      } else {
        this.errorMsg.nickNameErrorMessage = '';
        this.state.isNickName = true;
      }
    },
    handleEmail() {
      var regex =
        /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/;
      if (!regex.test(this.user.email)) {
        this.errorMsg.emailErrorMessage = '올바른 이메일 형식이 아닙니다.';
        this.state.isEmail = false;
      } else {
        this.errorMsg.emailErrorMessage = '';
        this.state.isEmail = true;
      }
    },
    onSubmit(event) {
      event.preventDefault();
      let err =
        this.state.isId &&
        this.state.isPassword &&
        this.state.isPasswordCheck &&
        this.state.isNickName &&
        this.state.isEmail;
      if (!err) {
        alert('회원가입에 실패했습니다.');
        return;
      }
      alert('회원가입!');
      signup(
        this.user,
        () => alert('성공'),
        () => alert('실패')
      );
    },
  },
  watch: {
    'user.id': 'handleId',
    'user.password': 'handlePassword',
    passwordCheck: 'handlePasswordCheck',
    'user.nickname': 'handleNickName',
    'user.email': 'handleEmail',
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
              padding-left: 4px;
              color: red;
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
