// subpkg/pages/me/edit/editInformation.js
import { systemFileUpload } from '../../../../api/systemApi'
import { getDict } from '../../../../api/dictApi'
import { changeUserInfo } from '../../../../api/userApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarPath: [],
    userData: {
    },
    tripleColumnsOptions: [
    ],
  },
  // 更改头像
  changeImg() {
    const that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        systemFileUpload(res.tempFiles[0].tempFilePath, value => {
          that.setData({
            "userData.avatar": value
          })
        })
      }
    })
  },
  // tag
  handleClose(e) {
    // 删除tag
    this.data.userData.tagNames.splice(e.currentTarget.dataset.index, 1)
    this.data.userData.tagIds.splice(e.currentTarget.dataset.index, 1)
    console.log(this.data.userData.tagNames);
    this.setData({
      "userData.tagNames": this.data.userData.tagNames,
      "userData.tagIds": this.data.userData.tagIds,
    })
    console.log(this.data.userData.tagIds);
  },
  // 更改tag
  confirmTag(e) {
    const that = this
    // 根据value拿到对应的lable
    for (const key in e.detail.value) {
      const flag = that.data.tripleColumnsOptions.find(item1 => item1.value == e.detail.value[key])
      // 判断有没有重复
      //  that.data.userData.tagNames.find(item => item == flag.label)
      if (!(that.data.userData.tagNames.find(item => item == flag.label))) {
        that.data.userData.tagNames.push(flag.label)
        that.data.userData.tagIds.push(flag.value)
        that.setData({
          'userData.tagNames': that.data.userData.tagNames,
          'userData.tagIds': that.data.userData.tagIds
        })
        console.log(that.data.userData.tagIds);
      }
    }
  },
  // 更改昵称
  changeNickname(e) {
    this.setData({
      "userData.nickname": e.detail.value
    })
  },
  // 更改个性签名
  changePersonSign(e) {
    this.setData({
      "userData.personSign": e.detail.value
    })
  },
  // 提交信息
  checkMsg() {
    const msgObj = {
      nickName: this.data.userData.nickname,
      personSign: this.data.userData.personSign,
      avatar: this.data.userData.avatar,
      tagIds: this.data.userData.tagIds,
    }
    changeUserInfo(msgObj, (res) => {
      // wx.showToast({ title: '信息修改成功', duration: 1000 })
      wx.navigateBack()
      console.log(res);
    }, () => {
      wx.showToast({ title: "信息修改失败！", duration: 1000, icon: 'none' })
    })
    console.log(msgObj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      "userData": JSON.parse(JSON.stringify(getApp().globalData.userInfo))
    })
    getDict("user_tag", (res) => {
      this.data.tripleColumnsOptions = res.data.map(item => {
        return {
          label: item.value,
          value: item.key,
          disabled: false
        }
      })
      this.setData({
        ['tripleColumnsOptions']: this.data.tripleColumnsOptions
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
