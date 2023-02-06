const app = getApp()
const dayjs = require("dayjs").default;
import Message from 'tdesign-miniprogram/message/index';
const { requestCheckGps, requestSignDetail, requestGpsSign, requestGestureSign } = require('../../../../api/activityApi.js');
Page({
  data: {
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
  signIn(data) {
    console.log(data);
    if (!this.signInComponent) {
      this.signInComponent = this.selectComponent('#signInComponent')
    }
    requestGestureSign(this.data.id, { gesture: data.detail.join(","), signFlag: 0 }, (res) => {
      this.signInComponent.success()
      this.refreshInfo()
    }, () => {
      this.signInComponent.fail()
    })

  },

  /**
   * 签退
   */
  signOut(data) {
    console.log(data);

    if (!this.signOutComponent) {
      this.signOutComponent = this.selectComponent('#signOutComponent')
    }
    requestGestureSign(this.data.id, { gesture: data.detail.join(","), signFlag: 0 }, (res) => {
      this.signOutComponent.success()
    }, () => {
      this.signOutComponent.fail()
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