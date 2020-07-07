Vue.component('common-line2',{
    template:`<div style="width:430px;height:80px;" :id="echartid" class="echarts" ></div>`,
  props: {
    // 父组件中使用时用 :chart-data
    ychartData1: {
      type: Array,
      default: () => []
    },
    ychartData2: {
      type: Array,
      default: () => []
    },
    xchartData: {
      type: Array,
      default: () => []
    },
    ids:String
  },
  data() {
    return {
       echartid:this.ids
    };
  },
  methods: {
    drawCharts() {
      var myChart = echarts.init(document.getElementById(this.echartid));
      myChart.setOption({
        legend: {
          data: ['OIT', 'Sales']
        },
        xAxis: {
            type: 'category', //类目
            data: this.xchartData
        },
        yAxis: {
            type: 'value',
            minInterval: 50, //刻度间隔
            // axisLabel: {
            //   formatter: '{value} %'
            // },
        },
        series: [
          {
            name: 'OIT',
            type: 'line', //折线
            smooth: true, //平滑
            data: this.ychartData1, //y值
            seriesLayoutBy: 'row' //多个数据，行显示
          },
          {name: 'Sales', type: 'line', smooth: true, data: this.ychartData2, seriesLayoutBy: 'row'},
        ]
      });
    }
  },
  computed: {
    echarts() {
      return 'echarts' + Math.random() * 100000;
    }
  },
  mounted() {
    this.drawCharts();
  }
});