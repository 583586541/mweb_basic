<template>
  <FCalendar :FCalendarCfg="FCalendarCfg" v-on:close="closeFCalendar" v-on:res="resFCalendar"></FCalendar>
</template>

<script>
  import FCalendar from '../components/FCalendar/FCalendar'
  export default {
    data() {
      return {
        FCalendarCfg: {
          title: '出生日期',
          state: false,
          time: '2018-07-18',
          start: '2017-10-10',
          end: '2018-10-10'
        }
      }
    },
    methods: {
      closeFCalendar() {
        this.FCalendarCfg.state = false
      },
      resFCalendar(time) {
        let _this = this

        _this.$set(_this.FCalendarCfg, 'time', time)
        this.closeFCalendar()
      }
    },
    components: {
      FCalendar
    }
  }
</script>