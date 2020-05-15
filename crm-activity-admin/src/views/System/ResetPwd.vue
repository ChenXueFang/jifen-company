<template>
  <div class="ResetPwd">
      <div class="rp_content">
          <div class="rp_title">修改密码</div>
          <Form
            ref="formReset"
            :model="formReset"
            :rules="ruleValidate"
            label-position="right"
            :label-width="150"
            >
            <FormItem label="输入旧密码" prop="remark">
                <Input v-model="formReset.remark" placeholder="请输入旧密码" type="password" />
            </FormItem>
            <FormItem label="输入新密码" prop="loginPwd">
                <Input v-model="formReset.loginPwd" placeholder="请输入新密码" type="password" />
            </FormItem>
            <FormItem label="再次输入新密码" prop="newPwdAgain">
                <Input v-model="formReset.newPwdAgain" placeholder="请再次输入新密码" type="password" />
            </FormItem>
            <FormItem>
              <Button type="text" size="large" @click="cancelEdit('formReset')" class="cancel">取消</Button>
              <Button type="primary" size="large" @click="handleSubmit('formReset')">确定</Button>
            </FormItem>
            </Form>
          
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ResetPwd",
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
        formReset:{
            mUserId:'',
            remark:'',
            loginPwd: '',
            newPwdAgain: ''
        },
        ruleValidate: {
            remark: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
            loginPwd: [{ validator: validatePass, trigger: 'blur' }],
            newPwdAgain: [{ validator: validatePassCheck, trigger: 'blur' }],
      },
    };
  },
  components: {},
  computed: {
      ...mapGetters(["user"])
  },
  created() {
  },
  mounted() {},
  methods: {
    //取消
    cancelEdit(name) {
      this.$refs[name].resetFields();
    },
    //确定
    handleSubmit(name) {
      this.$refs[name].model.mUserId=JSON.parse(this.user).MUserId
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$post("/api/Auth/PutPwd", this.$refs[name].model).then((res)=>{
              if(res.state==1){
                this.$Message.info("修改成功!");  
              }else{
                this.$Message.error("修改失败！"+res.msg);
              }
          })
        }
      });
    },
  }
};
</script>

<style scoped  lang="less">
.ResetPwd{
    width: 100%;
    height: 100%;
    // background-color: #F5F8FC;
}
.rp_content{
    width: 30%;
    margin: auto;
    padding: 50px;
}
.rp_title{
    color: #14CDBC;
    font-size: 22px;
    margin-bottom: 20px;
}
Button{
    width: 100px;
}
.cancel{
    background-color: #A9A9A9;
    color: #FFF;
    margin-right: 10px;
}
</style>