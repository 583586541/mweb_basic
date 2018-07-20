export default {
  /**
   * 功能：载体是否app客户端
   * 返回：true：是，false：否
   */
  appClient() {
    let hash = window.location.hash
    
    if (hash.indexOf("?") != -1) {
      hash = hash.split('?')[1]
      if (hash.match(/app/)) {
        return true
      }
    }
    return false
  }
}