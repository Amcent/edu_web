<template>
  <div class="social-wechat"></div>
</template>

<script>
import authService from "../global/services/auth";

export default {
  name: "AuthSocialWechat",

  created() {
    console.log("auth");
    const code = this.$route.query.code;
    console.log("created -> code", code);

    authService
      .authSocialWechat({ code })
      .then(() => {
        this.$router.replace({ name: "Home" });
      })
      .catch(err => {
        console.log("created -> err", err);
      });
  }
};
</script>
