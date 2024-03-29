import router from '@/router';
import { findById, login, logout } from '@/utils/user';

const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    MODIFY_USER_INFO: (state, userInfo) => {
      for (let key in userInfo) {
        const value = userInfo[key]
        state.userInfo[key] = value;
      }
    }
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          console.log(data);
          if (data.accessToken) {
            console.log('성공!!!!');
            let accessToken = data['accessToken'];
            let refreshToken = data['refreshToken'];
            commit('SET_IS_LOGIN', true);
            commit('SET_IS_LOGIN_ERROR', false);
            commit('SET_IS_VALID_TOKEN', true);
            sessionStorage.setItem('access-token', accessToken);
            sessionStorage.setItem('refresh-token', refreshToken);
          } else {
            console.log('실패!!');
            commit('SET_IS_LOGIN', false);
            commit('SET_IS_LOGIN_ERROR', true);
            commit('SET_IS_VALID_TOKEN', false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    userModify({ commit }, user) {
      commit('MODIFY_USER_INFO', user);
    },
    async getUserInfo({ commit, dispatch }) {
      await findById(
        ({ data }) => {
          console.log(data);
          if (data) {
            commit('SET_USER_INFO', data);
          } else {
            console.log('유저 정보 없음!!!');
          }
        },
        async (error) => {
          console.log(
            'getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ',
            error.response.status
          );
          commit('SET_IS_VALID_TOKEN', false);
          await dispatch('tokenRegeneration');
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log(
        '토큰 재발급 >> 기존 토큰 정보 : {}',
        sessionStorage.getItem('access-token')
      );
      await this.tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data, status }) => {
          if (status === 200) {
            let accessToken = data['access-token'];
            console.log('재발급 완료 >> 새로운 토큰 : {}', accessToken);
            commit('SET_IS_VALID_TOKEN', true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!
          if (error.response.status === 401) {
            console.log('갱신 실패');
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(({ status }) => {
              if (status === 200) {
                console.log('리프레시 토큰 제거 성공');
              } else {
                console.log('리프레시 토큰 제거 실패');
              }
              alert('RefreshToken 기간 만료!!! 다시 로그인해 주세요.');
              commit('SET_IS_LOGIN', false);
              commit('SET_USER_INFO', null);
              commit('SET_IS_VALID_TOKEN', false);
              router.push('/login');
            });
          }
        },
        (error) => {
          console.log(error);
          commit('SET_IS_LOGIN', false);
          commit('SET_USER_INFO', null);
        }
      );
    },
    async userLogout({ commit }) {
      await logout(
        ({ status }) => {
          console.log(status);
          if (status === 200) {
            commit('SET_IS_LOGIN', false);
            commit('SET_USER_INFO', null);
            commit('SET_IS_VALID_TOKEN', false);
          } else {
            console.log('유저 정보 없음!!!!');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default userStore;
