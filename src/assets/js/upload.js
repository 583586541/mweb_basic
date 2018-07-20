// 1. 在需要上传图片的页面先进行验签 async OSSsign () { this.OSS = await this.$.OSSsign() }
// 2. input[type=file]绑定change方法 async doUpload () { console.log(await this.$.doUpload(this.OSS, event.target.files[0])) }
import vux from './vux'

export default {
  /**
   * 功能：OSS验签
   * 返回：OSS对象
   */
  async OSSsign (url, param) {
    let res = await this.axiosPost(url, param, false)
    if (!res) { return }
    let data = res.data
    
    return new OSS.Wrapper({
      region: data.region,
      accessKeyId: data.accessKeyId,
      accessKeySecret: data.accessKeySecret,
      stsToken: data.securityToken,
      bucket: data.bucket
    })
  },
  /**
   * 功能：上传图片
   * 返回：图片信息
   */
  async doUpload (OSS, file, max, range) {
    if (!OSS) {
      vux.vToastShow('OSS客户端异常，请刷新重试')
    }
    if (!this.checkFileSize(file, max)) { return false }
    if (!this.checkFileType(file, range)) { return false }

    let name = Date.parse(new Date()).toString() + Math.ceil(Math.random() * 10 * 9999)  + '.' + file.name.split('.')[1]
    return await OSS.multipartUpload(name, file, {
      progress: function * (p) {
        console.log('Progress: ' + p)
      }
    }).then((results) => {
      return results
    }).catch((err) => {
      vux.vToastShow('上传失败，请重试')
      return false
    })
  },
  /**
   * 功能：判断文件流大小是否超出限制
   * 参数：file：文件流，max：size范围最大值：默认为2M（含2M）
   * 返回：true：验证通过，false：验证失败
   */
  checkFileSize (file, max) {
    if (!file) { return false }
    if (!max) { max = 2 } // 默认2M
    max = max * 1024 * 1024
    if (file.size <= max) { return true }
    vux.vToastShow('文件大小超出限制，请重新选择')
    return false
  },
  /**
   * 功能：判断文件流类型是否符合
   * 参数：file：文件流，range：文件type范围：默认为检测后缀名为jpeg、jpg、png、gif的图片 Ps:['image/jpeg', 'image/jpg', 'image/png', 'image/gif']，[]表接受全部类型
   * 返回：true：验证通过，false：验证失败
   */
  checkFileType (file, range) {
    if (!file) { return false }
    try {
      if (range.length === 0) { return true } // 接收所有类型的文件
    } catch (err) {
      if (!range) { range = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'] } // 默认为检测后缀名为jpeg、jpg、png、gif的图片
    }
    for (var i = 0; i < range.length; i++) {
      if (file.type === range[i]) {
        return true
      }
    }
    vux.vToastShow('文件类型不支持，请重新选择')
    return false
  }
}
