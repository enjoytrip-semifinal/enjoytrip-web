<template>
  <div class="card-box" :style="size">
    <img :src="this.imgUrl" alt="" />
    <div class="card-body" :style="size">
      <div class="like"><img src="@/assets/images/ic-heart-empty.png" /></div>
      <div class="like-hover">
        <img src="@/assets/images/ic-heart-fill.png" />
        <p class="like-num">112</p>
      </div>
      <div class="title" :class="[type === 's' ? 'small' : '']">
        {{ title ? title : '제목' }}
      </div>
      <div class="content" :class="[type === 's' ? 'small' : '']">
        {{
          content
            ? content
            : `여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...
        여기 풍경 미쳤다...`
        }}
      </div>
      <div class="address" :class="[type === 's' ? 'small' : '']">
        {{ `경북 구미시 3공단3로 302 ` }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaceCard',
  components: {},
  props: ['imgUrl', 'type', 'content', 'address', 'title'],
  data() {
    return {
      smallSize: {
        width: '294px',
        height: '294px',
      },
      mediumSize: {
        width: '424px',
        height: '424px',
      },
    };
  },
  created() {},
  methods: {},
  computed: {
    size: function () {
      if (this.type === 's') {
        return this.smallSize;
      }
      return this.mediumSize;
    },
  },
};
</script>

<style scoped lang="scss">
.card-box {
  display: flex;
  height: 424px;
  width: 424px;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  cursor: pointer;
  img {
    transition-duration: 0.25s;
    width: 100%;
  }

  .card-body {
    z-index: 5;
    display: flex;
    position: absolute;
    height: 424px;
    width: 424px;
    flex-direction: column;
    align-items: center;
    color: rgba($color: #ffffff, $alpha: 0);
    transition-duration: 0.25s;
    border-radius: 24px;

    .like {
      position: absolute;
      top: 20px;
      right: 20px;
      img {
        height: 24px;
        width: 24px;
      }
    }

    .like-hover {
      position: absolute;
      display: none;
      bottom: 20px;
      left: 20px;
      img {
        height: 24px;
        width: 24px;
      }
    }
    .title {
      font-size: 28px;
      font-weight: 700;
      margin-top: 64px;
      display: none;
    }

    .title.small {
      font-size: 18px;
      font-weight: 700;
      margin-top: 32px;
      display: none;
    }
    .content {
      flex: 1;
      font-size: 16px;
      font-weight: 500;
      margin-top: 48px;
      margin-left: 44px;
      margin-right: 44px;
      display: none;
    }

    .content.small {
      font-size: 12px;
      font-weight: 500;
      margin-top: 32px;
      margin-left: 20px;
      margin-right: 20px;
      display: none;
    }

    .address {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 32px;
      margin-left: auto;
      margin-right: 32px;
      display: none;
    }
    .address.small {
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 20px;
      margin-left: auto;
      margin-right: 20px;
      display: none;
    }
  }

  &:hover {
    img {
      filter: brightness(30%);
      transition-duration: 0.4s;
    }
    .card-body {
      display: flex;
      color: rgba($color: #ffffff, $alpha: 1);
      transition-duration: 0.4s;
    }
    .like {
      display: none;
    }
    .like-hover {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      color: white;
      font-weight: 400;
      align-items: center;
      z-index: 100;
      img {
        filter: none;
      }
    }

    .title {
      display: flex;
    }

    .title.small {
      display: flex;
    }

    .content {
      display: flex;
    }

    .content.small {
      display: flex;
    }

    .address {
      display: flex;
    }
    .address.small {
      display: flex;
    }
  }
}
</style>
