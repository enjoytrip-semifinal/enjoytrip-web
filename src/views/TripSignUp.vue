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
                @blur="idDuplicateCheck"
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
                autocomplete="off"
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
                autocomplete="off"
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
          <div class="address-section input-section">
            <label for="address">주소<span class="require">*</span></label>
            <div class="address-input-area">
              <input
                class="address-button"
                type="button"
                @click="onPostcode()"
              />
              <input
                type="text"
                v-model="user.address"
                id="address"
                placeholder="주소를 입력해주세요."
              />
            </div>
          </div>

          <!-- <LocationSearchVue /> -->
        </div>
        <button class="signup-button" @click="onSubmit">가입하기</button>
      </form>
    </div>
  </div>
</template>

<script>
import { signup, idCheck } from '@/utils/user';

export default {
  name: 'TripSignUp',
  components: {
  },
  data() {
    return {
      user: {
        id: '',
        password: '',
        nickname: '',
        email: '',
        address: '',
        extraAddress: '',
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
        isIdDuplicate: false,
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
    idDuplicateCheck() {
      idCheck(
        this.user.id,
        () => {
          this.state.isIdDuplicate = true;
        },
        () => {
          this.errorMsg.idErrorMessage = '중복된 아이디 입니다.';
          this.state.isIdDuplicate = false;
        }
      );
    },
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
      console.log('가입버튼클릭');
      event.preventDefault();
      let err =
        this.state.isIdDuplicate &&
        this.state.isId &&
        this.state.isPassword &&
        this.state.isPasswordCheck &&
        this.state.isNickName &&
        this.state.isEmail &&
        this.user.address !== '';
      if (!err) {
        alert('회원가입에 실패했습니다(1).');
        return;
      }
      alert('회원가입!');
      signup(
        this.user,
        () => this.$router.push('/'),
        () => alert('회원가입에 실패하였습니다.')
      );
      return;
    },
    // 다음 주소 api
    onPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.user.extraAddress !== '') {
            this.user.extraAddress = '';
          }
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            this.user.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.user.address = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              this.user.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              this.user.extraAddress +=
                this.user.extraAddress !== ''
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.user.extraAddress !== '') {
              this.user.extraAddress = `(${this.user.extraAddress})`;
            }
          } else {
            this.user.extraAddress = '';
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
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
          .address-input-area {
            width: 492px;
            height: 48px;
            border: 1px solid #d1d1d1;
            border-radius: 4px;
            position: relative;
            display: flex;
            align-items: center;
            .address-button {
              position: absolute;
              width: 100%;
              height: 100%;
              opacity: 0;
            }
            #address {
              z-index: -1;
              padding-left: 12px;
              font-size: 16px;
              font-family: 'Noto Sans KR', sans-serif;
              font-weight: 500;
              width: 100%;
            }
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
