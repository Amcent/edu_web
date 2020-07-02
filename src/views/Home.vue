<template>
  <div class="page-main-container">
    <div class="page-main-content" v-loading="loading">
      <div class="banner-section">
        <div class="page-banner"></div>
      </div>
      <div class="course-section">
        <div class="course-section-container">

          <div class="course-recommand">
            <p class="course-recommand-title">最新课程</p>
            <p class="course-recommand-sub_title">为您推荐：</p>
            <div class="course-recommand-list">
              <a class="course-recommand-item" v-for="item in recommandCourses" :key="item.id"
                :href="'/course/' + item.id">
                <div class="course-recommand-item-container">
                  <div class="course-item-image">
                    <img class="img" :src="item.cover_url">
                  </div>
                  <div class="course-item-info">
                    <div class="course-item-name">{{ item.name }}</div>
                    <div class="course-item-title">{{ item.title }}</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import courseService from "@/global/services/course";

export default {
  name: "Home",

  created() {
    courseService.getRecommandCourse().then(res => {
      this.recommandCourses = res;
      this.loading = false;
    });
  },

  data() {
    return {
      loading: true,
      recommandCourses: []
    };
  }
};
</script>

<style lang="less" scoped>
.banner-section {
  margin-top: 20px;

  .page-banner {
    width: 1080px;
    height: 320px;
    margin: 0 auto;
    background: #999;
  }
}

.course-section {
  margin-top: 40px;

  .course-section-container {
    width: 1080px;
    margin: 0 auto;

    .course-recommand {
      .course-recommand-title {
        line-height: 20px;
        font-size: 20px;
        color: #333;
      }

      .course-recommand-sub_title {
        margin-top: 10px;
        line-height: 14px;
        font-size: 14px;
        color: #666;
      }

      .course-recommand-list {
        display: flex;
        flex-wrap: wrap;

        .course-recommand-item {
          margin-right: 16px;

          &:nth-child(4n) {
            margin-right: 0;
          }

          .course-recommand-item-container {
            width: 258px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.04);

            &:hover {
              box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.3);
            }

            .course-item-image {
              width: 258px;
              height: 140px;

              .img {
                width: 100%;
                height: 100%;
              }
            }

            .course-item-info {
              padding: 10px 12px 18px;
              background-color: #fff;

              .course-item-name {
                height: 40px;
                line-height: 20px;
                text-align: left;
                font-size: 15px;
                color: #333;
                letter-spacing: 1px;
                overflow: hidden;
              }

              .course-item-title {
                margin-top: 10px;
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
