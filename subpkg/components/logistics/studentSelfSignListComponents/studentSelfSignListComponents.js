Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    //签到列表
    signList: {
      type: Array
    }
  },
  data: {

  },
  methods: {
    /**
     * 前往签到
     * @param e
     */
    goSign(e) {
      wx.navigateTo({
        url: `/subpkg/pages/logistics/locationSign/locationSign?id=${e.currentTarget.dataset.id}`,
      })
    }
  }
});
