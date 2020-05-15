<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow-y: scroll;
  line-height: 1;
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
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
