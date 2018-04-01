<template>
  <div id="app">
    <div id="app-header">
      <app-header :personInfo="personInfo"></app-header>
    </div>
    <div id="app-body">
     <app-body></app-body>
    </div>
    <div id="app-footer">
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import publicMethods from "../public/publicMethods";
import appHeader from "./header";
import appBody from "./body";
import appFooter from "./footer";
export default {
  name: "App",
  components: {
    appHeader,
    appBody,
    appFooter
  },
  created() {
    if (this.personInfo.ticket == undefined) {
      let sessionStorageInfo = sessionStorage["info"];
      sessionStorageInfo === undefined
        ? (sessionStorageInfo = JSON.stringify({
            name: "请登录"
          }))
        : true;
      const personInfo = JSON.parse(sessionStorageInfo);
      this.$store.commit("infoSet", personInfo);
    }
  },
  mounted() {
    if (this.checkTicket()) {
      if (this.personInfo.ticket != "000") {
        this.$message({
          message: `欢迎您,${this.personInfo.name}`,
          type: "success"
        });
      } else {
        this.$message({
          message: "您尚未登陆",
          type: "info"
        });
      }
    }
  },
  methods: {
    checkTicket() {
      const self = this;
      if (self.personInfo.ticket === undefined) {
        self.$alert("用户信息丢失，请重新登陆", "通知", {
          confirmButtonText: "确定",
          callback() {
            self.$router.push("/login");
          }
        });
      } else {
        return true;
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    personInfo() {
      return this.$store.state.info;
    }
  }
};
</script>
<style lang="less">
@hm-app: 600px;
@h-h: 70px;
@h-f: 70px;
@mm-app: 800px;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
div.template-box {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  // background: lightgoldenrodyellow;
  position: relative;
  padding: @h-h 0 @h-f;
  min-height: @hm-app;
  min-width: @mm-app;
  #app-header {
    // box-shadow: inset 0 0 10px greenyellow;
    position: absolute;
    width: 100%;
    height: @h-h;
    left: 0;
    top: 0;
    line-height: @h-h;
  }
  #app-body {
    height: calc(~"100%" - @h-h - @h-f);
    & > div {
      box-shadow: inset 0 0 10px yellow;
    }
  }
  #app-footer {
    // box-shadow: inset 0 0 10px greenyellow;
    position: absolute;
    width: 100%;
    height: @h-f;
    left: 0;
    bottom: 0;
  }
  .menuBarNormal[id="app-container-menubar"] {
    width: 16.66%;
  }
  .menuBarNormal[id="app-container-content"] {
    width: 83.33%;
  }
  .menuBarMini[id="app-container-menubar"] {
    width: 63px;
  }
  .menuBarMini[id="app-container-content"] {
    width: calc(~"100% - 63px");
  }
}
</style>
