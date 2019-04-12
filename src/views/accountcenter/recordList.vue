<template>
  <div class="user">

    <!--<el-dialog style="width: 1200px;margin: 0 auto;" title="选择代理商" :visible.sync="dialogFormVisible">-->
    <!--<el-select v-model="agentID" clearable placeholder="选择代理商">-->
    <!--<el-option-->
    <!--v-for="item in agent"-->
    <!--:key="item.id"-->
    <!--:label="item.title"-->
    <!--:value="item.id">-->
    <!--</el-option>-->
    <!--</el-select>-->

    <!--<el-select v-model="AdvertisementID" clearable placeholder="广告功能">-->
    <!--<el-option-->
    <!--v-for="item in Advertisement"-->
    <!--:key="item.value"-->
    <!--:label="item.label"-->
    <!--:value="item.value">-->
    <!--</el-option>-->
    <!--</el-select>-->

    <!--<div style="height: 30px;"></div>-->

    <!--<el-input-->
    <!--type="textarea"-->
    <!--:autosize="{ minRows: 2, maxRows: 4}"-->
    <!--placeholder="请输入内容"-->
    <!--v-model="Remarks">-->
    <!--</el-input>-->

    <!--<div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">-->
    <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="sendAgent()">保 存</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->

    <div class="animated fadeInDown">

      <el-row class="breadcrumb">
        <el-col :span="4"><h3>商户申请</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>账户中心</el-breadcrumb-item>
            <el-breadcrumb-item>商户申请</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <div class="addPadding">

        <div class="user_header">
          <el-input v-model="userId" placeholder="用户ID"></el-input>
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

          <el-button type="primary" title="搜索" icon="el-icon-search" @click="statusData(1)"></el-button>
          <!--<el-button type="primary" @click="statusData" :loading="logins">搜 索</el-button>-->

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
              prop="userId"
              width="100px"
              label="用户ID">
            </el-table-column>
            <el-table-column
              prop="name"
              label="提交姓名">
            </el-table-column>
            <el-table-column
              prop="contact"
              label="联系方式">
            </el-table-column>
            <el-table-column
              width="400px"
              prop="description"
              label="申请理由">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="提交时间">
            </el-table-column>
            <el-table-column label="操作" width="150px">
              <template slot-scope="scope">
                <el-button size="mini" :disabled="isReviewed(scope.row)" type="primary" icon="fa fa-gavel" @click="tiSHenhe(scope.row)"></el-button>
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
          <!--<el-button size="mini"  type="primary" @cick="statusData">跳转</el-button>-->
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: "user",
    data() {
      return {
        tableData: [],
        userId: '',//用户id
        nickName: '',//用户名
        start_at: '',//开始时间
        end_at: '',//结束时间
        dateTime: [],
        inviteUserId: '',//上级UID
        limit: '',//每页显示记录数
        page: 1,//当前页码
        logins: false,
        totalRecords: 0,//总页数
      }
    },
    mounted() {
      this.statusData();
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        //判断时间格式
        if (!this.dateTime) {
          this.dateTime = []
        }
        let url = this.ApiUrl + '/api/user/merchantApplyLists'
        this.logins = true;
        this.$http({
          method: 'get',
          url: url,
          params: {
            userId: this.userId,//用户id
            nickName: this.nickName,//用户名
            identity: '',//身份 1:用户 2:商户
            start_at: this.dateTime[0],//开始时间
            end_at: this.dateTime[1],//结束时间
            inviteUserId: this.inviteUserId,//上级UID
            status: this.status,//状态 1:正常 2:禁止登陆 3:冻结交易 4:禁用
            limit: '10',//每页显示记录数
            page: val//当前页码
          }
        }).then((response) => {
          if (response.data.success == true) {
            this.tableData = response.data.payload.data;
            this.totalRecords = response.data.payload.totalRecords;
            this.logins = false;
          } else {
            if(response.data.code == '403'){
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      statusData(num) {
        //判断有没有参数，有的话是搜索，要把页数清零
        if(num){
          this.page = 0;
        }
        //判断时间格式
        if (!this.dateTime) {
          this.dateTime = []
        }
        let url = this.ApiUrl + '/api/user/merchantApplyLists'
        this.logins = true;
        this.$http({
          method: 'get',
          url: url,
          params: {
            userId: this.userId,//用户id
            start_at: this.dateTime[0],//开始时间
            end_at: this.dateTime[1],//结束时间
            limit: '10',//每页显示记录数
            page: this.page//当前页码
          }
        }).then((response) => {
          if (response.data.success == true) {
            this.tableData = response.data.payload.data;
            this.totalRecords = response.data.payload.totalRecords;
            this.logins = false;
          } else {
            if(response.data.code == '403'){
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      //判断审核状态
      isReviewed(row) {
        if (row.checkStatus) {
          return true
        } else {
          return false
        }
      },
      //提交审核
      tiSHenhe(row) {
        let url = this.ApiUrl + '/api/user/merchantApply'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            applyId: row.applyId
          })
        }).then((response) => {
          if (response.data.success == true) {
            this.statusData();
            this.$notify({
              title: '审核成功',
              message: '这是一条成功的提示消息',
              type: 'success'
            });

          } else {
            if(response.data.code == '403'){
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
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
    overflow: hidden;
    .user_header {
      width: 100%;
      height: auto;
      padding: 0 0 10px 0;
      /*background: red;*/
      .el-input {
        width: 12%;
      }
    }
  }

  .user_main {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .addPadding {
    height: auto;
    min-height: 600px;
    overflow: hidden;
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

  .openErweima {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .9);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    .clone_x {
      position: fixed;
      right: 50px;
      top: 50px;
      color: #fff;
      font-size: 30px;
      cursor: pointer;
    }
    .openErweima_main {
      width: 650px;
      height: 500px;
      background: #fff;
      margin: 5% auto;
      text-align: center;
      overflow: hidden;
      h2, h3, h4 {
        margin-top: 20px;
      }
      .erweima {
        width: 200px;
        height: 200px;
        margin: 20px 0;
      }
    }
  }
</style>
