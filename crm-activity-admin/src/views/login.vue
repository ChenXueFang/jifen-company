<template>
  <div class="login">

    <div class="login_main">
        <div class="lf_div">
            <div class="lf_main">
                <div class="logo">
                    <div class="lf_logo">
                        <img src="../assets/jf_logo.png">
                    </div>
                    <div class="ri_logo">
                        <div>基分科技</div>
                        <div>模块化管理后台</div>
                    </div>
                </div>
                <div class="loginInput">
                    <Form :model="formlogin" :rules="ruleValidateLogin" ref="formlogin" label-position="top">
                        <FormItem label="手机号" prop="mobile">
                            <Input v-model="formlogin.mobile" placeholder="请输入手机号" :maxlength='11'/>
                        </FormItem>
                        <FormItem label="密码" prop="pwd">
                            <div v-if="!isshowpwd">
                                <Input v-model="formlogin.pwd" placeholder="请输入密码" type="password" />
                                <img class="notShow" src="../assets/hidepwd.png" @click="showPwd()">
                            </div>
                            <div v-else>
                                <Input v-model="formlogin.pwd" placeholder="请输入密码" />
                                <img class="tShow" src="../assets/showpwd.png" @click="showPwd()">
                            </div>
                        </FormItem>
                        <FormItem label="验证码" prop="verifyCode">
                            <Input v-model="formlogin.verifyCode" placeholder="请输入验证码" style="width:260px" :maxlength="4" />
                            <img class="veriftycode" :src="yzmpic">
                            <span class="changeVeriftycode" @click="changeNew()">换一张</span>
                        </FormItem>
                        <div style="margin-bottom: 20px;">
                            <Checkbox v-model="single">记住密码</Checkbox>
                            <span class="forgetPwd" @click="showReset()">忘记密码？</span>
                        </div>
                        <FormItem>
                            <Button type="primary" class="loginbtn" @click="loginSystem('formlogin')">登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
        <div class="ri_div"><img src="../assets/login_bg.png"  style="width:100%;height:100%;"></div>
    </div>


    <!--重置密码-->
    <div class="hidebg" v-if="isShowReset"></div>
    <div v-if="isShowReset" class="resetPwd">
      <div class="resetPwd_main">
        <div class="ResetPwdContent">
          <div class="rptit">重置密码</div>
            <div class="resetInput">
                <Form ref="formReset" :model="formReset" :rules="ruleValidate" label-position="right" :label-width="120">
                    <FormItem label="手机号" prop="mobile">
                        <Input v-model="formReset.mobile" placeholder="请输入手机号" :maxlength="11" />
                    </FormItem>
                    <FormItem label="短信验证码" prop="remark">
                        <Input v-model="formReset.remark" placeholder="请输入短信验证码" :maxlength="6" />
                        <div class="getVerCode" @click="sendYZMForReset()" v-if="yzmcold">获取验证码</div>
                        <span class="getVerCode" v-else>{{yzmColddown}}s</span>
                    </FormItem>
                    <FormItem label="输入新密码" prop="loginPwd">
                        <Input v-model="formReset.loginPwd" placeholder="请输入密码" type="password" />
                    </FormItem>
                    <FormItem label="确认新密码" prop="newPwdAgain">
                        <Input v-model="formReset.newPwdAgain" placeholder="请再次输入密码" type="password" />
                    </FormItem>
                    <Button type="primary" class="cancelbtn" @click="cancelReset('formReset')">取消</Button>
                    <Button type="primary" class="resetbtn"  @click="handleSubmit('formReset')">重置</Button>
                </Form>
            </div>
        </div>
      </div>
    </div>

    <!--重置密码end-->

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入新密码'));
        } else {
            if (this.formReset.newPwdAgain !== '') {
                // 对第二个密码框单独验证
                this.$refs.formReset.validateField('newPwdAgain');
            }
            callback();
        }
    };
    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入新密码'));
        } else if (value !== this.formReset.loginPwd) {
            callback(new Error('两次输入的新密码不匹配'));
        } else {
            callback();
        }
    };
        return {
            single: false,
            isshowpwd:false,
            formlogin: {
                mobile: '',
                pwd: '',
                verifyCode: ''
            },
            ruleValidateLogin: {
                mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
                pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
                verifyCode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
            },
            isShowReset:false, //重置密码弹窗
             formReset: {
                mobile: '',
                remark: '',
                loginPwd: '',
                newPwdAgain: ''
            },
            ruleValidate: {
                mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
                remark: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
                loginPwd: [{ validator: validatePass, trigger: 'blur' }],
                newPwdAgain: [{ validator: validatePassCheck, trigger: 'blur' }],
            },
            yzmcold: true,
            yzmColddown: 0,
            yztoken:'', //第一次图形验证码返回的token，切换新验证码和登录需要使用
            yzmpic:'',//验证码图片 base64
        }
    },
  components: {
  },
  computed: {
    
  },
  created() {
      this.$Spin.hide();
      this.GetImagecode()
  },
  mounted() {
      
  },
  methods: {
      ...mapActions(["UpdateMenuLists","UpdateUser","UpdateBreadcrumb","UpdateMenuStatus"]),
    //显示密码
    showPwd(){
        this.isshowpwd=!this.isshowpwd
    },
    //打开重置密码
    showReset() {
        this.isShowReset = true;
    },
    //取消重置密码
    cancelReset(name){
        if (this.$refs[name]!==undefined) {
            this.$refs[name].resetFields();
        }
        this.isShowReset = false;
    },
    //重置发送短信验证码
    sendYZMForReset() {
        if (!/^1\d{10}$/.test(this.formReset.mobile)) {
            this.$Message.error("手机号有误，请检查！");
        } else {
            this.yzmcold = false;
            this.yzmColddown = 60;
            this.runYzmColddown();

            var data = {
                phone: this.formReset.mobile
            };
            this.$post("/api/ImageCheck/GetPhoneCheckCode", data).then(res => {
            if (res.state==1) {
                console.log(res)
                this.$Message.info("验证码已发送");
            } else {
                this.$Message.error(res.msg);
                }
            });
        }
    },
    //验证码60s重发
    runYzmColddown() {
      this.yzmColddown = this.yzmColddown - 1;
      if (this.yzmColddown >= 0) {
        let _this = this;
        setTimeout(function() {
          _this.runYzmColddown();
        }, 1000);
      } else {
        this.yzmcold = true;
      }
    },

    //加载图形验证码
    GetImagecode() {
      var data = {
        token: ""
      };
      this.$post("/api/ImageCheck/GetImageCheckCode", data).then(res => {
        if (res.state==1) {
            this.yztoken=res.data.token
            this.yzmpic=res.data.imgcode
        } else {
            this.$Message.error(res.msg);
        }
      });
    },
    //换一张
    changeNew(){
      var data = {
        token: this.yztoken
      };
      this.$post("/api/ImageCheck/GetImageCheckCode", data).then(res => {
        if (res.state==1) {
            this.yzmpic=res.data.imgcode
        } else {
           this.$Message.error(res.msg);
        }
      });
    },
    //登录
    loginSystem(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
                var data = {
                    loginCode: this.$refs[name].model.mobile,
                    loginPwd: this.$refs[name].model.pwd,
                    token: this.yztoken,
                    remark:this.$refs[name].model.verifyCode
                };
                this.$post("/api/Auth/adminLogin", data).then(res => {
                    if (res.state==1) {
                        this.$refs[name].resetFields();
                        this.changeNew()
                        localStorage.setItem("logintoken", res.data.token);
                        this.UpdateUser(JSON.stringify(res.rows[0]));
                        this.UpdateMenuLists(JSON.stringify(res.data.menu));
                        this.UpdateBreadcrumb(["首页"]);
                        this.UpdateMenuStatus({ activeName: "1", openNames: [""] });
                        this.$router.push({path:"/home"})
                    } else {
                        this.changeNew()
                        this.$Message.error(res.msg);
                    }
                });
            }
        })
    },

    //确定重置
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$post("/api/Auth/ResetPwd", this.$refs[name].model).then((res)=>{
              if(res.state==1){
                this.isShowReset = false;
                this.$Message.info("重置成功!");  
              }else{
                this.$Message.error("重置失败！"+res.msg);
              }
          })
        }
      });
    },
  }
}
</script>

<style>
.loginInput .ivu-form-item-label{
    font-size: 16px;
    letter-spacing: 0px;
    color: #333333;
}
.loginInput .ivu-input{
    height: 50px;
    background-color: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(53, 61, 100, 0.13);
    border-radius: 25px;
    border: 0;
    padding-left: 25px;
    font-size: 16px;
}
.ivu-checkbox-checked .ivu-checkbox-inner{
    border-color: #14cdbc;
    background-color: #14cdbc;
}
.login .resetInput .ivu-form-item-label{
    font-size: 16px;
    letter-spacing: 0px;
    color: #333333;
}
.login .resetInput .ivu-input{
    border-radius: 20px;
    border: solid 1px #d5d5d5;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
}
.resetInput .ivu-form-item{
    margin-bottom: 20px;
}
</style>
<style scoped lang="less">
.login {
  background: url(../assets/bg.png);
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
}
.login_main{
    width: 62.5%;
    min-width: 1200px;
    margin:0 auto;
    height: 72%;
    min-height: 700px;
    background-color: #ffffff;
    box-shadow: 3px 3px 57px 0px 
        rgba(53, 61, 100, 0.25);
    border-radius: 6px;

    .logo{
        .ri_logo{
            font-size: 24px;
            letter-spacing: 1px;
            color: #000000;
            margin-left: 10px;
        }
    }

    .lf_div{
        float: left; 
        width: 45%;   
        height: 100%;

        .lf_main{
            width: 75%;
            text-align: left;
            margin: auto;
            padding: 70px 0;
        }
    }
    .ri_div{
        float: right;
        width: 55%; 
        height: 100%;
    }

    .loginInput{
        margin-top: 30px;

        .notShow{
            position: absolute;
            margin-top: 22px;
            margin-left: -50px;
        }
        .tShow{
            position: absolute;
            margin-top: 20px;
            margin-left: -50px;
        }
        .veriftycode{
            width: 85px;
            height: 34px;
            vertical-align: middle;
            margin-left: 10px;
        }
        .changeVeriftycode{
            text-decoration: underline;
            font-size: 12px;
            letter-spacing: 0px;
            color: #999999;
            margin-left: 10px;
            cursor: pointer;
        }
        .loginbtn{
            width: 100%;
            height: 50px;
            border-radius: 25px;
            background-color: #14cdbc;
            box-shadow: 0px 0px 8px 0px rgba(0, 92, 83, 0.41);
            border-color: #14cdbc;
            font-size: 16px;
        }

        .forgetPwd{
            font-size: 12px;
            letter-spacing: 0px;
            color: #14cdbc;
            float: right;
            cursor: pointer;
        }
    }
}
.login_main .lf_div,.login_main .ri_div,.logo .lf_logo,.logo .ri_logo{
    display: inline-block;
}

//重置密码
.hidebg {
  position: absolute;
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
    min-height: 427px;
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
            height: 48px;
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
            height: 48px;
            background-color: #14cdbc;
            border-radius: 24px;
            border: #14cdbc;
            font-size: 16px;
            letter-spacing: 0px;
            color: #ffffff;
        }
        .getVerCode{
            display: inline-block;
            width: 120px;
            height: 40px;
            background-color: #14cdbc;
            position: absolute;
            margin-left: -120px;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            line-height: 40px;
            color: #FFFFFF;
        }
    }
}
@media screen and (max-width: 1360px) { /*当屏幕尺寸小于1360px时，应用下面的CSS样式*/
      .login_main {
          width: 100%!important;
          min-width: 800px!important;
          height: 100%!important;
       } 
       .login_main .lf_div .lf_main{
        padding: 0;
        position: relative;
        top: 50%; 
        transform: translateY(-50%);
    }         
  }
</style>
