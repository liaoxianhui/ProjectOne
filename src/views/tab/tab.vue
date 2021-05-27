<template>
  <div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="`未读消息${arr.length}`" name="first">
          <el-card>
            <div v-for="(item, index) in arr" :key="item.id">
              <div
                style="border-bottom: 1px solid gray; padding: 20px 0"
                class="df jc_b ai_c"
              >
                <div>{{ item.content }}</div>
                <div class="df ai_c">
                  <div style="margin-right: 20px">{{ item.time }}</div>
                  <el-button @click="unread(item, index)" size="small"
                    >标记已读</el-button
                  >
                </div>
              </div>
            </div>
            <div v-if="arr.length === 0">暂无消息</div>
            <div v-else style="margin-top: 20px">
              <el-button type="primary" @click="allunread">全部已读</el-button>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane :label="`已读消息${count1.length}`" name="second">
          <el-card>
            <div v-for="(item, index) in count1" :key="item.id">
              <div
                style="border-bottom: 1px solid gray; padding: 20px 0"
                class="df jc_b ai_c"
              >
                <div>{{ item.content }}</div>
                <div class="df ai_c">
                  <div style="margin-right: 20px">{{ item.time }}</div>
                  <el-button size="small" @click="del(item, index)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
            <div v-if="count1.length === 0">暂无消息</div>
            <div v-else style="margin-top: 20px">
              <el-button type="primary" @click="alldel">全部删除</el-button>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane :label="`回收站${count2.length}`" name="third">
          <el-card>
            <div v-for="(item, index) in count2" :key="item.id">
              <div
                style="border-bottom: 1px solid gray; padding: 20px 0"
                class="df jc_b ai_c"
              >
                <div>{{ item.content }}</div>
                <div class="df ai_c">
                  <div style="margin-right: 20px">{{ item.time }}</div>
                  <el-button size="small" @click="reduction(item, index)"
                    >还原</el-button
                  >
                </div>
              </div>
            </div>
            <div v-if="count2.length === 0">暂无消息</div>
            <div v-else style="margin-top: 20px">
              <el-button type="primary" @click="allclear">全部清空</el-button>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      activeName: "first",
      count1: [],
      count2: [],
      arr: [
        {
          id: 1,
          read: false,
          recycle: false,
          time: "2020-02-22 12:00:00",
          content: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护",
        },
        {
          id: 2,
          read: false,
          recycle: false,
          time: "2020-02-22 13:00:00",
          content: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护",
        },
        {
          id: 3,
          read: false,
          recycle: false,
          time: "2020-02-22 14:00:00",
          content: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护",
        },
        {
          id: 4,
          read: false,
          recycle: false,
          time: "2020-02-22 15:00:00",
          content: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护",
        },
      ],
    };
  },
  components: {},
  methods: {
    // 点击标记已读
    unread(item, index) {
      this.arr.splice(index, 1);
      this.count1.push(item);
    },
    // 点击删除按钮
    del(item, index) {
      this.count1.splice(index, 1);
      this.count2.push(item);
    },
    // 点击还原按钮
    reduction(item, index) {
      this.count2.splice(index, 1);
      this.count1.push(item);
    },
    // 全部已读
    allunread() {
      this.count1 = this.count1.concat(this.arr);
      this.arr = [];
    },
    // 全部删除
    alldel() {
      this.count2 = this.count2.concat(this.count1);
      this.count1 = [];
    },
    // 全部清除
    allclear() {
      this.count2 = [];
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>