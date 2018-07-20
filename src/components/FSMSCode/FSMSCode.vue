<template>
  <div class="FSMSCode" @click="execute">{{ text }}</div>
</template>

<script>
  export default {
    props: ['config'],
    data() {
      return {
        disable: false,
        text: '获取验证码', // 显示文案
        second: 60 // 秒数
      }
    },
    computed: {
      cfg() {
        return this.config
      }
    },
    methods: {
      async execute() {
        let _this = this
        if (_this.disable) { return }

        let res = await _this.$.axiosPost(_this.cfg.api, _this.cfg.data, false)
        if (!res) { return }

        _this.disable = true // 不可重复点击

        secondReduce()
        let timer = setInterval(secondReduce, 1000)

        // 秒数递减
        function secondReduce() {
          if (_this.second == 1) {
            _this.second = 60
            _this.text = '重新发送'
            _this.disable = false
            clearInterval(timer)
          } else {
            _this.second--
              _this.text = _this.second + 's'
          }
        }
      }
    }
  }
</script>