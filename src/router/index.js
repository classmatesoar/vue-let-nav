import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  // scrollBehavior (to, from, savedPosition) {
  // to 和 from 都是 路由信息对象
  // console.warn(to,from,savedPosition)
  // },
  mode: 'history',
  routes: [
    {
      name: '登陆页',
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      meta: {
        title: '登陆'
      },
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
      path: '/index',
      component: resolve => require(['../components/index.vue'], resolve),
      children: [
        {
          path: '/',
          redirect: '/dynamic'
        },
        {
          path: '/dynamic',
          meta: {
            title: '动态'
          },
          component: resolve => require(['../components/view/dynamic.vue'], resolve)
        },
        {
          path: '/publish1',
          meta: {
            title: '英雄'
          },
          component: resolve => require(['../components/view/publish1.vue'], resolve)
        },
        {
          path: '/publish2',
          meta: {
            title: '事件'
          },
          component: resolve => require(['../components/view/publish2.vue'], resolve)
        },
        {
          path: '/market',
          meta: {
            title: '天下'
          },
          component: resolve => require(['../components/view/market.vue'], resolve)
        },
        {
          path: '/installation1',
          meta: {
            title: '个性设置'
          },
          component: resolve => require(['../components/view/installation1.vue'], resolve)
        },
        {
          path: '/installation2',
          meta: {
            title: '流程设置'
          },
          component: resolve => require(['../components/view/installation2.vue'], resolve)
        },
        {
          path: '/:view/:pattern',
          //props:true,//还要配合通过组件中props数组注入才可以用
          props(route) {
            if(route.query.form){
              console.log(80000000000000000,typeof route.query.form,route.query.form)
            }
            return {
              ...route.query,//直接将路由路径query里面的键值对注入到对应的组件中//还要配合通过组件中props数组注入才可以用
              ...route.params//直接将路由路径params里面的键值对注入到对应的组件中//还要配合通过组件中props数组注入才可以用
            }
          },
          component: resolve => require(['../components/details/detailsDefault.vue'], resolve)
        },
      ]
    }
  ]
})
