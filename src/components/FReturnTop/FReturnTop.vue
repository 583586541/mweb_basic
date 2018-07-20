<template>
  <div class="FReturnTop" v-show="state" @click="execute"></div>
</template>

<script>
  export default {
    props: ['ele'],
    data() {
      return {
        state: false, // 显示与否的状态值
        criticalValue: 1888 // 显示与否的临界值
      }
    },
    mounted() {
      let _this = this
      let ele = _this.ele.viewBody
      ele.addEventListener('scroll', function() {
        _this.state = ele.scrollTop > _this.criticalValue
      })
    },
    methods: {
      execute() {
        this.ele.viewBody.scrollTo(0, 0)
      }
    }
  }
</script>