<template>
  <div class="user">
    <div class="animated fadeInDown">
      <el-row class="breadcrumb">
        <el-col :span="4"><h3>用户资产</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>账户中心</el-breadcrumb-item>
            <el-breadcrumb-item>用户资产</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <div class="addPadding">

        <div class="user_header">
          <el-input v-model="userId" placeholder="用户ID"></el-input>
          <!--<el-input v-model="nickName" placeholder="用户名"></el-input>-->

          <el-select v-model="tokenType" clearable placeholder="选择币种">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

          <el-button type="primary" title="搜索" icon="el-icon-search" @click="statusMoney(1)"
                     :loading="logins"></el-button>
          <el-button type="primary" title="下载" icon="fa fa-download" v-show="tableData!=''" @click="downloadClick"
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
              prop="userId"
              label=用户ID>
            </el-table-column>
            <el-table-column
              prop="tokenType"
              label="币种">
            </el-table-column>
            <el-table-column
              prop="availNum"
              label="可用">
            </el-table-column>
            <el-table-column
              prop="freezeNum"
              label="冻结">
            </el-table-column>
            <el-table-column
              prop="totalNum"
              label="总计">
            </el-table-column>
            <el-table-column
              prop="walletAddress"
              width="400px"
              label="钱包地址">
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
    name: "userMoney",
    data() {
      return {
        options: [],
        tableData: [],
        userId: "", // 用户id
        nickName: "", // 昵称
        tokenType: "", // 币种
        availNum: '',  // 可用金额
        freezeNum: '', // 冻结金额
        totalNum: '',   // 总计
        page: 1,//当前页码
        totalRecords: 0,//总页数
        downloadUrl: '',//下载链接
        logins: false,
        open_off: false
      }
    },
    mounted() {
      this.statusMoney();
      this.coinSele();
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.logins = true;
        let url = this.ApiUrl + '/api/user/userAccount'
        this.$http({
          method: 'get',
          url: url,
          params: {
            userId: this.userId,
            nickName: this.nickName,
            tokenType: this.tokenType,
            limit: '10',
            page: val
          }
        }).then((response) => {
          if (response.data.success == true) {
            this.tableData = response.data.payload.data;
            this.totalRecords = response.data.payload.totalRecords;
            this.logins = false;
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
      statusMoney(num) {
        //判断有没有参数，有的话是搜索，要把页数清零
        if (num) {
          this.page = 1;
        }
        let url = this.ApiUrl + '/api/user/userAccount'
        this.logins = true;
        this.$http({
          method: 'get',
          url: url,
          params: {
            userId: this.userId,
            nickName: this.nickName,
            tokenType: this.tokenType,
            limit: '10',
            page: this.page
          }
        }).then((response) => {
          if (response.data.success == true) {
            this.tableData = response.data.payload.data;
            this.totalRecords = response.data.payload.totalRecords;
            this.logins = false;
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
      //  币种选择
      coinSele() {
        let url = this.ApiUrl + '/api/user/coinTypes'
        this.$http({
          method: 'get',
          url: url,
          params: {}
        }).then((response) => {
          if (response.data.success == true) {
            this.options = response.data.payload;
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      //点击下载
      downloadClick() {
        this.downloadUrl = this.ApiUrl + "/api/user/importUserAccount?" + 'userId=' + this.userId + '&' + 'nickName=' + this.nickName + '&' + 'tokenType=' + this.tokenType;

        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = this.downloadUrl
        link.setAttribute('download', '用户资产')

        document.body.appendChild(link)
        link.click()

        this.$notify({
          title: '下载成功',
          message: '这是一条成功的提示消息',
          type: 'success'
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
      .el-input {
        width: 10%;
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
