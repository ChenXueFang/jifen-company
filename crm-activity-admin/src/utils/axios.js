import axios from 'axios';
import qs from 'qs';
import router from "../router";
import { baseUrl} from "./env";

// axios 配置 & 拦截
// 响应时间
axios.defaults.timeout = 20000;
// 是否允许携带cookie                
axios.defaults.withCredentials = false;
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';
//设置默认接口地址
axios.defaults.baseURL = baseUrl;
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前强制降低复杂请求
    if(config.method  === 'post'){
    // qs 配合 application/x-www-form-urlencoded 请求头使用
    // config.data = qs.stringify(config.data);
    }
  //验证权限接口不需要header头
    if(localStorage.getItem("logintoken")==null){
    }else{
      config.headers.Authorization = "Bearer "+localStorage.getItem("logintoken");
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
	//对响应数据做些事
    if(!res.data){
        return Promise.reject(res);
    }
    
    // console.log("res",res)
    //接口返回的过期条件
    if(res.status == 401){ 
        localStorage.setItem("logintoken",null)
        router.push('/');
        return "";
    }else{
      //30分钟过期后替换新的logintoken
      if(res.headers.refreshtoken!=null){
        localStorage.setItem("logintoken",res.headers.refreshtoken)
      }
    }
    return res;
}, (error) => {
    if(error.response.status==401){
      localStorage.setItem("logintoken",null)
      router.push('/');
    }
    return Promise.reject(error);
});


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
*/
export function get(url,params={}){
    return new Promise((resolve,reject) => {
      axios.get(url,{
        params:params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
    })
  }
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
    if(url.toLowerCase().indexOf('saveorupdate')>0){
        var updateFieldNameArray=[]
        for(var key in data){
          updateFieldNameArray.push(key)
        }
        data.updateFieldNameArray=updateFieldNameArray;
        //console.log("post:data:"+JSON.stringify(data))
    }
     axios.post(url,data)
        .then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
   })
 }
