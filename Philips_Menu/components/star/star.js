// pages/components/foodlist/foodlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    star: {            // 属性名  
      type: Number,  
      // value: 1
      observer:function (newval, oldval) {
        if(newval==null) return;
      this.setData({
        fullStar: parseInt(newval/2),
        noneStar:parseInt((10-newval)/2),
        halfStar:(newval%2 ==0) ? 0:1
      })
      }
    },  
  },
  // observers: {
  //   'star' (val) {
  //     debugger
  //     if(val==null) return;
  //     // (num%2 ==0) ?"偶数":"奇数");
  //     this.setData({
  //       fullStar: parseInt(val/2),
  //       noneStar:parseInt((10-val)/2),
  //       halfStar:(val%2 ==0) ? 0:1
  //       // fullStar: parseInt(val),
  //       // noneStar:parseInt(5-val),
  //       // halfStar:val%1
  //     })
  //   }
  // },
  /**
   * 组件的初始数据
   */
  data: {
    fullStar:0,
    halfStar:0,
    noneStar:0
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
