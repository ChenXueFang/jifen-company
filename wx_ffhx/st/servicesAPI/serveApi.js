import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

const serveApi = {
  // 开启vip服务，输入邀请码
  openVip: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/VIPCode/UseVIPCode`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 查询是否开启vip
  getVIPState: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Users/GetVIPState`, {
      data: postdata,
    })
    return hr;
  }, //end



};

export default {
  serveApi
}