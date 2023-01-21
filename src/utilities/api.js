import axios from 'axios';

export const fetchAll = (url) => axios.get(url);
export const fetchOne = (url, id) => axios.get(`${url}/${id}`);
export const postOne = (url, body) => axios.post(url, body);
export const patchOne = (url, id, body) => axios.patch(`${url}/${id}`, body);
export const deleteOne = (url, id) => axios.delete(`${url}/${id}`);
