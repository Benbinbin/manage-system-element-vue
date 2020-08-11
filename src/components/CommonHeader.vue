<template>
  <header>
    <div class="left-content">
      <el-button icon="el-icon-menu" circle size="mini" @click="toggleAsideMenu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImg" alt class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      userImg: require("@/assets/images/user.png"),
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.tab.currentMenu,
    }),
  },
  methods: {
    toggleAsideMenu() {
      this.$store.commit('toggleAsideMenu');
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 1rem;
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
    .user {
      width: 2.5rem;
      border-radius: 50%;
    }
  }
}
</style>

<style lang="scss">
.el-breadcrumb__inner.is-link {
  color: #bbb;
  cursor: pointer;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner.is-link {
  color: #fff;
}
</style>