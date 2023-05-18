import { apiInstance } from './api';

const api = apiInstance();

// ex) /board/list?pgno=1&key=sdad&word=13
function listBoard(param, success, fail) {
  api.get(`/board/list`, { params: param }).then(success).catch(fail);
}

function writeBoard(board, success, fail) {
  api.post(`/board/write`, JSON.stringify(board)).then(success).catch(fail);
}

function getBoard(boardid, success, fail) {
  api.get(`/board/list/${boardid}`).then(success).catch(fail);
}

function modifyBoard(board, success, fail) {
  api
    .put(`/board/modify/${board.boardid}`, JSON.stringify(board))
    .then(success)
    .catch(fail);
}

function deleteBoard(boardid, success, fail) {
  api.delete(`/board/delete/${boardid}`).then(success).catch(fail);
}

export { listBoard, writeBoard, getBoard, modifyBoard, deleteBoard };
