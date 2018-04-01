<template>
  <div class="template-box">
      <el-breadcrumb class="crumbClass" separator-class="el-icon-arrow-right" separator="/">
        <el-breadcrumb-item @click.native="$router.go(-1)" separator-class="el-icon-menu">{{allCrumbs[view]}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{allCrumbs[pattern]}}</el-breadcrumb-item>
      </el-breadcrumb>

      
      <el-row hidden>
        <el-col :span="12">
          <video src="" id="video" height="80"></video>
        </el-col>
        <el-col :span="12">
          <audio src="" id="audio"></audio>
        </el-col>
      </el-row>

      <el-form ref="form" :model="form" style="height:500px">
        <el-form-item v-for="item in formItems" :key="item.name" :label="item.label">
          <el-input v-if="item.type=='input'" v-model="form[item.name]"></el-input>
          <el-select v-else-if="item.type=='select'" v-model="form[item.name]"></el-select>
          <el-date-picker v-else-if="item.type=='date'" v-model="form[item.name]"></el-date-picker>
          <el-time-picker v-else-if="item.type=='time'" v-model="form[item.name]"></el-time-picker>
          <el-checkbox v-else-if="item.type=='checkbox'" v-model="form[item.name]"></el-checkbox>
          <el-radio v-else></el-radio>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import viewInit from "../../public/viewInit";
viewInit.props = ["view", "pattern", "id"];
viewInit.computed.form = function() {
  const sessionStorageId = this.view + this.id;
  let form = sessionStorage[sessionStorageId];
  let result;
  if(!form){
    form="{}"
  }
  result= JSON.parse(form);
  return result
};

export default {
  ...viewInit
};
</script>
<style lang="less" scoped>
.crumbClass {
  padding: 10px;
}
</style>

