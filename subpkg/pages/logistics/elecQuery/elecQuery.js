import { requestRoomTree, getBalance, getMyDorm, getRoomDetailByRoomId, requestCreatePay, requestGetPowerByRoomId } from '../../../../api/logisticsApi'
import { showSuccess } from '../../../../utils/MessageUtil';
// pages/elecQuery/elecQuery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eleNum: [10, 20, 30, 50, 100, 150, 200],
    // 剩余电量
    residueEle: 0,
    //实时功率
    power: "0",
    // 按钮高亮
    activeIndex: null,
    // 选择房间
    visibleRoom: false,
    // 房间id
    roomId: null,
    // 充值数字
    checkNum: 0,
    options: [],
    note: ''
  },

  // 充值
  tapSubmit() {
    const num = parseInt(this.data.checkNum)
    if (num <= 0) {
      console.log("充值的数额过小");
      return
    }
    requestCreatePay(this.data.roomId, num, (res) => {
      showSuccess('充值成功')
      this.loadBalance()
      this.loadPower()
    })
  },
  // 选择充值数字
  selectNum(e) {
    console.log(e.currentTarget.dataset);
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      checkNum: e.currentTarget.dataset.value,
    })
    // console.log(this.data.activeIndex);
  },
  // input获得焦点
  bindfocusEvent() {
    this.setData({
      activeIndex: -1
    })
  }, // input失去焦点
  bindblurNum(e) {
    this.setData({
      checkNum: e.detail.value
    })
  },
  // 选择房间号
  selectRoom() {
    this.setData({
      visibleRoom: true
    })
  },
  showCascader() {
    this.setData({ visibleRoom: true });
  },
  onChange(e) {
    // 选择完成后展示的房间号
    const { selectedOptions } = e.detail;
    console.log(e);
    this.setData({
      note: selectedOptions.map((item) => item.label).join('/'),
      roomId: e.detail.value
    });
    this.loadBalance()
    this.loadPower()
  },

  /**
   * 加载电量
   */
  loadBalance() {
    // 更新电量信息
    getBalance(this.data.roomId, (res) => {
      this.setData({
        residueEle: String(res.data)
      });
    }, (err) => { console.log(err); })
  },

  loadPower() {
    requestGetPowerByRoomId(this.data.roomId, (res) => {
      this.setData({
        power: String(res.data)
      });
    }, (err) => { console.log(err); })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取房间号
    requestRoomTree((res) => {
      this.setData({
        options: res.data
      });
    }, () => { console.log("网络请求错误！"); })
    // 获取电量余额
    getMyDorm((res) => {
      this.setData({
        roomId: res.data.roomId
      })
      //加载宿舍详情
      if (this.data.roomId) {
        getRoomDetailByRoomId(this.data.roomId, (res) => {
          this.setData({
            note: res.data.completeName
          })
        }, () => { })
      }
      this.loadBalance()
      this.loadPower()
    }, (err) => { console.log(err); })
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
