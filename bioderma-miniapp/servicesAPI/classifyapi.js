import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';
const classifyapi = {
  // 获取最新海报，常用海报，当季海报
  
  getLatestPost: async (postdata) => {
    var hr = await wxr.getform(`${setting.url}/api/FrontApi.ashx?_op=VPosterTagQuery`, {
      data: postdata,
    })
    return hr;
  }, //end
};

export default {
  classifyapi
}