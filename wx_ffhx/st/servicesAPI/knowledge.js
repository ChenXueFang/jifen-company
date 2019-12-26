import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

const knowledgeApi = {
  // 获取产品列表
  getProductList: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Product/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 产品说明菜单，一级二级菜单
  getProductMenuList: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/ProductDescExtension/GetDescListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取产品说明，视频
  getProductVideo: async(postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Product/GetById`, {
      data: postdata,
    })
    return hr;
  }, //end;

  // 获取产品说明，老式呼吸机两个视频
  getTwoVideo: async(postdata) => {
    var hr = await wxr.get(`${setting.url}/api/ProductDescMenu/GetByGuid`, {
      data: postdata,
    })
    return hr;
  }, //end;

  // 获取产品说明文章
  getEssay: async(postdata) => {
    var hr = await wxr.get(`${setting.url}/api/ProductDescArticle/GetByGuid`, {
      data: postdata,
    })
    return hr;
  }, //end;

  // 知识，消息文章，获取文章列表
  gerArticleList: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Article/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 知识，消息文章，记录阅读数
  changeReadCount: async(postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Article/ChangeReadCount`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 知识，消息文章，获取文章内容
  getEssayCon: async(postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Article/GetByGuid`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 知识文章，按标签推荐 相关文章
  getRelationList: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Article/GetRelationListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取VIP教育文章的选择题选项，选项
  getRadioList: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/ArticleSurvey/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取VIP教育文章的选择题选项, 选中状态
  getSurveyState: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserSurvey/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 新增VIP教育文章的选择题选项
  postSurvey: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserSurvey/PostSurvey`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 修改VIP教育文章的选择题选项
  PutSurvey: async(postdata) => {
    var hr = await wxr.put(`${setting.url}/api/UserSurvey/Put`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取VIP教育 是否 喜欢 状态
  getBehavior: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserActionArticle/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 新增 是否 喜欢 VIP文章操作
  postBehavior: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserActionArticle/Post`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 修改 是否 喜欢 VIP文章操作
  PutBehavior: async(postdata) => {
    var hr = await wxr.put(`${setting.url}/api/UserActionArticle/Put`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 产品说明轮播切换
  getArticlebyMenuDescId: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/ProductDescArticle/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },

  // 消息-服务通知列表
  getServiceNoticeList: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/DayRemind/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },

  // 消息-服务通知-详情
  getServiceMessage: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/DayRemind/GetById`, {
      data: postdata,
    })
    return hr;
  },

};

export default {
  knowledgeApi
}