<template>
  <div class="login">

    <div class="animated bounce">
      <div class="login_main">
        <el-row style="z-index: 1;">
          <el-col :model="user">
            <el-card class="login-box" v-loading="$store.state.loading" element-loading-background="rgba(33, 33, 33, 0.8)">
              <el-form>
                <h1 class="title" style="margin: 20px 0;font-size: 24px;">水滴管理系统</h1>
                <!--<p class="login-box-msg">水滴管理系统</p>-->
                <el-form-item>
                  <el-input type="text" v-model="user.userName" auto-complete="off"
                            placeholder="用户名" suffix-icon="fa fa-user"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input type="password" v-model="user.password" auto-complete="off"
                            placeholder="密码" id="addCLick" suffix-icon="fa fa-lock"></el-input>
                </el-form-item>
                <el-form-item class="boxCode">
                  <el-input type="text" v-model="user.code" auto-complete="off"
                            placeholder="验证码" @keyup.13="login" suffix-icon="fa fa-lock"></el-input>
                  <p @click="SendCode" class="codeTEXT">{{code}}</p>
                </el-form-item>
                <el-form-item>
                  <el-button style="width:100%;" @click="Login" type="primary" id="btnclick" :loading="isLogsin" class="pull-right">
                    登录
                  </el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    name: "Login",
    data() {
      return {
        user: {
          userName: '',
          password: '',
          code:'',
        },
        code:'',//验证码
        isLogsin: false,
        isLogsins: false,
      }
    },
    mounted() {
      // this.Verification();
      // this.TestLogin();
      this.SendCode();
    },
    methods: {
      //登录
      Login(){
        if (this.user.userName == '') {
          this.$message.error('错了哦，请填写用户名');
          return false
        }
        else if (this.user.password == '') {
          this.$message.error('错了哦，请填写密码');
          return false
        }
        else if (this.user.code == '') {
          this.$message.error('错了哦，请填写验证码');
          return false
        }
        this.isLogsin = true;
        let url = this.ApiUrl + '/user/login'
        //登录
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            account: this.user.userName,
            password: this.user.password,
            code:this.user.code,
          })
        }).then((response) => {
          if (response.data.code == 0) {
           // 改变登录状态存储登录信息
            this.$store.commit('name', this.user.userName);
            this.$store.commit('passwor', this.user.password);
            this.$store.commit('yesLogin');

            //添加缓存
            window.sessionStorage.setItem("isLogin", true);
            window.sessionStorage.setItem("name", this.user.userName);
            window.sessionStorage.setItem("passwor", this.user.password);
            this.isLogsin = false;
            this.$router.push({path: '/activation'});

          } else {
            this.$message.error(response.data.msg );
            this.isLogsin = false;
          }
        }).catch((error) => {
          console.log(error);
        });

      },

      //发送验证码
      SendCode(){
        let url = this.ApiUrl + '/user/getcode'
        this.$http({
          method: 'get',
          url: url,
        }).then((response) => {
          if (response.data.code == 0) {
            this.code = response.data.data
          } else {
            this.$notify.error({
              title: '错误',
              message: response.data.msg
            });
          }
        }).catch((error) => {
          console.log(error);
        });

      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .login {
    background: url(../../static/common/images/bg.jpg) no-repeat scroll center center / cover;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .login-box {
    /*background: rgba(0, 0, 0, 0.5);*/
    background: white;
    border: none;
    .el-input {
      width: 100%;
      input{
        border: 1px solid #ccc;
      }
    }
  }

  .login-box-msg {
    color: #ffffff;
    text-align: center;
  }

  .login-box .title {
    color: #000;
    text-align: center;
  }

  .login_main {
    width: 400px;
    height: 400px;
    margin: 10% auto;
  }

  .el-input__suffix {
    left: -330px;
  }

  .el-input__inner {
    padding: 0 20px;
  }

  .el-button--primary {
    float: none;
  }

  .boxCode{
    position: relative;
    .codeTEXT{
      width: 20%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      background: #409EFF;
      text-align: center;
      color: #fff;
      cursor: pointer;
    }
  }

  /*.el-form-item__content{text-align: center;}*/
</style>
