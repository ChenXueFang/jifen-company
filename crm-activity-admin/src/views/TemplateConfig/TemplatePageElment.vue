<template>
  <div class="TemplatePageElment">
    <Row type="flex" align="middle" style="margin-bottom:20px">
      <i-col style="min-width:65px">识别名称</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入识别名称" style="width: 200px" v-model="elname"/>
      </i-col>
      <i-col style="min-width:65px;margin-left:10px">所属模板</i-col>
      <i-col style="min-width:200px">
        <Select v-model="tempid" placeholder="请选择所属模板" @on-change="changeTemp">
            <Option v-for="item in TempLists" :value="item.Id" :key="item.Id">{{ item.TemplateName }}</Option>
        </Select>
      </i-col>
      <i-col style="min-width:65px;margin-left:10px">所属页面</i-col>
      <i-col style="min-width:200px">
        <Select v-model="tempPageid" placeholder="请选择所属页面">
            <Option v-for="item in TempPageLists" :value="item.PageId" :key="item.PageId">{{ item.PageCode}}.{{ item.PageName }}</Option>
        </Select>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="primary" @click="GetAllTempPagesEl">筛选</Button>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="error" @click="EditTempPageEl">+创建页面识别代码</Button>
      </i-col>
    </Row>

    <!--表格-->
    <Row type="flex" justify="center" align="middle" style="min-width:800px">
      <i-col span="24" class="hot-list">
        <Table stripe border :columns="TempPageElsList" :data="pageElLists">
          <template slot-scope="{ row }" slot="DisName">
            <strong>{{ row.DisName }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <span class="oper" @click="updateTemPageEl(row.DisId)">编辑</span>
            <!-- <span class="oper" @click="removeTemPageEl(row.DisId)">删除</span> -->
          </template>
        </Table>
      </i-col>
      <i-col span="24" class="hot-list splitpage">
        <Page :total="pageTotal" :current="page" :page-size='pageSize' show-total show-elevator @on-change="change" @on-page-size-change="changeSize"/>
      </i-col>
    </Row>

    <Modal
      v-model="isShowEdit"
      :title="operationName"
      :mask-closable="false"
    >
      <div class="resetInput">
        <Form
          ref="formEditTpage"
          :model="formEditTpage"
          :rules="ruleValidate"
          label-position="right"
          :label-width="100"
        >
          <FormItem label="所属模板" prop="TemplateId">
            <Select v-model="formEditTpage.TemplateId" placeholder="请选择所属模板" @on-change="changeTemp2">
              <Option v-for="item in TempLists" :value="item.Id" :key="item.Id">{{ item.TemplateName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="所属页面" prop="PageId">
            <Select v-model="formEditTpage.PageId" placeholder="请选择所属页面">
                <Option v-for="item in TempPageLists" :value="item.PageId" :key="item.PageId">{{ item.PageCode}}.{{ item.PageName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="识别编码" prop="DisCode">
            <Input v-model="formEditTpage.DisCode" placeholder="请输入识别编码" />
          </FormItem>
          <FormItem label="识别名称" prop="DisName">
            <Input v-model="formEditTpage.DisName" placeholder="请输入识别名称" />
          </FormItem>
          <FormItem label="控件类型" prop="FormType">
            <Select v-model="formEditTpage.FormType" placeholder="请选择控件类型">
                <Option v-for="item in FormTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancelEdit('formEditTpage')">取消</Button>
        <Button type="primary" size="large" @click="handleSubmit('formEditTpage')">确定</Button>
      </div>
    </Modal>
    <!---编辑菜单弹窗end---->
  </div>
</template>

<script>
export default {
  name: "TemplatePageElment",
  data() {
    return {
      isShowEdit: false, //新增编辑弹窗
      operationName: "", //弹窗名称
      formEditTpage: {
        TemplateId: '',
        PageId:'',
        DisCode: "",
        DisName: "",
        FormType: "",
      },
      ruleValidate: {
        TemplateId:[
          { required: true, message: "请选择所属模板", trigger: "blur", type:'number' }
        ],
        PageId: [
          { required: true, message: "请选择所属页面", trigger: "blur", type:'number' }
        ],
        DisCode: [
          { required: true, message: "请输入识别编码", trigger: "blur" }
        ],
        DisName: [
          { required: true, message: "请输入识别名称", trigger: "blur" }
        ],
        FormType: [
          { required: true, message: "请选择控件类型", trigger: "change" }
        ]
      },
      TempPageElsList: [
         {
            type: 'index',
            width: 100,
            align: 'center'
        },
        {
          title: "所属模板",
          key: "TemplateId",
          align: "center",
          render:(h,params)=>{
            //   let tmpStr = this.TempLists.filter((a)=>{return a.Id==params.row.TemplateId})[0].TemplateName;
            //   return h('span',{},tmpStr)
            // }
            let menu = this.TempLists.filter((a)=>{return a.Id==params.row.TemplateId});
            let tmpStr=''
              if (menu && menu.length>0) {
                tmpStr=menu[0].TemplateName
              }
              return h('span',{}, tmpStr)
            }
        },
        {
          title: "所属页面",
          key: "PageId",
          align: "center",
          render:(h,params)=>{
              let menu = this.TempPageLists.filter((a)=>{return a.PageId==params.row.PageId});
              let tmpStr=''
              if (menu && menu.length>0) {
                tmpStr=menu[0].PageName
              }
              return h('span',{}, tmpStr)
            }
        },
        {
          title: "识别编码",
          key: "DisCode",
          align: "center"
        },
        {
          title: "识别名称",
          key: "DisName",
          align: "center"
        },
        {
          title: "控件类型",
          key: "FormType",
          align: "center",
          render:(h,params)=>{
              let tmpStr = "";
              if(params.row.FormType==1){
                tmpStr="图片";
              }else if(params.row.FormType==2){
                tmpStr="文本";
              }else if(params.row.FormType==3){
                tmpStr="输入框";
              }else{
                tmpStr="颜色选择";
              }
              return h('span',{},tmpStr)
            }
        },
        {
          title: "更多操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      pageElLists: [],
      model1: "",
      pageSize:20,
      page:1,
      pageTotal:0,//记录总条数
      elname:null,
      tempid:null,
      tempPageid:null,
      TempLists:[],
      TempPageLists:[],
      FormTypes: [
        {
          value: "1",
          label: "图片"
        },
        {
          value: "2",
          label: "文本"
        },
        {
          value: "3",
          label: "输入框"
        },
        {
          value: "4",
          label: "颜色选择"
        }
      ],

    };
  },
  components: {},
  computed: {},
  created() {
    this.GetAllTemps()
    this.GetAllTempPages()
    this.GetAllTempPagesEl()
  },
  mounted() {},
  methods: {
    changeTemp(value){
      this.tempPageid=null
      var data = {
        templateId:value,
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmModuleTemplatePage/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.TempPageLists=res.rows 
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    changeTemp2(value){
      this.formEditTpage.PageId=null
      var data = {
        templateId:value,
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmModuleTemplatePage/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.TempPageLists=res.rows 
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    //新增模板页面
    EditTempPageEl() {
      this.isShowEdit = true;
      this.operationName = "新增模板页面元素";

      this.$refs['formEditTpage'].resetFields();
      this.formEditTpage.DisId=null
      this.formEditTpage.TemplateId=null
      this.formEditTpage.PageId=null
    },
    //放弃新增编辑操作
    cancelEdit(name) {
      this.isShowEdit = false;
      this.$refs[name].resetFields();
    },
    //编辑菜单
    updateTemPageEl(index) {
      this.isShowEdit = true;
      this.operationName = "修改模板页面元素";

      this.$get("/api/crmMoudleDisCode/GetById", {id: index}).then(res => {
        if (res.state==1) {
          this.formEditTpage.DisId=index
          this.formEditTpage.TemplateId=res.rows[0].TemplateId
          this.changeTemp2(res.rows[0].TemplateId)
          this.formEditTpage.PageId=res.rows[0].PageId
          this.formEditTpage.DisCode=res.rows[0].DisCode
          this.formEditTpage.DisName=res.rows[0].DisName
          this.formEditTpage.FormType=res.rows[0].FormType
        } else {
          this.$Message.error("查询记录失败！"+res.msg);
        }
      });
    },
    //删除
    removeTemPageEl(index) {
      var data = {
        DisId: index
      };
      this.$post("/api/crmMoudleDisCode/Delete", data).then((res)=>{
          if(res.state==1){
            this.$Message.info("删除成功!");  
            this.GetAllTempPagesEl()        
          }else{
            this.$Message.error("删除失败！"+res.msg);
          }
      })
    },
    //提交数据
    handleSubmit(name) {
      console.log(this.$refs[name].model)
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
          this.$post("/api/crmMoudleDisCode/SaveOrUpdate", this.$refs[name].model).then((res)=>{
              this.$Spin.hide();
              if(res.state==1){
                this.isShowEdit = false;
                this.$Message.info("提交成功!");  
                this.GetAllTempPagesEl()      
              }else{
                this.$Message.error("提交失败！"+res.msg);
              }
          })
        } 
      });
    },
    //加载所有页面元素
    GetAllTempPagesEl(){
      var data = {
        DisNameLike:this.elname,
        TemplateId:this.tempid,
        PageId:this.tempPageid,
        pageSize: this.pageSize,
        pageIndex: this.page
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
      this.$post("/api/crmMoudleDisCode/GetListBySC",data).then((res)=>{
          this.$Spin.hide();
          if(res.state==1){
            this.pageElLists=res.rows
            this.pageTotal=res.total  
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    //获取所有模板
    GetAllTemps(){
      var data = {
        IsBase:1,
        IsValid:1,
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmModuleTemplate/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.TempLists=res.rows 
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    //获取所有页面
    GetAllTempPages(){
      var data = {
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmModuleTemplatePage/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.TempPageLists=res.rows 
          }else{
            this.$Message.error("查询失败!");
          }
      })
    },

    //第几页
    change(dpage){
      this.page=dpage
      this.GetAllTempPagesEl()
    },
    //切换每页显示多少条
    changeSize(pageSize){
      this.pageSize=pageSize
      this.GetAllTempPagesEl()
    },
  }
};
</script>

<style>
.TemplatePageElment .ivu-select-selection,
.TemplatePageElment .ivu-select-dropdown-list {
  text-align: left !important;
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

//新增、编辑弹窗
.hidebg {
  position: fixed;
  left: 0px;
  top: 0px;
  background-color: #000;
  width: 100%;
  height: 100%;
  filter: alpha(opacity=60); /*设置透明度为60%*/
  opacity: 0.6; /*非IE浏览器下设置透明度为60%*/
  z-index: 2;
}
.resetPwd {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 33%;
  height: 36%;
  min-width: 614px;
  min-height: 550px;
  margin-top: -13%;
  margin-left: -16%;
  background-color: #fff;
  border-radius: 10px;
  z-index: 3;

  .resetPwd_main {
    width: 85%;
    margin: auto;
    margin-top: 30px;

    .rptit {
      font-size: 26px;
      letter-spacing: 0px;
      color: #14cdbc;
    }
  }

  .resetInput {
    margin-top: 20px;

    .cancelbtn {
      width: 180px;
      height: 40px;
      background-color: #ccc;
      border-radius: 24px;
      border: #ccc;
      font-size: 16px;
      letter-spacing: 0px;
      color: #ffffff;
      margin-right: 20px;
    }
    .resetbtn {
      width: 180px;
      height: 40px;
      background-color: #14cdbc;
      border-radius: 24px;
      border: #14cdbc;
      font-size: 16px;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
.uploadimg{
  width: 60px;
  height: 60px;
}
</style>