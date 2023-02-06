const { post } = require("../../api/request")
import { requestUserData } from "../../api/forumApi";
import { requestUserInfo, requestUnBindUser } from "../../api/userApi"
import { showSuccess } from "../../utils/MessageUtil";

// pages/me/me.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shape: "circle",
    userinfo: {
      avatar: "https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/image/image-2.jpg",
    },
    userData: [
      {
        name: '获赞',
        value: '0'
      }, {
        name: "帖子",
        value: "0"
      }, {
        name: "关注",
        value: "0"
      }, {
        name: "收藏",
        value: "0"
      }
    ]

  },
  onIconTap() {
    wx.navigateTo({
      url: "/subpkg/pages/me/edit/editInformation"
    })
    console.log("edit");
  },

  /**
   * 导航到个人信息
   */
  navigateMyUserInfo() {
    wx.navigateTo({
      url: '/subpkg/pages/me/edit/editInformation',
    })
  },
  /**
   * 账号解绑
   */
  handleUnBind() {
    requestUnBindUser((res) => {
      getApp().globalData.tokenObj = {}
      wx.showToast({
        title: '解绑成功',
      })
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }, () => {

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 请求获取用户数据
   */
  loadUserData() {
    requestUserData((res) => {
      this.setData({
        userData: [
          {
            name: '获赞',
            value: res.data.greats
          }, {
            name: "帖子",
            value: res.data.creates
          }, {
            name: "关注",
            value: res.data.attentions
          }, {
            name: "收藏",
            value: res.data.favorites
          }
        ]

      })
    }, () => { })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 导航到关于
   */
  navigateAbout() {
    wx.navigateTo({
      url: `/pages/system/about/about`,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    requestUserInfo(res => {
      this.setData(
        {
          'userinfo': res.data,
        }
      )
    }, (err) => { console.log(err); })
    this.loadUserData()
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
