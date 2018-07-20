import Vue from 'vue'
import { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

export default {
  // 提示信息
  vToastShow(msg) {
    Vue.$vux.toast.show({
      type: 'cancel',
      text: msg,
      position: 'middle'
    })
  },
  // loading显示
  vLoadingShow() {
    Vue.$vux.loading.show({
      text: 'Loading'
    })
  },
  // loading隐藏
  vLoadingHide() {
    Vue.$vux.loading.hide()
  }
}