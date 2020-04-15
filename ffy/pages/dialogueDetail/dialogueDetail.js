// pages/dialogueDetail/dialogueDetail.js
// pages/dialogue/dialogue.js
const app = getApp()
const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
var timer;
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();

var myVar=null;
var urlImg = wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl");
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
    myRole: '',
    isMM: false,
    showSendVoice: false,
    luStatu: false,
    list: {},
    width: 0,
    mp3Src: '',
    urlImg: urlImg,
    changeinput: true,
    isYDPic1: true,
    vPath: '', //录音地址
    saveMmcontent: '',
    lastSortNum: 0, //最后发送顺序
    isSendSucc:false,
    isLogin:false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //获取最后发送时间
  getLastSendTime: function() {
    let num1 = 0,
      num2 = 0;
    console.log('this.data.nowtalkList.lengththis.data.nowtalkList.length');
    console.log(this.data.nowtalkList.length)
    //   if (this.data.talkLists.length > 0) {
    //     num1 = this.data.talkLists[this.data.talkLists.length-1].SortNum;
    // } 
    if (this.data.nowtalkList.length > 0) {
      num2 = this.data.nowtalkList[this.data.nowtalkList.length - 1].SortNum;
    }
    let num = (num1 > num2 ? num1 : num2);
    this.setData({
      lastSortNum: num
    })
  },
  //引导页
  hidePic: function() {
    this.setData({
      isYDPic1: false
    })
  },
  //切换发送消息类型
  changeSend: function() {
    this.setData({
      showSendVoice: !this.data.showSendVoice
    })
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
    // var famid=null
    // if (wx.getStorageSync("familyId") == null || wx.getStorageSync("familyId")==""){
    //   famid ='00000000-0000-0000-0000-000000000000'
    // }else{
    //   famid = wx.getStorageSync("familyId").FamilyId
    // }
    var that = this;
    setting.POST({
      IsMother: this.data.isMM, //true角色为妈妈  false 角色为其他人
      UserId: this.data.isLogin==false?wx.getStorageSync("wxauth").userid:'',
      PageSize: 9999,
      PageIndex: 1,
      SortName: "CreatedTime",
      SortOrder: "desc",
      FamilyId: wx.getStorageSync("familyId").FamilyId,
    }, "/api/UserTalk/GetListBySC", (data) => {
      console.log("聊天记录")

      this.setData({
        talkLists: data.rows
      })

      this.getLastSendTime();
      myVar=  setInterval(this.getNewMsg, 2000);


      this.onloadMessage(false);
      console.log(this.data.talkLists)

      wx.pageScrollTo({
        scrollTop: 11111110,
        duration: 300
      })
    }, (error) => {
      if (error.errMsg) {}
    }, false)
  },
  //获取新消息
  getNewMsg: function() {
    let that = this;
    this.getLastSendTime();
    console.log('lastNewTime:' + this.data.lastSortNum);

var uid=''
    if (wx.getStorageSync("familyId").FamilyId == null || wx.getStorageSync("familyId").FamilyId==""){
      uid = wx.getStorageSync("wxauth").userid
    }else{
      uid = ""
    }
    setting.POST({
      FamilyId: wx.getStorageSync("familyId").FamilyId,
      UserId: uid,
      SortNumBegin: parseInt(this.data.lastSortNum) + 1,
      SortNumEnd: 1000000,
      PageIndex: 1,
      PageSize: 10000,
      SortName: 'SortNum',
      SortOrder: 'asc'
    }, "/api/UserTalk/GetNewMsg", (data) => {
      if (data.state == 1) {
        //console.log(data.rows[0])
        if (data.rows.length > 0) {
          for (var item=0;item<data.rows.length;item++) {
            if (that.data.nowtalkList.filter(c => c.SortNum == data.rows[item].SortNum).length <= 0)
              that.data.nowtalkList.push(data.rows[item]);
          }
          console.log(that.data.nowtalkList.length);
          //var c = that.data.nowtalkList.concat(data.rows);
          that.setData({
            nowtalkList: that.data.nowtalkList,
            lastSortNum: data.rows[data.rows.length - 1].SortNum
          })
          wx.pageScrollTo({
            scrollTop: 11111110,
            duration: 300
          })
        }

      }
    }, (error) => {
      if (error.errMsg) {}
    }, false)


  },
  onloadMessage(flag) {

    let npage = this.data.page;
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

  },

  inputMess: function(e) {
    this.setData({
      mmcont: e.detail.value,
    })
  },

  //发送消息
  sendMessage: function(e) {
    if (this.data.mmcont.length <= 0) {
      wx.showToast({
        title: "消息不能为空",
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        isSendSucc:true
      })
      var that = this;
      //发送之前调一次 getNewMsg
      that.getNewMsg();

      // console.log("录音提交")
      // console.log(this.data.mmcont)
      // console.log(this.data.vPath)
      // console.log("--------录音提交end-----------")

      setting.POST({
        UserId: wx.getStorageSync("wxauth").userid,
        FamilyId: wx.getStorageSync("familyId").FamilyId,
        MmContent: this.data.mmcont,
        VoicePath: this.data.vPath,
        UserRole: this.data.myRole
      }, "/api/UserTalk/Post", (data) => {
        if (data.state == 1) {
          //console.log(data.rows[0])
          let checkContent = this.data.mmcont
          that.data.nowtalkList.push(data.rows[0])
          that.setData({
            nowtalkList: that.data.nowtalkList,
            bbcont: '',
            inputInit: '',
            mmcont: '',
            vPath:'',
            talkId: data.rows[0].TalkId,
            saveMmcontent: checkContent,
            isSendSucc: false
          })

          wx.pageScrollTo({
            scrollTop: 11111110,
            duration: 300
          })


          //如果发送的消息中包含@信息，则不调用宝宝自动回复
          if (checkContent.search("@") != -1) {
            console.log("消息中有@信息，不调用回复")
          } else {
            //延时5秒后调用回复 1000=1秒
            timer = setTimeout(this.getbbreply.bind(this), 1000)
          }
        } else {
          this.setData({
            isSendSucc: false
          })
          wx.showToast({
            title: data.msg,
            icon:"none"
          })
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
    }
  },

  //获取宝宝自动回复
  getbbreply: function() {
    var that = this;
    setting.POST({
      UserId: wx.getStorageSync("wxauth").userid,
      MmContent: this.data.saveMmcontent,
      FamilyId: wx.getStorageSync("familyId").FamilyId,
      UserRole: this.data.myRole
    }, "/api/UserTalk/GetBabyAutoReplay", (data) => {
       console.log(data.data)
      if (data.data != null) {
        console.log("3333")
        this.setData({
          bbcont: data.rows[0].BbContent,
          saveMmcontent: ''
        })

        that.data.nowtalkList.push(data.rows[0])
        that.setData({
          nowtalkList: that.data.nowtalkList,
        })
        //console.log(that.data.nowtalkList)
        wx.pageScrollTo({
          scrollTop: 11111110,
          duration: 100
        })
        wx.createSelectorQuery().select('#diaMain').boundingClientRect(function (rect) {

          //console.log("滚到底部：" + rect.bottom)
          // 使页面滚动到底部
          wx.pageScrollTo({
            scrollTop: rect.bottom + 5000
          })
        }).exec()
      }
    }, (error) => {
      if (error.errMsg) {}
    }, false)
  },
  //长按弹出撤销
  cxoper: function(e) {
    var tasid = e.currentTarget.dataset.selmess;

    for (var f1 in this.data.nowtalkList) {
      if (this.data.nowtalkList[f1].TalkId == tasid) {
        var f = this.data.nowtalkList[f1];
        f.isCXShow = true
      }
    }
    this.setData({
      nowtalkList: this.data.nowtalkList,
    })
    // console.log(this.data.nowtalkList)
  },

  //撤回消息
  revocation: function(e) {
    app.getEventLog(49)

    // // debugger
    // var tasid = e.currentTarget.dataset.delid;
    // var tasindex=-2;

    // //宝宝回复前可撤销，回复会提示不可撤销
    // for (var f1 in this.data.nowtalkList) {
    //   if (this.data.nowtalkList[f1].TalkId == tasid) {
    //     tasindex=f1;
    //   }
    // }
    // console.log(this.data.nowtalkList)
    // console.log(parseInt(tasindex) + 1)
    // var nextmessid = parseInt(tasindex)+1
    // var nextmess = this.data.nowtalkLiasdsadst[nextmessid]
    // console.log(nextmess)
    // if (nextmess.BbContent != "") {
    //   wx.showToast({ title: '宝宝已回复，不可以撤回了哦！', icon: 'none' });
    //   return;
    // } else {
    // debugger
    var that = this;
    clearTimeout(timer); //清除延时调用的宝宝回复方法
    setting.DELETE({
      id: this.data.talkId
    }, "/api/UserTalk/Delete", (data) => {
      if (data.msg == "删除成功") {
        console.log(that.data.nowtalkList.findIndex((n) => n.talkId == this.data.talkId))
        that.data.nowtalkList.splice(that.data.nowtalkList.findIndex((n) => n.talkId == this.data.talkId), 1)

        that.setData({
          nowtalkList: that.data.nowtalkList
        })

        wx.showToast({
          title: '消息已撤回',
          icon: 'none'
        });

      }
    }, (error) => {
      if (error.errMsg) {}
    }, false)

  },

  //发送消息时艾特其他人。根据当前角色判断
  atOther: function() {
    var sendMRole = this.data.myRole
    //console.log(sendMRole)

    if (sendMRole == "Mather") {
      this.setData({
        mmcont: this.data.mmcont + " @爸爸 ",
        inputInit: this.data.mmcont + " @爸爸 ",
      })
    } else {
      this.setData({
        mmcont: this.data.mmcont + " @妈妈 ",
        inputInit: this.data.mmcont + " @妈妈 ",
      })
    }
  },

  //语音
  // 触摸开始
  touchStart: function(e) {
    // console.log('touchStart', e);
    // var start = e.timeStamp;
    // var seconds = (start % (1000 * 60)) / 1000;
    // this.setData({
    //   start: seconds,
    //   luStatu: true,
    // })
    // this.recorderManager.start({
    //   format: 'mp3'
    // });

    this.setData({
      luStatu: true,
    })
    // 语音开始识别
    manager.start({
      lang: 'zh_CN', // 识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
    })
  },

  // 触摸结束
  touchEnd: function(e) {
    // console.log('touchEnd', e);
    // var start = this.data.start;
    // var end = e.timeStamp;
    // var seconds = (end % (1000 * 60)) / 1000;
    // var shijian = seconds - start;
    // var width = shijian * 4;
    // this.setData({
    //   end: seconds,
    //   shijian: shijian,
    //   luStatu: false,
    //   width: width
    // })
    // this.recorderManager.stop();
    this.setData({
      luStatu: false
    })
    // 语音结束识别
    manager.stop();
  },
  //播放语音
  playv: function(e) {
    var src = e.currentTarget.dataset.src;
    //console.log("音频地址：" + this.data.urlImg + src)
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.urlImg + src
    innerAudioContext.onPlay(() => {
      //console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      // console.log(res.errMsg)
      // console.log(res.errCode)
    })
  },


  //识别语音 -- 初始化
  initRecord: function() {
    const that = this;
    // 有新的识别内容返回，则会调用此事件
    manager.onRecognize = function(res) {
      //console.log(res)
    }
    // 正常开始录音识别时会调用此事件
    manager.onStart = function(res) {
      console.log("成功开始录音识别", res)
    }
    // 识别错误事件
    manager.onError = function(res) {
      console.error("error msg", res)
      that.setData({
        luStatu:false
      })
    }
    //识别结束事件
    manager.onStop = function(res) {
      console.log('..............结束录音')
      console.log('录音临时文件地址 -->' + res.tempFilePath);
      console.log('录音总时长 -->' + res.duration + 'ms');
      console.log('文件大小 --> ' + res.fileSize + 'B');
      console.log('语音内容 --> ' + res.result);
      if (res.result == '') {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
          success: function(res) {}
        })
        return;
      }
      var text = res.result;
      that.setData({
        mmcont: text,
        list: res.tempFilePath
      })

      wx.uploadFile({
        url: `${setting.setting.urlImg}/api/Upload/Post`,
        //url: this.data.urlImg+`/api/Upload/Post`,
        filePath: that.data.list,
        name: '与宝宝对话录音',
        success: function(response) {
          let dataJson = JSON.parse(response.data)
          if (dataJson.state == 1) {
            var voiceAndTime = dataJson.rows[0] //+ ',' + that.data.shijian
            that.setData({
              vPath: voiceAndTime
            })
            console.log("调用发送消息方法")
            that.sendMessage()
          }
        }
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      urlImg: wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl")
    })
    
    if (wx.getStorageSync("DiaDetailShowTip") == null || wx.getStorageSync("DiaDetailShowTip") == "") {
      wx.setStorageSync('DiaDetailShowTip', {
        userid: wx.getStorageSync("wxauth").userid,
        diashowtip: false
      })
    } else {
      this.setData({
        isYDPic1: false
      })
    }
    
    if (wx.getStorageSync("myrole") == null || wx.getStorageSync("myrole")==""){
      this.setData({
        myRole: "Mather",
        isLogin:false
      })
    }else{
      this.setData({
        myRole: wx.getStorageSync("myrole").UserRole,
        isLogin:true
      })
    }
    if (this.data.myRole == "Mather") {
      this.setData({
        isMM: true
      })
    } else {
      this.setData({
        isMM: false
      })
    }
    this.initRecord()

    this.getAllMessage();

    this.setData({
      mmcont: ''
    })
    this.getbbreply();

    

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
    app.getEventLog(43)
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })

    // var that = this;
    // //  初始化录音对象
    // this.recorderManager = wx.getRecorderManager();
    // this.recorderManager.onError(function () {
    //   that.tip("录音失败！")
    // });

    // // 录音结束
    // this.recorderManager.onStop(function (res) {
    //   var list = that.data.list;
    //   var shijian = that.data.shijian;
    //   var src = res.tempFilePath;

    //   list.src = src;
    //   list.shijian = parseFloat(shijian).toFixed(1);
    //   list.play = false;
    //   that.setData({
    //     list: list,
    //     showbqView: false
    //   })

    //   // that.tip("录音完成！")
    //   console.log("录音完成！")
    //   console.log(that.data.list)


    // });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if(myVar!=null)
    clearInterval(myVar);

    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(43, "", vtime, this.data.time2);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (myVar != null)
      clearInterval(myVar);

    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer(43, "", vtime, this.data.time2);
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