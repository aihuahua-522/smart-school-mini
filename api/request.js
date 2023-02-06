const baseUrl = "https://smart-api.jxwazx.cn"
import Message from 'tdesign-miniprogram/message/index';

// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, method, params, message, success, fail = () => {
}) {
  console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  const app = getApp()
  console.log(app);
  wx.request({
    url: baseUrl + url,
    data: params,
    header: {
      'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + app.globalData.tokenObj.access_token
     // 'Authorization': 'Bearer ' + 'smart-mini-program-module::1922909::1d100c85-b6df-4d8a-8156-ee034799a034'
    },
    method: method,
    success: function (res) {
      console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {

        if (res.data.code === 200) {
          success(res.data)
        } else {
          if (res.data.code === 401) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
          //账号未绑定
          if (res.data.code === -3009) {
            wx.navigateTo({
              url: '/pages/wx_login/wx_login',
            })
          }
          console.log('进入错误回调');
          Message.error({
            context: this,
            offset: [20, 32],
            duration: 5000,
            icon: false,
            content: res.data.message,
          });
          fail()
        }
      } else {
        console.log(res)
        Message.error({
          context: this,
          offset: [20, 32],
          duration: 5000,
          icon: false,
          content: "网络连接错误",
        });
        fail()
      }

    },
    fail: function (res) {
      console.log("错误回到")
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      Message.error({
        context: this,
        offset: [20, 32],
        duration: 5000,
        icon: false,
        content: res,
      });
      fail()
    },
    complete: function (res) {

    },
  })
}

/**
 * 请求
 * @param {*} url
 * @param {*} params
 * @param {*} success
 * @param {*} fail
 */
function post(url, params, success, fail) {
  requestLoading(url, 'post', params, "加载中", success, fail)
}

/**
 * 请求
 * @param {*} url
 * @param {*} params
 * @param {*} success
 * @param {*} fail
 */
function put(url, params, success, fail) {
  requestLoading(url, 'put', params, "加载中", success, fail)
}


/**
 * 请求
 * @param {*} url
 * @param {*} params
 * @param {*} success
 * @param {*} fail
 */
function deleteHttp(url, params, success, fail) {
  requestLoading(url, 'delete', params, "加载中", success, fail)
}

/**
 * 请求
 * @param {*} url
 * @param {*} params
 * @param {*} success
 * @param {*} fail
 */
function get(url, params, success, fail) {
  requestLoading(url, 'get', params, "加载中", success, fail)
}


module.exports = {
  post, get, deleteHttp, put
}

