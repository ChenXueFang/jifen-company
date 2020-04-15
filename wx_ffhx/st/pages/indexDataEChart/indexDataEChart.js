// pages/indexDataEChart/indexDataEChart.js
const wxCharts = require('../../utils/wxcharts.js');
var app = getApp();

const util = require("../../utils/util.js")
const setting = require("../../utils/setting.js");
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import authApi from '../../servicesAPI/dataapi'
import register from '../../servicesAPI/userRegister'
import dataApi from '../../servicesAPI/knowledge'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titIndex: 1,
    titarray: [{
      id: 1,
      name: '使用时长'
    }, {
      id: 2,
      name: '面罩贴合度'
    }, {
      id: 3,
      name: '潮气量'
    }, {
      id: 4,
      name: 'AHI'
    }, {
      id: 5,
      name: '呼吸频率'
    }, {
      id: 6,
      name: '呼吸触发比'
    }],
    explanItems: {},

    isshare: false,
    isSureshare: false,
    iteid: "",
    isUserLogin: false,
    isshowlogpic:false,

    prurl: '',
    hidden: false,
    screenWidth: 375,
    qrcodePath: '',
    linData0: {},
    linData1: {},
    linData2: {},
    linData3: {},
    linData4: {},
    linData5: {},
    selWeek: '',
    selWeekDate: '',
    lotype: '',
    todayDate: '', //今天的日期
    todayWeek: '', //今天所在周
    isShowLastWeek: true, //可显示的最后一周
    beginWeekDate: '',
    endWeekDate: '',
    avgOrSum:0,
    dayAvg:0,
    nightAvg:0,
    suggest:0,
    isWSuggest:false,
    lineCanvas0:{},
    lineCanvas1: {},
    lineCanvas2: {},
    lineCanvas3: {},
    lineCanvas4: {},
    lineCanvas5: {},
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  maskHideSelect: function () {
    this.setData({
      isSelect: false,
      isSureshare: false,
      isshare: false
    })
  },
  /**
   * 生成分享图
   */
  share: function() {
    wx.showLoading({
      title: '努力生成中...'
    })

    this.createImage();
  },


  //picker选择项
  bindPickerChange: function(e) {
    this.setData({
      titIndex: e.detail.value
    })
    this.loadExplan(e.detail.value)
  },
  //加载释义
  loadExplan: function(item) {
    var explanItem = this.data.explanItems
    if (item == "0") {
      app.getEventLog("useTime-button")
      explanItem.tit = "使用时长的含义？"
      explanItem.dec = "以小时为单位衡量，它表示患者使用该设备的时长。"
      explanItem.keywords ="面罩"
    } else if (item == "1") {
      app.getEventLog("maskFit-button")
      explanItem.tit = "面罩贴合度的含义？"
      explanItem.dec = "面罩与您面部的贴合程度，调整佩戴，提高贴合度，治疗效果越佳。"
      explanItem.keywords = "面罩"
    } else if (item == "2") {
      app.getEventLog("airNumber-button")
      explanItem.tit = "什么是潮气量？"
      explanItem.dec = "患者每次呼吸时吸⼊或呼出的⽓量，似潮汐的涨落，称为潮⽓量。此指标与患者的体重有关：体重kg *（8~12ml / kg）。"
      explanItem.keywords = "呼吸"
    } else if (item == "3") {
      app.getEventLog("AHI-button")
      explanItem.tit = "什么是AHI？"
      explanItem.dec = "⽤于评估患者睡眠呼吸暂停的严重程度，数字越⼩越好，⼩于5是⾮常理想的。"
      explanItem.keywords = "睡眠"
    } else if (item == "4") {
      app.getEventLog("breathingRate-button")
      explanItem.tit = "什么是呼吸频率？"
      explanItem.dec = "指患者每分钟呼吸的次数。"
      explanItem.keywords = "呼吸"
    } else if (item == "5") {
      app.getEventLog("breathingTouch-button")
      explanItem.tit = "什么是呼吸触发百分比？"
      explanItem.dec = "指自主呼吸占呼吸机呼吸频率的百分比，用来反应患者本身自主呼吸的能力。"
      explanItem.keywords = "呼吸"
    }
    this.setData({
      explanItems: explanItem,
      titIndex: item,
      iteid: item
    })

    if (this.data.lotype == "nologin") {
      this.nologinShowData()
    } else {
      var typeid = parseInt(item)
      this.bindData(typeid, this.data.beginWeekDate, this.data.endWeekDate)
     
    }
    this.searchEssay()
  },
  //加载对应文章
  searchEssay: async function () {
    this.setData({ illnessList:[] })
    var that = this;
    var hr = await dataApi.knowledgeApi.gerArticleList({
      LableLike: this.data.explanItems.keywords,
      ContentLike: this.data.explanItems.keywords,
      TitleLike: this.data.explanItems.keywords,
      PageSize: 8,
      PageIndex: 1,
      SortName: "createdtime",
      SortOrder: "desc",
      Q: "1"
    });

    if (hr.state == 1) {
      if (hr.rows.length > 0) {
        // that.setData({
        //   illnessList:hr.rows
        // })

        that.setData({
          illnessList: hr.rows.filter((a) => {
            return a.ClassType != "2"
          })
        })
      }
    } 
  },
  // 疾病教育文章
  toIllnessEssay(e) {
    wx.navigateTo({
      url: `../knowledge/illnessEssay/illnessEssay?guid=${e.currentTarget.dataset.guid}&classtype=${e.currentTarget.dataset.classtype}&pageto=`,
    })
  },
  //分享弹窗
  showShare: function() {
    this.bindlogImgData()
    
    this.setData({
      isshare: true
    })
  },
  //关闭分享弹窗
  hideShare: function() {
    this.setData({
      isshare: false
    })
  },
  //解读报告服务，拨打400电话
  toCall: function() {
    app.getEventLog("reportCall-button")
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber
    })
  },
  //选项弹窗
  toSelect: function() {
    this.setData({
      isSelect: true
    })
  },
  //隐藏选项弹窗
  hideSelect: function() {
    this.setData({
      isSelect: false
    })
  },
  maskHideSelect: function () {
    this.setData({
      isSelect: false,
      isSureshare: false,
      isshare: false
    })
  },
  //加载对应信息
  toShowDetail: function(e) {
    var itemid = e.currentTarget.dataset.itemid;
    this.loadExplan(itemid)
    this.setData({
      isSelect: false,
      iteid: itemid
    })
  },
  //分享本周报告
  toShare: function() {
    this.setData({
      isSureshare: true,
      isshare: false,
      isSelect: false
    })
  },
  //取消分享报告
  hideSureshare: function() {
    this.setData({
      isSureshare: false
    })
  },
  //分享长图
  toShareLogImage: function() {
    app.getShareLog("shareReport", "分享本周报告"); //记录分享本周报告日志
    this.setData({
      isSureshare: false,
      isshowlogpic:true
    })

    this.share();
  },

  //长图数据绑定
  bindlogImgData:async function(){
    this.getdate()
    var stdate = this.data.beginWeekDate
    var etdate=this.data.endWeekDate
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
      this.setData({
        screenWidth: res.windowWidth
      })
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var hrCharData = await register.UserRegister.GetCharData({
      userId: wx.getStorageSync("wxauth").userid,
      countType: 0, 
      beginDate: stdate,
      endDate: etdate
    });
    if (hrCharData.state == 1) {
      var whiteData = hrCharData.data.whitevalue;
      var blackData = hrCharData.data.blackvalue;
      
      for (var i = 0; i < whiteData.length; i++) {
        whiteData[i] = whiteData[i] / 3600
      }
      for (var j = 0; j < blackData.length; j++) {
        blackData[j] = blackData[j] / 3600
      }


      var cavans0 = this.data.lineCanvas0;
      cavans0.avgOrSum = hrCharData.data.AvgOrSum
      cavans0.suggest = hrCharData.data.Suggest == null ? '' : hrCharData.data.Suggest
      cavans0.dayAvg = hrCharData.data.DayAvg
      cavans0.nightAvg = hrCharData.data.NightAvg

      this.createEchar('lineCanvas_0', windowWidth, whiteData, blackData);

      this.setData({
        lineCanvas0: cavans0
      })
    }

    var hrCharData = await register.UserRegister.GetCharData({
      userId: wx.getStorageSync("wxauth").userid,
      countType: 1, 
      beginDate: stdate,
      endDate: etdate
    });
    if (hrCharData.state == 1) {
      var whiteData = hrCharData.data.whitevalue;
      var blackData = hrCharData.data.blackvalue;

      for (var i = 0; i < whiteData.length; i++) {
        whiteData[i] = whiteData[i] * 100
      }

      for (var j = 0; j < blackData.length; j++) {
        blackData[j] = blackData[j] * 100
      }

      var cavans0 = this.data.lineCanvas1;
      cavans0.avgOrSum = hrCharData.data.AvgOrSum
      cavans0.suggest = hrCharData.data.Suggest == null ? '' : hrCharData.data.Suggest
      cavans0.dayAvg = hrCharData.data.DayAvg
      cavans0.nightAvg = hrCharData.data.NightAvg

      this.createEchar('lineCanvas_1', windowWidth, whiteData, blackData);

      this.setData({
        lineCanvas1: cavans0
      })
    }

    var hrCharData = await register.UserRegister.GetCharData({
      userId: wx.getStorageSync("wxauth").userid,
      countType: 2, 
      beginDate: stdate,
      endDate: etdate
    });
    if (hrCharData.state == 1) {
      var whiteData = hrCharData.data.whitevalue;
      var blackData = hrCharData.data.blackvalue;

      var cavans0 = this.data.lineCanvas2;
      cavans0.avgOrSum = hrCharData.data.AvgOrSum
      cavans0.suggest = hrCharData.data.Suggest == null ? '' : hrCharData.data.Suggest
      cavans0.dayAvg = hrCharData.data.DayAvg
      cavans0.nightAvg = hrCharData.data.NightAvg

      this.createEchar('lineCanvas_2', windowWidth, whiteData, blackData);

      this.setData({
        lineCanvas2: cavans0
      })
    }
    
    var hrCharData = await register.UserRegister.GetCharData({
      userId: wx.getStorageSync("wxauth").userid,
      countType: 4, 
      beginDate: stdate,
      endDate: etdate
    });
    if (hrCharData.state == 1) {
      var whiteData = hrCharData.data.whitevalue;
      var blackData = hrCharData.data.blackvalue;

      var cavans0 = this.data.lineCanvas3;
      cavans0.avgOrSum = hrCharData.data.AvgOrSum
      cavans0.suggest = hrCharData.data.Suggest == null ? '' : hrCharData.data.Suggest
      cavans0.dayAvg = hrCharData.data.DayAvg
      cavans0.nightAvg = hrCharData.data.NightAvg

      this.createEchar('lineCanvas_3', windowWidth, whiteData, blackData);

      this.setData({
        lineCanvas3: cavans0
      })
    }

    var hrCharData = await register.UserRegister.GetCharData({
      userId: wx.getStorageSync("wxauth").userid,
      countType: 5,
      beginDate: stdate,
      endDate: etdate
    });
    if (hrCharData.state == 1) {
      var whiteData = hrCharData.data.whitevalue;
      var blackData = hrCharData.data.blackvalue;
      for (var i = 0; i < whiteData.length; i++) {
        whiteData[i] = whiteData[i] * 100
      }

      for (var j = 0; j < blackData.length; j++) {
        blackData[j] = blackData[j] * 100
      }

      var cavans0 = this.data.lineCanvas4;
      cavans0.avgOrSum = hrCharData.data.AvgOrSum
      cavans0.suggest = hrCharData.data.Suggest == null ? '' : hrCharData.data.Suggest
      cavans0.dayAvg = hrCharData.data.DayAvg
      cavans0.nightAvg = hrCharData.data.NightAvg

      this.createEchar('lineCanvas_4', windowWidth, whiteData, blackData);

      this.setData({
        lineCanvas4: cavans0
      })
    }

    var hrCharData = await register.UserRegister.GetCharData({
      userId: wx.getStorageSync("wxauth").userid,
      countType: 3, 
      beginDate: stdate,
      endDate: etdate
    });
    if (hrCharData.state == 1) {
      var whiteData = hrCharData.data.whitevalue;
      var blackData = hrCharData.data.blackvalue;

      var cavans0 = this.data.lineCanvas5;
      cavans0.avgOrSum = hrCharData.data.AvgOrSum
      cavans0.suggest = hrCharData.data.Suggest == null ? '' : hrCharData.data.Suggest
      cavans0.dayAvg = hrCharData.data.DayAvg
      cavans0.nightAvg = hrCharData.data.NightAvg

      this.createEchar('lineCanvas_5', windowWidth, whiteData, blackData);

      this.setData({
        lineCanvas5: cavans0
      })
    }
  },

  //选择日期
  toSelectDate: function() {
    wx.navigateTo({
      url: '../SelectDate/SelectDate?currentChoiceDate=' + this.data.choiceData + '&itemtypeid=' + this.data.titIndex + '&lotype=' + this.data.lotype,
    })
  },

  //加载当前日期所在周 周日-周六
  getMonDayAndSunDay: function(datevalue) {
    var dateValue = datevalue.replace(/\-/g, '/');
    var arr = dateValue.split("/")

    //月份-1 因为月份从0开始 构造一个Date对象
    var date = new Date(arr[0], arr[1] - 1, arr[2]);
    var dateOfWeek = date.getDay(); //返回当前日期的在当前周的某一天（0～6--周日到周一）
    var dateOfWeekInt = parseInt(dateOfWeek + 1, 10); //转换为整型

    if (dateOfWeekInt == 0) { //如果是周日
      dateOfWeekInt = 7;
    }
    var aa = 7 - dateOfWeekInt; //当前于周末相差的天数

    var temp2 = parseInt(arr[2], 10); //按10进制转换，以免遇到08和09的时候转换成0
    var sunDay = temp2 + aa; //当前日期的周日的日期
    var monDay = sunDay - 6 //当前日期的周一的日期

    var startDate = new Date(arr[0], arr[1] - 1, monDay);
    var endDate = new Date(arr[0], arr[1] - 1, sunDay);

    var sm = parseInt(startDate.getMonth()) + 1; //月份+1 因为月份从0开始
    var em = parseInt(endDate.getMonth()) + 1;

    var start = startDate.getFullYear() + "/" + sm + "/" + startDate.getDate();
    var end = endDate.getFullYear() + "/" + em + "/" + endDate.getDate();
    var result = new Array();
    result.push(start);
    result.push(end);

    console.log(start)
    console.log(end)
    // return result;
    this.setData({
      selWeekDate: result,
      beginWeekDate: start,
      endWeekDate: end,
      selWeek: sm + "月" + startDate.getDate() + "日 - " + em + "月" + endDate.getDate() + "日"
    })

    if (this.data.todayDate == datevalue) {
      this.setData({
        todayWeek: sm + "月" + startDate.getDate() + "日 - " + em + "月" + endDate.getDate() + "日"
      })
    }

    if (this.data.selWeek === this.data.todayWeek) {
      //  console.log("最后一周")
      this.setData({
        isShowLastWeek: true
      })
    } else {
      this.setData({
        isShowLastWeek: false
      })
    }
  },

  //取当天
  getdate: function() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var curdate = year + seperator1 + month + seperator1 + strDate;

    this.setData({
      choiceData: curdate,
      todayDate: curdate
    })

    this.getMonDayAndSunDay(this.data.choiceData)
  },

  //上一周
  proWeek: function() {
    console.log("上一周：" + this.data.iteid)
    var date = new Date(this.data.choiceData);

    var timestamp = date.getTime();
    var newDate = new Date(timestamp - 7 * 24 * 3600 * 1000);
    // var curdate= [[newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join('-'), [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()].join(':')].join(' ');
    var curdate = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join('/');
    this.setData({
      choiceData: curdate,
    })
    this.getMonDayAndSunDay(this.data.choiceData)
    this.loadExplan(this.data.iteid)
  },
  //下一周
  nextWeek: function() {
    console.log("下一周：" + this.data.iteid)
    var date = new Date(this.data.choiceData);

    var timestamp = date.getTime();
    var newDate = new Date(timestamp + 7 * 24 * 3600 * 1000);

    var curdate = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join('/');
    this.setData({
      choiceData: curdate,
    })

    this.getMonDayAndSunDay(this.data.choiceData)
    this.loadExplan(this.data.iteid)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    var currDate = options.currentChoiceDate;
    var itypeid = options.itmid;
    if (currDate != "" && currDate != null && currDate != undefined) {
      this.setData({
        choiceData: currDate
      })
      this.getMonDayAndSunDay(this.data.choiceData)
    } else {
      this.getdate()
    }

    var itid = options.itemid;
    var logtype = options.lotype;
    this.setData({
      iteid: itid == null ? itypeid : itid,
      lotype: logtype
    })
    this.loadExplan(this.data.iteid)

    let that = this;
    // wx.getImageInfo({
    //   src: '../../images/qrcode.jpg',
    //   success: function(res) {
    //     that.setData({
    //       qrcodePath: '../../' + res.path
    //     })
    //   }
    // })

    let hr = await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
      this.setData({
        isUserLogin: false //未登录
      })
    } else {
      this.setData({
        isUserLogin: true //已登录
      })
    }
    // if (this.data.lotype == "nologin") {
    //   this.nologinShowData()
    // } else {
    //   this.loginShowData()
    // }
    
  },

  //游客状态或未审核状态查看数据
  nologinShowData: function() {
    var windowWidth = 320;
    try {

      windowWidth = wx.getStorageSync("systemInfo").windowWidth;

      this.setData({
        screenWidth: windowWidth
      })
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var whiteData = [0, 0, 0, 0];
    var blackData = [0, 0, 0, 0];
    this.createEchar('lineCanvas', windowWidth, whiteData, blackData);
  },



  bindData: async function(iteid, begDate, enDate) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
      this.setData({
        screenWidth: res.windowWidth
      })
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    //查询接口获取数据
    var hrCharData = await register.UserRegister.GetCharData({
      userId: wx.getStorageSync("wxauth").userid,
      countType: iteid, //1-6
      beginDate: begDate,
      endDate: enDate
    });
    if (hrCharData.state == 1) {
      var whiteData = hrCharData.data.whitevalue;
      var blackData = hrCharData.data.blackvalue;

      // this.setData({
      //   avgOrSum: parseFloat(hrCharData.data.AvgOrSum).toFixed(2),
      //   suggest: hrCharData.data.Suggest,
      //   dayAvg: parseFloat(hrCharData.data.DayAvg).toFixed(2),
      //   nightAvg: (parseFloat(hrCharData.data.NightAvg).toFixed(2)) * 100,
      //   isWSuggest:hrCharData.data.isWeekSuggest
      // })
 
      // console.log(whiteData)
      // console.log(blackData)
      if(iteid=="0"){
        for (var i = 0; i < whiteData.length; i++) {
          whiteData[i] = whiteData[i] /3600
        }
        for (var j = 0; j < blackData.length; j++) {
          blackData[j] = blackData[j] /3600
        }

        this.setData({
          avgOrSum: (hrCharData.data.AvgOrSum / 3600).toFixed(1) +"小时",
          suggest: hrCharData.data.Suggest,
          dayAvg: (hrCharData.data.DayAvg / 3600).toFixed(1) + "小时",
          nightAvg: (hrCharData.data.NightAvg / 3600).toFixed(1) + "小时",
          isWSuggest: hrCharData.data.isWeekSuggest
        })
      }
      if (iteid == "1" || iteid == "5"){
        for (var i = 0; i < whiteData.length;i++){
          whiteData[i] = whiteData[i]*100
        }

        for (var j = 0; j < blackData.length; j++) {
          blackData[j] = blackData[j] * 100
        }

        // console.log(whiteData)
        // console.log(blackData)
        this.setData({
          avgOrSum: ((parseFloat(hrCharData.data.AvgOrSum).toFixed(2)) * 100).toFixed(0) + "%",
          suggest: hrCharData.data.Suggest,
          dayAvg: ((parseFloat(hrCharData.data.DayAvg).toFixed(2)) * 100).toFixed(0) + "%",
          nightAvg: ((parseFloat(hrCharData.data.NightAvg).toFixed(2)) * 100).toFixed(0) + "%",
          isWSuggest: hrCharData.data.isWeekSuggest
        })
      }
      if (iteid == "2") {
        this.setData({
          avgOrSum: (hrCharData.data.AvgOrSum).toFixed(0) + "毫升",
          suggest: hrCharData.data.Suggest,
          dayAvg: (hrCharData.data.DayAvg).toFixed(0) + "毫升",
          nightAvg: (hrCharData.data.NightAvg).toFixed(0) + "毫升",
          isWSuggest: hrCharData.data.isWeekSuggest
        })
      }
      if (iteid == "3") {
        this.setData({
          avgOrSum: (hrCharData.data.AvgOrSum).toFixed(0) + "次/时",
          suggest: hrCharData.data.Suggest,
          dayAvg: (hrCharData.data.DayAvg).toFixed(0) + "次/时",
          nightAvg: (hrCharData.data.NightAvg).toFixed(0) + "次/时",
          isWSuggest: hrCharData.data.isWeekSuggest
        })
      }
      if (iteid == "4") {
        this.setData({
          avgOrSum: (hrCharData.data.AvgOrSum).toFixed(0) + "次/分",
            suggest: hrCharData.data.Suggest,
          dayAvg: (hrCharData.data.DayAvg).toFixed(0) + "次/分",
          nightAvg: (hrCharData.data.NightAvg).toFixed(0) + "次/分",
            isWSuggest: hrCharData.data.isWeekSuggest
        })
      }
      if (iteid == "3") {
        this.createEchar2('lineCanvas', windowWidth, whiteData, blackData);
      }else{
        this.createEchar('lineCanvas', windowWidth, whiteData, blackData);
      }
    } else if (hrCharData.state == -1){
      this.nologinShowData()
    }
  },

  createEchar2: function (canvasId, windowWidth, whiteData, blackData) {
    console.log("iteid:" + this.data.iteid)
    new wxCharts({
      canvasId: canvasId, // 'lineCanvas_2',
      type: 'column',
      legend: true,
      categories: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      series: [ {
        name: '夜晚',
        data: blackData,
        color: "#2e4068"
      }],
      xAxis: {
        disableGrid: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#00ff00',
            width: 2
          }
        }
      },
      yAxis: {
        max: 10,//this.data.iteid == 3 ? 10 : '',
        min: 0,
        // splitNumber: 5,
        format: function (val) {
          return val;
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#00ffee',
            width: 1
          }
        }
      },
      width: windowWidth,
      height: 300,
      dataLabel: false
    });
  },
  createEchar: function(canvasId, windowWidth, whiteData, blackData) {
    console.log("iteid:" + this.data.iteid)
    new wxCharts({
      canvasId: canvasId, // 'lineCanvas_2',
      type: 'column',
      legend:true,
      categories: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      series: [{
        name: '白天',
        data: whiteData
      }, {
        name: '夜晚',
        data: blackData
      }],
      xAxis: {
        disableGrid: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#00ff00',
            width: 2
          }
        }
      },
      yAxis: {
        max: 10,//this.data.iteid==3?10:'',
        min: 0,
        // splitNumber: 5,
        format: function(val) {
          return val;
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#00ffee',
            width: 1
          }
        }
      },
      width: windowWidth,
      height: 300,
      dataLabel: false
    });
  },
  // 创建分享图片
  createImage:async function() {
    wx.showLoading({
      title: '正在生成中'
    })
    let logArray=[];
    var that = this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    const ctx = wx.createCanvasContext('shareImg');

    ctx.setFillStyle('white')
    ctx.fillRect(0, 0, 545, 12000)
    //ctx.draw()
    wx.hideLoading();
    // ctx.draw(true, function(ee) {
    //   setTimeout(async function(){
        
      //if (ee.errMsg == 'drawCanvas:ok') {
        let qrcodeWidth = 90;
        //二维码
        // console.log(that.data.qrcodePath)
        //ctx.drawImage( this.data.qrcodePath , 10, 10, qrcodeWidth, qrcodeWidth);
       
   

        let totalHeight = qrcodeWidth;
        //绘制表格
        let charWeight = 370; //表格款度
        let charHeight = 370; //表格高度
        let titleHeight = 30; //标题高度
        let desHeight = 80; //备注说明高度
        let charcount = 0,
          titleCount = 1,
          desCount = 0;

        charWeight = that.data.screenWidth - 20

        let offset = qrcodeWidth + 450 + (charHeight * charcount) + (titleHeight * titleCount) + (desHeight * desCount);
        totalHeight += offset;
    await ctx.draw(true, that.drowImg(ctx, 'lineCanvas_0', 10, offset, charWeight, charHeight, logArray));
        charcount++;
        titleCount++;
        desCount++;

        offset = that.getOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
        totalHeight += offset;
    await ctx.draw(true, that.drowImg(ctx, 'lineCanvas_1', 10, offset, charWeight, charHeight, logArray));
        charcount++;
        titleCount++;
        desCount++;

        offset = that.getOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    await ctx.draw(true, that.drowImg(ctx, 'lineCanvas_2', 10, offset+90, charWeight, charHeight, logArray));
        charcount++;
        titleCount++;
        desCount++;
        totalHeight += offset;

        offset = that.getOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    await ctx.draw(true, that.drowImg(ctx, 'lineCanvas_3', 10, offset + 190, charWeight, charHeight, logArray));
        charcount++;
        titleCount++;
        desCount++;
        totalHeight += offset;

        offset = that.getOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    await ctx.draw(true, that.drowImg(ctx, 'lineCanvas_4', 10, offset + 260, charWeight, charHeight, logArray));
        charcount++;
        titleCount++;
        desCount++;
        totalHeight += offset;

        offset = that.getOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    await ctx.draw(true, that.drowImg(ctx, 'lineCanvas_5', 10, offset + 330, charWeight, charHeight, logArray));
        totalHeight += offset;


        //增加标题


        ctx.setTextAlign('right');
        ctx.setFillStyle('#000000');
        ctx.setFontSize(24)

    ctx.fillText(wx.getStorageSync("nickName"), 520, 50)
        ctx.fillText('的呼吸机周报告', 520, 80)
        ctx.setFontSize(18)
    ctx.fillText('2019年 ' + this.data.todayWeek, 520, 120)

        //划线
        ctx.beginPath()
        ctx.moveTo(20, 150)
        ctx.lineTo(520, 150)
        ctx.stroke()

        ctx.setTextAlign('center');
        
        //呼吸机图片
    wx.getImageInfo({
      src: '../../images/qrcode.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 50, 30, 90, 90);
      }
    })
    
        let xhjWidth = 200;
        wx.getImageInfo({
          src: '../../images/machine.png',
          success: function (res) {
            ctx.drawImage('../../' + res.path, 180, 180, xhjWidth, 120);
          }
        })
        //文字描述
        ctx.setTextAlign('center');
        ctx.setFontSize(18)
        ctx.fillText('Dreamstation ST 30', 280, 340)
        ctx.fillText('飞利浦伟康专注呼吸医疗设备，作为连', 280, 380)
        ctx.fillText('接医院至家庭的重要纽带，为您和您的', 280, 410)
        ctx.fillText('家庭提供全方位的呼吸健康关怀。', 280, 440)

    
        ctx.setFontSize(22);
        titleCount = 1;
        charcount = 0;
        desCount = 0;
        let titleoffset = 500 + (charHeight * charcount) + (titleHeight * titleCount);
    ctx.setFillStyle('#f6f6f6')
    ctx.fillRect(0, 480, 550, 75)
     
    ctx.setFillStyle('#000000');
        ctx.fillText('使用时长', 270, titleoffset)
        totalHeight += titleoffset;

        charcount++;
        titleCount++;
        desCount++;
        titleoffset = that.getTitleOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    ctx.setFillStyle('#f6f6f6')
    ctx.fillRect(0, 1050, 550, 75)
    ctx.setFillStyle('#000000');
    ctx.fillText('面罩贴合度', 270, titleoffset)
        totalHeight += titleoffset;

        charcount++;
        titleCount++;
        desCount++;
        titleoffset = that.getTitleOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    ctx.setFillStyle('#f6f6f6')
    ctx.fillRect(0, 1610, 550, 75)
    ctx.setFillStyle('#000000');
    ctx.fillText('潮气量', 270, titleoffset+80)
        totalHeight += titleoffset;

        charcount++;
        titleCount++;
        desCount++;
        titleoffset = that.getTitleOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    ctx.setFillStyle('#f6f6f6')
     ctx.fillRect(0, 2200, 550, 75)
    ctx.setFillStyle('#000000');
    ctx.fillText('呼吸频率', 270, titleoffset + 200)
        totalHeight += titleoffset;

        charcount++;
        titleCount++;
        desCount++;
        titleoffset = that.getTitleOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    ctx.setFillStyle('#f6f6f6')
    ctx.fillRect(0, 2750, 550, 75)
    ctx.setFillStyle('#000000');
    ctx.fillText('自主呼吸触发比', 270, titleoffset + 270)
        totalHeight += titleoffset;

        charcount++;
        titleCount++;
        desCount++;
        titleoffset = that.getTitleOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
     ctx.setFillStyle('#f6f6f6')
     ctx.fillRect(0, 3300, 550, 75)
    ctx.draw()
     ctx.setFillStyle('#000000');
    ctx.fillText('AHI', 270, titleoffset + 340)
        totalHeight += titleoffset;


        //增加文字说明
        ctx.setTextAlign('center');
        ctx.setFillStyle('#000000');
        ctx.setFontSize(16);
        titleCount = 1;
        charcount = 1;
        desCount = 0;

    let daypicWidth = 25;
    wx.getImageInfo({
      src: '../../images/daytime.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 350, 950, daypicWidth, daypicWidth);
      }
    })
    wx.getImageInfo({
      src: '../../images/night.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 420, 950, daypicWidth, daypicWidth);
      }
    })

    wx.getImageInfo({
      src: '../../images/daytime.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 350, 1510, daypicWidth, daypicWidth);
      }
    })

    wx.getImageInfo({
      src: '../../images/night.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 420, 1510, daypicWidth, daypicWidth);
      }
    })

    wx.getImageInfo({
      src: '../../images/daytime.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 350, 2090, daypicWidth, daypicWidth);
      }
    })

    wx.getImageInfo({
      src: '../../images/night.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 420, 2090, daypicWidth, daypicWidth);
      }
    })

    wx.getImageInfo({
      src: '../../images/daytime.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 350, 2650, daypicWidth, daypicWidth);
      }
    })

    wx.getImageInfo({
      src: '../../images/night.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 420, 2650, daypicWidth, daypicWidth);
      }
    })
    wx.getImageInfo({
      src: '../../images/daytime.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 350, 3200, daypicWidth, daypicWidth);
      }
    })

    wx.getImageInfo({
      src: '../../images/night.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 420, 3200, daypicWidth, daypicWidth);
      }
    })

    wx.getImageInfo({
      src: '../../images/daytime.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 350, 3780, daypicWidth, daypicWidth);
      }
    })

    wx.getImageInfo({
      src: '../../images/night.png',
      success: function (res) {
        ctx.drawImage('../../' + res.path, 420, 3780, daypicWidth, daypicWidth);
      }
    })
    ctx.setTextAlign('left');

        //return 140 + (charHeight * charcount) + (titleHeight * titleCount) + (desHeight * desCount);
        let desceoffset = 480 + qrcodeWidth + (charHeight * charcount) + (titleHeight * titleCount) + (desHeight * desCount);
    ctx.fillText('使用时长:本周平均' + (this.data.lineCanvas0.avgOrSum / 3600).toFixed(1)+'%', 20, desceoffset)
    ctx.fillText((this.data.lineCanvas0.dayAvg / 3600).toFixed(1) + '%', 380, desceoffset)
    ctx.fillText((this.data.lineCanvas0.nightAvg / 3600).toFixed(1) + '%', 450, desceoffset)
    ctx.fillText(this.data.lineCanvas0.suggest + "", 20, 1010)
        totalHeight += desceoffset;

        charcount++;
        titleCount++;
        desCount++;
        desceoffset = that.getDescOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    ctx.fillText('面罩贴合度:本周平均' + ((parseFloat(this.data.lineCanvas1.avgOrSum).toFixed(2)) * 100).toFixed(0) + '%', 20, desceoffset)
    ctx.fillText(((parseFloat(this.data.lineCanvas1.dayAvg).toFixed(2)) * 100).toFixed(0) + '%', 380, desceoffset)
    ctx.fillText(((parseFloat(this.data.lineCanvas1.nightAvg).toFixed(2)) * 100).toFixed(0) + '%', 450, desceoffset)
    ctx.fillText(this.data.lineCanvas1.suggest + "", 20, 1570)
        totalHeight += desceoffset;

        charcount++;
        titleCount++;
        desCount++;
        desceoffset = that.getDescOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
      ctx.fillText('潮气量:本周平均' + (this.data.lineCanvas2.avgOrSum).toFixed(0) + '%', 20, desceoffset+100)
      ctx.fillText((this.data.lineCanvas2.dayAvg).toFixed(0) + '%', 380, desceoffset + 100)
      ctx.fillText((this.data.lineCanvas2.nightAvg).toFixed(0) + '%', 450, desceoffset + 100)
      ctx.fillText(this.data.lineCanvas2.suggest + "", 20, 2140)
        totalHeight += desceoffset+150;

        charcount++;
        titleCount++;
        desCount++;
        desceoffset = that.getDescOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    ctx.fillText('呼吸频率:本周平均' + (this.data.lineCanvas3.avgOrSum).toFixed(0) + '%', 20, desceoffset + 180)
    ctx.fillText((this.data.lineCanvas3.dayAvg).toFixed(0) + '%', 380, desceoffset + 180)
    ctx.fillText((this.data.lineCanvas3.nightAvg).toFixed(0) + '%', 450, desceoffset + 180)
    ctx.fillText(this.data.lineCanvas3.suggest + "", 20, 2700)
    totalHeight += desceoffset + 150;

        charcount++;
        titleCount++;
        desCount++;
        desceoffset = that.getDescOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    ctx.fillText('自主呼吸触发比:本周平均' + ((parseFloat(this.data.lineCanvas4.avgOrSum).toFixed(2)) * 100).toFixed(0) + '%', 20, desceoffset + 250)
    ctx.fillText(((parseFloat(this.data.lineCanvas4.dayAvg).toFixed(2)) * 100).toFixed(0) + '%', 380, desceoffset + 250)
    ctx.fillText(((parseFloat(this.data.lineCanvas4.nightAvg).toFixed(2)) * 100).toFixed(0) + '%', 450, desceoffset + 250)
    ctx.fillText(this.data.lineCanvas4.suggest + "", 20, 3250)
    totalHeight += desceoffset + 150;

        charcount++;
        titleCount++;
        desCount++;
        desceoffset = that.getDescOffSet(charHeight, titleHeight, charcount, titleCount, desHeight, desCount);
    ctx.fillText('AHI:本周平均' + (this.data.lineCanvas5.avgOrSum).toFixed(2) + '%', 20, desceoffset + 350)
    ctx.fillText((this.data.lineCanvas5.dayAvg).toFixed(2)+ '%', 380, desceoffset + 350)
    ctx.fillText((this.data.lineCanvas5.nightAvg).toFixed(2) + '%', 450, desceoffset + 350)
    ctx.fillText(this.data.lineCanvas5.suggest + "", 20, 3840)
        totalHeight += desceoffset;


        //最后再放一个二维码

        wx.getImageInfo({
          src: '../../images/qrcode.png',
          success: function(res) {
            console.log(res)
            ctx.drawImage('../../' + res.path, 220, 3850, 120, 120);
          }
        })
    ctx.setTextAlign('center');
    ctx.setFontSize(18)
    ctx.fillText('飞畅呼吸 关护每一天', 280, 4020)
    ctx.fillText('品质生活 从今天开始', 280, 4050)

    ctx.setFontSize(26)
    ctx.setFillStyle('#3C7FDF');
    ctx.fillText('PHILIPS', 280, 4150)

        setTimeout(function() {
          //ctx.stroke();
          ctx.draw(true, function(respons) {
            logArray.push({ info: '画完所有，开始canvasToTempFilePath' })
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: 545,
              height: 4200,
              destWidth: 545,
              destHeight: 3100,
              fileType: 'jpg',
              canvasId: 'shareImg',
              success: function(res) {
                logArray.push({ info: 'canvasToTempFilePath生成：' + res.tempFilePath })
                that.setData({
                  prurl: res.tempFilePath,
                  hidden: true
                })

                for (let i = 0; i < logArray.length; i++) {
                  console.log(logArray[i].info);
                }

              },
              fail: function(res) {
                console.log(res)
              },
              complete: function() {
                wx.hideLoading();
              }
            })

          });
        }, 1200);
        //柱状图生成临时图片,获取到临时图片路径  end
      // }

    //   }, 800)
    // });//darw recat



  },


  getOffSet: function(charHeight, titleHeight, charcount, titleCount, desHeight, desCount) {
    return 640 + (charHeight * charcount) + (titleHeight * titleCount) + (desHeight * desCount);
  },
  getTitleOffSet: function(charHeight, titleHeight, charcount, titleCount, desHeight, desCount) {
    return 580 + (charHeight * charcount) + (titleHeight * titleCount) + (desHeight * desCount);
  },
  getDescOffSet: function(charHeight, titleHeight, charcount, titleCount, desHeight, desCount) {
    return 650 + (charHeight * charcount) + (titleHeight * titleCount) + (desHeight * desCount);
  },
  drowImg: async function (canvasContext, cavid, x, y, width, height, logArray) { 
    logArray.push({info: '开始画' + cavid})
   let hr= await new Promise((resolve,reject)=>{
    wx.canvasToTempFilePath({
      canvasId: cavid,
      success: function (res) {
        canvasContext.drawImage(res.tempFilePath, x, y, parseInt(width) * 1.65, height)
        logArray.push({ info: '画完' + cavid })
        resolve(res)
      },
      fail: function (res) {
        logArray.push({ info: '画' + cavid +'faile'})
        console.log(res)
        reject(res)
      }
    })//canvasToTempFilePath
  })//Promise
   return hr;
  },
  /**
   * 保存到相册
   */
  save: function() {
    app.getShareLog("saveShareImg", "保存本周报告分享图"); //记录保存本周报告分享图日志
    var that = this
    //生产环境时 记得这里要加入获取相册授权的代码
    console.log("保存到相册")
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#72B9C3',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                hidden: true
              })
            }
          }
        })
      },
      fail: function (err) {
        console.log(err);
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          // console.log("用户一开始拒绝了，我们想再次发起授权")
          // console.log('打开设置窗口')
          // wx.openSetting({
          //   success(settingdata) {
          //     console.log(settingdata)
          //     if (settingdata.authSetting['scope.writePhotosAlbum']) {
          //       console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
          //     } else {
          //       console.log('获取权限失败，给出不给权限就无法正常使用的提示')
          //     }
          //   }
          // })
          wx.showModal({
            content: '您拒绝了授权，图片保存失败。如需保存图片，请在设置中允许本小程序使用相册。',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#72B9C3',
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  hidden: true
                })
              }
            }
          })
        }
      }
    })
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
    app.getEventLog("indexDataEChart-page")
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
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
      app.getPageTimer("indexDataEChart-page", "", vtime, this.data.time2);
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
      app.getPageTimer("indexDataEChart-page", "", vtime, this.data.time2);
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
  onShareAppMessage: function () {
    app.getPageShare("indexDataEChart-page", "", "pages/indexDataEChart/indexDataEChart")
    return {
      title: '管理更智能，关护更贴心',
      path: `pages/indexDataEChart/indexDataEChart?itmid=${this.data.iteid}`,
      imageUrl: '../../images/shareImg.png'
    }
  },

  getTestData: function() {
    let hr = {
      "pageIndex": null,
      "state": 1,
      "msg": null,
      "rows": null,
      "data": {
        "date": [
          "08.25",
          "08.26",
          "08.27",
          "08.28",
          "08.29",
          "08.30",
          "08.31"
        ],
        "dateIndex": [
          "周日",
          "周一",
          "周二",
          "周三",
          "周四",
          "周五",
          "周六"
        ],
        "whitevalue": [
          "50",
          "0",
          "0",
          "80",
          "0",
          "60",
          "0"
        ],
        "blackvalue": [
          "90",
          "0",
          "0",
          "0",
          "0",
          "0",
          "0"
        ]
      },
      "total": 7
    }
    return hr;
  }
})