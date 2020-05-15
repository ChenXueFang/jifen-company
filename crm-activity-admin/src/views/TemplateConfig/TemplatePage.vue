<template>
  <div class="TemplatePage">
    <Row type="flex" align="middle" style="margin-bottom:20px">
      <i-col style="min-width:65px">页面名称</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入页面名称" style="width: 200px" v-model="pname"/>
      </i-col>
      <i-col style="min-width:65px;margin-left:10px">所属模板</i-col>
      <i-col style="min-width:200px">
        <Select v-model="tempid" placeholder="请选择所属模板">
            <Option v-for="item in TempLists" :value="item.Id" :key="item.Id">{{ item.TemplateName }}</Option>
        </Select>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="primary" @click="GetAllTempPages">筛选</Button>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="error" @click="EditTempPage">+创建模板页面</Button>
      </i-col>
    </Row>

    <!--表格-->
    <Row type="flex" justify="center" align="middle" style="min-width:800px">
      <i-col span="24" class="hot-list">
        <Table stripe border :columns="TempPagesList" :data="pagesLists">
          <template slot-scope="{ row }" slot="PageName">
            <strong>{{ row.PageName }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <span class="oper" @click="updateTemPage(row.PageId)">编辑</span>
            <!-- <span class="oper" @click="removeTemPage(row.PageId)">删除</span> -->
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
              <Option v-for="item in TempLists" :value="item.Id" :key="item.Id">{{ item.TemplateName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="页面编号" prop="PageCode">
            <Input v-model="formEditTpage.PageCode" placeholder="请输入页面编号" />
          </FormItem>
          <FormItem label="页面名称" prop="PageName">
            <Input v-model="formEditTpage.PageName" placeholder="请输入页面名称" />
          </FormItem>
          <FormItem label="示例图片" prop="PageImg">
            <v-upload v-on:save="saveFile" ref="upFile" :srcurl="pgImg" v-on:del="delFile"></v-upload>
          </FormItem>
          <FormItem label="排序" prop="SortIndex">
            <Input v-model="formEditTpage.SortIndex" placeholder="请输入排序" type="number" />
          </FormItem>
          <FormItem label="弹窗显示状态" prop="ShowFlag">
            <Input v-model="formEditTpage.ShowFlag" placeholder="请输入弹窗显示状态"/>
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
import UploadImg from "@/components/UploadImg.vue";
export default {
  name: "TemplatePage",
  data() {
    return {
      isShowEdit: false, //新增编辑弹窗
      operationName: "", //弹窗名称
      formEditTpage: {
        TemplateId: "",
        PageCode: "",
        PageName: "",
        PageImg: "",
        SortIndex: "",
        ShowFlag:""
      },
      ruleValidate: {
        TemplateId: [
          { required: true, message: "请选择所属模板", trigger: "blur", type:'number'}
        ],
        PageCode: [
          { required: true, message: "请输入页面编号", trigger: "blur" }
        ],
        PageName: [
          { required: true, message: "请输入页面名称", trigger: "blur" }
        ],
        PageImg: [{ required: true, message: "请上传示例图片", trigger: "blur" }]
        // SortIndex: [
        //   { required: true, message: "请输入排序", trigger: "blur" }
        // ]
      },
      TempPagesList: [
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
          title: "页面编号",
          key: "PageCode",
          align: "center"
        },
        {
          title: "页面名称",
          key: "PageName",
          align: "center"
        },
        {
          title: "示例图片",
          key: "PageImg",
          align: "center",
          render: (h, params) => {
            if(params.row.msgList==''||params.row.msgList==null){
                return h('span', '');
              }else{
                return h('img', {
                    style: {
                        'width': '80px',
                        'height': '80px',
                        'border-radius': '5%'
                    },
                    attrs: {
                        src: params.row.msgList.PageImg_URL
                    }
                });
              }
            }
        },
        {
          title: "排序",
          key: "SortIndex",
          align: "center"
        },
        {
          title: "更多操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      pagesLists: [],
      model1: "",
      pageSize:20,
      page:1,
      pageTotal:0,//记录总条数
      pname:null,
      tempid:null,
      TempLists:[],

      defaultList: [
      ],
      imgName: '',
      visible: false,
      uploadList: [],

      pgImg:''
    };
  },
  components: {
    "v-upload":UploadImg,
  },
  computed: {},
  created() {
    this.GetAllTemps()
    this.GetAllTempPages()
  },
  mounted() {},
  methods: {
    //获取上传图片
    saveFile(src){
      this.img = src;
    },
    //删除上传图片
    delFile(){
      this.img=''
      this.pgImg=''
    },
    //新增模板页面
    EditTempPage() {
      this.isShowEdit = true;
      this.operationName = "新增模板页面";

      this.$refs['formEditTpage'].resetFields();
      this.formEditTpage.PageId=null
      this.formEditTpage.TemplateId=null
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
    updateTemPage(index) {
      this.isShowEdit = true;
      this.operationName = "修改模板页面";

      this.$get("/api/crmModuleTemplatePage/GetById", {id: index}).then(res => {
        if (res.state==1) {
          console.log(res.rows)
          this.formEditTpage.PageId=index
          this.formEditTpage.TemplateId=res.rows[0].TemplateId
          this.formEditTpage.PageCode=res.rows[0].PageCode
          this.formEditTpage.PageName=res.rows[0].PageName
          this.formEditTpage.SortIndex=res.rows[0].SortIndex
          this.formEditTpage.ShowFlag=res.rows[0].ShowFlag

          this.pgImg=(res.rows[0].PageImg=='' || res.rows[0].PageImg==null)?'':res.rows[0].PageImg
        } else {
          this.$Message.error("查询记录失败！"+res.msg);
        }
      });
    },
    //删除菜单
    removeTemPage(index) {
      var data = {
        PageId: index
      };
      this.$post("/api/crmModuleTemplatePage/Delete", data).then((res)=>{
          if(res.state==1){
            this.$Message.info("删除成功!");  
            this.GetAllTempPages()        
          }else{
            this.$Message.error("删除失败！"+res.msg);
          }
      })
    },
    //提交数据
    handleSubmit(name) {
      this.$refs[name].model.PageImg=(this.img==null || this.img=="")?this.pgImg:this.img
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
          this.$post("/api/crmModuleTemplatePage/SaveOrUpdate", this.$refs[name].model).then((res)=>{
              this.$Spin.hide();
              if(res.state==1){
                this.isShowEdit = false;
                this.$Message.info("提交成功!");  
                this.GetAllTempPages()      
              }else{
                this.$Message.error("提交失败！"+res.msg);
              }
          })
        }
      });
    },
    //加载所有模板页面
    GetAllTempPages(){
      var data = {
        PageNameLike:this.pname,
        TemplateId:this.tempid,
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
      this.$post("/api/crmModuleTemplatePage/GetListBySC",data).then((res)=>{
          this.$Spin.hide();
          if(res.state==1){
            this.pagesLists=res.rows
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
      this.$post("/api/crmModuleTemplate/GetListBySC",data).then((res)=>{
          this.$Spin.hide();
          if(res.state==1){
            this.TempLists=res.rows 
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    //第几页
    change(dpage){
      this.page=dpage
      this.GetAllTempPages()
    },
    //切换每页显示多少条
    changeSize(pageSize){
      this.pageSize=pageSize
      this.GetAllTempPages()
    },
  }
};
</script>

<style>
.TemplatePage .ivu-select-selection,
.TemplatePage .ivu-select-dropdown-list {
  text-align: left !important;
}
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
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