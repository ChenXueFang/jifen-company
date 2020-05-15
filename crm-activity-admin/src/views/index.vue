<template>
  <div class="index">
    <Layout>
      <Sider hide-trigger>
        <v-left-menu />
      </Sider>
      <Layout>
        <Header>
          <v-breadcrumb />
          <v-right-user />
        </Header>
        <Content>
          <!-- <keep-alive v-bind:exclude="exclude">  -->
            <router-view v-if="isRouterAlive"></router-view>
          <!-- </keep-alive> -->
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import RightUser from "@/components/RightUser.vue";
export default {
  name: "index",
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      exclude:"CreateActivityLottery",
      isRouterAlive:true //控制router-view的显示或隐藏
    }
  },
  components: {
    "v-left-menu": LeftMenu,
    "v-breadcrumb": Breadcrumb,
    "v-right-user": RightUser
  },
  methods:{
    //通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
    //然后在需要当前页面刷新的页面中注入App.vue组件提供（provide）的 reload 依赖，然后直接用this.reload来调用就行
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    }
  }
};
</script>

<style lang="less">
.index {
  width: 100%;
  height: 100%;
}
.ivu-layout {
  height: 100%;
  background: #f9f9f9 !important;
}
.ivu-layout-sider {
  background-color: #353d64 !important;
  box-shadow: 4px 4px 8px 0px rgba(6, 15, 53, 0.15);
}
.ivu-layout-header {
  background-color: #ffffff !important;
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}
.ivu-layout-header {
  padding: 0 35px !important;
  line-height: normal !important;
  display: flex;
  justify-content: space-between;
}
.ivu-layout-content {
  padding: 20px 20px 0 20px;
  overflow-x: auto;
}
</style>
