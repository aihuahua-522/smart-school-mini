// components/activityItem/activityItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activityList: {
      type: Array, // 属性值的数据类型
      value: [] // 属性默认值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 跳转到活动页面
     * @param {*} e 
     */
    goActivityPage(e) {
      const activityId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/subpkg/pages/extension/extension_activity_detail/extension_activity_detail?id=${activityId}`,
      })
    },
  }
})
