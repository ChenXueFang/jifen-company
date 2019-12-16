// pages/home/home.js
const app = getApp()
const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import authApi from '../../services/dataapi'
import dataApi from '../../services/myFamily'
import userApplyJoinApi from '../../services/userApplyJoin'
import ulrApi from '../../services/userLinkRecord'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否连接接口
    isconnectweb:false,
    showIslogin: false,
    showIsInvite:false,
    showyhq:false,
    yhqRF:false,
    showModal: false,
    yWeek: '',
    yDay: '',
    ishidd: true,
    bigSr:false,
    isshowweekdanday:false,
    myRole: '',
    isLogin: false,
    usedTopThree: [{
      code: "1",
      name: "每日记录",
      hpic: "himg1",
      toLink: "toDailyRecord"
    }, {
      code: "3",
      name: "产检",
      hpic: "himg3",
      toLink: "toLaborChart"
    }, {
      code: "4",
      name: "每日一读",
      hpic: "himg4",
      toLink: "toClassRoom"
    }, {
      code: "5",
      name: "孕期日记",
      hpic: "himg5",
      toLink: "toMyDiary"
    }, {
      code: "6",
      name: "运动目标",
      hpic: "himg6",
      toLink: "toExerciseTarget"
    }, {
      code: "7",
      name: "我的积分",
      hpic: "himg7",
      toLink: "toMyIntegral"
    }], //所有模块
    topinfo1: {
      code: "1",
      name: "每日记录",
      hpic: "himg1",
      toLink: "toDailyRecord"
    },
    topinfo2: {
      code: "4",
      name: "每日一读",
      hpic: "himg4",
      toLink: "toClassRoom"
    },
    topinfo3: {
      code: "3",
      name: "产检",
      hpic: "himg3",
      toLink: "toLaborChart"
    },
    openid: '',
    isYDPic1: true,
    isYDPic2: false,
    isHasNewMessage:false,
    bigScreen:false,
    homeBgFour: false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //四维彩超
  toFourColor: function () {
    app.getEventLog(100)
    wx.navigateTo({
      url: '../fcolorUltrasound/fcolorUltrasound'
    })
  },
  //跳转到消息列表
  toMessageList: function() {
    app.getEventLog(19)
    wx.navigateTo({
      url: '../messageList/messageList'
    })
  }, 

  //积分签到
  addScore: function() {
    app.getEventLog(18);
    // 跳转到每日签到页面
    wx.navigateTo({
      url: '../signIn/dailySign/dailySign'
    })

    // var date = new Date();
    // var seperator1 = "-";
    // var year = date.getFullYear();
    // var month = date.getMonth() + 1;
    // var strDate = date.getDate();
    // if (month >= 1 && month <= 9) {
    //   month = "0" + month;
    // }
    // if (strDate >= 0 && strDate <= 9) {
    //   strDate = "0" + strDate;
    // }
    // var currentdate = year + seperator1 + month + seperator1 + strDate;

    // var betime = currentdate + " 00:00:00";
    // var endtime = currentdate + " 23:59:59";
    // //查询是否已签到
    // var that = this;
    // setting.POST({
    //   PageSize: 1,
    //   PageIndex: 1,
    //   UserId: wx.getStorageSync("wxauth").userid,
    //   UserRole: wx.getStorageSync("myrole").UserRole,
    //   FamilyId: wx.getStorageSync("familyId").FamilyId,
    //   FromWay:"积分签到",
    //   CreatedTimeBegin: betime,
    //   CreatedTimeEnd: endtime
    // }, "/api/UserPoint/GetListBySC", (data) => {
    //   if (data.rows.length != 0) {
    //     wx.showToast({
    //       title: '今日已签到',
    //       icon: 'none',
    //       duration: 2000
    //     });
    //     // wx.navigateTo({
    //     //   url: '../myIntegral/myIntegral'
    //     // })
    //   } else {
    //     console.log("今日未签到")
    //     this.setData({
    //       ishidd: false
    //     })
    //     setting.POST({
    //       UserId: wx.getStorageSync("wxauth").userid,
    //       UserRole: wx.getStorageSync("myrole").UserRole,
    //       FamilyId: wx.getStorageSync("familyId").FamilyId,
    //       FromWay: "积分签到",
    //       PointCount: 10
    //     }, "/api/UserPoint/Post", (data) => {
    //       //新增积分调用动画
    //       var animation = wx.createAnimation({
    //         duration: 3000,
    //         timingFunction: 'ease',
    //         delay: 100
    //       });
    //       animation.opacity(0).translate(0, -15).step()
    //       this.setData({
    //         ani: animation.export()
    //       })

    //     }, (error) => {
    //       if (error.errMsg) {}
    //     }, false)
    //   }
    // }, (error) => {
    //   if (error.errMsg) {

    //   }
    // }, false)
  },
  //每日记录
  toDailyRecord: function() {
    app.getEventLog(1)
    wx.navigateTo({
      url: '../dailyRecord/index/index'
    })
    // if (this.data.isLogin) {
    //   if (authApi.wxApi.myFimilyCheck()) {
    //     wx.showToast({
    //       title: '您未加入家庭！',
    //       icon: 'none'
    //     });
    //     return;
    //   } else {
    //     app.getEventLog(1)
    //     wx.navigateTo({
    //       url: '../dailyRecord/index/index'
    //     })
    //   }
    // } else {
    //   wx.navigateTo({
    //     url: '../enterPro/enterPro'
    //   })
    // }
  },
  //孕妈课堂
  toClassRoom: function() {
    app.getEventLog(4)
    wx.navigateTo({
      url: '../classRoom/classRoom'
    })
  },
  //与宝宝对话
  toDialogue: function() {
    app.getEventLog(2)
    wx.navigateTo({
      url: '../dialogue/dialogue'
    })
  },
  //产检表
  toLaborChart: function() {
    app.getEventLog(3)
    wx.navigateTo({
      url: '../laborChart/laborChart'
    })
  },

  //根据用户获取孕周孕天
  selYWeekAndDay: function() {
    var that = this;
    setting.POST({
      UserId: wx.getStorageSync("wxauth").userid
    }, "/api/Users/GetGestationalAge", (data) => {
      console.log(data)
      if (data.rows.length > 0) {
        this.setData({
          yWeek: data.rows[0].ageWeek,
          yDay: data.rows[0].ageDay,
          isshowweekdanday:true
        })
        wx.setStorageSync('yqinfo', data.rows[0])

        if (this.data.yWeek >= 26 && this.data.yWeek <= 30) {
          //检查是否已选套餐
          this.checkTC()
        }else{
          this.setData({
            homeBgFour: false
          })
        }
      }else{
        this.setData({
          isshowweekdanday: false
        })
        wx.setStorageSync('yqinfo', '')
      }
    }, (error) => {
      if (error.errMsg) {}
    }, false)
  },
  //根据用户获取角色信息
  getFamilyinfo: async function() {
    var that = this;
    let usid = wx.getStorageSync("wxauth").userid
    var hr = await dataApi.MyFamily.GetMyFamily(usid);
    // debugger
    if (hr.data != null && hr.data.userInfo) {
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
        myRole: wx.getStorageSync("myrole").UserRole,
        showIslogin: false
      })
      
      // wx.setStorageSync('myrole', hr.data.userInfo)
      //判断当前用户是否为妈妈，如果不是不需要调用一下方法
      if (wx.getStorageSync("wxauth").userid == wx.getStorageSync("familyId").UserId){
        //检查是否需要同意家人加入
        var hrs = await userApplyJoinApi.UserApplyJoin.GetInviteRecord({
          JoinMobile: wx.getStorageSync("familyId").UserMobile,
          ApproveState: "0",
          PageSize: 100,
          PageIndex: 1,
          SortName: "ApplyTime",
          SortOrder: "asc"
        });
        if(hrs.state==1 && hrs.rows.length>0){
          for (var j = 0; j < hrs.rows.length;j++){
            wx.navigateTo({
              url: '../applyInvite/applyInvite?ApplyId=' + hrs.rows[j].ApplyId + '&UserId=' + hrs.rows[j].UserId
            })
          }
        }
      }

      //检查是否弹出优惠券
      var hr = await ulrApi.UserLinkRecord.checkTCSelected({
        UserId: wx.getStorageSync("wxauth").userid,
        LinkCode: '135',
        PageSize: 10,
        PageIndex: 1
      });
      if (hr.state == 1 && hr.rows && hr.rows.length > 0) {
        this.setData({
          yhqRF: false,
          showyhq: false
        })
      }else{
        app.getEventLog(135)
        this.setData({
          yhqRF: false,
          showyhq: true
        })
      }
    }else{
      var logininfo = wx.getStorageSync("wxauth")
      logininfo.isLogin=false
      wx.setStorageSync('wxauth', logininfo)

      wx.setStorageSync('yqinfo', '')
      wx.setStorageSync('myrole', '')
      wx.setStorageSync('familyId','');
      this.setData({
        showIslogin:true,
        isshowweekdanday: false
      })
    }

    this.getInviteRec();
  },
  //查询是否有新消息
  getNewsMessage: async function () {
    var that = this;
    var hr = await await dataApi.MyFamily.getNewsMessage({
      UserId: wx.getStorageSync("wxauth").userid,
      Status:1,
      PageSize: 1,
      PageIndex: 1
    });
    if (hr.state == 1 && hr.rows.length>0) {
      console.log("查询是否有新消息")
      console.log(hr)

      this.setData({
        isHasNewMessage: true //数据源
      })
    }else{
      this.setData({
        isHasNewMessage: false //数据源
      })
    }
  },
  //关闭引导页1
  hidePic1: function () {
    this.setData({
      isYDPic1: false,
      isYDPic2: true
    })
  },
  //关闭引导页2
  hidePic2: function () {
    this.setData({
      isYDPic2: false
    })
  },
  //检查20-24周 是否已选择套餐
  checkTC: async function () {
    var hr = await ulrApi.UserLinkRecord.checkTCSelected({
      UserId: wx.getStorageSync("wxauth").userid,
      LinkCode: '102',
      PageSize: 1,
      PageIndex: 1
    });
    console.log(hr)
    if (hr.state == 1 && hr.rows && hr.rows.length > 0) {
      this.setData({
        homeBgFour: false
      })
    } else {
      var hr = await ulrApi.UserLinkRecord.checkTCSelected({
        UserId: wx.getStorageSync("wxauth").userid,
        LinkCode: '103',
        PageSize: 1,
        PageIndex: 1
      });
      if (hr.state == 1 && hr.rows && hr.rows.length > 0) {
        this.setData({
          homeBgFour: false
        })
      } else {
        this.setData({
          homeBgFour: true
        })
      }
    }
  },

  //前往邀请记录
  inviteRecordBtn:async function(){
    var that = this;
    let usid = wx.getStorageSync("wxauth").userid
    var hr = await dataApi.MyFamily.GetMyFamily(usid);
   
    if (hr.data != null && hr.data.userInfo) {
      this.onShow()
    } else {
      app.globalData.currentLocation = 1,
        app.globalData.invitetype = false,
      wx.navigateTo({
        url: '../joinFamily/joinFamily'
      })
    }
  },

  //查询邀请记录
  getInviteRec:async function () {  
    if (wx.getStorageSync("familyId") == ""){
      var that = this;
      var hrss = await userApplyJoinApi.UserApplyJoin.GetInviteRecord({
        UserId: wx.getStorageSync("wxauth").userid,
        ApproveState: 0,
        PageSize: 100,
        PageIndex: 1
      });
      if (hrss.state == 1) {
        if (hrss.rows.length > 0){
          this.setData({
            showIslogin: false,
            showIsInvite: true
          })
        }else{
          this.setData({
            showIslogin: true,
            showIsInvite: false
          })
        }
     }else {
      this.setData({
        showIsInvite: false
      })
    }
    }else{
      this.setData({
        showIsInvite: false
      })
    }
  },

  //使用次数最高的模块
  // getTopThree: function() {
  //   // debugger
  //   var that = this;
  //   setting.POST({
  //     UserId: wx.getStorageSync("wxauth").userid,
  //     PageSize: 4,
  //     PageIndex: 1
  //   }, "/api/UserLinkRecord/GetTopClickButton", (data) => {
  //     if (data.data.length > 0) {

  //       var tr1 = -2;
  //       for (var tr in data.data) {
  //         if (data.data[tr].LinkCode == "2") {
  //           tr1 = tr;
  //         }
  //       }
  //       if (tr1 != -2) {
  //         data.data.splice(tr1, 1)
  //       }
  //       console.log(data.data)

  //       for (var f1 in this.data.usedTopThree) {
  //         if (this.data.usedTopThree[f1].code == data.data[0].LinkCode) {
  //           this.setData({
  //             topinfo1: this.data.usedTopThree[f1]
  //           })
  //         }
  //         if (this.data.usedTopThree[f1].code == data.data[1].LinkCode) {
  //           this.setData({
  //             topinfo2: this.data.usedTopThree[f1]
  //           })
  //         }
  //         if (this.data.usedTopThree[f1].code == data.data[2].LinkCode) {
  //           this.setData({
  //             topinfo3: this.data.usedTopThree[f1]
  //           })
  //         }
  //       }
  //     }
  //   }, (error) => {
  //     if (error.errMsg) {}
  //   }, false)
  // },

  //打开领取优惠券
  bingshowyhq:function(){
    app.getEventLog(135)
    this.setData({
      showyhq:true
    })
  },
  //关闭优惠券领取窗
  closeyhq:async function(){
    app.getEventLog(134)

    var hr = await ulrApi.UserLinkRecord.checkTCSelected({
      UserId: wx.getStorageSync("wxauth").userid,
      LinkCode: '134',
      PageSize: 10,
      PageIndex: 1
    });
    if (hr.state == 1 && hr.rows && hr.rows.length > 1) {
      this.setData({
        yhqRF:false
      })
    }else{
      this.setData({
        yhqRF: true
      })
    }

    this.setData({
      showyhq: false
    })
  },
  //前往领取优惠券
  tolq:function(){
    app.getEventLog(133)
    this.setData({
      showyhq: false,
      yhqRF: false
    })
    wx.navigateToMiniProgram({
      appId: 'wxaf72a47464d8f40a',
      path: "pages/shelf/index?page_id=PG00JZOKFS&channel=6S90EUHUBMY7",
      extraData: {
        // foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function() {
    var height = wx.getSystemInfoSync().windowHeight
    if (height >= 630) {
      this.setData({
        bigSr: true
      })
    } else {
      this.setData({
        bigSr: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // setTimeout(app.getEventLog(8, wx.getStorageSync("wxauth").OpenId), 5000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:async function() {
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })
    let tepuserid = wx.getStorageSync("wxauth").userid;

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      this.setData({
        showIslogin: true,
      })
    } else {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      this.setData({
        openid: wx.getStorageSync("wxauth").openid,
      })

      this.selYWeekAndDay();
      if (wx.getStorageSync("myrole").UserRole != null && wx.getStorageSync("myrole").UserRole != 'undefined') {
        if (wx.getStorageSync("myrole").UserRole == "Mather") {
          this.getNewsMessage();
        }
      }
      if (wx.getStorageSync("homeShowTip") == null || wx.getStorageSync("homeShowTip") == "") {
        wx.setStorageSync('homeShowTip', { userid: wx.getStorageSync("wxauth").userid, showtip: false })
      } else {
        this.setData({
          isYDPic1: false,
          isYDPic2: false
        })
      }
      this.setData({
        showIslogin: false
      })
    }
    app.getEventLog(8)
    this.getFamilyinfo();
  },

  // 模态框弹窗
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
  * 弹出框蒙层截断touchmove事件
  */
  preventTouchMove: function () { },
  /**
  * 隐藏模态对话框
  */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
  * 对话框取消按钮点击事件
  */
  onCancel: function () {
    this.hideModal();
  },
  /**
  * 对话框确认按钮点击事件
  */
  onConfirm: function () {
    this.hideModal();
    wx.navigateTo({
      url: '../enterPro/enterPro'
    })
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
      app.getPageTimer(8, "", vtime, this.data.time2);
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
      app.getPageTimer(8, "", vtime, this.data.time2);
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
  onShareAppMessage: function() {

  }
})