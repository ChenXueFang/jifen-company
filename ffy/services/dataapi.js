import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';
setting.url = wx.getStorageSync("apiurl") == '' ? setting.defaultUrl : wx.getStorageSync("apiurl");
setting.urlImg = wx.getStorageSync("apiImgurl") == '' ? setting.defaultImgUrl : wx.getStorageSync("apiImgurl");
const wxApi = {
  // 设置我是妈妈
  SetMother: async(postdata) => {
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
    let chk = wxApi.myFimilyCheck2();
    if (chk) {

      wx.redirectTo({
        url: '/pages/enterPro/enterPro'
      })
    }
    return chk;

  }, //myFimilyCheck

  wxLoginCheck: async() => {
    // debugger
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
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            // wx.showToast({
            //   title: "登录成功！", //res.data.msg,
            //   icon: 'none',
            //   duration: 2000
            // })
            if (res.code) {
              resolve(res);

            } else {
              reject(res)
            }
          }
        })
      }); //Promise
      let loginInfo = await wxApi.wxLogin(res2);
      wxauth = loginInfo;
    } 
    return wxauth;
  }, 

  //登录
  wxLogin: async(res) => {

    //优化请求好几次的问题
    let wxauth = wx.getStorageSync('wxauth');
    if (wxauth == '' ||wxauth == null || wxauth == undefined) {
      setting.url = wx.getStorageSync("apiurl") == '' ? setting.defaultUrl : wx.getStorageSync("apiurl");
      var hr = await wxr.post(`${setting.url}/api/MiniApp/wxLogin?code=${res.code}`)
      if (hr.data != null && hr.data.userid != null){
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
  wxPhoneNumber: async(res, cb) => {
    // debugger
    var hr = await wxr.post(`${setting.url}/api/MiniApp/wxPhoneNumber`, {
      data: {
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv,
      }
    })
    return hr;
  }, 

  //获取用户敏感数据
  wxUserInfo: async(res, cb) => {
    var hr = await wxr.post(`${setting.url}/api/MiniApp/wxUserInfo`, {
      data: {
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv,
      }
    })
    if (hr.state == "1") {
      var stor = wx.getStorageSync("wxauth")
      stor.isLogin = true;

      wx.setStorageSync('wxauth', stor)
    }
    return hr;
  }, 

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
  }, 


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
  }, 

  //时长，记录页面停留的时间
  getPageTimer: async (uid , urole, linkcode, time1, time2, FId, openid, brand, phonemodel, pixelratio, screenwidth, screenheight, language, version, phsystem, platform, wifienabled) => {
    var hr = await wxr.post(`${setting.url}/api/UserStayPageTime/Post`, {
      data: {
        UserId: uid,
        UserRole: urole,
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

  //页面或按钮点击调用
  getEventLog: async (userid, urole, ufamily, linkcode, openid, brand, phonemodel, pixelratio, screenwidth, screenheight, language, version, phsystem, platform, wifienabled) => {
    var hr = await wxr.post(`${setting.url}/api/UserLinkRecord/Post`, {
      data: {
        UserId: userid,
        UserRole: urole,
        FamilyId: ufamily,
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
        hideLoading:true
      }
    })
    return hr;
  },

  //分享记录日志
  getShareLog: async (userid, logType, action, urole, ufamily,brand, phonemodel, pixelratio, screenwidth, screenheight, language, version, phsystem, platform, wifienabled) => {
    // debugger
    var hr = await wxr.post(`${setting.url}/api/Sys_Log/Post`, {
      data: {
        UserId: userid,
        UserRole: urole,
        FamilyId: ufamily,
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
    var hr = await wxr.post(`${setting.url}/api/MiniApp/wxCheckWechatSubscribe?unionid=${wxauth.unionid}`)

    console.info('wxCheckWechatSubscribe:' + JSON.stringify(hr))
    return hr;
  }, 


  //记录用户进入小程序
  saveUserEnterLog: async(dataParam) => {
    var hr = await wxr.post(`${setting.url}/api/UserEnterAppLog/Post`, {
      data: dataParam
    })
    return hr;
  } //记录用户进入小程序

};

export default {
  wxApi
}