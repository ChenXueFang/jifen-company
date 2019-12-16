import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

const UserApplyJoin = {
  //查询邀请记录
  GetInviteRecord: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserApplyJoin/GetApplyListBySC`, {
      data: postdata,
    })
    return hr;
  },

  //新增邀请记录
  insertInviteRecord: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserApplyJoin/PostApply`, {
      data: postdata,
    })
    return hr;
  },

  //妈妈同意邀请者加入家庭
  agressInviteEnterFamily: async (applyid, postdata) => {
    var hr = await wxr.put(`${setting.url}/api/UserApplyJoin/Put?id=${applyid}`, {
      data: postdata,
    })
    return hr;
  },

};

const Users={
  GetUserInfoByUserId: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Users/GetById`, {
      data: postdata,
    })
    return hr;
  }, 
};

export default {
  UserApplyJoin, Users
}