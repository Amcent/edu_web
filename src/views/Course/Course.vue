<template>
  <div class="page-main-container" v-loading="loading">
    <div class="page-main-content">
      <div class="content-header-container">
        <div class="head-breadcrumb-container">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/career' }">职业课</el-breadcrumb-item>
            <el-breadcrumb-item>{{ course.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="course-section">
        <div class="course-section-content">
          <div class="course-item-card">
            <div class="item-card-cover">
              <img :src="course.cover_url">
            </div>
            <div class="item-card-content">
              <div class="item-card-name">{{ course.name }}</div>
              <div class="item-card-title">{{ course.title }}</div>
              <div class="item-card-desc">{{ course.description }}</div>
            </div>
          </div>
          <div class="chapter-list">
            <div class="chapter-item" v-for="item in chapters" :key="item.id">
              <div class="chapter-name">{{ item.name }}</div>
              <div class="section-list">
                <div class="section-item" v-for="data in item.children" :key="data.id" @click="viewSection(data.id)">
                  <div class="section-name">{{ data.name }}</div>
                  <div class="section-start">开始学习</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import courseService from "@/global/services/course.js";

export default {
  name: "Course",

  data() {
    return {
      loading: true,
      course: {},
      chapters: [],
      sections: []
    };
  },

  created() {
    this.handleGetCourse();
  },

  methods: {
    handleGetCourse() {
      let id = this.$route.params.id;

      courseService
        .getCourse(id)
        .then(res => {
          this.course = res;
          this.chapters = res.children;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    viewSection(id) {
      let courseId = this.$route.params.id;
      this.$router.push({
        name: "Section",
        params: { courseId, sectionId: id }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page-main-content {
  width: 1080px;
  margin: 0 auto;

  .content-header-container {
    padding: 20px 0;
  }

  .course-section {
    .course-item-card {
      display: flex;
      min-height: 240px;
      padding: 20px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.04);

      .item-card-cover {
        width: 300px;
        height: 200px;

        img {
          width: 300px;
          height: 200px;
        }
      }

      .item-card-content {
        flex: 1;
        margin-left: 20px;

        .item-card-name {
          line-height: 20px;
          font-size: 20px;
          color: #333;
        }

        .item-card-title {
          margin-top: 18px;
          line-height: 24px;
          font-size: 14px;
          color: #666;
        }

        .item-card-desc {
          margin-top: 12px;
          font-size: 12px;
          color: #999;
        }
      }
    }

    .chapter-list {
      margin-top: 20px;

      .chapter-item {
        margin-top: 16px;
        background: #fff;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.04);
        border-radius: 5px;

        .chapter-name {
          padding: 20px;
          line-height: 16px;
          font-size: 16px;
          color: #666;
        }

        .section-list {
          display: flex;
          flex-direction: column;

          .section-item {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 48px;
            padding: 17px 20px 17px 44px;
            line-height: 14px;
            font-size: 14px;
            color: #333;
            overflow: hidden;
            cursor: pointer;

            &:hover {
              background: #f7f7f7;
            }
          }
        }
      }
    }
  }
}
</style>