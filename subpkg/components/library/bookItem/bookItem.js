// subpkg/pages/library/components/bookItem/bookItem.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //书籍
    bookList: {
      type: Array,
      default: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bookList: []
    // bookList: this.properties.bookList
  },

  /**
   * 组件的方法列表
   */
  methods: {
    routerEvent(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `../bookDetail/bookDetail?id=${id}`,
      })
    }
  },
  show() {
    // console.log('打印传值', this.properties);
  }
})
