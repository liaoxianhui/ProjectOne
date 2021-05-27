<template>
  <div>
    <div class="box">
      <el-button type="success" @click="see">查看</el-button>
      <el-button type="primary" @click="release">发布</el-button>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题" prop="lab">
          <el-input v-model="ruleForm.lab" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="abstract">
          <el-input v-model="ruleForm.abstract" autocomplete="off"></el-input>
        </el-form-item>
        <div class="df">
          <el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
          <el-form-item label="类目" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择">
              <el-option label="vue" value="vue"></el-option>
              <el-option label="react" value="react"></el-option>
              <el-option label="node.js" value="node.js"></el-option>
              <el-option label="javascript" value="javascript"></el-option>
              <el-option label="性能优化" value="性能优化"></el-option>
              <el-option label="小程序" value="小程序"></el-option>
              <el-option label="工具类" value="工具类"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="来源" prop="source">
            <el-select v-model="ruleForm.source" placeholder="请选择">
              <el-option label="原创" value="原创"></el-option>
              <el-option label="转载" value="转载"></el-option>
              <el-option label="与他人合作" value="与他人合作"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重要性" prop="importance">
            <el-select v-model="ruleForm.importance" placeholder="请选择">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发表时间" prop="ptime">
            <el-date-picker
              v-model="ruleForm.ptime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div id="main">
          <el-form-item label="来源" prop="text">
            <mavon-editor v-model="ruleForm.text" />
          </el-form-item>
        </div>
        <el-form-item style="text-align: center; margin-top: 20px">
          <el-button type="primary" @click="release">发布</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      ruleForm: {
        lab: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        importance: "",
        ptime: "",
        text: ""
      },
      rules: {
        lab: [{ required: true, message: "不能为空", trigger: "blur" }],
        abstract: [{ required: true, message: "不能为空", trigger: "blur" }],
        author: [{ required: true, message: "不能为空", trigger: "blur" }],
        category: [{ required: true, message: "不能为空", trigger: "blur" }],
        source: [{ required: true, message: "不能为空", trigger: "blur" }],
        importance: [{ required: true, message: "不能为空", trigger: "blur" }],
        ptime: [{ required: true, message: "不能为空", trigger: "blur" }],
        text: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    see() {
      this.$router.push("/published");
    },
    release() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          axios
            .post("/api/article/create", {
              title: this.ruleForm.lab,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.importance,
              date: this.ruleForm.ptime,
              text: this.ruleForm.text
            })
            .then(res => {
              if (res.data.code === 200) {
                this.$message.success("发布成功");
                this.$router.push("/published");
              } else if (res.data.code === 500) {
                this.$message.error("发布失败请检查");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.box {
  background: #39816b;
  text-align: right;
  margin-bottom: 20px;
}
</style>