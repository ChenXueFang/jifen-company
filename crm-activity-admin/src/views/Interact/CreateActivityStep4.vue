<template>
  <div class="CreateActivityStep4">
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
          <div class="tempWrap">
            <div class="tempImg">
              <!-- <img :src="step.templateImg" /> -->
              <iframe :src="phoneUrl" style="width:100%;height:100%;border:0"></iframe>
              <div class="masking"></div>
            </div>
          </div>
        </div>
        <div class="baseInfoWrap">
          <div class="fromInfo">
            <div class="pubSub">
                <div class="ptitle">恭喜您，发布成功！</div>
                <div class="pcontent">
                    <div>活动名称：{{activityInfo.ActivityName}}</div>
                    <div>活动类型：{{actTypeName}}</div>
                    <div>开始时间：{{activityInfo.FromTime}}</div>
                    <div>结束时间：{{activityInfo.ToTime}}</div>
                    <!-- <div>创建人：陈伟霆</div> -->
                    <div>活动介绍：{{activityInfo.ActiveContent}}</div>
                    <div>活动链接：{{QRUrl}}</div>
                    <div class="qrinfo">
                        <div>活动二维码：</div>
                        <div style="margin-top:10px;"><img class="qrcode" :src="QRImg"></div>
                    </div>
                </div>
                <div class="pbtn">
                    <Button
                  type="primary"
                  @click="ToActiveManage"
                >返回活动管理</Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateActivityStep4",
  data() {
    return {
      activityInfo:{},
      actType:[],
      actTypeName:'',
      QRImg:'',
      QRUrl:"",
      phoneUrl:""
    };
  },
  components: {},
  computed: {
    ...mapGetters(["step"])
  },
  created() {
    this.getActivityInfo()
  },
  mounted() {},
  methods: {
    ...mapActions(["UpdateStep"]),

    ToActiveManage() {
        // this.$Message.info("返回活动管理");
        this.$router.push({name:"ActivityManagement"})
    },
    //查询活动信息
    getActivityInfo(){

      console.log("活动id ",this.step.activityId)
      this.GetAllActivityType()

      this.$get("/api/crmActivityInfo/GetById", {id: this.step.activityId}).then(res => {
        if (res.state==1) {
            this.activityInfo=res.rows[0]
            this.actTypeName=this.actType.filter((a)=>{return a.ModuleCode==res.rows[0].MoudleCode})[0].ModuleName;

            //查询二维码和连接
            this.$get("/api/crmActivityInfo/GetView", {ak: res.rows[0].ActivityNo,preview:1}).then(res => {
              if (res.state==1) {
                if(res.data!=null){
                  this.QRImg=res.data[0],
                  this.QRUrl=res.data[1],
                  this.phoneUrl=res.data[2]
                  console.log(this.phoneUrl)
                }else{
                  this.$Message.error("未查找到相关信息！");
                }
              } else {
                this.$Message.error("查询记录失败！"+res.msg);
              }
            })
          } else {
          this.$Message.error("查询记录失败！"+res.msg);  
          }
        });
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
  }
};
</script>

<style>
.ivu-steps-horizontal .my-step1 .ivu-steps-content {
  padding-left: 35px !important;
}
</style>
<style lang="less" scoped>
.CreateActivityStep4 {
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
  // margin-top: 15px;
  border-radius: 10px;
  // padding: 10px 10px 0 0;
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
        width: 375px;
        height: 715px;
        background: url(../../assets/mobileBg.png) no-repeat;
        background-size: 100% 100%;
        margin: 30px auto;
        .tempImg {
          width: 325px;
          height: 700px;
          margin: 0 auto;
          padding: 58px 0 0 0;
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
        min-height: 700px;
        background-color: #ffffff;
        box-shadow: 0px 6px 8px 0px rgba(6, 15, 53, 0.05);
        border-radius: 10px;
        margin-top: 35px;
       
        .pubSub{
            width: 90%;
            margin: auto;
            padding: 100px 55px 20px 55px;

            .ptitle{
                text-align: center;
                font-size: 20px;
                color: #14cdbc;
                margin-bottom: 20px;
            }

            .pcontent{
              padding-left: 50px;
            }
            .pcontent div{
                line-height: 40px;
            }
            .qrinfo div{
                display:inline-block;
                float: left;
            }
            .qrcode{
                width: 100px;
                height: 100px;
            }
            
            .pbtn{
                padding-top: 30px;
                text-align: center;
                clear: both;
            }
        }
      }
    }
  }
}
.masking{
  width: 325px;
  height: 700px;
  position: fixed;
  margin-top: -700px;
}
</style>