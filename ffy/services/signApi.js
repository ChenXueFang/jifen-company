import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

const Sign = {
  // 获取日历签到记录
  getUserSign: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserSign/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },

  // 点击签到
  postClickSign: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserSign/PostSign`, {
      data: postdata,
    })
    return hr;
  },

  // 补签
  postSuppleSign: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserSign/PostSuppleSign`, {
      data: postdata,
    })
    return hr;
  },

  // 获取总的幸运星数，勋章，补签卡数量
  getSignInfo: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserSign/GetSignInfo`, {
      data: postdata,
    })
    return hr;
  },



};

export default {
  Sign
}