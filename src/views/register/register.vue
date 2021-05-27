<template>
  <div class="box">
    <div class="bgc">
      <el-card class="box-card">
        <div class="interface">注册界面</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入用户名"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              placeholder="请再次输入密码"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    let validatePass1 = (rule, value, callback) => {
      if (typeof value !== "string") {
        callback(new Error("用户名不能有中文"));
      }
      callback();
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空，请输入密码!"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空，请再次输入密码!"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名，不用为空",
            trigger: "blur",
          },
          {
            validator: validatePass1,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码，不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            message: "密码大于6位",
            trigger: "blur",
          },
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            required: true,
            message: "密码，不能为空",
            trigger: "blur",
          },
          {
            validator: validatePass3,
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    register() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            })
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message);
              } else if (res.data.code === 1) {
                this.$message.warning(res.data.message);
                this.ruleForm.username = "";
                this.ruleForm.password = "";
                this.ruleForm.checkPass = "";
              }
            })
            .catch((err) => {
              console.log(err);
            });
            this.$router.push('/login')
        } else {
          this.$message.error("验证错误");
          this.ruleForm.username = "";
          this.ruleForm.password = "";
          this.ruleForm.checkPass = "";
        }
      });
    },
    login(){
      this.$router.push('/login')
    }
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2899993874,1088991247&fm=26&gp=0.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
}

.interface {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}
.box-card {
  width: 480px;
}
</style>