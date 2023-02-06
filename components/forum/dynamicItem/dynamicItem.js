import {getRemoveBbsDynamic, requestSwitchFavorite, switchFavorite, switchGreat} from "../../../api/forumApi";

Component({
  properties: {
    item: {}
  },
  data: {},
  methods: {


    /**
     * 跳转动态详情
     * @param e
     */
    goForumDetails(e) {
      let i = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '/subpkg/pages/forum/forum-details/forum-details?id=' + i,
      })
    },
    /**
     * 跳转个人主页
     * @param e
     */
    goPersonalData(e) {
      console.log(e)
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/subpkg/pages/common/personal-data/personal-data?id=${id}`,
      })
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
      console.log(this.data.visible, 6767);
    },

    //删除动态
    binddelete(e) {
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
      switchGreat(this.data.item.id, (res) => {
        if (res.data === true) {
          console.log('点赞')
          //点赞成功
          this.setData({
            "item.greatFlag":1,
            "item.greats":this.data.item.greats+1
          })
        }else{
          //点赞成功
          this.setData({
            "item.greatFlag":0,
            "item.greats":this.data.item.greats-1
          })
        }
      }, () => {
      })
    },

    /**
     * 收藏点击
     */
    onFavoriteTap(){
      requestSwitchFavorite(this.data.item.id, (res) => {
        if (res.data === true) {
          console.log('收藏')
          //点赞成功
          this.setData({
            "item.favoriteFlag":1,
            "item.favorites":this.data.item.favorites+1
          })
        }else{
          //点赞成功
          this.setData({
            "item.favoriteFlag":0,
            "item.favorites":this.data.item.favorites-1
          })
        }
      }, () => {
      })
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

  }
});
