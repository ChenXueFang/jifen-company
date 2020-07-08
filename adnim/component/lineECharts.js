Vue.component('common-line',{
    template:`<div style="width:400px;height:80px;" :id="echartid" class="echarts" ></div>`,
  props: {
    // 父组件中使用时用 :chart-data
    ychartData: {
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
        xAxis: {
            type: 'category', //类目
            data: this.xchartData
        },
        yAxis: {
            type: 'value',
            minInterval: 50, //刻度间隔
            axisLabel: {
              formatter: '{value} %'
            },
        },
        series: [{
            data: this.ychartData, // 渲染每个图表对应的数据 [-0.1, -0.8, -0.4, -1, 0, 0.3, 1, 0.8],
            type: 'line', // 折线
            // 是否平滑曲线显示。
            smooth: true
        }]
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