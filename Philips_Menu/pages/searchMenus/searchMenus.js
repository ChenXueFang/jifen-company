//获取应用实例
const app = getApp();
const setting = require("../../utils/setting.js");
const util = require("../../utils/util.js");
Page({
  data: {
    historyList: [
    ],
    catagoryList: [
    ],
    searchValue: '',
    choicedName: [],
    choiceArr:[],
    url: setting.setting.URL,
    // scrollHeight: "",
    time1: "", //进入页面时间
    time2: "", //离开页面时间
  },
  //跳回首页
  goSearch: function () {
    var choicedData=[]
    if(this.data.choicedName.length){
      this.data.choiceArr.forEach(item=>{
        item.SubTypeID.forEach(a=>{
          var isAdd=this.data.historyList.every(i=>{
            return i.TypeID != item.TypeID || i.SubTypeID != a.SubTypeID
          })
          if(isAdd){
                choicedData.push({
                  type:'SearchClass',
                  TypeID:item.TypeID,
                  SubTypeID:a.SubTypeID,
                  name:a.name
                })
          }
        })
      })
      wx.setStorageSync('SearchClass',JSON.stringify(this.data.choiceArr))
      wx.removeStorageSync('cookname')
    }else{
      var isAdd2=this.data.historyList.every(i=>{
        return i.name != this.data.searchValue && this.data.searchValue.trim()
      })
      if(isAdd2 && this.data.searchValue.trim()){
        choicedData.push({
          type:'cookname',
          name:this.data.searchValue
        })
      }
      wx.setStorageSync('cookname',this.data.searchValue)
      wx.removeStorageSync('SearchClass')
    }
    this.data.historyList=[...this.data.historyList,...choicedData]
    wx.setStorageSync('historyData',JSON.stringify(this.data.historyList))
    wx.navigateTo({
      url: '../searHome/searHome'
    })
  },
  expand: function (event) {
    var expand = !event.currentTarget.dataset.expand;
    var index = event.currentTarget.dataset.index;
    var str = "catagoryList[" + index + "].expand"
    this.setData({
      [str]: expand //用中括号把str括起来即可
    })
  },
  chooseCatagory: function (event) {
    var checked = !event.currentTarget.dataset.checked;
    var index = event.currentTarget.dataset.index;
    var TypeID = event.currentTarget.dataset.typeid;
    var name = event.currentTarget.dataset.name;
    var v = event.currentTarget.dataset.v;
    var SubTypeID = event.currentTarget.dataset.subtypeid;
    var str = "catagoryList[" + index + "].children[" + v + "].checked"
    this.setData({
      [str]: checked //用中括号把str括起来即可
    })
    if (checked) {
    var parentIndex = this.data.choiceArr.findIndex(i => {
      return i.TypeID == TypeID
    })
    if(parentIndex>-1){
      this.data.choiceArr[parentIndex].SubTypeID.push({SubTypeID,name})
    }else{
      this.data.choiceArr.push(
        {
          TypeID: TypeID,
          SubTypeID: [{SubTypeID,name}]
        }
      )
    }
      this.data.choicedName.push(name);
    } else {
      this.data.choiceArr.forEach(item=>{
        if(item.TypeID==TypeID){
          var cancelIndex = item.SubTypeID.findIndex(i => {
            return i == SubTypeID
          })
          item.SubTypeID.splice(cancelIndex, 1)
        }
      })
      var cancelIndex = this.data.choicedName.findIndex(i => {
        return i == name
      })
      this.data.choicedName.splice(cancelIndex, 1)
    }
    this.setData({
      choiceArr: this.data.choiceArr,
      choicedName: this.data.choicedName,
      searchValue: this.data.choicedName.join(',')
    })
  },
  clearchoice: function (e) {
    this.data.choicedName = [];
    this.data.choiceArr = [];
    this.setData({
      choiceArr: this.data.choiceArr,
      choicedName: this.data.choicedName //用中括号把str括起来即可
    })
    this.setData({
      searchValue: ''
    })
    this.data.catagoryList.forEach((i, v) => {

      i.children.forEach((a, b) => {
        var str = "catagoryList[" + v + "].children[" + b + "].checked"
        this.setData({
          [str]: false
        })
      })
    })
  },
  inputedit: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value //用中括号把str括起来即可
    })
  },
  //去搜索结果页
  goSearchResult: function (event) {
    var item = event.currentTarget.dataset.item;
    var searchItem={}
    if(item.type=='SearchClass'){
      searchItem=[
        {
          TypeID:item.TypeID,
          SubTypeID:[
            {
              SubTypeID:item.SubTypeID,
              name:item.name
            }
          ]
        }
      ]
      wx.setStorageSync('SearchClass',JSON.stringify(searchItem))
      wx.removeStorageSync('cookname')
    }else{
      searchItem=item.name
      wx.setStorageSync('cookname',searchItem)
      wx.removeStorageSync('SearchClass')
    }
    wx.navigateTo({
      url: '../searHome/searHome'
    })
    //第三四字段分别为：TypeID、SubTypeID,为了后面方便统计到具体点击哪个产品次数
    // app.getEventLog("201", "产品导航页面点击每个产品按钮（" + event.currentTarget.dataset.name + ")", event.currentTarget.dataset.typeid, event.currentTarget.dataset.subtypeid);
    // wx.navigateTo({
    //   url: '../searchresult/searchresult?searchKey=' + event.currentTarget.dataset.name + "&typeid=" + event.currentTarget.dataset.typeid + "&subtypeid=" + event.currentTarget.dataset.subtypeid
    // })
  },
  clearHistory(){
    wx.removeStorageSync('historyData')
    this.setData({
      historyList:[]
    })
  },
  onLoad: function () {
    //动态获取滚动区域高度 屏幕总高-头部高-底部高
    var h = wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * 200);
    
    this.setData({
      scrollHeight: h,
      time1: util.formatTime(new Date()),
    });
    wx.showLoading({
      title: '加载中',
    });
    setting.GET({}, "API/BasicData.ashx?_op=TypeQuery", (data) => {
      if (data.success) {
        // data.data
        
        this.setData({
          catagoryList: this.groupBy(data.data,'TypeID')
        });
        wx.hideLoading()
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
  groupBy(arr,target){
    var map = {},
    dest = [];
for(var i = 0; i < arr.length; i++){
    var ai = {...arr[i],checked:false};
    if(!map[ai[target]]){
        dest.push({
          TypeID: ai.TypeID,
          SubTypeID:ai.SubTypeID,
          TypeName: ai.TypeName,
          SubTypeName:ai.SubTypeName,
          Sort:ai.Sort,
          children: [ai],
            expand:false
        });
        map[ai[target]] = ai;
    }else{
        for(var j = 0; j < dest.length; j++){
            var dj = dest[j];
            if(dj[target] == ai[target]){
                dj.children.push(ai);
                break;
            }
        }
    }
}
return dest
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(wx.getStorageSync('historyData')){
      var historyList=JSON.parse(wx.getStorageSync('historyData'))
      var num = historyList.length
      if(num>10) historyList = historyList.slice(num-10,num);
      else historyList = historyList.slice(0,num);
    }
    
    // var historyList=wx.getStorageSync('historyData')? JSON.parse(wx.getStorageSync('historyData')):[];
    this.setData({
      time1: util.formatTime(new Date()),
      historyList:historyList ||[]
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