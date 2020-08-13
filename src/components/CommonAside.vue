<template>
  <el-menu
    :default-active=" current ? current.path : '/'"
    class="el-menu-vertical"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="asideCollapse"
  >
    <h3 v-show="!asideCollapse">后台管理系统</h3>
    <h3 v-show="asideCollapse" @click="toggleMenu">
      <i class="el-icon-arrow-right"></i>
    </h3>
    <el-menu-item
      :index="item.path"
      v-for="(item) in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="item.icon" style="color: #fff"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.name" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="item.icon" style="color: #fff"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item
        :index="subitem.path"
        v-for="(subitem, subindex) in item.children"
        :key="subindex"
        @click="clickMenu(subitem)"
      >{{ subitem.label }}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // asideMenu: [
      //   {
      //     name: "home",
      //     path: "/",
      //     label: "首页",
      //     icon: "el-icon-s-home",
      //   },
      //   {
      //     name: "video",
      //     path: "/video",
      //     label: "视频管理",
      //     icon: "el-icon-video-play",
      //   },
      //   {
      //     name: "user",
      //     path: "/user",
      //     label: "用户管理",
      //     icon: "el-icon-user",
      //   },
      //   {
      //     label: "其他",
      //     path: "/other",
      //     icon: "el-icon-setting",
      //     children: [
      //       {
      //         name: "setting",
      //         path: "/setting",
      //         label: "设置",
      //         icon: "el-icon-setting",
      //       },
      //       {
      //         name: "logout",
      //         path: "/logout",
      //         label: "登出",
      //         icon: "el-icon-setting",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  computed: {
    menu() {
      return this.$store.state.tab.menu;
    },
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    ...mapState({
      current: (state) => state.tab.currentMenu,
      asideCollapse: (state) => state.tab.asideCollapse,
    }),
  },
  methods: {
    clickMenu(item) {
      this.$store.commit("selectMenu", item);
    },
    toggleMenu() {
      this.$store.commit("toggleAsideMenu");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    font-size: 1.3rem;
    line-height: 4rem;
    i {
      cursor: pointer;
    }
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>