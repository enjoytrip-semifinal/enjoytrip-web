<template>
  <div class="mypage-home-root">
    <h2 class="title">회원 정보 수정</h2>
    <form class="edit-form">
      <div class="nickname-area input-section">
        <label for="nickname">닉네임</label>
        <div class="input-error-box">
          <input id="nickname" type="text" v-model="user.nickname" placeholder="닉네임을 입력해주세요."/>
          <div v-if="!state.isNickName">
            <p class="error">{{ errorMsg.nickNameErrorMessage }}</p>
          </div>
        </div>
      </div>
      <div class="password-area input-section">
        <label for="password" >비밀번호</label>
        <div class="input-error-box">
          <input id="password" type="password" v-model="user.password" placeholder="비밀번호를 입력해주세요."/>
          <div v-if="!state.isPassword">
            <p class="error">{{ errorMsg.passwordErrorMessage }}</p>
          </div>
        </div>
      </div>
      <div class="email-area input-section">
        <label for="email">이메일</label>
        <input id="email" type="email" v-model="user.email" placeholder="이메일을 입력해주세요." disabled/>
      </div>
      <div class="address-area input-section">
        <label for="address">주소</label>
        <div class="address-input-area">
              <input
                class="address-button"
                type="button"
                @click="onPostcode()"
              />
              <input id="address" type="text" v-model="user.address" placeholder="주소를 입력해주세요."/>
            </div>
      </div>
    </form>
    <div class="button-area">
        <button class="edit">수정</button>
        <button class="cancel" @click="clickCancelBtn">취소</button>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const userStore = 'userStore';

export default {
  name: 'TripMyPageEdit',
  components: {},
  data() {
    return {
      user: {
        nickname: '',
        password: '',
        email: '',
        address: '',
      },
      errorMsg: {
        nickNameErrorMessage: '',
        passwordErrorMessage: '',
      },
      state: {
        isPassword: false,
        isNickName: false,
      },
    };
  },
  created() {
    this.user.nickname = this.userInfo.nickname;
    this.user.password = this.userInfo.password;
    this.user.email = this.userInfo.email;
    this.user.address = this.userInfo.address;
  },
  computed: {
    ...mapState(userStore, ['userInfo']),
  },
  methods: {
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
    clickCancelBtn() {
      this.$router.go(-1);
    },
  },
  watch: {
    'user.password': 'handlePassword',
    'user.nickname': 'handleNickName',
  },
};
</script>

<style scoped lang="scss">
.mypage-home-root {
  padding-left: 20px;
  align-items: center;
  .title {
    font-size: 32px;
    font-weight: 700;
    margin-top: 60px;
    margin-left: 8px;
  }
  .edit-form {
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    border-top: 3px solid #ff8080;
    border-bottom: 3px solid #ff8080;
    .input-section {
      display: flex;
      height: 72px;
      align-items: center;
      border-bottom: 1px solid #BBBBBB;
      &:last-child {
        border-bottom: none;
      }
      label {
        display: flex;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        width: 140px;
        border-right: 1px solid #BBBBBB;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
      input {
        height: 40px;
        width: 360px;
        border: 1px solid #BBBBBB;
        border-radius: 4px;
        margin-left: 12px;
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 18px;
        font-weight: 500;
        padding: 0 10px;
      }

      .input-error-box {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .error {
        font-size: 12px;
        padding-left: 4px;
        color: red;
        margin-left: 12px;
      }
      .address-input-area{
        width: 360px;
        height: 40px;
        padding: 0 10px;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        margin-left: 12px;
        position: relative;
        display: flex;
        align-items: center;
        
        .address-button {
          margin-left: -10px;
          padding: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        #address {
          z-index: -1;
          margin: 0;
          padding: 0;
          // padding-left: 12px;
          width: 100%;
          height: 100%;
          font-size: 16px;
          font-family: 'Noto Sans KR', sans-serif;
          font-weight: 500;
          width: 100%;
          border: none;
        }
      }
    }
  }
  .button-area {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 56px;
    gap: 12px;
    button {
      width: 140px;
      height: 48px;
      border-radius: 4px;
      font-weight: 700;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    .cancel {
        background-color: #8F8F8F;
      }
      .edit {
        background-color: #FF8080;
      }
  }
}
</style>