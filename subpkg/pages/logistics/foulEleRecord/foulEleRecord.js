
import { getViolationsList } from '../../../../api/logisticsApi'
// subpkg/pages/foulEleRecord/foulEleRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    roomId: 0,
    offset: 1,
    total: undefined,
    isLoading: false,
    noMore: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.roomId = options.roomId
    this.loadData()
  },

  /**
   * 加载数据
   */
  loadData() {
    this.setData({
      isLoading: true
    })
    getViolationsList({
      offset: this.data.offset,
      roomId: this.data.roomId
    }, (res) => {
      this.setData({
        info: this.data.info.concat(res.data),
        total: res.total,
        noMore: this.data.info.length >= res.total,
        isLoading: false
      })
    }, (err) => { console.log(err); })
  },
  /**
   * 充值页面
   */
  resetPage() {
    this.data.offset = 1
    this.setData({
      "noMore": false,
      "isLoading": false,
      "info": []
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
    this.resetPage()
    this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
