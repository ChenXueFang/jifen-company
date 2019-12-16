import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
const util = require("../../../utils/util.js")
const md5 = require("../../../utils/md5.js");
const setting = require("../../../utils/setting.js");
import dataApi1 from '../../../services/dataapi'
import authApi from '../../../services/dataapi'
import {
  FDate
} from "../../../utils/FDate.js";
import dataApi from '../../../services/dayrecord'
const app = getApp();
const f = new FDate();
var urlImg = wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    issubmit: false,
    showModal: false,
    isSel: true,
    isXQShow: false,  //心情弹窗
    isTZShow:false,//体重输入
    isTZSelect:false,//体重选择
    isRSShow: false,  //妊娠反应弹窗
    isRsAddShow: true,
    isBQShow:false,//选择留言心情
    showmore: true,
    fatherLeaveMessageARR: {},
    datelist: [],
    //当天的记录
    currentDateRecord: {},
    //体重
    weight: '',
    //选择的日期
    choiceDate: '',
    //用户id
    UserId: '',
    //主键Id
    recordId: '',
    //二期心情
    moodlist: [{ key: '1', name: '开心' }, { key: '2', name: '愉快' }, { key: '3', name: '一般' }, { key: '4', name: '难过' }, { key: '5', name: '忧伤' }], 
    moodSelIndex:0,
    showMoodAdd:true, //心情添加是否显示，默认显示
    moodText:'', //选择的心情，文字

    //心情选择图片
    moodpiclist: [],
    lessdatelist: [],
    year: "2019",
    month: "07",

    //二期选择体重
    tzSel: ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82"],
    tzSelXS: ['.0kg', '.1kg', '.2kg', '.3kg', '.4kg', '.5kg', '.6kg', '.7kg', '.8kg', '.9kg'],
    value: [0, 0],
    showTZAdd: true, //显示体重添加按钮
    showRSAdd: true, //显示妊娠反应添加按钮
    showTDSAdd: true,//显示胎动数添加按钮
    showbqView: true,
    showMessAdd:true, //爸爸留言界面显示输入

    canIUse: true,
    userrole: '',
    moRenRole:true,
    isChecked: false, //妊娠反应是否选中
    prRecord: 0, //胎动数
    checkList: [],
    isSelDay: 0,
    weightNum: 50,
    reWeightNum: 0,
    inputFoucs: false,
    nearw1: 59.7,
    nearw2: 59.8,
    nearw3: 59.9,
    nearw4: 60.1,
    nearw5: 60.2,
    nearw6: 60.3,
    rsfyList: [{
      Name: "头痛",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "头晕乏力",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "食欲不振",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "喜酸食物",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "喜辣食物",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "厌恶油腻恶心",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "晨起呕吐",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "干呕",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "烧心",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "胃难受",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "腹痛",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "小腿抽筋",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "浮肿",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "腰疼",
      IsChoose: false,
      IsZdy: false
    }, {
      Name: "腿疼",
      IsChoose: false,
      IsZdy: false
    }],
    refySelect: [],
    zdyrsfy: '', //自定义妊娠反应
    pregnantResponse: '请选择妊娠反应',
    wxstep: 0, //微信步数
    fatherLeaveMess:'',
    fatherLeaveMessage: '', //爸爸的留言
    fatherLeaveMessageTime: '', //爸爸留言时间
    wxsteps: 0, //微信步数
    leaveMess: '',
    motionId: '',
    connectemojiO: ['😊', '😅', '😲', '😭', '😂', '😄', '😩', '😞', '😵', '😒', '😍',
      '😤', '😜', '😝', '😋', '😘', '😚', '😷', '😳', '😃', '😆', '😁', '😢', '😨',
      '😠', '😣', '😌', '😖', '😔', '😰', '😱', '😪', '😏', '😓', '🐰','🐼'
    ],
    bqselIndex:-1,
    // luStatu: false,
    // recordstart:0,
    // shijian:''
    luStatu: false,//di'bu
    list: {},
    width: 0,
    mp3Src: '',
    urlImg: urlImg,
    changeinput: true,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  
  //返回上一页
  toMyFam: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  //设置运动目标
  toSetTarget:function(){
    app.getEventLog(6)
    wx.navigateTo({
      url: '../../exerciseTarget/exerciseTarget'
    })
  },
  preventTouchMove: function () { },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let hr = await authApi.wxApi.wxLoginCheck()
    this.setData({
      urlImg: wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl")
    })
    
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      this.setData({
        moRenRole: true
      })
    } else {
      this.setData({
        moRenRole: false,
        userrole: wx.getStorageSync("myrole").UserRole
      })      
    }
    let that = this;
    var choicetime = this.getdate()
    var leaveTime = options.leaveTime
    if (leaveTime != null) {
      choicetime = leaveTime
    }

    this.setData({
      choiceDate: choicetime,
      UserId: wx.getStorageSync("wxauth").userid,
      checkList: this.ConvertFDate()
    })

    f.GetDay();
    this.setFDate();
    this.getCurrentDateData(); //进入页面默认加载当天记录

    await this.getPrRecord(); //最新胎动数

    //若已有授权 更新步数
    this.loadStep()
    
  },

  //加载步数
  loadStep:function(){
    let that = this;
    util.hasauthcb('scope.werun', function () {
      wx.getWeRunData({
        success(res) {

          dataApi1.wxApi.wxWeRunData(res, that.data.choiceDate, null).then((hr) => {

            if (hr.data && hr.data.step) {
              that.setData({
                canIUse: false,
                wxstep: hr.data.step
              })
              console.log("加载步数：" + hr.data.step)
              //更新步数
              let postdata = {
                UserId: that.data.UserId,
                RecordDate: that.data.choiceDate,
                StepCount: that.data.wxstep
              };
              that.updateRecordByInterface(postdata);
            }
          })
        }
      })

    });
  },

  // 爸爸留言弹窗
  showDialogBtn: function() {
    app.getEventLog(16)
    this.setData({
      showModal: true
    })
  },

  //孕期统计
  toGestationTotal: async function() {
    let hr = await authApi.wxApi.wxLoginCheck()
    app.getEventLog(20)
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../gestationTotal/gestationTotal'
      })
    }
  },
  setCheck(name, flag) {
    var y = this.data.rsfyList.filter((a) => {
      return a.Name == name;
    })
    for (var i = 0; i < y.length; i++) {
      y[i].IsChoose = flag;
    }

    this.setData({
      rsfyList: this.data.rsfyList

    })
  },
  //切换体重输入和体重选择
  chanSel: function() {
    this.setData({
      isSel: false
    })
  },

  //显示心情选择窗
  showXQ: async function () {
    app.getEventLog(56)

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      if (this.data.userrole == 'Mather'){
        this.setData({
          isXQShow: true
        })
      }else{
        console.log("妈妈还未填写，请等待妈妈填写哦！")
        wx.showToast({
          title: "妈妈还未填写，请等待妈妈填写哦！",
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  //关闭心情选择窗
  hideXQ: function () {
    app.getEventLog(57)

    this.setData({
      isXQShow: false
    })
  },

  //选择表情
  showBQ: async function () {
    this.setData({
      isBQShow: true
    })
  },
  //关闭选择表情
  hideBQ: function () {
    this.setData({
      isBQShow: false
    })
  },

  //显示体重输入
  showTZ: async function () {
    app.getEventLog(58)

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      if (this.data.userrole == 'Mather') {
        this.setData({
          isTZShow: true,
          inputFoucs: false,
          isTZSelect: false
        })
      } else {
        wx.showToast({
          title: "妈妈还未填写，请等待妈妈填写哦！",
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  //关闭体重输入
  hideTZ: function () {
    app.getEventLog(59)

    this.setData({
      isTZShow: false,
      weightNum: this.data.reWeightNum
    })
  },

  
  //显示体重选择
  showTZSelect: async function() {
    this.setData({
      isTZSelect: true,
      isTZShow: false,
      weightNum:40
    })
  },
  //关闭体重选择
  hideTZSelect: function () {
    this.setData({
      isTZSelect: false,
      weightNum: this.data.reWeightNum
    })
  },

  //显示妊娠反应选择窗
  showRS: async function() {
    app.getEventLog(60)

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      if (this.data.userrole == 'Mather') {
        this.setData({
          isRSShow: true
        })
      } else {
        wx.showToast({
          title: "妈妈还未填写，请等待妈妈填写哦！",
          icon: 'none',
          duration: 2000
        })
      }

    }
  },
  //显示妊娠自定义输入框
  showrsc_add: function() {
    this.setData({
      isRsAddShow: false
    })
  },
  //关闭妊娠反应选择窗
  hideRS: function() {
    app.getEventLog(61)

    this.setData({
      isRSShow: false
    })
  },
  //选择妊娠反应
  chooseTag: function(e) {
    console.log("妊娠反应1：")
    console.log(e.currentTarget.dataset.index)
    // debugger
    var rsindex = e.currentTarget.dataset.index;
    var choose = e.currentTarget.dataset.check
    var name = e.currentTarget.dataset.name;
   
    // return

    var bool = "rsfyList[" + rsindex + "].IsChoose";

    this.setData({
      [bool]: !this.data.rsfyList[rsindex].IsChoose
    })

    let index = this.data.refySelect.indexOf(this.data.rsfyList[rsindex].Name)
    if (index > -1) {
      this.data.refySelect.splice(index, 1);
    } else {
      this.data.refySelect.push(this.data.rsfyList[rsindex].Name)
    }
    this.setCheck(name, !choose)
    console.log("妊娠反应：")
    console.log(this.data.refySelect)
  },
  //填写自定义妊娠反应
  getZDY: function(e) {
    // console.log('自定义妊娠反应:', e.detail.value)
    this.setData({
      zdyrsfy: e.detail.value
    })
    if (this.data.rsfyList.length > 17 && this.data.zdyrsfy != '') {
      wx.showToast({
        title: '自定义反应不能超过三个！',
        icon: 'none',
        duration: 2000
      });
    }
  },

  //提交妊娠反应
  complateRS: function() {
    var l = this.data.rsfyList.filter((a) => {
      return a.IsChoose
    });
    if ((l.length == 0) && this.data.zdyrsfy == '') {
      wx.showToast({
        title: '请选择至少一项',
        icon: 'none'
      });
    } else {
      //添加值进入rsfyList 里面
      if (this.data.zdyrsfy != "" && this.data.rsfyList.length <= 17) {
        this.data.rsfyList.push({
          Name: this.data.zdyrsfy,
          IsChoose: true,
          IsZdy: true
        })
      }

      var t = this.data.rsfyList.filter((a) => {
        return a.IsChoose
      })
      var newarray = []
      for (var i = 0; i < t.length; i++) {
        //if(t[i])
        newarray.push(t[i].Name)
      }
      //  //如果自定义妊娠反应没有被选中，就删除掉
      let newRsfylist = []
      for (var i = 0; i < this.data.rsfyList.length; i++) {
        //判断是否是自定义
        if (this.data.rsfyList[i].IsZdy != undefined && this.data.rsfyList[i].IsZdy != null && !this.data.rsfyList[i].IsZdy) {
          newRsfylist.push(this.data.rsfyList[i])
        } else if (this.data.rsfyList[i].IsChoose) {
          newRsfylist.push(this.data.rsfyList[i])
        }
      }

      this.setData({
        refySelect: newarray,
        rsfyList: newRsfylist, //this.data.rsfyList,
        zdyrsfy: "",
        pregnantResponse: this.data.refySelect.join(',') // newarray.join(',')
      })
     
      let postdata = {
        UserId: this.data.UserId,
        RecordDate: this.data.choiceDate,
        PregnantResponse: this.data.refySelect.join(',')
      };

      this.updateRecordByInterface(postdata);
    }
  },
  //数胎动
  toFetalMovementNum:async function() {
    app.getEventLog(62)

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      wx.showToast({
        title: "请前往首页或我的页面注册家庭！",
        icon: 'none',
        duration: 2000
      })
    } else {
      if (this.data.userrole == 'Mather') {
        if (this.data.choiceDate != this.getdate()) {
          wx.showToast({
            title: '胎动数只能统计当天哦！',
            icon: 'none',
            duration: 2000
          });
          return
        }
        wx.navigateTo({
          url: '../fetalMovementNum/fetalMovementNum?currentDateRecord=' + this.data.recordId
        })
      } else {
        wx.showToast({
          title: "妈妈还未填写，请等待妈妈填写哦！",
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  //授权
  clickForWxStep: function() {
    this.showModal();
  },
  //显示对话框
  showModal: function() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  //取当前时间
  getdate() {
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();

    //获取当前月
    var month = myDate.getMonth() + 1;

    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    //获取当前时间

    var now = year + '-' + this.conver(month) + "-" + this.conver(date);
    return now;
  },
  //日期时间处理
  conver(s) {
    return s < 10 ? '0' + s : s;
  },
  getCurrentDateData: async function() {
    //去除掉自定义的
    var shownewarray = [];
    for (var i = 0; i < this.data.rsfyList.length; i++) {
      if (!this.data.rsfyList[i].IsZdy) {
        this.data.rsfyList[i].IsChoose = false;
        shownewarray.push(this.data.rsfyList[i]);
      }
    }
    this.setData({
      rsfyList: shownewarray
    })

    //进入页面默认加载当天记录
    var hr = await dataApi.DayRecord.GetListBySC({
      UserId: this.data.UserId,
      RecordDateBegin: this.data.choiceDate,
      RecordDateEnd: this.data.choiceDate,
      PageSize: 1,
      PageIndex: 1,
      SortName: 'RecordDate',
      Q: this.data.userrole
    });
    if (hr.state && hr.state == 1) {
      if (hr.rows.length == 0 || hr.rows == null) {
        this.setData({
          fatherLeaveMessage: '',
          showMessAdd:true,
          fatherLeaveMessageTime: '',
          weightNum: 50,
          reWeightNum:50,
          prRecord: 0,
          pregnantResponse: '请选择妊娠反应',
          recordId: '',
          motionId: '',
          canIUse: true,
          wxsteps: 0,
          showTZAdd: true,
          showMoodAdd: true, 
          showRSAdd:true,
          showTDSAdd:true,
          moodText: '', //没有心情，文字为空
          moodSelIndex: 0,
          list:{}
        })

        this.getPrRecord(); //加载当天的最新胎动数
        // this.setMRpic(0); //加载默认心情

        // console.log(this.data.choiceDate + " 日期提示 " + this.getdate())
        if (this.data.choiceDate != this.getdate()) {
          wx.showToast({
            title: '该日期未设置记录！',
            icon: 'none'
          });
        }
        return;
      } else {
        // debugger;
        this.setData({
          recordId: hr.rows[0].PregnantRecordId,
          motionId: hr.rows[0].MotionId,
          currentDateRecord: hr.rows[0],
          weightNum: hr.rows[0].Weight,
          reWeightNum: hr.rows[0].Weight,
          showTZAdd: hr.rows[0].Weight == null ? true :false,
          pregnantResponse: hr.rows[0].PregnantResponse == null ? '请选择妊娠反应' : hr.rows[0].PregnantResponse,
          showRSAdd: hr.rows[0].PregnantResponse == null?true:false,
          wxsteps: hr.rows[0].StepCount == null ? 0 : hr.rows[0].StepCount
        });

        var PregnantResponselist = []
        if (hr.rows[0].PregnantResponse != null && hr.rows[0].PregnantResponse != '')
          PregnantResponselist = hr.rows[0].PregnantResponse.split(",")
        this.data.refySelect = PregnantResponselist

        //加载心情
        if (hr.rows[0].Mood == '' || hr.rows[0].Mood ==null){
          this.setData({
            showMoodAdd: true, //心情没有记录，显示添加按钮
            moodText: '', //没有心情，文字为空
            moodSelIndex:0
          })
        }else{
          for (var i = 0; i < this.data.moodlist.length; i++) {
            if (hr.rows[0].Mood == this.data.moodlist[i].key){
              this.setData({
                showMoodAdd: false, //心情有记录，隐藏添加按钮
                moodText: this.data.moodlist[i].name, //选择的心情，文字
                moodSelIndex: hr.rows[0].Mood
              })
            }
          }
        }
        

        for (var i = 0; i < this.data.rsfyList.length; i++) {
          for (var j = 0; j < PregnantResponselist.length; j++) {
            if (this.data.rsfyList[i].Name == PregnantResponselist[j]) {
              this.data.rsfyList[i].IsChoose = true;
            }
          }
        }
        //查找默认不存在的
        var y = PregnantResponselist.filter((a) => {
          return this.data.rsfyList.filter((b) => {
            return b.Name == a;
          }).length == 0
        })


        //不存在的就是自定义的
        for (var i = 0; i < y.length; i++) {

          this.data.rsfyList.push({
            Name: y[i],
            IsChoose: true,
            IsZdy: true
          })

        }
        this.setData({
          rsfyList: this.data.rsfyList
        })

        this.getPrRecord(); //最新胎动数
        this.GetMessageByFather(); //查看爸爸的留言
      }
    }
  },
  showmore() {
    app.getEventLog(54)

    this.setData({
      showmore: false
    })
  },
  hidemore() {
    app.getEventLog(55)

    this.setData({
      showmore: true
    })
  },

  isCheck(day) {
    for (var j = 0; j < this.data.checkList.length; j++) {
      var p = this.data.checkList[j];
      if (p.year == f.currentYear && p.month == f.currentMonth && p.day == day && p.year == this.data.year && p.month == this.data.month) {
        return true;
      }
    }
    return false;
  },
  isSelDay(day) {
    if (day == this.data.cdate) {
      this.setData({
        isSelDay: day
      })
    }
  },
  setFDate() {
    var currdata = this.getdate()
    if (this.data.choiceDate != currdata){
      var chdate = new Date(this.data.choiceDate)
      this.setData({
        year: chdate.getFullYear(),
        month: (chdate.getMonth() + 1),
        cdate: chdate.getDate()
      })
      this.setData({
        datelist: this.setFCheck()
      })
      this.setData({
        lessdatelist: this.setLessCheck()
      })

    }else{
      this.setData({
        year: f.currentYear
      })
      this.setData({
        month: f.currentMonth
      })
      this.setData({
        datelist: this.setFCheck()
      })
      this.setData({
        lessdatelist: this.setLessCheck()
      })
    }
  },
  setLessCheck() {

    let d = new Date();
    var array = []
    if (f.currentYear == d.getFullYear() && f.currentMonth == (d.getMonth() + 1)) {
      let y = 0;
      //判断第几周
      for (var i = 0; i < f.currentDayArray.length; i++) {
        if (f.currentDayArray[i] == d.getDate()) {
          y = i;
          break;
        }
      }
      let m = y % 7;
      let m1 = parseInt(y / 7)

      for (var i = m1 * 7; i < f.currentDayArray.length; i++) {

        if (!f.currentDayArray[i]) {
          array.push({
            day: "",
            isCheck: false,
            isSelDay: ''
          })
        } else {
          array.push({
            day: f.currentDayArray[i],
            isCheck: this.isCheck(f.currentDayArray[i]),
            isSelDay: this.isSelDay(f.currentDayArray[i])
          })
        }
        if (array.length >= 7)
          return array;
      }
      return array;

    } else {
      for (var i = 0; i < 7; i++) {
        if (!f.currentDayArray[i]) {
          array.push({
            day: "",
            isCheck: false,
            isSelDay: ''
          })
        } else {
          array.push({
            day: f.currentDayArray[i],
            isCheck: this.isCheck(f.currentDayArray[i]),
            isSelDay: this.isSelDay(f.currentDayArray[i])
          })
        }
      }
      return array;
    }
  },
  ConvertFDate() {
    var array = [];
    var v = this.getCheckData();
    for (var y = 0; y < v.length; y++) {
      var x = v[y].Date.split('-');
      var item = {
        "year": x[0],
        "month": x[1],
        "day": x[2]
      };
      array.push(item);
    }
    return array;
  },
  choiceFDate() {
    var array = [];
    var v =this.data.choiceDate;
    for (var y = 0; y < v.length; y++) {
      var x = v[y].Date.split('-');
      var item = {
        "year": x[0],
        "month": x[1],
        "day": x[2]
      };
      array.push(item);
    }
    return array;
  },
  getCheckData() {
    // return this.data.get
    var d = new Date();
    var currentMonth = d.getMonth() + 1;
    var currentYear = d.getFullYear();
    var currentDay = d.getDate();
    return [{
      "Date": currentYear + "-" + currentMonth + "-" + currentDay
    }];
  },
  setFCheck() {
    var array = []
    for (var i = 0; i < f.currentDayArray.length; i++) {
      if (!f.currentDayArray[i]) {
        array.push({
          day: "",
          isCheck: false,
          isSelDay: ''
        })
      } else {
        array.push({
          day: f.currentDayArray[i],
          isCheck: this.isCheck(f.currentDayArray[i]),
          isSelDay: this.isSelDay(f.currentDayArray[i])
        })
      }
    }
    return array
  },


  //选择心情
  moodChange: async function(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      moodSelIndex: e.currentTarget.dataset.index
    })
  },
  //提交心情
  sumbitXQ: function () {
    let postdata = {
      UserId: this.data.UserId,
      RecordDate: this.data.choiceDate,
      Mood: this.data.moodSelIndex
    };
    this.updateRecordByInterface(postdata);

    this.setData({
      isXQShow: false
    })
  },

  //提交体重-文本框
  sumbitTZ:function(){
    let postdata = {
      UserId: this.data.UserId,
      RecordDate: this.data.choiceDate,
      Weight: this.data.weightNum
    };
    this.updateRecordByInterface(postdata);

    this.setData({
      isTZShow: false,
      isTZSelect:false
    })
  },
  sumbitTZ2: function () {   
    let postdata = {
      UserId: this.data.UserId,
      RecordDate: this.data.choiceDate,
      Weight: this.data.weightNum
    };
    this.updateRecordByInterface(postdata);

    this.setData({
      isTZShow: false,
      isTZSelect: false
    })
  },

  //选择体重
  bindChange: function (e) {
    const val = e.detail.value
    var selxs = null
    if (this.data.tzSelXS[val[1]].indexOf("kg") >= 0) {
      selxs = this.data.tzSelXS[val[1]].substring(0, this.data.tzSelXS[val[1]].indexOf("kg"));
    }
    this.setData({
      weightNum: this.data.tzSel[val[0]] + selxs
    })
  },

  //自定义选择体重
  setWeight:function(e) {
    //录入体重
    if (e.detail.value == '' || isNaN(e.detail.value)) {
      this.setData({
        weightNum:''
      })
      wx.showToast({
        title: "体重请输入数字", //res.data.msg,
        icon: 'none',
        duration: 2000
      });
      return;
    }else{
      if (e.detail.value=="0"){
        wx.showToast({
          title: "请输入大于0的数字", //res.data.msg,
          icon: 'none',
          duration: 2000
        });
        return;
      } else {
        this.setData({
          weightNum: e.detail.value
        })
      }
    }
  },


  updateRecordByInterface: async function(postdata) {
    //调用接口
    if (this.data.recordId == '') {
      //新增
      var hr = await dataApi.Insert.Post(postdata);
      if (hr.state && hr.state == 1) {
        this.setData({
          recordId: hr.rows[0].PregnantRecordId
        })
        this.setData({
          isRSShow: false
        })
        this.getCurrentDateData();
      }else{
        wx.showToast({
          title: hr.msg,
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      //修改
      var hr = await dataApi.UpdateRecord.updateRecordById(this.data.recordId, postdata);
      if (hr.state && hr.state == 1) {
        this.setData({
          isRSShow: false
        })
        this.getCurrentDateData();
      }else{
        wx.showToast({
          title: hr.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
  },

  //选择心情
  bqchange:function(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      bqselIndex: e.currentTarget.dataset.index
    })
  },
  //手机软键盘提交
  showMessToView:function(){
    this.setData({
      showbqView:false,
      fatherLeaveMessage:this.data.fatherLeaveMess,
      fatherLeaveMess:''
    })
  },
  //确定，将表情写入文本框
  sumbitBQ:function(){
     this.setData({
       fatherLeaveMess: this.data.fatherLeaveMess + this.data.bqselIndex,
       isBQShow: false
     })
  },

  checkIsLogin: function(){
    wx.showToast({
      title: "请前往首页或我的页面注册家庭！",
      icon: 'none',
      duration: 2000
    })
  },

  //活动微信步数授权
  getWeRunData: async function(e) {
    app.getEventLog(63)
   
      // console.log("活动微信步数授权" + this.data.choiceDate)
      var that = this;

      wx.getSetting({
        success(res) {
          let resrun = res.authSetting['scope.werun'];
          if (resrun != undefined && !res.authSetting['scope.werun']) {
            wx.openSetting({
            
              success: (res) => {
                util.authcb('scope.werun', function () {
                  wx.getWeRunData({
                    success(res) {
                      dataApi1.wxApi.wxWeRunData(res, that.data.choiceDate, null).then((hr) => {
                        that.setData({
                          canIUse: false,
                          wxstep: hr.data.step
                        })

                        //更新步数
                        let postdata = {
                          UserId: that.data.UserId,
                          RecordDate: that.data.choiceDate,
                          StepCount: that.data.wxstep
                        };
                        that.updateRecordByInterface(postdata);
                      })
                    }
                  })

                });
              }
            })
          } else {
            util.authcb('scope.werun', function () {
              wx.getWeRunData({
                success(res) {
                  dataApi1.wxApi.wxWeRunData(res, that.data.choiceDate, null).then((hr) => {
                    that.setData({
                      canIUse: false,
                      wxstep: hr.data.step
                    })

                    //更新步数
                    let postdata = {
                      UserId: that.data.UserId,
                      RecordDate: that.data.choiceDate,
                      StepCount: that.data.wxstep
                    };
                    that.updateRecordByInterface(postdata);
                  })
                }
              })

            });
          }
        }
      })

  },
  getWxrunDataInfo: function(e) {

  },

  //查看爸爸的留言 每日记录id PregnantRecordId
  GetMessageByFather: async function() {
    var that = this;
    var hr = await dataApi.DayRecord.GetLeaveMessage({
      PregnantRecordId: this.data.recordId,
      UserId: wx.getStorageSync("wxauth").userid,
      PageSize: 1,
      PageIndex: 1
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      var vlist=that.data.list
      var voice = hr.rows[0].LeaveVoice
      if (hr.rows[0].LeaveVoice != '' && hr.rows[0].LeaveVoice != null){
        voice = voice.split(",")
        vlist.shijian = parseFloat(voice[1]).toFixed(1), 
        vlist.src = voice[0]
      }
      this.setData({
        fatherLeaveMessage: hr.rows[0].LeaveMsg,
        fatherLeaveMessageARR: hr.rows[0],
        fatherLeaveMessageTime: "--" + hr.rows[0].CreatedTime,
        showMessAdd: hr.rows[0].LeaveMsg == null ? true : false,
        list: vlist
      })
      if (hr.rows[0].LeaveMsg != '') {
        this.setData({
          issubmit: true,
          showbqView:false
        })
      }
    } else {
      this.setData({
        list:{},
        fatherLeaveMessage: '',
        fatherLeaveMessageTime: '',
        showMessAdd:true,
        showbqView: true
      })
    }
  },
  bindTextAreaBlur: function(e) {
    if (e.detail.value.length > 100) {
      wx.showToast({
        title: '留言最多100个字！',
        icon: 'none'
      });
      return;
    }
    this.setData({
      fatherLeaveMess: e.detail.value
    })
  },
  //给妈妈留言
  sumbitMessage: function() {
    if (this.data.fatherLeaveMessage == "" && JSON.stringify(this.data.list) == "{}") {
      wx.showToast({
        title: '请先输入留言！',
        icon: 'none'
      });
      return;
    } else {
      this.setData({
        showModal: true
      })
    }
  },

  //选中妊娠反应
  rsfy1: function() {
    this.setData({
      isChecked: true
    })
  },
  //获取最新胎动数
  getPrRecord: async function() {
    var that = this;
    if (this.data.motionId == null || this.data.motionId == "") {
      this.setData({
        prRecord: 0,
        showTDSAdd:true
      })
    } else {
      var hr = await dataApi.DayRecord.GetNewPMRecord(this.data.motionId);
      if (hr.state == 1 && hr.rows.length > 0) {
        this.setData({
          prRecord: hr.rows[0].RecordCount,
          showTDSAdd:false
        })
      }
    }

  },
  //点击日期加载数据
  selDay: function(e) {
    app.getEventLog(51)

    this.setData({
      isSel: true
    })
    var selyear = e.currentTarget.dataset.selyear;
    var selmonth = e.currentTarget.dataset.selmonth;
    var selday = e.currentTarget.dataset.selday;
    if (selmonth < 10) {
      selmonth = "0" + selmonth
    }
    if (selday < 10) {
      selday = "0" + selday
    }
    var seldata = selyear + "-" + selmonth + "-" + selday
    var currdata = this.getdate()
    if (seldata > currdata) {
      console.log("选择日期大于当前日期,未来日期不可以操作哦！")
      var d = new Date();
      var currentDay = d.getDate();

      this.setData({
        isSelDay: currentDay,
        choiceDate: currdata
      })

      wx.showToast({
        title: '未来日期不可以操作哦！',
        icon: 'none'
      });
    } else {
      console.log("加载数据")
      this.setData({
        isSelDay: selday,
        choiceDate: seldata
      })
      this.getCurrentDateData(); //进入页面默认加载当天记录
      this.loadStep();
    }
  },
  //体重有数据时再次点击显示选择
  focus: async function() {
    console.log(this.data.weightNum )
    if (this.data.weightNum == "0" || this.data.weightNum == null){
      this.setData({
        inputFoucs: false
      })
    }else{
      if (this.data.weightNum != "" || this.data.weightNum.length > 0){
        this.setData({
          inputFoucs: true,
          nearw1: parseFloat(Number(this.data.weightNum) - 0.3).toFixed(1),
          nearw2: parseFloat(Number(this.data.weightNum) - 0.2).toFixed(1),
          nearw3: parseFloat(Number(this.data.weightNum) - 0.1).toFixed(1),
          nearw4: parseFloat(Number(this.data.weightNum) + 0.1).toFixed(1),
          nearw5: parseFloat(Number(this.data.weightNum) + 0.2).toFixed(1),
          nearw6: parseFloat(Number(this.data.weightNum) + 0.3).toFixed(1),
        })
      }
    }
  },
  //选择列出的相近体重 加载到框中
  selNearWeight: function(e) {
    var neweight = e.currentTarget.dataset.neweight;
    this.setData({
      weightNum: neweight
    })
  },
  //上一月
  golastmonth: function(e) {
    app.getEventLog(52)
    var preyear=this.data.year
    var premonth = this.data.month
    if (premonth=="1"){
      preyear = this.data.year-1
      premonth="12"
    }else{
      preyear = this.data.year
      premonth = this.data.month-1
    }
    this.setData({
      choiceDate: (preyear + "-" + premonth + "-1").replace(/\-/g, "/")
    })
    var array = f.PrevMonth(this.data.year,this.data.month);
  
    this.setFDate();
    this.getCurrentDateData();
  },
  //下一月
  gonextmonth: function(e) {
    app.getEventLog(53)

    var nextyear = this.data.year
    var nextmonth = this.data.month
    if (nextmonth == "12") {
      nextyear = this.data.year + 1
      nextmonth = "1"
    }else{
      nextyear = this.data.year
      nextmonth = this.data.month+1
    }
    this.setData({
      choiceDate: (nextyear + "-" + nextmonth + "-1").replace(/\-/g, "/") 
    })
    var array = f.NextMonth(this.data.year,this.data.month);
    
    this.setFDate();
    this.getCurrentDateData();
  },


  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  toyuyin:function(){
    this.setData({
      changeinput: false
    });
  },
  towenzi:function(){
    console.log("towenzi")
    this.setData({
      changeinput: true
    });
  },

  //语音
  // 触摸开始
  touchStart: function (e) {
    //检查是否授权录音
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          //调取小程序新版授权页面
          wx.authorize({
            scope: 'scope.record',
            success() {
              console.log("录音授权成功");
              // that.setData({
              //   status: 2
              // })
              // 用户已经同意小程序使用录音功能
            },
            fail() {
              console.log("第一次录音授权失败");
              wx.showModal({
                title: '提示',
                content: '您未授权录音，功能将无法使用',
                showCancel: true,
                confirmText: "授权",
                confirmColor: "#52a2d8",
                success: function (res) {
                  if (res.confirm) {
                    //确认则打开设置页面（重点）
                    wx.openSetting({
                      success: (res) => {
                        console.log(res.authSetting);
                        if (!res.authSetting['scope.record']) {
                          //未设置录音授权
                          console.log("未设置录音授权");
                          wx.showModal({
                            title: '提示',
                            content: '您未授权录音，功能将无法使用',
                            showCancel: false,
                            success: function (res) {
                            },
                          })
                        } else {
                          //第二次才成功授权
                          console.log("设置录音授权成功");
                          // that.setData({
                          //   status: 2
                          // })
                        }
                      },
                      fail: function () {
                        console.log("授权设置录音失败");
                      }
                    })
                  } else if (res.cancel) {
                    console.log("cancel");
                  }
                },
                fail: function () {
                  console.log("openfail");
                }
              })
            }
          })
        } else {
          // that.setData({
          //   status: 2
          // })
        }
      }
    })

    // console.log('touchStart', e);
    var start = e.timeStamp;
    var seconds = (start % (1000 * 60)) / 1000;
    this.setData({
      start: seconds,
      luStatu: true,
    })
    this.recorderManager.start({
      format: 'mp3'
    });
  },

  // 触摸结束
  touchEnd: function (e) {
    // console.log('touchEnd', e);
    var start = this.data.start;
    var end = e.timeStamp;
    var seconds = (end % (1000 * 60)) / 1000;
    var shijian = seconds - start;
    var width = shijian * 4;
    this.setData({
      end: seconds,
      shijian: shijian,
      luStatu: false,
      width: width
    })
    this.recorderManager.stop();
  },
  //播放语音
  playv: function (e) {
    var src = e.currentTarget.dataset.src;
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    if (src.indexOf("Upload") >= 0) {
      src = this.data.urlImg + src
    }
    innerAudioContext.src = src
    console.log("音频地址：" + src)
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },


  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: async function() {
    wx.showToast({
      title: '提交成功',
    })
    var that=this
    if (JSON.stringify(this.data.list) == "{}"){
      that.savemessage(wx.getStorageSync("wxauth").userid, that.data.recordId, that.data.fatherLeaveMessage, '')
    }else{
      wx.uploadFile({
        url: `${setting.setting.urlImg}/api/Upload/Post`,
        filePath: this.data.list.src,
        name: '录音',
        success: function (response) {
          let dataJson = JSON.parse(response.data)
          //console.log(dataJson)

          if (dataJson.state == 1) {
            // that.setData({
            //   mp3Src: dataJson.rows[0]
            // })
            var voiceAndTime = dataJson.rows[0] + ',' + that.data.shijian
            console.log(voiceAndTime)
            that.savemessage(wx.getStorageSync("wxauth").userid, that.data.recordId, that.data.fatherLeaveMessage, voiceAndTime)
          }
        }
      })
    }
    
  },

  savemessage: async function (userid, prid, leamsg, leavoice){
    var that = this;
    var hr = await dataApi.DayRecord.AddLeaveMessage({
      UserId: userid,
      PregnantRecordId: prid,
      LeaveMsg: leamsg,
      LeaveVoice: leavoice,
      Remark:this.data.choiceDate
    });
    if (hr.state && hr.state == 1) {
      this.setData({
        issubmit: true,
        showMessAdd: false
      })
      wx.showToast({
        title: '留言成功',
        icon: 'none'
      });
      this.hideModal();
    } else {
      wx.showToast({
        title: '留言失败'
      });
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    app.getEventLog(9)
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })

    var that = this;
    //  初始化录音对象
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      // that.tip("录音失败！")
      wx.showToast({
        title: '录音失败！',
        icon: 'none'
      });
    });

    // 录音结束
    this.recorderManager.onStop(function (res) {
      var list = that.data.list;
      var shijian = that.data.shijian;
      var src = res.tempFilePath;

      list.src = src;
      list.shijian =  parseFloat(shijian).toFixed(1);
      list.play = false;
      that.setData({
        list: list,
        showbqView:false
      })

      // that.tip("录音完成！")
      console.log(that.data.list)
    });
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
      app.getPageTimer(9, "", vtime, this.data.time2);
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
      app.getPageTimer(9, "", vtime, this.data.time2);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

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