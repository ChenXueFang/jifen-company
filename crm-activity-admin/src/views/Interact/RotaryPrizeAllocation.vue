<template>
  <div class="RotaryPrizeAllocation">
    <Tabs value="name1" :animated="false">
        <TabPane label="抽奖规则设置" name="name1">
            <div style="background-color:#FFF;height:800px;overflow-y: hidden;">
                <div class="RotartPAInput">
                    <Form
                    ref="formEdit"
                    :model="formEdit"
                    :rules="ruleValidate"
                    label-position="right"
                    :label-width="150"
                    >
                    <FormItem label="预估参与人数">
                        <Input v-model="formEdit.AttendNumber" placeholder="请输入预估参与人数" />
                    </FormItem>
                    <FormItem label="限制类型" prop="LimitType">
                        <RadioGroup v-model="formEdit.LimitType">
                            <Radio label="0">不限</Radio>
                            <Radio label="1">限制</Radio>
                        </RadioGroup>
                    </FormItem>
                    <div v-if="formEdit.LimitType==1 ||formEdit.LimitType==''">
                        <FormItem label="每人每天抽奖次数" prop="PreDayCount">
                            <Input v-model="formEdit.PreDayCount" placeholder="请输入每人每天抽奖次数" />
                        </FormItem>
                        <FormItem label="每人每天最多中奖次数" prop="PreDayWinCount">
                            <Input v-model="formEdit.PreDayWinCount" placeholder="请输入每人每天最多中奖次数" />
                        </FormItem>
                        <FormItem label="每人最多中奖次数" prop="PreWinCount">
                            <Input v-model="formEdit.PreWinCount" placeholder="请输入每人最多中奖次数" />
                        </FormItem>
                        <FormItem label="每人限制抽奖次数（1-100）" prop="PreLimitLotteryCount">
                            <Input v-model="formEdit.PreLimitLotteryCount" placeholder="请输入每人限制抽奖次数" />
                        </FormItem>
                        <FormItem label="中奖时间范围" >
                          <DatePicker :value="PRTime" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placeholder="请选择中奖时间范围" style="width:100%" @on-change="changePRTime" ></DatePicker>
                        </FormItem>
                    </div>
                    <FormItem label="抽奖条件类型"> 
                        <Select v-model="formEdit.LotteryConditionType" placeholder="请选择抽奖条件类型">
                          <Option v-for="item in usedcondition" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="使用条件">
                        <Input v-model="formEdit.UseConditionValue" placeholder="请输入使用条件" />
                    </FormItem>
                    <FormItem>
                        <Button type="ghost" size="large" style="color:#555;margin-right:20px" @click="back">返回上一页</Button>
                        <!-- <Button type="text" size="large" @click="cancelEdit('formEdit')">取消</Button> -->
                        <Button type="primary" size="large" @click="handleSubmit('formEdit')">确定</Button>
                    </FormItem>
                    </Form>
                </div>
            </div>
        </TabPane>
        <TabPane label="奖品设置" name="name2">
            <div style="background-color:#FFF;">
                <div class="PrizesInput">
                    <Row type="flex" align="middle" style="margin-bottom:20px">
                        <i-col style="margin-left:10px">
                            <Button type="error" @click="EditPrize">+新增奖品</Button>
                        </i-col>
                    </Row>

                    <Row type="flex" justify="center" align="middle" style="min-width:800px">
                        <i-col span="24" class="hot-list">
                            <Table stripe border :columns="PrizesList" :data="pList">
                            <template slot-scope="{ row }" slot="PrizeName">
                                <strong>{{ row.PrizeName }}</strong>
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <span class="oper" @click="updatePrize(row.Id)">编辑</span>
                                <span class="oper" @click="removePrize(row.Id)">删除</span>
                            </template>
                            </Table>
                        </i-col>
                        <i-col span="24" class="hot-list splitpage">
                            <Page :total="pageTotal" show-total show-elevator @on-change="change" @on-page-size-change="changeSize" />
                        </i-col>
                    </Row>
                </div>
            </div>

            <!---编辑菜单弹窗---->
            <Modal
            v-model="isShowEdit"
            :title="operationName"
            :mask-closable="false"
            >
            <div>
                <Form
                ref="formEditPrize"
                :model="formEditPrize"
                :rules="ruleValidatePrize"
                label-position="right"
                :label-width="100"
                class="showeditPrize"
                >
                    <FormItem label="标题" prop="Title">
                        <Input v-model="formEditPrize.Title" placeholder="请输入标题" />
                    </FormItem>
                    <FormItem label="奖品mapping" prop="PrizeMapping">
                        <Input v-model="formEditPrize.PrizeMapping" placeholder="请输入奖品mapping" />
                    </FormItem>
                    <FormItem label="奖品名称" prop="PrizeName">
                        <Input v-model="formEditPrize.PrizeName" placeholder="请输入奖品名称" />
                    </FormItem>
                    <FormItem label="奖品图片" prop="PrizeImg">
                        <v-upload v-on:save="saveFile" ref="upFile" :srcurl="pgImg" v-on:del="delFile"></v-upload>
                    </FormItem>
                    
                    <FormItem label="奖品类型" prop="PrizeType">
                      <Select v-model="formEditPrize.PrizeType" placeholder="请选择奖品类型">
                      <Option v-for="item in PType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="优惠券领取地址" v-if="formEditPrize.PrizeType==2">
                        <Input v-model="formEditPrize.PrizeToUrl" placeholder="请输入优惠券领取地址" />
                    </FormItem>
                    <FormItem label="积分值" v-if="formEditPrize.PrizeType==3">
                        <Input v-model="formEditPrize.PrizeCount" placeholder="请输入积分值" />
                    </FormItem>
                    <FormItem label="中奖概率(%)">
                        <Input v-model="formEditPrize.WinningRate" placeholder="请输入中奖概率" />
                    </FormItem>
                    <FormItem label="奖品总数" prop="PrizeAmount">
                        <Input v-model="formEditPrize.PrizeAmount" placeholder="请输入奖品总数" />
                    </FormItem>
                    <FormItem label="每人每天最多中奖次数" prop="PreDayWinCount">
                        <Input v-model="formEditPrize.PreDayWinCount" placeholder="请输入每人每天最多中奖次数" />
                    </FormItem>
                    <FormItem label="每人最多中奖次数" prop="PreWinCount">
                        <Input v-model="formEditPrize.PreWinCount" placeholder="请输入每人最多中奖次数" />
                    </FormItem>
                    <FormItem label="中奖时间范围" >
                        <DatePicker :value="ptime" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placeholder="请选择中奖时间范围" style="width:100%" @on-change="changeTime" ></DatePicker>
                    </FormItem>
                    
                    <FormItem label="发货渠道">
                        <RadioGroup v-model="formEditPrize.LogisticsType">
                            <Radio label="1">自己发</Radio>
                            <Radio label="2">物流公司发</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="物流公司" v-if="formEditPrize.LogisticsType==2||formEditPrize.LogisticsType==''">
                        <!-- <Input v-model="formEditPrize.LogisticsCompany" placeholder="请输入物流公司名称" /> -->
                        <Select v-model="formEditPrize.LogisticsCompany" placeholder="请选择物流公司">
                          <Option v-for="item in LogisticsCompanys" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="排序">
                        <Input v-model="formEditPrize.SortNum" placeholder="请输入奖品排序" />
                    </FormItem>
                </Form> 
            </div>
            <div slot="footer">
              <Button type="text" size="large" @click="cancelPrize('formEditPrize')">取消</Button>
              <Button type="primary" size="large" @click="SubmitPrize('formEditPrize')">确定</Button>
            </div>
            </Modal>
            <!---编辑菜单弹窗end---->
        </TabPane>
        <!-- <TabPane label="抽奖记录" name="name3">
            <div style="background-color:#FFF;">
                <div class="PrizesInput">
                    <Row type="flex" align="middle" style="margin-bottom:20px">
                        <i-col style="min-width:65px">用户ID</i-col>
                        <i-col style="min-width:200px">
                            <Input placeholder="请输入用户ID" style="width: 200px" v-model="usid" />
                        </i-col>
                        <i-col style="min-width:65px">Uuid</i-col>
                        <i-col style="min-width:200px">
                            <Input placeholder="请输入第三方Uid" style="width: 200px"  v-model="uuid" />
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
                            <Page :total="PrpageTotal" show-total show-elevator @on-change="Prchange" @on-page-size-change="PrchangeSize" />
                        </i-col>
                    </Row>
                </div>
            </div>

            <Modal
            v-model="isShowDelData"
            title="删除测试数据"
            :mask-closable="false"
            >
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
        </TabPane> -->
    </Tabs>

    
  </div>
</template>

<script>
import UploadImg from "@/components/UploadImg.vue";
import util from "../../utils/util"
export default {
  name: "RotaryPrizeAllocation",
  data() {
    return {
      formEdit: {
        Id:null,
        ActiveNo: this.ActNo,
        ActiveId: this.ActId,
        AttendNumber:"",
        LimitType: "",
        PreDayCount: "",
        PreDayWinCount:"",
        PreWinCount: "",
        PreLimitLotteryCount: "",
        FromTime:'',
        ToTime:'',
        LotteryConditionType:'nocondition',
        UseConditionValue:''
      },
      ruleValidate: {
        LimitType: [{ required: true, message: "请选择限制类型" }],
        PreDayCount: [{ required: true, message: "请输入每人每天抽奖次数" }],
        PreDayWinCount: [{ required: true, message: "请输入每人每天最多中奖次数" }],
        PreWinCount: [{ required: true, message: "请输入每人最多中奖次数" }],
        PreLimitLotteryCount: [{ required: true, message: "请输入每人限制抽奖次数" }],
      },

      prizeRule:{},

      PrizesList:[
         {
            type: 'index',
            width: 100,
            align: 'center'
        },
        {
          title: "标题",
          key: "Title",
          align: "center"
        },
        {
          title: "奖品mapping",
          key: "PrizeMapping",
          align: "center"
        },
        {
          title: "奖品名称",
          key: "PrizeName",
          align: "center"
        },
        {
          title: "奖品图片",
          key: "PrizeImg",
          align: "center" ,
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
                          src:params.row.msgList.PrizeImg_URL
                      }
                  });
              }
            }
        },
        {
          title: "奖品类型",
          key: "PrizeType",
          align: "center" ,
          render:(h,params)=>{
              let tmpStr = "";
              if(params.row.PrizeType==1){
                tmpStr="实物";
              }else if(params.row.PrizeType==2){
                tmpStr="优惠券";
              }else if(params.row.PrizeType==3){
                tmpStr="积分";
              }else{
                tmpStr="不中奖";
              }
              return h('span',{},tmpStr)
            }
        },
        {
          title: "中奖概率",
          key: "WinningRate",
          align: "center" ,
          render:(h,params)=>{
              let rate=params.row.WinningRate
              if(rate==null){
                return h('span',{},"")
              }else{
                return h('span',{},params.row.WinningRate+"%")
              }
            }
        },
        {
          title: "奖品总数",
          key: "PrizeAmount",
          align: "center" 
        },
        {
          title: "剩余奖品数",
          align: "center" ,
          render: (h, params) => {
            if(params.row.msgList==''||params.row.msgList==null){
                return h('span', '');
              }else{
                return h('span',{},params.row.msgList.PrizeBalanceAmount)
              }
            }
        },
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
      pList:[],
      PType: [
        {
          value: "1",
          label: "实物"
        },
        {
          value: "2",
          label: "优惠券"
        },
        {
          value: "3",
          label: "积分"
        },
        {
          value: "4",
          label: "不中奖"
        }
      ],
      pageSize:20,
      page:1,
      pageTotal:0,//记录总条数
      isShowEdit:false,
      operationName:'',
      formEditPrize:{
        Id:null,
        ActivityNo: this.ActNo,
        ActiveId: this.ActId,
        Title:'',
        PrizeMapping:'',
        PrizeName:'',
        PrizeImg:'',
        PrizeType:'',
        WinningRate:'',
        PrizeAmount:'',
        PreDayWinCount:'',
        PreWinCount:'',
        FromTime:null,
        ToTime:null,
        PrizeToUrl:null,
        PrizeCount:null,
        LogisticsType:'',
        LogisticsCompany:'',
        SortNum:''
      },
      ruleValidatePrize:{
        PrizeName: [
          { required: true, message: "请填写奖品名称", trigger: "blur" }
        ],
        PrizeType: [
          { required: true, message: "请选择奖品类型", trigger: "change" }
        ],
        PrizeAmount: [{
              required: true,
              message: '请填写奖品总数'
            },
            {
              type:'number',
              message:'输入的类型为数字',
              transform(value) {
                return Number(value);
              }
            }]
      },
      img:'',
      uploadList: [],

      PrizeRecordsList:[
            {
                type: 'index',
                width: 100,
                align: 'center'
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

        pRList:[],
        PrpageSize:20,
        Prpage:1,
        PrpageTotal:0,//记录总条数
        usid:null,
        uuid:null,

        ActId:null,
        ActNo:null,
        gzid:null,
        pgImg:'',
        ptime:[], //中奖时间范围
        PRTime:[],//中奖时间范围-抽奖规则
        LogisticsCompanys: [
        {
          value: "飞利浦",
          label: "飞利浦"
        }        
      ],

      formDelData:{
        activeNo:'',
        uuid:''
      },
      ruleDelData:{},
      isShowDelData:false,//删除测试数据弹窗
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
    "v-upload":UploadImg,
  },
  computed: {},
  created() {
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {
        //因为当钩子执行前，组件实例还没被创建
        // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
        // console.log(vm);//当前组件的实例
        vm.ActId=vm.$route.query.ActivityId
        vm.ActNo=vm.$route.query.ActivityNo

        vm.GetPrizeRule()
        vm.GetAllPrizes()
        vm.GetAllPrizeRecords()
    })
  },
      
  mounted() {},
  methods: {
    // 返回上一页
    back() {
      this.$router.go(-1);
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
    //放弃新增编辑用户操作
    cancelEdit(name) {
        this.formEdit.Id=null
        this.$refs[name].resetFields();
    },
    //提交数据-抽奖规则
    handleSubmit(name) {
      this.$refs[name].model.Id=this.gzid
      this.$refs[name].model.ActiveId=this.ActId
      this.$refs[name].model.ActiveNo=this.ActNo
      if(this.PRTime==null){
        this.$refs[name].model.FromTime=null
        this.$refs[name].model.ToTime=null
      }else{
        this.$refs[name].model.FromTime=this.PRTime[0]
        this.$refs[name].model.ToTime=this.PRTime[1] 
      }

      this.$refs[name].validate(valid => {
        if (valid) {
          this.$post("/api/crmPrizeRule/SaveOrUpdate", this.$refs[name].model).then((res)=>{
              if(res.state==1){
                console.log("保存抽奖规则",res)
                if(res.rows!=null){
                  this.gzid=res.rows[0].Id
                }
                this.$Message.info("提交成功!");  
              }else{
                this.$Message.error("提交失败！"+res.msg);
              }
          })
        }
      });
    },
    //查询抽奖规则
    GetPrizeRule(){
        var data = {
        activeNo:this.ActNo,
        activeId:this.ActId,
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmPrizeRule/GetListBySC",data).then((res)=>{
          if(res.state==1){
            if(res.rows.length>0){
                this.prizeRule=res.rows[0]
                this.formEdit.Id=res.rows[0].Id,
                this.gzid=res.rows[0].Id,
                this.formEdit.ActiveNo=res.rows[0].ActiveNo,
                this.formEdit.ActiveId=res.rows[0].ActiveId,
                this.formEdit.AttendNumber=res.rows[0].AttendNumber,
                this.formEdit.LimitType=res.rows[0].LimitType+'',
                this.formEdit.PreDayCount=res.rows[0].PreDayCount,
                this.formEdit.PreDayWinCount=res.rows[0].PreDayWinCount,
                this.formEdit.PreWinCount=res.rows[0].PreWinCount,
                this.formEdit.PreLimitLotteryCount=res.rows[0].PreLimitLotteryCount,
                this.PRTime=[res.rows[0].FromTime,res.rows[0].ToTime],
                this.formEdit.LotteryConditionType=res.rows[0].LotteryConditionType
                this.formEdit.UseConditionValue=res.rows[0].UseConditionValue
            }else{
              this.formEdit.Id=null,
              this.formEdit.ActiveNo=null,
              this.formEdit.ActiveId=null,
              this.formEdit.AttendNumber='',
              this.formEdit.LimitType='',
              this.formEdit.PreDayCount='',
              this.formEdit.PreDayWinCount='',
              this.formEdit.PreWinCount='',
              this.formEdit.PreLimitLotteryCount='',
              this.formEdit.FromTime=null,
              this.formEdit.ToTime=null,
              this.formEdit.LotteryConditionType='nocondition'
              this.formEdit.UseConditionValue=null
            }
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    
    //查询该活动下所有奖品
    GetAllPrizes(){
      var data = {
        activeNo:this.ActNo,
        activeId:this.ActId,
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmPrizeProduct/GetListBySC",data).then((res)=>{
          if(res.state==1){
              this.pList=res.rows
              this.pageTotal=res.total  
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    //第几页
    change(dpage){
      this.page=dpage
      this.GetAllPrizes()
    },
    //切换每页显示多少条
    changeSize(pageSize){
      this.pageSize=pageSize
      this.GetAllPrizes()
    },
    //新增奖品
    EditPrize() {
      this.isShowEdit = true;
      this.operationName = "新增奖品";

      this.$refs['formEditPrize'].resetFields();
      this.formEditPrize.Id=null
      this.formEditPrize.WinningRate=null
      this.formEditPrize.SortNum=null
      this.ptime=null
      //新增清空上次上传图片
      if(this.$refs.upFile.uploadList.length>0){
        this.$refs.upFile.uploadList.splice(0);
      }
    },
    //奖品中奖范围时间
    changeTime(data){
        this.ptime=data
    },
    //奖品中奖范围时间(抽奖规则)
    changePRTime(dat){
        this.PRTime=dat
    },
    //提交奖品
    SubmitPrize(name){
      console.log("1111",this.ptime)
      this.$refs[name].model.ActiveId=this.ActId,
      this.$refs[name].model.ActivityNo=this.ActNo,
      this.$refs[name].model.PrizeImg=(this.img==null || this.img=="")?this.pgImg:this.img
      // this.$refs[name].model.ptime=this.ptime
      if(this.ptime==null){
        this.$refs[name].model.FromTime=null
        this.$refs[name].model.ToTime=null
      }else{
        this.$refs[name].model.FromTime=this.ptime[0]==''?null:this.ptime[0]
        this.$refs[name].model.ToTime=this.ptime[1]==''?null:this.ptime[1] 
      }
      this.$refs[name].model.LogisticsType=this.$refs[name].model.LogisticsType=="null"?null:this.$refs[name].model.LogisticsType
        this.$refs[name].validate(valid => {
        if (valid) {
          this.$post("/api/crmPrizeProduct/SaveOrUpdate", this.$refs[name].model).then((res)=>{
              if(res.state==1){
                this.isShowEdit = false;
                this.$Message.info("提交成功!");  
                this.GetAllPrizes()      
              }else{
                this.$Message.error("提交失败！"+res.msg);
              }
          })
        } 
      });
    },
    //编辑奖品
    updatePrize(index){
        this.isShowEdit = true;
        this.operationName = "修改奖品";

        this.$get("/api/crmPrizeProduct/GetById", {id: index}).then(res => {
            if (res.state==1) {
            this.formEditPrize.Id=index
            this.formEditPrize.ActivityNo=res.rows[0].ActivityNo,
            this.formEditPrize.ActiveId=res.rows[0].ActiveId
            this.formEditPrize.Title=res.rows[0].Title,
            this.formEditPrize.PrizeMapping=res.rows[0].PrizeMapping
            this.formEditPrize.PrizeName=res.rows[0].PrizeName

            this.pgImg=(res.rows[0].PrizeImg=='' || res.rows[0].PrizeImg==null)?'':res.rows[0].PrizeImg
            this.formEditPrize.PrizeType=res.rows[0].PrizeType+""
            this.formEditPrize.WinningRate=res.rows[0].WinningRate
            this.formEditPrize.PrizeToUrl=res.rows[0].PrizeToUrl
            this.formEditPrize.PrizeCount=res.rows[0].PrizeCount
            this.formEditPrize.PrizeAmount=res.rows[0].PrizeAmount
            this.formEditPrize.PreDayWinCount =res.rows[0].PreDayWinCount 
            this.formEditPrize.PreWinCount=res.rows[0].PreWinCount
            this.formEditPrize.LogisticsType=(res.rows[0].LogisticsType==null)?'':res.rows[0].LogisticsType+''
            this.formEditPrize.LogisticsCompany=res.rows[0].LogisticsCompany
            this.ptime=[res.rows[0].FromTime,res.rows[0].ToTime]
            this.formEditPrize.SortNum=res.rows[0].SortNum
            } else {
            this.$Message.error("查询记录失败！"+res.msg);
            }
        });
    },
    //删除奖品
    removePrize(index){
      var data = {
        id: index
      };
      this.$post("/api/crmPrizeProduct/Delete", data).then((res)=>{
          if(res.state==1){
            this.$Message.info("删除成功!");    
            this.GetAllPrizes()      
          }else{
            this.$Message.error("删除失败！"+res.msg);
          }
      })
    },
    //取消编辑
    cancelPrize(name){
      this.isShowEdit = false;
      this.$refs[name].resetFields();
      this.formEditPrize.Id=null
      this.formEditPrize.LogisticsType=''
      this.formEditPrize.LogisticsCompany=''
      this.ptime=''
    },


    //获取所有抽奖记录
    GetAllPrizeRecords(){
        var data = {
            activeNo:this.ActNo,
            activeId:this.ActId,
            Userid:this.usid,
            Uuid:this.uuid,
            pageSize: this.PrpageSize,
            pageIndex: this.Prpage
        };
        this.$post("/api/crmPrizeRecord/GetListBySC",data).then((res)=>{
            if(res.state==1){
                this.pRList=res.rows
                this.PrpageTotal=res.total  
            }else{
                this.$Message.error("查询失败！"+res.msg);
            }
        })
    },
    Prchange(dpage){
        this.Prpage=dpage
        this.GetAllPrizeRecords()
    },
    PrchangeSize(pageSize){
        this.PrpageSize=pageSize
        this.GetAllPrizeRecords()
    },

    //删除测试数据弹窗
    delTestData(){
      this.isShowDelData = true;
    },
    //取消删除测试数据
    cancelDelData(name){
      this.isShowDelData = false;
      this.$refs[name].resetFields();
      this.$refs[name].model.uuid=""
    },
    //提交删除测试数据
    SubmitDelData(name){
      this.$refs[name].model.activeNo=this.ActNo,
      this.$post("/api/crmPrizeProduct/DeleteTestData", this.$refs[name].model).then((res)=>{
          if(res.state==1){
            this.isShowDelData = false;
            this.$Message.info("执行成功!");  
            this.GetAllPrizeRecords()
          }else{
            this.$Message.error("执行失败！"+res.msg);
          }
      })
    },
  }
};
</script>

<style>
.showeditPrize >>> .ivu-form-item{
  margin-bottom: 10px;
}
.RotartPAInput .ivu-form-item-content{
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
.RotartPAInput{
    padding: 20px;
    width: 50%;
    margin: auto;
}
.PrizesInput{
    padding: 20px;
}
.uploadimg{
  width: 60px;
  height: 60px;
}
</style>