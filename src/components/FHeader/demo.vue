<template>
  <FHeader :FHeaderCfg="FHeaderCfg"></FHeader>
</template>

<script>
  import FHeader from '../components/FHeader/FHeader'
  export default {
    data() {
      return {
        FHeaderCfg: {
          title: 'sample', // 标题名称 缺省为胸毛飘飘
          state: false // 返回按钮显示状态 true-展示 false-隐藏 缺省为显示状态
        }
      }
    },
    components: {
      FHeader
    }
  }
</script>