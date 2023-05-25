<template>
  <footer class="footer-root">
    <div>Copyright © 2023 SSAFY. All rights reserved.</div>
    <div>Contact webmaster for more information.</div>
    <div>
      <a href="https://github.com/ksg2388" target="_blank">sang._.geun</a>
      {{ ' ㅣ ' }}
      <a href="https://github.com/jungu12" target="_blank">jungu12</a>
      {{ ' ㅣ ' }}
      <a href="https://github.com/so34so" target="_blank">so34so</a>
      {{ ' ㅣ ' }}
      <a
        href="https://instagram.com/silver.jjin?igshid=OGQ5ZDc2ODk2ZA=="
        target="_blank"
        >응프로띠테</a
      >
      {{ ' ㅣ ' }}
      <a href="https://github.com/establers" target="_blank">establers</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TripFooter',
  components: {},
  data() {
    return {
      message: '',
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.footer-root {
  width: 100%;
  display: flex;
  height: 100px;
  background-color: #ff8080;
  color: white;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;

  a {
    color: white;
  }
}
</style>
