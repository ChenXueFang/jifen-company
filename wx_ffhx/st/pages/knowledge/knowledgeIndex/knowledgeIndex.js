// pages/knowledge/knowledgeIndex/knowledge.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/knowledge'
import serveApi from '../../../servicesAPI/serveApi'
import register from '../../../servicesAPI/userRegister'
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    productList: [],
    illnessList: [],
    vipList: [],
    index: 1,
    indexV: 1,
    IsVIP: false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // this.setData({
    //   currentTab: options.currentTab
    // })

  },

  // 获取疾病教育文章列表--1
  gerIllnessList: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.gerArticleList({
      ClassType: 1,
      PageSize: 8,
      PageIndex: this.data.index,
      SortName: "CreatedTime",
      SortOrder: "desc",
      Q: "1"
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      that.setData({
        illnessList: this.data.illnessList.concat(hr.rows),
        index: this.data.index + 1
      })
    }
  },

  // 获取VIP教育文章列表--2
  getVipList: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.gerArticleList({
      UserIdGuid: wx.getStorageSync("wxauth").userid,
      ClassType: 2,
      PageSize: 8,
      PageIndex: this.data.indexV,
      SortName: "sortnum",
      SortOrder: "asc",
      Q: "1"
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      that.setData({
        vipList: this.data.vipList.concat(hr.rows),
        indexV: this.data.indexV + 1
      })
    }
  },

  //下拉刷新
  onPullDownRefresh: function() {
    // console.log(111);
    this.setData({
      illnessList: [],
      vipList: [],
      index: 1,
      indexV: 1
    })
    wx.stopPullDownRefresh(); //停止下拉刷新 
    this.gerIllnessList();
    if (this.data.IsVIP) {
      this.getVipList();
    }
  },
  //上拉加载
  onReachBottom: function() {
    // console.log(222);
    var that = this;
    this.gerIllnessList();
    if (this.data.IsVIP == true) {
      this.getVipList();
    }
  },

  // 获取产品列表
  getProductList: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.getProductList({
      SortName: "productType",
      SortOrder: "asc",
      PageSize: 100,
      PageIndex: 1
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      that.setData({
        productList: hr.rows,
      })
    }
  },

  //tab点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    if (this.data.currentTab == 0) {
      app.getEventLog("productDescription-button") //产品说明
    }
    if (this.data.currentTab == 1) {
      app.getEventLog("diseaseEducation-button") //疾病教育
    }
    if (this.data.currentTab == 2) {
      app.getEventLog("vipEducation-button") //VIP教育
    }
  },

  // 查询是否开启vip
  getVIPState: async function() {
    var that = this;
    var hr = await serveApi.serveApi.getVIPState({
      userId: wx.getStorageSync("wxauth").userid
    });

    if (hr.state == 1) {
      this.setData({
        IsVIP: hr.data
      })

      // 已开启vip,调vip文章列表
      if (this.data.IsVIP) {
        this.getVipList();
      }
    }
  },

  // vip服务，输入邀请码
  toVipServe: async function() {
    //判断是否有家庭组, 有才能输入vip邀请码
    var hrcheck = await register.UserRegister.GetMyFamily({
      userId: wx.getStorageSync("wxauth").userid,
      isCheckedState: false
    });
    if (hrcheck.state == 1) {
      if (hrcheck.data != null && hrcheck.data != "") {
        if (hrcheck.data.userInfo.Status == 1) {
          wx.navigateTo({
            url: `../../vipServe/inviteCode/inviteCode?name=${"knowledge"}`, //有家庭组，跳转到输入邀请码页面
          })
        }
      } else {
        setTimeout(function () {
          wx.showToast({
            title: "您还没有注册，请返回首页绑定设备。",
            icon: 'none',
            duration: 2000
          })
        },900)
        setTimeout(function() {
          wx.switchTab({
            url: '../../index/index',
          })
        }, 2000)
      }
    }else{
      wx.showToast({
        title: hrcheck.msg,
        icon: 'none',
        duration: 2000
      })
    }
    setTimeout(function () {
      app.getEventLog("enterInviteCode-button")
    }, 2000)
  },

  // 搜索
  tosearch(e) {
    wx.navigateTo({
      url: `../search/search?type=${e.currentTarget.dataset.type}&classtype=${e.currentTarget.dataset.classtype}`,
    })
  },

  // 疾病，vip教育文章
  toIllnessEssay(e) {
    wx.navigateTo({
      url: `../illnessEssay/illnessEssay?guid=${e.currentTarget.dataset.guid}&classtype=${e.currentTarget.dataset.classtype}&pageto=`,
    })
  },

  // 产品说明
  toProductDescription(e) {
    // 跳转到菜单页面
    if (e.currentTarget.dataset.isonlyvideo == false) {
      wx.navigateTo({
        url: `../productDescription/productDescription?producttype=${e.currentTarget.dataset.producttype}`,
      })
    }
    // 跳转到视频页面
    if (e.currentTarget.dataset.isonlyvideo == true) {
      // wx.navigateTo({
      //   url: `../productVideo/productVideo?productid=${e.currentTarget.dataset.productid}`,
      // })
      app.getEventLog("video-button")
      setTimeout(() => {
        wx.showToast({
          title: '尚未发布',
          icon: 'none',
          duration: 3000
        });
        setTimeout(() => {
          wx.hideToast();
        }, 2000)
      }, 200);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    let hr = await authApi.wxApi.wxLoginCheck()
    app.getEventLog("knowledgeIndex-page")
    if ((hr.data != undefined && hr.data.isLogin) || hr.isLogin) {
      this.getVIPState(); //查询是否开启vip，登录能查询是否开启vip
    }
    // this.setData({
    //   currentTab: app.globalData.currentTab
    // })

    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })
    this.getProductList();
    this.gerIllnessList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer("knowledgeIndex-page", "", vtime, this.data.time2);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer("knowledgeIndex-page", "", vtime, this.data.time2);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    app.getPageShare("knowledgeIndex-page", "", "pages/knowledge/knowledgeIndex/knowledgeIndex")
    return {
      title: '管理更智能，关护更贴心',
      path: `pages/knowledge/knowledgeIndex/knowledgeIndex`,
      imageUrl: '../../../images/shareImg.png'
    }
  }
})