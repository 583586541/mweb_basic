<template>
  <FSMSCode :FSMSCodeCfg="FSMSCodeCfg"></FSMSCode>
</template>

<script>
  import FSMSCode from '../components/FSMSCode/FSMSCode'
  export default {
    data() {
      return {
        FSMSCodeCfg: {
          api: '接口',
          data: 'POST参数'
        }
      }
    },
    components: {
      FSMSCode
    }
  }
</script>
