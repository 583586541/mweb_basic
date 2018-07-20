<template>
  <FSelect :FSelectCfg="FSelectCfg" v-on:close="closeFSelect" v-on:res="resFSelect"></FSelect>
</template>

<script>
  import FSelect from '../components/FSelect/FSelect'
  export default {
    data() {
      return {
        FSelectCfg: {
          title: '请选择证件类型',
          state: false,
          options: [ { name: '身份证', code: 0 } ],
          checked: {}, // 已选择项
          // sign: 'IDType' // 标识（页面多次使用该组件时，返回数据时进行区分）
        }
      }
    },
    methods: {
      openFSelect () {
        Object.assign(this.FSelectCfg, {
          state: true
        })
      },
      closeFSelect() {
        this.FSelectCfg.state = false
      },
      resFSelect (checked, sign) {
        this.FSelectCfg.checked = checked
        this.closeFSelect()
      }
    },
    components: {
      FSelect
    }
  }
</script>
