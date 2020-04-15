import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

const MyFamily = {
  // 反馈消息未读数字
  notReadNum: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/FeedBack/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },

  // 成员退出家庭
  exitFamily: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMember/ExitFamily`, {
      data: postdata,
    })
    return hr;
  },

  // 获取家庭列表
  getMyFamilyList: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Family/MyFamilyList`, {
      data: postdata,
    })
    return hr;
  },

  // 一键切换家庭
  changeFamily: async (userid, postdata) => {
    var hr = await wxr.put(`${setting.url}/api/Users/Put?id=${userid}`, {
      data: postdata,
    })
    return hr;
  },

  //获取家庭组信息
  GetMyFamily: async (userid) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMember/GetMyFamily?UserId=${userid}`)
    return hr;
  },
  //设置预产期
  setExpectDate: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Users/SetExpectDate`, {
      data: postdata,
    })
    return hr;
  },

  //修改家庭名称
  updateFamileName: async (userid, postdata) => {
    var hr = await wxr.put(`${setting.url}/api/Family/Put?id=${userid}`, {
      data: postdata,
    })
    return hr;
  },

  //管理员修改成员角色
  updateRember: async (userid,postdata) => {
    var hr = await wxr.put(`${setting.url}/api/Users/UpdateRole?id=${userid}`, {
      data: postdata,
    })
    return hr;
  },
  

  //管理员删除成员
  deleteRember: async (userid,postdata) => {
    var hr = await wxr.put(`${setting.url}/api/FamilyMember/DeleteByList?userId=${userid}`, {
      data: postdata,
    })
    return hr;
  },

  //查询是否有新消息
  getNewsMessage: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/PregnantLeaveMsg/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },
};

export default {
  MyFamily
}