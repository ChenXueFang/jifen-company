<template>
  <div class="rightUser">
    <div class="userInfo">
      <div class="user">
        <img src="../assets/user.png" />
      </div>
      <!-- <div class="name">
        Hi~ Admin
        <Icon type="ios-arrow-down" />
      </div> -->
      <Dropdown trigger="hover">
        <a href="javascript:void(0)" class="name">
          Hi~ {{name}}
        <Icon type="ios-arrow-down" />  
        </a>
        <DropdownMenu slot="list">
          <DropdownItem><div @click="ResetPwd">修改密码</div></DropdownItem>
          <DropdownItem><div @click="LogOut">退出登录</div></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "rightUser",
  data() {
    return {
      name:"",
      loginCode:""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    if(this.user.length>0){
      this.name = JSON.parse(this.user).Name;
      this.loginCode = JSON.parse(this.user).LoginCode;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapActions(["UpdateUser","UpdateMenuStatus"]),

    LogOut(){
      var data = {
        loginCode: this.loginCode,
      };
      this.$post("/api/Auth/exitLogin",data).then((res)=>{
          if(res.state==1){
            localStorage.setItem("logintoken",null)
            this.UpdateMenuStatus({ activeName: "1", openNames: [""] });
            this.$router.push({path:"/"})
          }else{
            this.$Message.error("操作失败！"+res.msg);
          }
      })
    },
    ResetPwd(){
      this.$router.push({path:"/ResetPwd"})
    }
  }
};
</script>

<style scoped lang="less">
.rightUser {
  width: 30%;
  height: 100%;
  .userInfo {
    height: 100%;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .user img {
      width: 30px;
      margin-right: 10px;
    }
    .name {
      color: #777777;
      .ivu-icon {
        margin-left: 5px;
      }
    }
  }
}
</style>