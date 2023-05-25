<template>
  <div class="view-container">
    <div class="title">{{ board.title }}</div>
    <div class="title-data-section">
      <div>{{ `${board.nickname} | ${board.register_date}` }}</div>
      <div class="hit-area">
        <img src="@/assets/images/eyes.png" alt="" />
        <div>{{ board.hit }}</div>
        <button class="list-button" @click="onClickListButton">목록</button>
      </div>
    </div>
    <div class="content">
      <div class="img-content">
        <img :src="url" alt="" />
      </div>
      <div class="article-content">
        {{ board.content }}
      </div>
    </div>
    <div class="comment">
      <p>댓글</p>
      <div class="controll-button-area" v-if="isControll">
        <button class="edit" @click="onClickEditBtn">수정</button>
        <button class="delete" @click="onClickDeleteBtn">삭제</button>
      </div>
    </div>
    <div class="comment-num">총 2개</div>
    <div v-if="!isInput" class="comment-input-area" @click="onClickComment">
      <img src="@/assets/images/comment.png" alt="" />
      <img src="@/assets/images/camera.png" alt="" />
      <div>로그인하고 댓글 달기</div>
    </div>
    <div v-if="isInput" class="comment-input-area-active">
      <textarea
        class="input-textarea"
        v-if="isInput"
        placeholder="댓글을 입력하세요."
        v-model="comment.content"
      />
      <div class="comment-bottom">
        <div class="button-mode-area">
          <img src="@/assets/images/comment.png" alt="" />
          <img src="@/assets/images/camera.png" alt="" />
        </div>
        <div class="button-submit-area">
          <a @click="onClickCommentCalcel" class="cancel-button">취소</a>
          <a @click="onClickCommentRegister">등록</a>
        </div>
      </div>
    </div>
    <div class="comment-content-area">
      <div
        class="commnet-content"
        v-for="(comment, index) in comments"
        :key="comment.board_reply_id"
      >
        <div class="comment-header">
          <div class="comment-title-area">
            <div class="name">{{ comment.user_id }}</div>
            <div class="comment-time">{{ comment.register_date }}</div>
          </div>
          <div
            class="comment-controller-area"
            v-if="comment.board_reply_id != targetComment.board_reply_id || !editMode"
          >
            <button @click="onClickCommentEditBtn(comment)">
              <span class="material-symbols-outlined"> edit </span>
            </button>
            <button @click="onClickCommentDeleteBtn(comment)">
              <span class="material-symbols-outlined"> delete </span>
            </button>
          </div>
          <div
            class="comment-controller-area"
            v-if="comment.board_reply_id == targetComment.board_reply_id && editMode"
          >
            <button @click="onClickCommentDoneBtn(index)">
              <span class="material-symbols-outlined"> done </span>
            </button>
            <button @click="onClickEditCancelBtn">
              <span class="material-symbols-outlined"> close </span>
            </button>
          </div>
        </div>
        <div class="comment-body">
          <div
            v-if="comment.board_reply_id != targetComment.board_reply_id || !editMode"
            class="commment-content"
          >
            {{ comment.content }}
          </div>
          <input
            class="edit-input"
            v-if="comment.board_reply_id == targetComment.board_reply_id && editMode"
            v-model="targetComment.content"
          />
        </div>
      </div>
    </div>
    <div class="button-section">
      <div class="prev-button">
        <img src="@/assets/images/left-arrow.png" alt="" />
      </div>
      <div class="next-button">
        <img src="@/assets/images/right-arrow.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  viewBoard,
  deleteBoard,
  listComment,
  writeComment,
  modifyComment,
  deleteComment,
} from "../../utils/board";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "TripBoardListView",
  components: {},
  data() {
    return {
      board: {},
      files: {},
      comments: [],
      comment: {
        board_id: 0,
        content: "",
        user_id: 0,
      },
      isInput: false,
      isControll: false,
      commentParam: {
        pgno: 1,
        id: "",
      },
      targetComment: {
        board_id: 0,
        board_reply_id: 0,
        content: "",
        user_id: 0,
      },
      editMode: false,
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    this.loadView();
    this.comment.user_id = this.userInfo.user_id;
    // 로그인 되어있는 아이디와 게시글 아이디 비교
    this.isControll = this.userInfo.user_id === this.board.user_id;
    console.log(this.targetComment);
    this.targetComment.user_id = this.userInfo.user_id;
  },
  methods: {
    onClickComment() {
      this.isInput = !this.isInput;
    },
    onClickCommentCalcel() {
      this.isInput = false;
    },
    onClickCommentRegister() {
      writeComment(
        this.comment,
        () => {
          alert("댓글 등록!");
          this.isInput = false;
          this.loadComment();
        },
        () => {
          alert("댓글 등록에 실패했습니다.");
        }
      );
    },
    onClickListButton() {
      this.$router.go(-1);
    },
    loadView() {
      viewBoard(
        this.$route.fullPath.split("list/")[1],
        ({ data }) => {
          this.board = data.board;
          this.files = data.files;
          this.commentParam.id = data.board.board_id;
          this.comment.board_id = data.board.board_id;
          this.targetComment.board_id = this.board.board_id;
          console.log(this.board);
          this.isControll = Number(this.userInfo.user_id) === Number(this.board.user_id);
          this.loadComment();
          this.getFileUrl();
        },
        () => {
          console.log("게시글 불러오기 실패");
        }
      );
    },
    loadComment() {
      listComment(
        this.commentParam,
        ({ data }) => {
          console.log("[commnet]", data.reviewList);
          this.comments = data.reviewList;
        },
        () => {
          console.log("댓글 불러오기 실패!");
        }
      );
    },
    onClickEditBtn() {
      this.$router.push(`/board/edit/${this.board.board_id}`);
    },
    onClickDeleteBtn() {
      deleteBoard(
        this.board.board_id,
        () => {
          alert("게시글이 삭제되었습니다.");
          this.$router.go(-1);
        },
        () => {
          alert("게시글 삭제에 실패했습니다.");
          this.$router.go(-1);
        }
      );
    },
    onClickCommentEditBtn(comment) {
      this.targetComment.board_reply_id = comment.board_reply_id;
      this.targetComment.content = comment.content;
      this.editMode = true;
    },
    onClickCommentDeleteBtn(comment) {
      this.targetComment.board_reply_id = comment.board_reply_id;
      this.targetComment.content = comment.content;
      deleteComment(
        this.targetComment.board_reply_id,
        () => {
          console.log(this.targetComment);
          alert("댓글이 삭제되었습니다.");
          this.loadComment();
        },
        () => {
          alert("댓글 삭제에 실패했습니다.");
        }
      );
    },
    onClickCommentDoneBtn(index) {
      modifyComment(
        this.targetComment,
        () => {
          let temp = [...this.comments];
          for (let item in this.targetComment) {
            temp[index][item] = this.targetComment[item];
          }
          this.comments = temp;
          this.editMode = false;
        },
        () => {
          alert("댓글 수정에 실패했습니다.");
        }
      );
    },
    getFileUrl() {
      this.url = process.env.VUE_APP_S3_BASE_URL + encodeURI(this.files[0]);
    },
    onClickEditCancelBtn() {
      this.editMode = false;
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
  .comment {
    display: flex;
    font-size: 28px;
    font-weight: 700;
    justify-content: space-between;

    .controll-button-area {
      display: flex;
      gap: 6px;
      button {
        padding: 8px 16px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 4px;
      }
      .edit {
        background-color: #8d8d8d;
        color: white;
      }
      .delete {
        background-color: #fc4444;
        color: white;
      }
    }
  }

  .comment-num {
    font-size: 14px;
    color: #707070;
    font-weight: 500;
    margin-top: 8px;
  }

  .comment-input-area {
    margin-top: 20px;
    display: flex;
    gap: 12px;
    border: 1px solid #707070;
    padding: 10px;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #707070;

    img {
      height: 20px;
      width: 22px;
      color: #707070;
      filter: opacity(0.5) drop-shadow(0 0 0 #707070);
    }
  }

  .comment-input-area-active {
    position: relative;
    margin-top: 20px;
    border: 1px solid #707070;

    textarea {
      width: calc(100% - 40px);
      height: 120px;
      padding: 0 20px;
      resize: none;
      font-size: 14px;
      font-weight: 500;
      font-family: "Noto Sans KR", sans-serif;
      border: none;
      margin-bottom: 56px;
      margin-top: 20px;
    }
    .comment-bottom {
      width: 100%;
      position: absolute;
      bottom: 0px;
      left: 0px;
      display: flex;
      align-items: center;
      .button-mode-area {
        display: flex;
        margin-right: auto;
        gap: 16px;
        margin-left: 20px;
        margin-bottom: 20px;
        img {
          width: 22px;
          height: 20px;
          cursor: pointer;
        }
      }
      .button-submit-area {
        display: flex;
        gap: 8px;
        margin-right: 20px;
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 500;
        a {
          color: #bababa;
          cursor: pointer;
          &:hover {
            color: black;
          }
        }
      }
    }
  }

  .comment-content-area {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    border-top: 1px solid #707070;
    padding-top: 20px;
    gap: 12px;
    .commnet-content {
      border-bottom: 1px solid #bababa;
      .comment-header {
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
        .name {
          font-size: 20px;
          font-weight: 600;
        }
        .comment-time {
          font-size: 14px;
          font-weight: 500;
          color: #b7b7b7;
        }
        .comment-controller-area {
          display: flex;
          gap: 6px;
          button {
            background-color: white;
            cursor: pointer;
          }
        }
      }
      .comment-body {
        margin-top: 12px;
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 400;

        .edit-input {
          width: 100%;
          border: 1px solid #bbb;
          padding: 10px;
        }
      }
    }
  }

  .button-section {
    display: flex;
    gap: 12px;
    margin-top: 32px;
    margin-bottom: 40px;
    justify-content: center;
    .prev-button {
      border: 1px solid #bababa;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .next-button {
      border: 1px solid #bababa;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
