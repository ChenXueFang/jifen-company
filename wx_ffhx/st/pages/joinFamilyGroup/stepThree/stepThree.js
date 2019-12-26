import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import register from '../../../servicesAPI/userRegister'
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowStart:true,
    applytime:'',
    familyId:'',
    familyName:'',
    zzheadimg:'',
    zzwechatName:'',
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //完成注册，前往首页
  goHome: function () {
    app.getEventLog("alreadyApply_begin-button")
    wx.setStorageSync("UserChar", "groupMember")
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  //根据家庭组id获取家庭信息
  getFamilyInfo:async function(){
    console.log(this.data.familyId)
    var hrs = await register.UserRegister.GetMyFamily({
      userId: wx.getStorageSync("wxauth").userid,
      isCheckedState:false
    });
    if (hrs.state == 1) {
      if (hrs.data.familyName != "" && hrs.data.familyName !=null){
       this.setData({
         familyName: hrs.data.familyName.FamilyName
       })
      if(hrs.data.familyMemberList.length>0){
        if (hrs.data.familyName != "" && hrs.data.familyName != null){
          for (var i = 0; i < hrs.data.familyMemberList.length; i++) {
            if (hrs.data.familyMemberList[0].UserId == hrs.data.familyName.UserId){
              this.setData({
                zzheadimg: hrs.data.familyMemberList[0].HeadImage,
                zzwechatName: hrs.data.familyMemberList[0].NickName
              })
            }
          }
        }
      }
       
      if (hrs.data.userInfo.ApplyTime != null && hrs.data.userInfo.ApplyTime !=""){
        this.setData({
          applytime: hrs.data.userInfo.ApplyTime
        })
      }
        console.log("申请时间：" + this.data.applytime)
     }
    }else{
      wx.showToast({
        title: hrs.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viewid = options.viewid
    // console.log("加入家庭："+viewid)
    if (viewid == "zy") {
      this.setData({
        isshowStart: false
      })
    }
    this.getFamilyInfo();
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
    app.getEventLog("joinFamilyGroup_stepThree-page")
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
      app.getPageTimer("joinFamilyGroup_stepThree-page", "", vtime, this.data.time2);
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
      app.getPageTimer("joinFamilyGroup_stepThree-page", "", vtime, this.data.time2);
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