<template>
  <div class="template-box">
    <el-button v-for="item in patterns" :key="item.pattern" @click="intoPattern(item.pattern)">{{item.title}}</el-button>
  </div>
</template>
<script>
import viewInit from '../../public/viewInit';
export default {
  ...viewInit
}
</script>
<style lang="less" scoped>

</style>
