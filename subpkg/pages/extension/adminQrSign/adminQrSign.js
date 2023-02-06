// subpkg/pages/extension/password_sign/password_sign.js
import {requestQrSign} from "../../../../api/activityApi";

const app = getApp()
const dayjs = require("dayjs").default;
import Message from 'tdesign-miniprogram/message/index';
import {showError, showSuccess} from "../../../../utils/MessageUtil";

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
    this.data.signFlag = 0
    this.scanCode()

  },

  scanCode() {
    let myThis = this;
    wx.scanCode({
      success(res) {
        console.log(res.result)
        myThis.data.token = res.result
        myThis.submitSign()
      }
    })
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




  /**
   * 签退
   */
  signOut(data) {
    this.data.signFlag = 0
    this.scanCode()
  },

  /**
   * 开始签到
   */
  submitSign() {
    //请求接口
    requestQrSign(this.data.id, {token:this.data.token, signFlag: this.data.signFlag }, (res) => {
      showSuccess('操作成功')
      //签到成功
      this.refreshInfo()
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
