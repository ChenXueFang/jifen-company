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

    one:'',//用于判断第一个也就是1的显示，当为空就不显示，不为空就显示
    lastone:'show'//用于显示最后的数字，当为空的时候不显示，不为空的时候就显示
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
  // 点击第一页的,这个单独设置，就是点击显示的第一页
  clickone:function(){
    var that = this
    var onelist =  [{ //显示出来的页码,点击第一页的时候就是显示1，2，3这三个数字段
      ic: 1
    },
      {
        ic: 2
    },
      {
        ic: 3
    }
    ]
    that.setData({
      it:onelist,//赋值新的数字页码
      cur: 1, //让页数等于当前的页数，也就是第一页
      pageContent:1, //对应的内容指示也是一样
      lastone:'show',//显示最后的数字
      one:'',//隐藏第一个数字
      lastmore:'show',//显示右边的三个点
      premore:''//隐藏左边的三个点
    })
  },
  // 当点击最后一页的时候，那么就显示最后的三个数分别是all-2,all-1,all
  clicklastone:function(){
    var that = this
    var all = that.data.all//获取总页数
    var lastlist = [{ //当点击最后一个数字的时候就显示后三个页数
      ic: all-2
    },
    {
      ic:all-1
    },
    {
      ic: all
    }
    ]
    that.setData({
      it: lastlist,//赋值新的页数显示
      cur:all, //让页数等于当前的页数，也就是最后一页all
      pageContent:all, //对应的内容指示也是一样
      lastone: '',//定义的最后一个数字不显示
      one: 'show',//定义的第一个数字显示
      premore: 'show',//显示左边的三个点
      lastmore:''//右边的三个点消失
    })
  },
  // 点击右边的省略号
  lastMore: function () {
    var that = this
    var all = that.data.all //首先获取所有的页数来判断
    if(all>4){
      var it = that.data.it //获取这个显示的数据
      var arr = [] //定义一个空的 数组来存放新的内容
      for (var i = 0; i < it.length; i++) {
        var shownum = it[2].ic
      }
      var isnum = shownum + 1
      if (isnum >= all - 1 || isnum >= all - 2) { //新添加的是这里，判断当isnum大于总数减1，也就是10-1=9
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
          lastmore: '', //隐藏后面的三点
          one: 'show',//显示定义的第一页
          lastone: ''//当isnum大于总数减1或者减2的时候就要隐藏定义的最后一个数字，不然的话会出现两个最后一个值，不信你试试
        })
      } else {//下面是不大于总数的减三以内的
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
          one: 'show',//显示定义的第一页
          lastone: 'show'//显示定义的最后一页
        })
      }
    }else if(all==4){
      console.log('等于4')
      var newlist = [{
        ic:2
      }, {
          ic: 3
        }, {
          ic:4
        }] 
        that.setData({
          it:newlist,
          cur:4,
          pageContent:4,
          premore:'show',
          one:'',
          lastmore:'',
          lastone:''
        })
    }
   
  },
  // 点击左边的省略号
  preMore: function () {
    var that = this
    var all = that.data.all
    if(all>4){
      var islist = that.data.it
      var arr = []
      for (var i = 0; i < islist.length; i++) {
        var shownum = islist[0].ic
      }
      var isnum = shownum - 3
      if (isnum <= 1 || isnum <= 2) {//这是当isnum小于等于1或者2的时候显示
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
          lastmore: 'show',//显示右边的三点
          lastone: 'show',//显示自定义的最后一页
          one: ''//定义的第一页隐藏
        })
      } else {//下面是正常向左点击三点的情况
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
          lastmore: 'show',//显示左边的三点
          lastone: 'show',//显示最后的页数

        })
      }
    }else if(all==4){
      var prelist = [{
        ic: 1
      }, {
          ic: 2
        }, {
          ic: 3
        }]
      that.setData({
        it: prelist,
        cur: 1,
        pageContent: 1,
        premore: '',
        one:'',
        lastmore: 'show',//显示左边的三点
        lastone: '',//显示最后的页数
      })
    }
  },
  nextPage: function () { //点击下一页
    var that = this //这里就是可以设置也可以不设置，我只是用来区别，如果都用this的话会有警告，但不影响
    var all = that.data.all //首先获取所有的页数来判断
if(all>4){
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
      lastmore: 'show' ,
      lastone:'show',
      one:'show',//显示第一页
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
        lastone:'',
        
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
        lastone:''
      })
    }
  }
} else if (all == 4) {
  console.log('all等于四的操作')
    var num = that.data.cur //让num等于当前正在显示的页数，点击下一一页的时候数字进行加，每点击一次就加1
    num++
    that.setData({
      cur: num, //将页数赋值
      pageContent: num, //内容指示也赋值为num
    })
   
    if (num >= 4) {
      var list3 = [] //再另起一个空的数组，例如总页数为10，当大于10的时候就显示8，9，10这三个值，分别就是all-2,all-1,all
      list3.push({
        ic: all - 2
      }, {
          ic: all - 1
        }, {
          ic: all
        })
      that.setData({
        it:list3,
        cur:all,
        pageContent:all,
        premore: 'show',
        one: '',
        lastmore:''
      })
    }
  }else{//这是总数小于3的
  var num = that.data.cur //让num等于当前正在显示的页数，点击下一一页的时候数字进行加，每点击一次就加1
  num++
  that.setData({
    cur: num, //将页数赋值
    pageContent: num, //内容指示也赋值为num
  })

  if(num>=all){
    that.setData({
      cur: all, //将页数赋值
      pageContent: all, //内容指示也赋值为num
    })
  }
}

  
  },
  prePage: function () { //点击上一页，原理就与下一页的相反
    var that = this
    var all = that.data.all //获取总页数
    if(all>4){
      var num = that.data.cur //num获取当前显示的页数。用来点击的时候就开始减
      num--
      that.setData({
        cur: num,
        pageContent: num,
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
          lastmore: 'show', //显示后面的三个点
          lastone:'show'
        })
        if (num <= 3) {//这里要判断小于三的时候显示，小于三的时候就显示1，2，3这三个数字，并且cur和 pageContent为num，不能为3，不然会一直在3这里，下不去了
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
            cur: num,
            premore: '', //隐藏前面的三个点
            lastmore: 'show', //显示后面的三个点
            pageContent:num,
            lastone:'show',
            one: ''
          })
        }
        if (num<=1) { //如果减的数小于1，那么就显示1，2，3，当前页为1，内容的指示也为1，显示后面的三个点和最后一个数字，这里就要设置限制，当见到小于1的时候就不能往下减，一直在1
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
            pageContent: 1,
            one:''
          })
        }
      }
      // 单数设置总页数为4的时候点击上一页
      if (all <= 4) {
        console.log(num)
        that.setData({
          lastmore: '',
          one:'',
          premore:'show'
        })
      }
    } else if (all == 4) {
      var num = that.data.cur //让num等于当前正在显示的页数，点击下一一页的时候数字进行加，每点击一次就加1
      num--
      that.setData({
        cur: num, //将页数赋值
        pageContent: num, //内容指示也赋值为num
      })

      if (num <= 1) {
        var list3 = [] //再另起一个空的数组，例如总页数为10，当大于10的时候就显示8，9，10这三个值，分别就是all-2,all-1,all
        list3.push({
          ic: 1
        }, {
            ic: 2
          }, {
            ic: 3
          })
        that.setData({
          it: list3,
          cur: 1,
          pageContent: 1,
          premore: '',
          one: '',
          lastmore: 'show'
        })
      }
    }else{//总页数小于3的
      var num = that.data.cur //num获取当前显示的页数。用来点击的时候就开始减
      num--
      that.setData({
        cur: num, //减的值赋值给当前页数
        pageContent: num, //减的值赋值给当前的内容指示
      })
      if(num<= 1){
        that.setData({
          cur:1, //减的值赋值给当前页数
          pageContent:1, //减的值赋值给当前的内容指示
          lastmore:''
        })
      }
    }
   
  },
  onShow: function () {
    // 页面一加载将请求到的数据进行处理，获取当前页赋值到page或者请求到的总页赋值到all里面
    var that = this
    var all =5//总页数
   if(all>4){
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
         premore: '', //如果没有当前页，也就是显示第一页那么开始就要后面三个点的显示
         lastone: 'show'
       })
     }
     var cur = page;
     that.setData({
       cur: cur, //cur参数等于当前页或者第一页
       pageContent: page, //内容也一样等于当前页数
       all: all, //这是总页数
      //  lastone:'show'
     })
   
    
   } else if (all == 4) {

     var list3 = [{
       ic: 1
     }, {
       ic: 2
     }, {
       ic: 3
     },]
     that.setData({
       it: list3, //it是循环出来的页数，也是用来显示的
       premore: '', //premore这个参数是用来判断三个...的，大于三的时候，这个三个点就在第一位，也就是为空，为空第一位的三个点显示
       cur: 1,
       pageContent: 1,
       one: '',
       all:all,
       lastone: '',
       lastmore: 'show'
     })
   }else{//总页数小于3的
     console.log('页数小于3')
     that.setData({
       cur: 1, //cur参数等于当前页或者第一页
       pageContent:1, //内容也一样等于当前页数
       all: all, //这是总页数
       lastmore:'',
       lastone:''
     })

     if(all == 2){
       var list = [{ //显示出来的页码
         ic: 1
       },
       {
         ic: 2
       },]
       that.setData({
         it:list,
         cur: 1, //cur参数等于当前页或者第一页
         pageContent: 1, //内容也一样等于当前页数
         all: all, //这是总页数
         lastmore: ''
       })
     } else if (all == 1){
       var list = [{ //显示出来的页码
         ic: 1
       }]
       that.setData({
         it: list,
         cur: 1, //cur参数等于当前页或者第一页
         pageContent: 1, //内容也一样等于当前页数
         all: all, //这是总页数
         lastmore: ''
       })
     }
   }

   
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**


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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})