import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

const BabySize = {
  //根据孕周等信息查询宝宝体型
  GetListBySC: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Sys_PregnantNewConfig/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, 
};

//根据条件获取 孕期相关配置表
const PregnantConfig = {
  GetWeekInfoByWeekId: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Sys_PregnantConfig/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },
};

export default {
  BabySize, PregnantConfig
}