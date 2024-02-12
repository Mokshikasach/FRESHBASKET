import httpClient from "./http-common product";

const getAll = () => {
  return httpClient.get("");
};

const create = (data) => {
  return httpClient.post("/signup", data);
};

const get = (id) => {
  return httpClient.get(`/id/${id}`);
};

const update = (data, productId) => {
  return httpClient.put(`/id/${productId}`, data);
};

const remove = (id) => {
  return httpClient.delete(`/id/${id}`);
};

export default { getAll, create, get, update, remove };
