import {
  requestCommentList,
  requestCommentPreview
} from "../../../../api/activityApi";

// subpkg/pages/extension/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    //0=好评 1=中评 2=差评 3=全部
    type: 3,
    //评论数量预览
    commentPreview: {},
    comments: [],
    pageSize: 10,
    offset: 1
  },

  chooseTab: function (e) {
    console.log(e);
    // this.type = e. 
    this.setData({
      comments: [],
      type: e.currentTarget.dataset.type
    })
    this.getCommentData();
  },

  /**
   * 获取评论数据
   */
  getCommentData() {
    requestCommentList(this.data.id, this.data.offset, this.data.pageSize, this.data.type, (res) => {
      const commentList = this.data.comments.concat(res.data)
      this.setData({
        comments: commentList
      })
    }, () => { })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    requestCommentPreview(options.id, (res) => {
      console.log(res);
      this.setData({
        id: options.id,
        commentPreview: res.data
      })
      this.getCommentData()
    }, () => {

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