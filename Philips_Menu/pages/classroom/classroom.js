// pages/classroom/classroom.js
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: setting.setting.ImgURL,
        currentTab: 0,
        currentTab2: 0,
        tabList: [],
        currentChildren: [],
        carouselList: [],
        questionList: [],



    },
    // 滚动tabs切换
    tabClick: function (e) {
        if (e.currentTarget) {
            this.setData({
                currentTab: e.currentTarget.dataset.index
            })
            this.setData({
                currentChildren: this.data.tabList[e.currentTarget.dataset.index].children
            })
            this.setData({
                currentTab2: 0
            })
            // 分类查询
            this. getSearch(e.currentTarget.dataset.productid)
        }
    },
    // 固定tabs切换
    tabClick2: function (e) {
        if (e.currentTarget) {
            this.setData({
                currentTab2: e.currentTarget.dataset.index, 
            })
            // 分类查询
            this. getSearch(e.currentTarget.dataset.productid)
        }
    },
    expand: function (event) {
        var expand = !event.currentTarget.dataset.expand;
        var index = event.currentTarget.dataset.index;
        var str = "questionList[" + index + "].expand"
        this.setData({
            [str]: expand //用中括号把str括起来即可
        })
    },
    
    // 分类查询
    getSearch(productid){
        wx.showLoading({
            title: '加载中',
          });
         setting.GET({productID: productid}, "API/BasicData.ashx?_op=SearchProductQuestion", (data) => {
            wx.hideLoading()
            this.setData({
                carouselList: data.data.VideoList,
                // carouselList: [{'ID':7,'ProductID':2,'VideoUrl':'http://smallapp.crmclick.com/2.mp4','CoverImage':'/Upload/ALL/200730170143.png'},{'ID':7,'ProductID':2,'VideoUrl':'http://smallapp.crmclick.com/2.mp4','CoverImage':'/Upload/ALL/200730170143.png'},{'ID':7,'ProductID':2,'VideoUrl':'http://smallapp.crmclick.com/2.mp4','CoverImage':'/Upload/ALL/200730170143.png'}], 
                questionList: data.data.questionList, // 问题数组
            })
            
        }, (err) => {
            wx.hideLoading()
        }, false);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getClassType();
    },

    // 获取课堂分类
    getClassType() {
        wx.showLoading({
            title: '加载中',
          });
        var that = this;
        setting.GET({}, "API/BasicData.ashx?_op=ProductClassQuery", (data) => {
            wx.hideLoading()
            this.setData({
                tabList: data.data.List, // 课堂分类
                currentChildren: data.data.List[0].children, //默认子分类
                questionList: data.data.questionList, // 问题数组
                carouselList: data.data.VideoList, //视频轮播
            })
            // 添加expand字段
            var questionList = this.data.questionList
            questionList.forEach((value, index) => {
                value['expand'] = false
            })
            this.setData({
                questionList: questionList
            })
        }, (err) => {
            wx.hideLoading()
        }, false);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // this.setData({
        //     currentChildren: this.data.tabList[0].children
        // })
        // this.data.questionList.forEach((i, v) => {
        //     WxParse.wxParse('Answer' + v, 'html', i.Answer, this, 0);
        //     if (v === this.data.questionList.length - 1) {
        //         WxParse.wxParseTemArray("answerArr", 'Answer', this.data.questionList.length, this)
        //     }
        // })

        // WxParse.wxParse('article', 'html', data.data.Describe, that, 0);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})