import { apiInstance } from "../utils/api.js";

const api = apiInstance();

function listHotPlace(param, success, fail) {
  api.get(`/hotplace/list`, { params: param }).then(success).catch(fail);
}

function writeHotPlace(place, success, fail) {
  api.post(`/hotplace/write`).then(success).catch(fail);
}

export { listHotPlace, writeHotPlace };
