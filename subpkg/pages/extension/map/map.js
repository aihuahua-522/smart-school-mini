// subpkg/pages/extension/map/map.js
var amapFile = require('../../../../libs/amap-wx.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: "e867e58ffd7b998c608b0741b52c11c1"
    });
    wx.getSystemInfo({
      success: function (data) {
        var height = data.windowHeight;
        var width = data.windowWidth;
        var size = width + "*" + height;
        myAmapFun.getStaticmap({
          zoom: 18,
          size: size,
          scale: 2,
          //标注自己坐标位置
          markers: "mid,0xFF0000,A:114.94461,27.80038;114.94462,27.80040",
          success: function (data) {
            that.setData({
              src: data.url
            })
          },
          fail: function (info) {
            wx.showModal({
              title: info.errMsg
            })
          }
        })

      },
      fail(e) {
        console.log(e);
      }
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