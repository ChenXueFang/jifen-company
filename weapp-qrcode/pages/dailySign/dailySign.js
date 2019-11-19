// pages/signIn/dailyCheck/dailyCheck.js
const app = getApp()

const util = require("../../utils/util.js")
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

// var urlImg = wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: ['upload/pointimg/signIn_signBg.png', 'upload/pointimg/signIn_star.png', 'upload/pointimg/signIn_giftBox.png', 'upload/pointimg/sign_medal10.png', 'upload/pointimg/sign_medal20.png', 'upload/pointimg/sign_medal30.png', 'upload/pointimg/sign_medal40.png', 'upload/pointimg/sign_medal11.png', 'upload/pointimg/sign_medal21.png', 'upload/pointimg/sign_medal31.png', 'upload/pointimg/sign_medal41.png', 'upload/pointimg/sign_medal50.png', 'upload/pointimg/sign_medal60.png', 'upload/pointimg/sign_medal70.png', 'upload/pointimg/sign_medal80.png', 'upload/pointimg/sign_medal51.png', 'upload/pointimg/sign_medal61.png', 'upload/pointimg/sign_medal71.png', 'upload/pointimg/sign_medal81.png', 'upload/pointimg/sign_reward.png'],
    currentTab: 1,
    isHidd: true, //签到动画隐藏
    isHidd2: true, //签到动画隐藏
    today: new Date().getDate(), //获取今天的日期
    buSuccessModal: false, //补签成功弹窗
    buQianModal: false, //是否补签弹窗
    noCardModal: false, //补签卡不足弹窗
    successModal: false, //签到成功弹窗,
    cardNum: 1, //补签卡的数量
    signUrl: "../../../images/",
    signImg: "clickSignin.png",

    // 日历
    year: new Date().getFullYear(), // 当前年份
    month: new Date().getMonth() + 1, // 当前月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()], // 月份字符串
    demo6_days_style: [],
    pickerYear: "", //时间选择器，选择年月
    pickerMonth: "",
    clickYear: "", //点击日历，所选日期的年月
    clickMonth: "",
    clickDay: "", //选中
    clickDay_No: "", //选中漏签日期

    // 签到数据
    signedDays: [1, 2, 3, 4, 5, 6, 7],
    noSignedDays: [8, 9],
    noSigned_Day: "",
    signed_Day: "",

    // 分页
    all: "", //总页数
    cur: '', //当前页码,
    lastmore: 'show', //来控制后面的三个点，当为show的时候就显示，开始的时候就显示
    premore: '', //这里我另premore来控制前面的三个点
    pageContent: '', //分页内容
    one: '',//用于判断第一个也就是1的显示，当为空就不显示，不为空就显示
    lastone: 'show',//用于显示最后的数字，当为空的时候不显示，不为空的时候就显示
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

    // 时间轴
    datalist: [{
        day: '今天',
        sign: 1,
        start: 1,
        ten: 1,
        thirty: 1,
        card: 1
      },
      {
        day: '昨天',
        sign: 1,
        start: 1,
        ten: 1,
        thirty: 1,
        card: 0
      },
      {
        day: '9/27',
        sign: 1,
        start: 1,
        ten: 1,
        thirty: 0,
        card: 0
      },
      {
        day: '9/26',
        sign: 1,
        start: 1,
        ten: 1,
        thirty: 1,
        card: 0
      },
      {
        day: '9/25',
        sign: 1,
        start: 0,
        ten: 1,
        thirty: 0,
        card: 0
      },
      {
        day: '9/24',
        sign: 0,
        start: 0,
        ten: 0,
        thirty: 0,
        card: 0
      },
      {
        day: '9/23',
        sign: 1,
        ten: 1,
        thirty: 0,
        card: 0
      },
    ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getEventLog(108)  //每日签到页面
    this.calender(); //日历
    this.pagination(); //总页数

    // this.setData({
    //   urlImg: wx.getStorageSync("apiImgurl") == '' ? setting.setting.defaultImgUrl : wx.getStorageSync("apiImgurl")
    // })

  },
  onShow: function () {

  },

  // 点击签到, 五角星图片
  clickSign: function() {
    var that = this;
    var styleList = this.data.demo6_days_style
    var today = new Date().getDate(); //获取当前日期

    // 点击签到，只能是今天
    if (this.data.signImg == "clickSignin.png") {
      // 点击今天的日期，则clickYear有值，如果时间选择器切换了日期，需要将clickYear清空
      if (this.data.pickerYear == this.data.clickYear && this.data.pickerMonth== this.data.clickMonth){
        this.setData({
          clickYear:"",
          clickMonth: "",
          clickDay: "",
        })
      }
      // 1.一开始直接点击签到,没有时间选择器，没有点击日历；2.点击日期选中的年月日和今天相等；3.时间选择器的年月和今天相等
      if (this.data.clickYear == this.data.year && this.data.clickMonth == this.data.month && this.data.clickDay == this.data.day || this.data.pickerYear == this.data.year && this.data.pickerMonth == this.data.month || this.data.pickerYear == "" && this.data.clickYear == "") {
        app.getEventLog(111) // 点击签到按钮
        styleList.push({
          month: 'current',
          day: this.data.day,
          color: 'white',
          background: '#cd81cd'
        });
        this.setData({
          demo6_days_style: styleList,
          signImg: "alreadySign.png",
        });
        this.animation();
      }
    }
    // 点击'补签'，弹出是否补签的弹框
    else if (this.data.signImg == "buQian.png") {
      this.setData({
        buQianModal: true
      })
    }
  },
  // 点击日历某一天
  dayClick: function(e) {
    // 选中日期的年月日
    var clickYear = e.detail.year;
    var clickMonth = e.detail.month;
    var clickDay = e.detail.day;
    this.setData({
      clickYear: clickYear,
      clickMonth: clickMonth,
      clickDay: clickDay
    })
    this.calender(); //调日历方法，解决出现多个选中状态问题
    var today = new Date().getDate(); //当前日期
    var clickStyle = this.data.demo6_days_style //选中样式
    // 选中漏签日期
    if (this.data.noSignedDays && this.data.noSignedDays.length > 0) {
      var noSigned_Day = this.data.noSignedDays.filter((a) => {
        return a == e.detail.day
      })[0]
    }
    // 选中签到日期
    if (this.data.signedDays && this.data.signedDays.length > 0) {
      var signed_Day = this.data.signedDays.filter((a) => {
        return a == e.detail.day
      })[0]
    }
    this.setData({
      noSigned_Day: noSigned_Day, //选中漏签日期
      signed_Day: signed_Day, //选中签到日期
    })

    // 点击到漏签日期，显示'补签' 
    if (noSigned_Day) {
      clickStyle.push({
        month: 'current',
        day: e.detail.day,
        color: 'white',
        background: '#df3838'
      });
      this.setData({
        signImg: "buQian.png",
        clickDay_No: e.detail.day //选中没有签到的日期
      });
    }

    // 选中今天，没有签到就显示'点击签到'，签了就不能再选中  alreadySign
    // 选中日期的年月日和今天相等
    if (clickYear == this.data.year && clickMonth == this.data.month && clickDay == this.data.day && signed_Day != this.data.day) {
      clickStyle.push({
        month: 'current',
        day: e.detail.day,
        color: 'white',
        background: '#888'
      });
      this.setData({
        signImg: "clickSignin.png",
        clickDay: e.detail.day //选中当前的日期
      });
    }

    this.setData({
      demo6_days_style: clickStyle
    });
  },
  // 日历时间选择器picker
  dateChange: function(e) {
    // 时间选择器重新赋值年月
    this.setData({
      pickerMonth: e.detail.currentMonth,
      pickerYear: e.detail.currentYear,
    })
    if (e.detail.currentMonth || e.detail.currentYear){
      app.getEventLog(113)
    }
    this.calender();
  },
  // 日历
  calender: function() {
    let demo6_days_style = new Array;
    // 当前月样式
    const days_count = new Date(this.data.year, this.data.month, 0).getDate(); //获取日期，获取某年某月某一天的日期
    for (let i = 1; i <= days_count; i++) {
      demo6_days_style.push({
        month: 'current',
        day: i,
        color: 'white',
        background: '#cdcbce'
      });
    }
    // 前一月样式
    const predays_count = new Date(this.data.year, this.data.month - 1, 0).getDate();
    for (let j = 1; j <= predays_count; j++) {
      demo6_days_style.push({
        month: 'prev',
        day: j,
        color: 'white',
        background: '#efefef'
      });
    }
    // 下一月样式
    const nextdays_count = new Date(this.data.year, this.data.month + 1, 0).getDate();
    for (let k = 1; k <= nextdays_count; k++) {
      demo6_days_style.push({
        month: 'next',
        day: k,
        color: 'white',
        background: '#efefef'
      });
    }

    // 已签到样式signedDays
    var signedDays = this.data.signedDays;
    if (signedDays && signedDays.length > 0) {
      for (let s = 0; s <= signedDays.length + 1; s++) {
        demo6_days_style.push({
          month: 'current',
          day: signedDays[s],
          color: 'white',
          background: '#cd81cd'
        })
        //筛选今日签到日期，值存在，显示‘您已签到’；值不存在，显示‘点击签到’
        var todaySign = signedDays.filter((a) => {
          return a == this.data.today
        })[0]; 
        if (todaySign) {
          this.setData({
            signImg: "alreadySign.png", //签到了显示‘您已签到’
          })
        } else {
          this.setData({
            signImg: "clickSignin.png", //没签到显示‘点击签到’
          })
        }
      }
    }
    
    // 漏签样式noSignedDays
    var noSignedDays = this.data.noSignedDays;
    if (noSignedDays && noSignedDays.length > 0) {
      for (let n = 0; n <= noSignedDays.length + 1; n++) {
        demo6_days_style.push({
          month: 'current',
          day: noSignedDays[n],
          color: 'white',
          background: '#f86977'
        })
      }
    }

    this.setData({
      demo6_days_style
    });
  },

  // 签到成功动画
  animation() {
    var that = this;
    // 点击签到，第一个动画，加十分星星奖励
    this.setData({
      isHidd: false, //让+10星星显示
    });
    // 延迟出现，第二个动画，星星奖励
    setTimeout(function () {
      that.setData({
        isHidd2: false,
      })
    }, 2000)
    // 重复触发动画, 将isHidd，isHidd2 的值复原
    setTimeout(function () {
      if (that.data.isHidd == false || that.data.isHidd2 == false){
      that.setData({
        isHidd:true,
        isHidd2:true
      })
    }
    }, 3000)
  },

  // 分页, 点击页码，匹配内容
  clickPage: function (e) { //点击页数
    var that = this
    that.setData({
      cur: e.currentTarget.dataset.ic, //让页数等于当前的页数
      pageContent: e.currentTarget.dataset.ic, //对应的内容指示也是一样
    })
  },
  // 点击第一页的,这个单独设置，就是点击显示的第一页
  clickone: function () {
    var that = this
    var onelist = [{ //显示出来的页码,点击第一页的时候就是显示1，2，3这三个数字段
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
      it: onelist,//赋值新的数字页码
      cur: 1, //让页数等于当前的页数，也就是第一页
      pageContent: 1, //对应的内容指示也是一样
      lastone: 'show',//显示最后的数字
      one: '',//隐藏第一个数字
      lastmore: 'show',//显示右边的三个点
      premore: ''//隐藏左边的三个点
    })
  },
  // 当点击最后一页的时候，那么就显示最后的三个数分别是all-2,all-1,all
  clicklastone: function () {
    var that = this
    var all = that.data.all//获取总页数
    var lastlist = [{ //当点击最后一个数字的时候就显示后三个页数
      ic: all - 2
    },
    {
      ic: all - 1
    },
    {
      ic: all
    }
    ]
    that.setData({
      it: lastlist,//赋值新的页数显示
      cur: all, //让页数等于当前的页数，也就是最后一页all
      pageContent: all, //对应的内容指示也是一样
      lastone: '',//定义的最后一个数字不显示
      one: 'show',//定义的第一个数字显示
      premore: 'show',//显示左边的三个点
      lastmore: ''//右边的三个点消失
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
  },
  nextPage: function () { //点击下一页
    var that = this //这里就是可以设置也可以不设置，我只是用来区别，如果都用this的话会有警告，但不影响
    var all = that.data.all //首先获取所有的页数来判断
    if (all > 3) {
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
          lastmore: 'show',
          lastone: 'show',
          one: 'show',//显示第一页
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
            lastone: '',
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
            lastone: ''
          })
        }


      }
    } else {//这是总数小于3的
      var num = that.data.cur //让num等于当前正在显示的页数，点击下一一页的时候数字进行加，每点击一次就加1
      num++
      that.setData({
        cur: num, //将页数赋值
        pageContent: num, //内容指示也赋值为num
      })

      if (num >= all) {
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
    if (all > 3) {
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
          lastone: 'show'
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
            pageContent: num,
            lastone: 'show',
            one: ''
          })
        }
        if (num <= 1) { //如果减的数小于1，那么就显示1，2，3，当前页为1，内容的指示也为1，显示后面的三个点和最后一个数字，这里就要设置限制，当见到小于1的时候就不能往下减，一直在1
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
            one: ''
          })
        }
      }
    } else {//总页数小于3的
      var num = that.data.cur //num获取当前显示的页数。用来点击的时候就开始减
      num--
      that.setData({
        cur: num, //减的值赋值给当前页数
        pageContent: num, //减的值赋值给当前的内容指示
      })
      if (num <= 1) {
        that.setData({
          cur: 1, //减的值赋值给当前页数
          pageContent: 1, //减的值赋值给当前的内容指示
          lastmore: ''
        })
      }
    }

  },
  //加载总页数
  pagination: function () {
    // 页面一加载将请求到的数据进行处理，获取当前页赋值到page或者请求到的总页赋值到all里面
    var that = this
    var all = 4//总页数
    if (all > 3) {
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
    } else {//总页数小于3的
      that.setData({
        cur: 1, //cur参数等于当前页或者第一页
        pageContent: 1, //内容也一样等于当前页数
        all: all, //这是总页数
        lastmore: '',
        lastone: ''
      })

      if (all == 2) {
        var list = [{ //显示出来的页码
          ic: 1
        },
        {
          ic: 2
        },]
        that.setData({
          it: list,
          cur: 1, //cur参数等于当前页或者第一页
          pageContent: 1, //内容也一样等于当前页数
          all: all, //这是总页数
          lastmore: ''
        })
      } else if (all == 1) {
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

  // 签到规则
  toSignInRules() {
    wx.navigateTo({
      url: '../signInRules/signInRules',
    })
  },
  //返回
  toMyFam: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  //tab点击切换
  clickTab: function(e) {
    if (this.data.currentTab==0){
      app.getEventLog(109)  //今日签到按钮
    }
    if (this.data.currentTab == 1) {
      app.getEventLog(110)  //历史奖励按钮
    }
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  // 弹出框蒙层截断touchmove事件
  preventTouchMove: function() {},
  //隐藏模态对话框
  hideModal: function() {
    this.setData({
      buSuccessModal: false,
      buQianModal: false,
      noCardModal: false,
      successModal: false,
    });
  },
  //对话框取消按钮点击事件
  onCancel: function() {
    this.hideModal();
  },
  onCancel2: function() {
    this.hideModal();
    this.animation(); //补签成功出现奖励星星动画
  },
  //对话框确认按钮点击事件
  onConfirm: function() {
    var cardNum = this.data.cardNum;
    // 有补签时，补签成功弹窗
    if (cardNum != 0) {
      app.getEventLog(112)  //补签按钮
      var styleList = this.data.demo6_days_style
      var clickDay_No = this.data.clickDay_No; //选中日期
      styleList.push({
        month: 'current',
        day: clickDay_No,
        color: 'white',
        background: '#cd81cd'
      });
      this.setData({
        demo6_days_style: styleList,
        signImg: "alreadySign.png",
        buQianModal: false,
        buSuccessModal: true
      });
    }
    //无补签卡时，补签卡不足弹窗
    else {
      var styleList = this.data.demo6_days_style
      var clickDay_No = this.data.clickDay_No; //选中日期
      styleList.push({
        month: 'current',
        day: clickDay_No,
        color: 'white',
        background: '#df3838'
      });
      this.setData({
        demo6_days_style: styleList,
        signImg: "buQian.png",
        buQianModal: false,
        noCardModal: true
      });
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