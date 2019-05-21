<template>
  <div class="user">

    <div class="animated fadeInDown">
      <el-row class="breadcrumb">
        <el-col :span="4"><h3>激活管理</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>客户中心</el-breadcrumb-item>
            <el-breadcrumb-item>激活管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <div class="addPadding">

        <div class="user_header">
          <el-input v-model="name" placeholder="客户名"></el-input>

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
              prop="nickname"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="blackboard_write"
              label="板书">
            </el-table-column>
            <el-table-column
              prop="annotate"
              label="批注">
            </el-table-column>
            <el-table-column
              :formatter="isReviewed"
              label="云盘">
            </el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
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
    name: "userAdmin",
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
        tableData: [],
        name: '',//客户名
        limit: '', //每页条数 默认20
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
        let url = this.ApiUrl + '/weixin/getwxuserlistbypage'
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
        let url = this.ApiUrl + '/weixin/getwxuserlistbypage'
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
            if (response.data.code == '403') {
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });

      },

      //判断审核状态
      isReviewed(Reviewed) {
        return Reviewed.use_memory + '/' + Reviewed.max_memory;
      },

      //删除
      deleteFun(index, row) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确认通过',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.ApiUrl + '/weixin/delwxuser'
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
