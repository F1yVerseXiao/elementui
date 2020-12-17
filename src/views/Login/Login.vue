<!-- 登录页面 -->
<template>
  <div class="hg-login-page">
    <div class="container">
      <!-- 轮播图 -->
      <el-carousel height="500px" direction="vertical" :autoplay="true">
        <el-carousel-item v-for="(item, index) in swiperList" :key="index">
          <img :src="item.imgsrc" alt="" />
        </el-carousel-item>
      </el-carousel>
      <div class="hg-login">
        <div class="login-top">
          <img src="../../assets/logo.png" alt="" />
        </div>
        <!-- 登录 -->
        <div class="login-form">
          <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item prop="username">
              <el-input
                placeholder="用户名"
                prefix-icon="el-icon-user"
                v-model="form.username"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="密码"
                prefix-icon="el-icon-lock"
                show-password
                v-model="form.password"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <div class="verify">
                <el-input
                  placeholder="验证码"
                  prefix-icon="el-icon-lock"
                  v-model="form.captcha"
                  style="width: 70%"
                >
                </el-input>
                <div class="captcha">
                  <img
                    src="http://localhost:3000/admin/randomcaptcha"
                    alt=""
                    ref="captcha"
                    @click="getCaptcha"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="给波兰蠢驴打个招呼(选填)"
                prefix-icon="el-icon-edit"
                v-model="form.sayHi"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm('ruleForm')" type="primary"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { isLogin } from "@/api/api.js";
console.log(isLogin);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      swiperList: [
        {
          id: 1,
          imgsrc: require("@/assets/img/bg.png"),
        },
        {
          id: 2,
          imgsrc: require("@/assets/img/wallhaven-g8wgod.jpg"),
        },
        {
          id: 3,
          imgsrc: require("@/assets/img/login.png"),
        },
      ],
      form: {
        username: "",
        password: "",
        captcha: "",
        sayHi: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
          {
            min: 4,
            max: 4,
            message: "请输入完整的 4 位验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    getCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:3000/admin/randomcaptcha?t=" + new Date().getTime();
    },
    submitForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid);

          isLogin(this.form).then((res) => {
            console.log("gogo");
            console.log(res);
            if (res.status == 200) {
              this.$router.push("/admin/");
            }
          });
          alert("submit!");
        } else {
          console.log("error");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less">
@keyframes mohu {
  0% {
    transform: scale(0.5);
    opacity: 0;
    filter: blur(50px);
  }
  100% {
    transform: scale(1);
    opacity: 1;
    filter: blur(0px);
  }
}
@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.hg-login-page {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/img/wallhaven-g8wgod.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    animation: mohu 0.5s ease-in-out;
    width: 1000px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 150px 0 rgba(255, 255, 255, 0.5);
    overflow: hidden;
    border-radius: 5px;
    .el-carousel {
      width: 50%;
      text-align: center;
      img {
        text-align: center;
        height: 100%;
      }
    }
  }
  .hg-login {
    width: 500px;
    height: 500px;
    background-color: rgba(0, 0, 0, 0.5);
    .login-top {
      opacity: 0;
      animation: mohu 0.2s linear 1s forwards;
      text-align: center;
      img {
        height: 100px;
        margin: 20px 0px;
      }
    }
    .login-form {
      opacity: 0;
      animation: show 0.5s 1s forwards;
      margin: 0 50px;
      .el-form-item {
      }
      input {
        margin-bottom: 5px;
        background-color: black;
        color: white;
      }
      i {
        height: 40px;
      }
      button {
        width: 100%;
      }
      .verify {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .captcha {
          width: 30%;
          // overflow: hidden;
          height: 40px;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>