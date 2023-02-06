// pages/message.js


import {
  getMessageListCommandBuild,
  selectMessageListCommandType,
  sendMessageCommandType
} from '../../api/imApi'
import Da from "../../miniprogram_npm/dayjs/locale/da";

const app = getApp()
Page({
  clickItem(e) {
    console.log(e);
    wx.navigateTo({
      url: `/subpkg/pages/im/messageDetail/messageDetail?id=${e.currentTarget.dataset.objectuserid}`,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    messageList: [],
    result: '',
    baseRefresh: {
      value: false,
    },
    loadingProps: {
      size: '50rpx',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.watch()

  },
  watch() {
    app.watch({
      result: (val) => {
        const response = JSON.parse(val)
        if (response.commandType === selectMessageListCommandType) {
          //查询所有消息
          const messageList = response.list
          //无需排序 后端排好了
          this.setData({
            "messageList": messageList
          })
        }
        if (response.commandType === sendMessageCommandType) {
          //单个消息
          const messageObj = response.message
          //收到消息
          const messageList = this.data.messageList;
          const index = messageList.findIndex(
            value => value.objectUserId === messageObj.objectUserId)
          if (index !== -1) {
            //如果存在 先替换 然后排序
            messageList[index] = messageObj
          } else {
            //不存在 直接添加
            messageList.push(messageObj)
          }
          //重排序
          messageList.sort(
            (a, b) => new Date(b.newestTime).getTime() - new Date(
              a.newestTime).getTime());
          this.setData({
            "messageList": messageList
          })
        }

        console.log("监听事件触发", val)
        this.setData({
          "result": val
        })
      }
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
    app.globalData.socket.send({
      data: getMessageListCommandBuild()
    })
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
    app.globalData.socket.send({
      data: getMessageListCommandBuild()
    })
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