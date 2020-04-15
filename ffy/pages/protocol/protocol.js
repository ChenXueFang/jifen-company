// pages/protocol/protocol.js
// surebtn// pages/myFamily/myFamily.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import authApi from '../../services/dataapi'
import dataApi from '../../services/enter'
var formId=null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isselected: false,
    familyid: "",
    inviterole:"",
    norole:'',
    role:'',
    fath:'',
    userRole: wx.getStorageSync("myrole").UserRole,
  },


  formSubmit:async function (e) {
    // 获取表单id
    formId = e.detail.formId;
    // 非真机运行时 formId 应该为 the formId is a mock one
    console.log('formId:', formId);

    if (this.data.isselected == true) {
      // 添加家庭成员接口
      //this.addFamilyMember();
      //保存formid
      var hrform = await dataApi.Enter.saveFormId({
        UserId: wx.getStorageSync("wxauth").userid,
        OpenId: wx.getStorageSync("wxauth").openid,
        FormId: formId,
        MsgType: "send_QA"
      });
      console.log("保存FormId")
      console.log(hrform)

      if (this.data.role == 0) {
        wx.navigateTo({
          url: '../selectDueDate/selectDueDate'
        })
      } else if (this.data.role == 1) {
        // 加入家庭页面，确认按钮 加入家庭，验证妈妈是否加入，设置爸爸角色
        wx.navigateTo({
          url: '../joinFamily/joinFamily?fath=' + this.data.fath
        })
      } else if (this.data.role == 2) {
        // 添加家庭成员接口，妈妈分享邀请，添加成员，成员点击同意，设置
        var that = this;
        var hr = await dataApi.Enter.FamilyMember({
          UserId: wx.getStorageSync("wxauth").userid,
          FamilyId: this.data.familyid,
          UserRole: this.data.inviterole
        });
        if (hr.state) {
          if (hr.state == 1) {
            wx.showToast({
              title: "已加入家庭",
              icon: 'none'
            })
          }
          else {
            wx.showToast({
              title: hr.msg,
              icon: 'none'
            })
          }
          setTimeout(function () {
            wx.switchTab({
              url: '../home/home'
            })
          }, 2000)
        }
      }
    } else {
      wx.showToast({
        title: "请阅读并同意隐私协议", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await authApi.wxApi.wxLoginCheck()
    var role = options.role;
    var fath = options.fath;
    this.setData({ 
      role: role, 
      fath: fath, 
      familyid: options.familyid,
      inviterole: options.inviterole
    });
    // this.checked();
  },

  //点击同意隐私协议 
  checkboxChange: function(e) {
    this.setData({
      isselected:e.target.dataset.checks?false:true
    })
  },

  //同意按钮
  agreeBtn:async function () {
    if (this.data.isselected == true) {
      // 添加家庭成员接口
      //this.addFamilyMember();

      if (this.data.role == 0) {
        wx.navigateTo({
          url: '../selectDueDate/selectDueDate'
        })
      } else if (this.data.role == 1) {
        // 加入家庭页面，确认按钮 加入家庭，验证妈妈是否加入，设置爸爸角色
        wx.navigateTo({
          url: '../joinFamily/joinFamily?fath=' + this.data.fath
        })
      } else if (this.data.role == 2) {
        // 添加家庭成员接口，妈妈分享邀请，添加成员，成员点击同意，设置
        var that = this;
        var hr = await dataApi.Enter.FamilyMember({
          UserId: wx.getStorageSync("wxauth").userid,
          FamilyId: this.data.familyid,
          UserRole: this.data.inviterole
        });
        if (hr.state) {
          if(hr.state==1){
            wx.showToast({
              title: "已加入家庭",
              icon: 'none'
            })
          }
          else{
            wx.showToast({
              title: hr.msg,
              icon: 'none'
            })
          }
          setTimeout(function () {
            wx.switchTab({
              url: '../home/home'
            })
          }, 2000)
        }
      }
    } else {
      wx.showToast({
        title: "请阅读并同意隐私协议", //res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },

  navigator: function (){
    console.log('隐私协议')
    wx.navigateTo({
      url: '../protocolPre/protocolPre'
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
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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