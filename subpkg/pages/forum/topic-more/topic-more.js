// pages/topic-more.js
import {
  getBbsTopic
} from '../../../../api/forumApi.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bbsTopicList: [],
    param: {
      offset: 1,
      pageSize: 7
    },
    isCheck: false,
    isEnd: false,
  },
  // 跳转话题详情
  goTopicDetails(e) {
    console.log(e.currentTarget.dataset.index, 5555);
    const i = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/subpkg/pages/forum/topic-details/topic-details?id=' + i
    })
  },

  // 获取数据查询
  getHttpData() {
    // 上拉加载更多处理【获取动态数据】
    this.httpOfficeDocument(true)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getHttpData()
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

  // 加载更多处理
  httpOfficeDocument(status) {
    this.data.param.offset = status ? 1 : (this.data.param.offset += 1);
    getBbsTopic(this.data.param, (res) => {

      if (status) {
        this.setData({
          bbsTopicList: res.data,
          isEnd: true
        });
      } else {
        this.setData({
          bbsTopicList: this.data.bbsTopicList.concat(res.data),
          isEnd: true
        });
      }
      console.log(this.data.bbsTopicList.length == parseInt(res.total), 'test');
      // 数据全部请求完成，停止请求
      if (this.data.bbsTopicList.length === parseInt(res.total)) {
        this.setData({
          isCheck: false
        })
      } else {
        this.setData({
          isCheck: true
        })
      }

      wx.stopPullDownRefresh();
    }, (err) => {
      console.log(err);
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getHttpData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isCheck) {
      //此处判断，上锁，防止重复请求
      console.log(123123123);
      this.httpOfficeDocument(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
