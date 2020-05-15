<template>
  <div class="SystemLogManagement">
    <Row type="flex" align="middle" style="margin-bottom:20px">
      <i-col style="min-width:65px">登录账号</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入登录账号" style="width: 200px" v-model="logcode"/>
      </i-col>
      <i-col style="min-width:65px;margin-left:10px">登录方式</i-col>
      <i-col style="min-width:200px">
        <Select v-model="logtype" placeholder="请选择登录方式">
          <Option v-for="item in logintypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="primary" @click="GetAlllogs">筛选</Button>
      </i-col>
    </Row>

    <!--表格-->
    <Row type="flex" justify="center" align="middle" style="min-width:800px">
      <i-col span="24" class="hot-list">
        <Table stripe  border :columns="systemloglists" :data="logsdata">
            <template slot-scope="{ row }" slot="RoleName">
                <strong>{{ row.RoleName }}</strong>
            </template>
        </Table>
      </i-col>
      <i-col span="24" class="hot-list splitpage">
          <Page :total="pageTotal" :current="page" :page-size='pageSize' show-total show-elevator @on-change="change" @on-page-size-change="changeSize"/>
     </i-col>
    </Row>

  </div>
</template>

<script>
export default {
  name: 'SystemLogManagement',
  data() {
        return {
            systemloglists: [
                {
                    type: 'index',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '登录方式',
                    key: 'LoginType',
                    align: 'center',
                    render:(h,params)=>{
                        let tmpStr = "";
                        if(params.row.LoginType=='login'){
                            tmpStr="登录";
                        }else{
                            tmpStr="退出";
                        }
                        return h('span',{},tmpStr)
                        }
                },
                {
                    title: '登录IP',
                    key: 'LoginIp',
                    align: 'center'
                },
                {
                    title: '登录账号',
                    key: 'LoginCode',
                    align: 'center'
                },
                {
                    title: '登录结果',
                    key: 'LoginResult',
                    align: 'center'
                },
                {
                    title: '时间',
                    key: 'CreatedTime',
                    align: 'center'
                }
            ],
            logintypes: [
              {
                value: "all",
                label: "全选"
                },
                {
                value: "login",
                label: "登录"
                },
                {
                value: "exit",
                label: "退出"
                }
            ],
            logsdata: [],
            logcode:null, //搜索-登录账号
            logtype:null, //搜索-登录方式
            pageSize:20,
            page:1,
            pageTotal:0,
        }
    },
  components: {
  },
  computed: {
    
  },
  created() {
      this.GetAlllogs()
  },
  mounted() {
      
  },
  methods: {
    //查询
    GetAlllogs(){
        if(this.logtype=="all"){
          this.logtype=null
        }
        var data = {
        loginCodeLike: this.logcode,
        LoginType:this.logtype,
        pageSize: this.pageSize,
        pageIndex: this.page,
        sortName: "LoginId",
        sortOrder: "desc",
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
      this.$post("/api/crmUserLogin/GetListBySC",data).then((res)=>{
            this.$Spin.hide();
          if(res.state==1){
            this.logsdata=res.rows    
            this.pageTotal=res.total
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    //切换页
    change(dpage){
      this.page=dpage
      this.GetAlllogs()
    },
    //切换每页显示多少条
    changeSize(pageSize){
      this.pageSize=pageSize
      this.GetAlllogs()
    },
  }
}
</script>

<style>
.SystemLogManagement .ivu-select-selection,.SystemLogManagement .ivu-select-dropdown-list{
    text-align: left !important;
}

</style>
<style scoped  lang="less">
.splitpage{
    text-align: right;
    margin-top: 20px;
}
.oper{
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
    min-height: 330px;
    margin-top: -13%;
    margin-left: -16%;
    background-color: #fff;
    border-radius: 10px;
    z-index: 3;

    .resetPwd_main{
        width: 85%;
        margin: auto;
        margin-top: 30px;

        .rptit{
            font-size: 26px;
            letter-spacing: 0px;
            color: #14cdbc;
        }
    }

    .resetInput{
        margin-top: 20px;

        .cancelbtn{
            width: 180px;
            height: 40px;
            background-color: #CCC;
            border-radius: 24px;
            border: #CCC;
            font-size: 16px;
            letter-spacing: 0px;
            color: #ffffff;
            margin-right: 20px;
        }
        .resetbtn{
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
</style>