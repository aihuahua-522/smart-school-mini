// subpkg/pages/extension/customAdd/customAdd.js
import { activityFileUpload, requestAddCustom } from '../../../../api/activityApi'
const { getDict, activityTpeKey, dictConvert, activityStatusKey } = require("../../../../api/dictApi");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    activityTypeList: [],
    avatarPath: [],
    pickerTitle: '活动类型',
    CurrentValue: '',
    typeValue: '',
    credit: '',
    activityName: '',
    imageList: [],
    Visible: false,
    activityAddress: ''

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
    //添加图片
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log(this.data.avatarPath, '1');
        // 判断新增后的数组图片是否超过9张
        if (this.data.avatarPath.length + res.tempFilePaths.length <= 9) {
          let imgList = this.data.avatarPath;
          // 遍历新增图片到数组中
          res.tempFilePaths.forEach((item) => {
            activityFileUpload(item, (url) => {
              imgList.push(url)
              // 最新数组
              this.setData({
                avatarPath: imgList
              })
            }, () => { })
          })
        } else {
          wx.showToast({
            title: '最多选九张哦~~',
            icon: 'none'
          })
          return
        }
      }
    });
  },
  submit() {
    this.setData({
      imageList: this.data.avatarPath.map(item => {
        return { url: item }
      })
    })
    const data = {
      activityAddress: this.data.activityAddress,
      activityName: this.data.activityName,
      activityType: this.data.typeValue,
      credit: this.data.credit,
      imageList: this.data.imageList
    }
    requestAddCustom(data, (res) => {
      if (res.code == 200) {
        wx.showToast({
          title: '提交成功'
        })
        wx.navigateBack()
        this.setData({
          activityAddress: '',
          activityName: '',
          CurrentValue: '',
          credit: '',
          imageList: '',
          avatarPath: []
        })
      }

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getActivityType()
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
