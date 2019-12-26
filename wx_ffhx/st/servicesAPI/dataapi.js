import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';
const wxApi = {
  // 设置我是妈妈
  SetMother: async(postdata) => {
    //console.log(postdata)
    var hr = await wxr.get(`${setting.url}/api/Users/SetMother`, {
      data: postdata,
    })
    return hr;
  }, //end GetListBySC

  myFimilyCheck2: () => {
    let myrole = wx.getStorageSync("myrole");
    let phoneNumber = wx.getStorageSync("wxphone");

    if (myrole == null || myrole.UserId == null || myrole.UserId == "") {
      return true;
    } else {
      return false;
    }
    if (phoneNumber == null || phoneNumber == "") {
      return true;
    } else {
      return false;
    }

  }, //myFimilyCheck

  myFimilyCheck: () => {
    let chk =wxApi.myFimilyCheck2();
    if(chk)
    {
     
      wx.redirectTo({
        url: '/pages/enterPro/enterPro'
      })
    }
    return chk;

  }, //myFimilyCheck

  wxLoginCheck: async(source) => {
    // debugger
    let wxauth = wx.getStorageSync('wxauth');
    console.log("wxLoginCheck wxauth+")
    console.log(wxauth)
    if (wxauth == null || wxauth == '') {
      let res2 = await new Promise((resolve, reject) => {


        wx.login({

          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            // wx.showToast({
            //   title: "登录成功！", //res.data.msg,
            //   icon: 'none',
            //   duration: 2000
            // })
            if (res.code) {
              // debugger;
              resolve(res);

            } else {
              // console.log('登录失败！' + res.errMsg)
              reject(res)
            }
          }
        })
      });//Promise
      console.log("res2 :" + res2)
      // console.log('wxLoginCheck：检查是否登录');
      let loginInfo = await wxApi.wxLogin(res2, source);
     wxauth=loginInfo;
    }//if wxauth
    return wxauth;
  },//wxLoginCheck

  //登录
  wxLogin: async(res,source) => {


    var hr = await wxr.post(`${setting.url}/api/MiniApp/wxLogin?code=${res.code}&source=${source}`)

    wx.setStorage({
      key: 'wxauth',
      data: hr.data,
    })
    // debugger
    console.info('wxLogin:' + JSON.stringify(hr))
    return hr;
  }, //end wxLogin

  //获取手机号
  wxPhoneNumber: async(res, cb) => {
    // debugger
    var hr = await wxr.post(`${setting.url}/api/MiniApp/wxPhoneNumber`, {
      data: {
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv,
      }
    })
    console.info('wxPhoneNumber:' + JSON.stringify(hr))
    return hr;
  }, //end wxPhoneNumber

  //获取用户敏感数据
  wxUserInfo: async(res, cb) => {
    var hr = await wxr.post(`${setting.url}/api/MiniApp/wxUserInfo`, {
      data: {
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv,
      }
    })
    // console.info('wxUserInfo:' + JSON.stringify(hr))
    if(hr.state=="1"){
      var stor = wx.getStorageSync("wxauth")
      stor.isLogin = true;
      stor.province = hr.data.province;

      wx.setStorageSync('wxauth', stor)
    }
    return hr;
  }, //end wxUserInfo

  //验证用户非敏感数据
  wxValidateUserSign: async(res, cb) => {
    var hr = await wxr.post(`${setting.url}/api/MiniApp/wxValidateUserSign`, {
      data: {
        rawData: res.detail.rawData,
        signature: res.detail.signature,
      }
    })
    console.info('wxValidateUserSign:' + JSON.stringify(hr))
    return hr;
  }, //end wxUserInfo


  //获取微信步数
  wxWeRunData: async(res, choicedate, cb) => {
    var hr = await wxr.post(`${setting.url}/api/MiniApp/wxWeRunData`, {
      data: {
        encryptedData: res.encryptedData,
        choicedate: choicedate,
        iv: res.iv
      }
    })
    console.info('wxWeRunData:' + JSON.stringify(hr))
    return hr;
  }, //end wxUserInfo

  //页面或按钮点击调用
  getEventLog: async (uid, userguid, linkcode, openid, brand, phonemodel, pixelratio, screenwidth, screenheight, language, version, phsystem, platform, wifienabled) => {
    var hr = await wxr.post(`${setting.url}/api/UserLinkRecord/Post`, {
      data: {
        UserId: uid,
        UserIdGuid:userguid,
        LinkCode: linkcode,
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

  //时长，记录页面停留的时间
  getPageTimer: async (uid, userid, linkcode, time1, time2, FId,openid, brand, phonemodel, pixelratio, screenwidth, screenheight, language, version, phsystem, platform, wifienabled) => {
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
  wxCheckWechatSubscribe: async(res) => {

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