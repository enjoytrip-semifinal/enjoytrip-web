<template>
  <div class="board-container">
    <div class="title">게시판</div>
    <div class="top-line">
      <div class="search-line">
        <div class="selectBox">
          <select name="search" class="select" :value="selected" @change="setSelect($event)">
            <option v-for="(item) in selectList" :key="item.value">{{ item.name }}</option>
          </select>
          <span class="icoArrow"
            ><img src="@/assets/images/arrow-down.png" alt=""
          /></span>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="검색어를 입력해주세요." v-model="searchInput"/>
          <span class="icoSearch" @click="onClickSearch"
            ><img src="@/assets/images/search.png" alt=""
          /></span>
        </div>
      </div>
      <button class="write-button" @click="onClickWriteBtn">글쓰기</button>
    </div>
    <div class="list-container">
      <div class="list-header">
        <div class="header-no">번호</div>
        <div class="header-title">제목</div>
        <div class="header-writer">작성자</div>
        <div class="header-date">작성일</div>
        <div class="header-hit">조회수</div>
      </div>
      <div class="list-body" v-for="article in articles" :key="article['board_id']">
        <BoardListItem :article="article"/>
      </div>
      <div class="board-pagination">
        <PageNation @pageFromChild="pageChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import BoardListItem from './BoardListItem.vue';
import PageNation from '@/components/common/PageNation.vue';
import { listBoard } from '../../utils/board';
export default {
  name: 'TripBoardList',
  components: {
    BoardListItem,
    PageNation,
  },
  data() {
    return {
      selectList: [
        { name: "전체검색", value: "all" },
        { name: "제목", value: "title" },
        { name: "글쓴이", value: "writer" },
        { name: "내용", value: "content" },
      ],
      selected: "전체검색",
      articles: [],
      searchInput: '',
      param: {
        pgno: 1,
        key: '',
        word: '',
      }
    };
  },
  created() {
    this.loadBoard();
  },
  methods: {
    loadBoard() {
      listBoard(
      this.param,
      ({ data }) => {
        console.log('[data]', data.boardList);
        this.articles = data.boardList;
      },
      (error) => {
        console.log(error);
      }
    )
    },
    onClickWriteBtn() {
      this.$router.push('/board/write');
    },
    pageChange(pgno) {
      this.param.pgno = pgno;
      this.loadBoard();
    },
    setSelect(event) {
      // 변경 적용
      this.selected = event.target.value;
      console.log(this.selected);
    },
    onClickSearch() {
      if (this.selected === '전체검색') {
        this.param.word = this.searchInput;
        this.param.key = '';
        console.log(this.param.key);
        this.loadBoard();
        return;
      }
      if (this.selected === '제목') {
        console.log(this.selected);
        this.param.word = this.searchInput;
        this.param.key = 'title';
        this.loadBoard();
        return;
      }
      if (this.selected === '글쓴이') {
        console.log(this.selected);
        this.param.word = this.searchInput;
        this.param.key = 'userId'
        this.loadBoard();
        return;
      }
      if (this.selected === '내용') {
        console.log(this.selected);
        this.param.word = this.searchInput;
        this.param.key = 'content'
        this.loadBoard();
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* inputBox 스타일링 초기화 */
/* IE */
select::-ms-expand {
  display: none;
}
.select {
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  .title {
    font-size: 32px;
    font-weight: 700;
    width: 120px;
    text-align: center;
    border-bottom: 3px solid #ff8080;
    margin-top: 42px;
  }
}
.top-line {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 60px;
  margin-bottom: 24px;
  .search-line {
    display: flex;
    width: 580px;
    min-width: 320px;

    .selectBox {
      position: relative;
      width: 138px;
      height: 40px;
      border-radius: 4px;
      background-color: #ededed;
      margin-right: 24px;
      .select {
        width: inherit;
        height: inherit;
        background: transparent;
        border: 0 none;
        outline: 0 none;
        padding: 0 5px;
        position: relative;
        z-index: 3; // select가 위로 올라와야 함
        padding-left: 16px;
        color: #8f8f8f;
        font-weight: 700;

        option {
          background: lightcoral;
          color: #fff;
          padding: 3px 0;
          font-size: 16px;
        }
      }
      .icoArrow {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        width: 35px;
        height: inherit;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 12px;
          height: 10px;
          transition: 0.3s;
        }
      }

      &:focus + .icoArrow img {
        transform: rotate(180deg);
      }
    }

    .search-bar {
      position: relative;
      display: flex;
      flex: 1;
      height: 40px;

      input {
        flex: 1;
        height: inherit;
        border: none;
        background-color: #ededed;
        border-radius: 4px;
        padding-left: 12px;
        font-weight: 700;
        font-size: 16px;
      }
      .icoSearch {
        display: flex;
        position: absolute;
        right: 0;
        top: 0;
        justify-content: center;
        align-items: center;
        height: inherit;
        width: 35px;
        cursor: pointer;
        img {
          height: 20px;
          width: 20px;
        }
      }
    }
  }

  .write-button {
    width: 100px;
    height: 40px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    background-color: #ff8080;
    border-radius: 4px;
    cursor: pointer;
  }
}
.list-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  .list-header {
    display: flex;
    text-align: center;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    font-size: 18px;
    font-weight: 500;
    padding: 8px 0;
    .header-no {
      flex: 1;
      text-align: center;
    }
    .header-title {
      flex: 5;
      text-align: center;
    }
    .header-writer {
      flex: 1;
      text-align: center;
    }
    .header-date {
      flex: 2;
      text-align: center;
    }
    .header-hit {
      flex: 1;
      text-align: center;
    }
  }

  .list-body {
    display: flex;
    flex-direction: column;
  }

  .board-pagination {
    display: flex;
    margin-bottom: 16px;
    margin-top: 32px;
    align-items: center;
    justify-content: center;
  }
}
</style>
