export default {
  // 搬砖者身份判断
  root(IPv4s) {
    let hostname = window.location.hostname

    for (let i = 0; i < IPv4s.length; i++) {
      if (IPv4s[i] == hostname) {
        return true
      }
    }
    return false
  }
}