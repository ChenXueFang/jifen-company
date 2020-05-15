<template>
  <div class="CreateActivityStep1">
    <div class="stepWrap">
      <Steps :current="currentStep">
        <Step title="选择模板" content="选择你要编辑的模板" class="my-step1"></Step>
        <Step title="基本信息设置" content="填写活动基本信息"></Step>
        <Step title="编辑模板" content="编辑你选择的模板"></Step>
        <Step title="发布成功" content="发布成功，可在互动管理查看"></Step>
      </Steps>
    </div>
    <div class="content">
      <!-- 选择模板 -->
      <div v-if="currentStep==0" class="step1">
        <Tabs v-model="currentTab" :animated="false" @on-click="currentTabChange">
          <TabPane
            v-for="item in tabLists"
            :key="item.Id"
            :label="item.ModuleName"
            :name="item.ModuleCode"
          >
            <div class="example">
              <div class="list" v-for="itemxp in xpTempLists" :value="itemxp.Id" :key="itemxp.Id">
                <div class="template">
                  <div class="mask">
                    <div class="top">
                      <img src="../../assets/templateInfo.png" />
                      <img @click="chooseTemplate(itemxp)" src="../../assets/choosedTemplate.png" />
                    </div>
                    <div class="bottom"></div>
                  </div>
                  <img class="temppic" :src="itemxp.msgList.ExampImage_URL" />
                </div>
                <span>{{itemxp.TemplateName}}</span>
              </div>
              <!-- <div class="list">
                <div class="template">
                  <div class="mask">
                    <div class="top">
                      <img src="../../assets/templateInfo.png" />
                      <img
                        @click="chooseTemplate('trial_report','新品试用-试用报告')"
                        src="../../assets/choosedTemplate.png"
                      />
                    </div>
                    <div class="bottom"></div>
                  </div>
                  <img src="../../assets/template2.png" />
                </div>
                <span>新品试用-试用报告</span>
              </div>
              <div class="list">
                <div class="template">
                  <div class="mask">
                    <div class="top">
                      <img src="../../assets/templateInfo.png" />
                      <img
                        @click="chooseTemplate('trial_feedback','新品试用-试用反馈')"
                        src="../../assets/choosedTemplate.png"
                      />
                    </div>
                    <div class="bottom"></div>
                  </div>
                  <img src="../../assets/template3.png" />
                </div>
                <span>新品试用-试用反馈</span>
              </div>
              <div class="list">
                <div class="template">
                  <div class="mask">
                    <div class="top">
                      <img src="../../assets/templateInfo.png" />
                      <img
                        @click="chooseTemplate('trial_survey','新品试用-问卷调研')"
                        src="../../assets/choosedTemplate.png"
                      />
                    </div>
                    <div class="bottom"></div>
                  </div>
                  <img src="../../assets/template4.png" />
                </div>
                <span>新品试用-问卷调研</span>
              </div>-->
            </div>
          </TabPane>
        </Tabs>
      </div>
      <!-- 基本信息设置 -->
      <div v-if="currentStep==1&&false">
        <div class="activityInfo">
          <div class="choosedTemp">
            <div class="title">已选择：{{templateName}}</div>
            <div class="tempWrap"></div>
          </div>
          <div class="baseInfoWrap">
            <div class="title">基本信息填写</div>
            <div class="fromInfo">
              <Form :model="formCreateActivoty" label-position="right" :label-width="90">
                <FormItem label="活动名称">
                  <Input v-model="formCreateActivoty.input1" />
                </FormItem>
                <FormItem label="活动时间">
                  <DatePicker
                    type="daterange"
                    placement="bottom-end"
                    placeholder
                    style="width: 100%"
                  ></DatePicker>
                </FormItem>
                <FormItem label="活动类别">
                  <Select v-model="model1" style="width:100%" placeholder>
                    <Option
                      v-for="item in cityList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="活动产品类型">
                  <Select v-model="model1" style="width:100%" placeholder>
                    <Option
                      v-for="item in cityList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="活动介绍">
                  <Input v-model="formCreateActivoty.input5" type="textarea" :rows="8" />
                </FormItem>
                <div class="createbtn">
                  <Button type="primary" class="cancelbtn" @click="back">返回上一步</Button>
                  <Button type="primary" class="resetbtn">继续设置</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <!-- 编辑模板 -->
      <div v-if="currentStep==2&&false">
        <div class="editTemplate">
          <div class="editLeft">
            <div class="title">
              活动页面
              <span>共2页</span>
            </div>
            <div class="leftWrap">
              <ul class="ullist">
                <li>
                  <div class="title">244352</div>
                </li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          <div class="editCenter"></div>
          <div class="editRight"></div>
        </div>
      </div>
      <div v-if="currentStep==3&&false">第四步</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CreateActivityStep1",
  data() {
    return {
      currentStep: 0, //步骤条状态
      tabLists: [], //tab菜单列表
      currentTab: "", //tab选中
      xpTempLists: [] //模板列表
    };
  },
  components: {},
  computed: {},
  created() {
    this.getTabName();
  },
  mounted() {},
  methods: {
    ...mapActions(["UpdateStep"]),

    //加载tab菜单
    getTabName() {
      var data = {
        pageSize: 9999,
        pageIndex: 1,
        sortName: "Id",
        sortOrder: "asc"
      };
      //自定义显示内容
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
      this.$post("/api/crmModuleType/GetListBySC", data).then(res => {
        this.$Spin.hide();
        if (res.state == 1) {
          this.tabLists = res.rows;
          this.currentTab = res.rows[0].ModuleCode;
          this.currentTabChange(res.rows[0].ModuleCode);
        } else {
          this.$Message.error("查询失败!");
        }
      });
    },
    //切换tab 查询模板
    currentTabChange(name) {
      this.currentTab = name;

      var data = {
        moduleCode: name,
        isBase: true,
        isValid: 1,
        pageSize: 9999,
        pageIndex: 1,
        sortName: "SortNum",
        sortOrder: "desc"
      };
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
      this.$post("/api/crmModuleTemplate/GetListBySC", data).then(res => {
        this.$Spin.hide();
        if (res.state == 1) {
          this.xpTempLists = res.rows;
        } else {
          this.$Message.error("查询失败!");
        }
      });
    },
    //选择模板
    chooseTemplate(item) {
      this.UpdateStep({
        currentStep: 1,
        templateName: item.TemplateName,
        baseTemplateId: item.Id,
        templateId:"",
        templateImg: item.msgList.ExampImage_URL,
        activityId:"",
        activityNo:"",
      });
      this.$router.push({ name: "CreateActivityStep2" });
    },
    back() {
      this.currentStep = 0;
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
.CreateActivityStep1 {
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
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px 10px 0 0;

  .example {
    .list {
      display: inline-block;
      border-radius: 5px;
      margin: 0 20px 20px 0;
      position: relative;
      .template {
        width: 235px;
        height: auto;
        position: relative;
        background-color: #f1f5fb;
        box-shadow: 0px 0px 11px 2px rgba(53, 61, 100, 0.22);
        border-radius: 12px;
        border: solid 1px #dbdbdb;
        overflow: hidden;
        &:hover .mask {
          opacity: 1;
        }
        img {
          width: 100%;
          height: auto;
        }
        .temppic {
          width: 100%;
          height: 425px;
        }
        .mask {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          // border-radius: 12px;
          background: rgba(0, 0, 0, 0.1);
          opacity: 0;
          .top {
            width: 100%;
            height: 60px;
            background-image: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.27) 45%,
              rgba(0, 0, 0, 0.54) 100%
            );
            border-radius: 12px 12px 0px 0px;
            display: flex;
            justify-content: space-between;
            img {
              width: auto;
              height: 28px;
              margin: 20px 10px 10px 10px;
            }
          }
          .bottom {
            width: 100%;
            height: 60px;
            background-image: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.54) 0%,
              rgba(0, 0, 0, 0.27) 55%,
              rgba(0, 0, 0, 0) 100%
            );
            border-radius: 0px 0px 12px 12px;
            position: absolute;
            left: 0;
            bottom: 0;
          }
        }
      }

      span {
        display: block;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
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
        height: 580px;
        background: url(../../assets/mobileBg.png) no-repeat;
        background-size: 100% 100%;
        margin: 30px auto;
      }
    }
    .baseInfoWrap {
      width: 55%;
      min-width: 500px;

      .fromInfo {
        width: 100%;
        min-height: 600px;
        background-color: #ffffff;
        box-shadow: 0px 6px 8px 0px rgba(6, 15, 53, 0.05);
        border-radius: 10px;
        margin-top: 10px;
        .ivu-form {
          padding: 30px 40px;
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
  .editTemplate {
    width: 100%;
    height: calc(100vh - 180px);
    display: flex;
    justify-content: space-between;

    .editLeft {
      width: 29%;
      min-width: 300px;
      height: 100%;
      .title span {
        color: #666;
        font-size: 10px;
        margin-left: 5px;
      }
      .leftWrap {
        width: 100%;
        height: calc(100% - 30px);
        background: #fff;
        box-shadow: 0px 6px 8px 0px rgba(6, 15, 53, 0.05);
        border-radius: 10px;
        margin-top: 10px;
        overflow-y: auto;
        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
        &::-webkit-scrollbar {
          width: 5px;
          height: 420px;
          background-color: rgba(0, 0, 0, 0);
        }

        /*定义滚动条轨道 内阴影+圆角*/
        &::-webkit-scrollbar-track {
          width: 1px;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          background-color: rgba(0, 0, 0, 0);
        }

        /*定义滑块 内阴影+圆角*/
        &::-webkit-scrollbar-thumb {
          width: 5px;
          height: 10px;
          border-radius: 1px;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
          background-color: #dedede;
        }
        ul {
          padding: 20px 30px 0 30px;

          li {
            height: 320px;
            margin: 0 auto 20px;
            background-color: #ffffff;
            box-shadow: 0px 0px 13px 0px rgba(53, 61, 100, 0.22);
            border-radius: 10px;
            .title {
              text-align: center;
              padding: 10px 0;
            }
          }
        }
      }
    }
  }
}
</style>