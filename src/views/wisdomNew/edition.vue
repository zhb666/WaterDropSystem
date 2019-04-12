<template>
  <div class="user">

    <el-dialog :show-close="false" style="width: 1200px;margin: 0 auto;" title="修改信息" :visible.sync="dialogFormVisible">
      <div style="margin: 20px auto"></div>

      <el-form label-width="120px">
      <el-form-item label="版本号 : ">
        <el-input v-model="actiCodeMask" :disabled="true" placeholder="版本号"></el-input>
      </el-form-item>
      <el-form-item label="版本描述 : ">
        <el-input v-model="userName" placeholder="版本描述"></el-input>
      </el-form-item>
    </el-form>

      <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
        <el-button @click="showmARKs">取 消</el-button>
        <el-button type="primary" @click="sendAgent()">确定</el-button>
      </div>
    </el-dialog>

    <!--新建-->
    <el-dialog :show-close="false" style="width: 1200px;margin: 0 auto;" title="新建"
               :visible.sync="NewdialogFormVisible">
      <div style="margin: 20px auto"></div>

      <el-form label-width="120px">
        <el-form-item label="版本号 : ">
          <el-input v-model="NewactiCodeMask" placeholder="版本号"></el-input>
        </el-form-item>
        <el-form-item label="版本描述 : ">
          <el-input v-model="NewuserName" placeholder="版本描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
        <el-button @click="NewdialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="newXinjian()">确定</el-button>
      </div>
    </el-dialog>

    <div class="animated fadeInDown">
      <el-row class="breadcrumb">
        <el-col :span="4"><h3>版本管理</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>客户中心</el-breadcrumb-item>
            <el-breadcrumb-item>版本管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <div class="addPadding">

        <div class="user_header">

          <el-button style="float: right;margin-right: 2%" type="primary" @click="newInfoFun">新建</el-button>

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
              prop="version_number"
              label="版本号">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="版本描述">
            </el-table-column>
            <el-table-column
              prop="use_num"
              label="使用用户数">
            </el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <el-tooltip content="修改" placement="right" effect="light">
                  <el-button size="mini" type="primary"
                             @click="getUserId(scope.$index, scope.row)">修改
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
        userName: '',//修改用户名
        NewuserName: '',//新建用户名
        tableData: [],
        actiCodeMask: '',//激活码
        NewactiCodeMask: '',
        userIdMask: '',//ID
        name: '',//客户名
        NewdialogFormVisible: false,//新建
        dialogFormVisible: false,//修改
        limit: '', //每页条数 默认20
        Toexamine: false,//审核状态
        totalRecords: 0,//总页数
        page: 1,//当前页码
        logins: false,
        open_off: false
      }
    },
    mounted() {
      this.sendCharge();
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.logins = true;
        let url = this.ApiUrl + '/version/getversionlistbypage'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            pageNum: val, //页码   默认1
            pageSize: 10, //每页条数 默认20
          })
        }).then((response) => {

          if (response.data.code == 0) {
            this.logins = false;
            this.tableData = response.data.data.data;
            this.totalRecords = response.data.data.totalCount;
          } else {
            if (response.data.code == '403') {
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
        let url = this.ApiUrl + '/version/getversionlistbypage'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            pageNum: this.page, //页码   默认1
            pageSize: 10, //每页条数 默认20
          })
        }).then((response) => {
          if (response.data.code == 0) {
            this.logins = false;
            this.tableData = response.data.data.data;
            this.totalRecords = response.data.data.totalCount;
          } else {
            if (response.data.code == '403') {
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
        this.actiCodeMask = row.version_number;
        this.userName = row.remark;
      },
      //确定修改
      sendAgent() {
        if (this.actiCodeMask == '') {
          this.$message.error('错了哦，请输入版本号');
          return false
        } else if (this.userName == '') {
          this.$message.error('错了哦，请输入项目描述');
          return false
        }

        let url = this.ApiUrl + '/version/updateversion'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            id: this.userIdMask,
            version_number: this.actiCodeMask,
            remark: this.userName
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
            if (response.data.code == '403') {
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
        this.userName = '';
        this.showNameBox = false;
        this.showNameBoxTWO = false;
      },
      //  关闭新建弹窗
      NewshowmARKs() {
        this.NewdialogFormVisible = false;
        this.NewuserName = '';
        this.NewactiCodeMask = '';
      },
      //新增信息
      newInfoFun() {
        this.NewdialogFormVisible = true;
      },
      //确定新建
      newXinjian() {
        if (this.NewactiCodeMask == '') {
          this.$message.error('错了哦，请输入版本号');
          return false
        } else if (this.NewuserName == '') {
          this.$message.error('错了哦，请输入项目描述');
          return false
        }

        let urls = this.ApiUrl + '/version/checkversion'
        this.$http({
          method: 'post',
          url: urls,
          data: qs.stringify({
            version_number: this.NewactiCodeMask,
          })
        }).then((response) => {
          if (response.data.code == 1009) {

          } else {
            return
            if (response.data.code == '403') {
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });

        let url = this.ApiUrl + '/version/addversion'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            version_number: this.NewactiCodeMask,
            remark: this.NewuserName,
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
            if (response.data.code == '403') {
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });

      },
    },
    watch: {}
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
