// subpkg/pages/extension/show_qr_code/show_qr_code.js
import {
  requestQrCode
} from '../../../../api/activityApi.js'
import drawQrcode from '../../../../utils/qrcode/weapp.qrcode.esm.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: 0
  },
  /**
   * 获取二维码
   */
  getQrCode() {
    requestQrCode((res) => {
      if (!res.data) {
        //加载失败 应该要重试
      } else {
        this.showQcCode(res.data)
      }
    }, () => {})
  },

  showQcCode(content) {
    const query = wx.createSelectorQuery()
    query.select('#myQrcode')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        var canvas = res[0].node

        // 调用方法drawQrcode生成二维码
        drawQrcode({
          canvas: canvas,
          canvasId: 'myQrcode',
          width: 260,
          padding: 30,
          background: '#ffffff',
          foreground: '#000000',
          text: content,
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getQrCode()
    setInterval(() => {
      this.getQrCode()
    }, 55000);

    const app = getApp()
    const uid = app.globalData.userInfo.id
    this.setData({
      uid
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