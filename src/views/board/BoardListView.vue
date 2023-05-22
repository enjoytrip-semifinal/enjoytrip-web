<template>
  <div class="view-container">
    <div class="title">{{board.title}}</div>
    <div class="title-data-section">
      <div>{{`${board.nickname} | ${board.register_date}`}}</div>
      <div class="hit-area">
        <img src="@/assets/images/eyes.png" alt="" />
        <div>{{ board.hit }}</div>
        <button class="list-button" @click="onClickListButton">목록</button>
      </div>
    </div>
    <div class="content">
      {{
        board.content
      }}
    </div>
    <div class="comment">댓글</div>
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
      />
      <div class="comment-bottom">
        <div class="button-mode-area">
          <img src="@/assets/images/comment.png" alt="" />
          <img src="@/assets/images/camera.png" alt="" />
        </div>
        <div class="button-submit-area">
          <a @click="onClickCommentCalcel" class="cancel-button">취소</a>
          <a>등록</a>
        </div>
      </div>
    </div>
    <div class="comment-content-area">
      <div
        class="commnet-content"
        v-for="comment in comments"
        :key="comment.userid"
      >
        <div class="comment-header">
          <div class="name">{{ comment.userid }}</div>
          <div class="comment-time">{{ comment.time }}</div>
        </div>
        <div class="comment-body">
          <div class="commment-content">{{ comment.content }}</div>
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
import { viewBoard } from '../../utils/board';
export default {
  name: 'TripBoardListView',
  components: {},
  data() {
    return {
      board: {},
      comments: [
        {
          userid: '1',
          time: '2022-05-03',
          content: '정말 최고다!',
        },
        {
          userid: '2',
          time: '2022-05-03',
          content: '정말 최고다!',
        },
        {
          userid: '3',
          time: '2022-05-03',
          content: '정말 최고다!',
        },
        {
          userid: '4',
          time: '2022-05-03',
          content: '정말 최고다!',
        },
        {
          userid: '5',
          time: '2022-05-03',
          content: '정말 최고다!',
        },
        {
          userid: '6',
          time: '2022-05-03',
          content: '정말 최고다!',
        },
      ],
      isInput: false,
    };
  },
  created() {
    this.loadView();
  },
  methods: {
    onClickComment() {
      this.isInput = !this.isInput;
    },
    onClickCommentCalcel() {
      this.isInput = false;
    },
    onClickListButton() {
      this.$router.go(-1);
    },
    loadView() {
      viewBoard(this.$route.fullPath.split('list/')[1],
        ({ data }) => {
          this.board = data.board;
          console.log(this.board);
        },
        () => {
          console.log('게시글 불러오기 실패');
        }
      );
    }
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
  .comment {
    font-size: 28px;
    font-weight: 700;
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
      font-family: 'Noto Sans KR', sans-serif;
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
        .name {
          font-size: 20px;
          font-weight: 600;
        }
        .comment-time {
          font-size: 14px;
          font-weight: 500;
          color: #b7b7b7;
        }
      }
      .comment-body {
        margin-top: 12px;
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 400;
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
