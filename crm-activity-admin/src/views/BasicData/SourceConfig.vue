<template>
  <div class="SourceConfig">
    <Row type="flex" align="middle" style="margin-bottom:20px">
      <i-col style="min-width:65px">Title</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入Title" style="width: 200px" v-model="ser_title" />
      </i-col>
      <i-col style="min-width:65px">活动</i-col>
      <i-col style="min-width:200px">
        <Select v-model="ser_activity" placeholder="请选择活动">
          <Option v-for="item in activityData" :value="item.ActivityNo" :key="item.ActivityNo">{{item.ActivityNo}}.{{ item.ActivityName }}</Option>
        </Select>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="primary" @click="GetAllSRs">筛选</Button>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="error" @click="EditSource">+新增Source记录</Button>
      </i-col>
    </Row>

    <!--表格-->
    <Row type="flex" justify="center" align="middle" style="min-width:800px">
      <i-col span="24" class="hot-list">
        <Table stripe border :columns="SourceRecordList" :data="SRList">
          <template slot-scope="{ row }" slot="Source">
            <strong>{{ row.Source }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <span class="oper" @click="updateSR(row.Id)">编辑</span>
            <span class="oper" @click="removeSR(row.Id)">删除</span>
          </template>
        </Table>
      </i-col>
      <i-col span="24" class="hot-list splitpage">
        <Page :total="pageTotal" :current="page" :page-size='pageSize' show-total show-elevator @on-change="change" @on-page-size-change="changeSize" />
      </i-col>
    </Row>

    <!---编辑用户弹窗-->
    <Modal
      v-model="isShowEdit"
      :title="operationName"
      :mask-closable="false"
      :closable="false"
    >
      <div class="resetInput">
        <Form
          ref="formEditSR"
          :model="formEditSR"
          :rules="ruleValidate"
          label-position="right"
          :label-width="100"
        >
          <FormItem label="Title" prop="Title">
            <Input v-model="formEditSR.Title" placeholder="请输入Title" />
          </FormItem>
          <FormItem label="活动" prop="ActivityNo">
            <Select v-model="formEditSR.ActivityNo" placeholder="请选择活动">
              <Option v-for="item in activityData" :value="item.ActivityNo" :key="item.ActivityNo">{{item.ActivityNo}}.{{ item.ActivityName }}</Option>
            </Select>
          </FormItem>
         <FormItem label="Source" prop="Source">
            <Input v-model="formEditSR.Source" placeholder="请输入Source" />
          </FormItem>
          <FormItem label="SourceName" prop="SourceName">
            <Input v-model="formEditSR.SourceName" placeholder="请输入SourceName" />
          </FormItem>
          <FormItem label="第三方source" prop="MappingSource">
            <Input v-model="formEditSR.MappingSource" placeholder="请输入第三方source" />
          </FormItem>
          <FormItem label="活动渠道" prop="ActivityChannel">
            <RadioGroup v-model="formEditSR.ActivityChannel">
                <Radio label="1">线上</Radio>
                <Radio label="2">线下</Radio>
            </RadioGroup>
        </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancelEdit('formEditSR')">取消</Button>
        <Button type="primary" size="large" @click="handleSubmit('formEditSR')">确定</Button>
      </div>
    </Modal>
    <!---编辑用户弹窗end---->
  </div>
</template>

<script>
export default {
  name: "SourceConfig",
  data() {
    return {
      isShowEdit: false, //新增编辑弹窗
      operationName: "", //弹窗名称
      formEditSR: {
        Title: "",
        ActiveId: "",
        ActivityNo: "",
        Source: "",
        SourceName: "",
        MappingSource: "",
        ActivityChannel: ""
      },
      ruleValidate: {
        Title: [{ required: true, message: "请输入Title", trigger: "blur" }],
        ActivityNo: [{ required: true, message: "请选择活动", trigger: "change" }],
        Source: [{ required: true, message: "请输入Source", trigger: "blur" }],
        SourceName: [{ required: true, message: "请输入SourceName", trigger: "blur" }],
        ActivityChannel: [{ required: true, message: "请选择活动渠道", trigger: "change" }],
      },
      SourceRecordList: [
        {
            type: 'index',
            align: 'center'
        },
        {
          title: "Title",
          key: "Title",
          align: "center"
        },
        {
          title: "ActivityNo",
          key: "ActivityNo",
          align: "center"
        },
        
        {
          title: "活动名称",
          key: "ActiveId",
          align: "center",
          render:(h,params)=>{
              let actName = this.activityData.filter((a)=>{return a.ActivityNo==params.row.ActivityNo});
              let tmpStr=''
              if (actName && actName.length>0) {
                tmpStr=actName[0].ActivityName
              }
              return h('span',{}, tmpStr)
            }
        },
        {
          title: "Source",
          key: "Source",
          align: "center"
        },
        {
          title: "SourceName",
          key: "SourceName",
          align: "center"
        },
        {
          title: "第三方source",
          key: "MappingSource",
          align: "center"
        },
        {
          title: "活动渠道",
          key: "ActivityChannel",
          align: "center",
          render:(h,params)=>{
              let tmpStr = "";
              if(params.row.ActivityChannel==1){
                tmpStr="线上";
              }else{
                tmpStr="线下";
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
      SRList: [],

      ser_title:null,
      ser_activity:null,
      pageSize:20,
      page:1,
      pageTotal:0,//记录总条数
      RolesLists:[],
      activityData:[],//活动名称
    };
  },
  components: {},
  computed: {},
  created() {
    this.GetAllActivity()
    this.GetAllSRs()
  },
  mounted() {},
  methods: {

    //新增用户
    EditSource() {
      (this.isShowEdit = true), (this.operationName = "新增Source记录");
      this.$refs['formEditSR'].resetFields();
      this.formEditSR.Id=null
    },
    //放弃新增编辑用户操作
    cancelEdit(name) {
      this.isShowEdit = false;
      this.$refs[name].resetFields();
    },
    //编辑
    updateSR(index) {
      this.isShowEdit = true;
      this.operationName = "修改Source记录";

      this.$get("/api/crmSourceRecord/GetById", {id: index}).then(res => {
        if (res.state==1) {
          this.formEditSR.Id=index
          this.formEditSR.Title=res.rows[0].Title
          this.formEditSR.ActiveId=res.rows[0].ActiveId
          this.formEditSR.ActivityNo=res.rows[0].ActivityNo
          this.formEditSR.Source=res.rows[0].Source
          this.formEditSR.SourceName=res.rows[0].SourceName
          this.formEditSR.MappingSource=res.rows[0].MappingSource
          this.formEditSR.ActivityChannel=res.rows[0].ActivityChannel+''
        } else {
          this.$Message.error("查询记录失败!");
        }
      });
    },
    //删除
    removeSR(index) {
      var data = {
        Id: index
      };
      this.$post("/api/crmSourceRecord/Delete", data).then((res)=>{
          if(res.state==1){
            this.$Message.info("删除成功!");    
            this.GetAllSRs()      
          }else{
            this.$Message.error("删除失败!");
          }
      })
    },
    //提交数据
    handleSubmit(name) {
      this.$refs[name].model.ActiveId=this.activityData.filter((a)=>{return a.ActivityNo==this.$refs[name].model.ActivityNo})[0].ActivityId; 

      this.$refs[name].validate(valid => {
        if (valid) {
          this.$post("/api/crmSourceRecord/SaveOrUpdate", this.$refs[name].model).then((res)=>{
              if(res.state==1){
                this.isShowEdit = false;
                this.$Message.info("提交成功!");    
                this.GetAllSRs()    
              }else{
                this.$Message.error("提交失败！"+res.msg);
              }
          })
        }
      });
    },
    //加载所有记录
    GetAllSRs(){
      var data = {
        TitleLike:this.ser_title,
        ActivityNo:this.ser_activity,
        pageSize: this.pageSize,
        pageIndex: this.page
      };
      this.$post("/api/crmSourceRecord/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.SRList=res.rows    
            this.pageTotal=res.total
          }else{
            this.$Message.error("查询失败!");
          }
      })
    },
    //加载所有活动
    GetAllActivity(){
      var data = {
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmActivityInfo/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.activityData=res.rows
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },

    change(dpage){
      this.page=dpage
      this.GetAllSRs()
    },
    //切换每页显示多少条
    changeSize(pageSize){
      this.pageSize=pageSize
      this.GetAllSRs()
    },

    
  }
};
</script>


<style>
.SourceConfig .ivu-select-selection,
.SourceConfig .ivu-select-dropdown-list,
.SourceConfig .ivu-checkbox-group {
  text-align: left !important;
}
.SourceConfig .ivu-checkbox-group {
  height: 30px;
  overflow-y: scroll;
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
</style>