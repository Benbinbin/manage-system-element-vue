<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#33aef0"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item :index="item.path" v-for="(item, index) in noChildren" :key="index" @click="clickMenu(item)">
      <i :class="item.icon" style="color: #fff"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.path" v-for="(item, index) in hasChildren" :key="index">
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
export default {
  data() {
    return {
      asideMenu: [
        {
          name: "home",
          path: "/",
          label: "首页",
          icon: "el-icon-s-home",
        },
        {
          name: "video",
          path: "/video",
          label: "视频管理",
          icon: "el-icon-video-play",
        },
        {
          name: "user",
          path: "/user",
          label: "用户管理",
          icon: "el-icon-user",
        },
        {
          label: "其他",
          path: "/other",
          icon: "el-icon-setting",
          children: [
            {
              name: "setting",
              path: "/setting",
              label: "设置",
              icon: "el-icon-setting",
            },
            {
              name: 'logout',
              path: "/logout",
              label: "登出",
              icon: "el-icon-setting",
            },
          ],
        },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.asideMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asideMenu.filter((item) => item.children);
    },
  },
  methods: {
    clickMenu(item) {
      this.$store.commit('selectMenu', item);

    }
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;

}
</style>