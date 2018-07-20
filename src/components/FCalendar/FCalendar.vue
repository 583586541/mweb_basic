<template>
  <transition name="fade">
    <section class="view-popup FPopup FCalendar" v-show="cfg.state">
      <transition name="fade">
        <div class="popup-mask" @click="close" v-show="cfg.state"></div>
      </transition>
      <transition name="slide-fade">
        <div class="popup-wrap" v-show="cfg.state">
          <div class="popup-header">{{ cfg.title ? cfg.title : '请选择' }}
            <span class="close" @click="close"></span>
          </div>
          <div class="popup-body">
            <div class="year-month clearfix">
              <div class="year fl">
                <em class="prev" @click="cYear(-1)"></em>{{ inYear }}年
                <em class="next" @click="cYear(1)"></em>
              </div>
              <div class="month fr">
                <em class="prev" @click="cMonth(-1)"></em>{{ inMonth + 1 }}月
                <em class="next" @click="cMonth(1)"></em>
              </div>
            </div>
            <ul class="day-th">
              <li>日</li>
              <li>一</li>
              <li>二</li>
              <li>三</li>
              <li>四</li>
              <li>五</li>
              <li>六</li>
            </ul>
            <ul class="date-td">
              <li :class="[item.usable ? 'usable' : 'disabled', { 'checked': initTime == item.time }]" v-for="item in tdItems" :key="item.id" @click="res(item)">
                <div>{{ item.date }}</div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </section>
  </transition>
</template>

<script>
  export default {
    props: ['FCalendarCfg'],
    data() {
      return {
        initTime: '',
        inYear: 0,
        inMonth: 0,
        inDate: 0,
        tdItems: []
      }
    },
    computed: {
      cfg() {
        return this.FCalendarCfg
      },
      state() {
        return this.FCalendarCfg.state
      }
    },
    methods: {
      splitTime() {
        let _this = this,
          cfg = _this.cfg

        _this.initTime = cfg.time ? cfg.time : _this.$.resTodayTime()
        _this.splitTimeComprise()
      },
      splitTimeComprise() {
        let _this = this,
          res = _this.$.splitTimeComprise(_this.initTime)

        _this.inYear = res.year
        _this.inMonth = res.month
        _this.inDate = res.date
        _this.produceTpl()
      },
      produceTpl() {
        let _this = this,
          $ = _this.$,
          inYear = _this.inYear,
          inMonth = _this.inMonth,
          inDate = _this.inDate

        let items = []
        items = items.concat(_this.prevMonthEnd())
        items = items.concat(_this.thisMonth())
        items = items.concat(_this.nextMonthBegin(42 - items.length))
        _this.tdItems = items
      },
      prevMonthEnd() {
        let _this = this,
          $ = _this.$,
          inYear = _this.inYear,
          inMonth = _this.inMonth,
          inDate = _this.inDate

        let leng = new Date(inYear, inMonth, 1).getDay()
        if (leng == 0) { leng = 7 }

        if (inMonth == 0) {
          inMonth = 12
          inYear--
        }
        let days = new Date(inYear, inMonth, 0).getDate()
        inMonth = $.complement(inMonth, 2)

        let items = []
        for (let i = (days - leng); i < days; i++) {
          items.push({
            date: i + 1,
            time: inYear + '-' + inMonth + '-' + $.complement((i + 1), 2),
            usable: false
          })
        }

        return items
      },
      thisMonth() {
        let _this = this,
          $ = _this.$,
          cfg = _this.cfg,
          inYear = _this.inYear,
          inMonth = _this.inMonth,
          inDate = _this.inDate

        let days = new Date(inYear, (inMonth + 1), 0).getDate()
        inMonth = $.complement((inMonth + 1), 2)

        let items = [], start = cfg.start, end = cfg.end
        for (let i = 0; i < days; i++) {
          let time = inYear + '-' + inMonth + '-' + $.complement((i + 1), 2)

          let td = {
            date: i + 1,
            time: time,
            usable: true
          }
          if (start && time < start) {
            td.usable = false
          }
          if (end && time > end) {
            td.usable = false
          }
          items.push(td)
        }

        return items
      },
      nextMonthBegin(leng) {
        let _this = this,
          $ = _this.$,
          inYear = _this.inYear,
          inMonth = _this.inMonth,
          inDate = _this.inDate

        if (inMonth == 11) {
          inMonth = 1
          inYear++
        } else {
          inMonth = inMonth + 2
        }
        inMonth = $.complement(inMonth, 2)

        let items = []
        for (let i = 0; i < leng; i++) {
          items.push({
            date: i + 1,
            time: inYear + '-' + inMonth + '-' + $.complement((i + 1), 2),
            usable: false
          })
        }
        return items
      },
      cYear (type) {
        let _this = this

        switch (type) {
          case -1:
            _this.inYear--
            break
          case 1:
            _this.inYear++
            break
        }
        _this.produceTpl()
      },
      cMonth (type) {
        let _this = this

        switch (type) {
          case -1:
            _this.inMonth--
            if (_this.inMonth < 0) {
              _this.inMonth = 11
              _this.inYear--
            }
            break
          case 1:
            _this.inMonth++
            if (_this.inMonth > 11) {
              _this.inMonth = 0
              _this.inYear++
            }
            break
        }
        _this.produceTpl()
      },
      close() {
        this.$emit('close')
      },
      res(item) {
        if (!item.usable) { return }
        this.$emit('res', item.time)
      }
    },
    watch: {
      state(data) {
        if (data) {
          this.splitTime()
        }
      }
    },
  }
</script>