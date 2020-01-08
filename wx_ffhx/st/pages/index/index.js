const app = getApp()
const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import authApi from '../../servicesAPI/dataapi'
import dataApi from '../../servicesAPI/familyapi'
import register from '../../servicesAPI/userRegister'
import dailyTask from '../../servicesAPI/dailytask'
import serveApi from '../../servicesAPI/serveApi'
import knowApi from '../../servicesAPI/knowledge'

// 倒计时10s
var countdown = 10;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      is_show: true
    })
    countdown = 10;
    return;
  } else {
    that.setData({
      is_show: false,
      last_time: countdown
    })
    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }
    , 1000)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isselected: false,
    hiddenmodalput:true,
    isUserLogin: false,
    isHasMsg: false,
    isbindMac: '',
    urlHeadImg: '',
    todayWek: '',
    weather: '',
    showWea: false,
    isApprovalUser: false, //用户是否审核通过
    todaymorn: true,
    todayafte: false,
    share: 0,
    invituserid: 0,
    familyid: 0,
    familyMsg: {},
    familyidguid: 0,
    isEnter: false,
    closeMsg: true,
    tipbgcolor: true,
    shareNickName: '',
    yewan: '今夜',
    last_time: '',
    is_show: true,
    indexDayList: { UseSeconds: 0, MaskFit: 0, TidalVolume: 0, AHI: 0, PercentPeriodicBreathing: 0, PeriodicBreathingMinutes:0},
    indexNightList: { UseSeconds: 0, MaskFit: 0, TidalVolume: 0, AHI: 0, PercentPeriodicBreathing: 0, PeriodicBreathingMinutes: 0 },
    articleLists:[],
    time1: "",//进入页面时间
    time2: "",//离开页面时间
    time3:"",//邀请弹出时间
    time4:"",//邀请同意加入
  },

  //点击同意隐私协议 
  checkboxChange: function (e) {
    app.getEventLog("Index-inviteJoin-Agreeprotocol-button")
    this.setData({
      isselected: e.target.dataset.checks ? false : true
    })
  },
  //license 许可
  license: function () {
    wx.navigateTo({
      url: '../license/license'
    })
  },
  //protocol 隐私
  protocol: function () {
    wx.navigateTo({
      url: '../protocol/protocol'
    })
  },

  // 倒计时
  topCountdown: function () {
    var that = this;
    // 将获取验证码按钮隐藏60s，60s后再次显示
    that.setData({
      is_show: (!that.data.is_show)  //false
    })
    settime(that);
    this.readed();
  },

  //邀请拒绝
  cancelM:async function (e) {
    this.setData({
      hiddenmodalput: true,
    })
    var that = this;
    // 拒绝加入接口
    var hr = await dataApi.familyApi.acceptJoinFamily({
      familyId: that.data.familyid,
      invitUserId: that.data.invituserid,
      userId: wx.getStorageSync("wxauth").userid,
      isAccept: false
    });
    if (hr.state == 1) {
      wx.showToast({
        title: '已拒绝',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: hr.msg,
        icon: 'none'
      })
    }
  },
  //同意邀请
  confirmM: async function (e) {
    if (this.data.isselected == true) {
      this.setData({
        hiddenmodalput: true,
      })
      var that = this;
      // 同意加入接口
      var hr = await dataApi.familyApi.acceptJoinFamily({
        familyId: that.data.familyid,
        invitUserId: that.data.invituserid,
        userId: wx.getStorageSync("wxauth").userid,
        isAccept: true
      });
      if (hr.state == 1) {
        that.setData({
          isbindMac: 22
        })

        if (this.data.time3 != "" && this.data.time3 != null) {
          var vtime = this.data.time3;
          this.setData({
            time3: null,
            time4: util.formatTime(new Date())
          })
          var invitefamilyinfo = "familyid:" + this.data.familyid
          var inviteuserinfo = "invituserid:" + this.data.invituserid
          app.getPageTimer("index-page-inviteModel", invitefamilyinfo + "," + inviteuserinfo, vtime, this.data.time4);
        }
        setTimeout(function () {
          wx.showToast({
            title: '您已成功加入家庭，请点击头像登录小程序获取更多数据',
            icon: 'none',
            duration: 3000
          })
        }, 500)
      } else {
        wx.showToast({
          title: hr.msg,
          icon: 'none'
        })
      }
    }else{
      wx.showToast({
        title: "请阅读并同意用户许可协议及隐私条款", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.showDayOrNight();

    // 接收分享邀请传过来的参数
    if (options != null && options != undefined) {
      this.setData({
        share: options.share,
        familyid: options.familyid,
        invituserid: options.invituserid,
        source:options.source==undefined?'':options.source
      });
      console.log("onload ：" + this.data.source)
    }

    // let hr = await authApi.wxApi.wxLoginCheck()
    // if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
    //   this.setData({
    //     isUserLogin:false
    //   })
    // } else {
    //   this.setData({
    //     isUserLogin: true
    //   })
    //   //判断是否审核通过
    //   var hrcheck = await register.UserRegister.GetMyFamily({
    //     userId: wx.getStorageSync("wxauth").userid,
    //     isCheckedState: false
    //   });
    //   if (hrcheck.state == 1){
    //     console.log("-----------------------")
    //     console.log(hrcheck)
    //     if (hrcheck.data != null && hrcheck.data!=""){
    //       if (hrcheck.data.userInfo.Status == 1){
    //         this.setData({
    //           isApprovalUser: true
    //         })
    //       } else if (hrcheck.data.userInfo.Status == 0) {
    //         this.setData({
    //           isApprovalUser: false,
    //           isbindMac: 'groupMember'
    //         })
    //         wx.setStorageSync("UserChar", 'groupMember')
    //       }else{
    //         // this.setData({
    //         //   isApprovalUser: false
    //         // })
    //         this.setData({
    //           isApprovalUser: false,
    //           isbindMac: ''
    //         })
    //         wx.setStorageSync("UserChar", '')
    //       } 
    //       //显示头像
    //       this.setData({
    //         urlHeadImg: hrcheck.data.userInfo.HeadImage
    //       })        
    //     }else{
    //       if (hrcheck.state == 1){
    //         if (hrcheck.total == -2) {
    //           this.setData({
    //             isApprovalUser: false,
    //             isbindMac: 'groupLeader'
    //           })
    //           wx.setStorageSync("UserChar", 'groupLeader')
    //         } else if (hrcheck.total == -1) {
    //           this.setData({
    //             isApprovalUser: false,
    //             isbindMac: ''
    //           })
    //           wx.setStorageSync("UserChar", '')
    //         } else {
    //           this.setData({
    //             isApprovalUser: true
    //           })
    //         }
    //       }else {
    //         this.setData({
    //           isApprovalUser: true
    //         })
    //       }

    //       var hrUserinfo = await register.UserRegister.Getuserinfo({
    //         guid: wx.getStorageSync("wxauth").userid
    //       });
    //       if (hrUserinfo.state==1){
    //         this.setData({
    //           urlHeadImg: hrUserinfo.rows[0].HeadImg
    //         })   
    //       }
    //     }

    //   }else{
    //     this.setData({
    //       isApprovalUser: false
    //     })
    //   }

    //   //显示天气
    //    this.showWeather();



    // }

    if (wx.getStorageSync("UserChar") != "" && wx.getStorageSync("UserChar") != null && wx.getStorageSync("UserChar") != undefined) {
      this.setData({
        isbindMac: wx.getStorageSync("UserChar")
      })
    }

    // 分享邀请弹框
    if (this.data.share == 1) {
      var that = this;
      // 根据guid查找单个用户信息
      var hr11 = await dataApi.familyApi.getByGuid({
        guid: that.data.invituserid
      });
      if (hr11.state == 1 && hr11.rows.length > 0) {
        this.setData({
          shareNickName: hr11.rows[0].NickName
        })
      }
      this.setData({
        hiddenmodalput:false
      })
      if(this.data.hiddenmodalput==false){
        // 记录邀请弹窗时间
        this.setData({
          time3: util.formatTime(new Date())
        })
      }
      // wx.showModal({
      //   title: '邀请',
      //   content: '您的微信好友\n' + this.data.shareNickName + '\n邀请您加入家庭组\n\n一次绑定家人共享更安心，绑定家庭组后即可同步呼吸机简报及消息提醒\n\n\n',
      //   cancelText: "拒绝", //默认是“取消”
      //   confirmText: "同意加入", //默认是“确定”
      //   confirmColor: '#1575e5', //确定文字的颜色
      //   success: async function(res) {
      //     if (res.confirm) {
      //       // 同意加入接口
      //       var hr = await dataApi.familyApi.acceptJoinFamily({
      //         familyId: that.data.familyid,
      //         invitUserId: that.data.invituserid,
      //         userId: wx.getStorageSync("wxauth").userid,
      //         isAccept: true
      //       });
      //       if (hr.state == 1) {
      //         wx.showToast({
      //           title: '您已成功加入家庭，请点击头像登录小程序获取更多数据',
      //           icon: 'none',
      //           duration: 3000
      //         })
      //         that.setData({
      //           isbindMac: 22
      //         })
      //       } else {
      //         wx.showToast({
      //           title: hr.msg,
      //           icon: 'none'
      //         })
      //       }
      //     } else if (res.cancel) {
      //       // 拒绝加入接口
      //       var hr = await dataApi.familyApi.acceptJoinFamily({
      //         familyId: that.data.familyid,
      //         invitUserId: that.data.invituserid,
      //         userId: wx.getStorageSync("wxauth").userid,
      //         isAccept: false
      //       });
      //       if (hr.state == 1) {
      //         wx.showToast({
      //           title: '已拒绝',
      //           icon: 'none'
      //         })
      //       } else {
      //         wx.showToast({
      //           title: hr.msg,
      //           icon: 'none'
      //         })
      //       }
      //     }
      //   }
      // });
    }
  },

  //根据用户id获取首页六大数据
  getRemoateData:async function(){
    var hr = await dataApi.familyApi.getRemoateData({
      userId: wx.getStorageSync("wxauth").userid
    });
    console.log("六大数据")
    console.log(hr)
    if (hr.data && hr.data.length > 0) {
      for (var i = 0; i < hr.data.length;i++){
        if (hr.data[i].Status=="1"){
          //白天
          var daylist = hr.data[i]
          daylist.UseSeconds = (daylist.UseSeconds / 3600).toFixed(1);
          daylist.PercentPeriodicBreathing = (daylist.PercentPeriodicBreathing *100).toFixed(0)
          daylist.MaskFit = (daylist.MaskFit * 100).toFixed(0)
          daylist.PeriodicBreathingMinutes = parseInt(daylist.PeriodicBreathingMinutes)
          daylist.TidalVolume = Math.ceil(daylist.TidalVolume)
          // daylist.AHI = (daylist.AHI * 1).toFixed(1);
          this.setData({
            indexDayList: daylist
          })
        }
        if (hr.data[i].Status == "2") {
          //夜晚
          var daylist = hr.data[i]
          daylist.UseSeconds = (daylist.UseSeconds / 3600).toFixed(1);
          daylist.PercentPeriodicBreathing = (daylist.PercentPeriodicBreathing * 100).toFixed(0)
          daylist.MaskFit = (daylist.MaskFit * 100).toFixed(0)
          daylist.PeriodicBreathingMinutes = parseInt(daylist.PeriodicBreathingMinutes)
          daylist.TidalVolume = Math.ceil(daylist.TidalVolume)
          daylist.AHI = (daylist.AHI*1).toFixed(1);
          this.setData({
            indexNightList: daylist
          })
        }
      }

      //加载消息
      this.loadIndexMess();
    }
  },

  //检查当日日志是否已填
  checkdaily: async function(){
    if (wx.getStorageSync("familyidguid")!=""){
    var d = new Date();
    var currentMonth = d.getMonth() + 1;
    var currentYear = d.getFullYear();
    var currentDay = d.getDate();

    var hr = await dailyTask.DailyTask.GetDailysByYM({
      // userGuid: wx.getStorageSync("wxauth").userid,
      familyIdGuid: wx.getStorageSync("familyidguid").FamilyId,
      year: currentYear,
      month: currentMonth,
      day: currentDay
    });
    console.log(hr)
    if (hr.rows && hr.rows.length > 0){
      this.setData({
        showRedPoint: false
      })
    }else{
      this.setData({
        showRedPoint:true
      })
    }
    } 
  },

  //加载消息
  loadIndexMess:async function(){
    // var hr = await dailyTask.DailyTask.GetIndexMessage({
    //   userId: wx.getStorageSync("wxauth").userid
    // });
    var hr = await knowApi.knowledgeApi.getServiceNoticeList({
      UserId: wx.getStorageSync("wxauth").uid, //数字
      PageSize: 5,
      PageIndex: 1,
      SortName: "CreatedTime",
      SortOrder: "desc",
    });
    console.log(hr)
    if (hr.state==1 && hr.rows.length > 0) {
      this.setData({
        articleLists: hr.rows
      })
    } else {
      console.log(hr.msg)
    }
  },

  // 消息页
  toMessageIndex() {
    wx.navigateTo({
      url: '../Message/MessageIndex/MessageIndex',
    })
  },
  
  // 获取家庭组信息，首页顶上消息弹框
  getFamilyMsg: async function() {
    var hr = await dataApi.familyApi.getFamilyMsg({
      UserIdGuid: wx.getStorageSync("wxauth").userid,
      PageSize: 1,
      PageIndex: 1,
      SortName: "createdtime",
      SortOrder: "desc",
      IsRead: false
    });
    if (hr.rows && hr.rows.length > 0) {
      this.setData({
        familyMsg: hr.rows[0],
        familyidguid: hr.rows[0].FamilyIdGuid,
        isHasMsg: true,
        closeMsg: true 
      })

      // 判断背景颜色
      if (hr.rows[0].MsgType == 2 || hr.rows[0].MsgType == 3 || hr.rows[0].MsgType == 5) {
        this.setData({
          tipbgcolor: true,
        })
      } else {
        this.setData({
          tipbgcolor: false
        })
      }
      // 组员收到 10s关闭
      if (hr.rows[0].MsgType == 5 || hr.rows[0].MsgType == 6 || hr.rows[0].MsgType == 4) {
        this.setData({
          isEnter: false,
        })
        this.topCountdown();
      }
      // 组长收到，进入查看
      if (hr.rows[0].MsgType == 1 || hr.rows[0].MsgType == 2 || hr.rows[0].MsgType == 3 || hr.rows[0].MsgType == 7 || hr.rows[0].MsgType == 8) {
        this.setData({
          isEnter: true,
          is_show: false,
        })
      }
    } else if (hr.rows && hr.rows.length == 0) {
      this.setData({
        isHasMsg: false
      })
    }
  },

  //消息标为已读 put  this.readed();
  readed: async function() {
    var hr = await dataApi.familyApi.readed({
      MsgIdGuid: this.data.familyMsg.MsgIdGuid,
      IsRead: true
    });
  },

  // 家庭消息跳转
  familyMsg: async function(e) {
    // 组长收到，进入查看详情页
    if (this.data.familyMsg.MsgType == 1 || this.data.familyMsg.MsgType == 7 || this.data.familyMsg.MsgType == 8) {
      wx.navigateTo({
        url: `../familyMsg/familyMsg?msgidguid=${e.currentTarget.dataset.msgidguid}`,
      })
    }
    // 组长收到，xxx已同意，调到个人详情页
    if (this.data.familyMsg.MsgType == 2) {
      wx.navigateTo({
        url: `../familyManege/personalPage/personalPage?msgidguid=${e.currentTarget.dataset.msgidguid}`,
      })
    }
    // 组长收到，xxx已同意，调到个人详情页
    if (this.data.familyMsg.MsgType == 3) {
      wx.navigateTo({
        url: `../applyInformation/leaderAgree/leaderAgree?msgidguid=${e.currentTarget.dataset.msgidguid}`,
      })
    }
    // 组员收到：10s关闭
    if (this.data.familyMsg.MsgType == 5 || this.data.familyMsg.MsgType == 6 || this.data.familyMsg.MsgType == 4) {
      this.setData({
        closeMsg: false
      })
      this.readed();
    }
  },

  // 点击头像，跳转到添加设备页
  equipment: async function(e) {
    if (!this.data.isApprovalUser) {
      wx.showToast({
        title: "请绑定设备或加入家庭组。若已申请，请等待审核通过！",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: `../familyManege/equipment/equipment?familyidguid=${e.currentTarget.dataset.familyidguid}`,
      });
    }

    // let hr = await authApi.wxApi.wxLoginCheck()
    // if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
    //   // wx.showModal({
    //   //   title: '您尚未登录注册',
    //   //   content: '注册家庭组可以体验更多功能，\n赶紧前往组建家庭组吧！',
    //   //   cancelText: "暂不注册", //默认是“取消”
    //   //   confirmText: "立即注册", //默认是“确定”
    //   //   confirmColor: '#1575e5', //确定文字的颜色
    //   //   success: function (res) {
    //   //     if (res.confirm) {
    //   //       wx.navigateTo({
    //   //         url: '../register/stepOne/stepOne',
    //   //       })
    //   //     } else if (res.cancel) {
    //   //       console.log('用户点击取消')
    //   //     }
    //   //   }
    //   // });
    // }else{
    //   wx.navigateTo({
    //     url: '../familyManege/equipment/equipment',
    //   });
    // }
  },
  //显示星期，天气
  showWeather: function() {
    var that = this
    wx.getSetting({ //检测用户权限
      success: (res) => {
        // if (res.authSetting['scope.userLocation'] == false) { // 地理位置授权 触发过但没有授权
        //   wx.showModal({ //弹出模态框，询问
        //     title: '是否授权当前位置',
        //     content: '如需正常使用天气信息，请按确定并在授权管理中选中“地理位置”，然后点按返回即可正常使用。',
        //     cancelColor: '#f00',
        //     success: function(res) {
        //       if (res.confirm) { //同意授权
        //         wx.openSetting({})
        //       }
        //     }
        //   })
        // } else 
        if (res.authSetting['scope.userLocation'] == true) { // 地理位置授权过了
          wx.getLocation({
            success: async function(res) {

              //调用天气接口
              var hrWeather = await register.UserRegister.GetWeather({
                lat: res.latitude,
                lon: res.longitude
              });
              console.log("天气")
              console.log(hrWeather)
              if (hrWeather.state == 1) {
                that.setData({
                  showWea: true,
                  todayWek: hrWeather.data.week,
                  weather: hrWeather.data.weather + '，' + hrWeather.data.temperature + '℃'
                })
              }
            },
          })
        }
      }
    })
  },

  //授权地理位置显示天气
  getLocationData: async function(e) {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (typeof(res.authSetting['scope.userLocation']) == "undefined") { // 从未触发过授权的情况
          wx.getLocation({ // 用户同意授权地理位置
            success: async function(res) {
              that.setData({
                latitude: res.latitude,
                longitude: res.longitude
              });
              //that.getShopInfo_nearby(res.latitude, res.longitude);
              console.log("地理位置：" + res.latitude + ", " + res.longitude)

              //调用天气接口
              var hrWeather = await register.UserRegister.GetWeather({
                lat: res.latitude,
                lon: res.longitude
              });
              console.log("天气")
              console.log(hrWeather)
              if (hrWeather.state == 1) {
                that.setData({
                  showWea: true,
                  todayWek: hrWeather.data.week,
                  weather: hrWeather.data.weather + '，' + hrWeather.data.temperature + '℃'
                })
              }

            },
            fail: function(err) { // 用户拒绝授权地理位置
              wx.showModal({ //弹出模态框，询问
                title: '是否授权当前位置',
                content: '如需正常使用天气信息，请按确定并在授权管理中选中“地理位置”，然后点按返回即可正常使用。',
                cancelColor: '#f00',
                success: function(res) {
                  if (res.confirm) { //同意授权
                    wx.openSetting({})
                  }
                }
              })
            }
          })
        } else if (res.authSetting['scope.userLocation'] == true) { // 地理位置授权过了
          wx.getLocation({
            success: async function(res) {
              //that.getShopInfo_nearby(res.latitude, res.longitude);

              console.log("经度：" + res.latitude + ";维度：" + res.longitude)
              //调用天气接口
              var hrWeather = await register.UserRegister.GetWeather({
                lat: res.latitude,
                lon: res.longitude
              });
              console.log("天气")
              console.log(hrWeather)
              if (hrWeather.state == 1) {
                that.setData({
                  showWea: true,
                  todayWek: hrWeather.data.week,
                  weather: hrWeather.data.weather + '，' + hrWeather.data.temperature + '℃'
                })
              }
            },
          })
        }
      }
    })

  },

  //日志
  toLogRecord:function(){
    wx.navigateTo({
      url: '../logRecord/main'
    })
  },
  //点击显示白天详情
  showDetail: function() {
    this.setData({
      todaymorn: !this.data.todaymorn,
      todayafte: !this.data.todayafte
    })
  },
  //点击显示夜晚详情
  showafterDetail: function() {
    this.setData({
      todaymorn: !this.data.todaymorn,
      todayafte: !this.data.todayafte
    })
  },
  //数据说明
  toDataExplain: function() {
    wx.navigateTo({
      url: '../indexDataExplain/indexDataExplain'
    })
  },
  //注册绑定设备
  toRegi: function() {
    app.getEventLog("startBindDevice-button")
    wx.navigateTo({
      url: '../register/stepOne/stepOne'
    })
  },
  // 授权头像信息
  getUserInfo: async function(e) {
    console.log(e)

    if (e.detail.userInfo != undefined) {
      // 获取用户信息接口
      let hr = await authApi.wxApi.wxUserInfo(e);
      app.globalData.userInfo = e.detail.userInfo

      if (app.globalData.userInfo != null) {
        wx.setStorageSync("nickName", app.globalData.userInfo.nickName);
        wx.setStorageSync("avatarUrl", app.globalData.userInfo.avatarUrl);
      }
      this.onShow()
    }
    var that = this;
    var iv = e.detail.iv;
    var encr = e.detail.encryptedData;
    var rawData = e.detail.rawData;
    var signature = e.detail.signature;
    if (e.detail.errMsg == 'getUserInfo:fail auth deny' || e.detail.errMsg == 'getPhoneNumber:user deny' || e.detail.errMsg == 'getUserInfo:fail:cancel to confirm login' || e.detail.errMsg != 'getUserInfo:ok') {
      //用户未授权
      wx.showModal({
        title: '温馨提示',
        showCancel: false,
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        success: function(res) {
          wx.switchTab({
            url: '../index/index'
          })

        }
      })
      wx.hideLoading()
    }
  },

  //家庭组组长查看申请进度
  toRegiInfo: function() {
    app.getEventLog("bindApplied-button")
    wx.navigateTo({
      url: '../register/stepThree/stepThree?viewid=zz'
    })
  },
  //成员查看申请进度
  toJoinFamGroup: function() {
    wx.navigateTo({
      url: '../joinFamilyGroup/stepThree/stepThree?viewid=zy'
    })
  },
  //点击查看图标详情
  toChartDetail: function(e) {
    var itemid = e.currentTarget.dataset.itemid;
    var lotype = e.currentTarget.dataset.lotype;
    wx.navigateTo({
      url: '../indexDataEChart/indexDataEChart?itemid=' + itemid + "&lotype=" + lotype
    })
  },

  //根据当前时间显示今日或今夜
  showDayOrNight: function() {
    var date = new Date();
    var currenthour = date.getHours();
    if (currenthour >= 7 && currenthour < 19) {
      this.setData({
        todaymorn: true,
        todayafte: false,
        yewan: '昨夜'
      })
    } else {
      this.setData({
        todaymorn: false,
        todayafte: true,
        yewan: '今夜'
      })
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
  onShow: async function () {
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })

    if (wx.getStorageSync("UserChar") != "" && wx.getStorageSync("UserChar") != null && wx.getStorageSync("UserChar") != undefined) {
      this.setData({
        isbindMac: wx.getStorageSync("UserChar")
      })
    }

    let hr = await authApi.wxApi.wxLoginCheck(this.data.source)
    app.getEventLog("index-page")
    if (this.data.source != "") {
      var hrss = await register.UserRegister.SaveScanQRLog({
        userId: wx.getStorageSync("wxauth").uid,
        source: this.data.source
      });
      if (hrss.state == 1) {
        console.log("source数据保存成功")
      }
    }
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      this.setData({
        isUserLogin: false
      })
    } else {
      this.setData({
        isUserLogin: true
      })

      this.getVIPState();
      // 获取家庭消息
      this.getFamilyMsg();
      //判断是否审核通过
      var hrcheck = await register.UserRegister.GetMyFamily({
        userId: wx.getStorageSync("wxauth").userid,
        isCheckedState: false
      });
      if (hrcheck.state == 1) {
        if (hrcheck.data != null && hrcheck.data != "") {
          wx.setStorageSync("familyidguid", hrcheck.data.familyName);
          if (hrcheck.data.userInfo.Status == 1) {
            this.setData({
              isApprovalUser: true
            })
          } else if (hrcheck.data.userInfo.Status == 0) {
            this.setData({
              isApprovalUser: false,
              isbindMac: 'groupMember'
            })
            wx.setStorageSync("UserChar", 'groupMember')
          } else {
            // this.setData({
            //   isApprovalUser: false
            // })
            this.setData({
              isApprovalUser: false,
              isbindMac: ''
            })
            wx.setStorageSync("UserChar", '')
          }
          //显示头像
          this.setData({
            urlHeadImg: hrcheck.data.userInfo.HeadImage
          })
        } else {
          if (hrcheck.state == 1) {
            if (hrcheck.total == -2) {
              this.setData({
                isApprovalUser: false,
                isbindMac: 'groupLeader'
              })
              wx.setStorageSync("UserChar", 'groupLeader')
            } else if (hrcheck.total == -1) {
              this.setData({
                isApprovalUser: false,
                isbindMac: ''
              })
              wx.setStorageSync("UserChar", '')
            } else {
              this.setData({
                isApprovalUser: true
              })
            }
          } else {
            this.setData({
              isApprovalUser: true
            })
          }

          var hrUserinfo = await register.UserRegister.Getuserinfo({
            guid: wx.getStorageSync("wxauth").userid
          });
          if (hrUserinfo.state == 1) {
            this.setData({
              urlHeadImg: hrUserinfo.rows[0].HeadImg
            })
          }
        }

      } else {
        this.setData({
          isApprovalUser: false
        })
      }
      //显示数据
      this.getRemoateData();
      //日志是否已填
      this.checkdaily();
    }
    //显示天气
    this.showWeather();
    
  },
  // 查询是否开启vip
  getVIPState: async function () {
    var that = this;
    var hr = await serveApi.serveApi.getVIPState({
      userId: wx.getStorageSync("wxauth").userid
    });
    if (hr.state == 1) {
      this.setData({
        IsVIP: hr.data
      })
      // 已开启vip,调vip文章列表
      // if (this.data.IsVIP == true) {
      //   this.getVipList();
      // }
    }
  },
  // 消息文章详情
  tomessageDetails(e) {

    var msgtype = e.currentTarget.dataset.remindtype;
    //1市场推广 2消息提醒(不需要详情) 3教育文章
    if (msgtype == 3) {
      wx.navigateTo({
        url: `../knowledge/illnessEssay/illnessEssay?guid=${e.currentTarget.dataset.guid}&classtype=${2}&pageto=`
      })
    } 
    else if (msgtype ==1) {
      wx.navigateTo({
        url: `../Message/messageDetails/messageDetails?guid=${e.currentTarget.dataset.guid}&classtype=${3}`
      })
    } 
    else {
      wx.navigateTo({
        url: `../Message/messageDetails/messageDetails?id=${e.currentTarget.dataset.id}&guid=&classtype=&source=`,
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
      app.getPageTimer("index-page","", vtime, this.data.time2);
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
      app.getPageTimer("index-page", "",vtime, this.data.time2);
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
    app.getPageShare("index-page", "", "pages/index/index")
    return {
      title: '管理更智能，关护更贴心',
      path: `pages/index/index`,
      imageUrl: '../../images/shareImg.png'
    }
  }
})