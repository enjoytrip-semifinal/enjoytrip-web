import { apiInstance, securityApiInstance } from './api';

const api = apiInstance();
const securityApi = securityApiInstance();

function writePlan(plan, success, fail) {
  console.log('[body]', plan);
  securityApi
    .post(`/itinerary/write`, JSON.stringify(plan))
    .then(success)
    .catch(fail);
}

function listPlan(param, success, fail) {
  api.get(`/itinerary/list`, { params: param }).then(success).catch(fail);
}

function getPlan(itineraryId, success, fail) {
  securityApi.get(`/itinerary/detail/${itineraryId}`).then(success).catch(fail);
}

function countPlan(success, fail) {
  api.get(`/itinerary/list/count`).then(success).catch(fail);
}

export { listPlan, writePlan, countPlan, getPlan };
