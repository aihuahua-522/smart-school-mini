// subpkg/pages/library/orderList/orderList.js
import {requestOrderList} from "../../../../api/libraryApi";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[{
      index:0,
      title:'预约中',
    },{
      index:1,
      title:'借阅中',
    },{
      index:2,
      title:'已逾期',
    }
    ,{
      index:3,
      title:'已归还',
    },{
      index:4,
      title:'已取消',
    },
  ],
    offset:1,
    currentTab:0,
orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadOrderList()
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
   * tab切换
   */
  onTabsChange(e){
    this.setData({
      "currentTab":e.detail.value,
      offset:1,
      orderList:[]
    })
    this.loadOrderList()
  },
  /**
   * 加载订单列表
   */
  loadOrderList(){
    requestOrderList({
      status:this.data.currentTab
    },(res)=>{
      this.setData({
        orderList:res.data
      })
    },()=>{})
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
