//app.js
//appid:wx4c528ff2aabe915b 孕妈的
import regeneratorRuntime from './libs/regenerator-runtime/runtime-module';
import authApi from './services/dataapi'
import dataApi2 from './services/enter' 
const setting = require("./utils/setting.js");
const util = require("./utils/util.js");

var apiUrl = setting.defaultUrl; //正式环境
var apiUrlDev = "https://www.mylife.philips.com.cn/ffymwebapi"; //开发环境
// var apiUrlDev = "http://localhost:8090"; //开发环境，本地测试每日签到功能//开发环境https://ffy.crmclick.com/webapi

var apiImgUrl = setting.defaultImgUrl; //正式环境-图片
var apiImgUrlDev = "https://www.mylife.philips.com.cn/ffymadnim/"; //开发环境

App({
  onLaunch: async function (options) {
    let that=this;
    wx.request({
      url: "https://ffy.crmclick.com/webapi/api/CheckEnv/GetHeaders",
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
      
        console.log('onLaunch-------::'+res.data.data);
        if (res.data.data == "devtools" || res.data.data =="0"){
          //if (res.data.data == "devtools") {
          wx.setStorageSync("apiurl", apiUrlDev);  
          wx.setStorageSync("apiImgurl", apiImgUrlDev);  
        }
        else{
          //正式
          wx.setStorageSync("apiurl", apiUrl);
          wx.setStorageSync("apiImgurl", apiImgUrl); 
        }


        let source = (options.query != null && options.query.source != undefined) ? options.query.source : '';
        // console.log('onLaunch--------source')
        // console.log(source)
        //放入缓存中
        wx.setStorage({
          key: 'source',
          data: source,
        })

        that.wxloginAndLog(source,options);

        // if (this.employIdCallback2) {
        //   console.log('onLaunch-------userInfoReadyCallback::');
        //   this.employIdCallback2(res.data.data)
        // }
      }
    })


 
   
    

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    loborchartdetail:null,
    timeoverdetail: null,
    currentLocation: '',
    invitetype: '',
    time1: ""
  },
  wxloginAndLog: async function (source,options){
    let hr = await authApi.wxApi.wxLoginCheck()
    // console.log(hr)
    // console.log("-------onLaunchonLaunchonLaunch----------")
    // console.log(wx.getStorageSync("wxauth").userid)
    let option = JSON.stringify(options);
    // console.log('app.js option-----' + option)
    // console.log('app.js>>options.scene--------------------' + options.scene);
    // var resultScene = this.sceneInfo(options.scene);
    // console.log(resultScene);

    //记录用户进入小程序的行为：
    //页面或按钮点击调用
    wx.getSystemInfo({
      success(res) {
        let dataParam = {
          UserId: wx.getStorageSync("wxauth").userid,
          UserRole: wx.getStorageSync("myrole").UserRole,
          FamilyId:wx.getStorageSync("familyId").FamilyId,
          EnterPath: options.path,
          Scene: options.scene,
          AppId: options.referrerInfo != null ? options.referrerInfo.appId : '',
          Source: source,
          QueryParams: JSON.stringify(options.query),
          ReferrerInfo: JSON.stringify(options.referrerInfo),
          SystemInfoBrand: res.brand,
          SystemInfoModel: res.model,
          SystemInfoPixelRatio: res.pixelRatio,
          SystemInfoScreenWidth: res.screenWidth,
          SystemInfoScreenHeight: res.screenHeight,
          SystemInfoLanguage: res.language,
          SystemInfoVersion: res.version,
          SystemInfoSystem: res.system,
          SystemInfoPlatform: res.platform,
          SystemInfoWifiEnabled: res.wifiEnabled,
          hideLoading: true
        };
        var hr = authApi.wxApi.saveUserEnterLog(dataParam);
        // console.log(hr)
      }
    })
  },

  // 页面访问次数 + 按钮点击次数
  getEventLog:async function (linkcode,openid) {
    var that = this;
    var uinfo=null;
    var urole=null;
    var ufamily=null;
    if (wx.getStorageSync("wxauth").userid == "" || wx.getStorageSync("wxauth").userid == null || wx.getStorageSync("wxauth").userid ==undefined){
      uinfo = null
    }else{
      uinfo = wx.getStorageSync("wxauth").userid
    }

    if (wx.getStorageSync("myrole").UserRole == "" || wx.getStorageSync("myrole").UserRole == null || wx.getStorageSync("myrole").UserRole == undefined) {
      urole = null
    } else {
      urole = wx.getStorageSync("myrole").UserRole
    }
    
    if (wx.getStorageSync("familyId").FamilyId == "" || wx.getStorageSync("familyId").FamilyId == null || wx.getStorageSync("familyId").FamilyId == undefined) {
      ufamily = null
    } else {
      ufamily = wx.getStorageSync("familyId").FamilyId
    }

    wx.getSystemInfo({
      success(res) {
        var hr = authApi.wxApi.getEventLog(uinfo, urole, ufamily,
          linkcode, openid, res.brand, res.model, res.pixelRatio, res.screenWidth, res.screenHeight, res.language, res.version, res.system, res.platform, res.wifiEnabled);
        // console.log(hr)
      }
    })
  },

  // 分享记录日志
  getShareLog: async function (logType, action) {
    var that = this;
    var uinfo = null;
    var urole = null;
    var ufamily = null;
    if (wx.getStorageSync("wxauth").userid == "" || wx.getStorageSync("wxauth").userid == null || wx.getStorageSync("wxauth").userid == undefined) {
      uinfo = null
    } else {
      uinfo = wx.getStorageSync("wxauth").userid
    }
    if (wx.getStorageSync("myrole").UserRole == "" || wx.getStorageSync("myrole").UserRole == null || wx.getStorageSync("myrole").UserRole == undefined) {
      urole = null
    } else {
      urole = wx.getStorageSync("myrole").UserRole
    }

    if (wx.getStorageSync("familyId").FamilyId == "" || wx.getStorageSync("familyId").FamilyId == null || wx.getStorageSync("familyId").FamilyId == undefined) {
      ufamily = null
    } else {
      ufamily = wx.getStorageSync("familyId").FamilyId
    }

    wx.getSystemInfo({
      success(res) {
        var hr = authApi.wxApi.getShareLog(uinfo,
          logType, action, urole, ufamily, res.brand, res.model, res.pixelRatio, res.screenWidth, res.screenHeight, res.language, res.version, res.system, res.platform, res.wifiEnabled);
        // console.log(hr)
      }
    })
  },

  onShow:async function (options) {
    if (this.globalData.time1 == "") {
      this.globalData.time1 = util.formatTime(new Date());
    }
  },
  onHide: function () {
    this.getPageTimer("130", "", this.globalData.time1, util.formatTime(new Date()));
  },
  //时长，记录页面停留的时间
  getPageTimer: async function (linkcode, openid, time1, time2) {
    var that = this;
    var uinfo = null;
    var familyid = null;
    var urole=null;
    if (wx.getStorageSync("wxauth").userid == "" || wx.getStorageSync("wxauth").userid == null || wx.getStorageSync("wxauth").userid == undefined) {
      uinfo = null;
    } else {
      uinfo = wx.getStorageSync("wxauth").userid;
    }
    if (wx.getStorageSync("myrole").UserRole == "" || wx.getStorageSync("myrole").UserRole == null || wx.getStorageSync("myrole").UserRole == undefined) {
      urole = null
    } else {
      urole = wx.getStorageSync("myrole").UserRole
    }
    if (wx.getStorageSync("familyId").FamilyId == "" || wx.getStorageSync("familyId").FamilyId == null || wx.getStorageSync("familyId").FamilyId == undefined) {
      familyid = null;
    } else {
      familyid = wx.getStorageSync("familyId").FamilyId
    }
    wx.getSystemInfo({
      success(res) {
        var hr = authApi.wxApi.getPageTimer(uinfo,urole, linkcode, time1, time2, familyid, openid, res.brand, res.model, res.pixelRatio, res.screenWidth, res.screenHeight, res.language, res.version, res.system, res.platform, res.wifiEnabled);
      }
    })
  },



  //场景值判断
  sceneInfo: function (s) {
    var scene = [];
    switch (s) {
      case 1001:
        scene.push(s, "发现栏小程序主入口");
        break;
      case 1005:
        scene.push(s, "顶部搜索框的搜索结果页");
        break;
      case 1006:
        scene.push(s, "发现栏小程序主入口搜索框的搜索结果页");
        break;
      case 1007:
        scene.push(s, "单人聊天会话中的小程序消息卡片");
        break;
      case 1008:
        scene.push(s, "群聊会话中的小程序消息卡片");
        break;
      case 1011:
        scene.push(s, "扫描二维码");
        break;
      case 1012:
        scene.push(s, "长按图片识别二维码");
        break;
      case 1014:
        scene.push(s, "手机相册选取二维码");
        break;
      case 1017:
        scene.push(s, "前往体验版的入口页");
        break;
      case 1019:
        scene.push(s, "微信钱包");
        break;
      case 1020:
        scene.push(s, "公众号profile页相关小程序列表");
        break;
      case 1022:
        scene.push(s, "聊天顶部置顶小程序入口");
        break;
      case 1023:
        scene.push(s, "安卓系统桌面图标");
        break;
      case 1024:
        scene.push(s, "小程序profile页");
        break;
      case 1025:
        scene.push(s, "扫描一维码");
        break;
      case 1026:
        scene.push(s, "附近小程序列表");
        break;
      case 1027:
        scene.push(s, "顶部搜索框搜索结果页“使用过的小程序”列表");
        break;
      case 1028:
        scene.push(s, "我的卡包");
        break;
      case 1029:
        scene.push(s, "卡券详情页");
        break;
      case 1031:
        scene.push(s, "长按图片识别一维码");
        break;
      case 1032:
        scene.push(s, "手机相册选取一维码");
        break;
      case 1034:
        scene.push(s, "微信支付完成页");
        break;
      case 1035:
        scene.push(s, "公众号自定义菜单");
        break;
      case 1036:
        scene.push(s, "App分享消息卡片");
        break;
      case 1037:
        scene.push(s, "小程序打开小程序");
        break;
      case 1038:
        scene.push(s, "从另一个小程序返回");
        break;
      case 1039:
        scene.push(s, "摇电视");
        break;
      case 1042:
        scene.push(s, "添加好友搜索框的搜索结果页");
        break;
      case 1044:
        scene.push(s, "带shareTicket的小程序消息卡片");
        break;
      case 1047:
        scene.push(s, "扫描小程序码");
        break;
      case 1048:
        scene.push(s, "长按图片识别小程序码");
        break;
      case 1049:
        scene.push(s, "手机相册选取小程序码");
        break;
      case 1052:
        scene.push(s, "卡券的适用门店列表");
        break;
      case 1053:
        scene.push(s, "搜一搜的结果页");
        break;
      case 1054:
        scene.push(s, "顶部搜索框小程序快捷入口");
        break;
      case 1056:
        scene.push(s, "音乐播放器菜单");
        break;
      case 1058:
        scene.push(s, "公众号文章");
        break;
      case 1059:
        scene.push(s, "体验版小程序绑定邀请页");
        break;
      case 1064:
        scene.push(s, "微信连Wifi状态栏");
        break;
      case 1067:
        scene.push(s, "公众号文章广告");
        break;
      case 1068:
        scene.push(s, "附近小程序列表广告");
        break;
      case 1072:
        scene.push(s, "二维码收款页面");
        break;
      case 1073:
        scene.push(s, "客服消息列表下发的小程序消息卡片");
        break;
      case 1074:
        scene.push(s, "公众号会话下发的小程序消息卡片");
        break;
      case 1089:
        scene.push(s, "微信聊天主界面下拉");
        break;
      case 1090:
        scene.push(s, "长按小程序右上角菜单唤出最近使用历史");
        break;
      case 1092:
        scene.push(s, "城市服务入口");
        break;
      default:
        scene.push("未知入口");
        break;
    }
    return scene;
  }
})