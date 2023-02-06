// subpkg/pages/extension/customList/customList.js
import { requestGetCustomMyActivity } from '../../../../api/activityApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { lable: '待审核', value: '0' },
      { lable: '已同意', value: '1' },
      { lable: '被拒绝', value: '2' },
    ],
    activityList: [],
    query: {
      offset: 1,
      pageSize: 8,
      status: 0
    }
  },
  getCustomMyActivity(query) {
    requestGetCustomMyActivity(query, (res) => {
      this.setData({
        activityList: res.data
      })
      console.log(res);
    })
  },
  onTabsClick(e) { },
  onTabsChange(e) {
    this.setData({
      'query.status': e.detail.value,
      'query.offset': 1,
      'query.pageSize': 8
    })
    this.getCustomMyActivity(this.data.query)
  },
  /**
   * 处理添加按钮事件
   */
  handleAdd() {
    wx.navigateTo({
      url: '/subpkg/pages/extension/customAdd/customAdd',
    })
  },
  toDetail(e) {
    console.log(e.currentTarget.dataset.activityid);
    wx.navigateTo({
      url: '/subpkg/pages/extension/customDetail/customDetail?activityId=' + e.currentTarget.dataset.activityid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCustomMyActivity(this.data.query)
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
    this.setData({
      'query.status': 0,
      'query.offset': 1,
      'query.pageSize': 10
    })
    this.getCustomMyActivity(this.data.query)
  },

  /**
   * 重置
   */
  reset() {

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
    this.setData({
      'query.offset': this.data.query.offset += 1
    })
    requestGetCustomMyActivity(this.data.query, (res) => {
      this.setData({ activityList: [...this.data.activityList, ...res.data] })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
