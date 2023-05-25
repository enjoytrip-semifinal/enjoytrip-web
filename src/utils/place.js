import { apiInstance, securityApiInstance } from "../utils/api.js";

const api = apiInstance();
const securityApi = securityApiInstance();

function listHotPlace(param, success, fail) {
  api.get(`/hotplace/list`, { params: param }).then(success).catch(fail);
}

function writeHotPlace(place, success, fail) {
  securityApi
    .post(`/hotplace/write`, JSON.stringify(place))
    .then(success)
    .catch(fail);
}

export { listHotPlace, writeHotPlace };
