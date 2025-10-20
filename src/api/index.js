import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // console.log("请求拦截器", config)

    return config
  },
  error => {
    // console.log("请求拦截器报错", error)

    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // console.log("响应拦截器", response)

    return response
  },
  error => {
    // console.log("响应拦截器报错", error)

    return Promise.reject(error)
  }
)


export default service