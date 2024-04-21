import axios from "axios";
const instance = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
   headers: { 'x-api-key': import.meta.env.VITE_API_KEY }
});
instance.defaults.headers.common['Authorization'] = localStorage.getItem('at-jwt')
instance.defaults.headers.common['x-client-id'] = localStorage.getItem('x-client')


// instance.interceptors.request.use(function (config) {
//    return config;
// }, function (error) {
//    return Promise.reject(error);
// });
instance.interceptors.response.use(function (response) {
   return response.data;
},
 function (error) {
   return error.response.data;
});
export default instance; 