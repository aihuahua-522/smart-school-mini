import { requestCurremtWeekCount, requestCurrentSemesterWeekCount } from "../../../../api/eduApi"

// subpkg/pages/edu/timetable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否展示
    weekSelectVisible: false,
    //选中的
    weekValue: 1,
    pickerTitle: '选择周数',
    weeks: [],
    currentWeek: 0,

    timetables: [
      ['大学英语', '大学英语', '大学英语', '', ''],
      ['', '', '信号与系统', '信号与系统', '模拟电子技术基础'],
      ['大学体育', '大学体育', '形势与政策', '形势与政策', ''],
      ['', '', '', '', '电装实习'],
      ['', '', '数据结构与算法分析', '数据结构与算法分析', '']
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadWeek()
  },

  /**
   * 选择周数确认
   */
  handleWeekChange(e) {
    const week = e.detail.value[0]
    console.log(week);
  },
  /**
   * 加载周数
   */
  loadWeek() {
    //加载周数
    requestCurrentSemesterWeekCount((res) => {
      const data = res.data.map((item) => {
        return {
          label: '第' + item + '周',
          value: item
        }
      })
      this.setData({
        weeks: data
      })
      this.loadCurrentWeek()
    }, () => { })

  },

  loadCurrentWeek() {
    //获取当前是第几周
    requestCurremtWeekCount((res) => {
      if (res.data) {
        //如果处于学期中,默认获取指定周数的数据
        this.setData({
          currentWeek: res.data
        })
      } else {
        //学期已结束 默认加载最后一个学期的数据
        this.setData({
          currentWeek: this.data.weeks[this.data.weeks.length - 1].value
        })
      }
    }, () => { })
  },
  //切换按钮点击
  handleClick() {
    this.setData({
      weekSelectVisible: true
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})