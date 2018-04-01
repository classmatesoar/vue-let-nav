<template>
  <div class="template-box" 
  v-loading="loading"
  element-loading-text="菜单获取中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)"
  >
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false" @click.native="$store.commit('menuBarSize','menuBarNormal')">展开</el-radio-button>
        <el-radio-button :label="true" @click.native="$store.commit('menuBarSize','menuBarMini')">收起</el-radio-button>
      </el-radio-group>
      <el-menu class="el-menu-vertical-demo" :default-active="$route.path" unique-opened router :collapse="isCollapse">
        <template v-for="item in menu">
          <el-submenu v-if="item.child!=undefined" :key="item.path" :index="'/'+item.path">
              <template slot="title">
                <i :class="'el-icon-'+item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </template>
              <el-menu-item-group v-for="i in item.child" :key="i.path">
                <el-menu-item :index="'/'+i.path">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :key="item.path" :index="'/'+item.path">
              <i :class="'el-icon-'+item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </template>


      </el-menu>



  </div>
</template>
<script>
import publicMethods from '../public/publicMethods';
export default {
  name: "menuBar",
  mounted() {
    const self = this;
      self.axiosPass('/menubar')
      .then(res => {
        this.axiosPublic();
        self.menu = res.data.data;
        self.$store.commit('welcomeYou');
      })
      .catch(error => {
        self.axiosPublic();
        self.$notify.error({
          title: '错误',
          message: '菜单获取失败',
          position:'top-left'
        });
      });
  },
  methods: {
    ...publicMethods
  },
  data() {
    return {
      loading:true,
      menu: [],
      isCollapse: false
    };
  }
};
</script>
<style lang="less" scoped>
div.template-box {
  .width(@val:100%) {
    width: @val;
  }
  .height(@val:100%) {
    height: @val;
  }
  @a-color: #000;
  @a-backgrund: #eee;
  @a-color-hover: #fff;
  @a-backgrund-hover: #aaa;
  box-shadow: inset 0 0 10px lightgreen;
  // & > ul {
  //   .width();
  //   .height();
  //   & > li {
  //     .width();
  //     a {
  //       .width();
  //       color: @a-color;
  //       padding: 5px 10px;
  //       margin: 1px 0;
  //       background: @a-backgrund;
  //       display: inline-block;
  //       text-decoration: none;
  //       &:hover {
  //         background: @a-backgrund-hover;
  //         color: @a-color;
  //       }
  //     }
  //   }
  // }
}
</style>

