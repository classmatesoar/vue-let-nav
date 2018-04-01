<template>
  <div class="template-box">
    <el-form :model="loginForm" ref="loginForm" :rules="loginCheck" label-position="right" status-icon size="medium" @submit.native.prevent>
      <el-form-item label="账号" prop="name">
        <el-input v-model="loginForm.name" placeholder="请输入账号或用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.pwd" @keyup.enter.native="loginIn"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginIn">登陆</el-button>
        <el-button type="text" @click="visitorIn">游客访问</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import publicMethods from "../public/publicMethods";
let loginTip;
export default {
  data() {
    return {
      loginForm: {
        name: "",
        pwd: ""
      },
      loginCheck: {
        name: [
          { required: true, message: "请输入账号或用户名", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...publicMethods,
    loginIn() {
      const self = this;
      self.$refs.loginForm.validate(valid => {
        if (valid) {
          if (loginTip) {
            loginTip.close();
          }
          self
            .axiosPass("/loginIn", {
              name: self.loginForm.name,
              pwd: self.loginForm.pwd
            })
            .then(res => {
              if (res.data.data) {
                self.$store.commit("infoSet", res.data.data);
                this.$router.push("/index");
                // self.$router.push({
                //   path: "/index",
                //   query: {
                //     name: "soar",
                //     age: 25,
                //     sex: "man"
                //   }
                // });
              } else {
                loginTip = self.$notify.error({
                  message: res.data.msg
                });
              }
            })
            .catch(error => {
              console.log(error);
              loginTip = self.$notify.error({
                message: "网络连接失败"
              });
            });
        } else {
          return false;
        }
      });
    },
    visitorIn() {
      this.$store.commit("infoSet", {
        name: "游客",
        ticket: "000"
      });
      this.$router.push("/index");
    }
  }
};
</script>
<style lang="less" scoped>
div.template-box {
  background: rgba(183, 235, 107, 0.5);
  position: fixed;
  form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
