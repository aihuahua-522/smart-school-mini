// subpkg/pages/repair-list/repair-detail/repair-detail.js
import { requestGetRepairList, requestOrderOver, requestTaskOrder } from '../../../../api/logisticsApi'
import { logisticsStatusKey, getDict } from '../../../../api/dictApi'
import { ROLE_LOGISTICS_STAFF } from "../../../../constant/roleConstant";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否展示弹框确认
    showConfirm: false,
    //是否展示确认上门时间
    datetimeVisible: false,
    //默认不是维修师傅
    staffRole: 0,
    //是不是自己的订单
    selfFlag: 0,
    query: {
      offset: 1,
      pageSize: 1,
      id: null
    },
    repairDetail: {},
    //报修类型
    repairType: [],
    //结果
    result: ''
  },
  //预览图片
  previewAvatarImage(e) {
    var i = e.currentTarget.dataset.index
    wx.previewImage({
      current: i,
      urls: this.data.avatarPath
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      'query.id': options.id
    })
    this.getRepairDetail()
    console.log(app.globalData.userInfo.roleCodes)
    console.log(ROLE_LOGISTICS_STAFF)
    this.setData({
      "staffRole": app.globalData.userInfo.roleCodes.find((value, index) => value == ROLE_LOGISTICS_STAFF) ? 1 : 0,
    })
    console.log('this.data.staffRole', this.data.staffRole)
  },
  getRepairDetail() {
    getDict(logisticsStatusKey, (r) => {
      this.data.repairType = r.data
      this.loadOrderDetail()
    }, () => { })

  },
  /**
   * 加载工单信息
   */
  loadOrderDetail() {
    requestGetRepairList(this.data.query, (res) => {
      res.data.forEach(item => {
        item.repairImage = item.repairImage.split(',')
        item.type = this.dict(this.data.repairType, item.repairType)
      })

      this.setData({
        repairDetail: res.data[0],
        avatarPath: res.data[0].repairImage,
        "selfFlag": app.globalData.userInfo.id == res.data.id
      })

      console.log();
      console.log(res, this.data.repairDetail);
    }, () => { })
  },

  /**
   * 确认上门时间
   */
  sureTime() {
    console.log(this.data.staffRole)
    this.setData({
      datetimeVisible: true
    })
  },
  dict(arr, value) {
    return arr.find((item) => {
      return item.key === value
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
    this.loadOrderDetail()
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

  },

  hidePicker() {
    this.setData({
      datetimeVisible: false
    })
  },

  /**
   * 时间选中 提交上门时间
   * @param e
   */
  onConfirm(e) {
    const { value } = e?.detail;
    const { mode } = this.data;

    requestTaskOrder({ id: this.data.query.id, callTime: value }, (res) => {
      this.hidePicker();
      this.loadOrderDetail()
    }, () => { })

  },

  /**
   * 展示完工确认弹框
   */
  showOrderOver() {
    this.setData({
      showConfirm: true
    })

  },

  /**
 * 展示完工确认弹框
 */
  hideOrderOver() {
    this.setData({
      showConfirm: false
    })
  },

  /**
   * 弹框确认
   */
  orderOverDialogConfirm() {
    requestOrderOver({ id: this.data.query.id, result: this.data.result }, (res) => {
      this.hideOrderOver()
      this.loadOrderDetail()
    }, () => { })
  },

  /**
   * 内容修改
   * @param e
   */
  changeResult(e) {
    this.data.result = e.detail.value
  },

  /**
   * 去评论按钮点击
   */
  toComment() {
    wx.navigateTo({
      url: `/subpkg/pages/logistics/repairComment/repairComment?id=${this.data.query.id}`,
    })
  }

})
