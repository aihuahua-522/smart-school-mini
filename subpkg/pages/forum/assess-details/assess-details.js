// pages/forum/assess-details/assess-details.js
import {
  getListBbsComment,
  getSaveBbsComment,
  getRemoveBbsComment
} from '../../../../api/forumApi.js'
// 引用全局函数
var allFunction = require('../../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    assessList: [],
    backList: [],
    commentTotal: 0,
    bottomVal: 0,
    //动态id
    dynamicId: 0,
    content:''
  },
    // 获取输入框的值
    onPriceInput(e) {
      this.setData({
        content: e.detail.value
      })
      console.log(e.detail.value, 4646);
    },
    // 回复一级评论
    sendAssess() {
      if(this.data.content=='')return
      getSaveBbsComment({
        dynamicId: this.data.dynamicId,
        parentId: this.data.id,
        content: this.data.content
      }, (res) => {
        this.setData({
          content:''
        })
        this.getHttpData()
      }, (err) => {
        console.log(err);
      })
    },
  //删除评论 【一级评论】
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
            wx.navigateTo({
              url: '/pages/forum/forum-details/forum-details?id='+that.data.dynamicId
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

  //删除评论 【二级评论】
  binddeleteTwo: function (e) {
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

  // 处理评论点赞【一级评论】
  handleOneGreat(e) {
    let i = e.currentTarget.dataset.index
    if (this.data.assessList[i].greatFlag == 0) {
      let aa = this.data.assessList
      this.data.assessList[i].greats++
      this.data.assessList[i].greatFlag = 1
      console.log(this.data.assessList[i].greatFlag, 555555);
      this.setData({
        assessList: aa
      })
      wx.showToast({
        title: '点赞成功',
        icon: 'none'
      })
    } else {
      let bb = this.data.assessList
      this.data.assessList[i].greats--
      this.data.assessList[i].greatFlag = 0
      console.log(this.data.assessList[i].greatFlag, 666666);
      this.setData({
        assessList: bb
      })
      wx.showToast({
        title: '取消点赞',
        icon: 'none'
      })
    }
    // this.getHttpData()
  },
  // 处理评论点赞【二级评论】
  handleTwoGreat(e) {
    let i = e.currentTarget.dataset.index
    if (this.data.assessList[0].child[i].greatFlag == 0) {
      let aa = this.data.assessList
      this.data.assessList[0].child[i].greats++
      this.data.assessList[0].child[i].greatFlag = 1
      console.log(this.data.assessList[0].child[i].ancestorId, 555555);
      this.setData({
        assessList: aa
      })
      wx.showToast({
        title: '点赞成功',
        icon: 'none'
      })
    } else {
      let bb = this.data.assessList
      this.data.assessList[0].child[i].greats--
      this.data.assessList[0].child[i].ancestorId = 0
      console.log(this.data.assessList[0].child[i].ancestorId, 666666);
      this.setData({
        assessList: bb
      })
      wx.showToast({
        title: '取消点赞',
        icon: 'none'
      })
    }
    // this.getHttpData()
  },
  // 跳转个人主页
  goPersonalData() {
    wx.navigateTo({
      url: '/pages/forum/personal-data/personal-data'
    })
  },
  // 获取数据查询
  getHttpData() {

    // 根据评论id 获取二级评论数据
    getListBbsComment({
      miniFlag: 1,
      id: this.data.id
    }, (res) => {
      this.setData({
        assessList: res.data,
        commentTotal: res.data[0].child.length,
      });
    }, (err) => {
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.id = parseInt(options.id)
    this.data.dynamicId = parseInt(options.dynamicId)
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
    this.getHttpData()
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
