import { getBbsDynamic, getBbsTopic } from '../../api/forumApi.js'
// pages/forum/forumApi.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bbsDynamicList: [],
    miniTopicList: [],
    param: {
      miniFlag: 1,
      offset: 1,
      pageSize: 5
    },
    //true = 没有更多
    noMore: false,
    //true = 正在加载
    isLoading: false,
    visible: false,
  },

  resetPage() {
    this.setData({
      "param.offset": 1,
      "param.pageSize": 5,
      bbsDynamicList: []
    });
  },

  // tab栏切换调用各个分类的数据
  onTabsChange(e) {
    this.resetPage()
    this.data.param.miniFlag = parseInt(e.detail.value)
    this.httpOfficeDocument(true)
  },

  /**
 * 跳转话题广场
 */
  goTopic() {
    wx.navigateTo({
      url: '/subpkg/pages/forum/topic-more/topic-more'
    })
  },


  /**
   * 跳转话题详情
   * @param e
   */
  goTopicDetails(e) {
    console.log(e.currentTarget.dataset.index, 5555);
    const i = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/subpkg/pages/forum/topic-details/topic-details?id=' + i
    })
  },
  /**
     * 跳转发布动态
     */
  goPost() {
    wx.navigateTo({
      url: '/subpkg/pages/forum/post/post',
    })
  },
  reset() {
    // 上拉加载更多处理【获取动态数据】
    this.setData({
      "param.offset": 1,
      "param.pageSize": 5,
      bbsDynamicList: []
    });
  },
  // 获取数据查询
  getHttpData() {
    this.reset()
    this.httpOfficeDocument()

    // 获取话题广场数据
    getBbsTopic({
      offset: 1,
      pageSize: 3
    }, (res) => {
      this.setData({
        miniTopicList: res.data,
      });
    }, (err) => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true
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
    this.getHttpData()
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
  httpOfficeDocument() {
    this.setData({
      isLoading: true
    });
    getBbsDynamic(this.data.param, (res) => {
      // 处理发布时间
      res.data.map(item => {
        return item.createTime = this.timeAgo(item.createTime)
      })
      this.setData({
        isLoading: false,
        bbsDynamicList: this.data.bbsDynamicList.concat(res.data),
      });

      console.log(this.data.bbsDynamicList.length == parseInt(res.total), 'test');
      console.log(this.data.bbsDynamicList.length, 'test12312');
      console.log(parseInt(res.total))
      // 数据全部请求完成，停止请求
      if (this.data.bbsDynamicList.length >= parseInt(res.total)) {
        this.setData({
          noMore: true
        })
      } else {
        this.setData({
          noMore: false
        })
      }
      wx.stopPullDownRefresh();
    }, (err) => {
      this.setData({
        isLoading: false,
        bbsDynamicList: this.data.bbsDynamicList.concat(res.data),
      });
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("onReachBottom")
    this.setData({
      "param.offset": this.data.param.offset + 1
    })
    this.httpOfficeDocument();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
