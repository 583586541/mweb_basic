<template>
  <div class="sample-view view-wrap">
    <FHeader :FHeaderCfg="FHeaderCfg"></FHeader>
    <section class="view-body" ref="viewBody"></section>
  </div>
</template>

<script>
  import FHeader from '../components/FHeader/FHeader'
  export default {
    name: 'sample',
    data() {
      return {
        FHeaderCfg: {
          title: '页面标题',
          state: false
        }
      }
    },
    components: {
      FHeader
    }
  }
</script>