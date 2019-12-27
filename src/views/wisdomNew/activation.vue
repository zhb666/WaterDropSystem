<template>
  <div class="user">

      <el-dialog
          title="新增游戏"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
      

          <el-form ref="form"  label-width="100px">

              <el-form-item label="game_id :">
                  <el-input  v-model="game_idNew" placeholder="游戏ID" class="handle-input mr10"></el-input>
              </el-form-item>
              <el-form-item label="game_name :">
                  <el-input v-model="game_nameNew" placeholder="游戏名字" class="handle-input mr10"></el-input>
              </el-form-item>
              <el-form-item label="rate :">
                  <el-input v-model="rate" placeholder="倍率" class="handle-input mr10"></el-input>
              </el-form-item>

              <el-form-item label="vendor :">
                  <el-select v-model="vendorNew" clearable placeholder="供应商">
                    <el-option
                      v-for="item in optionsVendor"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item label="em_type :">
                  <el-select v-model="em_typeNew" clearable placeholder="游戏类型">
                    <el-option
                      v-for="item in emType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

          </el-form>

          <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addGame">确 定</el-button>
          </span>
      </el-dialog>


      <el-dialog
          title="修改参数"
          :visible.sync="centerDialogVisibleChange"
          width="30%"
          center>
      

          <el-form ref="form"  label-width="100px">

              <el-form-item label="game_id :">
                  <el-input  v-model="game_idChange" placeholder="游戏ID" class="handle-input mr10"></el-input>
              </el-form-item>
              <el-form-item label="game_name :">
                  <el-input v-model="game_nameChange" placeholder="游戏名字" class="handle-input mr10"></el-input>
              </el-form-item>
              <el-form-item label="rate :">
                  <el-input v-model="rateChange" placeholder="倍率" class="handle-input mr10"></el-input>
              </el-form-item>

              <el-form-item label="vendor :">
                  <el-select v-model="vendorChange" clearable placeholder="供应商">
                    <el-option
                      v-for="item in optionsVendor"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item label="em_type :">
                  <el-select v-model="em_typeChange" clearable placeholder="游戏类型">
                    <el-option
                      v-for="item in emType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item label="status :">
                  <el-select v-model="status" clearable placeholder="状态">
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

          </el-form>

          <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisibleChange = false">取 消</el-button>
              <el-button type="primary" @click="updateGame">确 定</el-button>
          </span>
      </el-dialog>


      

    <div class="animated fadeInDown">
      <el-row class="breadcrumb">
        <el-col :span="4"><h3>游戏中心</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>游戏中心</el-breadcrumb-item>
            <el-breadcrumb-item>类型管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      

      <div class="addPadding">

        <div class="user_header">

          <el-input v-model="game_id" placeholder="游戏ID"></el-input>

          <el-input v-model="game_name" placeholder="游戏名字"></el-input>

          <el-select v-model="vendor" clearable placeholder="供应商">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="em_type" clearable placeholder="游戏类型">
            <el-option
              v-for="item in emType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-date-picker
            v-model="timeArr"
            type="daterange"
            range-separator="至"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :clearable="false"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

          <el-button style="float: right;margin-right: 2%" type="primary" @click="centerDialogVisible=true">新增产品</el-button>

          <el-button type="primary" @click="sendCharge">搜索</el-button>

          <el-button style="float: right;margin-right: 1%" type="warning" @click="setRate">刷新倍率</el-button>

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
              prop="vendor"
              label="供应商">
            </el-table-column>
            <el-table-column
              prop="game_id"
              label="游戏ID">
            </el-table-column>
            <el-table-column
              prop="game_name"
              label="游戏名字">
            </el-table-column>
            <el-table-column
              prop="em_type"
              label="游戏类型">
            </el-table-column>
            <el-table-column
              :formatter="isStatus"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="rate"
              label="产品倍率">
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
                             @click="deleteFun(scope.$index, scope.row)">停用
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

        </div>

        <!-- <div class="pageBox" v-show="totalRecords>10">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="totalRecords">
          </el-pagination>
        </div> -->

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
        statusOptions:[
          {
            value: '0',
            label: '在线'
          },
          {
            value: '1',
            label: '已下线'
          },
        ],
        options: [
          {
            value: 'all',
            label: 'all'
          },
          {
            value: 'hub88',
            label: 'hub88'
          },
          {
            value: 'em',
            label: 'em'
          },
        ],
        optionsVendor:[
          {
            value: 'hub88',
            label: 'hub88'
          },
          {
            value: 'em',
            label: 'em'
          },
        ],
        emType: [
          {
            value: 'slots',
            label: 'slots'
          },
          {
            value: 'table',
            label: 'table'
          },
          {
            value: 'live',
            label: 'live'
          },
        ],
       
        tableData: [],
        ChangeCheckStatus: '',//修改用户信息下拉值
        NewChangeCheckStatus:'',//新建用户信息下拉值
        userIdMask: '',//ID
        name: '',//客户名
        vendor: '', //vendor
        em_type:'',//em_type
        game_id:'',//game_id
        game_name:'',//game_name
        timeArr:[],//时间选项
        
        dialogFormVisible: false,//修改
        limit: '', //每页条数 默认20
        
        totalRecords: 0,//总页数
        page: 1,//当前页码
        logins: false,
        open_off: false,
        centerDialogVisible: false,
        centerDialogVisibleChange: false,

        vendorNew: '', //vendorNew
        em_typeNew:'',//em_typeNew
        game_idNew:'',//game_idNew
        game_nameNew:'',//game_nameNew
        rate:'',

        vendorChange: '', //vendorNew
        em_typeChange:'',//em_typeNew
        game_idChange:'',//game_idNew
        game_nameChange:'',//game_nameNew
        rateChange:'',
        id:'',
        status:''
      }
    },
    mounted() {
      // this.test();
    },
    methods: {

      setRate(){
        let url = this.ApiUrl + '/supply/setRate'
        this.$http({
          method: 'post',
          url: url,
          
        }).then((response) => {
          if (response.status == 200) {
              this.$notify({
                title: '刷新成功',
                message: '这是一条成功的提示消息',
                type: 'success'
              });
              
              this.sendCharge();
            }
            else {
              this.$message.error(response.statusText);
            }
          
        }).catch((error) => {
          console.log(error);
        });
      },

      addGame(){

        let url = this.ApiUrl + '/supply/addGame'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            vendor: this.vendorNew,
            em_type:this.em_typeNew,
            game_id:this.game_idNew,
            game_name:this.game_nameNew,
            rate:this.rate
          })
        }).then((response) => {
          if (response.status == 200) {
              this.$notify({
                title: '新增成功',
                message: '这是一条成功的提示消息',
                type: 'success'
              });
              this.centerDialogVisible = false;
              this.sendCharge();
            }
            else {
              this.$message.error(response.statusText);
            }
          // if (response.data.code == 0) {
          //   this.logins = false;
          //   this.tableData = response.data.data.data;
          //   this.totalRecords = response.data.data.totalCount;
          // } else {
          //   if (response.data.code == '403') {
          //     this.Signout();
          //   }
          //   this.$message.error(response.data.msg);
          // }
        }).catch((error) => {
          console.log(error);
        });

      },

      updateGame(){

        let url = this.ApiUrl + '/supply/updateGame'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            vendor: this.vendorChange,
            em_type:this.em_typeChange,
            game_id:this.game_idChange,
            game_name:this.game_nameChange,
            rate:this.rateChange,
            id:this.id,
            status:this.status
          })
        }).then((response) => {
          if (response.status == 200) {
              this.$notify({
                title: '修改成功',
                message: '这是一条成功的提示消息',
                type: 'success'
              });
              this.centerDialogVisibleChange = false;
              this.sendCharge();
            }
            else {
              this.$message.error(response.statusText);
            }
          
        }).catch((error) => {
          console.log(error);
        });

      },

      //赋值参数
      getUserId(index,row){

        this.vendorChange = row.vendor;
        this.em_typeChange = row.em_type;
        this.game_idChange = row.game_id;
        this.game_nameChange = row.game_name;
        this.rateChange = row.rate;
        this.status = row.status;
        this.id = row.id;
        this.centerDialogVisibleChange = true;


        console.log(row.em_type)

      },

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
        let url = this.ApiUrl + '/supply/list'
        this.$http({
          method: 'get',
          url: url,      
          params: {
            vendor:this.vendor,
            em_type:this.em_type,
            game_id:this.game_id,
            game_name:this.game_name
          }
        }).then((response) => {
          if (response.status == 200) {
            this.logins = false;
            let list = [];
            for(var i in response.data.data){
                list.push(response.data.data[i]);
            }
            this.tableData = list;
            // this.totalRecords = response.data.data.totalCount;
          } else {
            if (response.data.code == '403') {
              this.Signout();
            }
            this.$message.error(response.statusText);

            
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
          let url = this.ApiUrl + '/supply/offlineGame'
          this.$http({
            method: 'get',
            url: url,      
            params: {
              id:row.id
            }
          }).then((response) => {
            if (response.status == 200) {
              this.$notify({
                title: '删除成功',
                message: '这是一条成功的提示消息',
                type: 'success'
              });
              this.sendCharge();
            }
            else {
              this.$message.error(response.statusText);
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
      //判断审核状态
      isStatus(status) {
        if(status.status==0){
          return '在线'
        }else{
          return '已下线'
        }
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
