<template>
  <div class="Head df jc_c">
    <div class="box df jc_b">
      <div>欢迎 {{ user.username }} 来到后台管理系统</div>
      <div class="df box1">
        <div>
          <div v-if="this.hours >= 3 && this.hours < 6">凌晨好,</div>
          <div v-if="this.hours >= 6 && this.hours < 8">早晨好,</div>
          <div v-if="this.hours >= 8 && this.hours < 11">上午好,</div>
          <div v-if="this.hours >= 11 && this.hours < 13">中午好,</div>
          <div v-if="this.hours >= 13 && this.hours < 17">下午好</div>
          <div v-if="this.hours >= 17 && this.hours < 19">傍晚好</div>
          <div v-if="this.hours >= 19 && this.hours < 23">晚上好</div>
          <div v-if="this.hours >= 23 && this.hours < 3">深夜好</div>
        </div>
        <div>亲爱的{{ user.username }}</div>
        <div>您登录的时间{{ user.time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {
    user: {
      type: Object
    }
  },
  components: {},
  data() {
    return {
      hours: ""
    };
  },
  methods: {},
  mounted() {
    this.hours = dayjs().hour();
    // console.log(this.hours)
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.Head {
  width: 100%;
  height: 60px;
  background-color: #295c87;

  .box {
    width: 95%;
    color: white;
    height: 60px;
    line-height: 60px;
  }

  .box1 div {
    margin-left: 10px !important;
  }
}
</style>
