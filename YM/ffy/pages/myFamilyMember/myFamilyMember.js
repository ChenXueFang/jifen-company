// pages/myFamilyMember/myFamilyMember.js
const app = getApp()
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
import dataApi from '../../services/myFamily'
import authApi from '../../services/dataapi'

const util = require("../../utils/util.js") 
const setting = require("../../utils/setting.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    yWeek:'',
    myfamMem:[],
    motherRole:{},
    checked: false,
    roleArray: ['Mather', 'Father', 'Family'],
    roleArray1: [{ code: 'Mather', name: '妈妈' }, { code: 'Father', name: '爸爸' }, { code: 'Family', name: '家人' }],
    delMemberId:[],
    myRole:'',
    isBg:false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //返回
  toMyFam:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  showButton: function () {
    this.setData({
      showView: !this.data.showView,
    })
  },
  cancelButton:function(){
    this.setData({
      showView: true,
    })
  },

  // 多选
  checkboxChange: async function (e) {
    var delMemberId=[]
    for (let k = 0; k < e.detail.value.length;k++)
    {
      let index = delMemberId.indexOf(e.detail.value[k])
      if (index > -1) {
        delMemberId.splice(index, 1);
      } else {
        var arrStr = { MemberId: e.detail.value[k] };
        delMemberId.push(arrStr)
      }
    }
    this.setData({
      delMemberId: JSON.stringify(delMemberId)
    })
  },
  //删除成员
  deleteButton: async function (e) {
    if (this.data.delMemberId.length > 0) {
      var that = this;
      var hr = await dataApi.MyFamily.deleteRember(wx.getStorageSync("wxauth").userid,
        this.data.delMemberId);
      this.getFamilyinfo();
      app.getEventLog(42);
      if (hr.state) {
        wx.showToast({
          title: hr.msg,
          icon: "none"
        })
      }
    }
  },

  //根据用户获取我的家庭相关信息
  getFamilyinfo: function () {
    var that = this;
    setting.GET({
      UserId: wx.getStorageSync("wxauth").userid
    }, "/api/FamilyMember/GetMyFamily", (data) => {
      if (data.data != null){
        var urole = data.data.userInfo
        var roleinfo = data.data.familyMemberList.filter((a) => {
          return a.UserId == wx.getStorageSync("wxauth").userid
        })
        urole.UserRole = roleinfo[0].UserRole == null ? 'Family' : roleinfo[0].UserRole
        wx.setStorageSync('myrole', urole);
        this.setData({
          myRole: wx.getStorageSync("myrole").UserRole
        })
      }

      for (var j=0; j < data.data.familyMemberList.length;j++){
        if (data.data.familyMemberList[j].UserRole != null || data.data.familyMemberList[j].UserRole != '') {
          for (var i = 0; i < this.data.roleArray1.length; i++) {
            if (data.data.familyMemberList[j].UserRole == this.data.roleArray1[i].code) {
              data.data.familyMemberList[j].UserRole = i
            }
          }
        }
      }
      if (data.data != null) {
        this.setData({
          myfamMem: data.data.familyMemberList,
        })


        //默认家庭的背景颜色
        let opi = data.data.familyMemberList.filter((s) => {
          return s.UserId == wx.getStorageSync("wxauth").userid
        });
        if (opi.length > 0) {
          opi[0].isBg = true
        }
        for (var i = 0; i < that.data.myfamMem.length;i++){
          if (opi[0].UserId == that.data.myfamMem[i].UserId){
            that.data.myfamMem[i].isBg = true
          }
        }
        that.setData({
          myfamMem: that.data.myfamMem,
        })
      }
    }, (error) => {
      if (error.errMsg) {
      }
    }, false)
  },
  
  //修改用户角色
  bindRole: async function (e) {
    this.setData({
      roleindex: e.detail.value
    })

    const memberid = e.target.dataset.memberid

    var that = this;
    var hr = await dataApi.MyFamily.updateRember(wx.getStorageSync("wxauth").userid,{
      UserId: memberid,
      UserRole: this.data.roleArray[this.data.roleindex],
      FamilyId: wx.getStorageSync("familyId").FamilyId
    });
    app.getEventLog(39);
    this.getFamilyinfo();
    if (hr.state){
      setTimeout(function () {
        wx.showToast({
          title: hr.msg,
          icon: "none",
          duration: 2000
        })
      }, 400)
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    app.getEventLog(38);
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })

    await authApi.wxApi.wxLoginCheck();
    this.getFamilyinfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
      app.getPageTimer(38, this.data.TempId, vtime, this.data.time2);
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
      app.getPageTimer(38, this.data.TempId, vtime, this.data.time2);
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