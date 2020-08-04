// pages/buildAlbum/buildAlbum.js
const setting = require("../../utils/setting.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldTitle:'',
    title:'',
    describe:'',
    ID:0
  },
  // deleteAlbum(){
  //   // wx.navigateBack({ })
  //   wx.redirectTo({
  //     url: '"../albumList/albumList",',
  //   })
  // },
  inputtitle(e){
    var value = e.detail.value;
    this.setData({
      title: value 
    })
    if(value.length>9){
      wx.showToast({
        title: '长度超出限制',
        icon:"none"
      })
    }
  },
  inputdescribe(e){
    var value = e.detail.value;
    this.setData({
      describe: value 
    })
    if(value.length>99){
      wx.showToast({
        title: '长度超出限制',
        icon:"none"
      })
    }
  },
  deleteAlbum(){
    if(this.data.oldTitle=='我的收藏'){
      wx.showToast({
        title: '我的收藏不可删除',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    this.handleAlbum('del')
  },
  saveAlbum(){
    if(!this.data.title){
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if(this.data.oldTitle=='我的收藏' && this.data.title!='我的收藏'){
      wx.showToast({
        title: '我的收藏标题不可修改',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    this.handleAlbum('add')
  },
  handleAlbum(oper){
    if(this.data.ID && oper=='add'){
      oper='edit'
    }
    wx.showLoading({
      title: '加载中',
    });
    let params={
      oper:oper,
      ID:this.data.ID,
      AlbumName:this.data.title,
      Remark:this.data.describe,
      H5UserID:wx.getStorageSync("vipUserId"),
      UnionID:wx.getStorageSync("unionidKey")
    }
    setting.POST(params, "API/BasicData.ashx?_op=SaveAlbum", (data) => {
      wx.hideLoading()
      if (data.success) {
        if(oper=='del'){
          wx.switchTab({
            url: '../albumList/albumList',
          })
        }else{
          wx.navigateBack({ })
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
  AlbumQuery(){
    wx.showLoading({
      title: '加载中',
    });
    let params={
      albumID:this.data.ID
    }
    setting.GET(params, "API/BasicData.ashx?_op=AlbumQuery", (data) => {
      wx.hideLoading()
      if (data.success) {
        this.setData({
          oldTitle:data.rows[0].AlbumName,
          title:data.rows[0].AlbumName,
    describe:data.rows[0].Remark,
          // albumList: data.rows 
        })
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
    this.setData({
      ID: options.ID || 0
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
    if(this.data.ID){
      this.AlbumQuery();
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})