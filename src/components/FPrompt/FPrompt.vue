<template>
  <transition name="fade">
    <section class="view-popup FPopup FPrompt" v-show="cfg.state">
      <transition name="fade">
        <div class="popup-mask" @click="close" v-show="cfg.state"></div>
      </transition>
      <transition name="fade">
        <div class="popup-wrap" v-show="cfg.state">
          <div class="popup-header">{{ cfg.title ? cfg.title : '请选择' }}
          </div>
          <div class="popup-body">
            <input type="text" placeholder="请输入值" v-model.trim="value">
            <span class="unit" v-if="cfg.unit">{{ cfg.unit }}</span>
          </div>
          <div class="popup-footer">
            <input type="button" value="取消" @click="close">
            <input type="button" value="确定" @click="res">
          </div>
        </div>
      </transition>
    </section>
  </transition>
</template>

<script>
  export default {
    props: ['FPromptCfg'],
    data() {
      return {
        value: ''
      }
    },
    computed: {
      cfg() {
        return this.FPromptCfg
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      res () {
        let _this = this,
          val = _this.value
        
        if (!val) {
          _this.$.vToastShow('请输入值')
          return
        }
        
        _this.$emit('res', val, _this.cfg.sign)
      }
    }
  }
</script>