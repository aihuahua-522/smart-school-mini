// subpkg/pages/extension/commentPushPush/commentPcommentPush.js
import {
  requestAddComment
} from "../../../../api/activityApi";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    starNum: 0,
    commentText: ''
  },
  chooseStar(e) {
    console.log(e);
    this.setData({
      starNum: e.currentTarget.dataset.wpychoosestarA
    });
  },
  getComment(e) {
    this.setData({
      commentText: e.detail.value
    });
  },

  /**
   * 提交数据
   */
  submitData() {
    requestAddComment(this.data.id, {
      content: this.data.commentText,
      star: this.data.starNum
    }, (res) => {
      wx.navigateBack()
    }, () => {})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
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
