// pages/forum/post/post.js
import { doDictConvert, getDict, KEY_dynamicType } from '../../../../api/dictApi.js'
import { forumFileUpload, getBbsTopic, getSaveBbsDynamic } from '../../../../api/forumApi.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarPath: [],
    typeList: [],
    //是否展示选择分类
    typeVisible: false,
    topicName: '我们选个话题吧',
    //动态分类
    typeName: '请选择分类',
    topicNameList: [],
    param: {
      offset: 1,
      pageSize: 100
    },
    content: '',
    topicId: 0,
    type: 0
  },
  // 获取输入框的值
  onPostInput(e) {
    this.setData({
      content: e.detail.value
    })
  },

  loadTypeList() {
    getDict(KEY_dynamicType, (res) => {
      this.setData({
        typeList: doDictConvert(res.data)
      })
    }, () => { })
  },

  showTypePicker() {
    this.setData({
      typeVisible: true
    })
  },
  /**
   * 选中分类
   */
  confirmType(e) {
    const typeName = e.detail.label[0]
    const type = e.detail.value[0]
    this.setData({
      typeName,
      type
    })
  },
  // 发布动态
  post() {
    if (this.data.typeName == '请选择分类') {
      wx.showToast({
        title: '请先选择动态分类',
        icon: 'none'
      })
      return
    }
    if (this.data.topicName == '我们选个话题吧') {
      wx.showToast({
        title: '我们选个话题吧',
        icon: 'none'
      })
      return
    }


    if (this.data.content == '') {
      wx.showToast({
        title: '请输入动态内容~',
        icon: 'none'
      })
      return
    }
    let index = 0
    getSaveBbsDynamic({
      type: this.data.type,
      topicId: this.data.topicId,
      content: this.data.content,
      bbsDynamicPhotos: this.data.avatarPath.map(img => {
        return {
          url: img,
          sortNo: index++
        }
      })
    }, (res) => {
      wx.showToast({
        title: '发布成功~',
        icon: 'none'
      })
      wx.switchTab({
        url: '/pages/forum/forum',
      })
    }, (err) => {
      console.log(err);
    })
  },
  // 打开抽屉
  openDrawerBase() {
    this.setData({
      visible: true,
      sidebar: this.data.topicNameList,
    });
  },
  // 抽屉列表的选择
  itemClick(e) {
    this.setData({
      visible: false,
      topicName: e.detail.sibarItem.item.title,
      topicId: e.detail.sibarItem.item.id
    })
  },

  goChooseImg() {
    // 判断图片是否超过9张
    if (this.data.avatarPath.length >= 9) {
      wx.showToast({
        title: '最多选九张哦~~',
        icon: 'none'
      })
      return
    }
    //添加图片
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log(this.data.avatarPath, '1');
        // 判断新增后的数组图片是否超过9张
        if (this.data.avatarPath.length + res.tempFilePaths.length <= 9) {
          // 遍历新增图片到数组中
          res.tempFilePaths.forEach((item) => {
            console.log(item);
            forumFileUpload(item, (url) => {
              this.data.avatarPath.push(url)
              // 最新数组
              this.setData({
                avatarPath: this.data.avatarPath,
              })
            }, () => {
            })
          })

        } else {
          wx.showToast({
            title: '最多选九张哦~~',
            icon: 'none'
          })
          return
        }
      }
    });
  },
  //预览图片
  previewAvatarImage(e) {
    var i = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.avatarPath[i],
      urls: this.data.avatarPath
    });
    console.log(this.data.avatarPath[i], 1);
  },
  //删除图片
  removeAvatarImage(e) {
    var i = e.currentTarget.dataset.index
    this.data.avatarPath.splice(i, 1)
    this.setData({
      avatarPath: this.data.avatarPath,
    })
  },
  // 获取数据查询
  getHttpData() {
    getBbsTopic(this.data.param, (res) => {
      console.log(res.data.map(item => {
        return item.topicName
      }), 7777777, res.data);
      this.setData({
        topicNameList: res.data.map(item => {
          return Object.assign({
            title: item.topicName,
            id: item.id
          })
        })
      });

    }, (err) => {
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadTypeList()
    this.setData({
      topicName: options.name == undefined ? '我们选个话题吧' : options.name,
      topicId: options.id
    })
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
