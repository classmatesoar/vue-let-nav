<template>
  <div class="template-box">
    <div id="app-container-menubar" :class="$store.state.menuBarClass">
    <menu-bar></menu-bar>
    </div>
    <div id="app-container-content" :class="$store.state.menuBarClass">

<transition  name="fade">

    <router-view style="margin:10px"
    v-loading="bodyLoading"
    element-loading-text="正在加载"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"/>
    </transition>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import menuBar from "./menuBar";
export default {
  name: "appbody",
  components: {
    menuBar
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["bodyLoading"])
  }
};
</script>
<style lang="less" scoped>
#app-container-menubar {
  // width: 16.66%;
  height: 100%;
  float: left;
}
#app-container-content {
  // width: 83.33%;
  height: 100%;
  float: right;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translate(10px, 10px);
}
</style>
