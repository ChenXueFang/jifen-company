Vue.component('common-pie',{
    template:`<div style="width:140px;height:80px;" :id="echarts" class="echarts"></div>`,
  props: {
    // 父组件中使用时用 :chart-data
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    };
  },
  methods: {
    drawCharts() {
      var myChart = echarts.init(document.getElementById(this.echarts));
      myChart.setOption({
        // color: ["#ffb980", "#b6a2de"],
        color : [ '#d87a80', '#2b7dbc' ],
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.chartData, // 渲染每个图表对应的数据
            labelLine:{
                normal:{  
                    length:1  //饼图指示线长度
                }  
            }
          }
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