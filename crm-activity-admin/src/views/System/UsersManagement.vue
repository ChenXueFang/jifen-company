<template>
  <div class="AdminsManagement">
    <Row type="flex" align="middle" style="margin-bottom:20px">
      <i-col style="min-width:65px">登录账号</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入登录账号" style="width: 200px" v-model="lognaccount" />
      </i-col>
      <i-col style="min-width:65px">手机号</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入手机号" style="width: 200px" v-model="lognmobile" :maxlength="11" />
      </i-col>
      <i-col style="min-width:65px">所属公司</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入所属公司" style="width: 200px" v-model="logncompany" />
      </i-col>
      <i-col style="min-width:65px;margin-left:10px">是否启用</i-col>
      <i-col style="min-width:200px">
        <Select v-model="lognisusing" placeholder="请选择是否启用">
          <Option v-for="item in isUsing" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="primary" @click="GetAllUsers">筛选</Button>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="error" @click="EditUser">+创建用户</Button>
      </i-col>
    </Row>

    <!--表格-->
    <Row type="flex" justify="center" align="middle" style="min-width:800px">
      <i-col span="24" class="hot-list">
        <Table stripe border :columns="columnsUsersList" :data="UsersList">
          <template slot-scope="{ row }" slot="Mobile">
            <strong>{{ row.Mobile }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <span class="oper" @click="updateUser(row.MUserId)">编辑</span>
            <span class="oper" @click="removeUser(row.MUserId)">删除</span>
          </template>
        </Table>
      </i-col>
      <i-col span="24" class="hot-list splitpage">
        <Page
          :total="pageTotal"
          show-total
          show-elevator
          @on-change="change"
          @on-page-size-change="changeSize"
        />
      </i-col>
    </Row>

    <!-- 删除用户询问框 -->
    <Modal v-model="isShowDelet" title="删除用户" :mask-closable="false">
      <div class="resetInput">
        <p style="text-align:center">是否删除此用户？</p>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancelDelet('formEditUser')">取消</Button>
        <Button type="primary" size="large" @click="handleDelet('formEditUser')">确定</Button>
      </div>
    </Modal>

    <!---编辑用户弹窗-->
    <Modal v-model="isShowEdit" :title="operationName" :mask-closable="false">
      <div class="resetInput">
        <Form
          ref="formEditUser"
          :model="formEditUser"
          :rules="ruleValidate"
          label-position="right"
          :label-width="100"
        >
          <FormItem label="登录账号" prop="LoginCode">
            <Input v-model="formEditUser.LoginCode" placeholder="请输入登录账号" />
          </FormItem>
          <FormItem label="手机" prop="Mobile">
            <Input v-model="formEditUser.Mobile" placeholder="请输入手机" :maxlength="11" />
          </FormItem>
          <FormItem label="姓名" prop="Name">
            <Input v-model="formEditUser.Name" placeholder="请输入姓名" />
          </FormItem>
          <FormItem label="账号有效时间" prop="ValidBeginTime">
            <DatePicker
              :value="ptime"
              format="yyyy-MM-dd HH:mm:ss" 
              type="datetimerange"
              placeholder="请选择账号有效时间"
              style="width:100%"
              @on-change="changeTime"
            ></DatePicker>
          </FormItem>

          <FormItem label="所属角色" prop="roleList">
            <CheckboxGroup v-model="formEditUser.roleList">
              <Checkbox
                v-for="(item,index) in RolesLists"
                :key="index"
                :label="item.RoleId"
              >{{item.RoleName}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="所属公司" prop="CustomCode">
            <Select v-model="formEditUser.CustomCode" placeholder="请选择所属公司">
              <Option
                v-for="item in CustomerList"
                :value="item.CustomCode"
                :key="item.CustomCode"
                v-bind:disabled="isUpdate"
              >{{ item.CustomCode}}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否启用" prop="isUse">
            <RadioGroup v-model="formEditUser.isUse">
              <Radio label="true">是</Radio>
              <Radio label="false">否</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancelEdit('formEditUser')">取消</Button>
        <Button type="primary" size="large" @click="handleSubmit('formEditUser')">确定</Button>
      </div>
    </Modal>
    <!---编辑用户弹窗end---->
  </div>
</template>

<script>
import util from "../../utils/util";
// 时间格式化
export function formatDate(date, fmt) {
  let o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
export default {
  name: "AdminsManagement",
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback("手机号格式不正确");
      } else {
        callback();
      }
    };
    return {
      isShowEdit: false, //新增编辑弹窗
      operationName: "", //弹窗名称
      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      formEditUser: {
        LoginCode: "",
        Mobile: "",
        Name: "",
        ValidBeginTime: "",
        ValidEndTime: "",
        roleList: [],
        isUse: "",
        CustomCode: ""
      },
      ruleValidate: {
        LoginCode: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        Mobile: [{ required: true, validator: validatePhone, trigger: "blur" }],
        Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // ValidBeginTime: [{required: true,message: "请选择账号有效时间",trigger: "blur"}],
        roleList: [
          {
            type: "array",
            required: true,
            message: "请选择所属角色",
            trigger: "blur"
          }
        ],
        isUse: [
          { required: true, message: "请选择是否启用", trigger: "change" }
        ],
        CustomCode: [
          { required: true, message: "请输入所属公司", trigger: "blur" }
        ]
      },
      columnsUsersList: [
        {
          type: "index",
          width: 100,
          align: "center"
        },
        {
          title: "登录账号",
          key: "LoginCode",
          align: "center"
        },
        {
          title: "手机",
          key: "Mobile",
          align: "center"
        },
        {
          title: "姓名",
          key: "Name",
          align: "center"
        },
        {
          title: "账号有效期开始",
          key: "ValidBeginTime",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              params.row.ValidBeginTime == null ? "" : params.row.ValidBeginTime // .substring(0,10) formatDate(new Date(params.row.ValidBeginTime),'yyyy/MM/dd')
            );
          }
        },
        {
          title: "账号有效期结束",
          key: "ValidEndTime",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              params.row.ValidEndTime == null ? "" : params.row.ValidEndTime //.substring(0,10)  formatDate(new Date(params.row.ValidEndTime),'yyyy/MM/dd')
            );
          }
        },
        {
          title: "所属公司",
          key: "CustomCode",
          align: "center"
        },
        {
          title: "是否启用",
          key: "IsUse",
          align: "center",
          render: (h, params) => {
            let tmpStr = "";
            if (params.row.IsUse == true) {
              tmpStr = "是";
            } else {
              tmpStr = "否";
            }
            return h(
              "span",
              {
                // style:{
                //     color: (params.row.state==0)?"#ed3f14":(params.row.state==1?"#19be6b":"#2d8cf0")
                // }
              },
              tmpStr
            );
          }
        },
        {
          title: "更多操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      UsersList: [],
      isUsing: [
        {
          value: "0",
          label: "全选"
        },
        {
          value: "true",
          label: "是"
        },
        {
          value: "false",
          label: "否"
        }
      ],
      lognaccount: null,
      lognmobile: null,
      logncompany: null,
      lognisusing: "",
      modal5: true,
      pageSize: 20,
      page: 1,
      pageTotal: 0, //记录总条数
      RolesLists: [],
      CustomerList: [], //公司列表
      ptime: "", //账号有效期
      isUpdate: false,
      newEdit:false,//点击创建
      isShowDelet: false //删除用户弹框
    };
  },
  components: {},
  computed: {},
  created() {
    this.GetAllRoles();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm);//当前组件的实例
      vm.logncompany = vm.$route.params.appid; //客户管理页面的传参CustomCode
      vm.urlAppid = vm.$route.params.appid; //客户管理页面的传参CustomCode
  
      vm.GetAllUsers();
      vm.GetAllCustomer();  
    });
  },
  mounted() {},
  methods: {
    //奖品中奖范围时间
    changeTime(data) {
      this.ptime = data;
      this.formEditUser.ValidBeginTime = "clearValid";
    },
    //新增用户
    EditUser() {
      (this.isShowEdit = true), (this.operationName = "新增用户");
      this.$refs["formEditUser"].resetFields();
      this.formEditUser.mUserId = null;
      this.ptime = "";
      // 传递参数有appid时this.AllRolesLists
      if (this.urlAppid) {
        this.isUpdate = true;  //公司默认，不能修改
        this.formEditUser.CustomCode = this.urlAppid; //公司默认，不能修改
      } else {
        this.isUpdate = false;
      }
    },
    //放弃新增编辑用户操作
    cancelEdit(name) {
      this.isShowEdit = false;
      this.$refs[name].resetFields();
    },
    // 取消删除用户
    cancelDelet(name) {
      this.isShowDelet = false;
    },
    //编辑用户
    updateUser(index) {
      this.isShowEdit = true;
      this.operationName = "修改用户";
      // 传递参数有appid时
      // if (this.urlAppid) {
      //   this.RolesLists = this.RolesLists.filter((a)=>{return a.RoleName != "超级管理员"}) //没有超级管理员
      // }

      this.$get("/api/crmManageUser/GetById", { id: index }).then(res => {
        if (res.state == 1) {
          this.formEditUser.mUserId = index;
          this.formEditUser.LoginCode = res.rows[0].LoginCode;
          this.formEditUser.Mobile = res.rows[0].Mobile;
          this.formEditUser.Name = res.rows[0].Name;
          // this.formEditUser.ValidBeginTime=res.rows[0].ValidBeginTime
          // this.formEditUser.ValidEndTime=res.rows[0].ValidEndTime
          this.ptime = [res.rows[0].ValidBeginTime, res.rows[0].ValidEndTime];
          this.formEditUser.isUse = res.rows[0].IsUse + "";
          this.formEditUser.CustomCode = res.rows[0].CustomCode;
          this.isUpdate = true;
        } else {
          this.$Message.error("查询记录失败！" + res.msg);
        }
      });

      //根据用户id加载角色
      var data = {
        mUserId: index,
        pageSize: 999,
        pageIndex: 1
      };
      this.$post("/api/crmManageUserVSRole/GetListBySC", data).then(res => {
        if (res.state == 1) {
          var roles = [];
          for (var i = 0; i < res.rows.length; i++) {
            roles.push(res.rows[i].RoleId);
          }
          this.formEditUser.roleList = roles;
        } else {
          this.$Message.error("根据用户id查询角色失败！" + res.msg);
        }
      });
    },
    //删除用户
    removeUser(index) {
      this.isShowDelet = true;
      this.mUserId1 = index;
    },
    // 确定删除用户
    handleDelet() {
      var data = {
        mUserId: this.mUserId1
      };
      this.$post("/api/crmManageUser/Delete", data).then(res => {
        if (res.state == 1) {
          this.$Message.info("删除成功!");
          this.GetAllUsers();
          this.isShowDelet = false;
        } else {
          this.$Message.error("删除失败！" + res.msg);
        }
      });
    },
    //提交数据
    handleSubmit(name) {
      if (this.ptime == null) {
        this.$refs[name].model.ValidBeginTime = null;
        this.$refs[name].model.ValidEndTime = null;
      } else {
        this.$refs[name].model.ValidBeginTime = this.ptime[0];
        this.$refs[name].model.ValidEndTime = this.ptime[1];
      }

      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$refs[name].model.ValidBeginTime= util.dateFormat(this.$refs[name].model.ValidBeginTime,"yyyy-MM-dd")
          // this.$refs[name].model.ValidEndTime= util.dateFormat(this.$refs[name].model.ValidEndTime,"yyyy-MM-dd")
          //loading
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
          this.$post(
            "/api/crmManageUser/SaveUserInfo",
            this.$refs[name].model
          ).then(res => {
            this.$Spin.hide();
            if (res.state == 1) {
              this.isShowEdit = false;
              this.$Message.info("提交成功!");
              this.GetAllUsers();
            } else {
              this.$Message.error("提交失败！" + res.msg);
            }
          });
        }
      });
    },
    // 加载公司列表
    GetAllCustomer() {
      var data = {
        customCode: this.logncompany,
        pageSize: 99999,
        pageIndex: 1
      };
      //loading
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
      this.$post("/api/crmCustom/GetListBySC", data).then(res => {
        this.$Spin.hide();
        if (res.state == 1) {
          console.log('created加载公司列表')
          this.CustomerList = res.rows;
        } else {
          this.$Message.error("查询失败！" + res.msg);
        }
      });
    },
    //加载所有用户
    GetAllUsers() {
      if (this.lognisusing == "0") {
        this.lognisusing = null;
      }
      var data = {
        loginCodeLike: this.lognaccount,
        mobile: this.lognmobile,
        CustomCode: this.logncompany,
        isUse: this.lognisusing,
        pageSize: this.pageSize,
        pageIndex: this.page
      };
      //loading
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
      this.$post("/api/crmManageUser/GetListBySC", data).then(res => {
        this.$Spin.hide();
        if (res.state == 1) {
          console.log('created用户信息')
          this.UsersList = res.rows;
          this.pageTotal = res.total;
        } else {
          this.$Message.error("查询失败！" + res.msg);
        }
      });
    },

    change(dpage) {
      this.page = dpage;
      this.GetAllUsers();
    },
    //切换每页显示多少条
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.GetAllUsers();
    },
    //加载所有角色
    GetAllRoles() {
      var data = {
        pageSize: 9999,
        pageIndex: 1
      };
      this.$post("/api/crmManageRole/GetListBySC", data).then(res => {
        if (res.state == 1) {
          // 传递参数有appid时
          if (this.urlAppid) {
            this.formEditUser.CustomCode = this.urlAppid;
            this.RolesLists = res.rows.filter((a)=>{return a.RoleName != "超级管理员"}) //没有超级管理员
          } else {
            this.RolesLists = res.rows;
          }
        } else {
          this.$Message.error("获取所有角色失败！" + res.msg);
        }
      });
    }
  }
};
</script>

<style>
.AdminsManagement .ivu-select-selection,
.AdminsManagement .ivu-select-dropdown-list,
.AdminsManagement .ivu-checkbox-group {
  text-align: left !important;
}
.AdminsManagement .ivu-checkbox-group {
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