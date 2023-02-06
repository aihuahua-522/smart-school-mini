// subpkg/pages/extension/activityManageList/activityManageList.js
import { requestMyManageActivity } from '../../../../api/activityApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        label: '全部',
        value: '-1'
      },
      {
        label: '待审核',
        value: '0'
      },
      {
        label: '待开始',
        value: '1'
      },
      {
        label: '进行中',
        value: '2'
      },
      {
        label: '待完结',
        value: '3'
      },
      {
        label: '已完结',
        value: '4'
      },
      {
        label: '已取消',
        value: '5'
      },
    ],
    loadingProps: {
      size: '80rpx',
    },
    activityList: [],
    query: {
      pageSize: 10,
      offset: 1,
      status: -1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMyActivity()
  },
  getMyActivity(query) {
    requestMyManageActivity(this.data.query, (res) => {
      this.setData({
        activityList: res.data
      })
    })
  },
  onTabsChange(e) {
    this.setData({
      'query.status': e.detail.value,
      'query.offset': 1,
      'query.pageSize': 10
    })
    this.getMyActivity(this.data.query)
  },
  onRefreshChange(val) {
    this.setData({
      'query.offset': 1,
      'query.pageSize': 10
    })
    this.getMyActivity(this.data.query)
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
    this.setData({
      'query.offset': this.data.query.offset += 1
    })
    requestGetMyActivity(this.data.query, (res) => {
      this.setData({ activityList: [...this.data.activityList, ...res.data] })
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
