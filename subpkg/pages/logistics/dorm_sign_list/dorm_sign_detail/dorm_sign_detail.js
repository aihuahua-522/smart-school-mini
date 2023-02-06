// subpkg/pages/logistics/dorm_sign_list/dorm_sign_detail/dorm_sign_detail.js
import {getRoomDetailByRoomId, requestDormSignDetail} from "../../../../../api/logisticsApi";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    signData: [],
    //房间详情
    roomDetail:{},
    roomId:'',
    date:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const roomId = options.roomId
    const date = options.date
    this.setData({
      roomId,date
    })
    this.getSignList()
    this.loadRoomDetail()

  },

  /**
   * 加载房间信息数据
   */
  loadRoomDetail(){
    getRoomDetailByRoomId(this.data.roomId,(res)=>{
      this.setData({
        roomDetail:res.data
      })
    },()=>{})
  },

  /**
   * 获取签到列表
   */
  getSignList(){
    requestDormSignDetail(this.data.roomId, { offset: 1, pageSize: -1, date:this.data.date }, (res) => {
      this.setData({
        signData: res.data
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
