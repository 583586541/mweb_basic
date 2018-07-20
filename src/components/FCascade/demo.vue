<template>
  <FCascade :FCascadeCfg="FCascadeCfg" v-on:close="closeFCascade" v-on:tab="tabFCascade" v-on:res="resFCascade"></FCascade>
</template>

<script>
  import FCascade from '../components/FCascade/FCascade'
  export default {
    data() {
      return {
        FCascadeCfg: {
          title: '级联选择器',
          state: false,
          checked: [], // 已选择的选项
          items: [],
          series: 2, // 级数
          step: 0 // 阶梯
        }
      }
    },
    methods: {
      // 选项插入
      analog() {
        let _this = this, FCascadeCfg = _this.FCascadeCfg

        _this.$set(FCascadeCfg.items, FCascadeCfg.step, options)
        FCascadeCfg.step++
      },
      closeFCascade() {
        this.FCascadeCfg.state = false
      },
      tabFCascade(index) {
        let _this = this,
          FCascadeCfg = _this.FCascadeCfg

        let checked = FCascadeCfg.checked.slice(0, index - 1),
          items = FCascadeCfg.items.slice(0, index)

        Object.assign(_this.FCascadeCfg, {
          checked: checked,
          items: items,
          step: index
        })
      },
      resFCascade(checked, finish) {
        let _this = this,
          FCascadeCfg = _this.FCascadeCfg

        _this.$set(FCascadeCfg.checked, FCascadeCfg.step - 1, checked)

        if (finish) {
          _this.closeFCascade()
        } else {
          _this.list(FCascadeCfg.step, checked.code)
        }
      }
    },
    components: {
      FCascade
    }
  }
</script>