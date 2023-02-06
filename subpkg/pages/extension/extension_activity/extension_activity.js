const { requestActivityList, requestTeamList } = require("../../../../api/activityApi");
const { getDict, activityTpeKey, dictConvert, activityStatusKey } = require("../../../../api/dictApi");
const chineseNumber = '一二三四五六七八九十'.split('');

const singleSelectOptions = new Array(8).fill(null).map((_, i) => ({
  label: `选项${chineseNumber[i]}`,
  value: `option_${i + 1}`,
  disabled: false,
}));

singleSelectOptions.push({
  label: '禁用选项',
  value: 'disabled',
  disabled: true,
});

// pages/extension_activity/extension_activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dictConvertObj: dictConvert,
    //活动类型
    activityTypeList: [],
    //社团
    teamList: [],
    //活动状态
    activityStatusList: [],
    //筛选数据
    filterData: {
      //社团id
      teamId: '',
      //活动类型
      type: '',
      //活动状态
      status: ''
    },


    singleSelect: {
      value: 'option_3',
      options: singleSelectOptions,
    },
    //入参
    param: {
      pageSize: 10,
      offset: 1,
      order: 1
    },
    //活动列表
    activityList: [
      {
        id: 1,
        title: '志愿者报名',
        applyTime: '08-17 16:00 到 08-17 18:00',
        activityTime: '08-18 16:00 到 08-18 18:00',
        viewCount: '24578',
        reportCount: '414',
        imageUrl: 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/image/image-2.jpg'
      },
      {
        id: 2,
        title: '志愿者报2222名',
        applyTime: '08-17 16:00 到 08-17 18:00',
        activityTime: '08-18 16:00 到 08-18 18:00',
        viewCount: '24578',
        reportCount: '414',
        imageUrl: 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/image/image-2.jpg'
      }
    ]
  },



  /**
   * 跳转到活动详情
   * @param {*} id
   */
  goActivityDetail(event) {
    console.log(event.currentTarget.dataset.activityid);
    wx.navigateTo({
      url: '/subpkg/pages/extension/extension_activity_detail/extension_activity_detail?id=' + event.currentTarget.dataset.activityid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //初始化加载活动列表
    this.getActivityList()
    //加载活动类型
    this.getActivityType()
    //加载组织列表
    this.getTeamList()
    //加载活动状态
    this.getActivityStatus()

  },


  /**
   * 获取活动类型
   */
  getActivityType() {
    getDict(activityTpeKey, (res) => {
      this.setData({
        'activityTypeList': res.data
      })
    }, () => { })
  },

  /**
   * 获取活动状态
   */
  getActivityStatus() {
    getDict(activityStatusKey, (res) => {
      this.setData({
        'activityStatusList': res.data.filter(item => {
          return item.key != 0
        })
      })
    }, () => { })
  },


  /**
   * 获取社团列表
   */
  getTeamList() {
    requestTeamList((res) => {
      const arr = res.data.map(obj => {
        return {
          label: obj.teamName,
          value: obj.id
        }
      })
      this.setData({
        teamList: arr
      })
    }, () => { })
  },



  /**
   * 获取活动列表
   */
  getActivityList() {
    requestActivityList({ ...this.data.param, ...this.data.filterData }, (res) => {
      this.setData({
        'activityList': res.data
      })
    })

  },

  /**
   * 活动类别选择框
   * @param {*} e
   */
  handleActivityTypeSelect(e) {
    this.setData({
      'filterData.type': e.detail.value
    })
    this.getActivityList()
  },

  /**
   * 活动状态选择框
   * @param {*} e
   */
  handleActivityStatusSelect(e) {
    this.setData({
      'filterData.status': e.detail.value
    })
    this.getActivityList()
  },

  /**
   * 社团框选择
   * @param {*} e
   */
  handleTeamSelect(e) {
    this.setData({
      'filterData.teamId': e.detail.value
    })
    this.getActivityList()

  }
})
