// pages/essay/essay.js
//获取应用实例
const app = getApp();
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
const setting = require("../../utils/setting.js");
import dataApi from '../../services/classroom'
import authApi from '../../services/dataapi'
const util = require("../../utils/util.js")
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Act:{},
    html:"",
    ArticleId:0,
    isFav:false,
    openid: '',
    UserId:'',
    showInput: false, //控制输入栏
    inputMessage: '',
    commCount: 0,
    commList: [],
    isCanOPer: true,
    isUnCanOPer: true,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  //点击出现输入框
  showInputW: async function () {
    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "注册后才可以评论哦，请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        showInput: true
      })
    }
  },
  //隐藏输入框
  onHideInput: function () {
    this.setData({
      showInput: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await authApi.wxApi.wxLoginCheck()
    var id = options.id;
   
    this.setData({ ArticleId: id })
    this.getEssay();
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    }); 
    this.getcomm()
  },

  // 取消收藏功能
  cancelcollection: async function (){
    // console.log("取消收藏");
    var hr = await dataApi.CancelCollection.CancleApi({
      ArticleId: this.data.ArticleId,
      UserId: wx.getStorageSync("wxauth").userid
    });
    if (hr.state===1) {
      this.setData({
        isFav: false
      })
    }
  },
  
  // 收藏功能
  collection: async function(){
    var that = this;
    var hr = await dataApi.Collection.CollecApi({
      ArticleId: this.data.ArticleId,
      UserId: wx.getStorageSync("wxauth").userid
    });
    if (hr.state === 1) {
      that.setData({
        isFav: true
      })
    }
  },

  // 获取文章
  getEssay: async function () {
    // console.log("获取文章")
    var that = this;
    var hr = await dataApi.GetEssay.GetById({
      id: this.data.ArticleId,
      UserId: wx.getStorageSync("wxauth").userid
    });
    if (hr.rows != null && hr.rows.length === 1) {
      that.setData({
        Act: hr.rows[0],
        html: hr.rows[0].Content,
        isFav: hr.rows[0].Status==2
      })
      var that = this;
      WxParse.wxParse('article', 'html', hr.rows[0].Content, that, 0);
    }
  },
  // 获取文章结束
  //获取文章评论
  getcomm: async function () {
    var that = this;
    var hr = await dataApi.Comment.GetAllCommentByArticleId({
      ArticleId: this.data.ArticleId,
      IsVerify: 1,
      PageSize: 10,
      PageIndex: 1,
      SortName: "CreatedTime",
      SortOrder: "desc",
      Q: wx.getStorageSync("wxauth").userid
    });
    if (hr.state === 1) {
      that.setData({
        commCount: hr.rows.length,
        commList: hr.rows,
        isCanOPer: true,
        isUnCanOPer: true
      })
    }

  },
  //输入的评论
  bindInputMsg: function (e) {
    this.setData({
      inputMessage: e.detail.value
    })
  },
  //新增评论
  insertComm: async function () {
    if (this.data.inputMessage == '' || this.data.inputMessage == null) {
      wx.showToast({
        title: "请填写评论再提交哦！",
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this;
      var hr = await dataApi.Comment.InsertComment({
        ArticleId: this.data.ArticleId,
        UserId: wx.getStorageSync("wxauth").userid,
        CommentContent: this.data.inputMessage,
        IsVerify: 0
      });
      if (hr.state === 1) {
        that.setData({
          inputMessage: '',
          showInput: false
        })
        wx.showToast({
          title: "评论成功，请等待审核！",
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: hr.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  //点赞
  dzoper: async function (e) {
    if (this.data.isCanOPer) {
      this.setData({
        isCanOPer: false
      })
      var commid = e.currentTarget.dataset.conmentid;
      var hr = await dataApi.CommentStar.InsertCommentStar({
        UserId: wx.getStorageSync("wxauth").userid,
        CommentId: commid,
        Status: 0,
      });
      if (hr.state == 1) {
        this.getcomm()
      }
    } else {
      wx.showToast({
        title: "请勿重新点赞！",
        icon: 'none',
        duration: 2000
      })
    }
  },
  //取消点赞
  undzoper: async function (e) {
    if (this.data.isUnCanOPer) {
      this.setData({
        isUnCanOPer: false
      })
      var commstarid = e.currentTarget.dataset.conmentstarid;
      var hr = await dataApi.CommentStar.deleteCommentStar(commstarid);
      if (hr.state == 1) {
        this.getcomm()
      }
    }
  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function (state) {
    if (state.from === 'button') {
      // 来自页面内转发按钮
      console.log(state.target)
    }
    return {
      title: '飞凡孕妈小程序',
      path: `pages/essay/essay?id=${this.data.ArticleId}`,
      imageUrl:'https://ffy.crmclick.com/adnim/upload/pic/index.png',
      success: function (state) {
        //this.share();
        // 转发成功
        console.log("转发成功:" + JSON.stringify(state));
        // wx.navigateTo({
        //   url: '../essay/essay?id=' + e.currentTarget.dataset.id
        // })
      },
      fail: function (state) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(state));
      }
    }
  },
  // 分享接口
  share: async function (){
    var that = this;
    var hr = await dataApi.Collection.Share({
      id: this.data.ArticleId,
      openid: wx.getStorageSync("wxauth").openid
    });
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
    app.getEventLog(74)

    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(74, this.data.ArticleId, vtime, this.data.time2);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(74, this.data.ArticleId, vtime, this.data.time2);
    }
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

  }
})