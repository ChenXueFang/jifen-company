<template>
  <div class="TemplateConfig">
    <div class="content">
        <Tabs v-model="currentTab" :animated="false" @on-click="currentTabChange">
          <TabPane v-for="item in tabLists" :value="item.Id" :key="item.Id" :label="item.ModuleName" :name="item.ModuleCode" >
            <div class="example">
              <div class="list" v-for="itemxp in xpTempLists" :value="itemxp.Id" :key="itemxp.Id">
                <div class="template">
                  <div class="mask">
                    <div class="top">
                      <img src="../../assets/templateInfo.png" />
                      <img
                        @click="chooseTemplate('trial_from')"
                        src="../../assets/choosedTemplate.png"
                      />
                    </div>
                    <div class="bottom"></div>
                  </div>
                  <img class="temppic" :src="itemxp.msgList.ExampImage_URL" />
                </div>
                <span>{{itemxp.TemplateName}}</span>
              </div>
              <div class="list">
                <div class="template" >
                  <div class="add" @click="addNewTemp">
                    <Icon type="md-add" size="28" />
                  </div>
                </div>
                <span>新增模板</span>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>


      <!--新增模板弹窗-->
      <Modal
      v-model="isShowEdit"
      title="新增模板"
      :mask-closable="false"
    >
      <div class="resetInput">
        <Form
          ref="formEditTemp"
          :model="formEditTemp"
          :rules="ruleValidate"
          label-position="right"
          :label-width="100"
        >
          <FormItem label="模板名称" prop="TemplateName">
            <Input v-model="formEditTemp.TemplateName" placeholder="请输入模板名称" />
          </FormItem>
          <FormItem label="模板类型" prop="ModuleCode">
            <Input v-model="formEditTemp.ModuleCode" placeholder="请输入模板类型" disabled/>
          </FormItem>
          <FormItem label="模板说明" prop="Description">
            <Input v-model="formEditTemp.Description" placeholder="请输入模板说明" />
          </FormItem>
          <FormItem label="示例图片" prop="ExampImage">
            <v-upload v-on:save="saveFile" ref="upFile"></v-upload>
          </FormItem>
          <FormItem label="跳转路由" prop="RouteUrl">
            <Input v-model="formEditTemp.RouteUrl" placeholder="请输入跳转路由" />
          </FormItem>
          <FormItem label="链接URL" prop="LinkUrl">
            <Input v-model="formEditTemp.LinkUrl" placeholder="请输入链接URL" type="textarea"/>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancelEdit('formEditTemp')">取消</Button>
        <Button type="primary" size="large" @click="handleSubmit('formEditTemp')">确定</Button>
      </div>
    </Modal>
    <!--新增模板弹窗end-->
  </div>
</template>

<script>
import UploadImg from "@/components/UploadImg.vue";
export default {
  name: "TemplateConfig",
  data() {
    return {
      isShowEdit: false, //新增弹窗
      tabLists:[],
      xpTempLists:[],
      currentTab:'',
      formEditTemp: {
        TemplateName: "",
        ModuleCode: "",
        Description: "",
        ExampImage: "",
        IsBase:1,
        IsValid:1,
        RouteUrl:"",
        LinkUrl:'',
      },
      ruleValidate: {
        TemplateName: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        Description: [{ required: true, message: "请输入模板说明", trigger: "blur" }],
        ExampImage: [{ required: true, message: "请上传示例图片", trigger: "blur" }],
        RouteUrl: [{ required: true, message: "请输入跳转路由", trigger: "blur" }],
        LinkUrl: [{ required: true, message: "请输入链接URL", trigger: "blur" }]
      },
      img:''
    };
  },
  components: {
    "v-upload":UploadImg,
  },
  computed: {},
  created() {
      this.GetTabName()
  },
  mounted() {
    
  },
  methods: {
    //获取上传图片
    saveFile(src){
      this.img = src;
    },
    //加载tab菜单
    GetTabName(){
      var data = {
        pageSize: 9999,
        pageIndex: 1,
        sortName: "Id",
        sortOrder: "asc",
      };
      this.$post("/api/crmModuleType/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.tabLists=res.rows
            this.currentTab=res.rows[0].ModuleCode
            this.currentTabChange(res.rows[0].ModuleCode)
          }else{
            this.$Message.error("查询失败!");
          }
      })
    },
    //切换tab 查询模板
    currentTabChange(name){
      this.currentTab=name

      var data = {
        moduleCode: name,
        isBase: true,
        isValid: 1,
        pageSize: 9999,
        pageIndex: 1,
        sortName: "SortNum",
        sortOrder: "desc"
      };
      this.$post("/api/crmModuleTemplate/GetListBySC",data).then((res)=>{
          if(res.state==1){
              this.xpTempLists=res.rows
          }else{
            this.$Message.error("查询失败!");
          }
      })
    },
    //新增模板
    addNewTemp(){
      this.isShowEdit = true
      this.$refs['formEditTemp'].resetFields();
      this.formEditTemp.id=null
      this.formEditTemp.ModuleCode=this.currentTab
      //新增清空上次上传图片
      if(this.$refs.upFile.uploadList.length>0){
        this.$refs.upFile.uploadList.splice(0);
      }
    },
    //提交数据
    handleSubmit(name) {
      this.formEditTemp.ExampImage=this.img
      this.$refs[name].validate(valid => {
        if (valid) {
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
          this.$post("/api/crmModuleTemplate/SaveOrUpdate", this.$refs[name].model).then((res)=>{
                this.$Spin.hide();
              if(res.state==1){
                this.isShowEdit = false
                this.$Message.info("提交成功!");    
                this.currentTabChange(this.currentTab)  
              }else{
                this.$Message.error("提交失败！"+res.msg);
              }
          })
        }
      });
    },
    //放弃新增
    cancelEdit(name) {
      this.isShowEdit = false;
      this.$refs[name].resetFields();
    },

  }
};
</script>

<style lang="less" scoped>
.TemplateConfig {
  text-align: left;
  min-width: 800px;
}
.content {
  border-radius: 10px;
  padding: 10px 10px 30px 0;

  .example {
    .list {
      display: inline-block;
      border-radius: 5px;
      margin:0 20px 20px 0;
      position: relative;

      .template {
        width: 235px;
        height: auto;
        position: relative;
        background-color: #f1f5fb;
        box-shadow: 0px 0px 11px 2px 
          rgba(53, 61, 100, 0.22);
        border-radius: 12px;
        border: solid 1px #dbdbdb;
        overflow: hidden;
        &:hover .mask {
          opacity: 1;
        }
        img {
          width: 100%;
          // height: auto;
        }
        .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            /* border-radius: 12px; */
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
    .temppic{
        width: 100%;
        height: 425px;
    }
    .add{
      width: 235px;
      height: 425px;
      text-align: center;
      padding-top: 180px;
      box-sizing: border-box;
    }
  }
}
.uploadimg{
  width: 70px;
  height: auto;
}
</style>