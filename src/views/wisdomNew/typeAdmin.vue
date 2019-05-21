<template>
  <div class="user">

    <el-dialog :show-close="false" style="width: 1200px;margin: 0 auto;" title="修改信息" :visible.sync="dialogFormVisible">
      <div style="margin: 20px auto"></div>

      <el-form label-width="120px">
        <el-form-item label="类型 : ">
          <el-input v-model="ChangeCheckStatus"  placeholder="输入类型"></el-input>
        </el-form-item>
        <!--<el-form-item label="类型 : ">-->
          <!--<el-select v-model="ChangeCheckStatus" clearable placeholder="选择类型">-->
            <!--<el-option-->
              <!--track-by="$index"-->
              <!--v-for="item in getcustomerlist"-->
              <!--:key="item.name"-->
              <!--:label="item.name"-->
              <!--:value="item.name">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      </el-form>

      <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
        <el-button @click="showmARKs">取 消</el-button>
        <el-button type="primary" @click="sendAgent()">确定</el-button>
      </div>
    </el-dialog>

    <!--新建-->
    <el-dialog :show-close="false" style="width: 1200px;margin: 0 auto;" title="新建激活用户" :visible.sync="NewdialogFormVisible">
      <div style="margin: 20px auto"></div>

      <el-form label-width="120px">
        <el-form-item label="类型 : ">
          <el-input v-model="NewChangeCheckStatus"  placeholder="输入类型"></el-input>
        </el-form-item>
      </el-form>

      <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
        <el-button @click="NewdialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="newXinjian()">确定</el-button>
      </div>
    </el-dialog>

    <div class="animated fadeInDown">
      <el-row class="breadcrumb">
        <el-col :span="4"><h3>类型管理</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>客户中心</el-breadcrumb-item>
            <el-breadcrumb-item>类型管理</el-breadcrumb-item>
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
              prop="name"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="custom_num"
              label="客户数量">
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
    name: "typeAdmin",
    data() {
      return {
        options: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '0',
            label: '未激活'
          },
          {
            value: '1',
            label: '已激活'
          },
        ],
        getcustomerlist: [],
        userName: '',//修改用户名
        NewuserName: '',//新建用户名
        showNameBox: false,//显示重复
        showNameBoxTWO: false,//显示重复
        offShowName: false,//根据这个来判断是不输入正确
        NewoffShowName: false,//根据这个来判断是不输入正确
        tableData: [],
        ChangeCheckStatus: '',//修改用户信息下拉值
        NewChangeCheckStatus:'',//新建用户信息下拉值
        userIdMask: '',//ID
        name: '',//客户名
        checkStatus: '', //状态
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
        let url = this.ApiUrl + '/custometype/getcustomertypelistbypage'
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
        let url = this.ApiUrl + '/custometype/getcustomertypelistbypage'
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
        this.actiCodeMask = row.activation_code;

        //获取客户列表
        let url = this.ApiUrl + '/custometype/getallcustomtype'
        this.$http({
          method: 'post',
          url: url,
        }).then((response) => {
          if (response.data.code == 0) {
            this.getcustomerlist = response.data.data;
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
      //确定修改
      sendAgent() {
        if (this.ChangeCheckStatus == '') {
          this.$message.error('错了哦，请选择类型');
          return false
        }

        let url = this.ApiUrl + '/custometype/updatecustomertype'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            id: this.userIdMask,
            name: this.ChangeCheckStatus,
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
        this.NewChangeCheckStatus = '';
        this.showNameBox = false;
        this.showNameBoxTWO = false;
      },
      //新增信息
      newInfoFun() {
        this.NewdialogFormVisible = true;
      },
      //确定新建
      newXinjian() {
        if (this.NewChangeCheckStatus == '') {
          this.$message.error('错了哦，请输入类型');
          return false
        }

        let url = this.ApiUrl + '/custometype/addcustomertype'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            name: this.NewChangeCheckStatus,
          })
        }).then((response) => {
          if (response.data.code == 0){
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
      //删除
      deleteFun(index, row) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确认通过',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.ApiUrl + '/custometype/delcustomertype'
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
            }
            else {
              this.$message.error(response.data.msg);
            }
          }).catch((error) => {
            console.log(error);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          });
        });
      },
    },
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
