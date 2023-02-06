// page/11-demo/demo.js
import {requestQuestion, requestQuestionDetail, requestSubmitQuestion} from "../../../../api/logisticsApi";
import {showError, showSuccess} from "../../../../utils/MessageUtil";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        roomId: 0,
        showSubmitBtn: false,
        //问题列表
        questionList: []
    },
    /**
     * 点击
     */
    onChange(e) {
        const questionList = this.data.questionList
        questionList.forEach(value => {
            if (value.id === e.currentTarget.dataset.id) {
                value.optionId = e.detail
            }
        })
        this.setData({
            "questionList": questionList
        })
        console.log(e)
        console.log(e.detail)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //id
        const id = options.id
        //房间id
        const roomId = options.roomId
        this.setData({
            "roomId": roomId
        })
        //两种情况 第一种是未提交 第二种是已提交(判断是否携带id)
        if (id) {
            this.setData({
                id: options.id
            })
            //如果有id 说明是未提交
            this.loadAnswerQuestion()
        } else {
            this.loadQuestion()
        }
    },

    /**
     * 提交问卷
     */
    submitQuestion() {
        const questionList = this.data.questionList;
        questionList.forEach(value => {
            //重新赋值
            value.questionId = value.id
        })
        questionList.forEach(value => {
            if (value.optionId == undefined) {
                showError('请先完成问卷')
                return
            }
        })
        //提交
        requestSubmitQuestion({roomId: this.data.roomId, selectOptions: questionList}, (res) => {
            showSuccess('提交成功')
            wx.navigateBack({
                delta: 500,
            })
        }, () => {
        })
    },

    /**
     * 加载问卷
     */
    loadQuestion() {
        requestQuestion((res) => {
            res.data.forEach(e => {
                e.options.forEach(item => {
                    item.completeName = item.itemName + `(${item.itemValue}分)`
                })
            })
            this.setData({
                "questionList": res.data,
                showSubmitBtn: true
            })
        }, () => {
        })
    },

    /**
     * 加载已提交的问卷
     */
    loadAnswerQuestion() {
        this.setData({
            showSubmitBtn: false
        })
        requestQuestionDetail(this.data.id, (res) => {
            res.data.forEach(e => {
                e.options.forEach(item => {
                    item.completeName = item.itemName + `(${item.itemValue}分)`
                })
            })
            this.setData({
                questionList: res.data
            })
        }, () => {
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
