// pages/knowledge/illnessEssay/illnessEssay.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/knowledge'
const setting = require("../../../utils/setting.js");
const util = require('../../../utils/util.js');
const app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    guid: "",
    classtype: "",
    pageto: "",
    type: "essay",
    illnessEssay: {},
    time: "",
    articleId: "",
    articleIdGuid: "",
    labelList: [],
    radioList: [],
    isLike: null,
    isUseful: null,
    actionId: "",
    answerId: "",
    checkedItem: {},
    likeCount: 0,
    correctAnswer: "",
    lableLike: "",
    surveyType: "",
    index: "",
    userSurvey: "",
    likechoose: "",
    surveyTip: "",
    isSubmit: false,
    checkState: [],
    changeNum:1,
    time1: "",//进入页面时间
    time2: "",//离开页面时间
    sourceMore:false,
    showySurveyTip:false
  },
  hideModal: function () {
    this.setData({
      showySurveyTip: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function(options) {
    this.setData({
      guid: options.guid,
      classtype: options.classtype,
      pageto: options.pageto
    });
    let hr = await authApi.wxApi.wxLoginCheck();

    app.getEventLog("illnessEssay-page", options.guid)
    this.getEssayCon();
  },
  showSourceMore:function(){
    this.setData({
      sourceMore:false
    })
  },
  hideSourceMore:function(){
    this.setData({
      sourceMore: true
    })
  },
  // 推送相关文章
  getRelatedArticles: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.getRelationList({
      ClassType: this.data.classtype,
      LableLike: this.data.lableLike,
      ArticleId: this.data.articleId,
      PageSize: 4,
      PageIndex: 1,
      Q: "1",
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      that.setData({
        illnessList: hr.rows
      })
    }
  },

  // 获取 VIP教育 是否 喜欢 状态
  getBehavior: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.getBehavior({
      UserId: wx.getStorageSync("wxauth").uid, //数字
      ArticleId: this.data.articleId,
      PageSize: 1,
      PageIndex: 1,
      SortName: "createdtime",
      SortOrder: "desc",
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      that.setData({
        actionId: hr.rows[0].ActionId,
        isLike: hr.rows[0].IsLike,
        isUseful: hr.rows[0].IsUseful
      })
    }
  },

  // 获取疾病,vip教育文章内容
  getEssayCon: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.getEssayCon({
      guid: this.data.guid
    });
    if (hr.state == 1 && hr.data != null) {
      that.setData({
        illnessEssay: hr.data,
        likeCount: hr.data.msgList.LikeCount,
        articleId: hr.data.ArticleId,
        articleIdGuid: hr.data.ArticleIdGuid,
        surveyType: hr.data.SurveyType,
        time: (hr.data.PublishTime == null || hr.data.PublishTime=='')?'':hr.data.PublishTime.substring(5, 10),
        surveyTip: hr.data.SurveyTip
      })
      // 判断是否有标签
      if (hr.data.Lable){
        that.setData({
          lableLike: hr.data.Lable,
          labelList: hr.data.Lable.split(','),
        })
      }
      this.changeReadCount();
      this.getRadioList();
      this.getBehavior();
      this.getSurveyState();
      this.getRelatedArticles();
      WxParse.wxParse('article', 'html', hr.data.Content, that, 0);

      var query = wx.createSelectorQuery();
      query.select('#wdy').boundingClientRect();
      console.log("query ")
      console.log(query)
      query.exec((res) => {
        if(res[0]==null){
          return
        }else{
        console.log(res)
        res[0].height;
        console.log("height==", res[0].height)
        var height = res[0].height;
        this.data.colNum = height / 33;
        console.log("行数==", this.data.colNum)
        if (this.data.colNum>4){
          this.setData({
            sourceMore: true,
          })
        }else{
          this.setData({
            sourceMore:false,
          })
        }
        this.setData({
          colNum: this.data.colNum
        })
        }
      })
    }

  },

  // 记录阅读数
  changeReadCount: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.changeReadCount({
      id: this.data.articleId
    });
  },

  // 是 否，vip文章操作
  bindUseful: async function(e) {
    var usefulchoose = e.currentTarget.dataset.usefulchoose
    this.setData({
      usefulchoose: usefulchoose
    })
    if (this.data.isUseful == null) {
      if (usefulchoose == false) {
        this.setData({
          isUseful: false
        })
      }
      if (usefulchoose == true) {
        this.setData({
          isUseful: true
        })
      }
    } else if (this.data.isUseful && this.data.isUseful == true) {
      if (usefulchoose == false) {
        this.setData({
          isUseful: false
        })
      }
    } else {
      if (usefulchoose == true) {
        this.setData({
          isUseful: true
        })
      }
    }
  },

  // 喜欢 不喜欢，vip文章操作，数字计算
  bindLike: function(e) {
    var likechoose = e.currentTarget.dataset.likechoose
    this.setData({
      likechoose: likechoose
    })
    if (this.data.isLike == null) {
      if (likechoose == false) {
        this.setData({
          likeCount: this.data.likeCount,
          isLike: false
        })
      }
      if (likechoose == true) {
        var likeCount = this.data.likeCount;
        likeCount++;
        this.setData({
          likeCount: likeCount,
          isLike: true
        })
      }
    } else if (this.data.isLike && this.data.isLike == true) {
      if (likechoose == false) {
        var likeCount = this.data.likeCount;
        likeCount--;
        this.setData({
          likeCount: likeCount,
          isLike: false
        })
      }
    } else {
      if (likechoose == true) {
        var likeCount = this.data.likeCount;
        likeCount++;
        this.setData({
          likeCount: likeCount,
          isLike: true
        })
      }
    }
  },

  // 是否 喜欢不喜欢，vip文章操作，调接口
  Action: async function(e) {
    if (this.data.likechoose == true || this.data.likechoose == false || this.data.usefulchoose == true || this.data.usefulchoose == false) {
      let thisTime = util.formatTime(new Date());
      var hr = await dataApi.knowledgeApi.postBehavior({
        UserId: wx.getStorageSync("wxauth").uid, //数字
        UserIdGuid: wx.getStorageSync("wxauth").userid, //字符串
        ArticleId: this.data.articleId,
        ArticleIdGuid: this.data.articleIdGuid,
        IsLike: this.data.likechoose,
        IsUseful: this.data.usefulchoose,
        LikeTime: thisTime
      });
      if (hr.state == 1) {
        //this.getBehavior();
      }
    }
  },

  // 疾病教育文章
  toIllnessEssay(e) {
    wx.navigateTo({
      url: `../illnessEssay/illnessEssay?guid=${e.currentTarget.dataset.guid}&classtype=${e.currentTarget.dataset.classtype}&pageto=`,
    })
  },

  // goknowledgeIndex() {
  //   this.toknowledgeIndex();
  //   // wx.navigateBack({
  //   //   back: getCurrentPages().length+1
  //   // })
  // },

  // 获取 VIP教育 单选多选 状态
  getSurveyState: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.getSurveyState({
      UserId: wx.getStorageSync("wxauth").uid, //数字
      ArticleId: this.data.articleId,
      PageSize: 100,
      PageIndex: 1,
      SurveyType: this.data.surveyType
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      var radioList = this.data.radioList
      var chooseList = hr.rows
      for (var j = 0; j < radioList.length; j++) {
        for (var k = 0; k < chooseList.length; k++) {
          if (radioList[j].SurveyId == chooseList[k].SurveyId) {
            radioList[j].checked = true
            this.setData({
              radioList: radioList
            })
          }
        }
      }
      that.setData({
        answerId: hr.rows[0].AnswerId,
        isSubmit: true, //提交按钮颜色,
        changeNum:1,
        checkState: this.data.radioList.filter((a) => {
          return a.checked == true
        })
      })
    }
  },

  // 获取 VIP教育文章的选择题 选项 
  getRadioList: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.getRadioList({
      ArticleId: this.data.articleId,
      PageSize: 100,
      PageIndex: 1,
      SortName: "createdtime",
      SortOrder: "asc",
      SurveyType: this.data.surveyType
    });
    if (hr.state == 1 && hr.rows.length > 0) {
      var correctAnswer = hr.rows.filter((a) => {
        return a.IsRight == true
      })[0]
      // 正确答案
      if (correctAnswer) {
        that.setData({
          correctAnswer: correctAnswer.Content
        })
      }
      that.setData({
        radioList: hr.rows
      })
    }
  },

  // VIP教育文章 选择题选项 操作 单选参数
  survey: async function(e) {
    var radioList = this.data.radioList;
    var index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    })
    // 参数
    var userSurvey = []
    var arrStr = {
      UserId: wx.getStorageSync("wxauth").uid,
      UserIdGuid: wx.getStorageSync("wxauth").userid,
      ArticleId: radioList[index].ArticleId,
      ArticleIdGuid: radioList[index].ArticleIdGuid,
      SurveyId: radioList[index].SurveyId,
      SurveyIdGuid: radioList[index].SurveyIdGuid,
      IsRight: radioList[index].IsRight,
      SurveyType: "1"
    }
    userSurvey.push(arrStr)
    this.setData({
      userSurvey: userSurvey
    })
  },

  // VIP教育文章 选择题选项 操作 多选参数
  checkboxChange: async function(e) {
    var radioList = this.data.radioList;
    var userSurvey = []
    for (let k = 0; k < e.detail.value.length; k++) {
      let index = userSurvey.indexOf(e.detail.value[k])
      let chooseList = radioList.filter((a) => {
        return a.SurveyId == e.detail.value[k]
      })[0]
      if (index > -1) {
        userSurvey.splice(index, 1);
      } else {
        var arrStr = {
          SurveyId: chooseList.SurveyId,
          UserId: wx.getStorageSync("wxauth").uid,
          UserIdGuid: wx.getStorageSync("wxauth").userid,
          ArticleId: chooseList.ArticleId,
          ArticleIdGuid: chooseList.ArticleIdGuid,
          SurveyIdGuid: chooseList.SurveyIdGuid,
          IsRight: chooseList.IsRight,
          SurveyType: "2"
        };
        userSurvey.push(arrStr)
      }
    }
    this.setData({
      userSurvey: userSurvey,
      changeNum : e.detail.value.length
    })
  },

  // VIP教育文章 单选多选接口 选择题选项 操作 接口
  submit: async function() {
    var that = this;
    // 有勾选，且勾选状态不为空，调接口
    if (this.data.userSurvey.length > 0) {
      var hr = await dataApi.knowledgeApi.postSurvey(
        this.data.userSurvey
      );
      if (hr.state == 1) {
        // 单选多选 弹出提示语
        if (this.data.surveyTip) {
          // wx.showToast({
          //   title: this.data.surveyTip,
          //   icon: "none",
          //   duration: 3000
          // })
          this.setData({
            surveyTip: this.data.surveyTip,
            showySurveyTip:true
          })
        }else{
          wx.showToast({
            title: "完成提交",
            icon: "none"
          })
        }
        this.setData({
          isSubmit: true, //提交按钮颜色
        })
        // setTimeout(function(){
        //   that.getSurveyState();
        // },4000)
      } else {
        wx.showToast({
          title: hr.msg,
          icon: "none"
        })
      }
    }
    // 如果一进入就有选中状态，在不修改选项的情况下，提交，不调接口，弹提示语
    // if (this.data.checkState.length > 0 ) {
      // 如果没有修改选中项
      if (this.data.userSurvey.length == 0) {
        
        // 取消选中, 一直没有选过
        if (this.data.changeNum == 0 || this.data.checkState.length==0) {
          wx.showToast({
            title: '提交失败，选项不能为空',
            icon: "none"
          })
          setTimeout(function () {
            that.getSurveyState();
          }, 1500)
          // this.setData({
          //   isSubmit: false, //提交按钮颜色
          // })
        }else{
          // 单选多选 弹出提示语
          if (this.data.checkState) {
            if (this.data.surveyTip == null) {
              wx.showToast({
                title: '请勿重复提交相同答案',
                icon: "none",
                duration: 3000
              })
            } else {
              this.setData({
                surveyTip: this.data.surveyTip,
                showySurveyTip: true
              })
            }
          }
        }
      }
      
    // }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: async function() {
    this.Action(); //是否，喜欢

    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer("illnessEssay-page", this.data.guid, vtime, this.data.time2);
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: async function() {
    this.Action(); //是否，喜欢

    // this.toknowledgeIndex();

    if (this.data.time1 != "" && this.data.time1 != null) {
      var vtime = this.data.time1;
      this.setData({
        time1: null,
        time2: util.formatTime(new Date())
      })
      app.getPageTimer("illnessEssay-page", this.data.guid, vtime, this.data.time2);
    }
  },

  // 页面跳转到知识文章列表
  toknowledgeIndex() {
    app.globalData.currentTab = this.data.classtype;
    wx.switchTab({
      url: '../knowledgeIndex/knowledgeIndex'
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
    // 记录进入页面的时间
    this.setData({
      time1: util.formatTime(new Date())
    })
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
  onShareAppMessage: function (state) { //
    app.getEventLog("illnessEssay-share-button", this.data.guid)

    if (state.from === 'button') {
      // 来自页面内转发按钮
      console.log(state.target)
    }
    return {
      //path: `pages/essay/essay?id=${this.data.ArticleId}`,

      title: '管理更智能，关护更贴心',
      path: `pages/knowledge/illnessEssay/illnessEssay?guid=${this.data.guid}`,
      imageUrl: '../../../images/shareImg2.png',
      success: function (state) {
        //this.share();
        // 转发成功
        console.log("转发成功:" + JSON.stringify(state));
        // wx.navigateTo({
        //   url: '../essay/essay?id=' + e.currentTarget.dataset.id
        // })
      },
      fail: function (state) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(state));
      }
    }
  },
})