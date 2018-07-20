export default {
  /**
   * 功能：载体是否IphoneX设备
   * 返回：true：是，false：否
   */
  iphoneX() {
    let canvas = document.createElement('canvas'),
      gl = canvas.getContext('experimental-webgl'),
      debugInfo = gl.getExtension('WEBGL_debug_renderer_info')

    if (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) == 'Apple A11 GPU' && Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1) == 2436) {
      return true
    }
    return false
  }
}