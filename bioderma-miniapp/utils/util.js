const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function buttonClicked(event) {
  var that = this
  that.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    that.setData({
      buttonClicked: false
    })
  }, 500)
}

//获取px与rpx之间的比列 
function getRpx(){ 
  var winWidth = wx.getSystemInfoSync().windowWidth;
   return 750/winWidth;
}

module.exports = {
  formatTime: formatTime
}
