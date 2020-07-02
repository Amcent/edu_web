<template>
  <div class="page-main-container" v-loading="loading">
    <div class="page-main-content">
      <div class="ability-section">
        <div class="ability-list">
          <a class="ability-item" v-for="item in abilites" :key="item.id" :href="'/question/' + item.id">
            <div class="ability-item-container">
              <div class="ability-item-cover">
                <img :src="item.cover_url">
              </div>
              <div class="ability-item-name">{{ item.name }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import evaluationServe from "../../global/services/evaluation";

export default {
  name: "Evaluation",

  data() {
    return {
      loading: true,
      abilites: []
    };
  },

  created() {
    evaluationServe
      .getAbilities()
      .then(res => {
        this.abilites = res.abilities;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style lang="less" scoped>
.ability-section {
  width: 1080px;
  margin: 0 auto;
  padding: 50px 80px;

  .ability-list {
    .ability-item {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      margin-right: 8px;
      cursor: pointer;

      &:nth-child(8n) {
        margin-right: 0;
      }

      .ability-item-container {
        width: 128px;
        height: 128px;
        padding-top: 18px;
        background: #fff;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: all 0.2s ease;
        border: 1px solid #fff;
        border-radius: 4px;

        &:hover {
          border-color: #4193d7;
        }

        .ability-item-cover {
          width: 40px;
          height: 40px;
          margin: 20px auto 0;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .ability-item-name {
          line-height: 30px;
          font-size: 12px;
          color: #555;
          font-weight: 400;
        }
      }
    }
  }
}
</style>