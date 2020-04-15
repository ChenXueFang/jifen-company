import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

const LaborChart = {
  // 获取产检列表
  GetListBySC: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/LaborInspectionRecord/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end GetListBySC

  // 修改时间
  DateChange: async (recordid,postdata) => {
    var hr = await wxr.put(`${setting.url}/api/LaborInspectionRecord/Put?id=${recordid}`, {
      data: postdata,
    })
    return hr;
  }, //end DateCh
  
  // 产检详情，获取产检时间
  GetlaborTime: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/LaborInspectionRecord/GetById`, {
      data: postdata,
    })
    return hr;
  },

  // 产检详情，获取产检富文本
  GetlaborEssay: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Temp_LaborInspection/GetById`, {
      data: postdata,
    })
    return hr;
  },
 
  // 获取产检提醒时间表
  GetWarm: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/LaborInspectionRemindConfig/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },

  // 新增提醒时间
  AddWarmPost: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/LaborInspectionRemindConfig/Post`, {
      data: postdata,
    })
    return hr;
  },

  // 更新替换提醒时间
  ChangeWarmPut: async (postdata) => {
    var hr = await wxr.put(`${setting.url}/api/LaborInspectionRemindConfig/Put?id=` + postdata.id, {
      data: postdata,
    })
    return hr;
  },

  // 获取是否开启提醒
  IsWarm: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Users/GetById`, {
      data: postdata,
    })
    return hr;
  },

  // 设置开启或关闭提醒
  SetWarm: async (userid, postdata) => {
    var hr = await wxr.put(`${setting.url}/api/Users/Put?id=${userid}`, {
      data: postdata,
    })
    return hr;
  },




};

export default {
  LaborChart
}