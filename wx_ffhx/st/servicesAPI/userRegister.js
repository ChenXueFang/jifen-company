import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';


// 获取每日记录列表
const UserRegister = {

  //检查SN号
  CheckSN: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/UserDeviceExtension/CheckSN`,{
      data: postdata,
    })
    return hr;
  },
  //完成注册SN
  CompleteRegisitSN: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/UserDeviceExtension/CompleteRegisitSN`, {
      data: postdata,
    })
    return hr;
  },
  
  //检查sn是否存在
  CheckHasSN: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserDeviceExtension/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },

  //加入家庭
  ApplyJoinFamily: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMemberExtension/ApplyJoinFamily`, {
      data: postdata,
    })
    return hr;
  },
  
  //根据SN或家庭组名查询
  SelectFamily: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyExtension/SelectFamily`, {
      data: postdata,
    })
    return hr;
  },

  //根据家庭组id获取家庭信息
  GetMyFamily: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMemberExtension/GetMyFamily`, {
      data: postdata,
    })
    return hr;
  },

  //根据userid查询数据 /api/Users/GetByGuid
  Getuserinfo: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Users/GetByGuid`, {
      data: postdata,
    })
    return hr;
  },

  //图表
  GetCharData:async(postdata)=>{
    var hr = await wxr.get(`${setting.url}/api/DeviceData/GetCharData`, {
      data: postdata,
    })
    return hr;
  },

  //授权获取天气
  GetWeather: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Weather/GetWeather`, {
      data: postdata,
    })
    return hr;
  },
};


export default {
  UserRegister
}