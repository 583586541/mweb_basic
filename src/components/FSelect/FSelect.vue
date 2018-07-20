<template>
  <transition name="fade">
    <section class="view-popup FPopup FSelect" v-show="cfg.state">
      <transition name="fade">
        <div class="popup-mask" @click="close" v-show="cfg.state"></div>
      </transition>
      <transition name="slide-fade">
        <div class="popup-wrap" v-show="cfg.state">
          <div class="popup-header">{{ cfg.title ? cfg.title : '请选择' }}
            <span class="close" @click="close"></span>
          </div>
          <div class="popup-body">
            <ul ref="lisWrap">
              <li :class="{'checked': cfg.checked.name == item.name}" v-for="item in cfg.options" :key="item.id" @click="res(item)" ref="lis">{{ item.name }}</li>
            </ul>
          </div>
        </div>
      </transition>
    </section>
  </transition>
</template>

<script>
  export default {
    props: ['FSelectCfg'],
    computed: {
      cfg() {
        return this.FSelectCfg
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      res(item) {
        this.$emit('res', item, this.cfg.sign)
      },
      slideScroll() {
        let _this = this,
          cfg = _this.cfg
        cfg.options.forEach(function (item, i) {
          if (item.name == cfg.checked.name) {
            slide(i)
            return
          }
        })

        function slide(index) {
          let space = _this.$refs.lis[index].clientHeight * 3
          _this.$refs.lisWrap.scrollTo(0, _this.$refs.lis[index].offsetTop - space)
        }
      }
    },
    watch: {
      cfg: {
        handler(data) {
          let _this = this
          if (!data.state || _this.$.emptyObject(data.checked)) { return }
          _this.$nextTick(function () {
            _this.slideScroll()
          })
        },
        deep: true
      }
    },
  }
</script>