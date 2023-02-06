// subpkg/pages/extension/customAdd/customAdd.js
import { requestAddCustom, requestActivityCustomDetail } from '../../../../api/activityApi'
const { getDict, activityTpeKey, dictConvert, activityStatusKey } = require("../../../../api/dictApi");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomDetail: {},
    activityTypeList: [],
    avatarPath: [],
    pickerTitle: '活动类型',
    CurrentValue: '',
    typeValue: '',
    credit: '',
    activityName: '',
    extensionCustomActivityFileList: '',
    Visible: false,
    activityAddress: '',
    imageList:[]

  },
  getActivityType() {
    getDict(activityTpeKey, (res) => {
      this.setData({
        'activityTypeList': res.data.map(item => {
          return {
            label: item.value,
            value: item.key,
          }
        })
      })
    }, () => { })
  },
  onClickPicker() {
    this.setData({
      Visible: true
    })
  },
  onPickerChange(e) {
    console.log(e);
    this.setData({
      CurrentValue: e.detail.label[0],
      typeValue: e.detail.value[0]
    })
  },
  onPickerCancel() {
    this.setData({
      Visible: false
    })
  },
  inputChange: function (e) {
    this.setData({
      [e.target.dataset.id]: e.detail.value
    })
  },
  goChooseImg() {
    // 判断图片是否超过9张
    if (this.data.avatarPath.length >= 9) {
      wx.showToast({
        title: '最多选九张哦~~',
        icon: 'none'
      })
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getActivityType()
    requestActivityCustomDetail(options.activityId, (res) => {
      let ss = this.data.activityTypeList.find(item => {
        return res.data.activityType == item.value
      })
      this.setData({
        CurrentValue: ss?.label,
        activityName: res.data.activityName,
        activityAddress: res.data.activityAddress,
        credit: res.data.credit,
        imageList:res.data.imageList
      })

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
