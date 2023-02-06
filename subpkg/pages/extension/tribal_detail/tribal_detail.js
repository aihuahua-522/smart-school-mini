import { requestActivityList, requestTeamDetail, requestApplyTeam } from "../../../../api/activityApi";
import Message from 'tdesign-miniprogram/message/index';
// subpkg/pages/extension/tribal_detail/tribal_detail.js
Page({

  /**
   * 页面的初始数据
   * 
   * 
   */
  data: {
    showWithInput: false,
    id: 0,
    userList: [],
    teamObj: {
      icon: '',
      teamName: '',
      teamDescription: '',
      createTime: '',
      // 0=未报名 1=审核中 2=已通过 3=失败
      joinFlag: 0
    },
    //初始为1 每次执行offset++
    offset: 1,
    activityList: [],
    reason: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    });
    this.queryDetailById()
    this.getActivityList()
  },

  /**
 * 展示申请部落弹框
 */
  showApplyTeamDialog() {
    this.setData({
      'showWithInput': true
    })
  },

  /**
   * 关闭弹框
   */
  closeDialog() {
    this.setData({
      'showWithInput': false
    })
  },

  /**
   * 监听输入框
   * @param {*} e 
   */
  changeReason(e) {
    this.setData({
      "reason": e.detail.value
    })
  },

  submitApplyTeam() {
    //提交表单
    requestApplyTeam(this.data.id, this.data.reason, (res) => {
      Message.success({
        context: this,
        offset: [20, 32],
        duration: 5000,
        icon: false,
        content: '申请成功',
      });
      this.closeDialog()
      this.queryDetailById()
    }, () => {

    })
  },


  goTribalDescribePage() {
    wx.navigateTo({
      url: `/subpkg/pages/extension/tribal_describe/tribal_describe?content=${this.data.teamObj.teamDescription}`,
    })
    console.log('跳转');
  },


  /**
   * 查询详情数据
   */
  queryDetailById() {
    requestTeamDetail(this.data.id, (res) => {
      this.setData({
        teamObj: res.data
      })
    }, () => {

    })
  },

  /**
   * 请求活动列表
   */
  getActivityList() {
    requestActivityList({ teamId: this.data.id, offset: this.data.offset++ }, (res) => {
      this.setData({
        'activityList': res.data
      })
    }, () => { })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("onShow");
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