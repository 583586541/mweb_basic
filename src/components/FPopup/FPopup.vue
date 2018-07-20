<template>
  <transition name="fade">
    <section class="view-popup FPopup" v-show="cfg.state">
      <transition name="fade">
        <div class="popup-mask" @click="close" v-show="cfg.state"></div>
      </transition>
      <transition name="slide-fade">
        <div class="popup-wrap" v-show="cfg.state">
          <div class="popup-header">{{ cfg.title ? cfg.title : '请选择' }}
            <span class="close" @click="close"></span>
          </div>
          <div class="popup-body"></div>
        </div>
      </transition>
    </section>
  </transition>
</template>

<script>
  export default {
    props: ['config'],
    computed: {
      cfg() {
        return this.config
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>