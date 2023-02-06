// subpkg/pages/logistics/studentSelfSignList/studentSelfSignList.js
import {requestMySignList} from "../../../../api/logisticsApi";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseRefresh: {
      value: false,
    },
    currentTab: 0,
    //签到数据
    signList:[],
    //查询参数
    queryData: {
      pageSize: 10,
      offset: 1,
      //签到状态
      signFlag: 0
    }
  },
  /**
   * tab切换
   * @param e
   */
  onTabsChange(e) {
    this.setData({
      signList:[],
      currentTab: e.detail.value,
      "queryData.signFlag": e.detail.value,
      "queryData.offset": 1,
      "queryData.pageSize": 10,
    })
    this.getMySignList()
  },
  /**
   * 获取签到列表
   */
  getMySignList() {
    requestMySignList(this.data.queryData, (res) => {
      this.setData({
        signList:res.data,
        'baseRefresh.value': false
      })
    }, () => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMySignList()
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
    this.getMySignList()
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
