import root from '../assets/js/root'

// 接口
const url = {
  sign: '/rest/wechat/sign',
  plan: '/rest/anlian/product/plan',
  list: '/rest/anlian/area/list'
}

// 常量
const define = {
  ROOT: root.root(['192.168.1.82']), // 搬砖者
  AXIOSTIMEOUT: 15000, // 请求时间的最大值
  AXIOSBASEURL: process.env.NODE_ENV === 'production' ? 'http://' + window.location.host + '/mweb' : '/yl', // 接口前缀
  STORAGEPREFIX: 'xx_', // 本地存储key前缀
  STORAGETYPE: window.sessionStorage, // 本地存储方式 默认localStorage 方法
}

export default Object.assign(url, define)
