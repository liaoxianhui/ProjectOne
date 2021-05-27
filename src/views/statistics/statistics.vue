<template>
  <div>
    <el-col :span="8">
      <el-card shadow="never">
        <div>
          <div class="wt df">
            <div class="flx head1 df fd_c jc_c ai_c">
              <div>今日发布</div>
              <div>
                {{ datenum }}
                <span class="el-icon-check pic"></span>
              </div>
            </div>
            <div class="flx head2 df fd_c jc_c ai_c">
              <div>原创</div>
              <div>
                {{ num }}
                <span class="el-icon-s-order pic"></span>
              </div>
            </div>
            <div class="flx head3 df fd_c jc_c ai_c">
              <div>新留言</div>
              <div>
                0
                <span class="el-icon-bell pic"></span>
              </div>
            </div>
            <div class="flx head4 df fd_c jc_c ai_c">
              <div>新消息</div>
              <div>
                0
                <span class="el-icon-phone-outline pic"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="df mt">
          <div class="flx ">
            <ve-pie :data="chartData"></ve-pie>
          </div>
          <div class="flx">
            <ve-pie :data="chartData1"></ve-pie>
          </div>
        </div>
        <div>
          <ve-waterfall :data="chartData2"></ve-waterfall>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import groupBy from "lodash/groupBy";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      text: [],
      chartData: {
        columns: ["类目", "数量"],
        rows: []
      },
      chartData1: {
        columns: ["来源", "数量"],
        rows: []
      },
      chartData2: {
        columns: ["发布时间", "数量"],
        rows: []
      }
    };
  },
  methods: {},
  mounted() {
    axios
      .get("/api/article/allArticle")
      .then(res => {
        if (res.data.code === 200) {
          this.text = res.data.data;
          let obj = groupBy(res.data.data, "category");
          for (let i in obj) {
            this.chartData.rows.push({
              数量: obj[i].length,
              类目: i
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    axios.get("/api/article/allArticle").then(res => {
      let obj1 = groupBy(res.data.data, "source");
      for (let i in obj1) {
        this.chartData1.rows.push({
          数量: obj1[i].length,
          来源: i
        });
      }
    });
    axios.get("/api/article/allArticle").then(res => {
      res.data.data.map(item => {
        let t = new Date(item.date);
        // console.log("pp", item.date, `${t.getFullYear()}年${t.getMonth()}月${t.getDate()}日`)
        item.date = dayjs(item.date).format("YYYY-MM-DD");
      });
      let obj2 = groupBy(res.data.data, "date");
      for (let i in obj2) {
        this.chartData2.rows.push({
          数量: obj2[i].length,
          发布时间: i
        });
      }
    });
  },
  watch: {},
  computed: {
    num() {
      let num1 = 0;
      this.text.map(item => {
        if (item.source === "原创") {
          num1++;
        }
      });
      return num1;
    },
    datenum() {
      let num2 = 0;
      this.text.map(item => {
        if (
          dayjs(item.date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
        ) {
          num2++;
        }
      });
      return num2;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-col {
  width: 100%;
}

.head1 {
  height: 50px;
  background-color: #7ccabf;
  color: white;
  position: relative;
}

.head2 {
  height: 50px;
  background-color: #e88a87;
  color: white;
  position: relative;
}

.head3 {
  height: 50px;
  background-color: #8375a3;
  color: white;
  position: relative;
}

.head4 {
  height: 50px;
  background-color: #9fcec1;
  color: white;
  position: relative;
}

.pic {
  position: absolute;
  top: 10px;
  right: 30px;
  font-size: 30px;
}
</style>
