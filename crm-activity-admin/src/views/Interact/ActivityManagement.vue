<template>
  <div class="ActivityManagement">
    <!-- 查询条件 -->
    <Row type="flex" align="middle" style="margin-bottom:20px">
      <i-col style="min-width:65px">活动名称</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入活动名称" style="width: 200px" v-model="actName" />
      </i-col>
      <i-col style="min-width:65px">活动NO</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入活动NO" style="width: 200px" v-model="actno" />
      </i-col>
      <i-col style="min-width:65px;margin-left:10px">活动类型</i-col>
      <i-col style="min-width:200px">
        <Select v-model="actModCode" placeholder="请输入活动类型">
          <Option v-for="item in actType" :value="item.ModuleCode" :key="item.ModuleCode">{{item.ModuleCode}}.{{ item.ModuleName }}</Option>
        </Select>
      </i-col>
      <i-col style="min-width:65px;margin-left:10px">活动状态</i-col>
      <i-col style="min-width:200px">
        <Select v-model="actStat" placeholder="请输入活动状态">
          <Option v-for="item in actStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="primary" @click="GetAllActivity">筛选</Button>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="error" @click="toCreateActivity">+创建活动</Button>
      </i-col>
    </Row>

    <!--表格-->
    <Row type="flex" justify="center" align="middle" style="min-width:800px">
      <i-col span="24">
        <Table stripe :columns="ActivityLists" :data="activityData">
          <template slot-scope="{ row }" slot="ActivityNo">
            <strong>{{ row.ActivityNo }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">预览</Button> -->
            <span class="oper" @click="show(row.ActivityNo)">预览</span>
            <span class="oper" @click="edit(row)">编辑</span>
            <!-- <span class="oper" @click="remove(row.ActivityId)">删除</span> -->
            <span class="oper" @click="toActConfig(row)">活动配置</span>
            <span class="oper" @click="toDataView(row)">数据查看</span>
            <span class="oper" @click="toPublish(row.ActivityId,row.ActivityNo)">发布</span>
            <span class="oper" @click="toOffline(row.ActivityId,row.ActivityNo)">下线</span>
          </template>
        </Table>
      </i-col>
      <i-col span="24" class="splitpage">
        <Page :total="pageTotal" :current="page" :page-size='pageSize' show-total show-elevator @on-change="change" @on-page-size-change="changeSize" />
      </i-col>
    </Row>

    <!---编辑菜单弹窗---->
    <Modal
    v-model="isShowQR"
    title="预览"
    :mask-closable="false"
    >
      <div style=" text-align: center;">
          <div><img class="" :src="QRImg"></div> 
          <div>{{QRUrl}}</div>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" @click="closeWin">关闭</Button>
      </div>
    </Modal>
    <!---编辑菜单弹窗end---->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ActivityManagement",
  data() {
    return {
      ActivityLists: [
        {
            type: 'index',
            width: 100,
            align: 'center'
        },
        {
          title: "活动No",
          key: "ActivityNo",
          align: "center"
        },
        {
          title:"活动名称",
          key:"ActivityName",
          align:"center"
        },
        {
          title: "活动类型",
          key: "TempName",
          align: "center",
          render:(h,params)=>{
              return h('span',params.row.msgList.TempName)
            }
        },
        {
          title: "开始时间",
          key: "FromTime",
          align: "center"
        },
        {
          title: "结束时间",
          key: "ToTime",
          align: "center"
        },
        {
          title: "活动状态",
          key: "Status",
          align: "center",
          // className: "conciseContent",
          render:(h,params)=>{
              let tmpStr = "";
              let col="";
              // if(params.row.Status==0){
              //   tmpStr="未发布";
              // }else if(params.row.Status==1){
              //   tmpStr="进行中";
              // }else if(params.row.Status==2){
              //   tmpStr="已结束";
              // }
              // return h('span',{
              //     style:{  //未发布unpublic ：ff6d2d  进行中opening：00cb52   已结束ended ：333333  未开始unbegin：999999
              //         color: (params.row.Status==0)?"#ff6d2d":(params.row.Status==1?"#00cb52":"#333333")
              //     }
              // },tmpStr)
              if(params.row.Status==0){
                if(this.getNowFormatDate()<params.row.FromTime){
                  //状态为0 或者 开始日期大于当前日期
                  tmpStr="未开始";
                  col="#999999";
                }else if(this.getNowFormatDate()>params.row.FromTime){
                  //状态为0 或者 开始日期小于当前日期
                  tmpStr="未发布";
                  col="#ff6d2d";
                }
              }else if(params.row.Status==1){
                if(this.getNowFormatDate()<params.row.FromTime || this.getNowFormatDate() >params.row.ToTime){
                  tmpStr="已结束";
                  col="#333333";
                }else{
                  tmpStr="进行中";
                  col="#00cb52";
                }
              }else if(params.row.Status==2){
                  tmpStr="已结束";
                  col="#333333";
              }
              return h('span',{
                  style:{  
                      color: col
                  }
              },tmpStr)
            }
        },
        // {
        //   title: "创建人",
        //   key: "Status",
        //   align: "center"
        // },
        {
          title: "更多操作",
          slot: "action",
          width: 380,
          align: "center"
        }
      ],
      activityData: [],
      actStatus: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "未开始",
          label: "未开始"
        },
        {
          value: "未发布",
          label: "未发布"
        },
        {
          value: "进行中",
          label: "进行中"
        },
        {
          value: "已结束",
          label: "已结束"
        }
      ],
      actType:[], //活动类型集合
      
      pageTotal:0,//总条数
      pageSize:20,
      page:1,

      showPub:true, //发布可点击
      showOff:true,//下线可点击

      actName:null,//搜索-活动名称
      actno:null,//搜索-活动NO
      actStat:null,//搜索-活动状态
      actModCode:null,//搜索-活动类型
      isShowQR:false,// 预览弹窗
      QRImg:"",
      QRUrl:"",
    };
  },
  components: {},
  computed: {},
  created() {
    this.GetAllActivity()
    this.GetAllActivityType()
  },
  mounted() {},
  methods: {
    ...mapActions(["UpdateStep"]),
    //所有活动
    GetAllActivity(){
      // 未开始：FromTimeBegin:getdate()
      // 进行中：FromTimeEnd:getdate(),ToTimeBegin:getdate()
      // 已结束：ToTimeEnd:getdate()
      // 已下线：Status:2
      var ftb=null
      var fte=null
      var toftb=null
      var tofte=null
      var astatus=null
      if(this.actStat=="未开始"){
        ftb=this.getNowFormatDate()
      }else if(this.actStat=="进行中"){
        fte=this.getNowFormatDate()
        toftb=this.getNowFormatDate()
      }else if(this.actStat=="已结束"){
        tofte=this.getNowFormatDate()
      }else if(this.actStat=="已下线"){
        astatus=2
      }else{
        
      }
      var data = {
        ActivityNameLike:this.actName,
        ActivityNoLike:this.actno,
        Status:astatus,
        MoudleCode:this.actModCode,
        FromTimeBegin:ftb,
        FromTimeEnd:fte,
        ToTimeBegin:toftb,
        ToTimeEnd:tofte,
        pageSize: this.pageSize,
        pageIndex: this.page
      };
      this.$post("/api/crmActivityInfo/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.activityData=res.rows
            this.pageTotal=res.total   
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    //所有活动类型
    GetAllActivityType(){
      var data = {
        pageSize: 9999,
        pageIndex: 1,
        sortName: "Id",
        sortOrder: "asc",
      };
      this.$post("/api/crmModuleType/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.actType=res.rows
          }else{
            this.$Message.error("查询失败!");
          }
      })
    },
    //获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
      var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
      var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
          + " "  + date.getHours()  + seperator2  + date.getMinutes()
          + seperator2 + date.getSeconds();
      return currentdate;
    },
    //预览
    show(index){
      console.log(index)
      this.$get("/api/crmActivityInfo/GetView", {ak: index,preview:''}).then(res => {
        if (res.state==1) {
          if(res.data!=null){
            this.QRImg=res.data[0],
            this.QRUrl=res.data[1],
            this.isShowQR=true
          }else{
            this.$Message.error("未查找到相关信息！");
          }
        } else {
          this.$Message.error("查询记录失败！"+res.msg);
        }
      })
    },
    //关闭预览
    closeWin(){
      this.isShowQR=false
    },
    //编辑活动
    edit(row){

      this.$get("/api/crmActivityInfo/GetByAk", {ak: row.ActivityNo}).then(res => {
        if (res.state==1) {
          this.UpdateStep({
            currentStep: 1,
            templateName: res.data.msgList.BaseTempName,
            baseTemplateId: res.data.msgList.BaseTempId,
            templateId:res.data.msgList.TempId,
            templateImg: res.data.msgList.BaseTempExampImage,
            activityId:row.ActivityId,
          });
          
          this.$router.push({path:"/CreateActivityStep2",query:{ActivityId:row.ActivityId,ActivityNo:row.ActivityNo}})
        } else {
          this.$Message.error("查询记录失败！"+res.msg);
        }
      })
    },
    //前往活动配置
    toActConfig(row){
      console.log(row)
      this.$router.push({path:"/RotaryPrizeAllocation",query:{ActivityId:row.ActivityId,ActivityNo:row.ActivityNo}})
    },
    //前往数据查看
    toDataView(row){
      console.log(row)
      // 跳转到'转盘活动'数据查看
      if(row && row.MoudleCode == 'FissionDraw'){
        this.$router.push({path:"/DataViewFissionDraw",query:{ActivityId:row.ActivityId,ActivityNo:row.ActivityNo}})
      }
      // 跳转到'新品试用'数据查看
      else if(row && row.MoudleCode == 'NewProduceUse'){
        this.$router.push({path:"/DataViewNewProduceUse",query:{ActivityId:row.ActivityId,ActivityNo:row.ActivityNo}})
      }
    },
    //发布 0→1 显示进行中
    toPublish(index,ak){
      this.showPub=false
      this.updateStatus(index,1,ak)
    },
    //下线 0→2 显示已结束
    toOffline(index,ak){
      this.showOff=false
      this.updateStatus(index,2,ak)
    },
    //更新状态方法
    updateStatus(aid,status,ak){
      var data={
        activityId: aid,
        status: status,
        ActivityNo: ak
      }
      this.$post("/api/crmActivityInfo/SaveOrUpdate", data).then((res)=>{
          if(res.state==1){
            if(status==1){
              this.$Message.info("发布成功!");  
            }else if(status==2){
              this.$Message.info("下线成功!"); 
            }else{
              this.$Message.info("操作成功!"); 
            }
            this.GetAllActivity()
          }else{
            this.$Message.error("操作失败！"+res.msg);
          }
      })
    },
    change(dpage){
      this.page=dpage
      this.GetAllActivity()
    },
    //切换每页显示多少条
    changeSize(pageSize){
      this.pageSize=pageSize
      this.GetAllActivity()
    },
    //创建活动
    toCreateActivity(){
      this.$router.push({path:"/CreateActivityStep1"})
    }
  }
};
</script>

<style>
td.conciseContent span {
  display: block;
  width: 80px;
  height: 30px;
  border-radius: 4px 15px 4px 15px;
  line-height: 30px;
  margin: auto;
  font-size: 13px;
  letter-spacing: 0px;
}
.unpublic span {
  background-color: #ffe8db;
  color: #ff6d2d;
}
.opening span {
  color: #00cb52;
  background-color: #d4ffe5;
}
.ended span {
  color: #333333;
  background-color: #e2e2e2;
}
.unbegin span {
  color: #999999;
  background-color: #e2e2e2;
}
.ivu-select {
  text-align: left;
}
.ivu-table th{
    min-width: 100px;
}
</style>
<style scoped  lang="less">
.searchPart {
  margin-bottom: 20px;
  text-align: left;

  .searchbtn {
    width: 84px;
    height: 40px;
    background-color: #14cdbc;
    box-shadow: 0px 0px 6px 0px rgba(0, 159, 145, 0.42);
    border-radius: 8px;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0px;
    color: #ffffff;
    border: 0;
    margin-left: 20px;
    outline: none;
    cursor: pointer;
  }

  .createActivity {
    width: 98px;
    height: 40px;
    background-color: #fc345b;
    box-shadow: 0px 0px 6px 0px rgba(252, 52, 91, 0.42);
    border-radius: 8px;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0px;
    color: #ffffff;
    border: 0;
    margin-left: 10px;
    outline: none;
    cursor: pointer;
  }
}
.searchPart .searItem {
  display: inline-block;
}
.searchPart span {
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0px;
  color: #333333;
  margin-left: 20px;
}
.searchPart input {
  width: 240px;
  height: 32px;
  line-height: 32px;
  background-color: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(10, 63, 109, 0.1);
  border-radius: 8px;
  border: 0;
  margin-left: 10px;
  padding-left: 15px;
  outline: none;
}
.splitpage {
  text-align: right;
  margin-top: 20px;
}
.oper {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0px;
  color: #14cdbc;
  margin-left: 10px;
  cursor: pointer;
}
.operDisable {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0px;
  color: #ccc;
  margin-left: 10px;
}

.box{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    display: none;
}
.box1{
    width: 500px;
    height: 500px;
    position: fixed;left: 50%; top: 25%;
    margin-left: -250px;
    border: 1px solid #000000;
}
</style>