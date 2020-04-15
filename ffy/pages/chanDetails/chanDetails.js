// pages/chanDetails/chanDetails.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/chanjian'
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js")
var WxParse = require('../../wxParse/wxParse.js');
import userchoiceApi from '../../services/userLinkRecord'
import authApi from '../../services/dataapi'
const app = getApp();

Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    temp: {},
    Time: {},
    RecordId: 0,
    TempId: 0,
    uploadimageList: '',
    imageList: [],
    imageArr:[],
    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isSubmit: false,
    imageSubmit: '',
    showModal: false,
    urlImg: setting.setting.urlImg,
    selitems: [
      { name: '是', value: '1', checked: 'true' },
      { name: '否', value: '0' }],
    cjQuestionId: 1,
    isConsultingExpert: '',
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function(options) {
    let hr =await authApi.wxApi.wxLoginCheck()
    if ((hr.data != undefined && hr.data.isLogin == false) || hr.isLogin == false) {
     console.log("未登录")
    } else {
      // debugger;
      this.setData({
        TempId: options.id,
        RecordId: options.RecordId
      })
      app.globalData.loborchartdetail = null;
      app.globalData.timeoverdetail = null;
      this.getTemp();
      this.getLaborList();
      this.getConsultingExpert();
    }

   
  },

  // 上传报告
  chooseImage() {
    app.getEventLog(99)
    if (wx.getStorageSync("myrole").UserRole == "Mather") {
      const that = this
      that.setData({
        imageArr:[]
      })
      wx.chooseImage({
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        count: 1,
        success(res) {
          that.setData({
            imageList: res.tempFilePaths,
            isSubmit: true,
            showModal: true
          })
          // 上传服务器
          wx.uploadFile({
            url: `${setting.setting.urlImg}/api/Upload/Post`,
            filePath: res.tempFilePaths[0],
            name: 'card',
            success: function(response) {
              let dataJson = JSON.parse(response.data)
              if (dataJson.state == 1) {
                that.data.uploadimageList = dataJson.rows[0]
              }else{
                if (dataJson.msg =="error"){
                  wx.showToast({
                    title: '上传图片最大只支持1M',
                    icon: 'none',
                  })
                } else if (dataJson.msg == "Illegal Pictures"){
                  wx.showToast({
                    title: '非法图片',
                    icon: 'none',
                  })
                }
              }
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: "只有妈妈能上传报告", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
      return
    }
  },
  // 上传提交InspectionReport
  submit: async function(e) {
    // debugger
    var that = this;
    if (that.data.uploadimageList.length>0){
      var recordid = this.data.RecordId
      var hr = await dataApi.LaborChart.DateChange(recordid, {
        InspectionReport: this.data.uploadimageList
      });
      if (hr && hr.state==1){
        var arr =[];
        arr.push(this.data.uploadimageList)
        this.data.Time.InspectionReport = this.data.urlImg +this.data.uploadimageList
        
        that.setData({
          imageArr: arr,
          Time: this.data.Time 
        })
        app.globalData.loborchartdetail=JSON.parse(JSON.stringify(this.data.Time))
        app.globalData.timeoverdetail = JSON.parse(JSON.stringify(this.data.Time))
      }else{
        wx.showToast({
          title: '上传失败',
          icon: 'none',
        })
      }
      that.setData({
        showModal: false
      })
    } else {
      wx.showToast({
        title: "请等待图片上传完成", 
        icon: 'none',
        duration: 2000
      })
      return
    }
  },
  previewImage(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },

  //获取产检时间
  getLaborList: async function() {
    var that = this;
    var hr = await dataApi.LaborChart.GetlaborTime({
      id: this.data.RecordId
    });
   
    if (hr.rows != null && hr.rows.length > 0) {
      that.setData({
        Time: hr.rows[0],
      })
      if (hr.rows[0].InspectionReport == '' || hr.rows[0].InspectionReport == null) {
        this.setData({
          isSubmit: false
        })
      } else {
        this.setData({
          isSubmit: true
        })
        this.setData({
          imageList: [hr.rows[0].InspectionReport]
        })
      }
    }
  },

  // 获取产检模板开始
  getTemp: async function() {
    var that = this;
    var hr = await dataApi.LaborChart.GetlaborEssay({
      id: this.data.TempId
    });
    if (hr.rows != null && hr.rows.length == 1) {
      that.setData({
        temp: hr.rows[0],
        html: hr.rows[0].RelationRemark
      })
      var that = this;
      WxParse.wxParse('article', 'html', hr.rows[0].RelationRemark, that, 0);
    }
  },
  // 获取产检模板结束

  // 弹窗
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  //是否需要咨询专家问答 选择
  cjQuestionChange: function (e) {
    this.setData({
      cjQuestionId: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value, "cjQuestionId:" + this.data.cjQuestionId)
  },
  //提交问答
  submitCjQuestion: async function () {
    var hr = await userchoiceApi.UserChoiceItem.insertUserChoiceItem({
      UserId: wx.getStorageSync("wxauth").userid,
      FamilyId: wx.getStorageSync("familyId").FamilyId,
      UserRole: wx.getStorageSync("myrole").UserRole,
      ItemType: "InspectReport",
      ItemAnswer: this.data.cjQuestionId,
      AnswerRemark: "",
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      this.setData({
        isConsultingExpert: this.data.cjQuestionId
      })
      app.getEventLog(123)
      wx.showToast({
        title: "感谢您的选择！",
        icon: 'none',
        duration: 2000
      })
    } else {
      isConsultingExpert: ''
    }
  },

  getConsultingExpert: async function () {
    var hr = await userchoiceApi.UserChoiceItem.getUserChoiceItem({
      UserId: wx.getStorageSync("wxauth").userid,
      ItemType: "InspectReport",
      PageSize: 1,
      PageIndex: 1
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      this.setData({
        isConsultingExpert: hr.rows[0].ItemAnswer
      })
    } else {
      this.setData({
        isConsultingExpert: ''
      })
    }
  },
  //产检解读
  toCJReadings: function () {
    app.getEventLog(107)
    wx.navigateTo({
      url: `../cjReadings/cjReadings`
    })
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
      // showModal: false
    });
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
  onConfirm: function() {
    this.hideModal();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.getEventLog(79)
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
      app.getPageTimer(79, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(79, this.data.TempId, vtime, this.data.time2);
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
  // onShareAppMessage: function () {

  // }
})