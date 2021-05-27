<template>
  <div class="box df jc_c ai_c">
    <div class="df box1">
      <el-col :span="8">
        <el-card>
          <div class="flx df jc_b mr">
            <span class="iconfont icon-duoren" style="color: green"></span>
            <div>
              <div class="mb">New visits</div>
              <div class="mt count">
                <countTo
                  :startVal="startVal"
                  :endVal="count.visits"
                  :duration="3000"
                ></countTo>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="flx df jc_b mr">
            <span class="iconfont icon-tianjiadui" style="color: blue"></span>
            <div>
              <div class="mb">Message</div>
              <div class="mt count">
                <countTo
                  :startVal="startVal"
                  :endVal="count.messages"
                  :duration="3000"
                ></countTo>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="flx df jc_b mr">
            <span class="iconfont icon-renminbi" style="color: red"></span>
            <div>
              <div class="mb">Purchases</div>
              <div class="mt count">
                <countTo
                  :startVal="startVal"
                  :endVal="count.purchases"
                  :duration="3000"
                ></countTo>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="flx df jc_b mr">
            <span class="iconfont icon-gouwuche1" style="color: orange"></span>
            <div>
              <div class="mb">New Shopping</div>
              <div class="mt count">
                <countTo
                  :startVal="startVal"
                  :endVal="count.shopping"
                  :duration="3000"
                ></countTo>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";

export default {
  name: "",
  props: {
    count: {
      type: Object,
    },
  },
  data() {
    return {
      startVal: 0,
    };
  },
  components: {
    countTo,
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  padding: 30px 15px;
  .box1 {
    width: 100%;
  }
  .el-col {
    margin: 0 15px;
  }
}
span {
  width: 70px;
  height: 70px;
  font-size: 70px;
}
.count > span {
  font-size: 30px;
}
</style>