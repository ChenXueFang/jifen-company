// pages/albumDetail/albumDetail.js
const app = getApp();
const setting = require("../../utils/setting.js");

// 基础版的防抖函数
let timeout

function debounce(func, wait) {
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}
// 基础版的节流函数
let timeout2 = null

function throttle(func, wait) {
  return function () {
    if (!timeout2) {
      timeout2 = setTimeout(function () {
        clearTimeout(timeout2)
        timeout2 = null
        func()
      }, wait)
    }
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: setting.setting.ImgURL,
    nick: '',
    headImg: '',
    menuList: [],
    Album: {},
    albumList: [],
    isEdit: false,
    isMove: false,
    movedAlbum: [],
    pageIndex: 1,
    pageAlbumIndex: 1,
    total: '',
    noPageScroll: false,
    cookIsOver: false
  },
  // 喜欢
  loveBind(e) {
    var index = e.currentTarget.dataset.index //数组下标
    var likesid = e.currentTarget.dataset.likesid //
    var cookid = e.currentTarget.dataset.cookid //
    var arr = this.data.menuList

    setting.POST({
      CookBookID: cookid,
      oper: arr[index].IsLikes ? 'del' : 'add',
      ID: likesid,
      H5UserID: wx.getStorageSync("vipUserId"),
      UnionID: wx.getStorageSync("unionidKey")
    }, "API/BasicData.ashx?_op=CookBookLikes", (data) => {
      arr[index].IsLikes = !arr[index].IsLikes
      if (arr[index].IsLikes) {
        arr[index].LikesCount = ++arr[index].LikesCount
      } else {
        arr[index].LikesCount = --arr[index].LikesCount
      }
      this.setData({
        menuList: arr, //重新赋值
      })
    }, (err) => {}, false);

  },
  edit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  handleClick(event) {
    if (this.data.isEdit) {
      this.chooseMenu(event)
    } else {
      wx.navigateTo({
        url: '../cookDetail/cookDetail?cookid=' + event.currentTarget.dataset.cookid,
      })
    }
  },
  chooseMenu(event) {
    var checked = !event.currentTarget.dataset.checked;
    var index = event.currentTarget.dataset.index;
    var str = "menuList[" + index + "].ischecked"
    this.setData({
      [str]: checked //用中括号把str括起来即可
    })
    var tempArr = []
    this.data.menuList.forEach(i => {
      if (i.ischecked) {
        tempArr.push(i.CookBookID)
      }
    });
    this.setData({
      movedAlbum: tempArr
    })
  },
  openMove() {
    if (!this.data.movedAlbum.length) return;
    this.setData({
      pageIndex: 1,
      albumList: [],
    })
    this.AlbumQuery();

  },
  closeMove() {
    this.setData({
      isMove: false
    })
  },
  AlbumQuery() {
    wx.showLoading({
      title: '加载中',
    });
    let params = {
      rows: 5, //一页多少
      page: this.data.pageAlbumIndex //第1页
    }
    setting.GET(params, "API/BasicData.ashx?_op=AlbumQuery", (data) => {
      wx.hideLoading()
      if (data.success) {
        if (data.rows.length) {
          data.rows = data.rows.filter(i => i.ID != this.data.Album.ID)
          this.setData({
            albumList: this.data.albumList.concat(data.rows),
          })
          if (data.rows.length < 4) {
            this.setData({
              isOver: true
            })
          } else {
            this.setData({
              isOver: false
            })
          }
        } else {
          this.setData({
            isOver: true
          })

        }
        // this.setData({
        //   albumList: data.rows
        // })
        this.setData({
          isMove: true
        })
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
  AlbumCookBook() {
    wx.showLoading({
      title: '加载中',
    });

    setting.GET({
      rows: 10,
      page: this.data.pageIndex,
      albumID: this.data.ID
    }, "API/BasicData.ashx?_op=V_AlbumCookBookQuery", (data) => {
      wx.hideLoading()
      if (data.success) {
        this.setData({
          Album: data.data.Album,
          isMove: false,
        })
        if (data.data.List.rows.length) {
          data.data.List.rows.forEach(i => {
            i.ischecked == false
            if (i.IsVideo && i.SecondsVedioUrl && i.SecondWidth) {
              i.styleHight = 340 * i.SencondHeight / i.SecondWidth
            }
          })
          this.setData({
            menuList: this.data.menuList.concat(data.data.List.rows),
            total: data.data.List.total
          })
          // 添加isPlay字段
          var currentList = this.data.menuList
          for (var i in currentList) {
            // 默认前四个播放
            if (!this.data.scrollHeight) {
              if (i < 6) {
                currentList[i].isPlay = true
              } else {
                currentList[i].isPlay = false
              }
            }
          }
          this.setData({
            menuList: currentList
          })
          if (data.data.List.rows.length < 10) {
            this.setData({
              cookIsOver: true
            })
          } else {
            this.setData({
              cookIsOver: false
            })
          }
        } else {
          this.setData({
            cookIsOver: true
          })

        }


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
  BatchDeleteAlbumCook() {
    wx.showLoading({
      title: '加载中',
    });
    setting.POST({
      AlbumID: this.data.Album.ID,
      IDArr: this.data.movedAlbum.join(',')
    }, "API/BasicData.ashx?_op=BatchDeleteAlbumCook", (data) => {
      wx.hideLoading()
      if (data.success) {
        this.setData({
          movedAlbum: [],
          menuList: []
        })
        this.AlbumCookBook();
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
  BatchMoveAlbumCook(e) {
    wx.showLoading({
      title: '加载中',
    });
    let params = {
      newAlbumID: e.currentTarget.dataset.id,
      newAlbumName: e.currentTarget.dataset.name,
      oldAlbumID: this.data.Album.ID,
      IDArr: this.data.movedAlbum.join(',')
    }
    setting.POST(params, "API/BasicData.ashx?_op=BatchMoveAlbumCook", (data) => {
      wx.hideLoading()
      if (data.success) {
        this.setData({
          movedAlbum: [],
          menuList: []
        })
        this.AlbumCookBook();
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

  // 滚动距离控制视频播放
  onPageScroll(e) {
    // console.log(e.scrollTop, 'e.scrollTop++++++++++')
    // 节流，每200毫秒触发一次
    throttle(() => {
      this.playVideo(e.scrollTop);
    }, 200)()

    // 防抖，只触发一次
    debounce(() => {
      this.playVideo(e.scrollTop);
    }, 200)()
  },
  playVideo: function (scrollHeight) {
    var dataList = this.data.menuList
    var height = wx.getSystemInfoSync().windowHeight - 40 //屏幕可视高度
    var that = this
    wx.createSelectorQuery().selectAll('.tuijianvedio').boundingClientRect(function (rects) {
      rects.forEach(function (rect) {
        var index = rect.id.substring(1)

        if (rect.top > 0 && rect.bottom < height) {
          dataList[index].isPlay = true
        } else dataList[index].isPlay = false;
        // console.log(index)
        // console.log(rect.bottom  =","+rect.top+","+rect.height)
      })
      that.setData({
        menuList: JSON.parse(JSON.stringify(dataList))
      })
    }).exec()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ID: options.id || 0,
      nick: wx.getStorageSync('nickName') || app.globalData.userInfo.NickName,
      headImg: wx.getStorageSync('avatarUrl') || app.globalData.userInfo.HeadimgUrl
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
    if(this.data.isMove){
      this.setData({
          pageIndex: 1,
          albumList: [],
      })
      this.AlbumQuery()
  }
    this.setData({
      menuList: [],
    })
    this.AlbumCookBook();
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  scrolltolower: function () {
    if (this.data.isOver) return
    this.setData({
      pageAlbumIndex: ++this.data.pageAlbumIndex
    })
    this.AlbumQuery();
  },
  onReachBottom: function () {
    if (this.data.cookIsOver) return
    this.setData({
      pageIndex: ++this.data.pageIndex
    })
    this.AlbumCookBook();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})