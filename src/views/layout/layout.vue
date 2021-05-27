<template>
  <div>
    <div class="header">
      <Header :user="user" v-if="user !== ''"></Header>
    </div>
    <div class="container">
      <div class="aside">
        <Aside></Aside>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/layout/Header.vue";
import Aside from "../../components/layout/Aside.vue";
export default {
  name: "",
  props: {},
  components: {
    Header,
    Aside
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {},
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  line-height: 60px;
  position: fixed;
  top: 0;
  background: skyblue;
  width: 100%;
  z-index: 1501;
}
.container {
  display: flex;
  width: calc(100% - 200px);
  .aside {
    width: 180px;
    position: fixed;
    left: 0;
    bottom: 0;
    top: 60px;
  }
  .main {
    flex: 1;
    position: relative;
    left: 180px;
    top: 60px;
    padding: 20px;
  }
}
</style>
