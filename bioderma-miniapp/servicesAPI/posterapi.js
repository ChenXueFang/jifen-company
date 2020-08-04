import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module';
import wxr from '../utils/wxRequest';
import {
  setting
} from '../utils/setting';
const posterapi = {
  // 获取首页轮播
  getCarousel: async (postdata) => {
    var hr = await wxr.postform(`${setting.url}/api/BasicData.ashx?_op=CarouselQuery`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取我的海报
  getMyPoster: async (postdata) => {
    var hr = await wxr.getform(`${setting.url}/api/FrontApi.ashx?_op=UserPosterQuery`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取我的收藏
  getMyCollect: async (postdata) => {
    var hr = await wxr.getform(`${setting.url}/api/FrontApi.ashx?_op=VFavitePosterQuery`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 收藏海报
  collectPoster: async (postdata) => {
    var hr = await wxr.postform(`${setting.url}/api/FrontApi.ashx?_op=SaveFavitePoster`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 删除我的海报
  delMyPoster: async (postdata) => {
    var hr = await wxr.postform(`${setting.url}/api/FrontApi.ashx?_op=UserPoster`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取验证码 
  getCode: async (postdata) => {
    var hr = await wxr.postform(`${setting.url}/api/BasicData.ashx?_op=SendSMS`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 登录，保存用户信息
  loginSaveUser: async (postdata) => {
    var hr = await wxr.postform(`${setting.url}/api/BasicData.ashx?_op=SaveFrontUser`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 根据产品类型查询海报
  getSeriesList: async (postdata) => {
    var hr = await wxr.getform(`${setting.url}/api/FrontApi.ashx?_op=V_PosterClassQuery`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取当季精选海报
  getSeasonList: async (postdata) => {
    var hr = await wxr.getform(`${setting.url}/api/FrontApi.ashx?_op=QuarterSearch`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 获取海报详情
  getPosterDetail  : async (postdata) => {
    var hr = await wxr.postform(`${setting.url}/api/FrontApi.ashx?_op=PosterDetail`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 判断用户是否注册域名： 
  checkLogin  : async (postdata) => {
    var hr = await wxr.postform(`${setting.url}/api/FrontApi.ashx?_op=ExistsFrontUser`, {
      data: postdata,
    })
    return hr;
  }, //end

  // 保存我的海报
  savePoster  : async (postdata) => {
    var hr = await wxr.postform(`${setting.url}/api/FrontApi.ashx?_op=UserPoster`, {
      data: postdata,
    })
    return hr;
  }, //end


};

export default {
  posterapi
}