import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

// 获取每日记录列表
const DayRecord = {
  GetListBySC: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/PregnantRecord/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin

  //新增胎动记录
  AddPregnantMoveRecord: async(postdata) => {
      var hr = await wxr.post(`${setting.url}/api/PregnantMoveRecord/Post`, {
      data: postdata,
    })
    return hr;
  },

  //查看爸爸的留言
  GetLeaveMessage: async(postdata) => {
      var hr = await wxr.post(`${setting.url}/api/PregnantLeaveMsg/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },

  //给妈妈留言
  AddLeaveMessage: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/PregnantLeaveMsg/Post`, {
      data: postdata,
    })
    return hr;
  },
  
  //显示最新胎动数
  GetNewPMRecord: async (motionId) => {
    var hr = await wxr.get(`${setting.url}/api/PregnantMoveRecord/GetById?id=${motionId}`)
    return hr;
  },

  //获取体重曲线数据
  GetWeightCharData: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/PregnantRecord/GetWeightCharDataByDate`, {
      data: postdata,
    })
    return hr;
  },
  //获取运动曲线数据
  GetSportCharData: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/PregnantRecord/GetSportCharDataByDate`, {
      data: postdata,
    })
    return hr;
  },
  //获取体重记录
  getWeightRecord: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/PregnantRecord/GetWeightRecord`, {
      data: postdata,
    })
    return hr;
  },
  //获取胎动记录
  getPregnantMoveRecord: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/PregnantMoveRecord/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },
  //获取运动记录
  GetSportRecord: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/PregnantRecord/GetSportRecord`, {
      data: postdata,
    })
    return hr;
  },
  //获取心情
  GetMoodCharDataByDate: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/PregnantRecord/GetMoodCharDataByDate`, {
      data: postdata,
    })
    return hr;
  },
  //获取妊娠反应
  GetRSCharDataByDate: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/PregnantRecord/GetPregnantResponseCharDataByDate`, {
      data: postdata,
    })
    return hr;
  },
  //是否获得体重推荐
  updateWeightSuggestById: async (userid, postdata) => {
    var hr = await wxr.put(`${setting.url}/api/Users/Put?id=${userid}`, {
      data: postdata,
    })
    return hr;
  },
   //是否获得体重推荐
  getWeightSuggest: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Users/GetById`, {
      data: postdata,
    })
    return hr;
  },
};


const UpdateRecord = {
  updateRecordById: async (recordid,postdata) => {
    var hr = await wxr.put(`${setting.url}/api/PregnantRecord/Put?id=${recordid}`, {
      data: postdata,
    })
    return hr;
  }
};

// 获取文章列表
const GetEssayList = {
  GetListBySC: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Sys_ClassRomm/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin
};

// 文章取消收藏功能
const CancelCollection = {
  CancleApi: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserCollection/CancleCollection`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin
};

// 新增数据
const Insert = {
  Post: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/PregnantRecord/Post`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin
};

// 获取文章详情
const GetEssay = {
  GetById: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Sys_ClassRomm/GetById`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin
};

export default {
  DayRecord, UpdateRecord, Insert
}