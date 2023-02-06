const { requestLogin } = require("../../api/userApi");

//获取应用实例
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true
  },

  onLoad: function () {
    // 登录
    wx.login({
      success: res => {
        console.log(res.code);
        requestLogin(res.code, (res) => {
          if (res.data.access_token) {
            app.globalData.tokenObj = res.data
            app.getUserInfo()
            //回到首页
            // 只能跳转到tabBar配置页面
            wx.switchTab({
              url: '/pages/index/index',
            });
          }
        }, () => {
          console.log('错误');
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
      fail: err => {
        console.log(err);
      }
    })
  }
})
