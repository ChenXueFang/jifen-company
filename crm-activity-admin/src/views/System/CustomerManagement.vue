<template>
  <div class="CustomerManagement">
    <Row type="flex" align="middle" style="margin-bottom:20px">
      <i-col style="min-width:65px">appid</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入appid" style="width: 200px" v-model="CustomCodeSearch" />
      </i-col>
      <i-col style="min-width:75px">客户名称</i-col>
      <i-col style="min-width:200px">
        <Input placeholder="请输入客户名称" style="width: 200px" v-model="CustomNameSearch" />
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="primary" @click="GetAllUsers">筛选</Button>
      </i-col>
      <i-col style="margin-left:10px">
        <Button type="error" @click="EditUser">+创建客户</Button>
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
            <span class="oper" @click="updateUser(row.Id)">编辑</span>
            <span class="oper" @click="toAllocationCustomer(row.CustomCode)">配置</span>
            <span class="oper" @click="toUsersManagement(row.CustomCode)">用户管理</span>
          </template>
        </Table>
      </i-col>
      <i-col span="24" class="hot-list splitpage">
        <Page
          :total="pageTotal"
          show-total
          show-elevator
          :current="page" 
          :page-size='pageSize'
          @on-change="change"
          @on-page-size-change="changeSize"
        />
      </i-col>
    </Row>

    <!---编辑客户弹窗-->
    <Modal v-model="isShowEdit" :title="operationName" :mask-closable="false">
      <div class="resetInput">
        <Form
          ref="formEditUser"
          :model="formEditUser"
          :rules="ruleValidate"
          label-position="right"
          :label-width="100"
        >
          <FormItem label="appid" prop="CustomCode">
            <Input
              v-model="formEditUser.CustomCode"
              placeholder="请输入appid"
              v-bind:disabled="isUpdate"
            />
          </FormItem>
          <FormItem label="客户名称" prop="CustomName">
            <Input v-model="formEditUser.CustomName" placeholder="请输入客户名称" />
          </FormItem>
          <FormItem label="客户logo" prop="LogoImage">
            <v-upload v-on:save="saveFile" ref="upFile" :srcurl="pgImg" v-on:del="delFile"></v-upload>
          </FormItem>
          <FormItem label="账号有效时间" prop="ValidFrom">
            <DatePicker
              :value="ptime"
              format="yyyy-MM-dd HH:mm:ss" 
              type="datetimerange"
              placeholder="请选择账号有效时间"
              style="width:100%"
              @on-change="changeTime"
            ></DatePicker>
          </FormItem>
          <FormItem label="是否启用" prop="isEnabled">
            <RadioGroup v-model="formEditUser.isEnabled">
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
    <!---编辑客户弹窗end---->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UploadImg from "@/components/UploadImg.vue";
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
  name: "CustomerManagement",
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
        CustomCode: "",
        CustomName: "",
        LogoImage: "",
        ValidFrom: "",
        ValidTo: "",
        isEnabled: "",
      },
      ruleValidate: {
        CustomCode: [
          { required: true, message: "请输入appid", trigger: "blur" }
        ],
        CustomName: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ],
        isEnabled: [
          { required: true, message: "请选择是否启用", trigger: "change" }
        ],
        LogoImage: [{ required: true, message: "请上传示例图片", trigger: "blur" }]
      },
      columnsUsersList: [
        {
          type: "index",
          width: 100,
          align: "center"
        },
        {
          title: "appid",
          key: "CustomCode",
          align: "center"
        },
        {
          title: "客户名称",
          key: "CustomName",
          align: "center"
        },
        {
          title: "客户logo",
          key: "LogoImage",
          align: "center",
          render: (h, params) => {
            if (params.row.LogoImage == "" || params.row.LogoImage == null) {
              return h("span", "");
            } else {
              return h("img", {
                style: {
                  width: "80px",
                  height: "80px",
                  "border-radius": "5%"
                },
                attrs: {
                  src: params.row.LogoImage
                }
              });
            }
          }
        },
        {
          title: "账号有效期开始",
          key: "ValidFrom",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              params.row.ValidFrom == null ? "" : params.row.ValidFrom // .substring(0,10) formatDate(new Date(params.row.ValidFrom),'yyyy/MM/dd')
            );
          }
        },
        {
          title: "账号有效期结束",
          key: "ValidTo",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              params.row.ValidTo == null ? "" : params.row.ValidTo //.substring(0,10)  formatDate(new Date(params.row.ValidTo),'yyyy/MM/dd')
            );
          }
        },
        {
          title: "是否启用",
          key: "IsEnabled",
          align: "center",
          render: (h, params) => {
            let tmpStr = "";
            if (params.row.IsEnabled == true) {
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
      CustomCodeSearch: null,
      CustomNameSearch: null,
      pageSize: 20,
      page: 1,
      pageTotal: 0, //记录总条数
      RolesLists: [],
      ptime: "", //账号有效期
      isUpdate: false,
      pgImg:'',
      uploadList: [],
    };
  },
  components: {
    "v-upload":UploadImg,
  },
  computed: {},
  created() {
    this.GetAllUsers();
  },
  mounted() {},
  methods: {
    ...mapActions(["UpdateBreadcrumb","UpdateMenuStatus"]),
    //获取上传图片
    saveFile(src) {
      this.img = src;
    },
    //删除上传图片
    delFile() {
      this.img = "";
      this.pgImg = "";
    },
    //奖品中奖范围时间
    changeTime(data) {
      this.ptime = data;
      this.formEditUser.ValidFrom = "clearValid";
    },
    //新增客户
    EditUser() {
      (this.isShowEdit = true), (this.operationName = "新增客户");
      this.$refs["formEditUser"].resetFields();
      this.formEditUser.Id = null;
      this.isUpdate = false;
      this.ptime = "";
      //新增清空上次上传图片
      if(this.$refs.upFile.uploadList.length>0){
        this.$refs.upFile.uploadList.splice(0);
      }
    },
    //放弃新增编辑客户操作
    cancelEdit(name) {
      this.isShowEdit = false;
      this.$refs[name].resetFields();
    },
    //编辑客户
    updateUser(index) {
      this.isShowEdit = true;
      this.operationName = "编辑客户";

      this.$get("/api/crmCustom/GetById", { id: index }).then(res => {
        if (res.state == 1) {
          this.formEditUser.Id = index;
          this.formEditUser.CustomName = res.rows[0].CustomName;
          this.formEditUser.CustomCode = res.rows[0].CustomCode;
          this.isUpdate = true;
          this.pgImg=(res.rows[0].LogoImage=='' || res.rows[0].LogoImage==null)?'':res.rows[0].LogoImage;
          this.ptime = [res.rows[0].ValidFrom, res.rows[0].ValidTo];
          this.formEditUser.isEnabled = res.rows[0].IsEnabled + "";
        } else {
          this.$Message.error("查询记录失败！" + res.msg);
        }
      });
    },
    //跳转到-配置客户
    toAllocationCustomer(index) {
      this.$router.push({ name: "AllocationCustomer",params:{appid:index} });
    },
    //跳转到-用户管理
    toUsersManagement(index) {
      this.UpdateMenuStatus({ activeName: "6-1", openNames: ["6"] });
      this.$router.push({ name: "UsersManagement",params:{appid:index} });
    },
    //提交数据
    handleSubmit(name) {
      if (this.ptime == null) {
        this.$refs[name].model.ValidFrom = null;
        this.$refs[name].model.ValidTo = null;
      } else {
        this.$refs[name].model.ValidFrom = this.ptime[0];
        this.$refs[name].model.ValidTo = this.ptime[1];
      }

      this.$refs[name].model.LogoImage=(this.img==null || this.img=="")?this.pgImg:this.img
      this.$refs[name].validate(valid => {
        if (valid) {
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
            "/api/crmCustom/SaveOrUpdate",
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
    //加载所有客户
    GetAllUsers() {
      var data = {
        customCode: this.CustomCodeSearch,
        customNameLike: this.CustomNameSearch,
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
      this.$post("/api/crmCustom/GetListBySC", data).then(res => {
        this.$Spin.hide();
        if (res.state == 1) {
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
  }
};
</script>

<style>
.CustomerManagement .ivu-select-selection,
.CustomerManagement .ivu-select-dropdown-list,
.CustomerManagement .ivu-checkbox-group {
  text-align: left !important;
}
.CustomerManagement .ivu-checkbox-group {
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