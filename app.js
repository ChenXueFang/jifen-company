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
    // debugger;
    this.globalData.path = options.path;
    this.globalData.cookBookId = options.query.ID;
    this.globalData.s = options.query.s || "" ;
    this.globalData.v = options.query.v || "";
    this.globalData.c = options.query.c || "";
    this.globalData.sid = options.query.sid || "";
    this.globalData.r = options.query.r || "";
    
  

    if (!this.globalData.s && !this.globalData.v && !this.globalData.c){
      this.globalData.s = wx.getStorageSync('s');
      this.globalData.v = wx.getStorageSync('v');
      this.globalData.c = wx.getStorageSync('c');
    }
    wx.removeStorageSync("sessionidKey");
    this.globalData.isInvoking = 1;
    this.getSessionid(this.globalData.s, this.globalData.v, this.globalData.c, this.globalData.sid);

    this.getTypes();

    console.log("unionid的值", setting.setting.GetCache(setting.setting.unionidKey));
    console.log("openid的值", setting.setting.GetCache(setting.setting.miniopenidKey));

    // 判断有没有授权
    if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.miniopenidKey)) {
      // debugger
      this.globalData.isshow = false;
      this.getUserid();
      if (!this.globalData.cookBookId && this.globalData.path !="pages/productdetails/productdetails") {
        if (this.globalData.r){
           
          wx.redirectTo({
            url: this.globalData.r
          })
        }else{
          if (wx.getStorageSync('searchKey')) {
            wx.redirectTo({
              url: '/pages/searchresult/searchresult?searchKey=' + wx.getStorageSync('searchKey') + "&s=" + wx.getStorageSync('s') + "&v=" + wx.getStorageSync('v') + "&c=" + wx.getStorageSync('c') + "&typeid=" + wx.getStorageSync('typeid') + "&subtypeid=" + wx.getStorageSync('subtypeid')
            })
          } else {
            wx.redirectTo({
              url: '/pages/index/index?form=' + 'OnLaunch'
            })
          }
        }

      }else{
        // debugger
        console.log("测试从分享进来")
      }
    }else{
      // 登录
      wx.login({
        success: res => {
          // debugger
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          this.globalData.code = res.code;
          console.log("code的值", this.globalData.code);
          this.existUserUnion();
        }
      })
    }

  },
  onShow:function(options){
    console.log(options)
    if (this.globalData.time1 == "" ) {
      this.globalData.time1 = util.formatTime(new Date());
    }
      
      
    wx.removeStorageSync("searchKey");
    wx.setStorageSync("searchKey", options.query.searchKey);
    wx.setStorageSync("typeid", options.query.typeid);
    wx.setStorageSync("subtypeid", options.query.subtypeid);
    this.globalData.path = options.path;
    this.globalData.cookBookId = options.query.ID;
    this.globalData.s= options.query.s||"";
    this.globalData.v = options.query.v||"";
    this.globalData.c = options.query.c||"";
    this.globalData.sid = options.query.sid||"";
    this.globalData.r = options.query.r || "";

    if (!this.globalData.s && !this.globalData.v && !this.globalData.c) {
      this.globalData.s = wx.getStorageSync('s');
      this.globalData.v = wx.getStorageSync('v');
      this.globalData.c = wx.getStorageSync('c');
    }

    if (this.globalData.isInvoking==0){
      this.getSessionid(this.globalData.s, this.globalData.v, this.globalData.c, this.globalData.sid);
      this.globalData.isInvoking = 1;
    }
    console.log("unionid的值", setting.setting.GetCache(setting.setting.unionidKey));
    console.log("openid的值", setting.setting.GetCache(setting.setting.miniopenidKey));

    // 判断有没有授权
    if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.miniopenidKey)) {
      // debugger
      this.globalData.isshow = false;
      this.getUserid();
      if (!this.globalData.cookBookId && this.globalData.path != "pages/productdetails/productdetails") {
        if (this.globalData.r) {
          
          wx.redirectTo({
            url: this.globalData.r
          })
        }else{
          if (wx.getStorageSync('searchKey')) {
            wx.redirectTo({
              url: '/pages/searchresult/searchresult?searchKey=' + wx.getStorageSync('searchKey') + "&s=" + wx.getStorageSync('s') + "&v=" + wx.getStorageSync('v') + "&c=" + wx.getStorageSync('c') + "&typeid=" + wx.getStorageSync('typeid') + "&subtypeid=" + wx.getStorageSync('subtypeid')
            })
          } else {
            wx.redirectTo({
              url: '/pages/index/index?form=' + 'OnShow'
            })
          }
        }
       
      } else {
        // debugger
        console.log("测试从分享进来")
      }
    } else {
      // 登录
      wx.login({
        success: res => {
          // debugger
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          this.globalData.code = res.code;
          console.log("code的值", this.globalData.code);
          this.existUserUnion();
        }
      })
    }

  },
  onHide:function(){
    //设置可调用getSessionID
    this.globalData.isInvoking=0;
    var formId = this.globalData.formId;
    if (setting.setting.GetCache(setting.setting.unionidKey) && setting.setting.GetCache(setting.setting.useridKey)){
      setting.GET({ formNo: formId }, "API/APIData.ashx?_op=SaveFormID", (data) => {
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
  //保存用户Unionid
  saveUserUnion: function () {
    setting.POST({}, "API/APIData.ashx?_op=SaveUserUnion", (data) => {
    }, (err) => { console.log(err) }, false);
  },
  //获取 UserId
  getUserid: function () {
    // debugger
    setting.GET({ unionId: setting.setting.GetCache(setting.setting.unionidKey) }, "API/APIData.ashx?_op=GetOpenAndUserId", (data) => {
      if (data.success) {
        wx.setStorageSync(setting.setting.useridKey, data.data.VipUserId);
        console.log("userid的值", setting.setting.GetCache(setting.setting.useridKey));
        this.saveUserUnion();
      }
    }, (err) => {
    }, false);
  },
  //获取sessionId
  getSessionid:function(s,v,c,sid){
    setting.GET({s:s,v:v,c:c,sid:sid}, "API/APIData.ashx?_op=GetSession", (data) => {
      if (data.success) {
        wx.setStorageSync(setting.setting.sessionidKey, data.msg);
      }
    }, (err) => {
      console.log(err)
    }, false);
  },
  existUserUnion:function(){
    setting.GET({ code: this.globalData.code}, "API/APIData.ashx?_op=ExistUserUnion", (data) => {
      // debugger
      if (data.success) {
        console.log("IsExist的值", data.data.IsExist);
    
        //用户已经授权
        // debugger
        if (data.data.IsExist===true){
          wx.setStorageSync(setting.setting.unionidKey, data.data.UserModel.UnionID);
          wx.setStorageSync(setting.setting.miniopenidKey, data.data.UserModel.OpenID);
          this.getUserid();
          this.globalData.hasAccredit = true;
          this.globalData.isshow = false;
          if (!this.globalData.cookBookId && this.globalData.path != "pages/productdetails/productdetails") {
            if (this.globalData.r) {
              // wx.showModal({
              //   title: 'app3',
              //   showCancel: false,
              //   content: this.globalData.r,
              //   success: function (res) { }
              // })  
              wx.redirectTo({
                url: this.globalData.r
              })
            }else{
              if (wx.getStorageSync('searchKey')) {
                wx.redirectTo({
                  url: '/pages/searchresult/searchresult?searchKey=' + wx.getStorageSync('searchKey') + "&s=" + wx.getStorageSync('s') + "&v=" + wx.getStorageSync('v') + "&c=" + wx.getStorageSync('c') + "&typeid=" + wx.getStorageSync('typeid') + "&subtypeid=" + wx.getStorageSync('subtypeid')
                })
              } else {
                wx.redirectTo({
                  url: '/pages/index/index'
                })
              }
            }      
          } else {
            // debugger
            console.log("测试从分享进来")
          }
        }else{//用户没有授权
          this.globalData.isshow = true;
          this.globalData.hasAccredit = false;
        }
        // 由于 existUserUnion 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.hasAccreditReadyCallback) {
          this.hasAccreditReadyCallback(data)
        }
      }
    }, (err) => {
      console.log(err)
    },false);

  },
  //获取产品和菜谱列表
  getTypes: function (success, failer) {
    if (this.globalData.types == null) {
      setting.GET({}, "API/APIData.ashx?_op=SubTypeQuery", (data) => {
        //console.log(data.data);
        if (data.success) {
          this.globalData.types = data.data
          if (success) {
            success(data.data);
          }
        }
        else {
          if (failer)
            failer(data.msg);
        }
      }, (err) => {
        if (failer)
          failer(data.msg);
      }, false);
    } else {
      if (success)
        success(this.globalData.types)
    }
  },

  //记录页面停留的时间
  getPageTimer: function (type, title, typeID, objID, time1, time2){
    setting.GET({ EventType: type, EventTitle: title, ObjectTypeID: typeID, ObjectID: objID, StartTime: time1, EndTime: time2 }, "API/APIData.ashx?_op=PageTimer", (data) => {
      // console.log(data.msg);
    }, (err) => { console.log(err) }, false);
  },

  //页面访问次数 + 按钮点击次数
  getEventLog: function (type, title, typeID, objID) {
    setting.GET({ EventType: type, EventTitle: title, ObjectTypeID: typeID, ObjectID: objID }, "API/APIData.ashx?_op=EventLog", (data) => {
      // console.log(data.msg);
    }, (err) => { console.log(err) }, false);
  },

  globalData: {
    userInfo:"",
    types: null,
    openId: '',
    unionId: '',
    code:'',
    placeholder: "Hi～今天想吃点什么？",
    formId:"",
    s:"",
    v: "",
    c:"",
    r:"",  //小程序的路径
    sid:"",
    isshow:true,//是否显示授权按钮
    path:"",//菜谱详情页分享来源
    cookBookId: "",//菜谱详情页分享带来的cookBookId
    hasAccredit:false,//是否授权
    isInvoking: 1, // 1:OnLunch调用getSessionID 0：onShow调用getSessionID
    time1: "",//进入页面时间
  }
})