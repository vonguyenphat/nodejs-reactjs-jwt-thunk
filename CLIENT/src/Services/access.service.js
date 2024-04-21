import axios from '../Configs/axios.cofig'


export function signUp(payload) {
   return axios.post(`/access/signup`, payload);
}
export function login(payload) {
   return axios.post(`/access/login`, payload);
}
export function getUserFromAT (){
   return axios.get(`/access/get_user_from_at`);
}


