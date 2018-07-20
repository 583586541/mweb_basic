import api from '../../api/api'

export default {
  stSet (dataObj) {
    let _this = this
    for (var i in dataObj) {
      _this.insertItem(i, dataObj[i])
    }
  },
  insertItem (key, val) {
    let _this = this

    key = api.STORAGEPREFIX + key
    let valType = typeof (val)
    if (val !== null) {
      var valConstructor = val.constructor
    }
    if (valType === 'string' || valType === 'number' || valType === 'boolean') {
      if (valConstructor === String) {
        val = val + '|String'
      } else if (valConstructor === Number) {
        val = val + '|Number'
      } else if (valConstructor === Boolean) {
        val = val + '|Boolean'
      }
      api.STORAGETYPE.setItem(key, val)
    } else if (valType === 'object') {
      if (val === null) {
        val = JSON.stringify(val) + '|Null'
        api.STORAGETYPE.setItem(key, val)
      } else {
        if (valConstructor === Array) {
          val = JSON.stringify(val) + '|Array'
        } else if (valConstructor === Object) {
          val = JSON.stringify(val) + '|Object'
        }
        api.STORAGETYPE.setItem(key, val)
      }
    }
  },
  stGet (key) {
    let _this = this
    key = api.STORAGEPREFIX + key
    let keyVal = api.STORAGETYPE.getItem(key)
    if (keyVal === null) {
      return null
    }
    let valArr = keyVal.split('|')
    let getDataType = valArr[valArr.length - 1]
    valArr.splice(valArr.length - 1, 1)
    let val = valArr.join('')
    if (getDataType === 'Number') {
      val = parseInt(val)
    } else if (getDataType === 'Boolean') {
      if (val === 'true') {
        val = true
      } else {
        val = false
      }
    } else if (getDataType === 'Array' || getDataType === 'Object' || getDataType === 'Null') {
      val = JSON.parse(val)
    }
    return val
  },
  stDelete (key) {
    api.STORAGETYPE.removeItem(api.STORAGEPREFIX + key)
  },
  stClear () {
    let _this = this
    for (var i in api.STORAGETYPE) {
      if (i.indexOf(api.STORAGEPREFIX) !== -1) {
        api.STORAGETYPE.removeItem(i)
      }
    }
  }
}
