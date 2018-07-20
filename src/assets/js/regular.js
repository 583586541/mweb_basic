import vux from './vux'

export default {
  /**
   * 功能：数据正则验证，type类型如下
   * 参数：val：值，type：类型，errMsg(可缺省)：错误信息
   * 返回：true：成功，false：错误
   */
  regTest(val, type, errMsg) {
    /**
     * 手机号 —— tel
     * 密码 —— psd
     * 身份证 —— IDcard
     * 邮箱 —— email
     * 验证码 —— securityCode
     * QQ —— QQ
     * 微信 —— weixin
     * 正整数 —— plusInt（不含0）
     * 非负整数 —— nonnegativeInt（包含0）
     * 中文名 —— chinaName
     */
    let regLists = {
      'tel': /^1[3456789]\d{9}$/, // 手机号校验
      'telErr': '请输入11位手机号',
      'psd': /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, // 密码
      'psdErr': '请输入6~16位字符的密码（数字和字母组成）',
      'IDcard': /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/, // 身份证
      'IDcardErr': '请输入18位身份证号码',
      'email': /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, // 邮箱
      'emailErr': '请输入正确的邮箱地址',
      'securityCode': /^\d{6}$/, // 验证码
      'securityCodeErr': '请输入6位数验证码',
      'QQ': /^\d{5,13}$/, // QQ
      'QQErr': '请输入正确的QQ号',
      'weixin': /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, // 微信
      'weixinErr': '请输入正确的微信号',
      'plusInt': /^[1-9]*[1-9][0-9]*$/, // 正整数（不含0）
      'plusIntErr': '请输入正整数',
      'nonnegativeInt': /^\d+$/, // 非负整数（包含0）
      'nonnegativeIntErr': '请输入非负整数',
      'plateNum': /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/, // 车牌号
      'plateNumErr': '请输入正确的车牌号',
      'chinaName': /^[\u4E00-\u9FA5]{2,4}$/,
      'chinaNameErr': '请输入真实姓名（2~4个汉字字符）'
    }
    val = val.toString()
    if (!regLists[type].test(val)) {
      if (!errMsg) {
        errMsg = regLists[type + 'Err']
      }
      vux.vToastShow(errMsg)
      return false
    }
    return true
  }
}