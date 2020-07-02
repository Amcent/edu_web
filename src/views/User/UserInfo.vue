<template>
  <div class="user-page-container">
    <div class="user-page-content">
      <UserAside :defaultActive="defaultActive"></UserAside>
      <div class="content-main-container">
        <div class="content-main-content">
          <div class="content-header">
            <p class="content-header-title">个人资料</p>
          </div>
          <div class="content-body" v-loading="loading">
            <el-form :model="user" :rules="rules" ref="userForm" label-width="100px" class="user-form">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-form-item class="user-form-item" label="头像" prop="avatar_url">
                    <div class="avatar-uploader">
                      <img v-if="user.avatar_url" :src="user.avatar_url" class="user-avatar" />
                      <i v-else class="el-icon-plus uploader-icon"></i>
                      <input type="file" class="user-avatar-file" @change="uploadAvatar">
                      <div v-show="uploading" class="loading-mask">
                        <div class="loading-spinner">
                          <svg viewBox="25 25 50 50" class="circular">
                            <circle cx="50" cy="50" r="20" fill="none" class="loading-dash" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item class="user-form-item" label="昵称" prop="name" required>
                    <el-input v-model="user.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item class="user-form-item" label="性别" prop="sex" required>
                    <el-select v-model.number="user.sex" placeholder="请选择">
                      <el-option label="男" :value="1"></el-option>
                      <el-option label="女" :value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="15">
                  <el-form-item class="user-form-item" label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="user.birthday" style="width: 100%;">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item class="user-form-item" label="个人简介" prop="desc">
                    <el-input type="textarea" v-model="user.desc" :rows="5" placeholder="介绍一下自己，让别人更了解你"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item class="user-form-item">
                <el-button type="primary" @click="handleSubmitForm">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAside from "../../components/Layout/UserAside";
import userService from "@/global/services/user.js";
import qiniuService from "@/global/services/qiniu.js";

export default {
  name: "UserInfo",

  data() {
    return {
      loading: false,
      uploading: false,
      defaultActive: "/user-info",
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birthdary: [{ type: "date", message: "请选择日期", trigger: "change" }],
        desc: [{ message: "请填写个人简介", trigger: "blur" }]
      }
    };
  },

  created() {
    this.user = { ...this.$store.state.user };
  },

  methods: {
    handleSubmitForm() {
      this.loading = true;

      userService
        .update(this.user)
        .then(() => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        })
        .finally(() => {
          this.loading = false;
          window.location.reload();
        });
    },

    uploadAvatar(evt) {
      this.uploading = true;

      let ele = evt.target;
      let file = ele.files[0];

      if (!file) {
        ele.srcElement.value = "";
        return;
      }

      qiniuService
        .start(file)
        .then(res => {
          this.user.avatar_url = res;
        })
        .finally(() => {
          this.loading = false;
          this.uploading = false;
        });
    }
  },

  components: {
    UserAside
  }
};
</script>

<style lang="less" scoped>
.user-page-container {
  height: 100%;
  padding: 30px 0;
  background-color: #f8fafc;

  .user-page-content {
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

          .user-form {
            margin-top: 30px;

            .user-form-item {
              margin-top: 20px;

              .avatar-uploader {
                position: relative;
                width: 50px;
                height: 50px;
                border: 1px dashed #d9d9d9;
                border-radius: 50%;
                cursor: pointer;
                overflow: hidden;

                &::before {
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  width: 100%;
                  height: 100%;
                  content: "编辑";
                  line-height: 50px;
                  text-align: center;
                  font-size: 15px;
                  background-color: rgba(0, 0, 0, 0.4);
                  color: #fff;
                  z-index: 1;
                  opacity: 0;
                  transition: opacity 0.2s;
                }

                &:hover {
                  border-color: #409eff;

                  &::before {
                    opacity: 1;
                  }
                }

                .uploader-icon {
                  font-size: 28px;
                  color: #8c939d;
                  width: 48px;
                  height: 48px;
                  line-height: 48px;
                  text-align: center;
                  cursor: pointer;
                }

                .user-avatar {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
                  cursor: pointer;
                }

                .user-avatar-file {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
                  opacity: 0;
                  cursor: pointer;
                  z-index: 2;
                }

                .loading-mask {
                  position: absolute;
                  margin: 0;
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: 0;
                  background-color: hsla(0, 0%, 100%, 0.9);
                  transition: opacity 0.3s;
                  z-index: 9;

                  .loading-spinner {
                    top: 50%;
                    margin-top: -21px;
                    width: 100%;
                    text-align: center;
                    position: absolute;

                    .circular {
                      width: 42px;
                      height: 42px;

                      .loading-dash {
                        animation: loading-dash 1.5s ease-in-out infinite;
                        stroke-dasharray: 90, 150;
                        stroke-dashoffset: 0;
                        stroke-width: 2;
                        stroke: #409eff;
                        stroke-linecap: round;
                      }
                    }
                  }
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
