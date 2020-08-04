const app = getApp()
var setting = {
  //正式站
  //payUrl: "https://philipswechat.com/", //微信 授权、支付域名
  //newVipUrl: "https://www.component.philips.com.cn/crm/", //crm新接口系统域名
  // URL: "https://cookbook.philipswechat.com/",
  // ImgURL: "https://cookbook.philipswechat.com",
  // h5Url: 'https://cec.philipswechat.com/',
  // appid: 'wx0fdfedca6ab8e73f',
  //测试站
  payUrl: "https://g.crmclick.com/", //微信 授权、支付域名
  newVipUrl: "https://vipapi.crmclick.com/",//crm新接口系统域名
  URL: "https://smallapp.crmclick.com/",
  ImgURL: "https://smallapp.crmclick.com",
  h5Url: 'https://h5.crmclick.com/',
  appid: 'wx6b345c0623fec986',
  // unionidKey: "unionid",
  // miniopenidKey: "openid", //小程序openid
  // useridKey: "userid",
  unionidKey: "unionidKey",
  miniopenidKey: "miniOpenId", //小程序openid
  useridKey: "userid",
  sessionidKey: "sessionid",
  GetCache: function(key) {
    try {
      return wx.getStorageSync(key);
    } catch (e) {
      return null;
    }
  }
}

var md5 = require("./MD5.js");

function getHeader(needuserid) {
  
  let MiniOpenID = "";
  let UserID = "";
  let UnionID = "";
  let sessionid = "";

    //用户是否是会员
  try {
    MiniOpenID = wx.getStorageSync("miniOpenId");
    UserID = wx.getStorageSync("vipUserId");
    UnionID =wx.getStorageSync("unionidKey");
    // MiniOpenID = wx.getStorageSync(setting.miniopenidKey);
    // UserID = wx.getStorageSync(setting.useridKey);
    // UnionID = wx.getStorageSync(setting.unionidKey);
    sessionid = wx.getStorageSync(setting.sessionidKey);
  } catch (e) {}
  if (needuserid === true) {
    if (UserID == "") {
      throw new Error("用户未登录");
    }
  }
  var header = {
    'content-type':'application/x-www-form-urlencoded', //'multipart/form-data',//'application/x-www-form-urlencoded',//'application/json',
    "MiniOpenID": MiniOpenID,
    "UserID": UserID,
    "UnionID": UnionID,
    "SessionID": sessionid,
    "Check": md5(MiniOpenID + "_" + UserID + "_" + UnionID)
  }
  return header;
}

var ajax = function(data, type, url, success, failer, needuserid) {
  let header = "";
  try {
    header = getHeader(needuserid);
  } catch (e) {
    failer(e);
    return;
  }
  wx.request({
    // dataType:'application/x-www-form-urlencoded',
    url: setting.URL + url,
    data: data,
    method: type,
    header: header,
    success: function(res) {
      // res=JSON.parse(res)
      if (res.data.success) {
        success(res.data);
      } else
        failer(res.data.msg);
    },
    fail(res) {
      // 
      failer("网络故障");
    }
  })
}
var GET = function(data, url, success, failer, needuserid) {
  ajax(data, "GET", url, success, failer, needuserid)

}
var POST = function(data, url, success, failer, needuserid) {
  ajax(data, "POST", url, success, failer, needuserid)

}
module.exports = {
  setting: setting,
  GET,
  POST
}