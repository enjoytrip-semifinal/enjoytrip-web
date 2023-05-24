<template>
  <div>
    <Paginate
      :page-count="pageCount"
      :page-range="3"
      :margin-pages="2"
      :click-handler="changePage"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    />
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';
import { countBoard } from '../../utils/board';
export default {
  name: 'PageNation',
  components: { Paginate },
  props: [],
  data() {
    return {
      selectPage: 1,
      pageCount: 0,
    };
  },
  created() {
    countBoard(
      ({ data }) => {
        this.pageCount = data / 10;
      },
      () => {
        console.log('페이지 불러오기 실패');
      }
    );
    console.log(this.totalPageNum);
  },
  methods: {
    changePage: function (pageNum) {
      this.$emit('pageFromChild', pageNum)
      this.selectPage = pageNum;
      console.log(pageNum);
    },
  },
};
</script>

<style lang="css">
.pagination {
  margin: 24px;
  display: flex;
  gap: 4px;
}
.pagination li {
  display: flex;
  min-width: 32px;
  padding: 4px;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #eee;
  color: #666;
  align-items: center;
  justify-content: center;
}

.pagination li a {
  display: flex;
  height: inherit;
  width: inherit;
  align-items: center;
  justify-content: center;
}
.pagination li:hover {
  background: #e4dbd6;
}
.page-item a {
  color: #666;
  text-decoration: none;
}
.pagination li.active {
  background-color: #ff8080;
  color: #fff;
}
.pagination li.active a {
  color: #fff;
}
</style>
