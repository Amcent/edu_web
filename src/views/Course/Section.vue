<template>
  <div class="page-container" v-loading="loading">
    <div class="page-content">
      <div class="page-aside">
        <div class="aside-container">
          <div class="aside-header-container">
            <div class="aside-header-title">{{ course.name }}</div>
          </div>
          <el-menu class="el-menu-vertical-demo" :collapse="asideFold" background-color="#545c64" text-color="#fff"
            active-text-color="#ffd04b" :router="true">
            <el-submenu v-for="item in chapters" :key="item.id" :index="'chapter' + item.id">
              <template slot="title">
                <span slot="title">{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="data in item.children" :key="data.id" :index="'section' + data.id">
                  {{ data.name }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <div class="page-main-container">
        <div class="page-main-header">
          <div class="main-header-hd">
            <div class="main-header-fold">
              <i class="el-icon-s-fold aside-fold-btn" v-show="!asideFold"></i>
              <i class="el-icon-s-unfold aside-fold-btn" v-show="asideFold"></i>
            </div>
            <div class="main-header-back">
              <el-button type="text" class="header-back-btn" @click="goBack">《 返回</el-button>
            </div>
          </div>
          <div class="main-header-bd">
            <span class="header-title">{{ section.name }}</span>
          </div>
        </div>
        <div class="page-main-content">
          <div class="main-content-container">
            <ViedeoPlayer v-if="section.video_url" :url="section.video_url"></ViedeoPlayer>
            <div id="editor" class="mavon-editor-container">
              <mavon-editor :toolbarsFlag="false" :editable="false" defaultOpen="preview" :boxShadow="false"
                :subfield="false" v-model="section.content">
              </mavon-editor>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViedeoPlayer from "@/components/VideoPlayer.vue";
var mavonEditor = require("mavon-editor");
import "mavon-editor/dist/css/index.css";
import courseService from "@/global/services/course";
import sectionService from "@/global/services/section";

export default {
  name: "Section",

  data() {
    return {
      loading: true,
      asideFold: false,
      course: {},
      chapterId: null,
      chapters: [],
      sectionId: null,
      section: {}
    };
  },

  created() {
    this.handleGetCourse();
    this.handleGetSection();
  },

  watch: {
    $route() {
      this.chapterId = Number(this.$route.params.chapterId);
      this.sectionId = Number(this.$route.params.sectionId);
      this.handleGetSection();
    }
  },

  methods: {
    handleGetCourse() {
      let id = this.$route.params.courseId;

      courseService
        .getCourse(id)
        .then(res => {
          this.chapters = res.children;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleGetSection() {
      let id = this.$route.params.sectionId;

      sectionService
        .getSection(id)
        .then(res => {
          this.section = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    goBack() {
      let id = this.$route.params.courseId;

      this.$router.push({ name: "Course", params: { id } });
    }
  },

  components: {
    ViedeoPlayer,
    "mavon-editor": mavonEditor.mavonEditor
  }
};
</script>

<style lang="less" scoped>
.page-container {
  height: 100%;

  .page-content {
    display: flex;
    height: 100%;

    .page-aside {
      width: 246px;
      background-color: rgb(84, 92, 100);

      .aside-container {
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .aside-header-container {
          position: relative;
          flex: none;
          z-index: 1;

          .aside-header-title {
            height: 60px;
            padding: 20px 0;
            box-shadow: 0 2px 6px 0 rgba(21, 21, 21, 0.45);
            line-height: 20px;
            font-size: 14px;
            color: #fff;
            text-indent: 16px;
            z-index: 2;
          }
        }
      }
    }

    .page-main-container {
      display: flex;
      flex-direction: column;
      flex: 1;

      .page-main-header {
        position: relative;
        display: flex;
        height: 60px;
        padding: 0 60px;
        background-color: rgb(84, 92, 100);
        line-height: 60px;
        font-size: 16px;
        font-weight: 400;
        color: #fff;

        .main-header-hd {
          .main-header-fold {
            position: absolute;
            left: 16px;
            font-size: 22px;
            cursor: pointer;
          }

          .main-header-back {
            .header-back-btn {
              font-size: 16px;
              color: #fff;
            }
          }
        }

        .main-header-bd {
          width: 100%;
          text-align: center;
        }
      }

      .page-main-content {
        position: relative;
        flex: 1;
        overflow-y: auto;

        .main-content-container {
          max-width: 846px;
          height: 100%;
          padding: 60px 48px;
          margin: 0 auto;
          min-height: 500px;

          .mavon-editor-container {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>