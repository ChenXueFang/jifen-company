// pages/cookDetail/cookDetail.js
const app = getApp();
const setting = require("../../utils/setting.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: setting.setting.ImgURL,
        shareBox2: false,
        carouselList: [],
        menuList: [],
        visible2: false,
        CookBookName: '',
        CreateTime: '',
        ImagesList: [],
        CookBookType: null,
        cookid: '',
        pageIndex: 1,
        showVideo: false,
        isHttp: false,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            cookid: options.cookid
        })
        this.getCookDetail();
    },

    // 点赞操作
    loveBind() {
        wx.showLoading({
            title: '加载中',
        });
        if (this.data.IsLikes == false) {
            setting.POST({
                CookBookID: this.data.CookBookID,
                oper: 'add',
                ID: '',
                H5UserID: wx.getStorageSync("vipUserId"),
                UnionID: wx.getStorageSync("unionidKey")
            }, "API/BasicData.ashx?_op=CookBookLikes", (data) => {
                wx.hideLoading()
                this.setData({
                    IsLikes: true,
                    LikesCount: this.data.LikesCount + 1,
                    LikesID: data.data.ID,
                })
            }, (err) => {
                wx.hideLoading()
            }, false);
        } else {
            setting.POST({
                CookBookID: this.data.CookBookID,
                oper: 'del',
                ID: this.data.LikesID,
                H5UserID: wx.getStorageSync("vipUserId"),
                UnionID: wx.getStorageSync("unionidKey")
            }, "API/BasicData.ashx?_op=CookBookLikes", (data) => {
                wx.hideLoading()
                this.setData({
                    IsLikes: false,
                    LikesCount: this.data.LikesCount - 1
                })
            }, (err) => {
                wx.hideLoading()
            }, false);
        }
    },

    // 获取菜谱详情
    getCookDetail() {
        wx.showLoading({
            title: '加载中',
        });
        var that = this;
        setting.GET({
            CookBookID: this.data.cookid
        }, "API/BasicData.ashx?_op=CookBookDetail", (data) => {
            wx.hideLoading()
            var cookDetail = data.data.CookBook
            var CookBookType = []
            var typeArr = data.data.CookBookType
            var Steps = data.data.Steps
            // 菜谱类型提取
            for (var i in typeArr) {
                CookBookType.push(typeArr[i].Name)
                CookBookType.join(',')
            }
            // 判断做法步骤中的图片是否带域名
            Steps.map(a=>{
                if(a.ImageUrl.substring(0,4)=='http'){
                    this.setData({
                        isHttp: true
                    })
                }
            })
            this.setData({
                CookBookID: cookDetail.CookBookID, //菜谱详情
                CookBookName: cookDetail.CookBookName, // 菜谱名称
                CookBatching: cookDetail.CookBatching, // 菜谱简介
                CreateTime: cookDetail.CreateTime.substring(0, 10), // 菜谱日期
                LikesCount: cookDetail.LikesCount, //点赞数
                PreparationTime: cookDetail.PreparationTime, //准备时间
                CookingTime: cookDetail.CookingTime, //料理时间
                Edibles: cookDetail.Edibles, //食用人数
                IsLikes: cookDetail.IsLikes, //喜欢
                LikesID: cookDetail.LikesID, //喜欢id
                Foods: data.data.Foods, //食材
                ImagesList: data.data.ImagesList, //轮播
                Steps: Steps, //步骤
                Tips: data.data.Tips, //小贴士
                CookBookType: CookBookType, //菜谱类型
            })
            // 轮播中加视频
            if (cookDetail.Resource.Url != '') {
                this.data.ImagesList.unshift({
                    type: 'video',
                    ImageUrl: cookDetail.ImageUrl,
                    url: cookDetail.Resource.Url
                })
                this.setData({
                    ImagesList: this.data.ImagesList
                })
            }
        }, (err) => {
            wx.hideLoading()
        }, false);
    },

    //页面滚动一定高度隐藏浮动按钮
    onPageScroll: function (e) {
        // console.log('页面向上滚动的距离：' + e.scrollTop)
        if (e.scrollTop >= 400) { //临界值，根据自己的需求来调整
            this.setData({
                shareBox2: true, //是否固定导航栏
            })
        } else {
            this.setData({
                shareBox2: false,
            })
        }
    },

    // 收藏框
    openAlbum() {
        this.setData({
            pageIndex: 1,
            menuList: [],
        })
        this.AlbumQuery()
        // this.setData({
        //     visible2: true
        // });
    },
    // 关闭专辑框-收藏
    closeAlbum() {
        this.setData({
            visible2: false
        });
    },
    AlbumQuery() {
        wx.showLoading({
            title: '加载中',
        });
        let params = {
            rows: 5, //一页多少
            page: this.data.pageIndex //第1页
        }
        setting.GET(params, "API/BasicData.ashx?_op=AlbumQuery", (data) => {
            wx.hideLoading()
            if (data.success) {
                if (data.rows.length) {
                    this.setData({
                        menuList: this.data.menuList.concat(data.rows),
                    })
                    if (data.rows.length < 5) {
                        this.setData({
                            isOver: true
                        })
                    } else {
                        this.setData({
                            isOver: false
                        })
                    }
                } else {
                    this.setData({
                        isOver: true
                    })

                }
                // this.setData({
                //     menuList: data.rows,
                //     pageIndex:this.data.pageIndex++
                // })
                this.setData({
                    visible2: true
                });
            } else {
                wx.showToast({
                    title: data.msg,
                    icon: 'none',
                    duration: 2000,
                })
            }
        }, (err) => {
            wx.hideLoading()
            console.log(err)
        }, false);
    },
    saveAlbumCookBook(e) {
        wx.showLoading({
            title: '加载中',
        });
        let params = {
            albumID: e.currentTarget.dataset.id,
            albumName: e.currentTarget.dataset.name,
            cookbookID: this.data.cookid
        }
        setting.GET(params, "API/BasicData.ashx?_op=SaveAlbumCookBook", (data) => {
            wx.hideLoading()
            if (data.success) {
                wx.showToast({
                    title: '收藏成功'
                })
                this.setData({
                    visible2: false,
                });

            } else {
                wx.showToast({
                    title: data.msg,
                    icon: 'none',
                    duration: 2000,
                })
            }
        }, (err) => {
            wx.hideLoading()
            console.log(err)
        }, false);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (res) {
        this.videoContext = wx.createVideoContext('myVideo')
    },
    //播放视频
    bindplay: function () {
        this.setData({
            showVideo: true
        });
        this.videoContext.play();
    },
    //暂停视频
    bindpause: function () {
        this.setData({
            showVideo: false,
        });
        this.videoContext.pause();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if(this.data.visible2){
            this.setData({
                pageIndex: 1,
                menuList: [],
            })
            this.AlbumQuery()
        }
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
    scrolltolower() {
        if (this.data.visible2) {
            if (this.data.isOver) return
            this.setData({
                pageIndex: ++this.data.pageIndex
            })
            this.AlbumQuery()
        }
    },
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var s = "share";
        var v = this.data.CookBookID;
        var c = wx.getStorageSync("vipUserId");
        //记录转发数据
        setting.GET({
            CookBookID: this.data.CookBookID,
            shareContent: "飞利浦菜谱小程序",
            s: s,
            v: v,
            c: c
        }, "API/BasicData.ashx?_op=SaveShare", (data) => {
            // console.log("记录转发数据")
        }, (err) => {
            // console.log(err)
        }, false);

        //定义this指向
        var that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '飞利浦菜谱小程序',
            path: '/pages/cookDetail/cookDetail?cookid=' + that.data.CookBookID,
            imageUrl: that.data.ImgURL + that.data.shareImg
        }
    },
})