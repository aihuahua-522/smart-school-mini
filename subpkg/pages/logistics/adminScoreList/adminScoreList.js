// subpkg/pages/logistics/adminScoreList/adminScoreList.js
import { requestGetDormTree, requestScoreListByDate } from "../../../../api/logisticsApi";


const dayjs = require('dayjs').default
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseRefresh: {
      value: false,
    },
    options: [],
    note: '请选择楼栋',
    visible: false,
    dateVisible: false,
    date: new Date().getTime(), // 支持时间戳传入
    //评分列表
    scoreList: [],
    //是否加载完成
    noMore: false,
    //是否加载中
    loading: false,
    queryObj: {
      //日期
      date: '',
      //楼栋id
      dormId: '',
      offset: 1,
      //   分页
      pageSize: 10,
      //状态 0=未打分 1=已打分
      status: 0
    }
  },

  /**
   * 弹框确认
   * @param e
   */
  onConfirm(e) {
    const { value } = e?.detail;

    this.setData({
      ["queryObj.date"]: value,
    });
    this.resetFiled()
    this.getScoreList()
    this.hidePicker();
  },
  /**
   * 关闭选择框
   */
  hidePicker() {
    const { mode } = this.data;
    this.setData({
      ["dateVisible"]: false,
    });
  },
  /**
   * 展示日期选择框
   * @param e
   */
  showPicker(e) {
    this.setData({
      ["dateVisible"]: true,
    });
  },
  /**
   * 跳转到打分或者详情
   */
  toDetail(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.roomid)
    console.log(this.data.queryObj.status)
    if (this.data.queryObj.status == 1) {
      console.log("已打分")
      //已打分
      wx.navigateTo({
        url: `/subpkg/pages/logistics/scorePage/scorePage?id=${e.currentTarget.dataset.id}`,
      })
    } else {
      console.log("未打分")
      //未打分
      wx.navigateTo({
        url: `/subpkg/pages/logistics/scorePage/scorePage?roomId=${e.currentTarget.dataset.roomid}`,
      })
    }

  },

  /**
   * 获取评分列表
   */
  getScoreList() {
    requestScoreListByDate(this.data.queryObj, (res) => {
      let scoreList = this.data.scoreList || [];
      scoreList = scoreList.concat(res.data)
      this.setData({
        "scoreList": scoreList,
        'baseRefresh.value': false,
        "laoding": false
      })
      if (this.data.scoreList.length >= parseInt(res.total)) {
        //如果当前条数大于总数 那么没有更多
        this.setData({
          "noMore": true
        })
      }
    }, () => {

    })
  },

  /**
   * tab切换
   * @param res
   */
  onTabsChange(res) {
    this.data.queryObj.status = res.detail.value
    this.resetFiled()
    this.getScoreList()
  },
  /**
   * 重置数据和分页
   */
  resetFiled() {
    this.setData({
      "scoreList": []
    })
    this.data.queryObj.pageSize = 10
    this.data.queryObj.offset = 1
    this.getScoreList()
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
  showCascader() {
    this.setData({ visible: true });
  },
  onChange(e) {
    const { selectedOptions } = e.detail;

    console.log(selectedOptions)
    this.setData({
      note: selectedOptions.map((item) => item.label).join('/'),
    });
    //刷新数据
    this.setData({
      "queryObj.dormId": selectedOptions[selectedOptions.length - 1].value
    })
    this.getScoreList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //给日期默认值
    this.setData({
      ["queryObj.date"]: dayjs().format('YYYY-MM-DD')
    })
    this.getDormTree()
    this.getScoreList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log("onReady")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("onShow")
    this.getScoreList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log("onHide")
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
    this.getScoreList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("onReachBottom")

    this.setData({
      loading: true,
      noMore: false,
      "queryObj.offset": this.data.queryObj.offset + 1
    })

    this.getScoreList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
