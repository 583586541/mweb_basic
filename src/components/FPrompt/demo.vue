<template>
  <FPrompt :FPromptCfg="FPromptCfg" v-on:close="closeFPrompt" v-on:res="resFPrompt"></FPrompt>
</template>

<script>
  import FPrompt from '../components/FPrompt/FPrompt'
  export default {
    data() {
      return {
        FPromptCfg: {
          title: '请输入你的鸡鸡长度',
          state: false,
          unit: 'mm', // 单位
          sign: 'jiji' // 标识（页面多次使用该组件时，返回数据时进行区分）
        }
      }
    },
    methods: {
      closeFPrompt() {
        this.FPromptCfg.state = false
      },
      resFPrompt(val, sign) {
        this.closeFPrompt()
      }
    },
    components: {
      FPrompt
    }
  }
</script>