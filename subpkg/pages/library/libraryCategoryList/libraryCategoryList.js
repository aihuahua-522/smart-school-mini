import { requestBookList, requestTypeList } from "../../../../api/libraryApi";

// subpkg/pages/library/libraryCategoryList/libraryCategoryList.js
// const image = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';
// const items = new Array(12).fill({ label: '标题文字', image }, 0, 12);

Page({
  offsetTopList: [],
  data: {
    //获取书籍列表参数
    bookParam: {
      offset: 1,
      pageSize: 10,
      //分类id
      classifyId: 0
    },
    sideBarIndex: 0,
    scrollTop: 0,
    //左边分类
    categories: [],
    //右边图书列表
    books: [],
    isShow: false
  },

  onLoad() {
    this.getType()
  },

  /**
   * 获取书籍列表
   */
  getBookList() {
    requestBookList(this.data.bookParam, (res) => {
      console.log(res.data);
      this.setData({
        "books": res.data
      })
    }, () => { })
  },
  getType() {
    requestTypeList((res) => {
      this.setData({
        categories: res.data.map(item => {
          return {
            label: item.name,
            title: item.describe
          }
        }),
        ['bookParam.classifyId']: res.data[0].id
      })
      this.getBookList()
    }, () => { })
  },
  onSideBarChange(e) {
    const { value } = e.detail;
    this.setData({ sideBarIndex: value, "bookParam.classifyId": this.data.categories[value].id });
    this.getBookList()
  },
  // 遮罩层
  hiddenEvent(e) {
    const that = this
    setTimeout(() => {
      that.setData({
        isShow: false
      })
    }, 0)
  },
  showEvent() {
    this.setData({
      isShow: true
    })
  },
  changeEvent(e) {
    //
    this.setData({
      'bookParam.name': e.detail.value
    })
    this.getBookList()
  }
})

