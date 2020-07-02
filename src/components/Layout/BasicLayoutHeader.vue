<template>
  <header class="page-header-container">
    <div class="page-header-content">
      <div class="header-logo">
        <a href="/">
          <img src="../../assets/logo.png" />
        </a>
      </div>
      <nav class="nav-list">
        <a href="/" :class="['nav-item', routeName === 'Home' ? 'active' : '']">首页</a>
        <a href="/career" :class="['nav-item', routeName === 'Career' ? 'active' : '']">职业课</a>
        <a href="/project" :class="['nav-item', routeName === 'Project' ? 'active' : '']">企业项目</a>
        <a href="/evaluation" :class="['nav-item', routeName === 'Evaluation' ? 'active' : '']">技能测评</a>
      </nav>
      <div class="auth-operation" v-if="!hasLogged">
        <a href="/login" class="auth-login">登录</a>
        <span class="auth-split-line">|</span>
        <a href="/login" class="auth-sign_up">注册</a>
      </div>
      <el-dropdown class="user-operation" v-if="hasLogged" @command="handleCommand">
        <div class="user-avatar">
          <div class="avatar">
            <img :src="user.avatar_url">
          </div>
          <i class="el-icon-arrow-down user-dropdown"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-user"></i>
            <a href="/user-info" class="dropdown-item-text" style="text-decoration: none;">个人信息</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-setting"></i>
            <a href="/user-bind" class="dropdown-item-text" style="text-decoration: none;">系统设置</a>
          </el-dropdown-item>
          <el-dropdown-item command="Logout">
            <i class="el-icon-error"></i>
            <span class="dropdown-item-text">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import DataStore from "@/global/storage/index";
import { mapState } from "vuex";

export default {
  name: "BasicHeader",

  created() {
    let user = this.$store.state.user;

    if (JSON.stringify(user) == "{}") {
      this.hasLogged = false;
    } else {
      this.hasLogged = true;
    }
  },

  data() {
    return {
      hasLogged: false
    };
  },

  methods: {
    handleCommand(command) {
      if (command === "Logout") {
        DataStore.removeToken();
        window.location.reload();
      }
    }
  },

  computed: {
    ...mapState(["user"]),

    routeName() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="less" scoped>
.page-header-container {
  height: 60px;

  .page-header-content {
    display: flex;
    position: relative;
    width: 1080px;
    height: 100%;
    margin: 0 auto;
    padding: 10px 0 10px 110px;
    justify-content: space-between;

    .header-logo {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      width: 110px;
      height: 100%;
      align-items: center;

      img {
        width: 110px;
        height: 20px;
      }
    }

    .nav-list {
      margin-left: 40px;

      .nav-item {
        position: relative;
        margin-left: 32px;
        line-height: 40px;
        font-size: 14px;
        color: #666;
        text-decoration: none;

        &.active {
          &::before {
            position: absolute;
            left: 50%;
            bottom: -8px;
            transform: translate(-50%);
            width: 110%;
            height: 4px;
            border-radius: 2px;
            content: "";
            background: #333;
          }
        }
      }
    }

    .auth-operation {
      line-height: 40px;
      font-size: 14px;
      color: #666;

      .auth-login {
        text-decoration: none;
        cursor: pointer;
      }

      .auth-split-line {
        margin: 0 8px;
      }

      .auth-sign_up {
        text-decoration: none;
        cursor: pointer;
      }
    }

    .user-operation {
      width: 60px;
      height: 100%;
      cursor: pointer;

      .user-avatar {
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 100%;

        .avatar {
          width: 40px;
          height: 40px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .user-dropdown {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          height: 14px;
        }
      }
    }
  }
}
</style>
