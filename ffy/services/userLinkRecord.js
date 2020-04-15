import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

// 获取孕期日记列表
const UserLinkRecord = {

  checkTCSelected: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserLinkRecord/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },
};

//问卷积分
const UserPoint = {
  getUserPoint: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserPoint/PostQAPoint`, {
      data: postdata,
    })
    return hr;
  },
};


//用户问答选择
const UserChoiceItem = {
  insertUserChoiceItem: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserChoiceItem/Post`, {
      data: postdata,
    })
    return hr;
  },
  getUserChoiceItem: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserChoiceItem/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },
};

export default {
  UserLinkRecord, UserPoint,UserChoiceItem
}
