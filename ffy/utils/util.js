const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//检查授权 同意后回调
const authcb = (scope, cb) => {
  wx.getSetting({
    success(res) {
      if (!res.authSetting[scope]) {
        wx.authorize({
          scope: scope,
          success() {

            cb();
          }
        })
      } else {
        cb();
      }
    }
  })
};//end authcb


//若有授权执行回调
const hasauthcb = (scope, cb) => {
  wx.getSetting({
    success(res) {
      if (!res.authSetting[scope]) {
       
      } else {
        cb();
      }
    }
  })
};//end authcb

module.exports = {
  authcb: authcb,
  hasauthcb: hasauthcb,
  formatTime: formatTime
}
