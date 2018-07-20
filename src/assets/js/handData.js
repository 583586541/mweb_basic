export default {
  /**
   * 功能：返回浮点型小数
   * 参数：data：传输的数值(如1)，digit：返回的数据长度，默认返回带2位小数
   * 返回：'1.00'
   */
  resFloatData(data, digit) {
    if (isNaN(Number(data))) {
      return false
    }
    if (!digit) {
      digit = 2
    }
    data = data.toString()
    let splitResult = data.split('.')
    if (splitResult.length === 1) {
      let addText = '.'
      for (let i = 0; i < digit; i++) {
        addText = addText + '0'
      }
      return data + addText
    } else {
      let text = splitResult[1]
      if (text.length < digit) {
        let addText = '.' + text
        for (let i = 0; i < (digit - text.length); i++) {
          addText = addText + '0'
        }
        return splitResult[0] + addText
      } else {
        return splitResult[0] + '.' + text.substring(0, digit)
      }
    }
  },
  /**
   * 功能：位数补齐(数据前补0)
   * 参数：data：传输的数值(如1)，digit：返回的字符串长度，默认返回长度2
   * 返回：'01'
   */
  complement(data, digit) {
    data = data.toString()
    if (!digit) {
      digit = 2
    }
    let disparity = digit - data.length
    if (disparity < 1) {
      return data.toString()
    }
    let addText = ''
    for (var i = 0; i < disparity; i++) {
      addText = addText + '0'
    }
    return addText + data
  }
}