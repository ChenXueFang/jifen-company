import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';


// 获取每日记录列表
const UserService = {

  //提交预约服务
  CommitYYService: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserOrder/Post`, {
      data: postdata,
    })
    return hr;
  },
};


export default {
  UserService
}