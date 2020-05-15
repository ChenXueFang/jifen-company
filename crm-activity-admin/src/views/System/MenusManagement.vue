<template>
  <div class="MenusManagement">
    <Row type="flex" align="middle" style="margin-bottom:20px">
      <i-col style="min-width:65px">菜单标题</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入菜单标题" style="width: 200px" v-model="mtitle"/>
      </i-col>
      <!-- <i-col style="min-width:65px;margin-left:10px">父菜单</i-col>
      <i-col style="min-width:200px">
        <Select v-model="model1" placeholder="请选择父菜单">
          <Option v-for="item in isUsing" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </i-col> -->
      <i-col style="margin-left:10px">
        <Button type="primary" @click="GetAllMenus">筛选</Button>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="error" @click="EditMenu">+创建菜单</Button>
      </i-col>
    </Row>

    <!--表格-->
    <Row type="flex" justify="center" align="middle" style="min-width:800px">
      <i-col span="24" class="hot-list">
        <Table stripe border :columns="MenusList" :data="MenusLists">
          <template slot-scope="{ row }" slot="MenuTitle">
            <strong>{{ row.MenuTitle }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <span class="oper" @click="updateMenu(row.MenuId)">编辑</span>
            <span class="oper" @click="removeMenu(row.MenuId)">删除</span>
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
          ref="formEditMenu"
          :model="formEditMenu"
          :rules="ruleValidate"
          label-position="right"
          :label-width="100"
        >
          <FormItem label="菜单标题" prop="MenuTitle">
            <Input v-model="formEditMenu.MenuTitle" placeholder="请输入菜单标题" />
          </FormItem>
          <FormItem label="菜单图标" prop="MenuIcon">
            <Input v-model="formEditMenu.MenuIcon" placeholder="请输入菜单图标" />
          </FormItem>
          <FormItem label="排序" prop="MenuSort">
            <Input v-model="formEditMenu.MenuSort" placeholder="请输入排序" />
          </FormItem>
          <FormItem label="菜单地址">
            <Input v-model="formEditMenu.MenuPath" placeholder="请输入菜单地址" />
          </FormItem>
          <FormItem label="菜单编号">
            <Input v-model="formEditMenu.MenuCode" placeholder="请输入菜单编号" />
          </FormItem>
          <FormItem label="父菜单">
            <Select v-model="formEditMenu.ParentCode" placeholder="请选择父菜单">
              <Option v-for="item in FaMenusLists" :value="item.MenuCode" :key="item.MenuCode">{{ item.MenuTitle }}</Option>
            </Select>
          </FormItem>
          
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancelEdit('formEditMenu')">取消</Button>
        <Button type="primary" size="large" @click="handleSubmit('formEditMenu')">确定</Button>
      </div>
    </Modal>
    <!---编辑菜单弹窗end---->
  </div>
</template>

<script>
export default {
  name: "MenusManagement",
  data() {
    return {
      isShowEdit: false, //新增编辑弹窗
      operationName: "", //弹窗名称
      formEditMenu: {
        MenuTitle: "",
        menuType:1,
        MenuIcon: "",
        MenuSort: "",
        MenuPath: "",
        MenuCode: "",
        ParentCode: ""
      },
      ruleValidate: {
        MenuTitle: [
          { required: true, message: "请输入菜单标题", trigger: "blur" }
        ]
      },
      MenusList: [
         {
            type: 'index',
            width: 100,
            align: 'center'
        },
        {
          title: "菜单标题",
          key: "MenuTitle",
          align: "center"
        },
        {
          title: "排序",
          key: "MenuSort",
          align: "center"
        },
        {
          title: "菜单图标",
          key: "MenuIcon",
          align: "center"
        },
        {
          title: "菜单地址",
          key: "MenuPath",
          align: "center"
        },
        {
          title: "菜单编号",
          key: "MenuCode",
          align: "center"
        },
        {
          title: "父菜单编号",
          key: "ParentCode",
          align: "center" 
          ,
          render:(h,params)=>{
              let menu = this.FaMenusLists.filter((a)=>{return a.MenuCode==params.row.ParentCode});
              let tmpStr=''
              if (menu && menu.length>0) {
                tmpStr=menu[0].MenuTitle
              }
              return h('span',{}, tmpStr)
            }
        },
        {
          title: "更多操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      MenusLists: [],
      IsHid: [
        {
          value: "true",
          label: "是"
        },
        {
          value: "false",
          label: "否"
        }
      ],
      model1: "",
      pageSize:20,
      page:1,
      pageTotal:0,//记录总条数
      mtitle:null,
      FaMenusLists:[]
    };
  },
  components: {},
  computed: {},
  created() {
    this.GetAllMenus()
    this.GetAllFaMenus()
  },
  mounted() {},
  methods: {
    //新增菜单
    EditMenu() {
      this.isShowEdit = true;
      this.operationName = "新增菜单";

      this.$refs['formEditMenu'].resetFields();
      this.formEditMenu.menuId=null
      this.formEditMenu.MenuPath=null
      this.formEditMenu.MenuCode=null
      this.formEditMenu.ParentCode=null
    },
    //放弃新增编辑菜单操作
    cancelEdit(name) {
      this.isShowEdit = false;
      this.$refs[name].resetFields();
    },
    //编辑菜单
    updateMenu(index) {
      this.isShowEdit = true;
      this.operationName = "修改菜单";

      this.$get("/api/crmManageMenu/GetById", {id: index}).then(res => {
        if (res.state==1) {
          this.formEditMenu.menuId=index
          this.formEditMenu.MenuTitle=res.rows[0].MenuTitle
          this.formEditMenu.MenuIcon=res.rows[0].MenuIcon
          this.formEditMenu.MenuSort=res.rows[0].MenuSort
          this.formEditMenu.MenuPath=res.rows[0].MenuPath
          this.formEditMenu.MenuCode=res.rows[0].MenuCode
          this.formEditMenu.ParentCode=res.rows[0].ParentCode
        } else {
          this.$Message.error("查询记录失败！"+res.msg);
        }
      });
    },
    //删除菜单
    removeMenu(index) {
      var data = {
        menuId: index
      };
      this.$post("/api/crmManageMenu/Delete", data).then((res)=>{
          if(res.state==1){
            this.$Message.info("删除成功!");  
            this.GetAllMenus()        
          }else{
            this.$Message.error("删除失败！"+res.msg);
          }
      })
    },
    //提交数据
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if(this.$refs[name].model.ParentCode=="" || this.$refs[name].model.ParentCode==null){
            this.$refs[name].model.ParentCode="0"
          }
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
          this.$post("/api/crmManageMenu/SaveOrUpdate", this.$refs[name].model).then((res)=>{
              this.$Spin.hide();
              if(res.state==1){
                this.isShowEdit = false
                this.$Message.info("提交成功!");  
                this.GetAllMenus()      
              }else{
                this.$Message.error("提交失败！"+res.msg);
              }
          })
        }
      });
    },
    //加载所有菜单
    GetAllMenus(){
      var data = {
        menuTitleLike:this.mtitle,
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
      this.$post("/api/crmManageMenu/GetListBySC",data).then((res)=>{
          this.$Spin.hide();
          if(res.state==1){
            this.MenusLists=res.rows
            this.pageTotal=res.total  
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    //获取所有父菜单
    GetAllFaMenus(){
      var data = {
        ParentCode:"0",
        pageSize: 9999,
        pageIndex: 1,
        sortName: "MenuSort",
        sortOrder: "asc",
      };
      this.$post("/api/crmManageMenu/GetListBySC",data).then((res)=>{
          if(res.state==1){
            this.FaMenusLists=res.rows 
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },
    //第几页
    change(dpage){
      this.page=dpage
      this.GetAllMenus()
    },
    //切换每页显示多少条
    changeSize(pageSize){
      this.pageSize=pageSize
      this.GetAllMenus()
    },
  }
};
</script>

<style>
.MenusManagement .ivu-select-selection,
.MenusManagement .ivu-select-dropdown-list {
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
</style>