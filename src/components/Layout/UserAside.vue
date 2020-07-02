<template>
  <div class="user-aside-container">
    <div class="user-aside-content">
      <el-menu :default-active="defaultActive" class="aside-nav-list" :router="true">
        <el-menu-item index="/user-info" class="aside-nav-item">
          <i class="el-icon-menu"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
        <el-menu-item index="/user-bind" class="aside-nav-item">
          <i class="el-icon-setting"></i>
          <span slot="title">账号安全</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAside",

  props: {
    defaultActive: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.user-aside-container {
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 20px 0 rgba(56, 35, 219, 0.09);

  .user-aside-content {
    width: 100%;
    height: 100%;

    .aside-nav-list {
      height: 100%;

      .aside-nav-item {
        font-size: 16px;
      }
    }
  }
}
</style>
