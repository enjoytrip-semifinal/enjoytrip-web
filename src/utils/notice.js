import { apiInstance, securityApiInstance } from "../utils/api.js";

const api = apiInstance();
const securityApi = securityApiInstance();

function listArticle(param, success, fail) {
  api.get(`/notice/list`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  securityApi.post(`/notice/write`, JSON.stringify(article)).then(success).catch(fail);
}

function getArticle(articleno, success, fail) {
  api.get(`/notice/list/${articleno}`).then(success).catch(fail);
}

function modifyArticle(articleno, success, fail) {
  securityApi.put(`/notice/modify/${articleno}`).then(success).catch(fail);
}

function deleteArticle(articleno, success, fail) {
  securityApi.delete(`/notice/delete/${articleno}`).then(success).catch(fail);
}

export { listArticle, writeArticle, getArticle, modifyArticle, deleteArticle };
