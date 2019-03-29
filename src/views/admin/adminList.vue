<template>
  <div class="user">

    <el-dialog :show-close="false" style="width: 1200px;margin: 0 auto;" title="修改信息" :visible.sync="dialogFormVisible">
      <div style="margin: 20px auto"></div>

      <el-form label-width="120px">
        <el-form-item label="账户 : ">
          <el-input v-model="account" placeholder="账户"></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="密码 : ">
          <el-input v-model="password" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="验证密码 : ">
          <el-input v-model="Setpassword" placeholder="验证密码"></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="管理员名字 : ">
          <el-input v-model="username" placeholder="管理员名字"></el-input>
        </el-form-item>
      </el-form>

      <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
        <el-button @click="showmARKs">取 消</el-button>
        <el-button type="primary" @click="sendAgent()">确定</el-button>
      </div>
    </el-dialog>

    <!--新建-->
    <el-dialog :show-close="false" style="width: 1200px;margin: 0 auto;" title="新建科目"
               :visible.sync="NewdialogFormVisible">
      <div style="margin: 20px auto"></div>

      <el-form label-width="120px">
        <el-form-item label="账户 : ">
          <el-input v-model="Newaccount" placeholder="账户"></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="密码 : ">
          <el-input v-model="Newpassword" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="验证密码 : ">
          <el-input v-model="NewSetpassword" placeholder="验证密码"></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="管理员名字 : ">
          <el-input v-model="Newusername" placeholder="管理员名字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
        <el-button @click="NewdialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="newXinjian()">确定</el-button>
      </div>
    </el-dialog>

    <div class="animated fadeInDown">
      <el-row class="breadcrumb">
        <el-col :span="4"><h3>管理员管理</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <div class="addPadding">

        <div class="user_header">
          <el-input v-model="name" placeholder="管理名称"></el-input>

          <el-button style="float: right;margin-right: 2%" type="primary" @click="newInfoFun">新建</el-button>

          <el-button type="primary" title="搜索" @click="sendCharge(1)" icon="el-icon-search"
                     :loading="logins"></el-button>

        </div>

        <div class="user_main">

          <el-table
            :data="tableData"
            v-loading="logins"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(33, 33, 33, 0.8)"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="ID">
            </el-table-column>
            <el-table-column
              prop="account"
              label="管理员账户">
            </el-table-column>
            <el-table-column
              prop="name"
              label="管理姓名">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="end_login_time"
              label="上次登录时间">
            </el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <el-tooltip content="修改" placement="right" effect="light">
                  <el-button size="mini" type="primary"
                             @click="getUserId(scope.$index, scope.row)">修改
                  </el-button>
                </el-tooltip>
                <el-tooltip content="删除" placement="right" effect="light">
                  <el-button size="mini" type="danger"
                             @click="deleteFun(scope.$index, scope.row)">删除
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

        </div>

        <div class="pageBox" v-show="totalRecords>10">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="totalRecords">
          </el-pagination>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import qs from 'qs'

  export default {
    name: "charge",
    data() {
      return {
        account: '',//账户
        password: '',//密码
        Setpassword: '',//密码
        username: '',//姓名

        Newaccount: '',//账户
        Newpassword: '',//密码
        NewSetpassword: '',//密码
        Newusername: '',//姓名

        tableData: [],
        userIdMask: '',//ID
        name: '',//客户名
        NewdialogFormVisible: false,//新建
        dialogFormVisible: false,//修改
        limit: '', //每页条数 默认20
        Toexamine: false,//审核状态
        totalRecords: 0,//总页数
        page: 1,//当前页码
        logins: false,
      }
    },
    mounted() {
      this.sendCharge();
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.logins = true;
        let url = this.ApiUrl + '/user/getuserlistbypage'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            name: this.name,
            pageNum: val, //页码   默认1
            pageSize: 10, //每页条数 默认20
          })
        }).then((response) => {

          if (response.data.code == 0) {
            this.logins = false;
            this.tableData = response.data.data.data;
            this.totalRecords = response.data.data.totalCount;
          } else {
            if (response.data.error.code == '403') {
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      sendCharge(num) {
        //判断有没有参数，有的话是搜索，要把页数清零
        if (num) {
          this.page = 1;
        }
        this.logins = true;
        let url = this.ApiUrl + '/user/getuserlistbypage'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            name: this.name,
            pageNum: this.page, //页码   默认1
            pageSize: 10, //每页条数 默认20
          })
        }).then((response) => {
          if (response.data.code == 0) {
            this.logins = false;
            this.tableData = response.data.data.data;
            this.totalRecords = response.data.data.totalCount;
          } else {
            if (response.data.error.code == '403') {
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });

      },
      //打开修改弹窗
      getUserId(index, row) {
        this.dialogFormVisible = true;
        this.userIdMask = row.id;
        this.account = row.account;
        this.username = row.name;
      },
      //确定修改
      sendAgent() {
        if (this.account == '') {
          this.$message.error('错了哦，请输入账号');
          return false
        }
        if (this.username == '') {
          this.$message.error('错了哦，请输入名称');
          return false
        }
        if (this.password == '') {
          this.$message.error('错了哦，请输入密码');
          return false
        }
        if (this.Setpassword == '') {
          this.$message.error('错了哦，请输入验证密码');
          return false
        }
        if (this.Setpassword != this.password) {
          this.$message.error('错了哦，两次输入的密码不同');
          return false
        }

        let url = this.ApiUrl + '/user/updateuser'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            id: this.userIdMask,
            name: this.username,
            password: this.password,
            account: this.account,
          })
        }).then((response) => {
          if (response.data.code == 0) {
            this.$notify({
              title: '修改成功',
              message: '这是一条成功的提示消息',
              type: 'success'
            });
            this.showmARKs();
            this.sendCharge();
          } else {
            if (response.data.error.code == '403') {
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });

      },
      //  关闭修改弹窗
      showmARKs() {
        this.dialogFormVisible = false;
        this.account = '';
        this.username = '';
        this.Setpassword = '';
        this.password = '';
      },
      //  关闭新建弹窗
      NewshowmARKs() {
        this.NewdialogFormVisible = false;
        this.Newaccount = '';
        this.Newusername = '';
        this.NewSetpassword = '';
        this.Newpassword = '';
      },
      //新增信息
      newInfoFun() {
        this.NewdialogFormVisible = true;
      },
      //确定新建
      newXinjian() {
        if (this.Newaccount == '') {
          this.$message.error('错了哦，请输入账号');
          return false
        }
        if (this.Newusername == '') {
          this.$message.error('错了哦，请输入名称');
          return false
        }
        if (this.Newpassword == '') {
          this.$message.error('错了哦，请输入密码');
          return false
        }
        if (this.NewSetpassword == '') {
          this.$message.error('错了哦，请输入验证密码');
          return false
        }
        if (this.NewSetpassword != this.Newpassword) {
          this.$message.error('错了哦，两次输入的密码不同');
          return false
        }

        let url = this.ApiUrl + '/user/adduser'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            name: this.Newusername,
            password: this.Newpassword,
            account: this.Newaccount,
          })
        }).then((response) => {
          if (response.data.code == 0) {
            this.$notify({
              title: '新建成功',
              message: '这是一条成功的提示消息',
              type: 'success'
            });
            this.NewshowmARKs();
            this.sendCharge();
          } else {
            if (response.data.error.code == '403') {
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });

      },
      //删除
      deleteFun(index, row) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确认通过',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.ApiUrl + '/user/deluser'
          this.$http({
            method: 'post',
            url: url,
            data: qs.stringify({
              id: row.id,
            })
          }).then((response) => {
            if (response.data.code == 0) {
              this.$notify({
                title: '删除成功',
                message: '这是一条成功的提示消息',
                type: 'success'
              });
              this.sendCharge();
            } else {
              this.$message.error(response.data.msg);
            }
          }).catch((error) => {
            console.log(error);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user {
    width: 100%;
    height: auto;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;

    .user_header {
      width: 100%;
      height: auto;
      padding: 0 0 10px 0;
      /*background: red;*/
      .el-input {
        width: 13%;
      }
    }
  }

  .user_main {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .addPadding {
    padding: 12px;
    border: 1px solid #333;
    height: auto;
    /*min-height: 600px;*/
    overflow: hidden;
    background: #212121;
    border-radius: 4px;
  }

  .mark_open {
    width: 40%;
    height: 500px;
    /*background: #b6e7ab;*/
    position: fixed;
    left: 200px;
    top: 0;

    .mark_open_box {
      width: 80%;
      height: 40px;
      margin: 40px auto;

      span {
        float: left;
        margin-top: 12px;
      }

      .el-input {
        width: 80%;
        float: right;
      }
    }
  }
</style>
