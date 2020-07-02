<template>
  <div class="bind-wechat"></div>
</template>

<script>
import userService from '../../global/services/user'

export default {
  name: 'BindWechat',

  created() {
    const code = this.$route.query.code

    userService
      .bindWechat({ code })
      .then((res) => {
        this.$store.commit('updateUnionId', res)
        this.$message({
          message: '绑定成功',
          type: 'success',
        })
      })
      .catch((err) => {
        console.log('created -> err', err)
      })
      .finally(() => {
        this.$router.replace({ name: 'UserBind' })
      })
  },
}
</script>
