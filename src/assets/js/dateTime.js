export default {
  /**
   * 功能：获取今日日期
   * 返回：'2018-06-09'
   */
  resTodayTime() {
    let date = new Date()
    return this.blendTimeComprise({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate() })
  },
  /**
   * 功能：获取时间戳
   * 参数：data ? 格式如'2018-06-08'(返回8号0点0分0秒的时间戳) : 缺省返回当前时间的时间戳
   * 返回：13位长度的时间戳
   */
  resTimestamp(data) {
    if (data) {
      data = this.splitTimeComprise(data)
      return new Date(data.year, data.month, data.date).getTime()
    }
    return new Date().getTime()
  },
  /**
   * 功能：获取时间组成成分（拆分）
   * 参数：data不可缺省 格式如'2018-06-08'
   * 返回：{ year: 2018, month: 5, date: 8 }
   */
  splitTimeComprise(data) {
    let year = Number(data.substring(0, 4))
    let month = Number(data.substring(5, 7)) - 1
    let date = Number(data.substring(8, 10))
    return { 'year': year, 'month': month, 'date': date }
  },
  /**
   * 功能：获取混合时间
   * 参数：data不可缺省 如{ year: 2018, month: 5, date: 8 }
   * 返回：'2018-06-08'
   */
  blendTimeComprise(data) {
    let year = data.year.toString()
    data.month = Number(data.month + 1)
    let month = data.month < 10 ? this.complement(data.month) : data.month.toString()
    let date = data.date < 10 ? this.complement(data.date) : data.date.toString()
    return year + '-' + month + '-' + date
  },
  /**
   * 功能：获取时间是星期几
   * 参数：data ? 格式如'2018-06-08' : 缺省返回当前时间是星期几
   * 返回：如: 五
   */
  resTimeDay(data) {
    let day = 0 // 默认是星期天
    if (data) {
      data = this.splitTimeComprise(data)
      day = new Date(data.year, data.month, data.date).getDay()
    } else {
      day = new Date().getDay()
    }
    switch (day) {
    case 0:
      day = '日'
      break
    case 1:
      day = '一'
      break
    case 2:
      day = '二'
      break
    case 3:
      day = '三'
      break
    case 4:
      day = '四'
      break
    case 5:
      day = '五'
      break
    case 6:
      day = '六'
      break
    }
    return day
  },
  /**
   * 功能：同一时间格式
   * 参数：data不可缺醒，如20180608、2018/06/08
   * 返回：2018-06-08
   */
  unifiedTimeFormat(data) {
    data = data.toString().replace(/[^\d]/ig, '')
    let year = data.substring(0, 4)
    let month = data.substring(4, 6)
    let date = data.substring(6, 8)
    return year + '-' + month + '-' + date
  },
  /**
   * 功能：获取两个时间间隔多少天
   * 参数：不可缺省 格式如'2018-06-06'和'2018-06-08'
   * 返回：2
   */
  resTimeBetween(fisrtTime, secondTime) {
    fisrtTime = this.resTimestamp(fisrtTime)
    secondTime = this.resTimestamp(secondTime)
    let stampBetween = fisrtTime > secondTime ? fisrtTime - secondTime : secondTime - fisrtTime
    return Math.floor(stampBetween / (24 * 3600 * 1000))
  }
}