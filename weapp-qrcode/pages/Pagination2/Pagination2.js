Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur: '', //当前页码,
    lastmore: 'show', //来控制后面的三个点，当为show的时候就显示，开始的时候就显示
    premore: '', //这里我另premore来控制前面的三个点
    pageContent: '', //分页内容
    it: [{ //显示出来的页码
      ic: 1
    },
    {
      ic: 2
    },
    {
      ic: 3
    }
    ],
  },

  // 分页, 点击页码，匹配内容
  clickPage: function (e) { //点击页数
    var that = this
    var pageContent = e.currentTarget.dataset.ic //获取当前点击的数字
    that.setData({
      cur: e.currentTarget.dataset.ic, //让页数等于当前的页数
      pageContent: pageContent, //对应的内容指示也是一样
    })
  },
  // 点击右边的省略号
  lastMore: function () {
    var that = this
    var all = that.data.all //首先获取所有的页数来判断
    var it = that.data.it //获取这个显示的数据
    var arr = [] //定义一个空的 数组来存放新的内容
    for (var i = 0; i < it.length; i++) {
      var shownum = it[2].ic
    }
    var isnum = shownum + 1
    if (isnum >= all - 1) { //新添加的是这里，判断当isnum大于总数减1，也就是10-1=9
      arr.push({
        ic: all - 2
      }, {
          ic: all - 1
        }, {
          ic: all
        }) //然后就存入新数组
      that.setData({
        it: arr,
        cur: all - 2, //当大于了总数就固定显示的数字背景颜色为all-2=8
        pageContent: all - 2, //当大于了总数就固定显示的内容为all-2=8内容8
        premore: 'show', //显示前面的三点
        lastmore: '' //隐藏后面的三点
      })
    } else {
      arr.push({
        ic: isnum
      }, {
          ic: isnum + 1
        }, {
          ic: isnum + 2
        })
      that.setData({
        it: arr,
        cur: isnum,
        pageContent: isnum,
        premore: 'show'
      })
    }
  },
  // 点击左边的省略号
  preMore: function () {
    var that = this
    var islist = that.data.it
    var arr = []
    for (var i = 0; i < islist.length; i++) {
      var shownum = islist[0].ic
    }
    var isnum = shownum - 3
    if (isnum <= 1) {
      arr.push({
        ic: 1
      }, {
          ic: 2
        }, {
          ic: 3
        })
      that.setData({
        it: arr,
        cur: 3,
        pageContent: 3,
        premore: '',
        lastmore: 'show',
      })
    } else {
      arr.push({
        ic: isnum
      }, {
          ic: isnum + 1
        }, {
          ic: isnum + 2
        })
      that.setData({
        it: arr,
        cur: isnum,
        pageContent: isnum,
        premore: 'show',
        lastmore: 'show'
      })
    }
  },
  nextPage: function () { //点击下一页
    var that = this //这里就是可以设置也可以不设置，我只是用来区别，如果都用this的话会有警告，但不影响
    var all = that.data.all //首先获取所有的页数来判断
    var num = that.data.cur //让num等于当前正在显示的页数，点击下一一页的时候数字进行加，每点击一次就加1
    num++
    that.setData({
      cur: num, //将页数赋值
      pageContent: num, //内容指示也赋值为num
    })
    // 判断省略号的显示
    if (num > 3) { //也就是当数字加到4以上
      var list = [] //定义一个空的数组用来存放大于3过后的三个新的数字
      list.push({
        ic: num - 1
      }, {
          ic: num
        }, {
          ic: num + 1
        }) //将这新的三个值push到新的数组里面
      that.setData({
        it: list, //然后将默认的循环的内容赋值为新的数组
        premore: 'show', //设置premore参数为show，则显示前面的三个点
        lastmore: 'show' //设置more参数为show，则显示后面的三个点
      })
      if (num == all || num == all - 2 || num == all - 1) { //如果加的数字大于了总页数
        var list2 = [] //再另起一个空的数组，例如总页数为10，当大于10的时候就显示8，9，10这三个值，分别就是all-2,all-1,all
        list2.push({
          ic: all - 2
        }, {
            ic: all - 1
          }, {
            ic: all
          })
        that.setData({
          it: list2, //将新的数组赋值到原来默认的内容里面
          cur: num, //当前页就是总页，也就是举例的10
          premore: 'show', //premore参数为空，显示前面的三个点
          lastmore: '', //more参数为空，不显示后面的三个点
          pageContent: num, //让内容的指示参数也等于总页数
        })
      }

      if (num >= all) { //如果加的数字大于了总页数
        var list3 = [] //再另起一个空的数组，例如总页数为10，当大于10的时候就显示8，9，10这三个值，分别就是all-2,all-1,all
        list3.push({
          ic: all - 2
        }, {
            ic: all - 1
          }, {
            ic: all
          })
        that.setData({
          it: list3, //将新的数组赋值到原来默认的内容里面
          cur: all, //当前页就是总页，也就是举例的10
          premore: 'show', //premore参数为空，显示前面的三个点
          lastmore: '', //more参数为空，不显示后面的三个点
          pageContent: all, //让内容的指示参数也等于总页数
        })
      }


    }
  },
  prePage: function () { //点击上一页，原理就与下一页的相反
    var that = this
    var all = that.data.all //获取总页数
    var num = that.data.cur //num获取当前显示的页数。用来点击的时候就开始减
    num--
    that.setData({
      cur: num, //减的值赋值给当前页数
      pageContent: num, //减的值赋值给当前的内容指示
    })
    if (num <= all - 3) { //判断如果页数小于等于总页数减3，比如总页数为10，就小于等于7的时候那么就显示7，8，9
      var list = []
      list.push({
        ic: num
      }, {
          ic: num + 1
        }, {
          ic: num + 2
        })
      that.setData({
        it: list,
        premore: 'show', //隐藏前面的三个点
        lastmore: 'show' //显示后面的三个点
      })
      if (num <= 1) { //如果减的数小于1，那么就显示1，2，3，当前页为1，内容的指示也为1，显示后面的三个点
        var list2 = []
        list2.push({
          ic: 1
        }, {
            ic: 2
          }, {
            ic: 3
          })
        that.setData({
          it: list2,
          cur: 1,
          premore: '', //隐藏前面的三个点
          lastmore: 'show', //显示后面的三个点
          pageContent: 1
        })
      }
    }
  },
  onShow: function () {
    // 页面一加载将请求到的数据进行处理，获取当前页赋值到page或者请求到的总页赋值到all里面
    var that = this
    var all = 10 //总页数
    var page = 1 //当前页数
    if (page > 3) { //如果椅开始就显示的不是第一页而大于第三页的来显示就执行这里
      var list3 = [{
        ic: page
      }, {
        ic: page + 1
      }, {
        ic: page + 2
      },]
      that.setData({
        it: list3, //it是循环出来的页数，也是用来显示的
        premore: '', //premore这个参数是用来判断三个...的，大于三的时候，这个三个点就在第一位，也就是为空，为空第一位的三个点显示
      })
    } else {
      that.setData({
        premore: '' //如果没有当前页，也就是显示第一页那么开始就要后面三个点的显示
      })
    }
    var cur = page;
    that.setData({
      cur: cur, //cur参数等于当前页或者第一页
      pageContent: page, //内容也一样等于当前页数
      all: all, //这是总页数
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**


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
  onShareAppMessage: function() {

  }
})