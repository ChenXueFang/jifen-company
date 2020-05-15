<template>
  <div class="home">
    <!-- 查询条件 -->
    <Row type="flex" align="middle" class="query-time">
      <i-col style="min-width:45px">时间：</i-col>
      <i-col style="min-width:200px">
        <DatePicker type="date" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
      </i-col>
      <i-col style="min-width:10px;margin:0 5px">至</i-col>
      <i-col style="min-width:200px;margin-right:10px">
        <DatePicker type="date" placeholder="请选择结束时间" style="width: 200px"></DatePicker>
      </i-col>
      <i-col>
        <Button type="primary">查询</Button>
      </i-col>
    </Row>
    <!-- 图表 -->
    <Row type="flex" align="middle" class="echarts-list">
      <!-- 图表1 -->
      <i-col span="8" class="echart-wrap">
        <i-col span="24" class="echart">
          <i-col span="24" class="line red"></i-col>
          <Row type="flex" justify="center" align="top" class="echart-info">
            <i-col span="8">
              <h1 class="member fontRed">1235</h1>
              <div class="title">会员人数</div>
            </i-col>
            <i-col span="6">
              <Dropdown trigger="hover">
                <a href="javascript:void(0)">
                  <Icon type="md-arrow-dropdown" color="#f31a45" size="18" />月增
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>周增</DropdownItem>
                  <DropdownItem>月增</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </i-col>
          </Row>
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div id="main1" ref="chart1"></div>
        </i-col>
        <i-col span="24" class="echart-details">
          <Row type="flex" justify="center" align="middle" style="width:100%">
            <i-col span="10" style="color:#666">每日新增会员人数</i-col>
            <i-col span="4">
              <span class="bold">120</span>人
            </i-col>
            <i-col span="10">
              <div style="color: #14cdbc;margin:0 0 12px 0">
                <span style="color:#666;">较前一日</span> +130人
              </div>
              <div style="color: #fc345b;">
                <span style="color:#666">较前一周</span> +130人
              </div>
            </i-col>
          </Row>
        </i-col>
      </i-col>

      <!-- 图表2 -->
      <i-col span="8" class="echart-wrap">
        <i-col span="24" class="echart">
          <i-col span="24" class="line yellow"></i-col>
          <Row type="flex" justify="center" align="top" class="echart-info">
            <i-col span="8">
              <h1 class="member fontYellow">1235</h1>
              <div class="title">新会员人数</div>
            </i-col>
            <i-col span="6">
              <Dropdown trigger="hover">
                <a href="javascript:void(0)">
                  <Icon type="md-arrow-dropdown" color="#f31a45" size="18" />月增
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>周增</DropdownItem>
                  <DropdownItem>月增</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </i-col>
          </Row>
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div id="main1" ref="chart2"></div>
        </i-col>
        <i-col span="24" class="echart-details">
          <Row type="flex" justify="center" align="middle" style="width:100%">
            <i-col span="10" style="color:#666">每日新增新会员人数</i-col>
            <i-col span="4">
              <span class="bold">230</span>人
            </i-col>
            <i-col span="10">
              <div style="color: #14cdbc;margin:0 0 12px 0">
                <span style="color:#666;">较前一日</span> +60人
              </div>
              <div style="color: #fc345b;">
                <span style="color:#666">较前一周</span> +100人
              </div>
            </i-col>
          </Row>
        </i-col>
      </i-col>

      <!-- 图表3 -->
      <i-col span="8" class="echart-wrap">
        <i-col span="24" class="echart">
          <i-col span="24" class="line blue"></i-col>
          <Row type="flex" justify="center" align="top" class="echart-info">
            <i-col span="8">
              <h1 class="member fontYellow">12325</h1>
              <div class="title">参与互动人数</div>
            </i-col>
            <i-col span="6">
              <Dropdown trigger="hover">
                <a href="javascript:void(0)">
                  <Icon type="md-arrow-dropdown" color="#f31a45" size="18" />月增
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>周增</DropdownItem>
                  <DropdownItem>月增</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </i-col>
          </Row>
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div id="main1" ref="chart3"></div>
        </i-col>
        <i-col span="24" class="echart-details">
          <Row type="flex" justify="center" align="middle" style="width:100%">
            <i-col span="10" style="color:#666">每日新增参与互动人数</i-col>
            <i-col span="4">
              <span class="bold">200</span>人
            </i-col>
            <i-col span="10">
              <div style="color: #14cdbc;margin:0 0 12px 0">
                <span style="color:#666;">较前一日</span> +80人
              </div>
              <div style="color: #fc345b;">
                <span style="color:#666">较前一周</span> +120人
              </div>
            </i-col>
          </Row>
        </i-col>
      </i-col>
    </Row>
    <!-- 热门排行 -->
    <Row type="flex" justify="center" align="middle" class="hot-wrap">
      <i-col span="24" class="title">热门H5互动排行</i-col>
      <i-col span="24" class="hot-list">
        <Row type="flex" justify="center" align="middle" style="width:100%">
          <i-col span="2" style="color:#666">
            Top
            <span class="rank circle red">1</span>
          </i-col>
          <i-col span="4">装盘抽奖活动</i-col>
          <i-col span="6">
            累计新增会员人数
            <span class="bold">180</span>人
          </i-col>
          <i-col span="6">
            累计参与互动人数
            <span class="bold">180</span>人
          </i-col>
          <i-col span="6">
            累计使用次数
            <span class="bold">180</span>人
          </i-col>
        </Row>
      </i-col>
      <i-col span="24" class="hot-list">
        <Row type="flex" justify="center" align="middle" style="width:100%">
          <i-col span="2" style="color:#666">
            Top
            <span class="rank circle yellow">2</span>
          </i-col>
          <i-col span="4">装盘抽奖活动</i-col>
          <i-col span="6">
            累计新增会员人数
            <span class="bold">180</span>人
          </i-col>
          <i-col span="6">
            累计参与互动人数
            <span class="bold">180</span>人
          </i-col>
          <i-col span="6">
            累计使用次数
            <span class="bold">180</span>人
          </i-col>
        </Row>
      </i-col>
      <i-col span="24" class="hot-list">
        <Row type="flex" justify="center" align="middle" style="width:100%">
          <i-col span="2" style="color:#666">
            Top
            <span class="rank circle blue">3</span>
          </i-col>
          <i-col span="4">装盘抽奖活动</i-col>
          <i-col span="6">
            累计新增会员人数
            <span class="bold">180</span>人
          </i-col>
          <i-col span="6">
            累计参与互动人数
            <span class="bold">180</span>人
          </i-col>
          <i-col span="6">
            累计使用次数
            <span class="bold">180</span>人
          </i-col>
        </Row>
      </i-col>
      <i-col span="24" class="hot-list">
        <Row type="flex" justify="center" align="middle" style="width:100%">
          <i-col span="2" style="color:#666">
            Top
            <span class="rank">4</span>
          </i-col>
          <i-col span="4">装盘抽奖活动</i-col>
          <i-col span="6">
            累计新增会员人数
            <span class="bold">180</span>人
          </i-col>
          <i-col span="6">
            累计参与互动人数
            <span class="bold">180</span>人
          </i-col>
          <i-col span="6">
            累计使用次数
            <span class="bold">180</span>人
          </i-col>
        </Row>
      </i-col>
    </Row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.initCharts();
    });
    window.addEventListener("resize", () => {
      this.initCharts();
    });
  },
  created() {},
  methods: {
    initCharts() {
      let myChart1 = this.$echarts.init(this.$refs.chart1);
      let myChart2 = this.$echarts.init(this.$refs.chart2);
      let myChart3 = this.$echarts.init(this.$refs.chart3);
      // 绘制图表1
      var option1 = {
        title: { text: "" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          show: false //隐藏坐标轴
        },
        yAxis: {
          type: "value",
          show: false //隐藏坐标轴
        },
        series: [
          {
            data: [120, 240, 300, 500, 100, 600, 800, 300, 200, 1000],
            type: "line", //折线图
            symbol: "circle", //折线点设置为实心点
            smooth: true,
            itemStyle: {
              normal: {
                color: "#F41D47", //改变折线点的颜色
                lineStyle: {
                  color: "#F41D47" //改变折线颜色
                }
              }
            }
          }
        ]
      };
      // 绘制图表2
      var option2 = {
        title: { text: "" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          show: false //隐藏坐标轴
        },
        yAxis: {
          type: "value",
          show: false //隐藏坐标轴
        },
        series: [
          {
            data: [120, 240, 500, 800, 100, 600, 500, 300, 200, 1000],
            type: "line", //折线图
            symbol: "circle", //折线点设置为实心点
            smooth: true,
            itemStyle: {
              normal: {
                color: "#FFCA6B", //改变折线点的颜色
                lineStyle: {
                  color: "#FFCA6B" //改变折线颜色
                }
              }
            }
          }
        ]
      };
      // 绘制图表3
      var option3 = {
        title: { text: "" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          show: false //隐藏坐标轴
        },
        yAxis: {
          type: "value",
          show: false //隐藏坐标轴
        },
        series: [
          {
            data: [120, 200, 300, 500, 800, 100, 800, 200, 200, 900],
            type: "line", //折线图
            symbol: "circle", //折线点设置为实心点
            smooth: true,
            itemStyle: {
              normal: {
                color: "#1FB7F1", //改变折线点的颜色
                lineStyle: {
                  color: "#1FB7F1" //改变折线颜色
                }
              }
            }
          }
        ]
      };
      myChart1.setOption(option1, true);
      myChart2.setOption(option2, true);
      myChart3.setOption(option3, true);
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.initCharts);
    // 销毁 Echarts 实例
    this.$echarts.init(this.$refs.chart1).dispose();
    this.$echarts.init(this.$refs.chart2).dispose();
  }
};
</script>

<style lang="less" scoped>
.home {
  .bold {
    color: #333;
    font-weight: 600;
    font-size: 16px;
    margin: 0 5px;
  }
  .query-time {
    flex-wrap: wrap;
  }
  .echarts-list {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    margin: 20px 0 0 0;
    .echart-wrap {
      width: 32.5%;
      min-width: 320px;
      height: auto;
      margin-bottom: 20px;
      position: relative;
      .line {
        height: 6px;
        border-radius: 3px;
      }
      .echart-info {
        width: 100%;
        justify-content: space-between;
        position: relative;
        left: 0;
        top: 20px;
        .title {
          color: #666;
          font-size: 14px;
          margin-top: 5px;
        }
        .fontRed {
          font-size: 22px;
          color: #f31a45;
        }
        .fontYellow {
          font-size: 22px;
          color: #ffc55b;
        }
        .fontBlue {
          font-size: 22px;
          color: #38c5fa;
        }
      }
      .echart,
      .echart-details {
        width: 100%;
        height: 220px;
        background-color: #ffffff;
        box-shadow: 0px 6px 8px 0px rgba(6, 15, 53, 0.05);
        border-radius: 10px;
        #main1 {
          width: 100%;
          min-width: 320px;
          height: 190px;
          margin: -10px auto 0;
        }
      }
      .echart-details {
        height: 85px;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        .ive-col {
          height: 100%;
        }
      }
    }
  }
  .hot-wrap {
    .title {
      color: #333333;
      font-size: 18px;
      line-height: 30px;
      text-align: left;
    }
    .hot-list {
      width: 100%;
      min-width: 600px;
      height: 60px;
      background-color: #ffffff;
      box-shadow: 0px 6px 8px 0px rgba(6, 15, 53, 0.05);
      border-radius: 10px;
      display: flex;
      margin-bottom: 10px;
      .rank {
        display: inline-block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: solid 1px #999999;
        color: #999;
        line-height: 22px;
        text-align: center;
        margin-left: 10px;
      }
      .circle {
        color: #fff;
        border: none;
        font-style: italic;
        font-weight: 600;
        font-size: 16px;
      }
    }
  }

  .red {
    background-image: linear-gradient(0deg, #ff4569 0%, #f31944 100%);
    box-shadow: 0px 5px 9px 0px rgba(243, 26, 69, 0.24);
  }
  .yellow {
    background-image: linear-gradient(0deg, #ffcd73 0%, #ffb838 100%);
    box-shadow: 0px 5px 9px 0px rgba(255, 171, 19, 0.24);
  }
  .blue {
    background-image: linear-gradient(0deg, #45ccff 0%, #1fb8f1 100%);
    box-shadow: 0px 5px 9px 0px rgba(31, 183, 241, 0.24);
  }
  a {
    color: #666 !important;
  }
}
</style>
