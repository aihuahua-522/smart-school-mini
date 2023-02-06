// pages/forum/details/details.js
import {
  getBbsTopic,
  getBbsDynamic,
  getRemoveBbsDynamic
} from '../../../../api/forumApi.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bbsTopicList: [],
    topicId: 1,
    bbsDynamicList: [],
    offset: 1,
    pageSize: 5,
    isCheck: false,
    isEnd: false
  },
  //删除动态
  binddelete: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除动态吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // 获取要删除数据的id
          var dataid = e.currentTarget.dataset.index;
          console.log(dataid, e)
          getRemoveBbsDynamic(dataid, (res) => {
            that.getHttpData()
            wx.showToast({
              title: '删除成功',
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
  // 处理点赞
  handleGreat(e) {
    let i = e.currentTarget.dataset.index
    if (this.data.bbsDynamicList[i].attentionFlag == 0) {
      let aa = this.data.bbsDynamicList
      this.data.bbsDynamicList[i].greats++
      this.data.bbsDynamicList[i].attentionFlag = 1
      this.setData({
        bbsDynamicList: aa
      })
      wx.showToast({
        title: '点赞成功',
        icon: 'none'
      })
    } else {
      let bb = this.data.bbsDynamicList
      this.data.bbsDynamicList[i].greats--
      this.data.bbsDynamicList[i].attentionFlag = 0
      this.setData({
        bbsDynamicList: bb
      })
      wx.showToast({
        title: '取消点赞',
        icon: 'none'
      })
    }
  },
  // 处理关注
  handleAssess(e) {
    let i = e.currentTarget.dataset.index
    if (this.data.bbsDynamicList[i].essence == 0) {
      let aa = this.data.bbsDynamicList
      this.data.bbsDynamicList[i].essence = 1
      this.setData({
        bbsDynamicList: aa
      })
      wx.showToast({
        title: '关注成功',
        icon: 'none'
      })
    } else {
      let bb = this.data.bbsDynamicList
      this.data.bbsDynamicList[i].essence = 0
      this.setData({
        bbsDynamicList: bb
      })
      wx.showToast({
        title: '取消关注',
        icon: 'none'
      })
    }


  },
  // 发布时间处理
  timeAgo(e) {
    const dayjs = require('dayjs').default

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
  // 跳转发帖
  goPost(e) {
    let name = e.currentTarget.dataset.index[0]
    let id = e.currentTarget.dataset.index[1]
    wx.navigateTo({
      url: '/subpkg/pages/forum/post/post?name=' + name + '&id=' + id
    })
  },
  // 跳转个人主页
  goPersonalData() {
    wx.navigateTo({
      url: '/subpkg/pages/common/personal-data/personal-data',
    })
  },
  // 跳转动态详情
  goForumDetails(e) {
    let i = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/subpkg/pages/forum/forum-details/forum-details?id=' + i,
    })
  },

  // 获取数据查询
  getHttpData() {
    // 话题数据
    getBbsTopic({
      id: this.data.topicId
    }, (res) => {
      this.setData({
        bbsTopicList: res.data
      });
      wx.stopPullDownRefresh();
    }, (err) => {
      console.log(err);
    })

    // 上拉加载更多处理【获取动态数据】
    this.httpOfficeDocument(true)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.topicId = parseInt(options.id)
    this.getHttpData()
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
    this.getHttpData();
  },

  // 加载更多处理
  httpOfficeDocument(status) {
    this.data.offset = status ? 1 : (this.data.offset += 1);
    getBbsDynamic({
      miniFlag: 1,
      topicId: this.data.topicId,
      offset: this.data.offset,
      pageSize: this.data.pageSize
    }, (res) => {
      // 处理发布时间
      res.data.map(item => {
        return item.createTime = this.timeAgo(item.createTime)
      })

      if (status) {
        this.setData({
          bbsDynamicList: res.data,
          isEnd: true
        });
      } else {
        this.setData({
          bbsDynamicList: this.data.bbsDynamicList.concat(res.data),
          isEnd: true
        });
      }
      console.log(this.data.bbsDynamicList.length == parseInt(res.total), 'test');
      // 数据全部请求完成，停止请求
      if (this.data.bbsDynamicList.length === parseInt(res.total)) {
        this.setData({
          isCheck: false
        })
      } else {
        this.setData({
          isCheck: true
        })
      }

      wx.stopPullDownRefresh();
    }, (err) => {
      console.log(err);
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isCheck) {
      //此处判断，上锁，防止重复请求
      this.httpOfficeDocument(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
