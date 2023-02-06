// subpkg/pages/extension/gps_sign/gps_sign.js
const { requestCheckGps, requestSignDetail, requestGpsSign } = require('../../../../api/activityApi.js');
var amapFile = require('../../../../libs/amap-wx.js')
const dayjs = require("dayjs").default;
const app = getApp()
import Message from 'tdesign-miniprogram/message/index';
Page({

  /**
   * 页面的初始数据
   */
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

  /**
   * 生命周期函数--监听页面加载
   */
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


    this.refreshLocation()
    this.task = setInterval(() => {
      this.refreshLocation()
    }, 10000);


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


  /**
   * 刷新定位
   */
  refreshLocation() {

    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'e867e58ffd7b998c608b0741b52c11c1' });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        console.log(data);
        that.setData({
          gpsInfo: data[0]
        })
        requestCheckGps(that.data.id, data[0].latitude, data[0].longitude, (res) => {
          that.setData({
            address: data[0].regeocodeData.formatted_address,
            isCanSign: res.data == true ? 1 : 0
          })
        }, () => { })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },

  /**
   * 点击签到
   */
  signIn() {
    requestGpsSign(this.data.id, { longitude: this.data.gpsInfo.longitude, latitude: this.data.gpsInfo.latitude, signFlag: 0 }, (res) => {
      this.refreshInfo()
      Message.success({
        context: this,
        offset: [20, 32],
        duration: 3000,
        content: '签到成功',
      });
    }, () => { })
  },

  signOut() {
    requestGpsSign(this.data.id, { longitude: this.data.gpsInfo.longitude, latitude: this.data.gpsInfo.latitude, signFlag: 1 }, (res) => {
      this.refreshInfo()
      Message.success({
        context: this,
        offset: [20, 32],
        duration: 3000,
        content: '签退成功',
      });
    }, () => { })
  },

  /**
   * 跳转地图
   */
  goMap() {
    wx.navigateTo({
      url: `/subpkg/pages/extension/map/map?id=${this.data.id}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.refreshInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(this.task)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
