<template>
  <div class="user-bind-container">
    <div class="user-bind-content">
      <UserAside :defaultActive="defaultActive"></UserAside>
      <div class="content-main-container">
        <div class="content-main-content">
          <div class="content-header">
            <p class="content-header-title">账号安全</p>
          </div>
          <div class="content-body" v-loading="loading">
            <div class="bind-list">
              <div class="bind-item">
                <div class="item-status">
                  <div class="item">手机号</div>
                  <div class="status">
                    <div class="status-item" v-if="this.user.phone">已绑定</div>
                    <div class="status-item" v-if="!this.user.phone">未绑定</div>
                  </div>
                </div>
                <div class="operation">
                  <el-button type="text" class="operation-item" v-if="!this.user.phone" @click="showBindPhone = true">
                    绑定手机</el-button>
                  <el-button type="text" class="operation-item" v-if="this.user.phone" @click="showBindPhone = true">
                    更换手机</el-button>
                </div>
              </div>
              <div class="bind-item">
                <div class="item-status">
                  <div class="item">微信</div>
                  <div class="status">
                    <div class="status-item" v-if="this.user.union_id">已绑定</div>
                    <div class="status-item" v-if="!this.user.union_id">未绑定</div>
                  </div>
                </div>
                <div class="operation">
                  <el-button type="text" class="operation-item" v-if="!this.user.union_id" @click="handleBindWechat">绑定
                  </el-button>
                  <el-button type="text" class="operation-item" v-if="this.user.union_id" @click="handleUnbindWechat">解绑
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="绑定手机" :visible.sync="showBindPhone" width="20%" center :before-close="beforeClose">
      <el-form :model="bindForm" :rules="rules" ref="bindForm">
        <el-form-item prop="phone">
          <el-input v-model="bindForm.phone" autocomplete="off" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="bindForm.code" placeholder="请输入验证码">
            <el-button slot="suffix" type="text" @click="handleGetCode" :disabled="isCountingDown || phoneError">{{
              getCodeText
            }}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleBindPhone" :disabled="disableSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserAside from "../../components/Layout/UserAside";
import { mapState } from "vuex";
import authService from "../../global/services/auth";
import userService from "../../global/services/user";

export default {
  name: "UserBind",

  data() {
    return {
      loading: false,
      defaultActive: "/user-bind",
      showBindPhone: false,
      bindForm: {
        phone: "",
        code: ""
      },
      isCountingDown: false,
      getCodeText: "获取验证码",
      rules: {
        phone: [
          {
            required: true,
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            len: 6,
            message: "请输入正确的验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    handleGetCode() {
      this.isCountingDown = true;

      let phone = this.bindForm.phone;

      authService.getSmsCode({ phone }).then(res => {
        this.$message.success({
          message: "验证码：" + res,
          duration: 9000
        });

        this._countDown();
      });
    },

    handleBindPhone() {
      let { phone, code } = this.bindForm;

      userService.bindPhone({ phone, code }).then(() => {
        let user = this.user;

        this.$message.success("绑定成功");
        this.showBindPhone = false;
        this.bindForm = { phone: "", code: "" };
        user.phone = phone;
        this.$store.commit("updateUserInfo", user);
      });
    },

    handleBindWechat() {
      authService
        .getWechatSocialUrl({
          redirect_url: "http://edu-www.aitschool.com/social/bind-wechat"
        })
        .then(res => {
          window.location.href = res.redirect;
        });
    },

    handleUnbindWechat() {
      this.$confirm(
        "解绑后你将无法使用微信登录此账号，您确定要解绑吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        userService.unbindWechat().then(() => {
          let user = this.user;

          user.union_id = "";
          this.$store.commit("updateUserInfo", user);
        });
      });
    },

    _countDown() {
      let time = 60;

      this.getCodeText = `${time} 秒`;

      let countDown = window.setInterval(() => {
        time -= 1;
        this.getCodeText = `${time} 秒`;

        if (time <= 0) {
          this.getCodeText = "重新获取";
          this.isCountingDown = false;
          window.clearInterval(countDown);
        }
      }, 1000);
    },

    beforeClose(done) {
      this.$confirm("是否取消此次绑定操作？", "取消绑定", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        done();
      });
    }
  },

  computed: {
    ...mapState(["user"]),

    phoneError() {
      let phone = this.bindForm.phone;
      return Boolean(!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(phone));
    },

    disableSubmit() {
      let { phone, code } = this.bindForm;
      return Boolean(
        !/^[1][3,4,5,7,8,9][0-9]{9}$/.test(phone) || !/^\d{6}$/.test(code)
      );
    }
  },

  components: {
    UserAside
  }
};
</script>

<style lang="less" scoped>
.user-bind-container {
  height: 100%;
  padding: 30px 0;
  background-color: #f8fafc;

  .user-bind-content {
    display: flex;
    justify-content: space-between;
    width: 1080px;
    height: 100%;
    margin: 0 auto;

    .content-main-container {
      width: 700px;
      height: 100%;
      padding: 30px 40px;
      background-color: #fff;
      box-shadow: 0 2px 20px 0 rgba(56, 35, 219, 0.09);

      .content-main-content {
        height: 100%;

        .content-header {
          line-height: 24px;
          font-size: 20px;
          color: #666;
          font-weight: 600;
        }

        .content-body {
          margin-top: 40px;
          border-top: 1px solid #666;

          .bind-list {
            padding: 40px;

            .bind-item {
              display: flex;
              margin-top: 60px;

              .item-status {
                display: flex;
                flex: 1;
                line-height: 20px;
                font-size: 16px;
                color: #666;
                font-weight: 500;

                .item {
                  width: 80px;
                }

                .status {
                  color: #999;
                }
              }

              .operation {
                margin-right: 100px;

                .operation-item {
                  width: 80px;
                  padding: 0;
                  line-height: 20px;
                  text-align: left;
                  font-size: 16px;
                  font-weight: 500;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
