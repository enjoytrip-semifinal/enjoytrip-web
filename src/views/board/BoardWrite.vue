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
        </div>
        <input
          id="write-file"
          class="file-input"
          ref="file"
          type="file"
          placeholder="첨부된 파일이 없습니다."
          @change="registerFile"
        />
      </div>
      <div class="button-section">
        <button class="upload-button" @click.prevent="onClickSubmitBtn">
          등록
        </button>
        <button class="cancel-button" @click.prevent="onClickCancelBtn">
          취소
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AWS from 'aws-sdk';
import { writeBoard } from '../../utils/board';

const userStore = 'userStore';

export default {
  name: 'TripBoardWrite',
  components: {},
  computed: {
    ...mapState(userStore, ['userInfo', 'isLogin']),
  },
  data() {
    return {
      board: {
        title: '',
        content: '',
        hit: 0,
        user_id: 0,
        fileInfos: [],
      },
    };
  },
  created() {
    console.log(this.userInfo.user_id);
    this.board.user_id = this.userInfo.user_id;
  },
  methods: {
    onClickCancelBtn() {
      this.$router.push('/board/list');
    },

    onClickSubmitBtn() {
      let err = true;
      let msg = '';
      !this.board.title &&
        ((msg = '제목을 입력해주세요'),
        (err = false),
        this.$refs['write-title'].focus());
      err &&
        !this.board.content &&
        ((msg = '내용을 입력해주세요'),
        (err = false),
        this.$refs['write-content'].focus());

      if (!err) {
        alert(msg);
        return;
      }

      writeBoard(
        this.board,
        ({ status }) => {
          let msg = '등록 처리시 문제가 발생했습니다.';
          if (status === 200) {
            if (this.board.fileInfos.length != 0) {
              this.uploadFile();
            }
            msg = '등록이 완료되었습니다.';
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
    registerFile() {
      let fileNameSlice = this.$refs.file.files[0].name.split('.');
      console.log('[file]', this.$refs.file.files[0]);
      this.photoKey =
        fileNameSlice[0] + '_' + new Date().getTime() + '.' + fileNameSlice[1];
      this.board.fileInfos.push(this.photoKey);
      console.log('[fileInfo]', this.board.fileInfos);
    },
    uploadFile() {
      AWS.config.update({
        region: process.env.VUE_APP_BUCKET_REGION,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.VUE_APP_IDENTITY_POLL_ID,
        }),
      });

      const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {
          Bucket: process.env.VUE_APP_ALBUM_BUCKET_NAME,
        },
      });

      s3.upload(
        {
          Key: this.photoKey,
          Body: this.$refs.file.files[0],
          ACL: 'public-read',
        },
        (err) => {
          if (err) {
            return;
          }
        }
      );
    },
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
