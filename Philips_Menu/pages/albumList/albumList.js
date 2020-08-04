// pages/albumList/albumList.js
const app = getApp();
const setting = require("../../utils/setting.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumList: [],
    pageIndex:1,
    imgUrl: setting.setting.ImgURL,
    isOver:false
  },
  goBuildAlbum() {
    app.globalData.returnPath='../buildAlbum/buildAlbum'
    app.checkMember();
  },
  goAlbumDetail(e) {
    app.globalData.returnPath='../albumDetail/albumDetail'
    app.globalData.returnId=e.currentTarget.dataset.id
    app.checkMember();
  },
  AlbumQuery(){
    
    wx.showLoading({
      title: '加载中',
    });
    let params={
      rows:10, //一页多少
      page:this.data.pageIndex //第1页
    }
    setting.GET(params, "API/BasicData.ashx?_op=AlbumQuery", (data) => {
      wx.hideLoading()
      if (data.success) {
        
        if(data.rows.length){
          this.setData({
            albumList: this.data.albumList.concat(data.rows),
          })
          if(data.rows.length<10){
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
    this.setData({
      pageIndex:1,
      albumList: [],
    })
    this.AlbumQuery();
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
    this.AlbumQuery();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})