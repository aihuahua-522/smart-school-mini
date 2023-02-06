// pages/message/messageDetail/messageDeatil.js
import {
  getMessageDetailCommandBuild, receiveMessageCommandTypeBuild,
  receiveMessageDetailCommandType,
  selectOneUserDetailCommandType,
  sendMessageAckCommandType,
  sendMessageCommandBuild
} from "../../../../api/imApi";
import { showError } from "../../../../utils/MessageUtil";

const dayjs = require("dayjs").default;

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //对象用户id
    userId: 0,
    value: '',
    //消息列表
    timeGroupList: [],
    //输入消息
    inputMessage: '',
    //scroll-view的进度
    bottom: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userId: options.id
    })
    //发送获取详情界面
    this.sendCommand({
      data: getMessageDetailCommandBuild(this.data.userId)
    })
    this.watch()
  },

  /**
   * 触发输入框事件
   * @param e
   */
  inputMessage(e) {
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },

  /**
   * 拼接小程序列表
   * @param now
   * @param messageList
   * @param message
   */
  fillMessageList(now, messageList, message) {
    //已有消息列表
    const dataList = this.data.timeGroupList

    if (dataList && dataList.length) {
      //如果不是第一次聊天 判断时间间隔
      if (now - new Date(dataList[dataList.length - 1].time) > 5 * 60 * 1000) {
        //如果大于五分钟 拼接在最外围
        dataList.push(messageList)
      } else {
        //小于五分钟 拼接最后一个的最后一条
        dataList[dataList.length - 1].messageList.push(message)
      }
    } else {
      //第一次聊天 直接拼接上去
      dataList.push(messageList)
    }
    this.setData({
      timeGroupList: dataList
    })
  },

  /**
   * 发送消息
   */
  sendMessage() {
    if (!this.data.value) {
      showError('请输入消息')
      return
    }
    //消息内容
    const content = this.data.value;
    this.setData({
      value: ''
    })
    //时间
    const now = new Date();
    //响应key
    const ackKey = this.guid()
    //消息
    const message = this.generatorSendMessage(content, now, ackKey)
    //消息列表
    const messageList = this.generatorSendMessageList(content, now, ackKey);
    //拼接本地消息
    this.fillMessageList(now, messageList, message);
    //刷新
    this.sendCommand({
      data: sendMessageCommandBuild(content, this.data.userId, ackKey)
    })
    this.pageScrollToBottom()

  },

  /**
   * 发送消息
   * @param command
   */
  sendCommand(command) {
    app.globalData.socket.send(command)
  },

  /**
   * 用于生成消息
   */
  generatorSendMessage(content, now, ackKey) {
    return {
      avatar: app.globalData.userInfo.avatar,
      //发送中
      status: -1,
      createTime: dayjs(now).format('YYYY-MM-DD HH:mm:ss'),
      nickName: app.globalData.userInfo.nickName,
      content,
      createBy: app.globalData.userInfo.id,
      ackKey
    }
  },
  /**
   * 生成消息列表
   * @param content
   * @param now
   * @returns {{messageList: {createBy: number, createTime, nickName: string, avatar: string, content, status: number}[], time}}
   */
  generatorSendMessageList(content, now, ackKey) {
    return {
      time: dayjs(now).format('YYYY-MM-DD HH:mm:ss'),
      messageList: [
        this.generatorSendMessage(content, now, ackKey)
      ]
    }
  },
  /**
   * 处理查询欧用户详情聊天记录
   * @param response
   */
  handleSelectOneUserDetailCommandType(response) {
    //消息详情
    const messageTempList = response.timeGroup
    this.setData({
      timeGroupList: messageTempList
    })
    //重置为已读
    this.resetNotReadFlag()
    //底部
    this.pageScrollToBottom()
  },

  /**
   * 在详情界面收到消息
   * @param response
   */
  handleReceiveMessageDetailCommandType(response) {
    //消息详情
    const message = response.message
    const content = response.content
    const ackKey = response.ackKey
    const now = response.now
    //消息列表
    const messageList = this.generatorSendMessageList(content, now, ackKey);
    //拼接本地消息
    this.fillMessageList(now, messageList, message);

    //重置为已读
    this.resetNotReadFlag()
    //底部
    this.pageScrollToBottom()
  },
  /**
   * 处理ack机制回调
   * @param response
   */
  handleSendMessageAckCommandType(response) {
    //消息详情
    const timeGroup = this.data.timeGroupList
    //ack机制的key
    const ackKey = response.ackKey
    timeGroup.forEach(group => {
      group.messageList.forEach(message => {
        if (message.ackKey && message.ackKey === ackKey) {
          //修改状态
          message.status = 0
        }
      })
    })
    this.setData({
      timeGroupList: timeGroup
    })
    //底部
    this.pageScrollToBottom()

  },

  /**
   * 将所有消息重置为已读
   */
  resetNotReadFlag() {
    this.sendCommand({
      data: receiveMessageCommandTypeBuild(this.data.userId)
    })
  },
  /**
   * 底部
   */
  pageScrollToBottom() {
    this.setData({ bottom: 'scrollBottom' })
    // wx.createSelectorQuery().select('#message_scroll').boundingClientRect(function (rect) {
    //     // 使页面滚动到底部
    //     wx.pageScrollTo({
    //         scrollTop: rect.bottom
    //     })
    // }).exec()
  },

  /**
   * 监听socket消息
   */
  watch() {
    app.watch({
      result: (val) => {
        const response = JSON.parse(val)
        if (response.commandType === selectOneUserDetailCommandType) {
          //查询一个用户的详情记录
          this.handleSelectOneUserDetailCommandType(response);
        } else if (response.commandType === sendMessageAckCommandType) {
          //发送消息的ack机制
          this.handleSendMessageAckCommandType(response)
        } else if (response.commandType === receiveMessageDetailCommandType) {
          //在消息详情收到消息
          this.handleReceiveMessageDetailCommandType(response);
        }
      }
    });
  },

  /**
   * 生成uuid
   * @returns {string}
   */
  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
      function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
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

