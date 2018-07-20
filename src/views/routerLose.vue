<template>
  <div class="routerLose-view view-wrap">
    <FHeader :FHeaderCfg="FHeaderCfg"></FHeader>
    <section class="view-body" ref="viewBody">
      <div class="err-img">
        <img src="../assets/image/404.png" alt="404错误">
      </div>
      <div class="hint">hi，真不巧，网页走丢了</div>
      <div class="go-index">
        <router-link to="/index">返回首页</router-link>
      </div>
    </section>
  </div>
</template>

<script>
  import FHeader from '../components/FHeader/FHeader'
  export default {
    data() {
      return {
        FHeaderCfg: {
          title: '网页迷失了',
          state: false
        }
      }
    },
    components: {
      FHeader
    }
  }
</script>