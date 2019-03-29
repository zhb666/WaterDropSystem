<template>
  <div class="user">


    <div class="animated fadeInDown">

      <el-row class="breadcrumb">
        <el-col :span="4"><h3>密码设置</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>密码设置</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <div class="setPassword">
        <el-form :label-position="labelPosition" label-width="100px">
          <el-form-item label="新密码 : ">
            <el-input type="password" v-model="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码 : ">
            <el-input type="password" v-model="passwordTwo"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <el-button :loading="logins"  style="margin-left: 100px;" type="primary" @click="setPassword_fun()">立即修改</el-button>

    </div>

  </div>
</template>

<script>
  import qs from 'qs'

  export default {
    name: "userCode",
    data() {
      return {
        labelPosition: 'right',
        password:'',
        passwordTwo:'',
        logins: false,//加载状态
      }
    },
    mounted() {

    },
    methods: {
      //修改密码
      setPassword_fun() {
        if(this.password == '' ){
          this.$message({
            type: 'info',
            message: '密码不能为空！'
          });
          return
        }
        if(this.passwordTwo == '' ){
          this.$message({
            type: 'info',
            message: '确认密码不能为空！'
          });
          return
        }
        if(this.passwordTwo != this.password ){
          this.$message.error('两次输入的密码不相等');
          return
        }
        this.logins = true;
        let url = this.ApiUrl + '/api/admin/updatePasswd'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            password:this.password
          })
        }).then((response) => {
          if (response.data.success == true) {
            this.$notify({
              title: '',
              message: '修改密码成功',
              type: 'success'
            });
            this.logins = false;
          } else {
            this.$message.error(response.data.msg);
            this.logins = false;
          }
        }).catch((error) => {
          console.log(error);
          this.logins = false;
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user {
    width: 100%;
    height: auto;
    padding: 20px;
    box-sizing: border-box;
    .user_header {
      width: 100%;
      height: auto;
      padding: 0 0 10px 0;
      /*background: red;*/
      .el-input {
        width: 12%;
      }
    }
    .setPassword{
      width: 20%;
    }
  }
</style>
