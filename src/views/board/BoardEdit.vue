<template>
  <div class="write-container">
    <div class="title">글쓰기</div>
    <form class="write-form">
      <div class="title-section">
        <label class="title-label" for="write-title">제목</label>
        <input
          v-model="board.title"
          id="write-title"
          class="title-input"
          type="text"
          ref="write-title"
          placeholder="제목을 입력해주세요."
        />
      </div>
      <div class="content-section">
        <label class="content-label" for="write-content">내용</label>
        <textarea
          v-model="board.content"
          id="write-content"
          class="content-input"
          ref="write-content"
          placeholder="내용을 입력해주세요. "
        />
      </div>
      <div class="file-section">
        <div class="file-top">
          <label class="file-label" for="write-file">파일 첨부</label>
          <div class="file-button-area">
            <button @click.prevent="">파일 업로드</button>
            <button @click.prevent="">전체 삭제</button>
          </div>
        </div>
        <input
          id="write-file"
          class="file-input"
          placeholder="첨부된 파일이 없습니다."
        />
      </div>
      <div class="button-section">
        <button class="upload-button" @click.prevent="onClickSubmitBtn">수정</button>
        <button class="cancel-button" @click.prevent="onClickCancelBtn">
          취소
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { modifyBoard, viewBoard } from '@/utils/board';

const userStore = 'userStore';

export default {
  name: 'TripBoardEdit',
  components: {},
  computed: {
    ...mapState(userStore, ['userInfo', 'isLogin']),
  },
  data() {
    return {
      board: {},
    };
  },
  created() {
    this.loadBoard();
  },
  methods: {
    onClickCancelBtn() {
      this.$router.push('/board/list');
    },

    onClickSubmitBtn() {
      let err = true;
      let msg = "";
      !this.board.title && ((msg = "제목을 입력해주세요"), (err = false), this.$refs['write-title'].focus());
      err && !this.board.content && ((msg = "내용을 입력해주세요"), (err = false), this.$refs['write-content'].focus());

      if (!err) {
        alert(msg);
        return;
      }
      modifyBoard(this.board,
      ({ status }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (status === 200) {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },

    moveList() {
      this.$router.push('/board/list');
    },

    loadBoard() {
      viewBoard(this.$route.fullPath.split('edit/')[1],
        ({ data }) => {
          this.board = data.board;
      },
      () => {
        alert('게시글 불러오기 실패');
        this.$router.go(-1);
      }
    )},
  },
};
</script>

<style scoped lang="scss">
.write-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-content: center;
  justify-content: center;
  .title {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-top: 42px;
    margin-bottom: 40px;
  }
  .write-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    input {
      border: 1px solid #bdbdbd;
      border-radius: 8px;
      height: 42px;
      font-size: 18px;
      font-weight: 700;
      padding: 0 20px;
      /* Change the color to your own background color */
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
      transition: background-color 5000s;
      -webkit-text-fill-color: #fff !important;
      }
    }
    label {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
      margin-left: 8px;
    }
    .title-section {
      display: flex;
      flex-direction: column;
    }
    .content-section {
      display: flex;
      flex-direction: column;
      .content-input {
        border-radius: 8px;
        height: 240px;
        font-size: 18px;
        font-weight: 700;
        padding: 20px;
        resize: none;
        border: 1px solid #bdbdbd;
      }
    }
    .file-section {
      display: flex;
      flex-direction: column;
      .file-top {
        display: flex;
        justify-content: space-between;
        .file-button-area {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          button {
            color: white;
            background-color: #8f8f8f;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            padding: 4px 16px;
            cursor: pointer;
          }
        }
      }
    }
    .button-section {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 16px;
      gap: 16px;
      button {
        width: 100px;
        height: 44px;
        text-align: center;
        border-radius: 8px;
        cursor: pointer;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 32px;
      }
      .upload-button {
        background-color: #ff8080;
        color: white;
      }

      .cancel-button {
        background-color: #707070;
        color: white;
      }
    }
  }
}
</style>
