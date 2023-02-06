import {requestCommentGreat} from "../../../../api/forumApi";

Component({
    properties: {
        item: {
            type: Object,
            default: []
        },
        canClick: {
            type: Boolean,
            default: false
        }
    },
    data: {},
    methods: {
        // 处理评论点赞
        handleAssessGreat(e) {
            let commentId = e.currentTarget.dataset.id
            requestCommentGreat({commentId}, (res) => {
                console.log(this.data.item)
                if (res.data) {
                    this.data.item.greats++
                    this.data.item.greatFlag = 1
                    this.setData({
                        item: this.data.item
                    })
                    wx.showToast({
                        title: '点赞成功',
                        icon: 'none'
                    })
                } else {
                    this.data.item.greats--
                    this.data.item.greatFlag = 0
                    this.setData({
                        item: this.data.item
                    })
                    wx.showToast({
                        title: '取消点赞',
                        icon: 'none'
                    })
                }
            }, () => {
            })

            // this.getHttpData()
        },
        // 跳转评价详情
        goAssess(e) {
            console.log(this.data.canClick)
            if (!this.data.canClick){
                return;
            }
            let i = e.currentTarget.dataset.index
            wx.navigateTo({
                url: `/subpkg/pages/forum/assess-details/assess-details?id=${i}&dynamicId=${this.data.item.dynamicId}`,
            })
        },
    }
});
