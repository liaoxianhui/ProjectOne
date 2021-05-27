<template>
  <div>
    <el-input
      style="width: 30%;margin-bottom:10px"
      clearable
      v-model="input"
      placeholder="请输入商品名称"
      @input="search"
    ></el-input>
    <el-card>
      <el-table border id="exportTab" :data="tableData" style="width: 100%">
        <el-table-column
          align="center"
          prop="NAME"
          label="名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="GOODS_SERIAL_NUMBER"
          label="商品编号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column align="center" prop="ORI_PRICE" label="原价">
        </el-table-column>
        <el-table-column align="center" prop="PRESENT_PRICE" label="现价">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="modify(scope.$index, scope)"
            >
              修改
            </el-button>
            <el-button size="small" type="danger" @click="del(scope)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="num"
        layout="total, sizes, prev,pager,next,jumper"
        :total="tableData1.length"
        :current-page="currentPage"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog title="修改内容" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.NAME" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="原价" :label-width="formLabelWidth">
            <el-input v-model="form.ORI_PRICE" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现价" :label-width="formLabelWidth">
            <el-input
              v-model="form.PRESENT_PRICE"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit(form)">取 消</el-button>
          <el-button type="primary" @click="addUser(form)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="df" style="margin-top:20px">
      <div class="mr">
        <el-button type="primary" @click="clickExcel">导出excel</el-button>
      </div>
      <div class="ml">
        <el-button type="success" @click="clickCsv">导出csv</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "",
  props: {},
  data() {
    return {
      input: "",
      tableData: [],
      tableData1: [],
      num: 5,
      currentPage: 1,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        index: null,
        NAME: "",
        ORI_PRICE: "",
        PRESENT_PRICE: "",
        ID: "",
        GOODS_SERIAL_NUMBER: ""
      }
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/tableData")
        .then(res => {
          this.tableData1 = res.data.data;
          this.tableData = this.tableData1.slice(0, 5);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.num = val;
      this.currentPage = 1;
      this.tableData = this.tableData1.slice(0, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData = this.tableData1.slice(
        (this.currentPage - 1) * this.num,
        this.currentPage * this.num
      );
    },
    del(scope) {
      this.tableData1.map((item1, index) => {
        if (scope.row.NAME === item1.NAME) {
          this.tableData1.splice(index, 1);
        }
        this.tableData = this.tableData1.slice(
          (this.currentPage - 1) * this.num,
          this.currentPage * this.num
        );
      });
    },
    modify(index, scope) {
      this.dialogFormVisible = true;
      this.form.index = index;
      this.form.NAME = scope.row.NAME;
      this.form.ORI_PRICE = scope.row.ORI_PRICE;
      this.form.PRESENT_PRICE = scope.row.PRESENT_PRICE;
      this.form.ID = scope.row.ID;
      this.form.GOODS_SERIAL_NUMBER = scope.row.GOODS_SERIAL_NUMBER;
    },
    cancelEdit(form) {
      this.dialogFormVisible = false;
    },
    addUser(form) {
      this.tableData.splice(this.form.index, 1, form);
      this.dialogFormVisible = false;
      this.tableData.NAME = this.form.NAME;
      this.tableData.ORI_PRICE = this.form.ORI_PRICE;
      this.tableData.PRESENT_PRICE = this.form.PRESENT_PRICE;
      this.tableData.ID = this.form.ID;
      this.tableData.GOODS_SERIAL_NUMBER = this.form.GOODS_SERIAL_NUMBER;
    },
    // inbut事件
    search() {
      if (this.input === "") {
        this.getData();
      } else {
        this.tableData = this.tableData.filter(item => {
          return item.NAME.indexOf(this.input) > -1;
        });
      }
    },
    // 导出xlsx
    clickExcel() {
      /* 从表生成工作簿对象 */
      var xlsxParam = { raw: true }; // 导出的内容只做解析，不进行格式转换
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#exportTab"),
        xlsxParam
      );
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "数据xlsx.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, wbout);
        }
      }
      return wbout;
    },
    // 导出csv
    clickCsv() {
      //  .table要导出的表格
      var wb = XLSX.utils.table_to_book(document.querySelector("#exportTab")); //表格的id名字
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "csv",
        bookSST: true,
        type: "array"
      });
      try {
        //table.xlsx默认导出文件名，在弹出文件夹框的时候可修改保存
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "数据csv.csv"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {}
};
</script>