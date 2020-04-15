// surebtn// pages/myFamily/myFamily.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import dataApi from '../../services/myFamily'
import authApi from '../../services/dataapi'
import userApplyJoinApi from '../../services/userApplyJoin'

const app = getApp()
const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    showModal: false,
    showModalExit: false,
    familyid: '',
    userid: '',
    showView: true, //家庭名称
    showRoleView: true, //角色
    showIslogin: true,
    showExit:false,
    familyNa: {},
    familyMem: [],
    uinfo: {},
    unLoginYCQ: '',
    roleArray: ['Father', 'Family'],
    //'Mather',
    roleArray1: [
      // { code: 'Mather', name: '妈妈' },
      {
        code: 'Father',
        name: '爸爸'
      }, {
        code: 'Family',
        name: '家人'
      }
    ],
    index: -1,
    yWeek: 0, //孕周
    leaveDays: 0, //距离预产期天数
    famName: '', //修改的家庭名称
    myRole:"",
    urole: '',
    motherInfo: {},
    fatherInfo: {},
    hasFather:true,
    familyInfo: {},
    familyMemberId: 0,
    isExit: false,
    total: 0,
    isRead: false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  //问题反馈
  toFeedBack() {
    wx.navigateTo({
      url: 'feelBack/feelBack'
    })
    this.setData({
      isRead: true
    })
  },
  // 家庭成员
  ToFamilyMember: function() {
    wx.navigateTo({
      url: '../myFamilyMember/myFamilyMember'
    })
  },
  // 切换家庭
  toMyFamilyChange() {
    wx.navigateTo({
      url: '../myFamilyChange/myFamilyChange'
    })
  },
  //输入家庭名称
  getFaName: function(e) {
    this.setData({
      famName: e.detail.value.replace(/\s+/g, '')
    })
  },
  //显示家庭名称修改按钮
  showButton: function() {
    this.setData({
      showView: !this.data.showView
    })
  },
  //邀请记录
  inviteRecord:async function(){
    console.log("邀请记录")
    var that = this;
    let usid = wx.getStorageSync("wxauth").userid
    var hr = await dataApi.MyFamily.GetMyFamily(usid);
    if (hr.data != null && hr.data.userInfo) {
      this.onShow()
      app.globalData.currentLocation = 1,
        app.globalData.invitetype = false,
        wx.navigateTo({
          url: '../joinFamily/joinFamily'
        })
    } else {
      app.globalData.currentLocation = 1,
        app.globalData.invitetype = false,
      wx.navigateTo({
        url: '../joinFamily/joinFamily'
      })
    }
  },
  //修改家庭名称
  surebtn: async function() {
    this.setData({
      showView: !this.data.showView
    })
    if (this.data.famName == '') {
      wx.showToast({
        title: "请输入家庭名称！", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this;
      var hr = await dataApi.MyFamily.updateFamileName(this.data.familyNa.FamilyId, {
        familyName: this.data.famName
      });
      app.getEventLog(33);
      if (hr.state) {
        setTimeout(function () {
          wx.showToast({
            title: hr.msg,
            icon: 'none',
            duration:2000
          });
        }, 300)
      }
      this.getFamilyinfo();
    }
  },
  //修改宝宝管理 ，选择预产期
  bindDateChange: async function(e) {
    // console.log('预产期:', e.detail.value)
    this.setData({
      date: e.detail.value,
      unLoginYCQ: e.detail.value
    })
    wx.setStorageSync('unLoginYCQ', e.detail.value)

    var that = this;

    var hr = await dataApi.MyFamily.setExpectDate({
      UserId: wx.getStorageSync("wxauth").userid,
      EcpectDate: this.data.date,
    });
    if (hr.state == 1) {
      this.selYWeekAndDay();
    } else {
      wx.showToast({
        title: hr.msg,
        icon: 'none',
        duration: 1500
      });
    }

  },
  //根据用户获取我的家庭相关信息
  getFamilyinfo: async function() {
    var that = this;
    let usid = wx.getStorageSync("wxauth").userid
    var hr = await dataApi.MyFamily.GetMyFamily(usid);
    if (hr.data != null) {
      var urole = hr.data.userInfo
      var roleinfo = hr.data.familyMemberList.filter((a) => {
        return a.UserId == wx.getStorageSync("wxauth").userid
      })
      urole.UserRole = roleinfo[0].UserRole == null ? 'Family' : roleinfo[0].UserRole
      wx.setStorageSync('myrole', urole)
      wx.setStorageSync('familyId', hr.data.familyName);

      var logininfo = wx.getStorageSync("wxauth")
      logininfo.isLogin = true
      wx.setStorageSync('wxauth', logininfo)

      this.setData({
        myRole: wx.getStorageSync("myrole").UserRole
      })

      let motherInfo = hr.data.familyMemberList.filter((a) => {
        return a.UserRole == 'Mather'
      })[0]; //妈妈
      let fatherInfo = {};
      let fatherInfoArray = hr.data.familyMemberList.filter((a) => {
        return a.UserRole == 'Father'
      }); //爸爸
      if (fatherInfoArray.length > 0) {
        fatherInfo = fatherInfoArray[0]
      }
      let familyInfo = hr.data.familyMemberList.filter((a) => {
        return a.UserRole == 'Family' || a.UserRole == null
      }); //家人
      that.setData({
        familyid: hr.data.familyName.FamilyId,
        userid: hr.data.familyName.UserId,
        showIslogin: false,
        motherInfo: motherInfo,
        fatherInfo: fatherInfo,
        familyInfo: familyInfo,
        familyMemberId: hr.data.familyMemberList.filter((a) => {
          return a.UserId == wx.getStorageSync("wxauth").userid
        })[0].FamilyMemberId,
      })

      // 判断是否有爸爸
      var fatherLength = Object.keys(this.data.fatherInfo).length;
      if (fatherLength != 0) {
        this.setData({
          hasFather: true
        })
      }else if (fatherLength == 0 && this.data.myRole == "Mather") {
        this.setData({
          hasFather: false
        })
      } else if (fatherLength == 0 && this.data.myRole != "Mather") {
        this.setData({
          hasFather: true
        })
      }

      var eduindex = -1;
      if (hr.data.userInfo.UserRole != null || hr.data.userInfo.UserRole != '') {
        for (var i = 0; i < this.data.roleArray1.length; i++) {
          if (hr.data.userInfo.UserRole == this.data.roleArray1[i].code) {
            eduindex = i
          }
        }
      }

      if (eduindex >= 0) {
        that.setData({
          familyNa: hr.data.familyName,
          familyMem: hr.data.familyMemberList,
          uinfo: hr.data.userInfo,
          index: eduindex,
          urole: this.data.roleArray1[eduindex]
        })
      } else {
        that.setData({
          familyNa: hr.data.familyName,
          familyMem: hr.data.familyMemberList,
          uinfo: hr.data.userInfo,
          index: eduindex,
          urole: [{
            code: 'Mather',
            name: '妈妈'
          }]
        })
      }

    } else {
      this.setData({
        familyid: '',
        userid: '',
        familyNa: '',
        familyMem: [],
        uinfo: {},
        index: -1,
        urole: '',
        yWeek: 0,
        leaveDays: 0,
        motherInfo: {},
        familyInfo: {},
        fatherInfo: {},
        // showIslogin: true,
      })
      var logininfo = wx.getStorageSync("wxauth")
      logininfo.isLogin = false
      wx.setStorageSync('wxauth', logininfo)

      wx.setStorageSync('yqinfo', '')
      wx.setStorageSync('myrole', '')
      wx.setStorageSync('familyId', '');
      this.setData({
        showIslogin: true
      })
    }

    this.getInviteRec();
  },

  //根据用户获取孕周
  selYWeekAndDay: function() {
    var that = this;
    setting.POST({
      UserId: wx.getStorageSync("wxauth").userid
    }, "/api/Users/GetGestationalAge", (data) => {
      if (data.rows.length > 0) {
        this.setData({
          yWeek: data.rows[0].ageWeek,
          leaveDays: data.rows[0].leaveDays,
        })
      }
    }, (error) => {
      if (error.errMsg) {}
    }, false)
  },
  //分享邀请:
  showminiapp: function() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  //注册我的家庭
  toEnterPro: function() {
    wx.navigateTo({
      url: '../enterPro/enterPro'
    })
  },
  //查询邀请记录
  getInviteRec: async function () {
    var that = this;
    var hr = await userApplyJoinApi.UserApplyJoin.GetInviteRecord({
      UserId: wx.getStorageSync("wxauth").userid,
      ApproveState: 0,
      PageSize: 100,
      PageIndex: 1
    });
    console.log("根据用户查询邀请记录")
    console.log(hr)
    if (hr.state == 1 && hr.rows.length > 0) {
      this.setData({
        showIslogin: false,
        showIsInvite: true
      })
    } else {
      if (wx.getStorageSync("familyId")!=""){
        this.setData({
          showIslogin: false,
          showIsInvite: false,
          showExit:true
        })
      }else{
        this.setData({
          showIslogin: true,
          showIsInvite: false,
          showExit:false
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
  },

  // 模态框弹窗
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  showDialogExit: function() {
    this.setData({
      showModalExit: true
    })
  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  hideModalExit: function() {
    this.setData({
      showModalExit: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  onCancelExit: function() {
    this.hideModalExit();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    this.hideModal();
    wx.navigateTo({
      url: '../enterPro/enterPro'
    })
  },
  onConfirmExit: async function() {
    // 模态框确定按钮，退出家庭
    if (this.data.familyMemberId && this.data.familyMemberId != this.data.motherInfo.FamilyMemberId) {
      var that = this;
      var hr = await dataApi.MyFamily.exitFamily({
        userId: wx.getStorageSync("wxauth").userid,
        familyMemberId: this.data.familyMemberId,
      });
      if (hr.state) {
        setTimeout(function(){
          wx.showToast({
            title: hr.msg,
            icon: 'none'
          })
        },400);
        if (hr.state == 1) {
          app.getEventLog(41);
          this.getFamilyinfo();
        }
      }
    }
    this.hideModalExit();
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
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })

    //加载我的家庭信息
    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      this.setData({
        showIslogin: true
      })

      var unycq = ''
      if (wx.getStorageSync('unLoginYCQ') != "" || wx.setStorageSync('unLoginYCQ') != null || wx.setStorageSync('unLoginYCQ') != undefined) {
        unycq = wx.getStorageSync('unLoginYCQ')
      }
      this.setData({
        showIslogin: true,
        unLoginYCQ: unycq
      })
    } else {
      this.setData({
        showIslogin: false
      })

      this.notReadNum();
      this.selYWeekAndDay();
    }
    app.getEventLog(32)
    this.getFamilyinfo();

  },

  // 反馈消息未读数字
  notReadNum: async function() {
    var that = this;
    var hr = await dataApi.MyFamily.notReadNum({
      UserId: wx.getStorageSync("wxauth").userid,
      IsRead: false,
      PageSize: 999,
      PageIndex: 1
    });
    if (hr.state == 1 && hr.rows && hr.rows.length > 0) {
      this.setData({
        isRead: false,
        total: hr.total
      })
    }
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
      app.getPageTimer(32, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(32, this.data.TempId, vtime, this.data.time2);
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    return {
      title: '飞凡孕妈小程序',
      path: `/pages/inviteShare/inviteShare?motherid=${this.data.userid}&familyid=${this.data.familyid}&inviterole=${e.target.dataset.inviterole}`,
      imageUrl: 'https://ffy.crmclick.com/adnim/upload/pic/index.png', //用户分享出去的自定义图片大小为5:4,
    }
  },

  // 妈妈添加成员，分享记录日志接口 bindtap="shareMyMemberInvite"  : async function
  shareMyMemberInvite() {
    app.getShareLog(15, '妈妈邀请家人加入家庭')
  },
})