<template>
  <div class="list-content">
    <div class="body-no">{{ article.noticeid }}</div>
    <div class="body-title" @click="onClickArticle">{{ article.title }}</div>
    <div class="body-writer">관리자</div>
    <div class="body-date">{{ elapsedTime(article.registerdate) }}</div>
    <div class="body-hit">{{ article.hit }}</div>
  </div>
</template>

<script>
import AWS from "aws-sdk";

export default {
  name: "TripNoticeListItem",
  components: {},
  props: ["article"],
  data() {
    return {
      message: "",
      fileList: [],
    };
  },
  created() {},
  methods: {
    onClickArticle() {
      this.$router.push(`/notice/list/${this.article.noticeid}`);
    },
    elapsedTime(date) {
      const start = new Date(date);
      const end = new Date(); // 현재 날짜

      const diff = (end - start) / 1000; // 경과 시간

      const times = [
        { name: "시간", milliSeconds: 60 * 60 },
        { name: "분", milliSeconds: 60 },
      ];

      // 년 단위부터 알맞는 단위 찾기
      for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime >= 24) {
          return date.split(" ")[0];
        }
        // 큰 단위는 0보다 작은 소수 단위 나옴
        if (betweenTime > 0) {
          return `${betweenTime}${value.name} 전`;
        }
      }
      // 모든 단위가 맞지 않을 시
      return "방금 전";
    },
    downloadFiles() {
      AWS.config.update({
        region: process.env.VUE_APP_BUCKET_REGION,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.VUE_APP_IDENTITY_POLL_ID,
        }),
      });

      const s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: {
          Bucket: process.env.VUE_APP_ALBUM_BUCKET_NAME,
          Key: this.fileList[0],
        },
      });

      s3.getObjects(s3.params, (err, data) => {
        if (err) {
          return;
        } else {
          this.fileList = data.Contents;
        }
      });
    },
    getFileName() {
      //api로 업로드 된 file name 가져와서 fileList에 같은 것을 추려냄
    },
  },
};
</script>

<style scoped lang="scss">
.list-content {
  display: flex;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid #8f8f8f;
  .body-no {
    flex: 1;
    text-align: center;
  }
  .body-title {
    flex: 5;
    text-align: center;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .body-writer {
    flex: 1;
    text-align: center;
  }
  .body-date {
    flex: 2;
    text-align: center;
  }
  .body-hit {
    flex: 1;
    text-align: center;
  }
}
</style>
