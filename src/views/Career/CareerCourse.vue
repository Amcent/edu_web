<template>
  <div class="page-main-container" v-loading="loading">
    <div class="page-main-content">
      <div class="banner-section">
        <div class="banner-title">{{ career.name }}</div>
        <div class="banner-desc">{{ career.description }}</div>
      </div>
      <div class="course-section">
        <div class="course-section-content">
          <div class="career-paths-container">
            <div class="career-paths-content">
              <div class="career-paths-title">学习路线</div>
              <div class="course-list">
                <div class="course-item-container" v-for="item in courses" :key="item.id">
                  <a class="course-item" :href="'/course/' + item.course_id">
                    <div class="course-cover">
                      <img :src="item.cover_url">
                    </div>
                    <div class="course-item-content">
                      <div class="course-name">{{ item.name }}</div>
                      <div class="course-desc">{{ item.description }}</div>
                    </div>
                  </a>
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
import careerService from "@/global/services/career.js";

export default {
  name: "CareerCourse",

  data() {
    return {
      loading: true,
      career: {},
      courses: []
    };
  },

  created() {
    this.handleGetCareer();
  },

  methods: {
    handleGetCareer() {
      let id = this.$route.params.id;

      careerService
        .getTheCareer(id)
        .then(res => {
          console.log("handleGetCareer -> res", res);
          this.career = res;
          this.courses = res.children[0].children;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.banner-section {
  height: 280px;
  background: url("../../assets/CareerCourseBanner.jpg") no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .banner-title {
    height: 40px;
    line-height: 40px;
    font-size: 60px;
    font-weight: 500;
    color: #fff;
  }

  .banner-desc {
    width: 818px;
    margin-top: 40px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
}

.course-section {
  width: 1080px;
  margin: 0 auto;

  .course-section-content {
    display: flex;
    padding: 20px 0;

    .career-paths-content {
      flex: 1;
      margin-right: 20px;
      padding: 40px 20px 100px 20px;
      background: #fff;
      border-radius: 8px;

      .career-paths-title {
        position: relative;
        padding-left: 15px;
        font-size: 18px;
        font-weight: 500;
        color: #333;

        &:after {
          position: absolute;
          top: 4px;
          left: 0;
          width: 3px;
          height: 18px;
          background: #000;
          content: "";
        }
      }

      .course-list {
        margin-top: 20px;

        .course-item-container {
          display: inline-block;
          vertical-align: top;

          margin-right: 12px;
          margin-top: 12px;

          .course-item {
            display: block;
            width: 258px;
            height: 292px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.04);
            overflow: hidden;

            .course-cover {
              width: 258px;
              height: 140px;
              overflow: hidden;

              img {
                width: 258px;
                height: 140px;
              }
            }

            .course-item-content {
              padding: 12px 16px 18px;
              background: #fff;

              .course-name {
                height: 40px;
                line-height: 20px;
                text-align: left;
                font-size: 15px;
                letter-spacing: 1px;
                color: #333;
                overflow: hidden;
              }

              .course-desc {
                margin-top: 18px;
                font-size: 12px;
                color: #666;
              }
            }
          }
        }
      }
    }
  }
}
</style>