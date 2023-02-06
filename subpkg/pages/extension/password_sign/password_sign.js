// subpkg/pages/extension/password_sign/password_sign.js
const app = getApp()
const dayjs = require("dayjs").default;
import Message from 'tdesign-miniprogram/message/index';
const { requestSignDetail, requestGestureSign, requestPasswordSign } = require('../../../../api/activityApi.js');
Page({
  data: {
    //密码
    password: '',
    //展示密码输入框
    showPassWord: false,
    //0=签到 1=签退
    signFlag: '',
    id: 0,
    //是否满足gps定位
    isCanSign: 0,
    //签到时间
    realTime: '',
    signDetail: {},
    userinfo: {},
    address: '',
    //获取的定位信息
    gpsInfo: {}
  },



  onLoad(options) {
    console.log(app.globalData);
    this.setData({
      userinfo: app.globalData.userInfo
    })
    console.log('全局用户信息', this.data.userinfo);
    this.setData({
      id: options.id
    })
    console.log(app.userinfo);

    // -----------方法二
    setInterval(() => {
      this.setData({
        realTime: dayjs().format('HH:mm:ss')
      })
    }, 1000);

    this.refreshInfo()

  },

  /**
   * 签到
   */
  signIn() {
    this.setData({
      signFlag: 0
    })
    this.showPasswordDialog()
  },

  changePassword(e) {
    this.setData({
      password: e.detail.value
    })
    console.log(
      e
    );
  },

  /**
   * 展示密码弹框
   */
  showPasswordDialog() {
    this.setData({
      showPassWord: true
    })
  },


  closeDialog() {

    this.setData({
      showPassWord: false
    })
  },

  /**
   * 签退
   */
  signOut(data) {
    this.setData({
      signFlag: 1
    })
    this.showPasswordDialog()
  },

  /**
   * 开始签到
   */
  submitSign() {
    //请求接口
    requestPasswordSign(this.data.id, { password: this.data.password, signFlag: this.data.signFlag }, (res) => {
      //签到成功
      this.refreshInfo()
      this.closeDialog()
    }, () => {
      //失败
    })

  },
  /**
 * 刷新信息
 */
  refreshInfo() {
    requestSignDetail(this.data.id, (res) => {
      this.setData({
        signDetail: res.data
      })
    }, () => { })
  },
})
