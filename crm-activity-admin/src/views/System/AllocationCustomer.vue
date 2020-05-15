<template>
  <div class="AllocationCustomer">
    <Tabs value="name1" :animated="false">
      <TabPane :label="this.CustomName +' -- 配置'" name="name1">
        <div style="background-color:#FFF;overflow-y: hidden;">
          <div class="RotartPAInput" style="width:62%">
            <Form
              ref="CustomConfigList"
              :rules="ruleValidate"
              label-position="right"
              :label-width="150"
              :key="index"
              v-for="(item,index) in CustomConfigList"
              style="display:flex"
            >
              <FormItem :label="item.Remark" style="width:90%">
                <!-- IP白名单 为文本域，其余为输入框 -->
                <Input style="width:87%" v-if="item.Remark=='IP白名单'" v-model="item.Value" :value="item.Value" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
                <Input style="width:87%" v-else v-model="item.Value" :value="item.Value" />
                <!-- 折叠面板 -->
                <div v-if="item.CustomConfigDetailList.length!=0">
                  <Collapse :active-num="index" accordion @on-change="collapse(index)">
                    <Panel :num="index">
                      {{item.Remark}}
                      <div slot="content">
                        <div class="inputItem" v-for="(subItem,subIndex) in item.CustomConfigDetailList"
                        :key="subIndex">
                          <Icon type="ios-close" size="20" class="deleteBtn" @click="deletForm(subIndex)" v-if="!subItem.IsBase"></Icon>
                          <!-- 说明框 -->
                          <div class="inputDesc">{{subItem.Desc}}</div>
                          <FormItem :label="subItem.Key" style="width:95%">
                            <Input v-model="subItem.Value" :value="subItem.Value" style="width:70%" v-bind:disabled="subItem.IsBase" />
                          </FormItem>                          
                        </div>
                        <div class="conAdd" @click="handleAdd(index)">
                          <span>添加</span>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              </FormItem>
              <FormItem label="是否启用" prop="isEnabled" style="width:10%;margin-left: -165px;text-align:left">
                <Checkbox v-model="item.IsEnabled"></Checkbox>
              </FormItem>
            </Form>
            <Button size="large" style="color:#555;margin-right:20px" @click="back">返回上一页</Button>
            <Button type="primary" size="large" @click="handleSubmit('CustomConfigList')">确定</Button>
          </div>
        </div>
      </TabPane>
    </Tabs>
    <!---添加表单弹窗-->
    <Modal v-model="isShowEdit" :title="operationName" :mask-closable="false">
      <div class="resetInput">
        <Form
          ref="DetailInfo"
          :model="DetailInfo"
          :rules="ruleValidate"
          label-position="right"
          :label-width="100"
        >
          <FormItem label="说明" prop="Desc">
            <Input v-model="DetailInfo.Desc" placeholder="请输入说明" />
          </FormItem>
          <FormItem label="标题" prop="Key">
            <Input v-model="DetailInfo.Key" placeholder="请输入标题" />
          </FormItem>
          <FormItem label="value" prop="Value">
            <Input v-model="DetailInfo.Value" placeholder="请输入Value值" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancelEdit('DetailInfo')">取消</Button>
        <Button type="primary" size="large" @click="sureAdd('DetailInfo')">确定</Button>
      </div>
    </Modal>
    <!---添加表单弹窗end---->
  </div>
</template>

<script>
import UploadImg from "@/components/UploadImg.vue";
import util from "../../utils/util";
export default {
  name: "AllocationCustomer",
  data() {
    return {
      isShowEdit: false, //新增表单弹窗
      operationName: "", //弹窗名称
      ruleValidate: {
        Key: [
          { required: true, message: "请输入标题", trigger: "change" }
        ],
        Value: [
          { required: true, message: "请输入value值", trigger: "change" }
        ],
        Desc: [
          { required: true, message: "请输入说明", trigger: "change" }
        ],
      },

      CustomConfigList: [], //第一层数组
      itemIndex:null, //外层数组下标
      DetailInfo:{  //模态框中的对象
        Key:"",
        Value:"",
        Desc:"",
      },

      pageSize: 20,
      img: "",
      uploadList: [],
      CustomName: "", //公司名称
      visible: false, //控制下拉菜单

      usedcondition: [
        {
          value: "nocondition",
          label: "无限制"
        },
        {
          value: "point",
          label: "积分"
        },
        {
          value: "code",
          label: "邀请码"
        }
      ],
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
      vm.CustomCodeID = vm.$route.params.appid;

      vm.GetPrizeRule();
    });
  },

  mounted() {},
  methods: {
    // 返回上一页
    back() {
      this.$router.go(-1);
    },
    //获取上传图片
    saveFile(src) {
      this.img = src;
    },
    //删除上传图片
    delFile() {
      this.img = "";
      this.pgImg = "";
    },
    // 控制下拉菜单
    handleOpen() {
      this.visible = !this.visible;
    },
    // 表单删除
    deletForm(subIndex) {
      this.CustomConfigList[this.itemIndex].CustomConfigDetailList.splice(subIndex, 1);
    },
    //添加表单项
    handleAdd(index) {
      this.isShowEdit = true;
      this.operationName = "添加";

      this.$refs["DetailInfo"].resetFields(); //重置弹框中的表单
    },
    // 点击折叠面板触发
    collapse(index) {
      this.itemIndex = index //外层数组下标
    },
    // 弹窗取消按钮
    cancelEdit(name) {
      this.isShowEdit = false;
      this.$refs[name].resetFields();
    },
    // 添加表单弹框确定
    sureAdd(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.isShowEdit = false;
          this.CustomConfigList[this.itemIndex].CustomConfigDetailList.push({
            Key: this.DetailInfo.Key,
            Value: this.DetailInfo.Value,
            Desc: this.DetailInfo.Desc,
          });
        }
      })
    },
    //提交数据-配置
    handleSubmit(name) {
      var arr = [];
      for (var i = 0; i < this.CustomConfigList.length; i++) {
        var arrli = [];
        var DetailList = this.CustomConfigList[i].CustomConfigDetailList;
        for (var k = 0; k < DetailList.length; k++) {
          arrli.push({ id: DetailList[k].Id, value: DetailList[k].Value,key:DetailList[k].Key,desc:DetailList[k].Desc });
        }
        arr.push({
          id: this.CustomConfigList[i].Id,
          value: this.CustomConfigList[i].Value,
          customCode: this.CustomConfigList[i].CustomCode,
          FormCustomConfigDetailList: arrli
        });
      }

      // this.$refs[name].validate(valid => {
      //   if (valid) {
          this.$post(
            "/api/crmCustomConfig/SaveConstomInfo",
            JSON.stringify(arr)
          ).then(res => {
            if (res.state == 1) {
              this.$Message.info("提交成功!");
            } else {
              this.$Message.error("提交失败！" + res.msg);
            }
          });
      //   }
      // });
    },

    //配置表单信息
    GetPrizeRule() {
      var data = {
        customCode: this.CustomCodeID,
        pageSize: 9999,
        pageIndex: 1,
        sortName: "SortIndex",
        sortOrder: "asc"
      };
      this.$post("/api/crmCustom/GetListBySC", data).then(res => {
        if (res.state == 1) {
          if (res.rows.length > 0) {
            this.CustomName = res.rows[0].CustomName; //公司名称
            this.CustomConfigList = res.rows[0].CustomConfigList; //第一层数组

            // (this.CustomConfigList.AttendNumber = res.rows[0].AttendNumber),
            //   (this.CustomConfigList.LimitType = res.rows[0].LimitType + ""),
            //   (this.CustomConfigList.PreDayCount = res.rows[0].PreDayCount),
            //   (this.CustomConfigList.PreDayWinCount = res.rows[0].PreDayWinCount),
            //   (this.CustomConfigList.PreWinCount = res.rows[0].PreWinCount),
            //   (this.CustomConfigList.PreLimitLotteryCount =
            //     res.rows[0].PreLimitLotteryCount),
            //   (this.PRTime = [res.rows[0].FromTime, res.rows[0].ToTime]),
            //   (this.CustomConfigList.LotteryConditionType =
            //     res.rows[0].LotteryConditionType);
            // this.CustomConfigList.UseConditionValue = res.rows[0].UseConditionValue;
          } else {
            // (this.CustomConfigList.Id = null),
            //   (this.CustomConfigList.ActiveNo = null),
            //   (this.CustomConfigList.ActiveId = null),
            //   (this.CustomConfigList.AttendNumber = ""),
            //   (this.CustomConfigList.LimitType = ""),
            //   (this.CustomConfigList.PreDayCount = null),
            //   (this.CustomConfigList.PreDayWinCount = null),
            //   (this.CustomConfigList.PreWinCount = null),
            //   (this.CustomConfigList.PreLimitLotteryCount = null),
            //   (this.CustomConfigList.FromTime = null),
            //   (this.CustomConfigList.ToTime = null),
            //   (this.CustomConfigList.LotteryConditionType = "nocondition");
            // this.CustomConfigList.UseConditionValue = null;
          }
        } else {
          this.$Message.error("查询失败！" + res.msg);
        }
      });
    },

    //奖品中奖范围时间(抽奖规则)
    changePRTime(dat) {
      this.PRTime = dat;
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
.conAdd {
  width: 38%;
  margin: 0 auto;
  border: 1px solid #dcdee2;
  height: 33px;
  text-align: center;
  line-height: 30px;
  margin-top: 15px;
  border-radius: 3px;
  cursor: pointer;
}
.deleteBtn{
  color:#fff;
  background:red;
  border-radius: 50%;
  margin-left: 10px;
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.inputItem{
  position: relative;
  background: #f7f7f7;
  margin-bottom: 10px;
  padding: 10px 0;
}
.inputDesc{
  width: 66%;
  margin-left: 153px;
  // background: pink;
}
.ivu-form-item-label{
  text-align: left!important;
}
</style>