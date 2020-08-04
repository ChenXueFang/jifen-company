// pages/myCenter/myCenter.js
const app = getApp()
const setting = require("../../utils/setting.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: setting.setting.ImgURL,
        nick:'',
        headImg: '',
        isLogin: true,
        interestLabels:[],
        pageIndex:1,
        albumList: [],
        isOver:false
    },
    goRegister(){
        app.globalData.returnPath='../myCenter/myCenter'
        app.checkMember();
    },
    goInterestLabel(){
        app.globalData.returnPath='../interestLabel/interestLabel'
        app.checkMember();
    },
    goAlbumDetail(e){
        app.globalData.returnPath='../albumDetail/albumDetail'
        app.globalData.returnId=e.currentTarget.dataset.id
        app.checkMember();
    },
      querychoosedLabel(){
        wx.showLoading({
            title: '加载中',
          });
        setting.GET({}, "API/BasicData.ashx?_op=UserTagsQuery", (data) => {
          wx.hideLoading()
          if (data.success) {
            var list=data.data
            this.setData({
                interestLabels: list
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
    AlbumQuery(){
        wx.showLoading({
          title: '加载中',
        });
        let params={
          rows:9, //一页多少
          page:this.data.pageIndex //第1页
        }
        setting.GET(params, "API/BasicData.ashx?_op=AlbumQuery", (data) => {
          wx.hideLoading()
          if (data.success) {
            if(data.rows.length){
                this.setData({
                  albumList: this.data.albumList.concat(data.rows),
                })
                if(data.rows.length<9){
                  this.setData({
                    isOver:true
                  })
                }else{
                    this.setData({
                        isOver:false
                      })
                }
              }else{
                this.setData({
                  isOver:true
                })
              }
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var tel = wx.getStorageSync('mobile') ||app.globalData.mobile
        if(tel){
            this.setData({
                phoneNum: tel.replace(tel.substring(3,7), "****"),  //手机号中间四位替换
            })
        }
        this.setData({
            nick:wx.getStorageSync('nickName') || app.globalData.userInfo.NickName,
      headImg:wx.getStorageSync('avatarUrl') ||app.globalData.userInfo.HeadimgUrl,
      isLogin: wx.getStorageSync("vipUserId") || app.globalData.vipUserId,
        })
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
        this.querychoosedLabel();
        this.setData({
            pageIndex:1,
            albumList: [],
          })
        this.AlbumQuery();
        if(!this.data.phoneNum){
          var tel = wx.getStorageSync('mobile') ||app.globalData.mobile
        if(tel){
            this.setData({
                phoneNum: tel.replace(tel.substring(3,7), "****"),  //手机号中间四位替换
            })
        }
        }
        if(!this.data.isLogin && (wx.getStorageSync("vipUserId") || app.globalData.vipUserId))
        this.setData({
          isLogin: wx.getStorageSync("vipUserId") || app.globalData.vipUserId,
          nick:wx.getStorageSync('nickName') || app.globalData.userInfo.NickName,
      headImg:wx.getStorageSync('avatarUrl') ||app.globalData.userInfo.HeadimgUrl,
      })
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
        if(this.data.isOver)return
    this.setData({
      pageIndex:++this.data.pageIndex
    })
this.AlbumQuery()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})