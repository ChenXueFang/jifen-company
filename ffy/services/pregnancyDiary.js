import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting'; 

// 获取孕期日记列表
const PregnancyDiary = {

  GetListBySC: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/PregnantNote/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin

  //新增孕期记录
  AddPDairyinfo: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/PregnantNote/PostNote`, {
      data: postdata,
    })
    return hr;
  },
  

  //开启孕期记录权限
  GetAuthForFamily: async (uId, openid) => {
    var hr = await wxr.get(`${setting.url}/api/Users/OpenNote?userId=${uId}&IsOpen=${openid}`)
    return hr;
  },


  //查看日记详情
  GetDetailByNoteId: async (nId) => {
    var hr = await wxr.get(`${setting.url}/api/PregnantNote/GetById?id=${nId}`)
    return hr;
  },

  //查询当前登录人是否有查看相册的权限
  GetAuthByUserId: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Users/CheckPhotoPermion`, {
      data: postdata,
    })
    return hr;
  },

  // 查看开关按钮状态
  switchState: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Users/GetById`, {
      data: postdata,
    })
    return hr;
  },
};

//孕期相册风格问卷调查
const NoteSurvey = {
  addNoteSurvey: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/NoteSurvey/Post`, {
      data: postdata,
    })
    return hr;
  },
  getLastNoteSurvey: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/NoteSurvey/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },
};



export default {
  PregnancyDiary, NoteSurvey
}