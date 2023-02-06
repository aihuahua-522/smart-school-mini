// pages/forum/attention/attention.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    num:123
  },
  handlePopup() {
    this.setData({
      visible: true,
    });
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },
    // 跳转个人主页
    goPersonalData() {
      wx.navigateTo({
        url: '/pages/forum/personal-data/personal-data',
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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