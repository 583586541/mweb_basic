<template>
  <transition name="fade">
    <section class="view-popup FPopup FCascade" v-show="cfg.state">
      <transition name="fade">
        <div class="popup-mask" @click="close" v-show="cfg.state"></div>
      </transition>
      <transition name="slide-fade">
        <div class="popup-wrap" v-show="cfg.state">
          <div class="popup-header">{{ cfg.title ? cfg.title : '请选择' }}
            <span class="close" @click="close"></span>
          </div>
          <div class="popup-body">
            <ul class="navs clearfix">
              <li v-for="(item, index) in navs" :key="item.id" :class="{ 'checked': index == step - 1 }" @click="tab(index)">{{ item.name }}</li>
            </ul>
            <ul class="options" ref="lisWrap">
              <li v-for="item in options" :key="item.id" :class="{ 'checked': item.code == navs[step - 1].code }" ref="lis" @click="res(item)">{{ item.name }}</li>
            </ul>
          </div>
          <div class="loading" v-show="loading"></div>
        </div>
      </transition>
    </section>
  </transition>
</template>

<script>
  export default {
    props: ['FCascadeCfg'],
    computed: {
      cfg() {
        return this.FCascadeCfg
      },
      state() {
        return this.cfg.state
      },
      checked() {
        return this.cfg.checked
      },
      step() {
        return this.cfg.step
      }
    },
    data() {
      return {
        loading: true,
        navs: [],
        options: []
      }
    },
    methods: {
      slideScroll() {
        let _this = this,
          cfg = _this.cfg

        let checkedCode = cfg.checked[_this.step - 1].code
        _this.options.forEach(function (item, i) {
          if (item.code == checkedCode) {
            let space = _this.$refs.lis[i].clientHeight * 3
            _this.$refs.lisWrap.scrollTo(0, _this.$refs.lis[i].offsetTop - space)
            return
          }
        })
      },
      tab(index) {
        let _this = this

        if (index + 1 == _this.cfg.step) { return }
        _this.$emit('tab', index + 1)
      },
      close() {
        this.$emit('close')
      },
      res(item) {
        let _this = this,
          cfg = _this.cfg

        if (cfg.series > cfg.step) {
          _this.loading = true
          _this.$emit('res', item, false)
        } else {
          _this.$emit('res', item, true)
        }
      }
    },
    watch: {
      state(data) {
        let _this = this,
          cfg = _this.cfg

        if (!data) { return }
        if (_this.$.emptyObject(_this.checked)) { return }

        _this.$nextTick(function () {
          _this.slideScroll()
        })
      },
      checked(data) {
        let _this = this,
          cfg = _this.cfg

        if (cfg.step == cfg.series) {
          Object.assign(_this.navs, _this.checked)
        }
      },
      step(data) {
        let _this = this,
          cfg = _this.cfg

        _this.navs = []
        Object.assign(_this.navs, _this.checked)
        if (cfg.series > _this.navs.length) {
          _this.navs.push({ name: '请选择', code: -1 })
        }

        _this.options = []
        Object.assign(_this.options, cfg.items[_this.step - 1])

        _this.loading = false
        return
      }
    },
  }
</script>