<template>
  <div class="leftMenu">
    <Row type="flex">
      <i-col span="24">
        <img class="logo" src="../assets/jifen-logo.png" />
      </i-col>
    </Row>
    <Menu accordion :active-name="menuStatus.activeName" :open-names="menuStatus.openNames" @on-select="selectSubmenu">
      <Submenu name="1" class="menu-home" v-bind:class="{'ivu-menu-opened':isdefault&&menuStatus.activeName=='1'}">
        <template slot="title">
          <div @click="gohome">
            <Icon type="md-home" size="18" style="margin-right:8px" />首页
          </div>
        </template>
      </Submenu>
      <Submenu v-for="(menu,index) in JSON.parse(menuLists)" :name="menu.openname"  :key="index">
        <template slot="title">
          <Icon :type="menu.icon" size="18" />{{menu.category}}
        </template>
        <MenuItem
          v-for="(sub,subindex) in menu.sub"
          :key="subindex"
          :to="sub.path"
          :name="sub.activename"
        >{{sub.name}}</MenuItem>
      </Submenu>
    </Menu>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
const _ = require("lodash");

export default {
  name: "leftMenu",
  data() {
    return {
      isdefault: true, //默认首页
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["menuStatus","menuLists"])
  },
  created() {
  },
  mounted() {},
  methods: {
    ...mapActions(["UpdateBreadcrumb","UpdateMenuStatus"]),

    gohome() {
      this.isdefault = true;
      this.UpdateBreadcrumb(["首页"]);
      this.UpdateMenuStatus({ activeName: "1", openNames: [""] });
      this.$router.push({ name: "home" });
    },
    //选择子菜单（MenuItem）时触发
    selectSubmenu(name) {
      var menuLists = JSON.parse(this.menuLists);
      this.isdefault = false;
      var submenu = []; //子菜单集合
      _.forEach(menuLists, a => {
        _.forEach(a.sub, b => {
          submenu.push(b);
        });
      });
      var obj = _.find(submenu, c => {
        return c.activename == name;
      });
      if (obj) {
        //更新面包屑
        this.UpdateBreadcrumb([obj.category, obj.name]);
        //主菜单index
        var mainIndex = _.findIndex(menuLists, d => {
          return d.category == obj.category;
        });
        var openArr = [];
        openArr.push(menuLists[mainIndex].openname);
        //更新菜单状态
        this.UpdateMenuStatus({ activeName: name, openNames: openArr });
      }
    },
  }
};
</script>

<style>
.ivu-menu {
  color: #fff !important;
}
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 14px 38px !important;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
  padding-left: 64px !important;
}
.menu-home .ivu-icon-ios-arrow-down {
  display: none !important;
}
</style>
<style scoped lang="less">
.leftMenu {
  height: 100%;
  overflow-y: auto;
  .ivu-row-flex {
    justify-content: center;
    align-items: center;
    padding: 25px 0 12px 0;
    .logo {
      width: 120px;
    }
  }
  .ivu-menu {
    width: 100% !important;
    background: none !important;
    text-align: left;
  }
  .ivu-menu-light.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: #40476c !important;
  }
  .ivu-menu-vertical .ivu-menu-opened,.ivu-menu-child-item-active{
    color: #14cdbc !important;
  }
  .ivu-menu-vertical.ivu-menu-light:after {
    background: none !important;
  }
}
</style>