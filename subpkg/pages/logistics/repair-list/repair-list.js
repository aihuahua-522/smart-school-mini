// subpkg/pages/repair-list/repair-list.js
import {requestGetRepairList} from '../../../../api/logisticsApi'
import {logisticsStatusKey,getDict} from '../../../../api/dictApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repairVal:'待处理',
    repairList:[],
      query:{
        offset:1,
        pageSize:10,
        repairStatus:0
      },
      statusDict:[],
      tabs:[
        {label:'待处理',value:'0'},
        {label:'待上门',value:'1'},
        {label:'待评价',value:'2'},
        {label:'已完结',value:'3'},
      ]
  },
  onTabsClick(e){},
  onTabsChange(e){
    this.setData({
      'query.repairStatus':e.detail.value,
      'query.offset':1,
      'query.pageSize':10,
      repairVal:e.detail.value=='0'?'待处理':e.detail.value=='1'?'待上门':e.detail.value=='2'?'待评价':'已完结'
    })
    this.getRepairList(this.data.query)
  },
// 跳转报修详情
goRepairDetail(e){
  wx.navigateTo({
    url: `/subpkg/pages/logistics/repair-detail/repair-detail?id=${e.currentTarget.dataset.id}`
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getRepairList(this.data.query)

  },
  getRepairList(query){
    getDict(logisticsStatusKey,(res)=>{
      this.setData({
        statusDict:res.data
      })
        requestGetRepairList(query,(res2)=>{
          let newres2= res2.data
          newres2.forEach(item=>{
           item.type =  this.dict(res.data,item.repairType)
          })
          this.setData({repairList:[...this.data.repairList,...newres2]})

          console.log(this.data.repairList);
        })


    })

  },
  handleFabClick(){
    wx.navigateTo({
      url: '/subpkg/pages/logistics/repair/repair'
    })
  },
   dict (arr, value){
    return arr.find((item) => {
      return item.key == value
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
    this.setData({
      'query.offset':this.data.query.offset+=1
    })
    this.getRepairList(this.data.query)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
