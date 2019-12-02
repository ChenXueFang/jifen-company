// pages/signIn/dailyCheck/dailyCheck.js
const app = getApp()
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../../services/myFamily'
import authApi from '../../../services/dataapi'
import signApi from '../../../services/signApi'

const util = require("../../../utils/util.js")
const setting = require("../../../utils/setting.js");
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

var urlImg = wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: ['upload/pointimg/signIn_signBg.png', 'upload/pointimg/signIn_star.png', 'upload/pointimg/signIn_giftBox.png', 'upload/pointimg/sign_medal10.png', 'upload/pointimg/sign_medal20.png', 'upload/pointimg/sign_medal30.png', 'upload/pointimg/sign_medal40.png', 'upload/pointimg/sign_medal11.png', 'upload/pointimg/sign_medal21.png', 'upload/pointimg/sign_medal31.png', 'upload/pointimg/sign_medal41.png', 'upload/pointimg/sign_medal50.png', 'upload/pointimg/sign_medal60.png', 'upload/pointimg/sign_medal70.png', 'upload/pointimg/sign_medal80.png', 'upload/pointimg/sign_medal51.png', 'upload/pointimg/sign_medal61.png', 'upload/pointimg/sign_medal71.png', 'upload/pointimg/sign_medal81.png', 'upload/pointimg/sign_reward.png'],
    urlImg: setting.setting.urlImg,
    currentTab: 0,
    time1: "", //进入页面时间
    time2: "", //离开页面时间
    isHidd: true, //签到动画隐藏
    isHidd2: true, //签到动画隐藏
    today: new Date().getDate(), //获取今天的日期
    buSuccessModal: false, //补签成功弹窗
    buQianModal: false, //是否补签弹窗
    noCardModal: false, //补签卡不足弹窗
    successModal: false, //签到成功弹窗,补签卡，勋章
    cardNum: 0, //补签卡的数量
    signUrl: "../../../images/",
    signImg: "clickSignin.png", //点击签到，补签，您已签到
    medalImg1: "", //本月勋章
    medalImg2: "",
    medalImg3: "",
    medalImg4: "",
    medalModalImg: "", //签到成功弹窗，点亮勋章
    medalNameModal: "", //签到成功弹窗，点亮勋章名字
    medalRole: "", //签到成功弹窗，爸妈角色
    medalNum: "", //签到成功弹窗，连续连到满几天
    hasExtraAdd: false, //额外奖励星星数，动画
    totalsignday: "", //累计签到天数
    rankPencent: "", //领先全国 %

    // 日历
    year: new Date().getFullYear(), // 当前年份
    month: new Date().getMonth() + 1, // 当前月份
    day: new Date().getDate(), //点前号数
    yearChange: new Date().getFullYear(), // 当前年份
    monthChange: new Date().getMonth() + 1, // 当前月份
    dayChange: new Date().getDate(), //点前号数
    str: MONTHS[new Date().getMonth()], // 月份字符串
    demo6_days_style: [],
    pickerYear: "", //时间选择器，选择年月
    pickerMonth: "",
    clickYear: "", //点击日历，所选日期的年月
    clickMonth: "",
    clickDay: "", //选中
    clickDay_No: "", //选中漏签日期

    // 签到数据
    signedDays: [7], //已签到日期
    noSignedDays: [1,2,3,4,5,6], //漏签日期
    noSigned_Day: "", //选中漏签日期
    signed_Day: "", //选中已签到日期
    noSignNum: "", //当前月 漏签天数
    signNum: "", //当前月 已签天数
    todaySign: false, //今天是否签到

    // 分页
    isPage: false, //有历史奖励就显示
    all: 1, //总页数
    cur: 1, //当前页码,
    lastmore: 'show', //来控制后面的三个点，当为show的时候就显示，开始的时候就显示
    premore: '', //这里我另premore来控制前面的三个点
    one: '', //用于判断第一个也就是1的显示，当为空就不显示，不为空就显示
    lastone: 'show', //用于显示最后的数字，当为空的时候不显示，不为空的时候就显示
    it: [{ //显示出来的页码
        ic: 1
      },
      {
        ic: 2
      },
      {
        ic: 3
      }
    ],

    // 时间轴
    datalist: [],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      urlImg: wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl")
    })
    this.getcurrentdate() //获取当前日期
    this.getHistorySign(); //获取历史奖励
    this.getUserSign(); // 获取日历签到记录
    this.getSignInfo(); // 获取签到信息，勋章，幸运星数量，补签卡数量
  },
  onShow: function() {
    app.getEventLog(108) //每日签到页面
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date()),
    })
  },

  // 判断点击签到，补签，您已签到图片的切换
  judgeClickImg() {
    // 今天已签，切换到其他月份，显示您已签到；今天未签，切换到其他月份，显示灰色点击签到
    if (this.data.todaySign) {
      this.setData({
        signImg: "alreadySign.png", //签到了显示‘您已签到’
      })
    }
    // 今天未签到
    else {
      if (this.data.clickYear == this.data.year && this.data.clickMonth == this.data.month) {
        this.setData({
          signImg: "clickSignin.png", //没签到, 切换到当前月份,显示黄色‘点击签到’
        })
      }
      if (this.data.pickerYear) {
        if (this.data.pickerYear != this.data.year || this.data.pickerMonth != this.data.month) {
          this.setData({
            signImg: "grayClickSignin.png", //没签到, 切换到其他月份, 显示灰色‘点击签到’
          })
        }
        if (this.data.pickerYear == this.data.year && this.data.pickerMonth == this.data.month) {
          var demo6_days_style=this.data.demo6_days_style
          demo6_days_style.push({
            month: 'current',
            day: this.data.day,  //默认选中今天
            color: 'white',
            background: '#888'  //深灰色
          });
          this.setData({
            signImg: "clickSignin.png", //没签到, 切换到当前月份,显示黄色‘点击签到’
            demo6_days_style: demo6_days_style
          })
        }
      }
      
    }
  },

  // 根据奖励补签卡数，判断有几次弹框
  getCardCount(){
    // 根据奖励补签卡的数量，判断弹出几个弹窗
    var getCardNum = this.data.getCardNum; //签到成功，获得补签卡数量
    if (getCardNum && getCardNum == 2) {
      this.setData({
        getTitleName: this.data.getTitleNameModal - 1, //奖励两张，先弹前一个，确认弹最后一个
      })
    }
    else if (getCardNum && getCardNum == 3) {
      this.setData({
        getTitleName: this.data.getTitleNameModal - 2, //奖励三张，先弹前两个，确认弹最后两个
      })
    } else{
      this.setData({
        getTitleName: this.data.getTitleNameModal, //奖励一张，正常弹一次
      })
    }
  },

  // 签到/补签成功获得奖励，弹窗中的勋章, 动画中的额外奖励星星
  getReward() {
    var that = this;
    // 有额外的星星奖励
    if (this.data.getExtraAdd && this.data.getExtraAdd != 0) {
      this.setData({
        hasExtraAdd: true
      })
    }else{
      this.setData({
        hasExtraAdd: false
      })
    }

    // 签到成功弹窗，勋章点亮奖励  7, 8, 9, 10孕妈点亮   15, 16, 17, 18孕爸点亮
    var getTitleName = this.data.getTitleName;
    if (getTitleName) {
      this.setData({
        successModal: true, //签到成功弹窗,补签卡，勋章
      })
      
      // 妈妈的勋章
      if (wx.getStorageSync("myrole").UserRole == "Mather") {
        that.setData({
          medalRole: "妈",
        })
        if (getTitleName && getTitleName == 1) {
          that.setData({
            medalModalImg: this.data.img[7],
          })
        }
        if (getTitleName && getTitleName == 2) {
          that.setData({
            medalModalImg: this.data.img[8],
          })
        }
        if (getTitleName && getTitleName == 3) {
          that.setData({
            medalModalImg: this.data.img[9],
          })
        }
        if (getTitleName && getTitleName == 4) {
          that.setData({
            medalModalImg: this.data.img[10],
          })
        }
      }
      // 爸爸的勋章
      if (wx.getStorageSync("myrole").UserRole == "Father") {
        that.setData({
          medalRole: "爸",
        })
        if (getTitleName && getTitleName == 1) {
          that.setData({
            medalModalImg: this.data.img[15],
          })
        }
        if (getTitleName && getTitleName == 2) {
          that.setData({
            medalModalImg: this.data.img[16],
          })
        }
        if (getTitleName && getTitleName == 3) {
          that.setData({
            medalModalImg: this.data.img[17],
          })
        }
        if (getTitleName && getTitleName == 4) {
          that.setData({
            medalModalImg: this.data.img[18],
          })
        }
      }
      // 判断弹框中连续签到天数，以及勋章名称
      if (getTitleName && getTitleName == 1) {
        that.setData({
          medalNameModal: "星秀孕",
          medalNum: 7
        })
      }
      if (getTitleName && getTitleName == 2) {
        that.setData({
          medalNameModal: "进阶孕",
          medalNum: 14
        })
      }
      if (getTitleName && getTitleName == 3) {
        that.setData({
          medalNameModal: "达人孕",
          medalNum: 21
        })
      }
      if (getTitleName && getTitleName == 4) {
        that.setData({
          medalNameModal: "巨星孕",
          medalNum: 28,
        })
      }
    }
  },

  // 获取签到信息，勋章，幸运星数量，补签卡数量
  getSignInfo: async function() {
    var that = this;
    var hr = await signApi.Sign.getSignInfo({
      UserId: wx.getStorageSync("wxauth").userid,
      FamilyId: wx.getStorageSync("familyId").FamilyId
    });
    if (hr.state == 1) {
      if (hr.data && hr.data.length > 0) {
        for (let i = 0; i < hr.data.length; i++) {
          if (hr.data[i].id == "point") {
            var luckyStarsNum = parseInt(hr.data[i].title)
          }
          if (hr.data[i].id == "supplecard") {
            var cardNum = hr.data[i].title
          }
          if (hr.data[i].id == "titlename") {
            var medalName = hr.data[i].title
          }
          if (hr.data[i].id == "totalsignday") {
            var totalsignday = hr.data[i].title
          }
          if (hr.data[i].id == "rankPencent") {
            var rankPencent = Number(hr.data[i].title * 100).toFixed()
          }
        }
        this.setData({
          luckyStarsNum: luckyStarsNum, //总的幸运星数量
          cardNum: cardNum, //总的补签卡数量
          medalName: medalName, //勋章 1,2,3,4
          totalsignday: totalsignday, //累计签到数量
          rankPencent: rankPencent, //领先全国 %
        })
        // 本月勋章：3, 4, 5, 6孕妈没有点亮  7, 8, 9, 10孕妈点亮   11, 12, 13, 14孕爸没有点亮   15, 16, 17, 18孕爸点亮
        // 妈妈的勋章
        if (wx.getStorageSync("myrole").UserRole == "Mather") {
          if (!this.data.medalName) {
            that.setData({
              medalImg1: this.data.img[3],
              medalImg2: this.data.img[4],
              medalImg3: this.data.img[5],
              medalImg4: this.data.img[6],
            })
          }
          if (medalName && medalName == "1") {
            that.setData({
              medalImg1: this.data.img[7],
              medalImg2: this.data.img[4],
              medalImg3: this.data.img[5],
              medalImg4: this.data.img[6],
            })
          }
          if (medalName && medalName == "2") {
            that.setData({
              medalImg1: this.data.img[7],
              medalImg2: this.data.img[8],
              medalImg3: this.data.img[5],
              medalImg4: this.data.img[6],
            })
          }
          if (medalName && medalName == "3") {
            that.setData({
              medalImg1: this.data.img[7],
              medalImg2: this.data.img[8],
              medalImg3: this.data.img[9],
              medalImg4: this.data.img[6],
            })
          }
          if (medalName && medalName == "4") {
            that.setData({
              medalImg1: this.data.img[7],
              medalImg2: this.data.img[8],
              medalImg3: this.data.img[9],
              medalImg4: this.data.img[10],
            })
          }
        }
        // 本月勋章：3, 4, 5, 6孕妈没有点亮  7, 8, 9, 10孕妈点亮   11, 12, 13, 14孕爸没有点亮   15, 16, 17, 18孕爸点亮
        // 爸爸的勋章
        if (wx.getStorageSync("myrole").UserRole == "Father") {
          if (!this.data.medalName) {
            that.setData({
              medalImg1: this.data.img[11],
              medalImg2: this.data.img[12],
              medalImg3: this.data.img[13],
              medalImg4: this.data.img[14],
            })
          }
          if (medalName && medalName == "1") {
            that.setData({
              medalImg1: this.data.img[15],
              medalImg2: this.data.img[12],
              medalImg3: this.data.img[13],
              medalImg4: this.data.img[14],
            })
          }
          if (medalName && medalName == "2") {
            that.setData({
              medalImg1: this.data.img[15],
              medalImg2: this.data.img[16],
              medalImg3: this.data.img[13],
              medalImg4: this.data.img[14],
            })
          }
          if (medalName && medalName == "3") {
            that.setData({
              medalImg1: this.data.img[15],
              medalImg2: this.data.img[16],
              medalImg3: this.data.img[17],
              medalImg4: this.data.img[14],
            })
          }
          if (medalName && medalName == "4") {
            that.setData({
              medalImg1: this.data.img[15],
              medalImg2: this.data.img[16],
              medalImg3: this.data.img[17],
              medalImg4: this.data.img[18],
            })
          }
        }
      }
    }
  },

  // 获取日历签到记录，一个月
  getUserSign: async function() {
    var that = this;
    var dayNum = new Date(this.data.yearChange, this.data.monthChange, 0).getDate(); //当前月的天数
    var filterDays = ""; //筛选出签到日期和未签到日期的总天数

    var hr = await signApi.Sign.getUserSign({
      SignDateBegin: `${this.data.yearChange}-${this.data.monthChange}-01 00:00:00`,
      SignDateEnd: `${this.data.yearChange}-${this.data.monthChange}-${dayNum} 23:59:59`,
      UserId: wx.getStorageSync("wxauth").userid,
      // UserRole: wx.getStorageSync("myrole").UserRole,
      FamilyId: wx.getStorageSync("familyId").FamilyId,
      PageSize: 999,
      PageIndex: 1,
      SortName: "SignDate",
      SortOrder: "desc"
    });
    if (hr.state == 1) {
      var signedDays = [],
        noSignedDays = [];
      // 当前月, 在当前日期之前筛选, i <= that.data.day; 其余月, i为这个月的总天数, i <= dayNum
      if (this.data.yearChange == new Date().getFullYear() && this.data.monthChange == new Date().getMonth() + 1) {
        filterDays = that.data.day
      } else {
        filterDays = dayNum
      }
      // 筛选出签到日期和未签到日期
      for (let i = 1; i <= filterDays; i++) {
        // 未来年月日历样式显示为空，灰色, 1.年大于当前年；2.年等于当前年，月大于
        if (this.data.yearChange > new Date().getFullYear() || (this.data.yearChange == new Date().getFullYear() && this.data.monthChange > new Date().getMonth() + 1)) {
          this.setData({
            signedDays: [],
            noSignedDays: []
          })
        } else {
          let signArray = hr.rows.filter((a) => parseInt(a.SignDate.substring(8, 10)) == i);
          if (signArray.length == 0) {
            noSignedDays.push(i); //漏签日期
          } else {
            signedDays.push(i); //签到日期
          }
        }
      }
      // 当前月，如果今天没有签到，背景颜色为灰，没有签到的状态
      if (this.data.yearChange == new Date().getFullYear() && this.data.monthChange == new Date().getMonth() + 1) {
        for (let k = 0; k < noSignedDays.length; k++) {
          if (noSignedDays[k] === that.data.day) {
            noSignedDays.splice(k, 1);　　　　
          }
        }
        // 当前月已签到，漏签天数
        this.setData({
          signNum: signedDays.length,
          noSignNum: noSignedDays.length,
        })
      }
      this.setData({
        signedDays: signedDays,
        noSignedDays: noSignedDays
      })
    } else {
      this.setData({
        signedDays: [],
        noSignedDays: [],
      })
    }
    this.calender(); //日历
  },

  // 历史签到，分页内容，一年
  getHistorySign: async function() {
    var that = this;
    var hr = await signApi.Sign.getUserSign({
      SignDateBegin: `${this.data.year}-01-01 00:00:00`,
      SignDateEnd: util.formatTime(new Date()), //当前时间
      UserId: wx.getStorageSync("wxauth").userid,
      // UserRole: wx.getStorageSync("myrole").UserRole,
      FamilyId: wx.getStorageSync("familyId").FamilyId,
      PageSize: 7,
      PageIndex: this.data.cur,
      SortName: "SignDate",
      SortOrder: "desc",
      Q: "list",
    });
    if (hr.state == 1) {
      if (hr.rows.length > 0) {
        for (let y = 0; y < hr.rows.length; y++) {
          if (hr.rows[y].SignDate.substring(0, 10) == this.getcurrentdate(1)) {
            hr.rows[y].SignDate = '今天'
            this.setData({
              todaySign: true, //今天已签到
            })
          } else if (hr.rows[y].SignDate.substring(0, 10) == this.getcurrentdate(0)) {
            hr.rows[y].SignDate = '昨天'
          } else {
            hr.rows[y].SignDate = hr.rows[y].SignDate.substring(5, 10).replace("-", "/");
          }
        }
        this.setData({
          datalist: hr.rows,
          isPage: true, //有历史奖励，显示分页器
          total: hr.total,
        })
        this.judgeClickImg(); // 判断点击签到，补签，您已签到图片的切换
        this.pagination(); //总页数
      } else {
        this.setData({
          isPage: false, //没有历史奖励，隐藏分页器
          datalist: [],
        })
      }
    } else {
      wx.showToast({
        title: hr.msg,
        icon: "none"
      })
    }
    this.calender();
  },
  // 获取当前日期，判断历史签到日期 今天，昨天
  getcurrentdate: function(daytype) {
    var myDate = new Date();
    var cyear = myDate.getFullYear(); //获取当前年
    var cmonth = myDate.getMonth() + 1; //获取当前月
    var cdate = myDate.getDate(); //获取当前日
    if (daytype == "1") {
      cdate = myDate.getDate();
    } else {
      cdate = myDate.getDate() - 1;
      // 一个月的第一天，减一为0，昨天为上一月
      if (cdate == 0) {
        cmonth = myDate.getMonth();
        cdate = new Date(cyear, cmonth, 0).getDate(); //这个月的总天数
      }
    }
    var now = cyear + '-' + this.conver(cmonth) + "-" + this.conver(cdate);
    return now;
  },
  // 1-9前加0
  conver(s) {
    return s < 10 ? '0' + s : s;
  },

  // 点击签到, 补签，五角星图片
  clickSign: async function() {
    var that = this;
    var styleList = this.data.demo6_days_style
    var today = new Date().getDate(); //获取当前日期

    // 点击签到，只能是今天，点击日期和picer切换日期都是当前年月，点击今天，没有签到就有选中样式，变灰
    if (this.data.signImg == "clickSignin.png") {
      // 1.一开始直接点击签到,没有时间选择器，没有点击日历；2.点击日期选中的年月日和今天相等；3.时间选择器的年月和今天相等 && this.data.clickDay == this.data.day 
      if (this.data.clickYear == this.data.year && this.data.clickMonth == this.data.month || this.data.pickerYear == this.data.year && this.data.pickerMonth == this.data.month || this.data.pickerYear == "" && this.data.clickYear == "") {
        // 点击签到接口，今天
        var hr = await signApi.Sign.postClickSign({
          UserId: wx.getStorageSync("wxauth").userid,
          UserRole: wx.getStorageSync("myrole").UserRole,
          FamilyId: wx.getStorageSync("familyId").FamilyId
        });
        if (hr.state == 1) {
          app.getEventLog(111) // 点击签到按钮
          styleList.push({
            month: 'current',
            day: this.data.day,
            color: 'white',
            background: '#cd81cd'  //紫色
          });
          this.setData({
            demo6_days_style: styleList,
            signImg: "alreadySign.png",
            todaySign:true, //今天已签到
          });
          if (hr.data) {
            this.setData({
              getExtraAdd: hr.data.GetAddStarCount, //签到成功，额外获得的星星0
              getTitleNameModal: Number(hr.data.GetTitleName), //签到成功，点亮勋章
              getCardNum: hr.data.GetSuppleCardCount, //签到成功，获得补签卡数量
            })
          }
          this.getCardCount();//根据奖励补签卡数，判断有几次弹框奖励
          this.getReward(); // 动画中的 额外奖励 和 点亮勋章
          this.getUserSign(); // 获取日历签到记录,一个月
          this.getHistorySign(); //获取历史奖励，判断今天是否签到，一年
          this.getSignInfo(); // 获取签到信息，勋章，幸运星数量，补签卡数量
          this.judgeClickImg(); // 判断点击签到，补签，您已签到图片的切换
          // 点击签到动画，有补签卡和勋章奖励的时候，不能直接触发动画，需在签到成功弹窗关闭时触发
          if (!this.data.getTitleName) {
            this.animation(); //没有勋章奖励，直接触发动画
          }
        } else {
          wx.showToast({
            title: hr.msg,
            icon: "none"
          })
        }
      }
    }
    // 点击'补签'，弹出是否补签的弹框
    else if (this.data.signImg == "buQian.png") {
      this.setData({
        buQianModal: true
      })
    }
  },
  // 点击日历某一天
  dayClick: function(e) {
    // 选中日期的年月日
    var clickYear = e.detail.year;
    var clickMonth = e.detail.month;
    var clickDay = e.detail.day;
    this.setData({
      clickYear: clickYear,
      clickMonth: clickMonth,
      clickDay: clickDay,
      yearChange: clickYear,
      monthChange: clickMonth,
      dayChange: clickDay
    })
    this.calender(); //调日历方法，解决出现多个选中状态问题
    var today = new Date().getDate(); //当前日期
    var clickStyle = this.data.demo6_days_style //选中样式
    // 选中漏签日期
    if (this.data.noSignedDays && this.data.noSignedDays.length > 0) {
      var noSigned_Day = this.data.noSignedDays.filter((a) => {
        return a == e.detail.day
      })[0]
    }
    // 选中签到日期
    if (this.data.signedDays && this.data.signedDays.length > 0) {
      var signed_Day = this.data.signedDays.filter((a) => {
        return a == e.detail.day
      })[0]
    }
    this.setData({
      noSigned_Day: noSigned_Day, //选中漏签日期
      signed_Day: signed_Day, //选中签到日期
    })

    // 点击到漏签日期，显示'补签' 
    if (noSigned_Day) {
      // 只能补签当前月
      if (this.data.clickYear == this.data.year && this.data.clickMonth == this.data.month || this.data.pickerYear == this.data.year && this.data.pickerMonth == this.data.month) {
        clickStyle.push({
          month: 'current',
          day: e.detail.day,
          color: 'white',
          background: '#df3838'  //深红色，选中漏签
        });
        this.setData({
          signImg: "buQian.png", //补签
          clickDay_No: e.detail.day //选中没有签到的日期
        });
      }
    } else {
      this.judgeClickImg(); // 判断点击签到，补签，您已签到图片的切换
    }

    // 点击到已签到日期，显示'您已签到' 
    if (signed_Day) {
      // 只能补签当前月
      if (this.data.clickYear == this.data.year && this.data.clickMonth == this.data.month || this.data.pickerYear == this.data.year && this.data.pickerMonth == this.data.month) {
        this.setData({
          signImg: "alreadySign.png", //您已签到
        });
      }
    }

    // 选中今天，没有签到就显示'点击签到'，签了就不能再选中  alreadySign
    // 选中日期的年月日和今天相等
    if (clickYear == this.data.year && clickMonth == this.data.month && clickDay == this.data.day && signed_Day != this.data.day) {
      clickStyle.push({
        month: 'current',
        day: e.detail.day,
        color: 'white',
        background: '#888' //深灰色
      });
      this.setData({
        signImg: "clickSignin.png", //点击签到
        clickDay: e.detail.day //选中当前的日期
      });
    }

    this.setData({
      demo6_days_style: clickStyle
    });
  },
  // 日历时间选择器picker
  dateChange: function(e) {
    // 时间选择器重新赋值年月
    this.setData({
      pickerMonth: e.detail.currentMonth,
      pickerYear: e.detail.currentYear,
      monthChange: e.detail.currentMonth,
      yearChange: e.detail.currentYear,
    })
    if (e.detail.currentMonth || e.detail.currentYear) {
      app.getEventLog(113); //时间选择器记录日志
    }
    this.judgeClickImg(); // 判断点击签到，补签，您已签到图片的切换
    this.calender();
    this.getUserSign(); // 获取日历签到记录，一个月
  },
  // 日历
  calender: function() {
    let demo6_days_style = new Array;
    // 当前月样式
    const days_count = new Date(this.data.year, this.data.month, 0).getDate(); //获取日期，获取某年某月某一天的日期
    for (let i = 1; i <= days_count; i++) {
      demo6_days_style.push({
        month: 'current',
        day: i,
        color: 'white',
        background: '#cdcbce'   //浅灰色
      });

      // 今天没有签到，默认选中今天
      if (this.data.todaySign == false && this.data.yearChange == this.data.year && this.data.monthChange == this.data.month) {
        demo6_days_style.push({
          month: 'current',
          day: this.data.day,  //默认选中今天
          color: 'white',
          background: '#888'  //深灰色
        });
      }

      // 已签到样式signedDays
      var signedDays = this.data.signedDays;
      if (signedDays && signedDays.length > 0) {
        for (let s = 0; s <= signedDays.length + 1; s++) {
          demo6_days_style.push({
            month: 'current',
            day: signedDays[s],
            color: 'white',
            background: '#cd81cd'  //紫色
          })
        }
      }

      // 漏签样式noSignedDays
      var noSignedDays = this.data.noSignedDays;
      if (noSignedDays && noSignedDays.length > 0) {
        for (let n = 0; n <= noSignedDays.length + 1; n++) {
          demo6_days_style.push({
            month: 'current',
            day: noSignedDays[n],
            color: 'white',
            background: '#f86977'  //浅红色
          })
        }
      }
    }

    this.setData({
      demo6_days_style
    });
  },

  // 签到成功动画
  animation() {
    var that = this;
    // 点击签到，第一个动画，加十分星星奖励
    this.setData({
      isHidd: false, //让+10星星显示,
    });
    // 延迟出现，第二个动画，星星奖励
    setTimeout(function() {
      that.setData({
        isHidd2: false,
      })
    }, 2000)
    // 重复触发动画, 将isHidd，isHidd2 的值复原
    setTimeout(function() {
      if (that.data.isHidd == false || that.data.isHidd2 == false) {
        that.setData({
          isHidd: true,
          isHidd2: true
        })
      }
    }, 3000)
  },

  // 分页, 点击页码，匹配内容
  clickPage: function(e) { //点击页数
    var that = this
    that.setData({
      cur: e.currentTarget.dataset.ic, //让页数等于当前的页数
    })
    this.getHistorySign();
  },
  // 点击第一页的,这个单独设置，就是点击显示的第一页
  clickone: function() {
    var that = this
    var onelist = [{ //显示出来的页码,点击第一页的时候就是显示1，2，3这三个数字段
        ic: 1
      },
      {
        ic: 2
      },
      {
        ic: 3
      }
    ]
    that.setData({
      it: onelist, //赋值新的数字页码
      cur: 1, //让页数等于当前的页数，也就是第一页
      lastone: 'show', //显示最后的数字
      one: '', //隐藏第一个数字
      lastmore: 'show', //显示右边的三个点
      premore: '' //隐藏左边的三个点
    })
    this.getHistorySign();
  },
  // 当点击最后一页的时候，那么就显示最后的三个数分别是all-2,all-1,all
  clicklastone: function() {
    var that = this
    var all = that.data.all //获取总页数
    var lastlist = [{ //当点击最后一个数字的时候就显示后三个页数
        ic: all - 2
      },
      {
        ic: all - 1
      },
      {
        ic: all
      }
    ]
    that.setData({
      it: lastlist, //赋值新的页数显示
      cur: all, //让页数等于当前的页数，也就是最后一页all
      lastone: '', //定义的最后一个数字不显示
      one: 'show', //定义的第一个数字显示
      premore: 'show', //显示左边的三个点
      lastmore: '' //右边的三个点消失
    })
    this.getHistorySign();
  },
  // 点击右边的省略号
  lastMore: function() {
    var that = this
    var all = that.data.all //首先获取所有的页数来判断
    if (all > 4) {
      var it = that.data.it //获取这个显示的数据
      var arr = [] //定义一个空的 数组来存放新的内容
      for (var i = 0; i < it.length; i++) {
        var shownum = it[2].ic
      }
      var isnum = shownum + 1
      if (isnum >= all - 1 || isnum >= all - 2) { //新添加的是这里，判断当isnum大于总数减1，也就是10-1=9
        arr.push({
          ic: all - 2
        }, {
          ic: all - 1
        }, {
          ic: all
        }) //然后就存入新数组
        that.setData({
          it: arr,
          cur: isnum, //当大于了总数就固定显示的数字背景颜色为all-2=8
          premore: 'show', //显示前面的三点
          lastmore: '', //隐藏后面的三点
          one: 'show', //显示定义的第一页
          lastone: '' //当isnum大于总数减1或者减2的时候就要隐藏定义的最后一个数字，不然的话会出现两个最后一个值，不信你试试
        })

      } else { //下面是不大于总数的减三以内的
        if (isnum == all - 3) {
          arr.push({
            ic: isnum
          }, {
            ic: isnum + 1
          }, {
            ic: isnum + 2
          })
          that.setData({
            it: arr,
            cur: isnum,
            lastmore: '',
            premore: 'show',
            one: 'show', //显示定义的第一页
            lastone: 'show' //显示定义的最后一页
          })
        } else {
          arr.push({
            ic: isnum
          }, {
            ic: isnum + 1
          }, {
            ic: isnum + 2
          })
          that.setData({
            it: arr,
            cur: isnum,
            premore: 'show',
            one: 'show', //显示定义的第一页
            lastone: 'show' //显示定义的最后一页
          })
        }

      }
    } else if (all == 4) {
      var newlist = [{
        ic: 2
      }, {
        ic: 3
      }, {
        ic: 4
      }]
      that.setData({
        it: newlist,
        cur: 4,
        premore: 'show',
        one: '',
        lastmore: '',
        lastone: ''
      })
    }
    this.getHistorySign();
  },
  // 点击左边的省略号
  preMore: function() {
    var that = this
    var all = that.data.all
    if (all > 4) {
      var islist = that.data.it
      var arr = []
      for (var i = 0; i < islist.length; i++) {
        var shownum = islist[0].ic
      }
      var isnum = shownum - 3
      if (isnum <= 2) { //这是当isnum小于等于1或者2的时候显示
        if (all == 5 || all == 6) {
          arr.push({
            ic: 1
          }, {
            ic: 2
          }, {
            ic: 3
          })
          that.setData({
            it: arr,
            cur: isnum + 2,
            premore: '',
            lastmore: 'show', //显示右边的三点
            lastone: 'show', //显示自定义的最后一页
            one: '' //定义的第一页隐藏
          })
        } else {
          arr.push({
            ic: 2
          }, {
            ic: 3
          }, {
            ic: 4
          })
          that.setData({
            it: arr,
            cur: isnum + 2,
            premore: '',
            lastmore: 'show', //显示右边的三点
            lastone: 'show', //显示自定义的最后一页
            one: 'show' //定义的第一页隐藏
          })
        }
      } else { //下面是正常向左点击三点的情况
        arr.push({
          ic: isnum
        }, {
          ic: isnum + 1
        }, {
          ic: isnum + 2
        })
        that.setData({
          it: arr,
          cur: isnum + 2,
          premore: 'show',
          lastmore: 'show', //显示左边的三点
          lastone: 'show', //显示最后的页数
        })
      }
    } else if (all == 4) {
      var prelist = [{
        ic: 1
      }, {
        ic: 2
      }, {
        ic: 3
      }]
      that.setData({
        it: prelist,
        cur: 1,
        premore: '',
        one: '',
        lastmore: 'show', //显示左边的三点
        lastone: '', //显示最后的页数
      })
    }
    this.getHistorySign();
  },
  nextPage: function() { //点击下一页
    var that = this //这里就是可以设置也可以不设置，我只是用来区别，如果都用this的话会有警告，但不影响
    var all = that.data.all //首先获取所有的页数来判断
    var num = that.data.cur //让num等于当前正在显示的页数，点击下一一页的时候数字进行加，每点击一次就加1
    if (all > 4) {
      num++
      that.setData({
        cur: num, //将页数赋值
      })
      // 判断省略号的显示
      if (num > 3) { //也就是当数字加到4以上
        var list = [] //定义一个空的数组用来存放大于3过后的三个新的数字
        list.push({
          ic: num - 1
        }, {
          ic: num
        }, {
          ic: num + 1
        }) //将这新的三个值push到新的数组里面
        that.setData({
          it: list, //然后将默认的循环的内容赋值为新的数组
          premore: 'show', //设置premore参数为show，则显示前面的三个点
          lastmore: 'show',
          lastone: 'show',
          one: 'show', //显示第一页
        })
        if (num == all || num == all - 2 || num == all - 1) { //如果加的数字大于了总页数
          var list2 = [] //再另起一个空的数组，例如总页数为10，当大于10的时候就显示8，9，10这三个值，分别就是all-2,all-1,all
          list2.push({
            ic: all - 2
          }, {
            ic: all - 1
          }, {
            ic: all
          })
          that.setData({
            it: list2, //将新的数组赋值到原来默认的内容里面
            cur: num, //当前页就是总页，也就是举例的10
            premore: 'show', //premore参数为空，显示前面的三个点
            lastmore: '', //more参数为空，不显示后面的三个点
            lastone: '',

          })
        }
        if (num >= all) { //如果加的数字大于了总页数
          var list3 = [] //再另起一个空的数组，例如总页数为10，当大于10的时候就显示8，9，10这三个值，分别就是all-2,all-1,all
          list3.push({
            ic: all - 2
          }, {
            ic: all - 1
          }, {
            ic: all
          })
          that.setData({
            it: list3, //将新的数组赋值到原来默认的内容里面
            cur: all, //当前页就是总页，也就是举例的10
            premore: 'show', //premore参数为空，显示前面的三个点
            lastmore: '', //more参数为空，不显示后面的三个点
            lastone: ''
          })
        }
      }
    } else if (all == 4) {
      num++
      that.setData({
        cur: num, //将页数赋值
      })

      if (num >= 4) {
        var list3 = [] //再另起一个空的数组，例如总页数为10，当大于10的时候就显示8，9，10这三个值，分别就是all-2,all-1,all
        list3.push({
          ic: all - 2
        }, {
          ic: all - 1
        }, {
          ic: all
        })
        that.setData({
          it: list3,
          cur: all,
          premore: 'show',
          one: '',
          lastmore: ''
        })
      }
    } else { //这是总数小于3的
      num++
      that.setData({
        cur: num, //将页数赋值
      })

      if (num >= all) {
        that.setData({
          cur: all, //将页数赋值
        })
      }
    }
    // 当页码大于总页数，点击下一页不调接口
    if (num <= all) {
      this.getHistorySign();
    }
  },
  prePage: function() { //点击上一页，原理就与下一页的相反
    var that = this
    var all = that.data.all //获取总页数
    var num = that.data.cur //num获取当前显示的页数。用来点击的时候就开始减
    if (all > 4) {
      num--
      that.setData({
        cur: num,
      })

      if (num <= all - 3) { //判断如果页数小于等于总页数减3，比如总页数为10，就小于等于7的时候那么就显示7，8，9
        var list = []
        list.push({
          ic: num
        }, {
          ic: num + 1
        }, {
          ic: num + 2
        })
        that.setData({
          it: list,
          premore: 'show', //隐藏前面的三个点
          lastmore: 'show', //显示后面的三个点
          lastone: 'show'
        })
        if (num <= 3) { //这里要判断小于三的时候显示，小于三的时候就显示1，2，3这三个数字，并且cur为num，不能为3，不然会一直在3这里，下不去了
          var list2 = []
          list2.push({
            ic: 1
          }, {
            ic: 2
          }, {
            ic: 3
          })
          that.setData({
            it: list2,
            cur: num,
            premore: '', //隐藏前面的三个点
            lastmore: 'show', //显示后面的三个点
            lastone: 'show',
            one: ''
          })
        }
        if (num <= 1) { //如果减的数小于1，那么就显示1，2，3，当前页为1，内容的指示也为1，显示后面的三个点和最后一个数字，这里就要设置限制，当见到小于1的时候就不能往下减，一直在1
          if (num == 0) {
            var list2 = []
            list2.push({
              ic: 1
            }, {
              ic: 2
            }, {
              ic: 3
            })
            that.setData({
              it: list2,
              cur: 1,
              premore: '', //隐藏前面的三个点
              lastmore: 'show', //显示后面的三个点
              one: ''
            })
          } else {
            var list2 = []
            list2.push({
              ic: 1
            }, {
              ic: 2
            }, {
              ic: 3
            })
            that.setData({
              it: list2,
              cur: 1,
              premore: '', //隐藏前面的三个点
              lastmore: 'show', //显示后面的三个点
              one: ''
            })
          }

        }
      }
      // 单数设置总页数为4的时候点击上一页
      if (all <= 4) {
        that.setData({
          lastmore: '',
          one: '',
          premore: 'show'
        })
      }
    } else if (all == 4) {
      num--
      that.setData({
        cur: num, //将页数赋值
      })

      if (num <= 1) {
        if (num == 0) {
          var list3 = [] //再另起一个空的数组，例如总页数为10，当大于10的时候就显示8，9，10这三个值，分别就是all-2,all-1,all
          list3.push({
            ic: 1
          }, {
            ic: 2
          }, {
            ic: 3
          })
          that.setData({
            it: list3,
            cur: 1,
            premore: '',
            one: '',
            lastmore: 'show'
          })
        } else {
          var list3 = [] //再另起一个空的数组，例如总页数为10，当大于10的时候就显示8，9，10这三个值，分别就是all-2,all-1,all
          list3.push({
            ic: 1
          }, {
            ic: 2
          }, {
            ic: 3
          })
          that.setData({
            it: list3,
            cur: 1,
            premore: '',
            one: '',
            lastmore: 'show'
          })
        }

      }
    } else { //总页数小于3的
      num--
      that.setData({
        cur: num, //减的值赋值给当前页数
      })
      if (num <= 1) {
        if (num == 0) {
          that.setData({
            cur: 1, //减的值赋值给当前页数
            lastmore: '',
            lastone: ''
          })
        } else {
          that.setData({
            cur: 1, //减的值赋值给当前页数
            lastmore: ''
          })
        }
      }
    }
    // 当页码到1，点击上一页不调接口
    if (num != 0) {
      this.getHistorySign();
    }
  },
  //加载总页数
  pagination: function() {
    // 页面一加载将请求到的数据进行处理，获取当前页赋值到page或者请求到的总页赋值到all里面
    var that = this
    var cur = that.data.cur
    // 计算总页数，没数据时，页码为1
    // var all = 1;
    if (this.data.total) {
      if (this.data.total % 7 == 0) {
        all = this.data.total / 7
      } else {
        all = parseInt(this.data.total / 7) + 1
      }
    } else {
      all == 0
    }
    that.setData({
      all: all
    })
    var all = that.data.all
    if (all < 4) {
      if (all == 3) {
        var list3 = []
        list3.push({
          ic: 1
        }, {
          ic: 2
        }, {
          ic: 3
        })
        that.setData({
          it: list3,
          cur: cur,
          premore: '',
          one: '',
          lastmore: '',
          lastone: ''
        })
      } else if (all == 2) {
        var list3 = []
        list3.push({
          ic: 1
        }, {
          ic: 2
        })
        that.setData({
          it: list3,
          cur: cur,
          premore: '',
          one: '',
          lastmore: '',
          lastone: ''
        })
      } else if (all == 1) {
        var list3 = []
        list3.push({
          ic: 1
        })
        that.setData({
          it: list3,
          cur: cur,
          premore: '',
          one: '',
          lastmore: '',
          lastone: ''
        })
      }
    } else if (all == 4) {
      that.setData({
        lastone: ''
      })
    }
  },

  // 签到规则
  toSignInRules() {
    wx.navigateTo({
      url: '../signInRules/signInRules',
    })
  },
  //返回
  toback: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  //tab点击切换
  clickTab: function(e) {
    if (this.data.currentTab == 0) {
      app.getEventLog(109) //今日签到按钮
    }
    if (this.data.currentTab == 1) {
      app.getEventLog(110) //历史奖励按钮
    }
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  // 弹出框蒙层截断touchmove事件
  preventTouchMove: function() {},
  //隐藏模态对话框
  hideModal: function() {
    this.setData({
      buSuccessModal: false,
      buQianModal: false,
      noCardModal: false,
      successModal: false,
    });
  },
  //对话框取消按钮点击事件
  onCancel: function() {
    this.hideModal();
  },
  // 补签成功弹框 确认按钮，关闭后有动画;  
  onCancelBu: function() {
    // 有签到成功奖励勋章弹框时
    if (this.data.getTitleNameModal) {
      this.getReward(); // 动画中的 额外奖励 和 点亮勋章
    } else {
      this.hideModal();
      this.getReward();  //无勋章时，有额外奖励
      this.animation(); //补签成功出现奖励星星动画
    }
  },
  // 签到成功奖励勋章弹框 确认按钮，关闭后有动画
  onCancelMedal: function() {
    // 根据奖励补签卡的数量，判断弹出几个弹窗
    var getCardNum = this.data.getCardNum; //签到成功，获得补签卡数量
    // 奖励两张时
    if (getCardNum && getCardNum == 2) {
      // 最后一个勋章弹框显示
      if (this.data.twoCard == undefined) {
        this.setData({
          getTitleName: this.data.getTitleNameModal, //奖励两张，先弹前一个，确认弹最后一个,
          twoCard: "close",
        })
        this.getReward();//弹框中奖励勋章信息
      }
      // 关闭弹窗
      else if (this.data.twoCard == "close") {
        this.hideModal();
        this.animation(); //补签成功出现奖励星星动画,放在最后一个弹框中
      }
    }

    // 奖励三张时
    else if (getCardNum && getCardNum == 3) {
      // 奖励三张时，弹倒数第二个, 第三等级的勋章
      if (this.data.twoCard == undefined) {
        this.setData({
          getTitleName: this.data.getTitleNameModal - 1, //奖励三张，先弹前两个，确认弹最后两个
          thirdCard: "4", //奖励三张，触发最后一次弹窗的参数
        })
        this.getReward();//弹框中奖励勋章信息
      }
      // 奖励三张时，弹最后一个, 第四等级的勋章
      else if (this.data.thirdCard == "4") {
        this.setData({
          getTitleName: this.data.getTitleNameModal, //奖励三张，先弹前两个，确认弹最后两个
          thirdCard: "close", //触发弹窗关闭
        })
        this.getReward();//弹框中奖励勋章信息
      }
      // 第四个显示后，关闭弹窗
      else if (this.data.thirdCard == "close") {
        this.hideModal();
        this.animation(); //补签成功出现奖励星星动画,放在最后一个弹框中
      }
    }
    
    // 正常情况下，关闭勋章弹框，有动画
    else{
      this.hideModal();
      this.animation(); //补签成功出现奖励星星动画
    }
  },
  //对话框 确认按钮点击事件, 立即补签
  onConfirm: async function() {
    var cardNum = this.data.cardNum;
    // 有补签卡时，立即补签，补签成功弹窗，确认关闭弹框
    if (cardNum != 0) {
      // 补签接口
      var hr = await signApi.Sign.postSuppleSign({
        SignDate: `${this.data.year}-${this.data.month}-${this.data.clickDay}`,
        UserId: wx.getStorageSync("wxauth").userid,
        UserRole: wx.getStorageSync("myrole").UserRole,
        FamilyId: wx.getStorageSync("familyId").FamilyId
      });
      if (hr.state == 1) {
        app.getEventLog(112) //补签成功按钮
        var styleList = this.data.demo6_days_style
        var clickDay_No = this.data.clickDay_No; //选中日期
        styleList.push({
          month: 'current',
          day: clickDay_No,
          color: 'white',
          background: '#cd81cd'
        });
        this.setData({
          demo6_days_style: styleList,
          signImg: "alreadySign.png",
          buQianModal: false,
          buSuccessModal: true
        });
        if (hr.data) {
          this.setData({
            getExtraAdd: hr.data.GetAddStarCount, //签到成功，额外获得的星星0
            getTitleNameModal: Number(hr.data.GetTitleName), //签到成功，点亮勋章
            getCardNum: hr.data.GetSuppleCardCount, //签到成功，获得补签卡数量
          })
        }
        this.getCardCount();//根据奖励补签卡数，判断有几次弹框奖励
        // if (!this.data.getTitleNameModal) {
        //   this.getReward(); // 动画中的 额外奖励 和 点亮勋章
        // }
        this.getUserSign(); // 获取日历签到记录
        this.getHistorySign(); //获取历史奖励，判断今天是否签到
        this.getSignInfo(); // 获取签到信息，勋章，幸运星数量，补签卡数量
        this.judgeClickImg(); // 判断点击签到，补签，您已签到图片的切换
      } else {
        wx.showToast({
          title: hr.msg,
          icon: "none"
        })
        this.setData({
          buQianModal: false,
        });
      }
    }
    //无补签卡时，立即补签，补签卡不足弹窗, 点击确定，关闭弹框
    else {
      app.getEventLog(136) //补签卡不足弹窗
      var styleList = this.data.demo6_days_style
      var clickDay_No = this.data.clickDay_No; //选中日期
      styleList.push({
        month: 'current',
        day: clickDay_No,
        color: 'white',
        background: '#df3838'
      });
      this.setData({
        demo6_days_style: styleList,
        signImg: "buQian.png",
        buQianModal: false,
        noCardModal: true
      });
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
      // app.getPageTimer(108, "", vtime, this.data.time2);
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
      // app.getPageTimer(108, "", vtime, this.data.time2);
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