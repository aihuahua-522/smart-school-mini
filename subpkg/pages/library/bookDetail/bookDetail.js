// subpkg/pages/library/bookDetail/bookDetail.js
import {requestBookDetail, requestLibraryData, requestReserveBook} from "../../../../api/libraryApi";
import ActionSheet, { ActionSheetTheme } from 'tdesign-miniprogram/action-sheet/index';
import {showError, showSuccess} from "../../../../utils/MessageUtil";


Page({

  /**
   * 页面的初始数据
   */
  data: {

    orderFlag:false,
    id: '',
    info: {},
    showMultiTextAndTitle: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.id = options.id
    this.loadDetail()
    this.loadOrder()
  },
  loadOrder(){
    requestLibraryData(this.data.id ,(res)=>{
      if (res.data){
        this.setData({
          orderFlag:true
        })
      }
    },()=>{})
  },
  /**
   * 加载详情
   */
  loadDetail() {
    requestBookDetail(this.data.id, (res) => {
      this.setData({
        "info": res.data
      })
    }, () => { })

  },

  /**
   * 展示更多描述
   */
  showMoreDescription() {
    console.log('点击展示全部');
    this.setData({
      showMultiTextAndTitle: true
    })
  },

  /**
   * 关闭详情弹框
   */
  closeDialog() {
    this.setData({
      showMultiTextAndTitle: false
    })
  },

  /**
   * 展示预约弹框
   */
  showReserveModel() {
    const libraryItems = this.data.info.bookNumberList.map((res) => {
      return {
        label: res.branchLibraryName
      }
    });
    if (!libraryItems || libraryItems.length === 0) {
      showError('此书暂无库存，请稍后再试')
      return
    }
    ActionSheet.show({
      theme: ActionSheetTheme.List,
      selector: '#t-action-sheet',
      context: this,
      description: '动作面板描述文字',
      items: libraryItems
    });
  },

  /**
   * 展示已预约信息
   */
  showReserveInfoModel(){

  },

  /**
   * 选择了预约书籍(分馆)
   */
  handleSelected(e) {
  const publishItem =  this.data.info.bookNumberList[e.detail.index]
    console.log()
    requestReserveBook({
      libraryId:publishItem.branchLibraryId,
      publishId:this.data.id
    },(res)=>{
      //预约成功
      showSuccess('预约成功')
    },()=>{})
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
