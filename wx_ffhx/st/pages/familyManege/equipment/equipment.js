// pages/familyManege/equipment/equipment.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/familyapi'
var QR = require("../../../utils/qrcode.js");  //二维码生成器
const setting = require("../../../utils/setting.js");
const app = getApp();
const util = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipmentInfo:[],
    applyNum:0,
    isNull:false,
    index: 1,
    currentInfo:{},
    isLeader:true,
    familyidguid:0,
    userid:"00000000-0000-0000-0000-000000000000",
    fId:"",
    uId: "",
    imagePath: '',
    isMaImg: false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    this.setData({
      familyidguid: options.familyidguid
    })
    this.getMyFamily();

  },

  //二维码，点击图片进行预览，长按保存分享图片
  previewImg: async function (e) {
    // 获取二维码图片接口
    var that = this;
    var hr = await dataApi.familyApi.getUnlimited({
      scene: this.data.uId + '_' + this.data.fId,   //组长userid,familyId
      page: "pages/familyManege/saomaJoin/saomaJoin"               //pages/familyManege/saomaJoin/saomaJoin
    });
    if (hr.state == 1 && hr.data){
      this.setData({
        imagePath: hr.data,
        isMaImg: true
      })
    }
    // 预览二维码图片
    var img = this.data.imagePath;
    wx.previewImage({
      current: "data:image/png;base64,"+img, // 当前显示图片的http链接
      urls: ["data:image/png;base64," +img] // 需要预览的图片http链接列表
    })
  },

  // 好友申请人数提示
  getApplyNum: async function () {
    var that = this;
    var hr = await dataApi.familyApi.getApplyNum({
      FamilyIdGuid: this.data.familyidguid,
      Status:0,
      PageSize: 999,
      PageIndex: 1,
      SortName: 'MemberId',
      SortOrder: 'desc'
    });
    if (hr.state == 1) {
      if (hr.rows.length > 0) {
        that.setData({
          applyNum: hr.rows.length,
          isNull:true
        })
      }else{
        that.setData({
          isNull:false
        })
      }
    }
  },
 
  // 获取家庭成员列表
  getMyFamily: async function () {
    var that = this;
    var hr = await dataApi.familyApi.getMyFamily({
      userId: wx.getStorageSync("wxauth").userid,
      isCheckedState: true
    });
    if (hr.state == 1 && hr.data) {
      // 获取当前人信息
      that.setData({
        currentInfo: hr.data.userInfo,
        userid : hr.data.familyName.UserId,
        fId: hr.data.familyName.FId.toString(),
        uId: hr.data.familyName.UId.toString(),
      })
      // 判断是否为组长
      if (wx.getStorageSync("wxauth").userid == hr.data.familyName.UserId){
        that.setData({
          isLeader: true
        })
        // 是组长时，获取好友申请数
        // this.getApplyNum();
      }else{
        that.setData({
          isLeader: false
        })
      }
      this.getEquipment();
    }
  },

  // 获取设备信息
  getEquipment: async function (){
    var that = this;
    var hr = await dataApi.familyApi.getEquipment({
      UserIdGuid: this.data.userid,
      PageSize: 10,
      PageIndex: 1,
      SortName: 'createdtime',
      SortOrder: 'desc',
      ApprovState:2
    });
    if(hr.state==1){
      if (hr.rows.length > 0){
        that.setData({
          equipmentInfo: that.data.equipmentInfo.concat(hr.rows),
          index: that.data.index + 1,
        })
      }
    }
  },

  // 跳转到家庭成员列表
  toTeamList(){
    wx.navigateTo({
      url: '../teamList/teamList',
    })
  },
  // 添加设备，跳转到注册产品页面
  stepOne() {
    app.getEventLog("addNewDevice-button")
    wx.navigateTo({
      url: '../addNewEquipment/addNewEquipment',
    })
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
    if (this.data.familyidguid != null && this.data.familyidguid != undefined && this.data.familyidguid != '' && this.data.familyidguid != 0){
      this.getApplyNum();
    }

    app.getEventLog("equipment-page")
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
      app.getPageTimer("equipment-page","", vtime, this.data.time2);
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
      app.getPageTimer("equipment-page","",vtime, this.data.time2);
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