<template>
  <div class="template-box">
    <div class="header-right">
      <el-dropdown v-if="personInfo.ticket">
        <span class="el-dropdown-link">
          {{personInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="personInfo.ticket!='000'" >个人信息</el-dropdown-item>
          <el-dropdown-item v-if="personInfo.ticket!='000'" command>账号安全</el-dropdown-item>
          <el-dropdown-item @click.native="LiaisonVideo">视频联系</el-dropdown-item>
          <el-dropdown-item @click.native="LiaisonAudio">语音联系</el-dropdown-item>
          <el-dropdown-item @click.native="fullScreen(readyFullScreen)">{{readyFullScreen===true?'全屏':'退出全屏'}}</el-dropdown-item>
          <el-dropdown-item v-if="personInfo.ticket!='000'" disabled>个性设置</el-dropdown-item>
          <el-dropdown-item v-if="personInfo.ticket!='000'" divided @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <a v-else href="/" @click.prevent="$router.push('/login')">{{personInfo.name}}</a>
    </div>
  </div>
</template>
<script>
import publicMethods from "../public/publicMethods";
export default {
  name: "app-header",
  props: ["personInfo"],
  data(){
    return {
      readyFullScreen:true
    }
  },
  methods: {
    ...publicMethods,
    loginOut() {
      this.$confirm("确定退出吗?", "询问", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axiosPass("/loginOut")
            .then(res => {
              this.$store.commit("infoClear");
              this.$router.push("/login");
            })
            .catch(error => {
              this.$message({
                type:'info',
                message:'退出失败'
              })
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
div.header-right {
  width: 150px;
  height: 100%;
  float: right;
  background: transparent;
  * {
    background: transparent;
  }
}
</style>
