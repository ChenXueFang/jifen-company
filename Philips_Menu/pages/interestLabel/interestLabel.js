//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
Page({
  data: {
    interestList: [
    ],
    isOk:false,
    url: setting.setting.URL,
    // scrollHeight: "",
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },
  //跳回首页
  goBack: function () {
    // wx.navigateBack({ })
    //   wx.switchTab({
    //   url: '../myCenter/myCenter'
    // })
    if(app.globalData.returnPath){
      if(app.globalData.returnPath=='../interestLabel/interestLabel'){
        wx.switchTab({
          url: '../myCenter/myCenter'
        })
      }else{
        wx.redirectTo({
          url: app.globalData.returnPath+'?id='+app.globalData.returnId,
          fail:()=>{
            wx.switchTab({
              url: app.globalData.returnPath + '?id=' + app.globalData.returnId
            })
          }
          // url:this.data.backurl+'?ID'+ this.data.ID
        })
      }
      
    }else{
        wx.switchTab({
      url: '../home/home'
    })
    }
    
  },
  saveTagUser(){
    wx.showLoading({
      title: '加载中',
    });
    let tempIDs=[]
    this.data.interestList.forEach(i=>{
      if(i.checked){
        tempIDs.push(i.ID)
      }
    })
    let params={
      TagsIDArr:tempIDs.join(','),
    }
    setting.POST(params, "API/BasicData.ashx?_op=SaveTagUser", (data) => {
      wx.hideLoading()
      if (data.success) {
        this.goBack();
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000,
        })
      }
    }, (err) => {
      wx.hideLoading()
      console.log(err)
    }, false);
  },
  chooseInterest: function (event){
    var checked = !event.currentTarget.dataset.checked;
    var index=event.currentTarget.dataset.index;
    var str = "interestList[" + index + "].checked"
    this.setData({
      [str]: checked//用中括号把str括起来即可
    })
    var tempArr = this.data.interestList.filter(i => { return i.checked });
    if (tempArr.length>=5){
      this.setData({
        isOk: true//用中括号把str括起来即可
      })
    }else{
      this.setData({
        isOk: false//用中括号把str括起来即可
      })
    }
  },
  queryLabel(){
    wx.showLoading({
      title: '加载中',
    });
    setting.GET({}, "API/BasicData.ashx?_op=TagQuery", (data) => {
      if (data.success) {
        // data.data
        this.setData({
          interestList: data.data.List
        });
        this.querychoosedLabel(data.data.List)
        
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000,
        })
      }
    }, (err) => {
      console.log(err)
    }, false);
  },
  querychoosedLabel(oldData){
    setting.GET({}, "API/BasicData.ashx?_op=UserTagsQuery", (data) => {
      wx.hideLoading()
      if (data.success) {
        var list=data.data
        oldData.forEach(item=>{
          if(list.some(i=> {return item.ID==i.TagsID})){
            item.checked=true
          }else{
              item.checked=false
            }
        })
        if(list.length){
          this.setData({
            isOk: true//用中括号把str括起来即可
          })
        }
        this.setData({
          interestList: this.data.interestList
        });
        
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000,
        })
      }
    }, (err) => {
      wx.hideLoading()
      console.log(err)
    }, false);
  },
  onLoad: function () {
    //动态获取滚动区域高度 屏幕总高-头部高-底部高
    var h = wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * 200);
    this.setData({
      // backurl: options.returnPath,
      // ID: options.ID,
      scrollHeight: h,
      time1: util.formatTime(new Date())
    });
    this.queryLabel();
    //记录页面访问次数
    // app.getEventLog("200", "产品导航页面", "", "");

    //获取产品和菜谱列表
    // app.getTypes(data => {
    //   //console.log(data);
    //   //typeId 1 产品  2 菜系 3 菜式
    //   this.setData({
    //     productList: data
    //   })
    // }, (err) => { console.log(err) });

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      time1: util.formatTime(new Date())
    })
    app.getEventLog("200", "产品导航页面", "", "");
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
      app.getPageTimer("200", "产品导航页面", "", "", vtime, this.data.time2);
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
      app.getPageTimer("200", "产品导航页面", "", "", vtime, this.data.time2);
    }
  },

})