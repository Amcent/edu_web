<template>
  <div class="page-container">
    <the-header></the-header>
    <router-view class="page-main"></router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import Header from "./BasicLayoutHeader";
import Footer from "./BasicLayoutFooter";

export default {
  name: "BasicLayout",

  components: {
    "the-header": Header,
    "the-footer": Footer
  }
};
</script>

<style lang="less" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .page-main {
    flex: 1;
  }
}
</style>
