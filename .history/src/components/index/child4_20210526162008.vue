<template>
  <div class="box df">
    <div class="box1">
      <el-card>
        <el-table :data="orderData" style="width: 100%">
          <el-table-column prop="num" label="Order _No" width="270">
          </el-table-column>
          <el-table-column prop="price" label="Price" width="100">
          </el-table-column>
          <el-table-column label="status">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 0">
                <el-tag type="danger" style="width: 80px; text-align: center"
                  >pending</el-tag
                >
              </div>
              <div v-if="scope.row.status === 1">
                <el-tag type="succes" style="width: 80px; text-align: center"
                  >succes</el-tag
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <div class="box2">
      <el-card class="boxtan">
        <div class="df jc_b">
          <div v-if="Select === false">
            <i class="el-icon-caret-bottom" @click="down"></i>
          </div>
          <div v-if="Select === true">
            <i class="el-icon-caret-top" @click="up"></i>
          </div>
          <div>Todo List</div>
        </div>
        <div
          v-for="(item, index) in arr"
          :key="index"
          class="df jc_b"
          style="margin-bottom: 36px;"
        >
          <div class="df">
            <div style="margin-right: 10px">
              <el-checkbox v-model="item.checked" @change="solo"></el-checkbox>
            </div>
            <div>{{ item.name }}</div>
          </div>
          <div v-if="item.checked">
            <i class="el-icon-close" @click="close(item, index)"></i>
          </div>
        </div>
        <div class="df jc_b" >
          <div>{{ arr.length }} items left</div>
          <div>
            <button style="margin-right: 10px; padding: 0 10px" @click="all">
              All
            </button>
            <button style="margin-right: 10px; padding: 0 10px" @click="active">
              Active
            </button>
            <button style="padding: 0 10px" @click="completed">
              Completed
            </button>
          </div>
        </div>
      </el-card>
    </div>

    <div class="box3">
      <el-card style="height: 100%">
        <div style="margin-bottom: 20px">
          <img
            src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
            alt=""
          />
        </div>
        <div>
          <div
            v-for="(item, index) in progress"
            :key="index"
            style="margin-bottom: 20px"
          >
            <div v-if="item.progress * 100 === 100">
              <el-progress
                :percentage="item.progress * 100"
                status="success"
              ></el-progress>
            </div>
            <div v-else>
              <el-progress :percentage="item.progress * 100"></el-progress>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    orderData: {
      type: Array,
    },
    todolist: {
      type: Array,
    },
    progress: {
      type: Array,
    },
  },
  data() {
    return {
      Select: false,
      arr: [],
    };
  },
  components: {},
  methods: {
    down() {
      this.todolist.map((item) => {
        item.checked = true;
      });
      this.Select = true;
    },
    up() {
      this.todolist.map((item) => {
        item.checked = false;
      });
      this.Select = false;
    },
    solo() {
      this.Select = this.arr.every((item) => {
        return item.checked;
      });
    },
    close(item, index) {
      if (item.checked === true) {
        this.arr.splice(index, 1);
      }
    },
    all() {
      this.arr = this.todolist;
    },
    active() {
      this.arr = this.todolist.filter((item) => {
        return !item.checked;
      });
    },
    completed() {
      this.arr = this.todolist.filter((item) => {
        return item.checked;
      });
    },
  },
  mounted() {
    this.arr = this.todolist;
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  margin: 30px;
  font-size: 14px;
}
.box1 {
  width: 40%;
}
.box2 {
  width: 30%;
}
.box3 {
  width: 30%;
}
.boxtan {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>