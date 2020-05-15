<template>
  <div class="CreateActivityStep2">
    <div class="stepWrap">
      <Steps :current="step.currentStep">
        <Step title="选择模板" content="选择你要编辑的模板" class="my-step1"></Step>
        <Step title="基本信息设置" content="填写活动基本信息"></Step>
        <Step title="编辑模板" content="编辑你选择的模板"></Step>
        <Step title="发布成功" content="发布成功，可在互动管理查看"></Step>
      </Steps>
    </div>
    <div class="content">
      <!-- 基本信息设置 -->
      <div class="activityInfo">
        <div class="choosedTemp">
          <div class="title">已选择：{{step.templateName}}</div>
          <div class="tempWrap">
            <div class="tempImg">
              <img :src="step.templateImg" />
            </div>
          </div>
        </div>
        <div class="baseInfoWrap">
          <div class="title">基本信息填写</div>
          <div class="fromInfo">
            <Form
              ref="formActivityInfo"
              :model="formActivityInfo"
              :rules="ruleValidate"
              label-position="right"
              :label-width="90"
            >
              <FormItem label="活动名称" prop="name">
                <Input v-model="formActivityInfo.name" />
              </FormItem>
              <FormItem label="活动时间" prop="time">
                <DatePicker
                  format="yyyy-MM-dd HH:mm:ss" 
                  type="datetimerange"
                  v-model="formActivityInfo.time"
                  :start-date="new Date()"
                  placement="bottom-end"
                  placeholder
                  style="width: 100%"
                  @on-change="changeTime"
                ></DatePicker>
                <!-- :options="options" -->
              </FormItem>
              <!-- <FormItem label="活动类别" prop="type">
                <Select v-model="formActivityInfo.type" style="width:100%" placeholder>
                  <Option
                    v-for="item in typeList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="活动产品类型">
                <Select v-model="formActivityInfo.productType" style="width:100%" placeholder>
                  <Option
                    v-for="item in typeList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>-->
              <FormItem label="外部活动编号" prop="mapping">
                <Input v-model="formActivityInfo.mapping" />
              </FormItem>
              <FormItem label="活动介绍" prop="intro">
                <Input v-model="formActivityInfo.intro" type="textarea" :rows="8" />
              </FormItem>
              <FormItem>
                <Button @click="back" v-if="isshowForEdit">返回上一步</Button>
                <Button
                  type="primary"
                  @click="continueSet('formActivityInfo')"
                  style="margin-left: 8px"
                >继续设置</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import util from "../../utils/util"

export default {
  name: "CreateActivityStep2",
  data() {
    const validate = function(rule, value, callback) {
      if (Array.isArray(value)) {
        //格式为：daterange、datetimerange检测
        value.map(function(item) {
          if (item === "") {
            return callback("日期不能为空");
          }
        });
      } else {
        //格式为：date、datetime、year、month 检测
        if (value === "") {
          return callback("日期不能为空");
        }
      }
      return callback();
    };
    return {
      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      formActivityInfo: {
        name: "",
        time: "",
        type: "",
        productType: "",
        intro: "",
        mapping:''
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        time: [
          {
            required: true,
            validator: validate,
            message: "请选择活动时间",
            trigger: "change"
          }
        ],
        // mapping: [{ required: true, message: "外部活动编号", trigger: "blur" }],
        // type: [{ required: true, message: "请选择活动类别", trigger: "change" }]
        // productType: [{ required: true, message: "请选择活动产品类型", trigger: "change" }],
        intro: [{ required: true, message: "请输入活动介绍", trigger: "blur" }],
      },
      typeList: [
        {
          value: "活动类型1",
          label: "活动类型1"
        },
        {
          value: "活动类型2",
          label: "活动类型2"
        }
      ],
      ActId:null,
      ActNo:null,
      isshowForEdit:true, //编辑下不显示
    };
  },
  components: {},
  computed: {
    ...mapGetters(["step"])
  },
  created() {
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {
        //因为当钩子执行前，组件实例还没被创建
        // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
        // console.log(vm);//当前组件的实例
        vm.ActId=vm.$route.query.ActivityId
        vm.ActNo=vm.$route.query.ActivityNo
        if(vm.ActId!=undefined && vm.ActNo!=undefined){
          vm.getActivityInfo()
        }
    })
  },
  mounted() {},
  methods: {
    ...mapActions(["UpdateStep"]),
    //编辑-加载活动信息
    getActivityInfo(){
      this.$get("/api/crmActivityInfo/GetByAk", {ak: this.ActNo}).then(res => {
        if (res.state==1) {
          this.formActivityInfo.name=res.data.ActivityName
          this.formActivityInfo.time=[res.data.FromTime,res.data.ToTime]
          this.formActivityInfo.intro=res.data.ActiveContent
          this.formActivityInfo.mapping=res.data.MappingActivityNo
          this.isshowForEdit=false
        } else {
          this.$Message.error("查询记录失败！"+res.msg);
        }
      })
    },
    // 活动日期
    changeTime(data){
        this.formActivityInfo.time=data
    },
    //继续设置
    continueSet(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = {
            activityId:this.ActId,
            activityNo:this.ActNo,
            baseTempleteId: this.step.baseTemplateId,
            activityName: this.formActivityInfo.name,
            fromTime: this.formActivityInfo.time[0],
            toTime: this.formActivityInfo.time[1],
            activeContent: this.formActivityInfo.intro,
            mappingActivityNo: this.formActivityInfo.mapping
          }
          this.$Spin.show({
            render: h => {
              return h("div", [
                h("Icon", {
                  class: "demo-spin-icon-load",
                  props: {
                    type: "ios-loading",
                    size: 50
                  }
                }),
                h("div", "Loading")
              ]);
            }
          });
            
            console.log(data)
          this.$post("/api/crmActivityInfo/SaveActivity", data).then((res)=>{
            this.$Spin.hide();
            if(res.state==1){
              this.UpdateStep({
                currentStep: 2,
                templateName: this.step.templateName,
                baseTemplateId: res.data.BaseTempleteId,
                templateId: res.data.TemplateId,
                templateImg: this.step.templateImg,
                activityId: res.data.ActivityId,
                activityNo: res.data.ActivityNo
              });
              this.$router.push({ name: res.data.RouteUrl }); 
            }else{
              this.$Message.error("提交失败！"+res.msg);
            }
          })
        }
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.ivu-steps-horizontal .my-step1 .ivu-steps-content {
  padding-left: 35px !important;
}
</style>
<style lang="less" scoped>
.CreateActivityStep2 {
  text-align: left;
  min-width: 800px;
}
.stepWrap {
  padding: 15px 10px 10px 10px;
  background-color: #fff;
  box-shadow: 0px 6px 8px 0px rgba(6, 15, 53, 0.05);
  border-radius: 10px;
}
.content {
  margin-top: 15px;
  border-radius: 10px;
  padding: 10px 10px 0 0;
  .activityInfo {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    .choosedTemp {
      width: 40%;
      min-width: 400px;
      height: auto;
      .tempWrap {
        width: 300px;
        height: 560px;
        background: url(../../assets/mobileBg.png) no-repeat;
        background-size: 100% 100%;
        margin: 30px auto;
        .tempImg {
          width: 260px;
          height: 545px;
          margin: 0 auto;
          padding: 46px 0 0 0;
          border-radius: 0 0 30px 30px;
          overflow: hidden;
          // border: 1px solid red;
          img {
            width: 100%;
          }
        }
      }
    }
    .baseInfoWrap {
      width: 55%;
      min-width: 500px;

      .fromInfo {
        width: 100%;
        min-height: 580px;
        background-color: #ffffff;
        box-shadow: 0px 6px 8px 0px rgba(6, 15, 53, 0.05);
        border-radius: 10px;
        margin-top: 10px;
        .ivu-form {
          padding: 50px 20%;
        }
        .createbtn {
          text-align: center;

          .cancelbtn {
            background-color: #ccc;
            border: #ccc;
            letter-spacing: 0px;
            color: #ffffff;
            margin-right: 20px;
          }
          .resetbtn {
            background-color: #14cdbc;
            border: #14cdbc;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>