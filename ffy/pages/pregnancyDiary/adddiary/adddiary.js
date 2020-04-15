
 import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module';
const util = require("../../../utils/util.js")
const setting = require("../../../utils/setting.js");

 import dataApi from '../../../services/pregnancyDiary'
 const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadimg:[],
    files: [],
    content:'',
    diaryContent:'',
    uploadimageList:[],
    dairyId:0,
    uploadDiaryPic:[],
     djhfdj: [],
    time1: "",//进入页面时间
    time2: "",//离开页面时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  chooseImage: function (e) {
   
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res)
     
        if (that.data.files.length + res.tempFilePaths.length > 9) {
          wx.showToast({ title: '日记只能上传9张哦~', icon: 'none' });
          return;
        }else{
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: that.data.files.concat(res.tempFilePaths)
          });
     
          let uploadpics = []
          let upPic = []
        let temp=[]
          for (let i = 0; i < that.data.files.length; i++) {
            // console.log(that.data.files[i])
            // 上传图片到服务器
            wx.uploadFile({
              url: `${setting.setting.urlImg}/api/Upload/Post`,
              filePath: that.data.files[i],//res.tempFilePaths + "",
              name: 'card',
              success: function (response) {
                let dataJson = JSON.parse(response.data)
                if (dataJson.state == 1) {
                  var obj = {};
                  obj.FileUrl = dataJson.rows[0];
                  obj.FileType = dataJson.data[0].FileType;
                  obj.FileSize = dataJson.data[0].FileSize;
                  temp.push(obj)
               console.info({temp:temp.length,files:that.data.files.length})
               if(temp.length==that.data.files.length)
               {

                 that.setData({
                   uploadDiaryPic: temp
                 });
               }

                  upPic.push(obj);
                  uploadpics.push(dataJson.rows[0])
                } else {
                  if (dataJson.msg == "error") {
                    wx.showToast({
                      title: '上传图片最大只支持1M',
                      icon: 'none',
                    })
                  } else if (dataJson.msg == "Illegal Pictures") {
                    wx.showToast({
                      title: '非法图片',
                      icon: 'none',
                    })
                  }
                }
              }
            })
          }
          that.setData({
            uploadimageList: uploadpics,
            djhfdj: upPic
          });
        }

       

        // for(let i=0;i<res.tempFilePaths.length;i++){
        //   if (this.data.uploadimg.length>=9){
        //     wx.showToast({ title: '日记只能上传9张哦~', icon: 'none' });
        //     return
        //   }else{
        //     that.setData({
        //       uploadimg:uploadimg.push(res.tempFilePaths[i])
        //     })
            
        //   }
        // }
        
        
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  deletefile:function(e){
    let index = parseInt(e.currentTarget.id)
    this.data.files.splice(index, 1)
    this.data.uploadDiaryPic.splice(index, 1)
    this.setData({
      files: this.data.files
    });
  },
  //日记内容
  bindTextAreaBlur: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  zinput:function(e){
    this.setData({
      content: e.detail.value
    })
  },
  //取消按钮
  cancelBtn:function(){
    app.getEventLog(82)
    
    wx.navigateBack({
      delta: 1
    })
  },
  //发表按钮
  commitBtn: async function(){
    if (this.data.files.length === this.data.uploadDiaryPic.length){
      this.setData({
        focus: 'false',
        diaryContent: this.data.content,
      })
      //提交日记
      if (this.data.diaryContent == "") {
        wx.showToast({ title: '日记内容不能为空哦！', icon: 'none' });
        return;
      }
      // if (this.data.uploadDiaryPic.length<=0) {
      //   wx.showToast({ title: '请上传至少一张图片！', icon: 'none' });
      //   return;
      // }
      var that = this;
      var hr = await dataApi.PregnancyDiary.AddPDairyinfo({
        UserId: wx.getStorageSync("wxauth").userid,
        Content: this.data.diaryContent,
        Remark: JSON.stringify(this.data.uploadDiaryPic)
      });
      if (hr.state && hr.state == 1) {
        wx.showToast({ title: '发表成功', icon: 'none' });
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({ title: hr.msg, icon: 'none' });
      }
    }else{
      wx.showToast({ title: '上传的图片中包含大于1M或非法的图片，请检查后重新上传', icon: 'none' });
    }
  },
  onShow: function () {
    app.getEventLog(81)
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
      app.getPageTimer(81, "", vtime, this.data.time2);
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
      app.getPageTimer(81, "", vtime, this.data.time2);
    }
  }
})