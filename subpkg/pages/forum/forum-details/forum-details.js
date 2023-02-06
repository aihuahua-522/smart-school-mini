// pages/forum/forum-details/forum-details.js
import {
  getBbsDynamic,
  getListBbsComment,
  getSaveBbsComment,
  getRemoveBbsComment,
  getRemoveBbsDynamic,
  switchGreat, requestSwitchFavorite, requestUserAttention
} from '../../../../api/forumApi.js'
// 引用全局函数
var allFunction = require('../../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adjust: false,
    time: 100,
    imgList: 6,
    visible: false,
    isShow: true,
    dynamicDetailsList: [],
    bbsCommentList: [],
    saveBbsCommentList: [],
    commentTotal: 0,
    backNum: 0,
    bottomVal: 0,
    content: '',
    dynamicId: 0,
    parentId: 0,
    avatarPath: []
  },

  //删除动态
  bindDeleteForum: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除动态吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定123123')
          // 获取要删除数据的id
          var dataid = e.currentTarget.dataset.index;
          console.log(dataid, e)
          getRemoveBbsDynamic(dataid, (res) => {
            wx.showToast({
              title: '删除成功',
              icon: 'none'
            })
            wx.switchTab({
              url: '/pages/forum/forum',
            })
          }, (err) => {
            console.log(err);
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //预览图片
  previewAvatarImage(e) {
    var i = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.avatarPath[i],
      // urls数组里的元素要是纯图片地址
      urls: this.data.avatarPath
    });
  },
  // 获取输入框的值
  onPriceInput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 给帖子 发送评论
  sendAssess() {
    if (this.data.content == '') return
    getSaveBbsComment({
      dynamicId: this.data.dynamicId,
      content: this.data.content
    }, (res) => {
      this.setData({
        content: ''
      });
      this.getHttpData()
    }, (err) => {
      console.log(err);
    })
  },
  //删除评论
  binddelete: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认撤回吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // 获取要删除数据的id
          var dataid = e.currentTarget.dataset.index;
          console.log(dataid, e)
          getRemoveBbsComment(dataid, (res) => {
            that.getHttpData()
            wx.showToast({
              title: '撤回成功',
              icon: 'none'
            })
          }, (err) => {
            console.log(err);
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },




  /**
   * 收藏点击
   */
  handleFavorite(){
    let dynamicId = this.data.dynamicDetailsList.id
    requestSwitchFavorite(dynamicId, (res) => {
      if (res.data) {
        this.data.dynamicDetailsList.favoriteFlag = 1
        this.data.dynamicDetailsList.favorites = this.data.dynamicDetailsList.favorites+1
        //收藏成功
        this.setData({
          "dynamicDetailsList":this.data.dynamicDetailsList
        })
        wx.showToast({
          title: '收藏成功',
          icon: 'none'
        })
      }else{
        this.data.dynamicDetailsList.favoriteFlag = 0
        this.data.dynamicDetailsList.favorites = this.data.dynamicDetailsList.favorites-1
        //取消收藏
        this.setData({
          "dynamicDetailsList":this.data.dynamicDetailsList
        })
        wx.showToast({
          title: '取消收藏',
          icon: 'none'
        })
      }
    }, () => {
    })
  },
  // 处理关注
  handleAssess(e) {
    let userId = e.currentTarget.dataset.id
    requestUserAttention(userId,(res)=>{
      if (res.data){
        this.data.dynamicDetailsList.essence = 1
        this.setData({
          dynamicDetailsList: this.data.dynamicDetailsList
        })
        wx.showToast({
          title: '关注成功',
          icon: 'none'
        })
      }else{
        this.data.dynamicDetailsList.essence = 0
        this.setData({
          dynamicDetailsList: this.data.dynamicDetailsList
        })
        wx.showToast({
          title: '取消关注',
          icon: 'none'
        })
      }

    },()=>{})



  },


  // 用户点击右上角分享
  onShareAppMessage() {
    // return {
    //   title: '换新装，迎国庆~@所有中国人',
    //   imageUrl: '/image/tutu.jpg',
    //   path: '/pages/forum/forum-details/forum-details?id=' + this.data.dynamicId,
    // }
  },
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: this.data.dynamicDetailsList.content,
      imageUrl: '/image/tutu.jpg',
      path: '/pages/forum/forum-details/forum-details?id=' + this.data.dynamicId,
    }
  },
  // 处理动态点赞
  handleGreat() {
    switchGreat(this.data.dynamicDetailsList.id, (res) => {
      if (res.data == true) {
        let aa = this.data.dynamicDetailsList
        this.data.dynamicDetailsList.greats++
        this.data.dynamicDetailsList.greatFlag = 1
        //追加头像
        this.data.dynamicDetailsList.avatars.push(getApp().getAvatar())
        this.setData({
          dynamicDetailsList: aa
        })
        wx.showToast({
          title: '点赞成功',
          icon: 'none'
        })
      } else {
        let bb = this.data.dynamicDetailsList
        this.data.dynamicDetailsList.greats--
        this.data.dynamicDetailsList.greatFlag = 0
        this.setData({
          dynamicDetailsList: bb
        })
        wx.showToast({
          title: '取消点赞',
          icon: 'none'
        })
        let avatars = this.data.dynamicDetailsList.avatars.filter(function (item) {
          return item != getApp().getAvatar()
        });
        this.setData({
          "dynamicDetailsList.avatars": avatars
        })
      }
    }, () => {
    })
  },

  // 发布时间处理
  timeAgo(e) {
    const dayjs = require('dayjs').default
    dayjs().format()
    let date1 = dayjs()
    let date2 = dayjs(e)
    let t = date1.diff(date2) / 1000
    // console.log(t,'123');
    let i = 60
    let h = i * 60
    let d = h * 24
    let m = d * 30
    let y = m * 12
    const mp = new Map([
      [n => n < i, n => (n >> 0) + '秒'],
      [n => n < h, n => (n / i >> 0) + '分钟'],
      [n => n < d, n => (n / h >> 0) + '小时'],
      [n => n < m, n => (n / d >> 0) + '天'],
      [n => n < y, n => (n / m >> 0) + '月'],
      [n => true, n => (n / y >> 0) + '年'],
    ])
    return ([...mp].find(([n]) => n(t)).pop())(t) + '前'
  },
  // 分享弹出弹出层
  handlePopup() {
    this.setData({
      visible: true,
    });
  },
  // 取消关闭弹出层
  cancelHandle() {
    this.setData({
      visible: false,
    });
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },
  // 获取焦点操作
  focusChange(e) {
    this.setData({
      isShow: false
    });
  },
  // 失去焦点操作
  blurChange() {
    if (this.data.content == '') {
      this.setData({
        isShow: true
      });
    }
  },

  // 跳转个人主页
  goPersonalData() {
    allFunction.goPersonalData()
  },

  // 跳转点赞详情
  goGood() {
    wx.navigateTo({
      url: '/pages/forum/good/good',
    })
  },
  // 获取数据查询
  getHttpData() {
    // 新增评论刷新页面执行失去焦点切换输入框右侧操作栏
    this.blurChange()
    // 获取上半部分动态数据
    getBbsDynamic({
      miniFlag: 1,
      id: this.data.dynamicId
    }, (res) => {
      // 处理发布时间
      res.data.map(item => {
        return item.createTime = this.timeAgo(item.createTime)
      })
      var arr = res.data[0].photos.map(item => {
        return item.url
      })
      this.setData({
        dynamicDetailsList: res.data[0],
        avatarPath: arr
      });
      wx.stopPullDownRefresh();
    }, (err) => {
      console.log(err);
    })

    // 根据动态id 获取下半部分评论数据
    getListBbsComment({
      miniFlag: 1,
      dynamicId: this.data.dynamicId
    }, (res) => {
      // 处理发布时间
      // res.data.map(item => {
      //   return item.createTime = this.timeAgo(item.createTime)
      // })
      this.setData({
        bbsCommentList: res.data,
        commentTotal: res.total,
      });
    }, (err) => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.dynamicId = parseInt(options.id)
    // 处理点赞头像折叠
    if (this.data.imgList > 10) {
      this.setData({
        imgList: 10
      })
    }
    this.onShareAppMessage()
    this.onShareTimeline()
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
    this.getHttpData()
    // 监听键盘高度
    wx.onKeyboardHeightChange(res => {
      this.setData({
        bottomVal: res.height
      })
      // wx.showToast({
      //   title: this.data.bottomVal.toString()
      // })
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
    this.getHttpData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  }
})
