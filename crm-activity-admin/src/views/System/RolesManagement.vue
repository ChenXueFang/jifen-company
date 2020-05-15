<template>
  <div class="RolesManagement">
    <Row type="flex" align="middle" style="margin-bottom:20px">
      <i-col style="min-width:65px">角色名称</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入角色名称" style="width: 200px" v-model="rname" />
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="primary" @click="GetAllRoles">筛选</Button>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="error" @click="EditRole">+创建角色</Button>
      </i-col>
    </Row>

    <!--表格-->
    <Row type="flex" justify="center" align="middle" style="min-width:800px">
      <i-col span="24" class="hot-list">
        <Table stripe border :columns="columnsRole" :data="RolesList">
          <template slot-scope="{ row }" slot="RoleName">
            <strong>{{ row.RoleName }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <span class="oper" @click="updateRole(row.RoleId)">编辑</span>
            <span class="oper" @click="removeRole(row.RoleId)">删除</span>
            <span class="oper" @click="editMenu(row.RoleId)">查看/编辑菜单</span>
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
          ref="formEditRole"
          :model="formEditRole"
          :rules="ruleValidate"
          label-position="right"
          :label-width="80"
        >
          <FormItem label="角色名称" prop="RoleName">
            <Input v-model="formEditRole.RoleName" placeholder="请输入角色名称" />
          </FormItem>
        </Form>
      </div>
      
      <div slot="footer">
        <Button type="text" size="large" @click="cancelEdit('formEditRole')">取消</Button>
        <Button type="primary" size="large" @click="handleSubmit('formEditRole')">确定</Button>
      </div>
    </Modal>
    <!---编辑用户弹窗end---->

    <!---角色菜单编辑--->
    <!-- <div class="hidebg" v-if="isShowEditMenu"></div>
    <div>
      <div v-if="isShowEditMenu" class="EditMenu">
        <div class="resetPwd_main">
          <div class="ResetPwdContent">
            <div class="rptit">角色菜单编辑</div>
            <div class="treediv">
              <Tree :data="data2" ref="tree" show-checkbox></Tree>
            </div>
            <div class="resetInput">
              <Button type="primary" class="cancelbtn" @click="cancelEditMenu">取消</Button>
              <Button type="primary" class="resetbtn" @click="submitRoleMenu">提交</Button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <Modal
      v-model="isShowEditMenu"
      title="角色菜单编辑"
      @on-ok="submitRoleMenu"
      @on-cancel="cancelEditMenu"
    >
      <div class="treediv">
        <Tree :data="data2" ref="tree" show-checkbox check-strictly></Tree>
      </div>
    </Modal>
    <!---角色菜单编辑end--->
  </div>
</template>

<script>
export default {
  name: "RolesManagement",
  data() {
    return {
      isShowEdit: false, //新增编辑弹窗
      operationName: "", //弹窗名称
      isShowEditMenu: false, //编辑菜单弹窗
      roleid: "",
      formEditRole: {
        RoleName: ""
      },
      ruleValidate: {
        RoleName: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ]
      },
      columnsRole: [
        {
            type: 'index',
            width: 100,
            align: 'center'
        },
        {
          title: "角色名称",
          key: "RoleName",
          align: "center"
        },
        {
          title: "创建时间",
          key: "CreatedTime",
          align: "center"
        },
        {
          title: "更多操作",
          slot: "action",
          width: 300,
          align: "center"
        }
      ],
      RolesList: [
      ],
      rname:null,
      model1: "",
      data2: [],
      pageSize:20,
      page:1,
      pageTotal:0,//记录总条数
    };
  },
  components: {},
  computed: {},
  created() {
    this.GetAllRoles()
    this.GetAllMenus()
  },
  mounted() {},
  methods: {
    //新增角色
    EditRole() {
      this.isShowEdit = true;
      this.operationName = "新增角色";
      this.$refs['formEditRole'].resetFields();
      this.formEditRole.roleId=null
    },
    //放弃新增编辑角色操作
    cancelEdit(name) {
      this.isShowEdit = false;
      this.$refs[name].resetFields();
    },
    //编辑角色
    updateRole(index) {
      this.isShowEdit = true;
      this.operationName = "修改角色";

      this.$get("/api/crmManageRole/GetById", {id: index}).then(res => {
        if (res.state==1) {
          this.formEditRole.roleId=index
          this.formEditRole.RoleName=res.rows[0].RoleName
        } else {
          this.$Message.error("查询记录失败！"+res.msg);
        }
      });
    },
    //删除角色
    removeRole(index) {
      var data = {
        roleId: index
      };
      this.$post("/api/crmManageRole/Delete", data).then((res)=>{
          if(res.state==1){
            this.$Message.info("删除成功!");   
            this.GetAllRoles()         
          }else{
            this.$Message.error("删除失败！"+res.msg);
          }
      })
    },
    //提交数据
    handleSubmit(name) {
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
          this.$post("/api/crmManageRole/SaveOrUpdate", this.$refs[name].model).then((res)=>{
              this.$Spin.hide();
              if(res.state==1){
                this.isShowEdit = false
                this.$Message.info("提交成功!");  
                this.GetAllRoles()      
              }else{
                this.$Message.error("提交失败!"+res.msg);
              }
          })
        }
      });      
    },
    //切换第几页
    change(dpage){
      this.page=dpage
      this.GetAllRoles()
    },
    //切换每页显示多少条
    changeSize(pageSize){
      this.pageSize=pageSize
      this.GetAllRoles()
    },
    //加载所有角色
    GetAllRoles(){
      var data = {
        roleNameLike: this.rname,
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
      this.$post("/api/crmManageRole/GetListBySC",data).then((res)=>{
        this.$Spin.hide();
          if(res.state==1){
            this.RolesList=res.rows  
            this.pageTotal=res.total
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },

    //获取系统所有菜单
    GetAllMenus(){
      var data = {
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmManageMenu/GetListBySC",data).then((res)=>{
          if(res.state==1){
            // var cdlist=[{title: "首页",expand: true,children: []}]
            var cdlist=[]
            var cdchildlist=[]
            for(var i=0;i<res.rows.length;i++){
              var cd={}
              if(res.rows[i].ParentCode=="0"){
                cd.title=res.rows[i].MenuTitle
                cd.MenuId=res.rows[i].MenuId
                cd.MenuCode=res.rows[i].MenuCode
                cd.expand=true
                cd.checked=false
                cd.children=[]

                cdlist.push(cd)
              }else{
                cd.title=res.rows[i].MenuTitle
                cd.MenuId=res.rows[i].MenuId
                cd.MenuCode=res.rows[i].MenuCode
                cd.ParentCode=res.rows[i].ParentCode
                cd.checked=false
                cd.expand=true

                cdchildlist.push(cd)
              }
            }
            //循环一级
            for(var i=0;i<cdlist.length;i++){
              var chilerenList= cdchildlist.filter((a)=>{return a.ParentCode==cdlist[i].MenuCode});
                // for(var j=0;j<chilerenList.length;j++){
                //   cdlist[i].children.push(chilerenList[j]);
                // }
                cdlist[i].children=chilerenList
            }
            this.data2=cdlist
          }else{
            this.$Message.error("查询失败！"+res.msg);
          }
      })
    },

    //编辑角色菜单
    editMenu(index) {
      //清空选中
      var cleardata=this.data2
      for(var i=0;i<cleardata.length;i++){
        cleardata[i].checked=false

        for(var j=0;j<cleardata[i].children.length;j++){
          cleardata[i].children[j].checked=false
        } 
      }
      this.data2=cleardata
      
      this.isShowEditMenu = true;
      this.roleid = index;
      
      var data={
        roleId:index,
        pageSize: 9999,
        pageIndex: 1
      }
      //根据角色id绑定已选菜单
      this.$post("/api/crmManageRoleVSMenu/GetListBySC", data).then(res => {
        if (res.state==1) {
          for(var i=0;i<this.data2.length;i++){
            for(var h=0;h<res.rows.length;h++){
              if(this.data2[i].MenuId==res.rows[h].MenuId){
                this.data2[i].checked=true
              }

              for(var k=0;k<this.data2[i].children.length;k++){
                if(this.data2[i].children[k].MenuId==res.rows[h].MenuId){
                  this.data2[i].children[k].checked=true
                }
              }
            }
          }
        } else {
          this.$Message.error("查询记录失败！"+res.msg);
        }
      });
    },
    //取消编辑菜单
    cancelEditMenu() {
      this.isShowEditMenu = false;
    },
    //提交
    submitRoleMenu() {
      var nodes=this.$refs.tree.getCheckedAndIndeterminateNodes()
      var selnodes=[]
      for(var i=0;i<nodes.length;i++){
        selnodes.push(nodes[i].MenuId)
      }
      var data = {
        roleId: this.roleid,
        menuId: selnodes
      };
      this.$post("/api/crmManageRole/SaveRoleMenuInfo",data).then((res)=>{
          if(res.state==1){
            this.$Message.info("提交成功!");  
          }else{
            this.$Message.error("提交失败！"+res.msg);
          }
      })
    },

  }
};
</script>

<style>
.RolesManagement .ivu-select-selection,
.RolesManagement .ivu-select-dropdown-list {
  text-align: left !important;
}
.RolesManagement .ivu-tree {
  text-align: left !important;
  padding-left: 200px;
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
  height: 33%;
  min-width: 614px;
  min-height: 310px;
  margin-top: -10%;
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
    margin-top: 10px;

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
    .getVerCode {
      display: inline-block;
      width: 120px;
      height: 40px;
      background-color: #14cdbc;
      position: absolute;
      margin-left: -120px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      line-height: 40px;
      color: #ffffff;
    }
  }
}
.EditMenu {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 33%;
  height: 36%;
  min-width: 614px;
  min-height: 515px;
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
  .treediv {
    height: 355px;
    overflow-y: scroll;
    margin-top: 20px;
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