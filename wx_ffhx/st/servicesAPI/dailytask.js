import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';


// 日志
const DailyTask = {

  //新增日志
  InsertDailyTask: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/DailyTask/Post`, {
      data: postdata,
    })
    return hr;
  },
  //修改日志
  UpdateDailyTask: async (postdata) => {
    var hr = await wxr.put(`${setting.url}/api/DailyTask/Put`, {
      data: postdata,
    })
    return hr;
  }, 
  //查询日志
  GetDailyTaskByCurrentDate: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/DailyTask/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },
  //根据年月查询日记记录
  GetDailysByYM: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/DailyTask/GetRecordDays`, {
      data: postdata,
    })
    return hr;
  },

  //增加问卷调查
  AddQuestionNaire: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/QuestionNaire/Post`, {
      data: postdata,
    })
    return hr;
  },
  //查询问卷是否填写
  CheckQuestionNaire: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/QuestionNaire/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },
  //修改问卷调查
  UpdateQuestionNaire: async (postdata) => {
    var hr = await wxr.put(`${setting.url}/api/QuestionNaire/Put`, {
      data: postdata,
    })
    return hr;
  }, 

  //首页消息
  GetIndexMessage: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/DeviceData/GetIndexMessage`, {
      data: postdata,
    })
    return hr;
  },
};


export default {
  DailyTask
}