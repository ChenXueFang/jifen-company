import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import { setting } from '../utils/setting';

const wxRequest = async (url, params = {}) => {

  var wxauth = wx.getStorageSync("wxauth");

  


  
  // 所有的请求，header默认携带token
  let header = params.header || {
    'Content-Type': 'application/json',
    
  }
  Object.assign(header, {
    'Content-Type': 'application/json',
  })

  // debugger;
  if (wxauth) {
    
    Object.assign(header, {
      userid: wxauth.userid, //读取cookie
        openid: wxauth.openid, //读取cookie
        sign: wxauth.sign, //读取cookie
        timestamp: wxauth.timestamp //读取cookie
      
    })
  }

  let data = params.data || {}
  let method = params.method || 'GET'
  // hideLoading可以控制是否显示加载状态
  if ((data.hideLoading != '' || data.hideLoading != null) && !data.hideLoading) {
    // 避免多次出现加载动画
    setTimeout(function () {
      wx.showLoading({
        title: '加载中...',
      })
    },350)
    setTimeout(function () {
      wx.hideLoading()
    },750)
  
  }
 

  let res = await new Promise((resolve, reject) => {
    wx.request({
      url:  url,
      method,
      data,
      header,
      success: (res) => {
       
        if (res && res.statusCode == 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: (e) => {
        wx.hideLoading()
      }
    })
  })

  // wx.showToast({
  //   title: "url:"+url
  //   +"-----------------------------data:"+JSON.stringify(data)
  //   +"-----------------------------res:" + JSON.stringify(res.data) , //res.data.msg,
  //   icon: 'none',
  //   duration: 6000
  // })
  return res
}


const get = (url, params = {}) => {
  params.method = "GET";
  return wxRequest(url, params)
};

const post = (url, params = {}) => {
  params.method = "POST";
  return wxRequest(url, params)
};

const put = (url, params = {}) => {
  params.method = "PUT";
  //url = url + '?id=' + params.data.id
  return wxRequest(url, params)
};

const del = (url, params = {}) => {
  params.method = "DELETE";
  url = url + '?id=' + params.data.id
  return wxRequest(url, params)
};

export default {
  wxRequest,
  get,
  post,
  put,
  del,
}