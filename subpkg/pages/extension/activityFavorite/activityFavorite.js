import {requestFavorite} from "../../../../api/activityApi";

Page({
    data: {
        pageSize:1,
        activityList:[]
    },
    onLoad: function (options) {
        this.getActivityList()
    },


    /**
     * 获取活动列表
     */
    getActivityList(){
        requestFavorite({pageSize: this.data.pageSize},(res)=>{
            this.setData({
                activityList:res.data
            })
        },()=>{})
    }
});
