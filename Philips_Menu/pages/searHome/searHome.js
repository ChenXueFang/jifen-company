// pages/home/home.js
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");

// 基础版的防抖函数
let timeout
function debounce(func, wait) {
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait)
    }
}
// 基础版的节流函数
let timeout2 = null
function throttle(func, wait) {
    return function () {
        if (!timeout2) {
            timeout2 = setTimeout(function () {
                clearTimeout(timeout2)
                timeout2 = null
                func()
            }, wait)
        }
    }
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: setting.setting.ImgURL,
        currentTab: 0,
        currentTab2: 0,
        tabList: [],
        myPosterList: [],
        width: wx.getSystemInfoSync().windowWidth,
        height: wx.getSystemInfoSync().windowHeight,

        videoLoading: false,
        videoList: [],

        location: [],
        isLock: false, // 当前栗子无用，如果有些弹窗控制不住背后的视频列表滚动的话，isLock的作用就发挥出来了。
        localIndex: 0,
        noPageScroll: false,
        searchclass: [],
        cookname: '',
        productytypeid: '',
        current_con: 0,
        pageIndex: 1,
        cookIsOver: false


    },
    info: {
        videoPlayDetail: {} // 存放所有视频的播放位置
    },
    // 喜欢
    loveBind(e) {
        // //注册页面
        // var path = '../registerCode/registerCode';
        // // 详情页面
        // var oldMemPath = '../home/home';
        app.globalData.returnPath = '../home/home'
        app.globalData.returnId = e.currentTarget.dataset.index
        if (app.globalData.unionId && app.globalData.miniOpenId) { //代表授过权
            if (app.globalData.vipUserId && app.globalData.mobile) { //用户是否是会员

                //授权且是会员-点赞操作
                var index = e.currentTarget.dataset.index //数组下标
                this.loveAction(index)

            } else { //授过权但不是会员
                wx.navigateTo({
                    url: '../wxPhone/wxPhone'
                })
            }
        } else { //代表没授权
            wx.navigateTo({
                url: '../wxPhone/wxPhone'
            })
        }
    },

    // 点赞操作
    loveAction(index) {
        wx.showLoading({
            title: '加载中',
        });
        var arr = this.data.myPosterList
        var item = arr[index]
        if (!item.IsLikes) {
            setting.POST({
                CookBookID: item.CookBookID,
                oper: 'add',
                ID: '',
                H5UserID: wx.getStorageSync("vipUserId"),
                UnionID: wx.getStorageSync("unionidKey")
            }, "API/BasicData.ashx?_op=CookBookLikes", (data) => {
                wx.hideLoading()
                item.IsLikes = true
                item.LikesCount = item.LikesCount + 1
                item.LikesID = data.data.ID
                this.setData({
                    myPosterList: arr, //重新赋值
                })
            }, (err) => {
                wx.hideLoading()
                wx.showToast({
                    title: err.msg,
                    icon: 'none'
                })
            }, false);
        } else {
            setting.POST({
                CookBookID: item.CookBookID,
                oper: 'del',
                ID: this.data.currentTab2 == 2 ? item.ID : item.LikesID, //我的最爱列表里的LikesID是ID
                H5UserID: wx.getStorageSync("vipUserId"),
                UnionID: wx.getStorageSync("unionidKey")
            }, "API/BasicData.ashx?_op=CookBookLikes", (data) => {
                wx.hideLoading()
                item.IsLikes = false
                item.LikesCount = item.LikesCount - 1
                item.LikesID = data.data.ID
                this.setData({
                    myPosterList: arr, //重新赋值
                })
            }, (err) => {
                wx.hideLoading()
                wx.showToast({
                    title: err.msg,
                    icon: 'none'
                })
            }, false);
        }
    },

    // 获取滚动分类
    getScrollType() {
        wx.showLoading({
            title: '加载中',
        });
        setting.GET({}, "API/BasicData.ashx?_op=ProductTypeQuery", (data) => {
            wx.hideLoading()
            if (data.data.length > 0) {
                if (this.data.productytypeid) {
                    var current_con = data.data.filter((a) => {
                        return a.ID == this.data.productytypeid
                    })[0].ID //默认tab内容
                    data.data.unshift({
                        ID: '',
                        Name: '全部',
                        Image: '../../images/all.png'
                    })
                    this.setData({
                        tabList: data.data,
                        currentTab: current_con, //默认tab内容
                    })
                }
            }
        }, (err) => {
            wx.hideLoading()
        }, false);
    },

    goCookDetail: function (e) {
        app.globalData.returnPath = '../cookDetail/cookDetail?cookid=' + e.currentTarget.dataset.cookid
        app.globalData.returnId = e.currentTarget.dataset.index
        // this.checkMember(path,oldMemPath);
        app.checkMember();
    },

    // 按产品搜索
    getProductSearch() {
        wx.showLoading({
            title: '加载中',
        });
        var that = this;
        setting.GET({
            pageIndex: this.data.pageIndex,
            pageSize: 6,
            cookname: this.data.cookname,
            SearchClass: this.data.searchclass,
            productyTypeID: this.data.productytypeid ? this.data.productytypeid : '',
        }, "API/BasicData.ashx?_op=SearchCookBook", (data) => {
            wx.hideLoading()
            if (data.data.length) {
                this.setData({
                    myPosterList: this.data.myPosterList.concat(data.data),
                    pageIndex: this.data.pageIndex + 1
                })
                // 添加isPlay字段
                var currentList=this.data.myPosterList
                for (var i in currentList) {
                    // 默认前四个播放
                    if (!this.data.scrollHeight) {
                        if (i < 4) {
                            currentList[i].isPlay = true
                        } else {
                            currentList[i].isPlay = false
                        }
                    }
                }
                this.setData({
                    myPosterList: currentList
                })

                if (data.data.length < 6) {
                    this.setData({
                        cookIsOver: true
                    })
                } else {
                    this.setData({
                        cookIsOver: false
                    })
                }
            } else {
                this.setData({
                    cookIsOver: true
                })

            }

        }, (err) => {
            wx.hideLoading()
        }, false);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var classList = wx.getStorageSync('SearchClass') ? JSON.parse(wx.getStorageSync('SearchClass')) : '';
        if (classList && classList.length > 0) {
            classList.forEach(i => {
                var temp = []
                i.SubTypeID.forEach(a => {
                    temp.push(a.SubTypeID)
                })
                i.SubTypeID = temp //.join(',')
            })
        }
        this.setData({
            productytypeid: options.productytypeid ? options.productytypeid : '',
            cookname: wx.getStorageSync('cookname'),
            searchclass: classList,
        });
        if(this.data.productytypeid){
            this.setData({
                isTabs: true
            })
        }

        this.getScrollType();
        this.getProductSearch();

    },

    // 滚动tabs切换
    tabClick: function (e) {
        if (e.currentTarget) {
            this.setData({
                currentTab: e.currentTarget.dataset.index,
                productytypeid: e.currentTarget.dataset.productytypeid,
                pageIndex: 1,
                myPosterList: [],
                isTabs:true,
            })
            this.getProductSearch();
        }
    },

    // 到底加载更多
    onReachBottom() {
        if (this.data.cookIsOver) return
        this.getProductSearch();
    },

    // 滚动距离控制视频播放
    onPageScroll(e) {
        // console.log(e.scrollTop, 'e.scrollTop++++++++++')
        // 节流，每200毫秒触发一次
        throttle(() => {
            this.playVideo(e.scrollTop);
        }, 200)()

        // 防抖，只触发一次
        debounce(() => {
            this.playVideo(e.scrollTop);
        }, 200)()
    },
    playVideo: function (scrollHeight) {
        var dataList = this.data.myPosterList
        var height = wx.getSystemInfoSync().windowHeight - 40 //屏幕可视高度
        var that = this
        wx.createSelectorQuery().selectAll('.tuijianvedio').boundingClientRect(function (rects) {
            rects.forEach(function (rect) {
                var index = rect.id.substring(1)

                if (rect.top > 0 && rect.bottom < height) {
                    dataList[index].isPlay = true
                } else dataList[index].isPlay = false;
                // console.log(index)
                // console.log(rect.bottom  =","+rect.top+","+rect.height)
            })
            that.setData({
                myPosterList: JSON.parse(JSON.stringify(dataList))
            })
        }).exec()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
        wx.removeStorageSync('SearchClass')
        wx.removeStorageSync('cookname')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        wx.removeStorageSync('SearchClass')
        wx.removeStorageSync('cookname')
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    // onReachBottom: function () {

    // },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})