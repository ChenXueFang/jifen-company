var setting = {
  //正式站
  URL: "https://cookbook.philipswechat.com/",
  ImgURL: "https://cookbook.philipswechat.com",
  h5Url: 'https://cec.philipswechat.com/',
  //测试站
  // URL: "https://smallapp.crmclick.com/",
  // ImgURL: "https://smallapp.crmclick.com",
  // h5Url: 'https://h5.crmclick.com/',
  unionidKey: "unionid",
  miniopenidKey: "openid", //小程序openid
  useridKey: "userid",
  sessionidKey: "sessionid",
  pageSize: 6,
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
  let openid = "";
  let userid = "";
  let unionid = "";
  let sessionid = "";
  try {
    openid = wx.getStorageSync(setting.miniopenidKey);
    userid = wx.getStorageSync(setting.useridKey);
    unionid = wx.getStorageSync(setting.unionidKey);
    sessionid = wx.getStorageSync(setting.sessionidKey);
  } catch (e) {}
  if (needuserid === true) {
    if (userid == "") {
      throw new Error("用户未登录");
    }
  }
  var header = {
    'content-type': 'application/json',
    "OpenID": openid,
    "H5": userid,
    "UnionID": unionid,
    "SessionID": sessionid,
    "Check": md5(openid + "_" + userid + "_" + unionid)
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
    url: setting.URL + url,
    data: data,
    method: type,
    header: header,
    success: function(res) {
      if (res.data.success) {
        success(res.data);
      } else
        failer(res.data.msg);
    },
    fail(res) {
      // debugger
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