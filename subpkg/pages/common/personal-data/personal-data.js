// pages/common/personal-data/personal-data.js
import { requestOtherUserInfoByUserId } from "../../../../api/userApi";
import { requestUserActivityList } from "../../../../api/activityApi";
import { getBbsDynamic, requestUserAttention } from "../../../../api/forumApi";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 10,
    offset: 1,
    //用户信息
    userObj: {},
    //活动信息
    activityList: [],
    //动态
    dynamicList: []
  },
  // 跳转关注
  goAttention() {
    wx.navigateTo({
      url: '/pages/forum/attention/attention',
    })
  },

  /**
   * 切换关注
   */
  switchAttention() {
    requestUserAttention(this.data.id, (res) => {
      this.getUserBaseInfo()
    }, () => { })
  },
  // 跳转提问
  goFans() {
    wx.navigateTo({
      url: '/pages/forum/fans/fans',
    })
  },

  /**
   * 请求获取用户id
   */
  requestUserInfo() {
    this.getActivityList()
    this.getUserBaseInfo()
    this.getDynamic()
  },

  /**
   * 获取用户基本信息
   */
  getUserBaseInfo() {
    //获取用户基本信息
    requestOtherUserInfoByUserId(this.data.id, (res) => {
      console.log(res)
      this.setData({
        userObj: res.data
      })
    }, () => {
    })
  },

  /**
   * 获取活动信息
   */
  getActivityList() {
    //获取活动信息
    requestUserActivityList(this.data.id, this.data.offset, this.data.pageSize, (res) => {
      this.setData({
        activityList: res.data
      })
      console.log(res)
    }, () => {
    })
  },

  /**
   * 获取动态数据
   */
  getDynamic() {
    getBbsDynamic({
      miniFlag: 1,
      offset: this.data.offset,
      pageSize: this.data.pageSize,
      userId: this.data.id
    }, (res) => {
      this.setData({
        dynamicList: res.data
      })
    }, () => {

    })
  },

  /**
   * 处理私聊事件
   */
  handlePrivateMessage() {
    wx.navigateTo({
      url: `/subpkg/pages/im/messageDetail/messageDetail?id=${this.data.userObj.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.id = options.id
    this.requestUserInfo()
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
