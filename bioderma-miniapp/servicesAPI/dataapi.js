import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import posterApi from 'posterapi'
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';
// setting.url = wx.getStorageSync("apiurl") == '' ? setting.defaultUrl : wx.getStorageSync("apiurl");
// setting.urlImg = wx.getStorageSync("apiImgurl") == '' ? setting.defaultImgUrl : wx.getStorageSync("apiImgurl");

const wxApi = {
  wxLoginCheck: async (source) => {
    if (source == undefined) {
      source = ''
    }
    let wxauth = wx.getStorageSync('wxauth');
    let checkSession = await new Promise((resolve, reject) => {

      wx.checkSession({
        success() {
          //session_key 未过期，并且在本生命周期一直有效
          resolve(true);
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          resolve(false)
        }
      })
    });//Promise
    if (checkSession == false || wxauth == null || wxauth == '') {
      let res2 = await new Promise((resolve, reject) => {

        wx.login({
          success: res => {
            if (res.code) {
              resolve(res);

            } else {
              reject(res)
            }
          }
        })
      }); //Promise
      let loginInfo = await wxApi.wxLogin(res2, source);
      wxauth = loginInfo;
    }
    return wxauth;
  },

  //登录
  wxLogin: async (res, source) => {
    let wxauth = wx.getStorageSync('wxauth');
    if (wxauth == '' || wxauth == null || wxauth == undefined) {
      // setting.url = wx.getStorageSync("apiurl") == '' ? setting.defaultUrl : wx.getStorageSync("apiurl");
      var hr = await wxr.post(`${setting. miniWechatApi}/api/MiniApp/wxLogin?code=${res.code}&appid=${setting.appid}`)
      if (hr.data != null && hr.data.userid != null) {
        wx.setStorage({
          key: 'wxauth',
          data: hr.data,
        })
      }
      return hr;
    } else {
      return wxauth;
    }
    return hr;
  },

  //获取手机号
  wxPhoneNumber: async (res, cb) => {
    // debugger 
    var hr = await wxr.post(`${setting. miniWechatApi}/api/MiniApp/wxPhoneNumber`, {
      data: {
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv,
      }
    })
    console.info('wxPhoneNumber:' + JSON.stringify(hr))
    return hr;
  }, //end wxPhoneNumber

  //获取用户敏感数据, 用户确认授权 获取小程序的openid unionid 公众号的openid
  wxUserInfo: async (res, cb) => {
     var h=await wx.login({
      success: async reslogin => {
        var hr = await wxr.postform(`${setting. miniWechatApi}/api/MiniApp/GetUserInfo`, {
          data: {
            encryptedData: res.detail.encryptedData,
            iv: res.detail.iv,
            appid: setting.appid,
            code: reslogin.code,
            signature: res.detail.signature
          }
        })
        if (hr.state == '1') {
          var stor = wx.getStorageSync("wxauth")
          stor.data = hr.data;
          wx.setStorageSync('wxauth', stor)

          // 判断用户是否登录
          var hrC = await posterApi.posterapi.checkLogin({
            unionId: wx.getStorageSync("wxauth").data.unionid,
          });
          if (hrC.success) {
            if (hrC.data) {
              stor.isAuth = hrC.data.Exists;
              stor.userid = hrC.data.UserInfo?hrC.data.UserInfo.ID:'';
              wx.setStorageSync('wxauth', stor)
              // 判断是否登录
              if (!hrC.data.Exists) {
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            }
          }
          return hrC
          // 判断用户是否登录 end
        }
        return hr;
      }
    });
    return h;
  }, //end wxUserInfo

  //获取用户敏感数据, 用户确认授权 获取小程序的openid unionid 公众号的openid
  wxUserInfo_New: async (res,callback) => {
    wx.login({
      success: async reslogin => {
        var hr = await wxr.postform(`${setting. miniWechatApi}/api/MiniApp/GetUserInfo`, {
          data: {
            encryptedData: res.detail.encryptedData,
            iv: res.detail.iv,
            appid: setting.appid,
            code: reslogin.code,
            signature: res.detail.signature
          }
        })
        if (hr.state == '1') {
          var stor = wx.getStorageSync("wxauth")
          stor.data = hr.data;
          wx.setStorageSync('wxauth', stor)

          // 判断用户是否登录
          var hrC = await posterApi.posterapi.checkLogin({
            unionId: wx.getStorageSync("wxauth").data.unionid,
          });
          if (hrC.success) {
            if (hrC.data) {
              stor.isAuth = hrC.data.Exists;
              stor.userid = hrC.data.UserInfo?hrC.data.UserInfo.ID:'';
              wx.setStorageSync('wxauth', stor)
              // 判断是否登录
              if (!hrC.data.Exists) {
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            }
          }
          if(callback)
          callback(hrC)
          return
          //return hrC
          // 判断用户是否登录 end
        }
        if(callback)
        callback(hr)
        //return hr;
      }
    });
  },

  //验证用户非敏感数据
  wxValidateUserSign: async (res, cb) => {
    var hr = await wxr.post(`${setting. miniWechatApi}/api/MiniApp/wxValidateUserSign`, {
      data: {
        rawData: res.detail.rawData,
        signature: res.detail.signature,
      }
    })
    console.info('wxValidateUserSign:' + JSON.stringify(hr))
    return hr;
  }, //end wxUserInfo

  //页面或按钮点击调用
  getEventLog: async (eventType, EventTitle, ObjectTypeID, ObjectID, PageName, SourcePageName, unionid) => {
    var hr = await wxr.postform(`${setting.url}/api/BasicData.ashx?_op=SaveEventLog`, {
      data: {
        EventType: eventType,
        EventTitle: EventTitle,
        ObjectTypeID: ObjectTypeID,
        ObjectID: ObjectID,
        PageName: PageName,
        SourcePageName: SourcePageName,
        openid: unionid
      }
    })
    return hr;
  },

  //时长，记录页面停留的时间
  getPageTimer: async (uid, userid, linkcode, time1, time2, FId, openid, brand, phonemodel, pixelratio, screenwidth, screenheight, language, version, phsystem, platform, wifienabled) => {
    var hr = await wxr.post(`${setting.url}/api/UserStayPageTime/Post`, {
      data: {
        UserId: uid,
        UserIdGuid: userid,
        LinkCode: linkcode,
        StartTime: time1,
        EndTime: time2,
        FamilyId: FId,
        Remark: openid,
        SystemInfoBrand: brand,
        SystemInfoModel: phonemodel,
        SystemInfoPixelRatio: pixelratio,
        SystemInfoScreenWidth: screenwidth,
        SystemInfoScreenHeight: screenheight,
        SystemInfoLanguage: language,
        SystemInfoVersion: version,
        SystemInfoSystem: phsystem,
        SystemInfoPlatform: platform,
        SystemInfoWifiEnabled: wifienabled,
        hideLoading: true
      }
    })
    return hr;
  },

  //右上角页面分享 分享日志
  getPageShare: async (uid, userid, linkcode, articleguid, path, FId, brand, phonemodel, pixelratio, screenwidth, screenheight, language, version, phsystem, platform, wifienabled) => {
    var hr = await wxr.post(`${setting.url}/api/UserShareLog/Post`, {
      data: {
        UserId: uid,
        UserIdGuid: userid,
        LinkCode: linkcode,
        ExtensionCode: articleguid,
        PageDetail: path,
        FamilyId: FId,
        SystemInfoBrand: brand,
        SystemInfoModel: phonemodel,
        SystemInfoPixelRatio: pixelratio,
        SystemInfoScreenWidth: screenwidth,
        SystemInfoScreenHeight: screenheight,
        SystemInfoLanguage: language,
        SystemInfoVersion: version,
        SystemInfoSystem: phsystem,
        SystemInfoPlatform: platform,
        SystemInfoWifiEnabled: wifienabled,
        hideLoading: true
      }
    })
    return hr;
  },

  //分享  记录日志
  getShareLog: async (uid, logType, action, brand, phonemodel, pixelratio, screenwidth, screenheight, language, version, phsystem, platform, wifienabled) => {
    // debugger
    var hr = await wxr.post(`${setting.url}/api/Sys_Log/Post`, {
      data: {
        UserId: uid,
        LogType: logType,
        Action: action,
        SystemInfoBrand: brand,
        SystemInfoModel: phonemodel,
        SystemInfoPixelRatio: pixelratio,
        SystemInfoScreenWidth: screenwidth,
        SystemInfoScreenHeight: screenheight,
        SystemInfoLanguage: language,
        SystemInfoVersion: version,
        SystemInfoSystem: phsystem,
        SystemInfoPlatform: platform,
        SystemInfoWifiEnabled: wifienabled,
        hideLoading: true
      }
    })
    return hr;
  },

  // 是否关注公众号
  wxCheckWechatSubscribe: async (res) => {

    var wxauth = wx.getStorageSync("wxauth")
    console.log(wxauth)
    // debugger;
    var hr = await wxr.post(`${setting.url}/api/MiniApp/wxCheckWechatSubscribe?unionid=${wxauth.unionid}`)

    console.info('wxCheckWechatSubscribe:' + JSON.stringify(hr))
    return hr;
  }, //end wxCheckWechatSubscribe

};

export default {
  wxApi
}