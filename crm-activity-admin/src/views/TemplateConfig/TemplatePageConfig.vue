<template>
  <div class="TemplatePageConfig">
    <Row type="flex" align="middle" style="margin-bottom:20px">
      <i-col style="min-width:65px;margin-left:10px">所属模板</i-col>
      <i-col style="min-width:200px">
        <Select v-model="tempid" placeholder="请选择所属模板" @on-change="changeTemp">
            <Option v-for="item in TempLists" :value="item.Id" :key="item.Id">{{ item.TemplateName }}</Option>
        </Select>
      </i-col>
      <i-col style="min-width:65px;margin-left:10px">所属页面</i-col>
      <i-col style="min-width:200px">
        <Select v-model="tempPageid" placeholder="请选择所属页面" @on-change="changeChange" label-in-value>
            <Option v-for="item in TempPageLists" :value="item.PageId" :key="item.PageId">{{ item.PageCode }}.{{ item.PageName }}</Option>
        </Select>
      </i-col>
      <i-col style="min-width:65px;margin-left:10px">识别编码</i-col>
      <i-col style="min-width:200px">
        <Select v-model="disCode" placeholder="请选择识别编码">
            <Option v-for="item in TempPageDisCodes" :value="item.DisCode" :key="item.DisId">{{item.DisCode}}.{{ item.DisName }}</Option>
        </Select>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="primary" @click="GetAllTempPagesEl">筛选</Button>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="error" @click="EditTempPageEl">+创建模板页面元素</Button>
      </i-col>
    </Row>

    <!--表格-->
    <Row type="flex" justify="center" align="middle" style="min-width:800px">
      <i-col span="24" class="hot-list">
        <Table stripe border :columns="TempPageElsList" :data="pageElLists">
          <template slot-scope="{ row }" slot="Name">
            <strong>{{ row.Name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <span class="oper" @click="updateTemPageEl(row.PageConfigId)">编辑</span>
            <!-- <span class="oper" @click="removeTemPageEl(row.PageConfigId)">删除</span> -->
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
            <Select v-model="formEditTpage.TemplateId" placeholder="请选择所属模板">
               <!-- @on-change="changeTemp" -->
              <Option v-for="item in TempLists" :value="item.Id" :key="item.Id">{{ item.TemplateName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="所属页面" prop="PageId">
            <Select v-model="formEditTpage.PageId" placeholder="请选择所属页面" @on-change="changeChange" label-in-value>
                <Option v-for="item in TempPageLists" :value="item.PageId" :key="item.PageId">{{ item.PageCode }}.{{ item.PageName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="识别代码" prop="DisCode">
            <Select v-model="formEditTpage.DisCode" placeholder="请选择识别代码">
                <Option v-for="item in TempPageDisCodes" :value="item.DisCode" :key="item.DisId">{{ item.DisCode }}.{{ item.DisName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="AttrName" prop="AttrName">
            <Input v-model="formEditTpage.AttrName" placeholder="请输入AttrName" />
          </FormItem>
          <FormItem label="组号" prop="GroupIndex">
            <Input v-model="formEditTpage.GroupIndex" placeholder="请输入组号" />
          </FormItem>
          <FormItem label="名称" prop="Name">
            <Input v-model="formEditTpage.Name" placeholder="请输入名称" />
          </FormItem>
          <FormItem label="颜色值" prop="ColorName16">
            <Input v-model="formEditTpage.ColorName16" placeholder="请输入颜色值" />
          </FormItem>
           <!-- <FormItem label="Style" prop="Style">
            <Input v-model="formEditTpage.Style" placeholder="请输入Style" />
          </FormItem>
           <FormItem label="Name属性" prop="AttrName">
            <Input v-model="formEditTpage.AttrName" placeholder="请输入Name属性" />
          </FormItem> -->
          <!-- <FormItem label="图片地址" prop="ImgUrl">
            <Input v-model="formEditTpage.ImgUrl" placeholder="请输入图片地址" />
          </FormItem> -->
          <FormItem label="图片地址" prop="ImgUrl">
            <v-upload v-on:save="saveFile" ref="upFile" :srcurl="pgImg" v-on:del="delFile"></v-upload>
          </FormItem>
          <FormItem label="文案描述" prop="DesName">
            <!-- <Input v-model="formEditTpage.DesName" placeholder="请输入文案描述" /> -->
            <v-editor :catchData="catchData" :htmlContent="formEditTpage.DesName"></v-editor>
          </FormItem>
          <FormItem label="排序">
            <Input v-model="formEditTpage.SortNum" placeholder="请输入排序" />
          </FormItem>
          <FormItem label="备注说明" prop="Remark">
            <Input v-model="formEditTpage.Remark" placeholder="请输入备注说明" />
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
import RichEditor from "@/components/RichEditor.vue";
import UploadImg from "@/components/UploadImg.vue";
export default {
  name: "TemplatePageConfig",
  data() {
    return {
      isShowEdit: false, //新增编辑弹窗
      operationName: "", //弹窗名称
      formEditTpage: {
        TemplateId: "",
        PageId:"",
        PageCode:'',
        DisCode: "",
        AttrName:"",
        GroupIndex: "",
        Name: "",
        ColorName16:"",
        // Style:"",
        // AttrName:"",
        ImgUrl:"",
        DesName:"",
        SortNum:'',
        Remark:""
      },
      ruleValidate: {
        TemplateId: [
          { required: true, message: "请选择所属模板", trigger: "change", type:'number' }
        ],
        PageId: [
          { required: true, message: "请选择所属页面", trigger: "change", type:'number' }
        ],
        DisCode: [
          { required: true, message: "请选择识别代码", trigger: "blur" }
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
          title: "页面code",
          key: "PageCode",
          align: "center"
        },
        {
          title: "识别编码",
          key: "DisCode",
          align: "center"
        },
        {
          title: "AttrName",
          key: "AttrName",
          align: "center"
        },
        {
          title: "组号",
          key: "GroupIndex",
          align: "center"
        },
        {
          title: "名称",
          key: "Name",
          align: "center"
        },
        {
          title: "颜色值",
          key: "ColorName16",
          align: "center"
        },
        // {
        //   title: "Style",
        //   key: "Style",
        //   align: "center"
        // },
        // {
        //   title: "Name属性",
        //   key: "AttrName",
        //   align: "center"
        // },
        {
          title: "图片地址",
          key: "ImgUrl",
          align: "center",
          render: (h, params) => {
            if(params.row.msgList==''||params.row.msgList==null||params.row.msgList.ImgUrl_URL==null){
                return h('span', '');
              }else{
                return h('img', {
                    style: {
                        'width': '100%',
                        'height': '48px',
                        'border-radius': '5%'
                    },
                    attrs: {
                        src: params.row.msgList.ImgUrl_URL
                    }
                });
              }
            }
        },
        // {
        //   title: "文案描述",
        //   key: "DesName",
        //   align: "center"
        // },
        {
          title: "排序",
          key: "SortNum",
          align: "center"
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
      disCode:null,
      TempLists:[],
      TempPageLists:[],
      TempPageDisCodes:[],
      
      pacode:'',
      editorContent:'',
      pgImg:''
    };
  },
  components: {
    "v-upload":UploadImg,
    "v-editor": RichEditor
  },
  computed: {},
  created() {
    this.GetAllTemps()
    this.GetAllTempPages()
    this.GetAllTempPagesDisCode()
    this.GetAllTempPagesEl()
  },
  mounted() {},
  methods: {
    //获取富文本内容
    catchData(val) {
      this.editorContent = val;
    },
    //获取上传图片
    saveFile(src){
      this.img = src;
    },
    //删除上传图片
    delFile(){
      this.img=''
      this.pgImg=''
    },
    changeTemp(value){
      this.page=1;
      this.tempPageid=null
      this.formEditTpage.PageId=null
      this.formEditTpage.DisCode=null
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
    changeChange(val){
      if(val==undefined){
        return
      }
      this.pacode=val.label.substring(0,val.label.lastIndexOf('.'))
      this.disCode=null
      this.formEditTpage.DisCode=null

      var data = {
        PageId:val.value,
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmMoudleDisCode/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.TempPageDisCodes=res.rows
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
      this.formEditTpage.PageConfigId=null
      this.formEditTpage.TemplateId=null
      this.formEditTpage.PageId=null
      this.formEditTpage.DisCode=null
      //新增清空上次上传图片
      if(this.$refs.upFile.uploadList.length>0){
        this.$refs.upFile.uploadList.splice(0);
      }
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

      this.$get("/api/crmModuleTempletePageConfig/GetById", {id: index}).then(res => {
        if (res.state==1) {
          this.formEditTpage.PageConfigId=index
          this.formEditTpage.TemplateId=res.rows[0].TemplateId
          this.formEditTpage.PageId=res.rows[0].PageId
          this.pacode=res.rows[0].PageCode
          this.formEditTpage.DisCode=res.rows[0].DisCode
          this.formEditTpage.AttrName=res.rows[0].AttrName
          this.formEditTpage.GroupIndex=res.rows[0].GroupIndex
          this.formEditTpage.Name=res.rows[0].Name
          this.formEditTpage.ColorName16=res.rows[0].ColorName16
          this.formEditTpage.Style=res.rows[0].Style
          this.formEditTpage.AttrName=res.rows[0].AttrName

          this.pgImg=(res.rows[0].ImgUrl=='' || res.rows[0].ImgUrl==null)?'':res.rows[0].ImgUrl
          this.formEditTpage.DesName=res.rows[0].DesName 
          this.editorContent= res.rows[0].DesName 
          this.formEditTpage.SortNum=res.rows[0].SortNum
          this.formEditTpage.Remark=res.rows[0].Remark
        } else {
          this.$Message.error("查询记录失败！"+res.msg);
        }
      });
    },
    //删除
    removeTemPageEl(index) {
      var data = {
        PageConfigId: index
      };
      this.$post("/api/crmModuleTempletePageConfig/Delete", data).then((res)=>{
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
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$refs[name].model.ImgUrl=(this.img==null || this.img=="")?this.pgImg:this.img
          this.$refs[name].model.FormType=this.TempPageDisCodes.filter((a)=>{return a.DisCode==this.$refs[name].model.DisCode})[0].FormType; 
          this.formEditTpage.PageCode=this.pacode
          this.formEditTpage.DesName=this.editorContent
          // console.log(1212,this.$refs[name].model)
          
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
          this.$post("/api/crmModuleTempletePageConfig/SaveOrUpdate", this.$refs[name].model).then((res)=>{
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
        TemplateId:this.tempid,
        PageId:this.tempPageid,
        DisCode:this.disCode,
        isBase: true,
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
      this.$post("/api/crmModuleTempletePageConfig/GetListBySC",data).then((res)=>{
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
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    //获取所有识别编码
    GetAllTempPagesDisCode(){
      var data = {
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmMoudleDisCode/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.TempPageDisCodes=res.rows
          }else{
            this.$Message.error("查询失败！"+res.msg);
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
.TemplatePageConfig .ivu-select-selection,
.TemplatePageConfig .ivu-select-dropdown-list {
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