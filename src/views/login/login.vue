<template>
  <div class="box">
    <div class="bgc">
      <el-card class="box-card">
        <div class="interface">登录界面</div>
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
          <div class="flag">
            <el-form-item label="验证码" prop="code">
              <el-input
                v-model="ruleForm.code"
                placeholder="请输入验证码"
              ></el-input>
            </el-form-item>
            <div v-html="code1" @click="code"></div>
          </div>

          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
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
      code1: "",
      ruleForm: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名，不用为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码，不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            message: "密码大于6位",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    code() {
      axios
        .get("/api/captcha")
        .then(res => {
          if (res.data) {
            this.code1 = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          axios
            .post("/api/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              code: this.ruleForm.code
            })
            .then(res => {
              if (res.data.code === 200) {
                let nowtime = dayjs().format("YYYY年MM月DD日  HH时mm分ss秒");
                this.$message.success(res.data.message);
                let user = {
                  username: this.ruleForm.username,
                  password: this.ruleForm.password,
                  time: nowtime
                };
                sessionStorage.setItem("user", JSON.stringify(user));
                this.$router.push("/");
              } else if (res.data.code === 1) {
                this.$message.warning(res.data.message);
                this.ruleForm.code = "";
                axios
                  .get("/api/captcha")
                  .then(res => {
                    if (res.data) {
                      this.code1 = res.data;
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else if (res.data.code === 500) {
                this.$message.error(res.data.message);
                this.ruleForm.password = "";
                this.ruleForm.code = "";
                axios
                  .get("/api/captcha")
                  .then(res => {
                    if (res.data) {
                      this.code1 = res.data;
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("错误");
          this.ruleForm.username = "";
          this.ruleForm.password = "";
        }
      });
    },
    register() {
      this.$router.push("/register");
    }
  },
  mounted() {
    this.code();
  },
  computed: {},
  watch: {}
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
.flag {
  display: flex;
}
</style>