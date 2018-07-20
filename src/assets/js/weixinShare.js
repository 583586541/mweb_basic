import Vue from 'vue'
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

export default {
  /**
   * 微信分享服务端安全域名验签
   */
  async weixinSign(url, param, shareInfo) {
    let _this = this

    if (!_this.weixinBrowser()) { // 判断载体是否微信浏览器
      return false
    }

    _this.correctWeixinShareHref() // 修正微信分享链接

    let res = await this.axiosPost(url, param, false)
    if (!res) { return }
    let data = res.data
    
    Vue.wechat.config({
      debug: false,
      appId: data.appid,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
    })

    _this.custom(shareInfo)
  },
  /**
   * 配置微信分享信息
   * 分享到朋友、朋友圈
   */
  custom(config) {
    Vue.wechat.ready(function () {
      // 默认配置，打广告
      if (!config) {
        config = {
          title: 'HTML5移动端开发框架v2.1',
          desc: 'Author: Junbing Fu, Last update: 2018/06/21',
          link: document.location.href,
          imgUrl: 'http://yfqc-dev.oss-cn-shanghai.aliyuncs.com/1528880799157105466.jpeg'
        }
      }

      Vue.wechat.onMenuShareAppMessage({ // 分享给朋友
        title: config.title,
        desc: config.desc,
        link: config.link,
        imgUrl: config.imgUrl,
        success: function () {},
        cancel: function () {}
      })
      Vue.wechat.onMenuShareTimeline({ // 分享到朋友圈
        title: config.title,
        link: config.link,
        imgUrl: config.imgUrl,
        success: function () {},
        cancel: function () {}
      })
    })
  },
  /**
   * 载体是否微信浏览器
   * true -- 是
   * false -- 否
   */
  weixinBrowser() {
    return window.navigator.userAgent.toLowerCase().match(/micromessenger/) != null
  },
  /**
   * 修正微信分享链接
   */
  correctWeixinShareHref() {
    let href = document.location.href

    if (href.indexOf('/?from') === -1) { return }
    href = href.split('?from=')
    let isappinstalled = href[1]
    href.splice(1, 1, isappinstalled.slice(isappinstalled.indexOf('#')))

    window.location.href = href.join('')
  }
}