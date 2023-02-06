// subpkg/pages/logistics/dorm_sign_list/dorm_sign_list.js
import { requestAdminSignList, requestGetDormTree } from "../../../../api/logisticsApi";

const dayjs = require("dayjs").default;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateVisible: false,
    defaultDate:new Date().getTime(),
    queryObj: {
      status:0,
      offset: 1,
      pageSize: 10,
      date: '',
      dormId: '',
      dormName: ''
    },
    signList: [],
    //宿舍选择信息
    options: [],
    baseRefresh: {
      value: false,
    },
    //是否加载完成
    noMore: false,
    //是否加载中
    loading: false,
  },


  /**
   * tab切换
   * @param res
   */
  onTabsChange(res) {
    this.data.queryObj.status = res.detail.value
    this.resetFiled()
    this.getSignList()
  },
  /**
   * 重置数据和分页
   */
  resetFiled() {
    this.setData({
      "signList": []
    })
    this.data.queryObj.pageSize = 10
    this.data.queryObj.offset = 1

  },

  /**
   * 获取宿舍树形结构
   */
  getDormTree() {
    requestGetDormTree((res) => {
      this.setData({
        "options": res.data
      })
    }, () => {

    })


  },

  /**
   * 获取签到列表
   */
  getSignList() {
    requestAdminSignList({ ...this.data.queryObj }, (res) => {
      let list = this.data.signList
      list = list.concat(res.data)
      this.setData({
        "signList": list,
        'baseRefresh.value': false,
        "laoding": false
      })
      if (this.data.signList.length >= parseInt(res.total) && this.data.signList.length > 7) {
        //如果当前条数大于总数 那么没有更多
        this.setData({
          "noMore": true
        })
      }
    }, () => { })
  },

  /**
   * 时间修改
   * @param e
   */
  onConfirm(e) {
    this.setData({
      "queryObj.date": e?.detail?.value
    })
    this.resetFiled()
    this.getSignList()
  },

  /**
   * 展示级联选择
   */
  showTimePick() {
    this.setData({ dateVisible: true });
  },
  onChange(e) {
    const { selectedOptions } = e.detail;

    console.log(selectedOptions)
    this.setData({
      "queryObj.dormName": selectedOptions.map((item) => item.label).join('/'),
    });
    //刷新数据
    this.setData({
      "queryObj.dormId": selectedOptions[selectedOptions.length - 1].value
    })
    this.getSignList()
  },

  /**
   * 展示级联选择
   */
  showCascader() {
    this.setData({ visible: true });
  },


  /**
   * 跳转详情
   */
  toDetail(e) {
    console.log(e.currentTarget.dataset.roomid)
    wx.navigateTo({
      url: `../dorm_sign_list/dorm_sign_detail/dorm_sign_detail?date=${this.data.queryObj.date}&roomId=${e.currentTarget.dataset.roomid}`
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('日期',dayjs().format('YYYY-MM-DD'))
    this.setData({
      "queryObj.date": dayjs().format('YYYY-MM-DD')
    })
    this.getDormTree()
    this.getSignList()
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
    this.resetFiled()
    this.getSignList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      loading: true,
      noMore: false,
      "queryObj.offset": this.data.queryObj.offset + 1
    })
    this.getSignList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
