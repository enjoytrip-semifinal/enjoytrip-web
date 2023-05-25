<template>
  <div class="view-container">
    <div class="title">{{ notice.title }}</div>
    <div class="title-data-section">
      <div>관리자 | {{ notice.register_date }}</div>
      <div class="hit-area">
        <img src="@/assets/images/eyes.png" alt="" />
        <div>{{ notice.hit }}</div>
      </div>
    </div>
    <div class="content">
      <div class="img-content">
        <img :src="url" alt="" />
      </div>
      <div class="article-content">
        {{ notice.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "../../utils/notice";

export default {
  name: "TripNoticeListView",
  components: {},
  data() {
    return {
      notice: {},
      files: [],
      url: "",
    };
  },
  created() {
    this.loadView();
  },
  methods: {
    loadView() {
      getArticle(
        this.$route.fullPath.split("list/")[1],
        ({ data }) => {
          this.notice = data.notice;
          this.files = data.files;
          console.log(this.notice);
          this.getFileUrl();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getFileUrl() {
      console.log(this.files[0]);
      this.url = process.env.VUE_APP_S3_BASE_URL + encodeURI(this.files[0]);
      console.log(this.url);
    },
  },
};
</script>

<style scoped lang="scss">
.view-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-content: center;
  .title {
    font-size: 32px;
    font-weight: 700;
    margin-top: 60px;
  }
  .title-data-section {
    display: flex;
    font-size: 14px;
    color: #707070;
    font-weight: 500;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    .hit-area {
      display: flex;
      gap: 4px;
      align-items: center;
      .list-button {
        padding: 8px 16px;
        background-color: #ff8080;
        color: white;
        font-size: 16px;
        font-weight: 600;
        border-radius: 4px;
        margin-left: 12px;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 500;
    border-top: 1px solid rgb(181, 181, 181);
    padding-top: 60px;
    padding-bottom: 60px;
  }

  .img-content {
    display: flex;
    justify-content: center;
    margin-bottom: 10%;

    img {
      max-width: 600px;
      max-height: 600px;
    }
  }

  .article-content {
    display: flex;
  }
}
</style>
