<template>
  <div>
    <el-table :data="arr" border style="width: 100%">
      <el-table-column align="center" type="index" label="#"> </el-table-column>
      <el-table-column align="center" prop="title" label="标题">
      </el-table-column>
      <el-table-column align="center" prop="author" label="作者">
      </el-table-column>
      <el-table-column align="center" prop="category" label="类目">
      </el-table-column>
      <el-table-column align="center" prop="source" label="来源">
      </el-table-column>
      <el-table-column align="center" prop="star" label="重要性" width="150px">
        <template slot-scope="scope">
          <el-rate v-model.number="scope.row.star" disabled> </el-rate>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="date"
        label="发布时间"
        width="230px"
      >
      </el-table-column>
      <el-table-column align="center" label="操作" width="210px">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="modify(scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="delClick(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button size="small" type="success" @click="see(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import { Message } from "element-ui";
export default {
  name: "",
  props: {},
  data() {
    return {
      arr: []
    };
  },
  components: {},
  methods: {
    getdata() {
      axios
        .get("/api/article/allArticle")
        .then(res => {
          this.arr = res.data.data;
          this.arr.map(item => {
            item.star = Number(item.star);
            item.date = dayjs(item.date).format("YYYY年MM月DD日 HH时mm分ss秒");
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    delClick(index, row) {
      this.$confirm("此操作将永久删除该发布信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/api/article/delete", {
              _id: row._id
            })
            .then(res => {
              Message.success("删除成功");
              this.getdata();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    see(row) {
      this.$router.push({
        path: "/see",
        query: {
          id: row._id
        }
      });
    },
    modify(row) {
      this.$router.push({
        path: "/update",
        query: {
          id: row._id
        }
      });
    }
  },
  mounted() {
    this.getdata();
  },
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
</style>