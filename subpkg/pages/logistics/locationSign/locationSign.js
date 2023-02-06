// subpkg/pages/locationSign/locationSign.js
var amapFile = require('../../../../libs/amap-wx.js');
import {fileUp, getMyDorm,getRoomDetailByRoomId , requestSignDetail, sign} from '../../../../api/logisticsApi'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //展示按钮
        showSignBtn: true,
        avatarPath: [],
        //校区
        schoolName: "",
        //楼栋
        dormName: "",
        //楼层
        floorName: "",
        //宿舍号
        roomName: "",
        //园区
        packName: "",
        // 签到数据
        signObj: {
            id: 0,
            roomId: null,
            url: "",
            longitude: "",
            latitude: "",
            address: ""
        }
    },
    signCheck() {
        console.log(this.data.signObj);
        sign({...this.data.signObj}, (res) => {
            wx.navigateTo({
                url: '/subpkg/pages/logistics/locationSignSuccess/locationSignSuccess',
            })
        }, () => {
        })
    },
    /**
     * 刷新定位
     */
    refreshLocation() {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({key: 'e867e58ffd7b998c608b0741b52c11c1'});
        myAmapFun.getRegeo({
            success: function (data) {
                // 经纬度
                that.setData({
                    "signObj.latitude": data[0].latitude,
                    "signObj.longitude": data[0].longitude,
                    "signObj.address": data[0].regeocodeData.formatted_address,
                })
                //成功回调
                console.log(data);
            },
            fail: function (info) {
                //失败回调
                console.log(info)
            }
        })
    },

    /**
     * 获取签到详情
     */
    getSignDetail() {
        requestSignDetail(this.data.signObj.id, (res) => {

            if (res.data.signFlag === 0) {
                // 刷新定位
                this.refreshLocation()
                // 获取宿舍信息
                getMyDorm((res) => {
                    this.setData({
                        roomId: res.data.roomId
                    })
                    getRoomDetailByRoomId(res.data.roomId, (value) => {
                        this.setData({
                            dormName: value.data.dormName,
                            floorName: value.data.floorName,
                            roomName: value.data.roomName,
                            packName: value.data.packName,
                            schoolName: value.data.schoolName,
                            "signObj.roomId": value.data.roomId
                        });
                        console.log(this.data);
                    }, (err) => {
                        console.log(err);
                    })
                }, (err) => {
                    console.log(err);
                })
            } else {
                //已签到 禁用按钮
                this.setData({
                    signObj: res.data,
                    avatarPath: [res.data.url],
                    showSignBtn: false
                })
                //加载房间信息
                getRoomDetailByRoomId(res.data.roomId, (value) => {
                    this.setData({
                        dormName: value.data.dormName,
                        floorName: value.data.floorName,
                        roomName: value.data.roomName,
                        packName: value.data.packName,
                        schoolName: value.data.schoolName,
                        "signObj.roomId": value.data.roomId
                    });
                    console.log(this.data);
                }, (err) => {
                    console.log(err);
                })
            }
        }, () => {
        })
    },

    onLoad(e) {
        console.log(e)
        this.setData({
            ['signObj.id']: e.id
        })
        this.getSignDetail()
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

    },


    goChooseImg() {
        // 判断图片是否超过9张
        if (this.data.avatarPath.length >= 1) {
            wx.showToast({
                title: '最多选一张哦~~',
                icon: 'none'
            })
            return
        }
        //添加图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['camera'],
            success: res => {
                console.log(this.data.avatarPath, '1');
                // 判断新增后的数组图片是否超过9张
                if (this.data.avatarPath.length + res.tempFilePaths.length <= 9) {
                    // 遍历新增图片到数组中
                    res.tempFilePaths.map((item) => {
                        fileUp(item, (res) => {
                            console.log(res);
                            this.setData({
                                "signObj.url": res
                            })
                        }, () => {
                            console.log("err");
                        })
                        return this.data.avatarPath.push(item)
                    })
                    // 最新数组
                    this.setData({
                        avatarPath: this.data.avatarPath,
                    })
                } else {
                    wx.showToast({
                        title: '最多选1张哦~~',
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


})
