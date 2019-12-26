import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';
const familyApi = {
  // 退出家庭组
  exitFamily: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMemberExtension/ExitFamily`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 移出家庭组
  deleteFamilyMember: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMemberExtension/DeleteFamilyMember`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 组长处理加入家庭的申请
  dealJoinFamily: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMemberExtension/DealJoinFamily`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 分享弹框，同意加入家庭
  acceptJoinFamily: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMemberExtension/AcceptJoinFamily`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取设备信息
  getEquipment: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserDeviceExtension/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 好友申请人数提示
  getApplyNum: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/FamilyMemberExtension/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取家庭所有信息，成员列表，家庭名称，当前人信息
  getMyFamily: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMemberExtension/GetMyFamily`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 根据guid查找单个用户信息getByGuid
  getByGuid: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Users/GetByGuid`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 查询组长信息，扫码进入页面
  getLeaderInfo: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Users/GetById`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取家庭成员的明细信息
  getFamilyMember: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMemberExtension/GetFamilyMember`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取家庭组信息，首页顶上消息弹框
  getFamilyMsg: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/FamilyMsgExtension/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取家庭组信息详情
  getFamilyMsgInfo: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMsgExtension/GetFamilyMsg`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取家庭组信息详情
  getFamilyMemberByGuid: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/FamilyMemberExtension/GetFamilyMemberByGuid`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 消息标为已读
  readed: async (postdata) => {
    var hr = await wxr.put(`${setting.url}/api/FamilyMsgExtension/Put`, {
      data: postdata,
    })
    return hr;
  }, //end

  //活动首页六大数据
  getRemoateData: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/DeviceData/GetRemoateData`, {
      data: postdata,
    })
    return hr;
  }, 

  // 获取二维码图片
  getUnlimited: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/MiniApp/getUnlimited`, {
      data: postdata,
    })
    return hr;
  },

};

export default {
  familyApi
}