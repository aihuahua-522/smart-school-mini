// pages/extension/extension_activity_detail/extension_activity_detail.js
import Message from 'tdesign-miniprogram/message/index';
const {
  requestActivityDetail,
  requestSwitchFavorite,
  requestMemberList,
  requestImgList,
  requestCommentList,
  requestScore,
  requestActivityStep,
  requestNewActivityNotice,
  requestApply
} = require("../../../../api/activityApi");
const dayjs = require("dayjs").default;
const relativeTime = require('dayjs/plugin/relativeTime').default
dayjs.extend(relativeTime)
var duration = require('dayjs/plugin/duration').default
dayjs.extend(duration)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //是否弹出输入密码框
    showPassDialog: false,
    //是否展示活动申请
    showSureActivityApply: false,
    //总步骤
    steps: [],
    //当前步骤
    currentStep: 0,
    id: 0,
    memberLists: [{
      realname: '花花'
    }],
    showTime: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    //分数
    scoreObj: {
      //评分
      'score': '',
      //好评;率
      'good': ''
    },

    //现场
    liveList: [],
    commentList: [{
      // realname: 'huahua ',
      // stars: 4,
      // created_at: '2022-01-10 12:00:00',
      // title: 'xxxx',
      // contents: '很棒',
    }],

    activityDetail: {
      //活动名称
      name: '',
      //学分
      credit: '',
      //人数
      places: 0,
      //已报名
      reportCount: 0,
      //已签到
      signInCount: 0,
      //已签退
      signOutCount: 0,
      //是否需要签退
      shouldSignOut: 0,
      //是否收藏
      favoriteFlag: 0,
      //是否报名
      reportFlag: 0,
      //报名时间
      applyTime: '',
      //活动时间
      activityTime: '',
      //活动分类
      activityTypeName: ''
    },
    //公告
    notice: {
      title: '暂无公告'
    },
    currentTab: 0
  },



  /**
   * 签到
   */
  signIn() {
    if (this.data.activityDetail.signType == 0) {
      //定位签到
      wx.navigateTo({
        url: `/subpkg/pages/extension/gps_sign/gps_sign?id=${this.data.id}`,
      })
    } else if (this.data.activityDetail.signType == 1) {
      //密码签到
      wx.navigateTo({
        url: `/subpkg/pages/extension/password_sign/password_sign?id=${this.data.id}`,
      })
    } else if (this.data.activityDetail.signType == 2) {
      //二维码签到
      wx.navigateTo({
        url: '/subpkg/pages/extension/show_qr_code/show_qr_code',
      })
    } else if (this.data.activityDetail.signType == 3) {
      //手势签到
      wx.navigateTo({
        url: `/subpkg/pages/extension/gesture_sign/gesture_sign?id=${this.data.id}`,
      })
    }
  },
  signOut() {
    if (this.data.activityDetail.signType == 0) {
      //定位签到
      wx.navigateTo({
        url: `/subpkg/pages/extension/gps_sign/gps_sign?id=${this.data.id}`,
      })
    } else if (this.data.signType == 1) {
      //密码签到
      wx.navigateTo({
        url: `/subpkg/pages/extension/password_sign/password_sign?id=${this.data.id}`,
      })
    } else if (this.data.signType == 2) {
      //二维码签到
      wx.navigateTo({
        url: '/subpkg/pages/extension/show_qr_code/show_qr_code',
      })
    } else if (this.data.signType == 3) {
      //手势签到
      wx.navigateTo({
        url: `/subpkg/pages/extension/gesture_sign/gesture_sign?id=${this.data.id}`,
      })
    }
  },
  /**
   * 管理员查看签到
   */
  adminSignIn() {
    if (this.data.activityDetail.signType == 0) {
      //定位签到 跳转地图
      wx.navigateTo({
        url: `/subpkg/pages/extension/map/map?id=${this.data.id}`,
      })
    } else if (this.data.activityDetail.signType == 1) {
      //密码签到
      wx.navigateTo({
        url: `/subpkg/pages/extension/password_sign/password_sign?id=${this.data.id}`,
      })
    } else if (this.data.activityDetail.signType == 2) {
      //二维码签到
      wx.navigateTo({
        url: '/subpkg/pages/extension/show_qr_code/show_qr_code',
      })
    } else if (this.data.activityDetail.signType == 3) {
      //手势签到
      wx.navigateTo({
        url: `/subpkg/pages/extension/gesture_sign/gesture_sign?id=${this.data.id}`,
      })
    }
  },
  /**
   * 跳转部落详情
   */
  goTribalDetailPage() {
    wx.navigateTo({
      url: `/subpkg/pages/extension/tribal_detail/tribal_detail?id=${this.data.activityDetail.createTeamId}`,
    })
  },


  /**
   * 跳转到公告详情
   */
  goNoticeDetail() {
    if (this.data.notice.id) {
      //有id才跳转
      wx.navigateTo({
        url: `/subpkg/pages/extension/extension_notice/extension_notice?id=${this.data.notice.id}`,
      })
    }

  },

  /**
   * 跳转到公告列表
   */
  goNoticeList() {
    wx.navigateTo({
      url: `/subpkg/pages/extension/extension_notice_list/extension_notice_list?id=${this.data.id}`,
    })
  },
  /**
   * 切换swiper
   */
  swichNav(event) {
    console.log(event.currentTarget.dataset.current);
    this.setData({
      currentTab: event.currentTarget.dataset.current
    })
  },

  //切换收藏
  switchFavorite() {
    const favoriteFlag = this.data.activityDetail.favoriteFlag == 0 ? true : false;
    requestSwitchFavorite(this.data.activityDetail.id, favoriteFlag, (res) => {
      this.setData({
        'activityDetail.favoriteFlag': res.data === true ? 1 : 0
      })
    }, () => { })
  },

  /**
   * 手动触发sswiper的切换
   */
  switchTab(event) {
    this.setData({
      currentTab: event.detail.current
    })
  },

  /**
   * 获取成员列表
   */
  getMemberList() {
    requestMemberList({
      id: this.data.id
    }, (res) => {
      this.setData({
        memberLists: res.data
      })
    }, () => { })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
    })
    this.loadActivityDetail()
  },

  /**
   * 加载活动   详情
   * @param {*} id
   */
  loadActivityDetail() {
    requestActivityDetail(this.data.id, (res) => {
      this.setData({
        activityDetail: res.data,
      })
      this.payTimer = setInterval(() => {
        this.showCountDown()
      }, 1000);


      this.getActivityStep()
      this.getNewNotice()
      this.getMemberList()
      this.getLiveImg()
      this.getCommentList()
      this.getScore()
    }, () => {

    })
  },

  /**
   * 展示倒计时
   */
  showCountDown() {
    // 0 说明待报名
    let duration;
    if (this.data.activityDetail.countDownFlag == 0) {
      duration = dayjs.duration(dayjs(this.data.activityDetail.applyStartTime) - dayjs());
    } else if (this.data.activityDetail.countDownFlag == 1) {
      duration = dayjs.duration(dayjs(this.data.activityDetail.activityStartTime) - dayjs());
    } else if (this.data.activityDetail.countDownFlag == 2) {
      duration = dayjs.duration(dayjs(this.data.activityDetail.activityEndTime) - dayjs());
    }

    if (duration) {
      let days = duration.days();
      let hours = duration.hours();

      let minutes = duration.minutes() % 60 < 10 ? '0' + (duration.minutes() % 60) : duration.minutes() % 60;

      let seconds = duration.seconds() % 60 < 10 ? '0' + (duration.seconds() % 60) : duration.seconds() % 60;

      if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(this.payTimer);
      } else {

        this.setData({
          showTime: {
            days,
            hours,
            minutes,
            seconds
          }
        });

      }
    } else {
      //关闭
      clearInterval(this.payTimer);
    }
  },

  /**
   * 报名按钮点击
   */
  showActivityApplyDialog() {
    this.setData({
      showSureActivityApply: true
    })
  },

  /**
   * 报名弹框点击确认
   */
  sureActivityApply() {
    console.log('点击');
    requestApply(this.data.id, (res) => {
      Message.success({
        context: this,
        offset: [20, 32],
        duration: 5000,
        icon: false,
        content: '申请成功',
      });
      this.closeSureActivityApplyDialog()
      this.loadActivityDetail()
    }, () => { })
  },

  /**
   * 关闭活动申请弹框
   */
  closeSureActivityApplyDialog() {
    this.setData({
      showSureActivityApply: false
    })
  },


  /**
   * 获取最新的通知
   */
  getNewNotice() {
    requestNewActivityNotice(this.data.id, (res) => {

      if (res.data) {
        this.setData({
          notice: res.data
        })
      }

    }, () => { })
  },
  /**
   * 获取现场图片
   */
  getLiveImg() {
    requestImgList(this.data.id, (res) => {
      this.setData({
        liveList: res.data
      })
    }, () => { })
  },


  /**
   * 获取评论列表
   */
  getCommentList() {
    requestCommentList(this.data.id, 1, 10, undefined, (res) => {
      this.setData({
        commentList: res.data
      })
    }, () => { })
  },

  /**
   * 获取活动步骤
   */
  getActivityStep() {
    requestActivityStep(this.data.id, (res) => {
      this.setData({
        currentStep: res.data.current,
        steps: res.data.steps,
      })

    }, () => { })
  },
  /**
   * 获取评价
   */
  getScore() {
    requestScore(this.data.id, (res) => {
      this.setData({
        scoreObj: res.data
      })
    }, () => { })
  },

  chooseImg() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res);
        console.log(res.tempFiles.tempFilePath)
        console.log(res.tempFiles.size)
      }
    })
  },

  /**
   * 查看评论
   * @param {} event
   */
  goLinkList(event) {

    wx.navigateTo({
      url: "/subpkg/pages/extension/comment/comment?id=" + this.data.id
    });

  },
  //跳转到评论界面
  checkedComment() {
    wx.navigateTo({
      url: "/subpkg/pages/extension/commentPush/commentPush?id=" + this.data.id
    });
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow() {
    this.loadActivityDetail()
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh() {
    this.loadActivityDetail()


  },


})
