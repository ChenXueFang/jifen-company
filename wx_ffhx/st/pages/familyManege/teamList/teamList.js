// pages/familyManege/teamList/teamList.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/familyapi'
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],
    index: 1,
    leaderInfo: {},
    checkList: [],
    isLeader: false,
    topMember: {},
    otherList: [],
    familyid: "",
    role: 0,
    currentUser: {},
    exitMember: 0,
    familyinfo: {},
    msgidguid: 0,
    isNull: false,
    fId: "",
    uId:"",  //组长的userid
    imagePath: '',
    isMaImg: false,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.getEventLog("teamList-page")
    this.getMyFamily();

    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })
  },

  //二维码，点击图片进行预览，长按保存分享图片
  previewImg: async function (e) {
    // 获取二维码图片接口
    var that = this;
    var hr = await dataApi.familyApi.getUnlimited({
      scene: this.data.uId + '_' + this.data.fId,   //组长userid,familyId
      page: "pages/familyManege/saomaJoin/saomaJoin"               //pages/familyManege/saomaJoin/saomaJoin
    });
    if (hr.state == 1 && hr.data) {
      this.setData({
        imagePath: hr.data,
        isMaImg: true
      })
    }
    // 预览二维码图片
    var img = this.data.imagePath;
    wx.previewImage({
      current: "data:image/png;base64," + img, // 当前显示图片的http链接
      urls: ["data:image/png;base64," + img] // 需要预览的图片http链接列表
    })
  },

  // 获取家庭成员列表
  getMyFamily: async function() {
    var that = this;
    var hr = await dataApi.familyApi.getMyFamily({
      userId: wx.getStorageSync("wxauth").userid,
      isCheckedState: true
    });
    if (hr.state == 1 && hr.data) {
      if (hr.data.familyName != "" && hr.data.familyName != null) {
        that.setData({
          familyinfo: hr.data
        })
        // 当前登录人为组长时
        if (wx.getStorageSync("wxauth").userid == hr.data.familyName.UserId) {
          that.setData({
            leaderInfo: hr.data.userInfo,
            isLeader: true,
            role: 0,
            fId: hr.data.familyName.FId.toString(),
            uId: hr.data.familyName.UId.toString(),
          })
          if (hr.data.familyMemberList.length > 1) {
            //待审核的
            that.setData({
              checkList: hr.data.familyMemberList.filter((a) => {
                return a.Status == 0
              })
            })
            // 通过审核的成员列表
            that.setData({
              memberList: hr.data.familyMemberList.filter((a) => {
                return a.Status == 1 && a.UserId != hr.data.familyName.UserId
              })
            })
          }else{  // 移除唯一的一个组员，组员列表清空
            that.setData({
              memberList: []
            })
          }        
          // 审核通过,待审核为空
          if (this.data.checkList.length == 0) {
            this.setData({
              isNull: false
            })
          } else {
            this.setData({
              isNull: true
            })
          }
        }
        //当前登录人为组员时
        else {
          that.setData({
            isLeader: false,
            role: 1
          })
          let topMemList = hr.data.familyMemberList.filter((a) => {
            return a.Status == 1 && a.UserId == hr.data.userInfo.UserId
          })
          //有当前登录人
          if (topMemList.length > 0) {
            that.setData({
              topMember: topMemList[0]
            })
            //组长信息
            let zuzhangInfo = hr.data.familyMemberList.filter((a) => {
              return a.Status == 1 && a.UserId == hr.data.familyName.UserId
            })[0];
            this.setData({
              leaderInfo: zuzhangInfo,
              isLeader:false
            })
            // 除了组长，除了当前登录组员以外的，已经审核通过的组员
            that.setData({
              memberList: hr.data.familyMemberList.filter((a) => {
                return a.Status == 1 && a.UserId != hr.data.userInfo.UserId && a.UserId != hr.data.familyName.UserId
              })
            })
          }
          // 当前登录人为组员时，组员可退出家庭组
          that.setData({
            exitMember: this.data.topMember.FamilyMemberId
          })
        }
      }
    }
  },

  //消息标为已读 put this.readed();
  readed: async function(msgid) {
    var hr = await dataApi.familyApi.readed({
      MsgIdGuid: msgid,
      IsRead: true
    });
  },

  // 组长同意好友加入
  agreejoin: async function(e) {
    let msgid = e.currentTarget.dataset.msgid;
    var that = this;
    var hr = await dataApi.familyApi.dealJoinFamily({
      applyId: this.data.checkList[0].FamilyMemberId,
      userId: wx.getStorageSync("wxauth").userid,
      isAccecpt: true
    });
    if (hr.state == 1) {
      app.getEventLog("teamList_agree-button")
      //操作成功，設置已讀
      that.readed(msgid);
      wx.showToast({
        title: '已同意',
        icon: 'none'
      })
      setTimeout(function () {
        that.getMyFamily();
      }, 1500)
    } else {
      setTimeout(function () {
        wx.showToast({
          title: hr.msg,
          icon: 'none'
        })
      },900)
    }
  },

  // 组长拒绝好友加入
  refusejoin: async function(e) {
    let msgid = e.currentTarget.dataset.msgid;
    var that = this;
    var hr = await dataApi.familyApi.dealJoinFamily({
      applyId: this.data.checkList[0].FamilyMemberId,
      userId: wx.getStorageSync("wxauth").userid,
      isAccecpt: false
    });
    if (hr.state == 1) {
      app.getEventLog("teamLIst_refuse-button")
      that.readed(msgid);
      wx.showToast({
        title: '已拒绝',
        icon: 'none'
      })
      setTimeout(function(){
        that.getMyFamily();
      },1500)
    } else {
      setTimeout(function () {
        wx.showToast({
          title: hr.msg,
          icon: 'none'
        })
      },900)
    }
  },

  // 退出家庭组按钮
  exit: function() {
    var that = this;
    wx.showModal({
      title: '退出家庭组',
      content: '是否退出家庭组',
      cancelText: "取消", //默认是“取消”
      confirmText: "确定", //默认是“确定”
      confirmColor: '#1575e5', //确定文字的颜色
      success: async function(res) {
        if (res.confirm) {
          app.getEventLog("exitFamily-button")
          var hr = dataApi.familyApi.exitFamily({
            familyMemberId: that.data.exitMember,
            userId: wx.getStorageSync("wxauth").userid
          });
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  // 跳转到单人详情页
  personalPage(e) {
    wx.navigateTo({
      url: `../personalPage/personalPage?familyMemId=${e.currentTarget.dataset.familymemid}&role=${e.currentTarget.dataset.role}`
    })
  },
  // 跳转到审核同意或拒绝页
  leaderAgree(e) {
    wx.navigateTo({
      url: `../../applyInformation/leaderAgree/leaderAgree?familymemberid=${e.currentTarget.dataset.familymemberid}&msgidguid=${e.currentTarget.dataset.msgidguid}`,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(state) {
    app.getEventLog("inviteJoinShare")
    app.getShareLog("inviteJoinShare", "邀请好友加入分享");  //记录邀请好友分享日志
    if (state.from === 'button') {
      // 来自页面内转发按钮
      console.log(state.target)
    }
    return {
      title: '管理更智能，关护更贴心',
      path: `pages/index/index?share=1&familyid=${state.target.dataset.familyid}&invituserid=${state.target.dataset.invituserid}`,
      imageUrl: '../../../images/shareImg.png',
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
      app.getPageTimer("teamList-page", "", vtime, this.data.time2);
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
      app.getPageTimer("teamList-page", "", vtime, this.data.time2);
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

  }
})