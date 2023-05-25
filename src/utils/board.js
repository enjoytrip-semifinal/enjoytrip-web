import { apiInstance, securityApiInstance } from './api';

const api = apiInstance();
const securityApi = securityApiInstance();

// ex) /board/list?pgno=1&key=sdad&word=13
function listBoard(param, success, fail) {
  api.get(`/board/list`, { params: param }).then(success).catch(fail);
}

function writeBoard(board, success, fail) {
  securityApi
    .post(`/board/write`, JSON.stringify(board))
    .then(success)
    .catch(fail);
}

function getBoard(boardid, success, fail) {
  api.get(`/board/list/${boardid}`).then(success).catch(fail);
}

function modifyBoard(board, success, fail) {
  securityApi
    .put(`/board/modify/${board.boardid}`, JSON.stringify(board))
    .then(success)
    .catch(fail);
}

function deleteBoard(boardid, success, fail) {
  securityApi.delete(`/board/delete/${boardid}`).then(success).catch(fail);
}

function countBoard(success, fail) {
  api.get(`/board/list/count`).then(success).catch(fail);
}

function viewBoard(boardid, success, fail) {
  api.get(`/board/list/${boardid}`).then(success).catch(fail);
}

// ?pgno=1&id=1
function listComment(param, success, fail) {
  api.get(`/board/review/list`, { params: param }).then(success).catch(fail);
}

function writeComment(comment, success, fail) {
  securityApi
    .post(`/board/review/write`, JSON.stringify(comment))
    .then(success)
    .catch(fail);
}

function modifyComment(comment, success, fail) {
  securityApi
    .put(
      `/board/review/modify/${comment.board_reply_id}`,
      JSON.stringify(comment)
    )
    .then(success)
    .catch(fail);
}

function deleteComment(commentid, success, fail) {
  securityApi
    .delete(`/board/review/delete/${commentid}`)
    .then(success)
    .catch(fail);
}

export {
  listBoard,
  writeBoard,
  getBoard,
  modifyBoard,
  deleteBoard,
  countBoard,
  viewBoard,
  listComment,
  writeComment,
  modifyComment,
  deleteComment,
};
