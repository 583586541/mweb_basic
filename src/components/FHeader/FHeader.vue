<template>
  <header class="FHeader">
    <span class="go-back" v-if="cfg.state" @click="goBack"></span>{{ cfg.title }}
  </header>
</template>

<script>
  export default {
    props: ['FHeaderCfg'],
    computed: {
      cfg() {
        return Object.assign({
          title: '胸毛飘飘',
          state: true
        }, this.FHeaderCfg)
      }
    },
    methods: {
      goBack() {
        this.$router.back(-1)
      }
    }
  }
</script>