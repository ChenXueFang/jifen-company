// pages/joinFamily/joinFamily.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/enter'
import dataApi2 from '../../services/myFamily'
import authApi from '../../services/dataapi'
import userApplyJoinApi from '../../services/userApplyJoin'
const setting = require("../../utils/setting.js");
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    Inp: "",
    isMom: false,
    isInvite: true,
    isShare: false,
    memberInfo: {},
    motherid: "",
    fath:'',
  },

  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  //新增邀请记录
  insertInviteRecord: async function () {
    var userr = this.data.fath == "Father" ? "Father" : 'Family';
    var that = this;
    var hr = await userApplyJoinApi.UserApplyJoin.insertInviteRecord({
      UserId: wx.getStorageSync("wxauth").userid,
      JoinMobile: this.data.Inp,
      ApplyRole: userr
    });
    if(hr.state==1){
      this.setData({
        isInvite: false,
        currentTab: 1
      })
    }
    // if (hr.state == 1 && hr.rows.length > 0) {
    //   this.setData({
    //     showIslogin: true,
    //     showIsInvite: true
    //   })
    // } else {
    //   this.setData({
    //     showIslogin: false,
    //     showIsInvite: false
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(e) {
    await authApi.wxApi.wxLoginCheck()
    var fath = e.fath;
    this.setData({ fath: fath });
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });
  },

  // 进入首页
  enterIndex: async function() {
    // debugger
    // var hr = await dataApi2.MyFamily.GetMyFamily(wx.getStorageSync('wxauth').userid);
    // if (hr && hr.data && hr.data.userInfo) {
    //   wx.switchTab({
    //     url: '../home/home'
    //   })
    // } else {
    //   wx.showToast({
    //     title: "妈妈还未审核，请等待！", //res.data.msg,
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    wx.switchTab({
      url: '../home/home'
    })
  },

  // 确认按钮 加入家庭，验证妈妈是否加入
  clickSur: async function() {
    await authApi.wxApi.wxLoginCheck()
    // debugger
    var that = this;
    var userr = this.data.fath == "Father" ? "Father" :'Family';
    // 设置爸爸角色
    var hr = await dataApi.Enter.CheckFamily({
      userId: wx.getStorageSync("wxauth").userid,
      phone: this.data.Inp
    });
    if (this.data.Inp !== '') {
      if (hr.state == 1) {
        var hrs = await dataApi.Enter.ApplyJoinFamily({
          UserId: wx.getStorageSync("wxauth").userid,
          phone: this.data.Inp,
          userRole: userr, 
          isJoin: false,
        });
        if (hrs.state == 1) {
          this.setData({
            isMom: true,
            isShare: false,
            motherid: hrs.data,
            memberInfo: hrs.rows[0]
          })
        }
      } else if (hr.state == -1){
        if (hr.msg =="不存在该妈妈的手机号"){
          this.setData({
            currentTab: 1,
            isMom: false,
            isInvite:true
          })
        } else if (hr.msg =="您已加入过该家庭，请勿重复申请"){
          wx.showToast({
            title: hr.msg,
            icon: 'none',
            duration: 2000
          })
          wx.switchTab({
            url: '../home/home'
          })
        }
      } else {
        this.setData({
          currentTab: 1,
          isMom: false
        })
      }
    } else {
      wx.showToast({
        title: "请输入妈妈手机号！", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },
  //重新输入
  resumeLoad:function(){
    this.setData({
      currentTab: 0,
      isMom: false,
      isInvite: true,
      isShare: false
    })
  },

  //检查家庭是否已经创建
  checkFamily:async function(){
    var that = this;
    // 设置爸爸角色
    var hr = await dataApi.Enter.CheckFamily({
      userId: wx.getStorageSync("wxauth").userid,
      phone: this.data.Inp
    });
    console.log(hr)
    if (this.data.Inp !== '') {
      if (hr.state == 1) {
        this.setData({
          currentTab: 2,
          isExite: true
        })
      } else {
        this.setData({
          currentTab: 2,
          isMom: false,
          isExite: false
        })
      }
    } else {
      wx.showToast({
        title: "请输入妈妈手机号！", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },

  //家庭已创建，点击进入，不需要审核
  enterFamily:async function(){
    var that = this;
    var userr = this.data.fath == "Father" ? "Father" : 'Family';
    // 设置爸爸角色
    var hr = await dataApi.Enter.ApplyJoinFamily({
      UserId: wx.getStorageSync("wxauth").userid,
      phone: this.data.Inp,
      userRole: userr, //Father
      isJoin: true,
    });
    console.log(hr)
    if (this.data.Inp !== '') {
      if (hr.state == 1) {
        this.setData({
          currentTab: 2,
          isExite: false
        })
        wx.switchTab({
          url: '../home/home'
        })
      } else {
        this.setData({
          currentTab: 2,
          isMom: false,
          isExite: true
        })
      }
    } else {
      wx.showToast({
        title: "请输入妈妈手机号！", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 获取input值,搜索框功能
  getInp: function(e) {
    this.setData({
      Inp: e.detail.value
    })
  },

  // 修改号码
  changePhone: function() {
    this.setData({
      Inp: '',
      isMom: false,
      isShare: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(state) {
    // console.log(`pages/applyJoin/applyJoin?id=${state.target.dataset.id}&mid=${this.data.motherid}`)
    if (this.data.currentTab == 0) {
      if (state.from === 'button') {
        // 来自页面内转发按钮
        console.log(state.target)
      }
      this.setData({
        isMom: false,
        isShare: true
      })
      return {
        title: '飞凡孕妈小程序',
        path: `pages/applyJoin/applyJoin?id=${state.target.dataset.id}&mid=${this.data.motherid}`,
        imageUrl: 'https://ffy.crmclick.com/adnim/upload/pic/index.png'
      }
    }
    if (this.data.currentTab == 1) {
      if (state.from === 'button') {
        // 来自页面内转发按钮
        console.log(state.target)
      }
      return {
        title: '飞凡孕妈小程序',
        path: `pages/myFamilyChange/myFamilyChange`,
        imageUrl: 'https://ffy.crmclick.com/adnim/upload/pic/index.png'
      }
    }
  },

  // 申请加入，分享记录日志接口 bindtap="shareFather"  : async function
  shareReapply() {
    app.getShareLog(13,'申请加入家庭')
    this.setData({
      isInvite: false
    })
  },

  // 邀请妈妈，分享记录日志接口 
  shareInvite() {
    app.getShareLog(14, '分享邀请妈妈审核')
    app.globalData.currentLocation = 1,
    app.globalData.invitetype=false
    this.insertInviteRecord() //新增邀请数据
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  //查询邀请记录
  getInviteRec: async function () {
    var that = this;
    var hr = await userApplyJoinApi.UserApplyJoin.GetInviteRecord({
      UserId: wx.getStorageSync("wxauth").userid,
      ApproveState: 0,
      PageSize: 1,
      PageIndex: 1,
      SortName: "createdtime",
      SortOrder: "desc"
    });
    console.log(hr)
    if (hr.state == 1 && hr.rows.length > 0) {
      this.setData({
        Inp: hr.rows[0].JoinMobile,
        fath: hr.rows[0].ApplyRole
      })
    } else {
      console.log("查无记录")
    }
    console.log("申请的手机号："+this.data.Inp)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.currentLocation == '') {
      this.setData({
        currentTab: 0,
        isInvite: false
      });
    } else {
      var i = app.globalData.currentLocation;
      console.log('onshow');
      console.log('i=' + i);

      this.setData({
        currentTab: i,
        isInvite: app.globalData.invitetype
      });
      this.getInviteRec()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

})