<template>
  <div class="page-main-container" v-loading="loading">
    <div class="page-main-content">
      <div class="question-section">
        <div class="question-header-container">
          <span class="question-header">{{ name }}</span>
          <span class="question-header-cover">
            <img :src="cover_url">
          </span>
        </div>
        <div class="question-container">
          <div class="question-count">第 {{ question }} 题 / 共 {{ total }} 题</div>
          <div class="question-item" v-for="(item,idx) in questions" :key="item.id" v-show="question === idx">
            <p class="question-item-title">{{ item.stem }}</p>
            <div class="question-answer-list">
              <div class="question-answer-item" v-for="(data, index) in item.option" :key="index"
                @click="chooseAnswer((index + 1), item.answer)">
                <p>{{ data }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="correct-count">
          <p>目前共答对 {{ correct }} 题</p>
        </div>
        <div class="test-again" v-if="question === total">
          <el-button type="primary" @click="testAgain">重新测试</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import questionServe from "../../global/services/question";

export default {
  name: "Question",

  data() {
    return {
      loading: true,
      name: "",
      cover_url: "",
      questions: [],
      total: null,
      question: 0,
      correct: 0
    };
  },

  created() {
    let id = this.$route.params.id;

    questionServe
      .getQuestions(id)
      .then(res => {
        res.questions.forEach(item => {
          item.option = JSON.parse(item.option);
        });

        this.name = res.ability.name;
        this.cover_url = res.ability.cover_url;
        this.questions = res.questions;
        this.total = res.total;
      })
      .finally(() => {
        this.loading = false;
      });
  },

  methods: {
    chooseAnswer(option, answer) {
      if (option === answer) {
        this.correct += 1;
      }

      this.question += 1;
    },

    testAgain() {
      window.location.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.question-section {
  width: 1080px;
  margin: 0 auto;

  .question-header-container {
    padding: 20px 0;

    .question-header {
      margin-right: 8px;
      line-height: 32px;
      vertical-align: top;
      font-size: 24px;
      color: #333;
    }

    .question-header-cover {
      line-height: 32px;
      vertical-align: top;
      border-radius: 50%;

      img {
        width: 32px;
        height: 32px;
      }
    }
  }

  .question-container {
    .question-count {
      text-align: right;
    }

    .question-item {
      .question-item-title {
        margin-top: 16px;
        color: #333;
        font-size: 16px;
        font-weight: 500;
      }

      .question-answer-list {
        margin-top: 20px;

        .question-answer-item {
          padding: 10px 20px;
          margin-top: 8px;
          border: 1px solid #e4e4e4;
          border-radius: 8px;
          line-height: 20px;
          font-size: 16px;
          color: #666;
          cursor: pointer;

          &:hover {
            transition: all 0.2s ease;
            background-color: #333;
            color: #fff;
          }
        }
      }
    }
  }

  .correct-count {
    margin-top: 30px;
    text-align: center;
    font-size: 18px;
    color: #333;
  }

  .test-again {
    text-align: center;
  }
}
</style>