// subpkg/pages/logistics/myScoreList/myScoreList.js
import { requestMyDormInfo, requestMyDormScore } from "../../../../api/logisticsApi";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //宿舍信息
    dormInfo: {},
    //评分数据
    scoreList: [],
    //查询参数
    queryParam: {
      offset: 1,
      pageSize: 10,
      //房间id
      roomId: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
  },
  /**
   * 跳转详情
   */
  toDetail(e) {
    console.log(e.currentTarget.dataset.id);
    console.log('toDetail...')
    wx.navigateTo({
      url: `/subpkg/pages/logistics/scorePage/scorePage?id=${e.currentTarget.dataset.id}`,
    })
  },

  /**
   * 获取我的宿舍信息
   */
  getData() {
    requestMyDormInfo((res) => {
      this.setData({
        dormInfo: res.data,
        "queryParam.roomId": res.data.roomId
      })
      //加载评分信息
      this.loadMyScoreList()
    }, () => {
    })
  },
  /**
   * 加载我的评分信息
   */
  loadMyScoreList() {
    requestMyDormScore(this.data.queryParam, (res) => {
      this.setData({
        scoreList: res.data
      })

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
