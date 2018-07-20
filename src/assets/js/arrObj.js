// 数组、对象模块
const d = {
  /**
   * 功能：对象转二维数组
   * 参数：不可缺醒 { a: 1, b: 2 }
   * 返回：[["a",1],["b",2]]
   */
  objConvertArr(data) {
    let arr = []
    for (let i in data) {
      arr.push([i, data[i]])
    }
    return arr
  },
  /**
   * 功能：二维数组转对象
   * 参数：不可缺醒 [["a",1],["b",2]]
   * 返回：{ a: 1, b: 2 }
   */
  arrConvertObj(data) {
    let obj = {}
    data.forEach(function (item) {
      let key = item[0]
      let value = item[1]
      obj[key] = value
    })
    return obj
  },
  /**
   * 功能：数组去重
   * 参数：不可缺醒 [1, 2, 1, 3, 5, 9, 5]
   * 返回：[1,2,3,5,9]
   */
  arrayDistinct(array) {
    let obj = {}
    let result = []
    for (var i = 0; i < array.length; i++) {
      if (!obj[array[i]]) {
        obj[array[i]] = true
        result.push(array[i])
      }
    }
    return result
  },
  /**
   * 功能：判断对象是否为空
   * 参数：{}
   * 返回：true-是 false-否
   */
  emptyObject(obj) {
    for (let key in obj) {
      return false
    }　　　　
    return true
  }
}

export default d