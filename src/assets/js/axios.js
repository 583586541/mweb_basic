// async fnName () {
//   let _this = this
//   let res = await _this.$.axiosPost(_this.api.接口名称, {}, true)
//   if (!res) { return }
//   console.log(res)
// }

import axios from 'axios'
import qs from 'qs' // 序列化请求数据，视服务端的要求
import api from '../../api/api'
import vux from './vux'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.load) {
    vux.vLoadingShow()
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  vux.vLoadingHide()
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  vux.vLoadingHide()

  return response
}, function (error) {
  // 对响应错误做点什么
  vux.vLoadingHide()

  return Promise.reject(error)
})

// 处理成功
function handleAxiosSuccess(res) {
  // 示例：接口返回状态码处理
  let data = res.data
  if (data.statusCode != 1) {
    vux.vToastShow(data.message)
    return false
  }
  return data // 后端状态码正确
}

// 处理错误
function handleAxiosError(err) {
  if (err && err.response) {
    switch (err.response.status) {
    case 400:
      err.message = '错误请求'
      break
    case 401:
      err.message = '未授权，请重新登录'
      break
    case 403:
      err.message = '拒绝访问'
      break
    case 404:
      err.message = '请求错误，未找到该资源'
      break
    case 405:
      err.message = '请求方法未允许'
      break
    case 408:
      err.message = '请求超时'
      break
    case 500:
      err.message = '服务器端出错'
      break
    case 501:
      err.message = '网络未实现'
      break
    case 502:
      err.message = '网络错误'
      break
    case 503:
      err.message = '服务不可用'
      break
    case 504:
      err.message = '网络超时'
      break
    case 505:
      err.message = 'http版本不支持该请求'
      break
    default:
      err.message = '连接错误'
    }
  } else {
    if (err.message.indexOf('timeout') !== (-1)) { // 请求超时
      err.message = '请求超时'
    }
    if (err.message == 'Network Error') { // 请求跨域
      err.message = '请求跨域'
    }
  }
  vux.vToastShow(err.message)
  return false
}

// 暴露POST/GET请求方法
export default {
  axiosPost(url, data, load) {
    return axios({
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      method: 'POST',
      baseURL: api.AXIOSBASEURL,
      url,
      data: qs.stringify(data),
      timeout: api.AXIOSTIMEOUT,
      load
    }).then((res) => {
      return handleAxiosSuccess(res)
    }).catch((err) => {
      return handleAxiosError(err)
    })
  },
  axiosGet(url, params, load) {
    return axios({
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'GET',
      baseURL: api.AXIOSBASEURL,
      url,
      params,
      timeout: api.AXIOSTIMEOUT,
      load
    }).then((res) => {
      return handleAxiosSuccess(res)
    }).catch((err) => {
      return handleAxiosError(err)
    })
  }
}