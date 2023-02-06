import {
  requestLogin,
  requestUserInfo
} from "./api/userApi";
import {
  getMessageListCommandBuild,
  imServer, onLineCommandBuild,
  requestToken
} from "./api/imApi";
// app.js

App({
  /**
   * 获取用户信息
   */
  getUserInfo() {
    const _this = this;
    requestUserInfo((res) => {
      console.log(_this);
      console.log(res.data);
      _this.globalData.userInfo = res.data
      console.log(_this.globalData);
      _this.connectIm()
    }, () => {
    })
  },

  /**
   * 初始化im服务
   */
  connectIm() {
    this.initWs()

  },

  initWs() {
    const _this = this

    //连接websocket
    let socket = wx.connectSocket({
      url: imServer,
      success: (res) => {
        console.log(res, "连接成功")

      }
    })
    this.globalData.socket = socket
    // this.globalData

    //事件监听
    socket.onOpen(function () {
      console.info('连接打开成功');
      //开始执行上线事件
      requestToken((tokenRes) => {
        console.log(tokenRes.data);
        socket.send({
          data: onLineCommandBuild(tokenRes.data),
          success: sendRes => {
            console.info('客户端发送成功');
            //开始获取最新数据
            socket.send({
              data: getMessageListCommandBuild()
            })
          }
        });
      }, () => {
      })
    });
    socket.onClose(function () {
      console.info('连接关闭成功');
    });
    socket.onError(function () {
      console.info('连接报错');
    });
    //服务器发送监听
    socket.onMessage(function (e) {
      console.info(e);
      const data = e.data;
      _this.globalData.result = data
    });
    // wx.onSocketClose(function (res) {
    //   //重新初始化ws
    //   _this.initWs()
    // })
  },
  //小程序实现监听
  watchMethods: {},
  watch(param) {
    const that = this
    const obj = this.globalData
    for (let key in param) {
      if (!this.watchMethods[key]) {
        this.watchMethods[key] = []
      }
      const method = param[key]
      this.watchMethods[key].push(method)
      Object.defineProperty(obj, key, {
        set(val) {
          const methods = that.watchMethods[key]
          methods.map(item => item(val))
        }
      })
    }
  },

  onLaunch() {
    const _this = this;

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 清除缓存
    wx.removeStorageSync('logs', logs);




  },
  /**
   * 获取姓名
   */
  getName() {
    this.globalData.userInfo.name
  },
  /**
   * 获取用户id
   */
  getId() {
    return this.globalData.userInfo.id
  },
  /**
   * 获取用户id
   */
  getAvatar() {
    return this.globalData.userInfo.avatar
  },
  getRoleCode() {
    return this.globalData.userInfo.roleCodes
  },
  globalData: {
    userInfo: {
      id: 1,
      avatar: 'http://nacos.jxwazx.cn/nacos/img/logo-2000-390.svg',
      name: '花花',
      nickName: '花花',
      roleCodes: ['ROLE_LOGISTICS_STAFF']
    },
    tokenObj: {},
    result: '',
    //socket通道
    socket: {}
  }
})
