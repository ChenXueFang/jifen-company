// pages/dialogueDetail/dialogueDetail.js
const app = getApp()
const util = require("../../../utils/util.js")
const setting = require("../../../utils/setting.js");
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    top: 10,
    isCXShow: false,
    mmcont: '', //妈妈发送的消息
    bbcont: '', //宝宝回复的消息
    inputInit: '',
    talkId: 0, //妈妈发送的消息返回的ID
    istop: false,
    talkLists: [], //对话集合
    nowtalkList: [], //显示的聊天记录
    myRole: wx.getStorageSync("myrole").UserRole,
    isMM: false,
    isSendSucc: false,
    headImage: wx.getStorageSync("myrole").HeadImage,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //隐藏撤回
  hideCH: function() {
    this.setData({
      isCXShow: false
    })
  },
  inbtn: function(e) {
    console.log("阻止冒泡")
  },
  //获取聊天消息记录
  getAllMessage: function() {
    var that = this;
    setting.POST({
      UserId: wx.getStorageSync("wxauth").userid,
      PageSize: 9999,
      PageIndex: 1,
      SortName: "CreatedTime",
      SortOrder: "desc"
    }, "/api/FeedBack/GetListBySC", (data) => {
      this.setData({
        talkLists: data.rows
      })
      this.onloadMessage(false);

      wx.pageScrollTo({
        scrollTop: 11111110,
        duration: 300
      })
      
    }, (error) => {
      if (error.errMsg) {}
    }, false)
  },

  // 发送消息接口
  sendMg: function (dataparam) {
    var that = this;
    let res2 = new Promise((resolve, reject) => {
      setting.POST(dataparam, "/api/FeedBack/Post", (data) => {
        if (data.state == 1) {
          that.data.nowtalkList.push(data.rows[0])
          that.setData({
            nowtalkList: that.data.nowtalkList,
            inputInit: '',
            talkId: data.rows[0].FeedId,
            mmcont: ""
          })
          this.setData({
            isSendSucc: false
          })
          wx.pageScrollTo({
            scrollTop: 11111110,
            duration: 300
          })
          resolve(data);
        } else {
          this.setData({
            isSendSucc: false
          })
          setTimeout(function () {
            wx.showToast({
              title: data.msg,
              icon: "none",
              duration: 2000
            })
          }, 300)
          reject(data)
        }
      }, (error) => {
        this.setData({
          isSendSucc: false
        })
        wx.showToast({
          title: error.msg,
          icon: "none"
        })

      }, false)

    });//Promise
    return res2;
  },

  //发送消息参数
  sendMessage: function (e) {
    if (this.data.mmcont != "") {
      this.setData({
        isSendSucc: true
      })
      var that = this;
      let dataparam = {
        UserId: wx.getStorageSync("wxauth").userid,
        UserContent: this.data.mmcont,
        IsRead: true,
        IsVerify: false,
      };
      that.sendMg(dataparam).then((hr) => {
        if (hr.state == 1) {
          let dataparam2 = {
            UserId: wx.getStorageSync("wxauth").userid,
            SystemContent: '非常感谢你的反馈，我们会尽快回复您。',
            IsRead: true,
            IsVerify: true,
          };
          that.sendMg(dataparam2);
          // this.setData({
          //   isSendSucc: false
          // })
        }
      });
    } else {
      wx.showToast({
        title: "请输入消息",
        icon: "none"
      })
      this.setData({
        isSendSucc: false,
      })
    }
  },

  // 加载消息
  onloadMessage(flag) {
    let npage = this.data.page;
    console.log("npage:"+npage)
    let pagesize = 10;
    if (npage * pagesize < this.data.talkLists.length) {
      var t = this.data.nowtalkList;
      let last = (npage + 1) * pagesize
      if (last > this.data.talkLists.length)
        last = this.data.talkLists.length;
      for (let i = npage * pagesize; i < last; i++) {
        t.unshift(this.data.talkLists[i]);
      }
      this.setData({
        page: npage + 1,
        nowtalkList: t
      })
    } else {
      if (flag) {
        this.setData({
          istop: true
        })
      }
    }
    wx.stopPullDownRefresh()
    console.log("8748564787888")
    console.log()
  },

  // 失去焦点，也就是关闭搜索
  onBindInputBlur: function(event) {
    this.setData({
      inputInit: '', // 清空输入框中的内容
    });
  },
  inputMess: function(e) {
    this.setData({
      mmcont: e.detail.value
    })
  },
  
  //长按弹出撤销
  // cxoper: function (e) {
  //   var tasid = e.currentTarget.dataset.selmess;
  //   // this.setData({
  //   //   isCXShow: true
  //   // })

  //   for (var f1 in this.data.nowtalkList) {
  //     if (this.data.nowtalkList[f1].TalkId == tasid) {
  //       var f = this.data.nowtalkList[f1];
  //       f.isCXShow = true
  //     }
  //   }
  //   this.setData({
  //     nowtalkList: this.data.nowtalkList,
  //   })
  // },

  // 撤回消息
  // revocation: function (e) {
  //   var that = this;
  //   clearTimeout(timer); //清除延时调用的宝宝回复方法
  //   setting.DELETE({
  //     id: this.data.talkId
  //   }, "/api/UserTalk/Delete", (data) => {
  //     if (data.msg == "删除成功") {
  //       console.log(that.data.nowtalkList.findIndex((n) => n.talkId == this.data.talkId))
  //       that.data.nowtalkList.splice(that.data.nowtalkList.findIndex((n) => n.talkId == this.data.talkId), 1)

  //       that.setData({
  //         nowtalkList: that.data.nowtalkList
  //         //talkId: data.rows[0]
  //       })

  //       wx.showToast({ title: '消息已撤回', icon: 'none' });

  //     }
  //   }, (error) => {
  //     if (error.errMsg) {
  //     }
  //   }, false)

  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAllMessage();
    this.setHasRead();
  },

  // 标记为已读接口
  setHasRead: function(){
    setting.GET({
      UserId: wx.getStorageSync("wxauth").userid
    }, "/api/FeedBack/SetHasRead", (data) => {
      
    }, (error) => {
      if (error.errMsg) { }
    }, false)
  },

  upload: function() {
    this.onloadMessage(true)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getEventLog(40);
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })

    this.setData({
      headImage: wx.getStorageSync("myrole").HeadImage
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(40, this.data.TempId, vtime, this.data.time2);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(40, this.data.TempId, vtime, this.data.time2);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onloadMessage(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})