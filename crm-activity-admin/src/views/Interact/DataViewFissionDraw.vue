<template>
  <div class="DataViewFissionDraw">
    <div style="background-color:#FFF;">
      <div class="PrizesInput">
        <Row type="flex" align="middle" style="margin-bottom:20px">
          <i-col style="min-width:65px">用户ID</i-col>
          <i-col style="min-width:200px">
            <Input placeholder="请输入用户ID" style="width: 200px" v-model="usid" />
          </i-col>
          <i-col style="min-width:65px">Uuid</i-col>
          <i-col style="min-width:200px">
            <Input placeholder="请输入第三方Uid" style="width: 200px" v-model="uuid" />
          </i-col>
          <i-col style="min-width:45px;margin-left:15px">时间：</i-col>
          <i-col style="min-width:200px">
            <DatePicker
              type="date"
              format="yyyy-MM-dd"
              @on-change="getStartTime"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </i-col>
          <i-col style="min-width:10px;margin:0 5px">至</i-col>
          <i-col style="min-width:200px;margin-right:10px">
            <DatePicker
              type="date"
              format="yyyy-MM-dd"
              @on-change="getEndTime"
              placeholder="请选择结束时间"
              style="width: 200px"
            ></DatePicker>
          </i-col>
          <i-col style="margin-left:10px">
            <Button type="primary" @click="GetAllPrizeRecords">筛选</Button>
          </i-col>
          <i-col style="margin-left:10px">
            <Button type="info" @click="delTestData">删除测试数据</Button>
          </i-col>
        </Row>

        <Row type="flex" justify="center" align="middle" style="min-width:800px">
          <i-col span="24" class="hot-list">
            <Table stripe border :columns="PrizeRecordsList" :data="pRList">
              <template slot-scope="{ row }" slot="PrizeName">
                <strong>{{ row.PrizeName }}</strong>
              </template>
            </Table>
          </i-col>
          <i-col span="24" class="hot-list splitpage">
            <Page
              :total="PrpageTotal"
              show-total
              show-elevator
              @on-change="Prchange"
              @on-page-size-change="PrchangeSize"
            />
          </i-col>
        </Row>
      </div>
    </div>

    <!---删除测试数据弹窗---->
    <Modal v-model="isShowDelData" title="删除测试数据" :mask-closable="false">
      <div>
        <Form
          ref="formDelData"
          :model="formDelData"
          :rules="ruleDelData"
          label-position="right"
          :label-width="100"
        >
          <FormItem label="uuid">
            <Input v-model="formDelData.uuid" placeholder="请输入Uuid" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancelDelData('formDelData')">取消</Button>
        <Button type="primary" size="large" @click="SubmitDelData('formDelData')">确定</Button>
      </div>
    </Modal>
    <!---删除测试数据弹窗end---->
  </div>
</template>

<script>
import UploadImg from "@/components/UploadImg.vue";
import util from "../../utils/util";
export default {
  name: "DataViewFissionDraw",
  data() {
    return {
      pList: [],
      pageSize: 20,
      page: 1,
      pageTotal: 0, //记录总条数

      PrizeRecordsList: [
        {
          type: "index",
          width: 100,
          align: "center"
        },
        {
          title: "活动编号",
          key: "ActiveNo",
          align: "center"
        },
        {
          title: "用户id",
          key: "UserId",
          align: "center"
        },
        {
          title: "Uuid",
          key: "Uuid",
          align: "center"
        },
        {
          title: "是否中奖",
          key: "WinPrize",
          align: "center"
        },
        {
          title: "奖品名称",
          key: "PrizeName",
          align: "center"
        },
        {
          title: "使用积分",
          key: "UsePoint",
          align: "center"
        },
        {
          title: "抽奖时间",
          key: "CreatedTime",
          align: "center"
        }
      ],

      pRList: [],
      PrpageSize: 20,
      Prpage: 1,
      PrpageTotal: 0, //记录总条数
      usid: null,
      uuid: null,
      timeBegin: "",
      timeEnd: "",

      ActId: null,
      ActNo: null,

      formDelData: {
        activeNo: "",
        uuid: ""
      },
      ruleDelData: {},
      isShowDelData: false //删除测试数据弹窗
    };
  },
  components: {
    "v-upload": UploadImg
  },
  computed: {},
  created() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm);//当前组件的实例
      vm.ActId = vm.$route.query.ActivityId;
      vm.ActNo = vm.$route.query.ActivityNo;

      vm.GetAllPrizeRecords();
    });
  },

  mounted() {},
  methods: {
    // 获取开始时间
    getStartTime(startTime) {
      this.timeBegin = startTime;
    },
    // 获取结束时间
    getEndTime(endTime) {
      this.timeEnd = endTime;
    },
    //获取所有抽奖记录
    GetAllPrizeRecords() {
      var data = {
        activeNo: this.ActNo,
        activeId: this.ActId,
        Userid: this.usid,
        Uuid: this.uuid,
        pageSize: this.PrpageSize,
        pageIndex: this.Prpage,
        createdTimeBegin: this.timeBegin,
        createdTimeEnd: this.timeEnd
      };
      this.$post("/api/crmPrizeRecord/GetListBySC", data).then(res => {
        if (res.state == 1) {
          this.pRList = res.rows;
          this.PrpageTotal = res.total;
        } else {
          this.$Message.error("查询失败！" + res.msg);
        }
      });
    },
    Prchange(dpage) {
      this.Prpage = dpage;
      this.GetAllPrizeRecords();
    },
    PrchangeSize(pageSize) {
      this.PrpageSize = pageSize;
      this.GetAllPrizeRecords();
    },

    //删除测试数据弹窗
    delTestData() {
      this.isShowDelData = true;
    },
    //取消删除测试数据
    cancelDelData(name) {
      this.isShowDelData = false;
      this.$refs[name].resetFields();
      this.$refs[name].model.uuid = "";
    },
    //提交删除测试数据
    SubmitDelData(name) {
      (this.$refs[name].model.activeNo = this.ActNo),
        this.$post(
          "/api/crmPrizeProduct/DeleteTestData",
          this.$refs[name].model
        ).then(res => {
          if (res.state == 1) {
            this.isShowDelData = false;
            this.$Message.info("执行成功!");
            this.GetAllPrizeRecords();
          } else {
            this.$Message.error("执行失败！" + res.msg);
          }
        });
    }
  }
};
</script>

<style>
.showeditPrize .ivu-form-item {
  margin-bottom: 10px;
}
.RotartPAInput .ivu-form-item-content {
  text-align: left;
}
</style>
<style scoped  lang="less">
.splitpage {
  text-align: right;
  margin-top: 20px;
}
.oper {
  display: inline-block;
  font-size: 14px;
  letter-spacing: 0px;
  color: #14cdbc;
  margin-left: 10px;
  cursor: pointer;
}
.RotartPAInput {
  padding: 20px;
  width: 50%;
  margin: auto;
}
.PrizesInput {
  padding: 20px;
}
.uploadimg {
  width: 60px;
  height: 60px;
}
</style>