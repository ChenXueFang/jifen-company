import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

const Enter = {
  // 添加家庭成员
  FamilyMember: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/FamilyMember/Post`, {
      data: postdata,
    })
    return hr;
  },

  // 获取妈妈昵称
  getNickName: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Users/GetById`, {
      data: postdata,
    })
    return hr;
  },

  // 申请加入前验证妈妈手机号是否注册
  CheckFamily: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMember/CheckFamily`, {
      data: postdata,
    })
    return hr;
  },

  ApplyJoinFamily: async (postdata) => {
    // console.log("ApplyJoinFamily:postdata:" + postdata)
    var hr = await wxr.get(`${setting.url}/api/FamilyMember/ApplyJoinFamily`, {
      data: postdata,
    })
    return hr;
  },

  // 妈妈是否同意成员加入
  ApproveJoinFamily: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMember/ApproveJoinFamily`, {
      data: postdata,
    })
    return hr;
  },

  // 校验预产期是否有效
  CheckExpectDate: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Users/CheckExpectDate`, {
      data: postdata,
    })
    return hr;
  },

  // 设置预产期
  setData: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Users/SetExpectDate`, {
      data: postdata,
    })
    return hr;
  },

  //页面访问次数 + 按钮点击次数
  eventLog: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserLinkRecord/Post`, {
      data: postdata,
    })
    return hr;
  },


  //记录formid
  saveFormId: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/SendMsg/Post`, {
      data: postdata,
    })
    return hr;
  },
};

export default {
  Enter
}