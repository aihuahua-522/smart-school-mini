// subpkg/pages/upEleRecord/upEleRecord.js

import { getDict, getDictValue, logisticsElectricRechargeSource } from '../../../../api/dictApi'
import { getUpEle } from '../../../../api/logisticsApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //充值方式list
    rechargeDict: [],
    infoData: {
      info: [],
      isFlag: -1,
    },
    address: '',
    //是否加载中
    loading: false,
    //没有更多
    noMore: false,
    body: {
      roomId: null,
      startTime: null,
      endTime: null,
      offset: 1
    }
  },
  /**
   * 加载充值方式list
   */
  loadRechargeDict() {
    getDict(logisticsElectricRechargeSource, (res) => {
      this.setData({
        rechargeDict: res.data
      })
    }, () => { })
  },
  // 页面数据加载
  getData() {
    getUpEle(this.data.body, (res) => {
      if (res.data.length !== 0) {
        this.setData({
          "infoData.info": this.data.infoData.info.concat(res.data.map(item => {
            item.sourceName = getDictValue(this.data.rechargeDict, item.source)
            return item
          })),
          "infoData.isFlag": res.total,
          address: res.data[0].completeName,
          loading: false,
          noMore: this.data.infoData.info.length >= res.total
        })
      } else {
        console.log(this.data.infoData.info.length);
        console.log(res.total);
        console.log(res);
        // 无充值记录
        this.setData({
          loading: false,
          noMore: this.data.infoData.info.length >= res.total
        })
      }
    }, (e) => { console.log(e); })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      'body.roomId': options.roomId
    })
    this.loadRechargeDict()
    this.getData()
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
    console.log("刷新了");
    this.resetPage()
    this.getData()
  },

  resetPage() {
    console.log('充reset');
    //重置页码
    this.data.body.offset = 1
    this.setData({
      "infoData.info": []
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 上拉触底加载新数据
    wx.showToast({
      title: '已加载全部数据',
      icon: 'none',
      duration: 2000
    })
    this.setData({
      loading: true
    })
    this.data.body.offset = this.data.body.offset + 1
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
