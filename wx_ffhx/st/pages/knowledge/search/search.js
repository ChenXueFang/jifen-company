// pages/knowledge/search/search.js
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
import authApi from '../../../servicesAPI/dataapi'
import dataApi from '../../../servicesAPI/knowledge'
const setting = require("../../../utils/setting.js");
const util = require("../../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    inputValue: "",
    Inp: "",
    SearchText: "",
    type: "",
    producttype: "",
    classtype: "",
    isNothing: false,
    isLabel: true,
    productDescMenu: [],
    currentTab: 0,
    index: 0,
    illnessList: [],
    show: true,
    focus: false,
    disabled: false,
    labelList: [],
    time1: "",//进入页面时间
    time2: "",//离开页面时间
    showselIndex:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type,
      producttype: options.producttype,
      classtype: options.classtype
    })
    // 教育文章页进来的标签显示
    if (this.data.type == "essay") {
      // 疾病教育搜索标签
      if (this.data.classtype == "1") {
        this.setData({
          labelList: ["戒烟", "急性加重", "慢阻肺病因", "吸烟", "肺功能", "提高生活质量", "运动训练", "改善呼吸功能", "感染", "营养不良", "少食多餐", "减缓呼吸困难", "气体交换功能", "慢性阻塞性肺病", "呼吸功能康复训练"]
        })
      }
      // vip教育搜索标签
      if (this.data.classtype == "2") {
        this.setData({
          labelList: ["慢阻肺", "吸入用药", "支气管扩张剂", "糖皮质激素", "加压式定量吸入器", "干粉吸入器", "雾化器", "储物罐", "康复运动"]
        })
      }
    }
    // 产品说明菜单页进来的标签显示
    if (this.data.type == "product") {
      // this.setData({
      //   labelList: ["快速索引", "产品", "说明"]
      // })
    }
  },

  // tab切换方法
  clickTab: async function(e) {
    let obj = this.data.productDescMenu;
    // 获取当前鼠标点击的下拉列表的index.
    let index = e.target.dataset.index;
    // 如果对象里存在这个index的属性就切换它的show, 不存在添加index属性并设置它的show
    if (obj[index]) {
      obj[index].show = !this.data.productDescMenu[index].show;
    } else {
      obj[index] = [];
      obj[index].show = true;
    }
    this.setData({
      productDescMenu: obj
    });
    // 老款呼吸机，一级标题跳转到视频页面
    if (this.data.producttype == 2) {
      // wx.navigateTo({
      //   url: `../productVideo/productVideo?guid=${e.currentTarget.dataset.guid}`,
      // })
      app.getEventLog("video-button")
      setTimeout(() => {
        wx.showToast({
          title: '尚未发布',
          icon: 'none',
          duration: 3000
        });
        setTimeout(() => {
          wx.hideToast();
        }, 2000)
      }, 200);
    }
  },

  // 获取input值,搜索框功能
  getInp: function(e) {
    this.setData({
      Inp: e.detail.value
    })
    if(e.detail.value!=""){
      this.setData({
        showselIndex: false,
        SearchText: ''
      })
    }
  },
  // 搜索回车键触发方法
  search() {
    this.setData({
      illnessList: [],
      productDescMenu: {},
      index: 1,
      SearchText: this.data.Inp,
    })
    app.getShareLog("searchArticle", this.data.Inp); //记录搜索日志
    if (this.data.type == "product") {
      // 搜索产品说明
      this.searchProduct();
    }
    if (this.data.type == "essay") {
      // 搜索疾病
      this.searchEssay();
    }
  },

  // 点击快速索引
  searchLabel: async function(e) {
    this.setData({
      illnessList: [],
      productDescMenu: {},
      index: 1,
      SearchText: e.currentTarget.dataset.labelchoose,
      isShow:false,
      showselIndex:true
    })
    if (this.data.type == "product") {
      // 搜索产品说明
      this.searchProduct();
    }
    if (this.data.type == "essay") {
      // 搜索疾病
      this.searchEssay();
    }
  },

  // 搜索产品说明结果，一级菜单二级菜单
  searchProduct: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.getProductMenuList({
      MPMenuDescIdMenuNameLike: this.data.SearchText,
      ContentLike: this.data.SearchText,
      TitleLike: this.data.SearchText,
      ProductType: this.data.producttype,
      PageSize: 100,
      PageIndex: 1,
      SortName: "createdtime",
      SortOrder: "desc",
      Q: "1"
    });
    this.setData({
      isLabel: false,
    })
    if (hr.state == 1) {
      if (hr.data.length > 0) {
        for (var i = 0; i < hr.data.length; i++) {
          hr.data[i].show = true //符合此选项的，加一个checked 参数
        }
        that.setData({
          productDescMenu: hr.data, //一二级标题
          isNothing: false,
        })
      } else {
        that.setData({
          isNothing: true,
        })
      }
    } else {
      wx.showToast({
        title: hr.msg,
        icon: 'none'
      })
    }
  },

  // 搜索疾病文章--1
  searchEssay: async function() {
    var that = this;
    var hr = await dataApi.knowledgeApi.gerArticleList({
      LableLike: this.data.SearchText,
      ContentLike: this.data.SearchText,
      TitleLike: this.data.SearchText,
      ClassType: this.data.classtype,
      PageSize: 8,
      PageIndex: this.data.index,
      SortName: "createdtime",
      SortOrder: "desc",
      Q: "1"
    });
    this.setData({
      isLabel: false,
    })
    if (hr.state == 1) {
      if (hr.rows.length > 0) {
        that.setData({
          illnessList: this.data.illnessList.concat(hr.rows),
          index: this.data.index + 1,
          isNothing: false,

        })
        if (hr.pageIndex > 1 && hr.rows.length == 0) {
          that.setData({
            isNothing: false,
          })
        }
      }
      if (hr.pageIndex == 1 && hr.rows.length == 0) {
        this.setData({
          isNothing: true,
        });
      }
    } else {
      wx.showToast({
        title: hr.msg,
        icon: 'none'
      })
    }
  },

  //下拉刷新
  onPullDownRefresh: function() {
    // console.log(111);
    if (this.data.type == "essay") {
      if (this.data.illnessList.length > 0) {
        this.setData({
          illnessList: [],
          index: 1
        })
        this.searchEssay();
        wx.stopPullDownRefresh(); //停止下拉刷新 
      } else {
        wx.stopPullDownRefresh(); //停止下拉刷新 
      }
    }
    wx.stopPullDownRefresh(); //停止下拉刷新 
  },
  //上拉加载
  onReachBottom: function() {
    // console.log(222);
    if (this.data.type == "essay") {
      var that = this;
      this.searchEssay();
    }
  },

  // 点击搜索框，放大镜消失
  searchBox() {
    this.setData({
      isShow: false,
    })
  },
  // 失去焦点时，放大镜出现
  bindblur(e) {
    this.setData({
      inputValue: e.detail.value
    })
    if (e.detail.value == "") {
      this.setData({
        isShow: true,
        isLabel: true, //快速索引标签
        isNothing: false, //查询无结果
        showselIndex: false,
        SearchText: ''
      })
      if (this.data.productDescMenu != null && this.data.productDescMenu.length > 0 || this.data.illnessList.length > 0) {
        this.setData({
          isLabel: false, //快速索引标签
        })
      }
      // 内容为空，搜索全部
      // this.search();
    }
  },
  // 点击x,清空输入的内容
  clear() {
    if (this.data.inputValue != '' || this.data.Inp != '') {
      this.setData({
        inputValue: "",
        isShow: false,
        focus: true,
        Inp: "",
      })
    } else {
      // this.setData({
      //   focus: false,
      //   isShow: true
      // })
    }
    this.setData({
      showselIndex: false,
      SearchText: '',
      focus: true
    })
  },

  // 跳转到产品说明文章页面
  toProductEssay(e) {
    // wx.navigateTo({
    //   url: `../productEssay/productEssay?guid=${e.currentTarget.dataset.guid}`,
    // })
    wx.navigateTo({
      url: `../productIntro/productIntro?menuid=${e.currentTarget.dataset.menuid}`,
    })
  },

  // 疾病教育文章
  toIllnessEssay(e) {
    wx.navigateTo({
      url: `../illnessEssay/illnessEssay?guid=${e.currentTarget.dataset.guid}&classtype=${e.currentTarget.dataset.classtype}&pageto=${e.currentTarget.dataset.pageto}`,
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
    app.getEventLog("search-page")
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
      app.getPageTimer("search-page", "", vtime, this.data.time2);
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
      app.getPageTimer("search-page", "", vtime, this.data.time2);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})