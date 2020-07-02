<template>
  <div class="video-section">
    <div class="video-section-container">
      <video-player class="video-player-box vjs-custom-skin" ref="videoPlayer" :options="playerOptions"
        :playsinline="true">
      </video-player>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";

export default {
  name: "VideoPlayer",

  props: {
    url: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      playerOptions: {
        height: "422",
        width: "750",
        autoplay: false,
        muted: false,
        loop: false,
        fluid: true,
        aspectRatio: "16:9",
        language: "zh-CN",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: false
        }
      }
    };
  },

  mounted() {
    this.setUrl();
  },

  updated() {
    this.setUrl();
  },

  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },

    videoUrl() {
      return this.url;
    }
  },

  methods: {
    setUrl() {
      let url = this.url + "?timestamp=" + Date.now();
      this.player.src(url);
    }
  },

  components: {
    videoPlayer
  }
};
</script>

<style lang="less">
.video-section {
  .video-section-container {
    transition: all 0.2s ease;
    box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
    overflow: hidden;

    .vjs-big-play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>