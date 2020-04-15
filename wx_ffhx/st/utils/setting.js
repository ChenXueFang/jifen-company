var setting = {
  //测试站
  isDebug:false,
  url: wx.getStorageSync("apiurl"), 
  urlImg: wx.getStorageSync("apiImgurl"),
  defaultUrl: 'https://stapp.philipswechat.com/stMiniAppWebapi/',
  defaultImgUrl: 'https://stapp.philipswechat.com/stadnim/',
  // url: "https://st.crmclick.com:5001", //测式
  // urlImg: "https://st.crmclick.com:5004/", //测式
  appid: "wxf738199cd27e9ad1",//"wxca854fb450069cea",
  token: "A256FCAA-0609-JIFEN-610-321D58AB4308",
  unionidKey: "unionidKey",
  h5OpenId: 'h5OpenId',
  miniOpenId: 'miniOpenId',
  sessionidKey: "sessionid",
  getCache: function (key) {
    try {
      return wx.getStorageSync(key);
    }
    catch (e) {
      return null;
    }
  },
  vipUserID: function () {
    return wx.getStorageSync("vipUserId");

  }
}
var md5 = require("./md5.js");
function getHeader(needuserid) {
  let miniopenId = "";
  let userid = "";
  let unionid = "";
  let sessionid = "";
  let timestamp = "";
  let sign = "";
  let h5openId = "";
  let openid = "";
  try {
    //userid = wx.getStorageSync(setting.useridKey);

    var wxauth = wx.getStorageSync("wxauth");
    if (wxauth) {
      userid = wxauth.userid;
      openid = wxauth.openid;
      timestamp = wxauth.timestamp;
      miniopenId = wxauth.wechatOpenid;
      sign = wxauth.sign;
    }
  }
  catch (e) { }
  if (needuserid === true) {
    if (userid == "") {
      //throw new Error("用户未登录");
    }
  }
  var header = {
    //'content-type': 'application/x-www-form-urlencoded',
    'content-type': 'application/json',
    // 'appid': 'appid0000001',
    // 'openid': 'wx0000001',
    // 'timespan': '122554221',
    // 'sign': 'oopopowoie908938493iueruie33333'
    // "H5": userid,
    // "H5OpenId": h5openId,
    "openid": openid,
    "timestamp": timestamp,
    "sign": sign,
    "userid": userid
    // "UnionID": unionid,
    // "SessionID": sessionid,
    // "Check": md5(miniopenId+"_"+h5openId+"_" +unionid)
  }
  return header;
}
var ajax = function (data, type, url, success, failer, needuserid) {

  let header = "";
  try {
    header = getHeader(needuserid);
  }
  catch (e) {
    failer(e);
    return;
  }
  // debugger;
  wx.request({
    url: setting.url + url,
    data: data,
    method: type,
    header: header,
    success: function (res) {
      wx.hideLoading();
      if (res.data && res.data.state == 1) {
        success(res.data);
      }
      else {
        failer(res.data)
      }

    },
    fail(res) {
      wx.hideLoading();
      failer("网络故障");
    }
  })
}
var GET = function (data, url, success, failer, needuserid) {

  ajax(data, "GET", url, success, failer, needuserid)

}
var POST = function (data, url, success, failer, needuserid) {
  ajax(data, "POST", url, success, failer, needuserid)

}
var PUT = function (data, url, success, failer, needuserid) {
  // url = url + '?id=' + data.id;
  ajax(data, "PUT", url, success, failer, needuserid)

}
var DELETE = function (data, url, success, failer, needuserid) {
  // url = url+'?id='+data.id;
  ajax(null, "DELETE", url, success, failer, needuserid)

}
module.exports = {
  setting,
  GET,
  POST,
  PUT,
  DELETE
}