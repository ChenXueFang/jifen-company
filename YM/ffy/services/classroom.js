import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';

// 今日推荐
const ClassRomm = {
  GetListBySC: async(postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Sys_ClassRomm/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin
};

// 三大板块
const GetThree = {
  GetListBySC: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Sys_PregnantDayConfig/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin
};

// 获取文章列表
const GetEssayList = {
  GetListBySC: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Sys_ClassRomm/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin
};

// 文章取消收藏功能
const CancelCollection = {
  CancleApi: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserCollection/CancleCollection`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin
};

// 收藏功能
const Collection = {
  // 收藏功能
  CollecApi: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserCollection/Post`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin

  // 收藏列表
  ColleList: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/UserCollection/GetListBySC`, {
      data: postdata,
    })
    return hr;
  }, 

  // 文章分享
  Share: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Sys_ClassRomm/ShareArticle`, {
      data: postdata,
    })
    return hr;
  }, 
};

// 获取文章详情
const GetEssay = {
  GetById: async (postdata) => {
    var hr = await wxr.get(`${setting.url}/api/Sys_ClassRomm/GetById`, {
      data: postdata,
    })
    return hr;
  }, //end wxLogin
};
//文章评论
const Comment = {
  GetAllCommentByArticleId: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/Comment/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },
  InsertComment: async (postdata) => {
    var hr = await wxr.post(`${setting.url}//api/Comment/Post`, {
      data: postdata,
    })
    return hr;
  },
};
//文章点赞
const CommentStar = {
  GetCommentStarByCommentId: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/CommentStar/GetListBySC`, {
      data: postdata,
    })
    return hr;
  },
  InsertCommentStar: async (postdata) => {
    var hr = await wxr.post(`${setting.url}/api/CommentStar/Post`, {
      data: postdata,
    })
    return hr;
  },
  deleteCommentStar: async (starid, postdata) => {
    var hr = await wxr.del(`${setting.url}/api/CommentStar/Delete?id=${starid}`, {
      data: postdata,
    })
    return hr;
  },

};

export default {
  ClassRomm, GetThree, GetEssayList, CancelCollection, Collection, GetEssay, Comment, CommentStar,
}