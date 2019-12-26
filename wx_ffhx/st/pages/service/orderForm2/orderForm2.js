import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import userService from '../../../servicesAPI/userService'
const setting = require("../../../utils/setting.js");
const app = getApp();
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:'',// 姓名
    cw:['男士','女士'],
    cwid:0,
    uphone:'',//手机号
    yyxm: ['预约筛查', '预约体验', '预约售后', '线上购机上门服务','专属会员服务申请'],
    yyxmid:0,
    date: '', //预约日期
    isshowzd:false,//是否显示诊断选项
    isshowsn:false,//是否显示sn号
    zd: ['未诊断', '已诊断'],
    zdid:0,
    yysd: ['8:00~9:00', '9:00~10:00', '10:00~11:00', '11:00~12:00', '12:00~13:00', '13:00~14:00', '14:00~15:00', '15:00~16:00', '16:00~17:00', '17:00~18:00'],
    yysdid:0,
    snnum:'',


    iteid:0,
    is_show:true,
    showWeekQue:false,
    currdate:'',
    xy:'',
    xyg:'',
    xyd:'',
    xl:'',
    
    provicelist:[],
    proviceindex:-1,
    citylist:[],
    cityindex:-1,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  //姓名
  inputuname: function (e) {
    this.setData({
      uname: e.detail.value
    })
    console.log(this.data.uname)
  },
  //选项弹窗 -称谓
  tocwSelect: function () {
    this.setData({
      iscwSelect: true
    })
  },
  //隐藏选项弹窗 -称谓
  hidecwSelect: function () {
    this.setData({
      iscwSelect: false
    })
  },
  //选择称谓
  selcw: function (e) {
    var itemid = e.currentTarget.dataset.itemid;

    this.setData({
      iscwSelect: false,
      cwid: itemid
    })
  },
  //手机号
  inputuphone: function (e) {
    this.setData({
      uphone: e.detail.value
    })
    // let phoneNumber = e.detail.value
    // if (phoneNumber.length === 11) {
    //   if (this.checkPhoneNum(phoneNumber)){
    //     this.setData({
    //       uphone: phoneNumber
    //     })
    //   }else{
    //     wx.showToast({
    //       title: '请输入正确的手机号',
    //       icon: 'none'
    //     })
    //   }
    // }else{
    //   wx.showToast({
    //     title: '请输入11位手机号',
    //     icon: 'none'
    //   })
    // }
   
    console.log(this.data.uphone)
  
  },
  checkPhoneNum: function (phoneNumber) {
    let str = /^1[34578]\d{9}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
      this.setData({
        uphone: ''
      })
      return false
    }
  },
  //sn号
  inputsn:function(e){
    this.setData({
      snnum: e.detail.value
    })
    console.log(this.data.snnum)
  },
  //预约项目
  toyyxmSelect: function () {
    this.setData({
      isyyxmSelect: true
    })
  },
  //隐藏选项弹窗 
  hideyyxmSelect: function () {
    this.setData({
      isyyxmSelect: false
    })
  },
  //选择预约项目
  selyymx: function (e) {
    var itemid = e.currentTarget.dataset.itemid;

    this.setData({
      isyyxmSelect: false,
      yyxmid: itemid
    })

    if (itemid==0){
      this.setData({
        isshowzd: false,
        isshowsn: false
      })
    } else if (itemid == 1){
      this.setData({
        isshowzd: true,
        isshowsn: false
      })
    }else{
      this.setData({
        isshowzd: false,
        isshowsn:true
      })
    }

  },
  //选择预约日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //是否诊断
  tozdSelect: function () {
    this.setData({
      iszdSelect: true
    })
  },
  //隐藏选项弹窗  是否诊断
  hidezdSelect: function () {
    this.setData({
      iszdSelect: false
    })
  },
  //选择是否诊断
  selzd: function (e) {
    var itemid = e.currentTarget.dataset.itemid;

    this.setData({
      iszdSelect: false,
      zdid: itemid
    })
  },

  //预约时段
  toyysdSelect: function () {
    this.setData({
      isyysdSelect: true
    })
  },
  //隐藏选项弹窗  是否诊断
  hideyysdSelect: function () {
    this.setData({
      isyysdSelect: false
    })
  },
  //选择预约时段
  selyysd: function (e) {
    var itemid = e.currentTarget.dataset.itemid;
    this.setData({
      isyysdSelect: false,
      yysdid: itemid
    })
  },

 
  //未完成时提交点提交
  unCommit:function(){
    this.setData({
      is_show:false
    })
  },
  //隐藏提示
  hidetip:function(){
    this.setData({
      is_show: true
    })
  },
 
  //提交预约
  commit: async function(){
    if (this.data.uphone.length<11){
      wx.showToast({
        title: '请输入11位手机号',
        icon: 'none'
      })
      return;
    }else{
      if (!this.checkPhoneNum(this.data.uphone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return;
      }
    }

    if (this.data.yyxmid == "2" || this.data.yyxmid == "3" || this.data.yyxmid == "4"){
      if (this.data.snnum.length<=0){
        wx.showToast({
          title: '请输入SN号',
          icon: 'none'
        })
        return;
      }
    }
    var hrs = await userService.UserService.CommitYYService({
      UserId: wx.getStorageSync("wxauth").uid, //数字
      UserIdGuid: wx.getStorageSync("wxauth").userid, //字符串
      OrderName: this.data.uname,
      OrderSex: Number(this.data.cwid)+1 ,
      Province: this.data.provicename,
      City: this.data.cityname,
      Mobile: this.data.uphone,
      OrderDate: this.data.date,
      OrderTime: this.data.yysd[this.data.yysdid],//this.data.yysdid,
      OrderItem: this.data.yyxm[this.data.yyxmid],//this.data.yyxmid,
      SN: this.data.snnum,
      IsDiagnose: this.data.yyxmid==1?this.data.zdid:null
    });
    console.log(hrs)
    if (hrs.state == 1) {
      app.getEventLog("orderSubmit-button")
      wx.showToast({
        title: hrs.msg,
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../orderSuccess/orderSuccess',
        })
      }, 1000)

    } else {
      wx.showToast({
        title: hrs.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },
 
  //省
  loadProvince:function(){
    return new Promise(function (resolve, reject) {
      var _this = this;
      wx.request({
        url: 'https://st.crmclick.com/stMiniAppWebapi/100000_province.json',//json数据地址
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // console.log(res.data.rows)
          // _this.setData({
          //   provicelist: res.data.rows
          // })
          let result = res.data.rows;
          resolve(result);
        },
        fail: () => {
          reject("系统异常，请重试！")
        }
      })
    })
  },
  //选择省，加载市区
  selProvince: function (e) {
    this.setData({
      proviceindex: e.detail.value,
      provicename: this.data.provicelist[e.detail.value].name
    })
    var _this = this
    wx.request({
      url: 'https://st.crmclick.com/stMiniAppWebapi/' + this.data.provicelist[e.detail.value].adcode+'_city.json',//json数据地址
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.rows)
        _this.setData({
          citylist: res.data.rows
        })
      }
    })
  },
  //选择城市
  selcity:function(e){
    this.setData({
      cityindex: e.detail.value,
      cityname: this.data.citylist[e.detail.value].name
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var yyid = options.yyxmid
    console.log(options.yyxmid)
    if (yyid!=''&& yyid!=undefined){
      this.setData({
        yyxmid: yyid,
        isshowzd: false,
        isshowsn: true
      })
    }
    this.loadProvince().then((res) => {
      //请求成功的操作
      this.setData({
        provicelist: res
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getEventLog("orderForm2-page")
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer("orderForm2-page", "", vtime, this.data.time2);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer("orderForm2-page", "", vtime, this.data.time2);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})