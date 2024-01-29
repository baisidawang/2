import axios from 'axios';
//初始化axios实例
var instance = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});
// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 添加请求头或其他处理逻辑
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 处理响应数据
    return response.data;
  },
  function (error) {
    // 处理错误
    return Promise.reject(error);
  }
);
// 封装 GET 请求
export function get (url, params) {
  return instance.get(url, { params });
}
// 封装 POST 请求
export function post (url, data) {
  return instance.post(url, data);
}
// 其他请求方法的封装，如 PUT、DELETE 等
export default instance;