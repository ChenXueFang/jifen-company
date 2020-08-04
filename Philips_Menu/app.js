//app.js
const setting = require("./utils/setting.js")
const util = require("./utils/util.js");
App({
  onLaunch: function (options) {
    this.globalData.time1 = util.formatTime(new Date());
    wx.removeStorageSync("searchKey");
    wx.setStorageSync("searchKey", options.query.searchKey);
    wx.setStorageSync("typeid", options.query.typeid);
    wx.setStorageSync("subtypeid", options.query.subtypeid);
    // ;
    this.globalData.path = options.path;
    this.globalData.cookBookId = options.query.ID;
    this.globalData.s = options.query.s || "";
    this.globalData.v = options.query.v || "";
    this.globalData.c = options.query.c || "";
    this.globalData.sid = options.query.sid || "";
    this.globalData.r = options.query.r || "";



    if (!this.globalData.s && !this.globalData.v && !this.globalData.c) {
      this.globalData.s = wx.getStorageSync('s');
      this.globalData.v = wx.getStorageSync('v');
      this.globalData.c = wx.getStorageSync('c');
    }
    wx.removeStorageSync("sessionidKey");
    this.globalData.isInvoking = 1;
    this.getSessionid(this.globalData.s, this.globalData.v, this.globalData.c, this.globalData.sid);

    // this.getTypes();

    console.log("unionid的值", setting.setting.GetCache(setting.setting.unionidKey));
    console.log("openid的值", setting.setting.GetCache(setting.setting.miniopenidKey));

    if (wx.getStorageSync('shouldDelete')) {
      wx.removeStorageSync('vipUserId')
      wx.removeStorageSync('mobile')
    }
    // 判断有没有授权

    if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.miniopenidKey)) {
      this.globalData.unionId = setting.setting.GetCache(setting.setting.unionidKey)
      this.globalData.miniOpenId = setting.setting.GetCache(setting.setting.miniopenidKey)
      //判断是不是会员
      this.checkVipUser()
    } else {
      // 登录
      wx.login({
        success: res => {
          // 
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          this.globalData.code = res.code;
          console.log("code的值", this.globalData.code);
          // this.existUserUnion();
          this.login(res.code);
        }
      })
    }

  },
  //登录传code
  login: function (code) {
    var that = this;
    wx.request({
      url: setting.setting.payUrl + 'Api/Miniapp/wxLogin',
      data: {
        code: code,
        appid: setting.setting.appid
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        if (res.data.state == 1) {
          that.globalData.userInfo = res.data.data
          that.globalData.unionId= res.data.data.unionid
          that.globalData.miniOpenId=res.data.data.openid
          wx.setStorageSync("miniOpenId",res.data.data.openid);
          wx.setStorageSync("unionidKey", res.data.data.unionid);
          wx.setStorageSync("nickName",res.data.data.NickName);
          wx.setStorageSync("avatarUrl", res.data.data.HeadimgUrl);
          //判断是不是会员
          that.checkVipUser()
        } else {
          wx.showModal({
            title: '温馨提示',
            showCancel: false,
            content: res.data.msg,
            success: function (res) {}
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  onShow: function (options) {
    console.log(options)
    if (this.globalData.time1 == "") {
      this.globalData.time1 = util.formatTime(new Date());
    }


    wx.removeStorageSync("searchKey");
    wx.setStorageSync("searchKey", options.query.searchKey);
    wx.setStorageSync("typeid", options.query.typeid);
    wx.setStorageSync("subtypeid", options.query.subtypeid);
    this.globalData.path = options.path;
    this.globalData.cookBookId = options.query.ID;
    this.globalData.s = options.query.s || "";
    this.globalData.v = options.query.v || "";
    this.globalData.c = options.query.c || "";
    this.globalData.sid = options.query.sid || "";
    this.globalData.r = options.query.r || "";

    if (!this.globalData.s && !this.globalData.v && !this.globalData.c) {
      this.globalData.s = wx.getStorageSync('s');
      this.globalData.v = wx.getStorageSync('v');
      this.globalData.c = wx.getStorageSync('c');
    }

    if (this.globalData.isInvoking == 0) {
      this.getSessionid(this.globalData.s, this.globalData.v, this.globalData.c, this.globalData.sid);
      this.globalData.isInvoking = 1;
    }
    console.log("unionid的值", setting.setting.GetCache(setting.setting.unionidKey));
    console.log("openid的值", setting.setting.GetCache(setting.setting.miniopenidKey)); 

    // 判断有没有授权
    if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.miniopenidKey)) {

    } else {
      // 登录
      wx.login({
        success: res => {
          // 
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          this.globalData.code = res.code;
          console.log("code的值", this.globalData.code);
          // this.existUserUnion();
          this.login(res.code);
        }
      })
    }

  },
  onHide: function () {
    //设置可调用getSessionID
    this.globalData.isInvoking = 0;
    var formId = this.globalData.formId;
    if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.useridKey)) {
      setting.GET({
        formNo: formId
      }, "API/APIData.ashx?_op=SaveFormID", (data) => {
        if (data.success) {
          console.log("formID存储成功:", formId);
        }
      }, (err) => {
        console.log("formID存储失败:", err);
        console.log("formID:", formId);
      }, false);
    }
    //记录小程序退出
    this.getEventLog("1200", "小程序退出", "", "");
    this.getPageTimer("1200", "小程序退出", "", "", this.globalData.time1, util.formatTime(new Date()));
  },

  //获取sessionId
  getSessionid: function (s, v, c, sid) {
    setting.GET({
      s: s,
      v: v,
      c: c,
      sid: sid
    }, "API/APIData.ashx?_op=GetSession", (data) => {
      if (data.success) {
        wx.setStorageSync(setting.setting.sessionidKey, data.msg);
      }
    }, (err) => {
      console.log(err)
    }, false);
  },

  //记录页面停留的时间
  getPageTimer: function (type, title, typeID, objID, time1, time2) {
    setting.GET({
      EventType: type,
      EventTitle: title,
      ObjectTypeID: typeID,
      ObjectID: objID,
      StartTime: time1,
      EndTime: time2
    }, "API/APIData.ashx?_op=PageTimer", (data) => {
      // console.log(data.msg);
    }, (err) => {
      console.log(err)
    }, false);
  },

  //页面访问次数 + 按钮点击次数
  getEventLog: function (type, title, typeID, objID) {
    setting.GET({
      EventType: type,
      EventTitle: title,
      ObjectTypeID: typeID,
      ObjectID: objID
    }, "API/APIData.ashx?_op=EventLog", (data) => {
      // console.log(data.msg);
    }, (err) => {
      console.log(err)
    }, false);
  },
  //接口检查是否是会员
  checkVipUser() {
    setting.GET({
      headerImg: this.globalData.userInfo.HeadimgUrl || wx.getStorageSync("avatarUrl")|| ''
    }, "API/BasicData.ashx?_op=ExistUserUnion", (data) => {
          //判断是不是会员
      // 
      if (data.success) {
        if (data.data.IsExist) {
          //是会员
          this.globalData.vipUserId = data.data.UserModel.H5UserID;
          this.globalData.miniOpenId = data.data.UserModel.OpenID;
          this.globalData.unionId = data.data.UserModel.UnionID;
          this.globalData.mobile = data.data.UserModel.Mobile;
          wx.setStorageSync("vipUserId", data.data.UserModel.H5UserID);
          wx.setStorageSync("miniOpenId", data.data.UserModel.OpenID);
          wx.setStorageSync("unionidKey", data.data.UserModel.UnionID);
          wx.setStorageSync("mobile", data.data.UserModel.Mobile);
          this.checkChoosedLabel();
        } else {
          if (setting.setting.GetCache('vipUserId') && setting.setting.GetCache('mobile')) {
            wx.setStorageSync('shouldDelete', true)
            // wx.removeStorageSync('mobile')
          }
        }
      }
    }, (err) => {
      console.log(err)
    }, false);
  },
  //接口检查是否选过标签
  checkChoosedLabel() {

    setting.GET({}, "API/BasicData.ashx?_op=ExistUserTags", (data) => {
      if (data.success) {
        if (data.data) {
          if (this.globalData.returnPath) {
            wx.redirectTo({
              url: this.globalData.returnPath + '?id=' + this.globalData.returnId,
              fail:()=>{
                wx.switchTab({
                  url: this.globalData.returnPath + '?id=' + this.globalData.returnId
                })
              }
            })
          } else {
            // wx.switchTab({
            //   url: '../home/home'
            // })
          }
        } else {
          wx.redirectTo({
            url: '../interestLabel/interestLabel'
          })
        }
      }
    }, (err) => {
      console.log(err)
    }, false);
  },
  //检查是否授权且是会员
  checkMember: function () {
    // debugger
    if (this.globalData.unionId && this.globalData.miniOpenId) { //代表授过权
      if (this.globalData.vipUserId && this.globalData.mobile) { //用户是否是会员
        //授权且是会员
        wx.navigateTo({
          url: this.globalData.returnPath + '?id=' + this.globalData.returnId
        })
      } else { //授过权但不是会员
        wx.navigateTo({
          url: '../wxPhone/wxPhone'
        })
      }
    } else { //代表没授权
      wx.navigateTo({
        url: '../wxPhone/wxPhone'
      })
    }
  },
  globalData: {
    userInfo: "",
    types: null,
    miniOpenId: '',
    unionId: '',
    vipUserId: '',
    mobile: '',
    returnId: '',
    returnPath: '',
    isReturnLove: false,
    code: '',
    placeholder: "Hi～今天想吃点什么？",
    formId: "",
    s: "",
    v: "",
    c: "",
    r: "", //小程序的路径
    sid: "",
    isshow: true, //是否显示授权按钮
    path: "", //菜谱详情页分享来源
    cookBookId: "", //菜谱详情页分享带来的cookBookId
    hasAccredit: false, //是否授权
    isInvoking: 1, // 1:OnLunch调用getSessionID 0：onShow调用getSessionID
    time1: "", //进入页面时间
  }
})