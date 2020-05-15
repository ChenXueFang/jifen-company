export default {
  //获取连接参数
  getSearchParam(key) {
    var searchstr = window.location.search || "";
    var regex = new RegExp("\\b" + key + "=([^&=#]+)", "mi");
    var match = searchstr.match(regex);
    if (match) {
      return match[1];
    } else {
      return "";
    }
  },
  //手机号验证
  validMobile(mobile) {
    return /^1\d{10}$/.test(mobile);
  },
  //邮箱验证
  validEmail(email) {
    return /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(
      email
    );
  },

  // 格式化时间
  // time new Date()
  // fmt 格式 ：'yyyyMMdd' 'yyyy/MM/dd hh:mm:ss' ...
  dateFormat(time, fmt) {
    var o = {
      "M+": time.getMonth() + 1, //月份 
      "d+": time.getDate(), //日 
      "h+": time.getHours(), //小时 
      "m+": time.getMinutes(), //分 
      "s+": time.getSeconds(), //秒 
      "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
      "S": time.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
};

