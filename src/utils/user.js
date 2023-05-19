import { apiInstance } from '@/utils/api';

const api = apiInstance();

async function signup(user, success, fail) {
  await api.post(`/user/join`, JSON.stringify(user)).then(success).catch(fail);
}
async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(success, fail) {
  api.defaults.headers['Authorization'] =
    'Bearer ' + sessionStorage.getItem('access-token');
  await api.get(`/user/modify`).then(success).catch(fail);
}

async function logout(success, fail) {
  api.defaults.headers['Authorization'] =
    'Bearer ' + sessionStorage.getItem('access-token');
  await api.get(`/user/logout`).then(success).catch(fail);
}

async function idCheck(userid, success, fail) {
  await api.get(`/exist?id=${userid}`).then(success).catch(fail);
}

async function modfiyUser(user, success, fail) {
  api.defaults.headers['Authorization'] =
    'Bearer ' + sessionStorage.getItem('access-token');
  await api.put(`/modify`, JSON.stringify(user)).then(success).catch(fail);
}

export { signup, login, findById, logout, idCheck, modfiyUser };
