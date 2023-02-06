// components/searchPage/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    recommend: ["桑巴军团", "欧洲红魔", "德国战车世界杯你怎么看"],
    history: ["耐克", "阿迪达斯", "彪马", "李宁", "安踏", "安德玛"]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 删除搜索历史
    onIconTap() {
      this.setData({
        history: []
      })
      console.log("delete");
    },
    //
    clear() {
      wx.navigateBack()
      console.log('clear');
    }
  }
})
