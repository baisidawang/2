import axios from 'axios'

//登录api
export default {
  login (params) {
    console.log('api,login', params)
    return axios.post('/login', params)
  }
}