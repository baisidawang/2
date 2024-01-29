import axios from '@/axios'

export default {
  add (params) {
    return axios.post('add', params)
  },
  getdata () {
    return (axios.get('query', {}))
  },
  delete (params) {
    return axios.post('delete', params)
  }
}