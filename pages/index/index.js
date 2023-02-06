// index.js
// 获取应用实例
import {requestTopMenu} from "../../api/homeApi";
import {requestAddNewView, requestNewPage} from "../../api/newsApi";

const app = getApp()
Page({
    data: {

        currentTab: 0,
        newsList: [],
        menuList: [],
        // 轮播图
        current: 0,
        swiperList: [
            {
                image: '/image/tutu.jpg'
            },
            {
                image: '/image/tutu.jpg'
            },
            {
                image: '/image/tutu.jpg'
            }
        ],
    },

    onShow() {
        this.loadTopMenu()
        this.loadNewsList()
    },
    onLoad() {
        // this.loadNewsList()
        // this.loadTopMenu()
    },
    /**
     * 新闻栏目更换
     */
    onTabsChange(e) {
        this.data.currentTab = e.detail.value
        this.loadNewsList()
    },

    /**
     * 加载首页菜单
     */
    loadTopMenu() {
        requestTopMenu((res) => {
            this.setData({
                "menuList": res.data.concat([{
                    id: 10,
                    name: '更多应用',
                    icon: '/image/更多应用.png',
                    path: '/subpkg/pages/common/moreApplication/moreApplication'
                }])
            })
        })
    },
    /**
     * 加载新闻列表
     */
    loadNewsList() {
        requestNewPage({type: this.data.currentTab}, (res) => {
            this.setData({
                newsList: res.data
            })
        })
    },

    clickItem(path) {
        console.log(path);
        const routePath = path.currentTarget.dataset.path;
        console.log(routePath);
        wx.navigateTo({
            url: routePath,
        })
    },
    searchEvent() {
        wx.navigateTo({
            url: "/subpkg/pages/searchPage/indexSearch/search"
        })
        console.log('search');
    },
    notifiEvent() {
        console.log('notifi');
    },
    userEvent() {
        console.log('user');
    },
    news(e) {
        let url = e.currentTarget.dataset.url
        let id = e.currentTarget.dataset.id
        let index = e.currentTarget.dataset.index
        url = encodeURIComponent(url)
        wx.navigateTo({
            url: `/subpkg/pages/news/newsDetail?url=${url}`,
        })
        const key = `newsList[${index}].views`
        requestAddNewView(id, (res) => {
            this.setData({
                [key]: this.data.newsList[index].views + 1
            })
        }, () => {
        })
    }
})
