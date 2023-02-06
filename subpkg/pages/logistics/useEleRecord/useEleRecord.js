// subpkg/pages/useEleRecord/useEleRecord.js
import { requestDormSignDetail, requestElectricPayList } from '../../../../api/logisticsApi';
import echarts from '../../../../compoent/ec-canvas/echarts';
const dayjs = require("dayjs").default;
let chart = null
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  return chart;
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    roomId: undefined,
    resultDate: '',
    dataList: '',
    mode: '',
    dateVisible: false,
    date: new Date().getTime(), // 支持时间戳传入
    dateText: '',
    // 指定选择区间起始值
    start: '2020-01-01 00:00:00',
    end: '2030-09-09 12:12:12',
  },

  showPicker(e) {
    const {
      mode
    } = e?.currentTarget?.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  hidePicker() {
    const {
      mode
    } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  // 时间选择器的选中
  onConfirm(e) {
    const {
      value
    } = e?.detail;
    const {
      mode
    } = this.data;
    this.data.resultDate = value
    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
      dataList: value
    });

    this.loadData()

  },

  loadData() {

    requestElectricPayList({ roomId: this.data.roomId, date: this.data.resultDate }, (res => {

      var option = {
        xAxis: {
          type: 'category',
          data: res.data.mouthList
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: res.data.valueData,
          type: 'line'
        }]
      };
      chart.setOption(option);
      this.hidePicker();
    }))
  },

  onColumnChange(e) {
    console.log('pick', e?.detail?.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.resultDate = dayjs().format('YYYY-MM-DD');
    this.data.roomId = options.roomId
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.loadData()
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
  onPullDownRefresh() { },

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