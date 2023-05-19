<template>
  <div class="list-content">
    <div class="body-no">{{ article.board_id }}</div>
    <div class="body-title" @click="onClickArticle">{{ article.title }}</div>
    <div class="body-writer">{{ article.nickname }}</div>
    <div class="body-date">{{ article.register_time }}</div>
    <div class="body-hit">{{ article.hit }}</div>
  </div>
</template>

<script>
export default {
  name: 'TripBoardListItem',
  components: {},
  props: ['article'],
  data() {
    return {
      message: '',
    };
  },
  created() {},
  methods: {
    onClickArticle() {
      this.$router.push(`/board/list/${this.article['board_id']}`);
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
