<template>
  <div id="app" :class="{'kill-header': $.weixinBrowser() || $.appClient()}">
    <navigation>
      <router-view v-wechat-title="$route.meta.title"></router-view>
    </navigation>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>