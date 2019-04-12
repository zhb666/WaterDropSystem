<template>
  <div class="user">

    <!--<el-dialog style="width: 1200px;margin: 0 auto;" title="升级为商户" :visible.sync="dialogFormVisible">-->

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

    <el-dialog style="width: 1200px;margin: 0 auto;" title="升级为商户" :visible.sync="dialogFormVisible">

      <el-radio-group v-model="merchantType">
        <el-radio :label="1">OTC商户</el-radio>
        <!--<el-radio :label="2">游戏商户</el-radio>-->
        <el-radio :label="2">支付商户</el-radio>
      </el-radio-group>

      <div style="margin: 20px auto"></div>

      <el-form label-width="120px" v-if="merchantType==1">
        <el-form-item label="商户账户名 : ">
          <el-input v-model="merchantName" placeholder="商户账户名"></el-input>
        </el-form-item>
      </el-form>

      <el-form label-width="120px" v-if="merchantType==2">
        <el-form-item label="商户账户名 : ">
          <el-input v-model="merchantName" placeholder="商户账户名"></el-input>
        </el-form-item>
        <el-form-item label="银行卡费率(%) : ">
          <el-input v-model="bankRate" placeholder="银行卡收款费率"></el-input>
        </el-form-item>
        <el-form-item label="微信费率(%) : ">
          <el-input v-model="weChatPayRate" placeholder="微信支付收款费率"></el-input>
        </el-form-item>
        <el-form-item label="支付宝费率(%) : ">
          <el-input v-model="aliPayRate" placeholder="支付宝收款费率"></el-input>
        </el-form-item>
      </el-form>

      <el-form label-width="120px" v-if="merchantType==3">
        <el-form-item label="商户账户名 : ">
          <el-input v-model="merchantName" placeholder="商户账户名"></el-input>
        </el-form-item>
        <el-form-item label="银行卡费率(%) : ">
          <el-input v-model="bankRate" placeholder="银行卡收款费率"></el-input>
        </el-form-item>
        <el-form-item label="微信费率(%) : ">
          <el-input v-model="weChatPayRate" placeholder="微信支付收款费率"></el-input>
        </el-form-item>
        <el-form-item label="支付宝费率(%) : ">
          <el-input v-model="aliPayRate" placeholder="支付宝收款费率"></el-input>
        </el-form-item>
      </el-form>


      <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendAgent()">保 存</el-button>
      </div>
    </el-dialog>

    <div class="animated fadeInDown">

      <el-row class="breadcrumb">
        <el-col :span="4"><h3>用户管理</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>账户中心</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <div class="addPadding">

        <div class="user_header">
          <el-input v-model="userId" placeholder="UID"></el-input>
          <el-input v-model="userName" placeholder="用户名"></el-input>

          <el-select v-model="regPlatForm" clearable placeholder="来源">
            <el-option
              v-for="item in regPlatFormList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-date-picker
            v-model="dateTime"
            type="datetimerange"
            range-separator="至"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

          <el-input v-model="inviteUserId" placeholder="上级ID"></el-input>

          <el-select v-model="status" clearable placeholder="选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-tooltip content="搜索" placement="right" effect="light">
            <el-button type="primary" icon="el-icon-search" @click="statusData(1)"></el-button>
          </el-tooltip>

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
              prop="createTime"
              width="200px"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="userId"
              width="126px"
              label="用户ID">
            </el-table-column>
            <el-table-column
              width="250px"
              prop="nickName"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="name"
              :formatter="isName"
              width="130px"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="specificIdentity"
              width="130px"
              label="身份">
            </el-table-column>
            <el-table-column
              prop="regPlatForm"
              :formatter="regPlatFormFun"
              label="来源">
            </el-table-column>
            <el-table-column
              prop="inviteUserId"
              width="130px"
              label="上级UID">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column label="操作" width="380">
              <template slot-scope="scope">
                <el-tooltip content="查看" placement="right" effect="light">
                  <el-button size="mini" type="primary" icon="fa fa-eye"
                             @click="handleEdit(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip content="二维码" placement="right" effect="light">
                  <el-button size="mini" type="primary" icon="fa fa-qrcode"
                             @click="seeErweima(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-button size="mini" :disabled="isReviewed(scope.row)" type="success"
                           @click="getUserId(scope.$index, scope.row)"> 升级商户
                </el-button>
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

        <div class="openErweima" v-if="openerweima">

          <div class="clone_x" @click="clone_fun">关闭</div>

          <div class="openErweima_main animated slideInLeft">
            <h2>推广中心</h2>
            <img :src="imgURl" alt="" class="erweima">
            <h3>个人推广二维码</h3>
            <h4>个人推广邀请码：{{gerenInviteCode}}</h4>
          </div>

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
        options: [
          {
            value: '1',
            label: '正常'
          },
          {
            value: '4',
            label: '禁用'
          },
        ],
        regPlatFormList: [
          {
            value: '1',
            label: 'web'
          },
          {
            value: '2',
            label: 'ios'
          },
          {
            value: '3',
            label: 'Android'
          }
        ],
        tableData: [],
        userId: '',//用户id
        userName: '',//用户名
        regPlatForm: '',//来源
        identity: '',//身份 1:用户 2:商户
        start: '',//开始时间
        end: '',//结束时间
        dateTime: [],
        inviteUserId: '',//上级UID
        status: '',//状态 1:正常 2:禁止登陆 3:冻结交易 4:禁用
        limit: '',//每页显示记录数
        page: 1,//当前页码
        imgURl: '',//二维码图片路径
        logins: false,//加载状态
        merchantName: '',//商户账户名
        bankRate: '',//银行卡支付费率
        aliPayRate: '',//支付宝支付费率
        weChatPayRate: '',//微信支付费率
        openerweima: false,//打开二维码
        gerenInviteCode: '',//个人邀请码
        dialogFormVisible: false,//开通商户
        agent: [],//代理商列表
        Advertisement: [
          {
            value: '1',
            label: '开启'
          },
          {
            value: '0',
            label: '关闭'
          },
        ],//开启true 关闭true
        Remarks: '',//备注
        AdvertisementID: '',//广告功能选择
        agentID: '',//代理商ID
        merchantType: 1,//商户类型
        userIdMask: '',//用户ID
        totalRecords: 0,//总页数
      }
    },
    mounted() {
      this.statusData();
      // this.agent_Fun();
      // this.Signout();
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        //判断时间格式
        if (!this.dateTime) {
          this.dateTime = []
        }
        let url = this.ApiUrl + '/api/user/userList'
        this.logins = true;
        this.$http({
          method: 'get',
          url: url,
          params: {
            userId: this.userId,//用户id
            nickName: this.userName,
            regPlatForm: this.regPlatForm,//用户名
            identity: '',//身份 1:用户 2:商户
            start: this.dateTime[0],//开始时间
            end: this.dateTime[1],//结束时间
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
            if (response.data.code == '403') {
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });

      },
      handleEdit(index, row) {
        this.$router.push({path: '/userDetails', query: {id: row.userId}})
      },
      getUserIdBill(index, row) {
        this.$router.push({path: '/userBill', query: {id: row.userId}})
      },
      //二维码图片
      seeErweima(index, row) {
        this.openerweima = true;
        let url = this.ApiUrl + '/api/user/createQrcode?inviteCode='
        this.imgURl = url + row.inviteCode;
        this.gerenInviteCode = row.inviteCode;
      },
      statusData(num) {
        //判断有没有参数，有的话是搜索，要把页数清零
        if (num) {
          this.page = 0;
        }
        //判断时间格式
        if (!this.dateTime) {
          this.dateTime = []
        }
        let url = this.ApiUrl + '/api/user/userList'
        this.logins = true;
        this.$http({
          method: 'get',
          url: url,
          params: {
            userId: this.userId,//用户id
            nickName: this.userName,
            regPlatForm: this.regPlatForm,//用户名
            identity: '',//身份 1:用户 2:商户
            start: this.dateTime[0],//开始时间
            end: this.dateTime[1],//结束时间
            inviteUserId: this.inviteUserId,//上级UID
            status: this.status,//状态 1:正常 2:禁止登陆 3:冻结交易 4:禁用
            limit: '10',//每页显示记录数
            page: this.page//当前页码
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
      //关闭二维码遮罩
      clone_fun() {
        this.openerweima = false;
      },
      //获取供应商
      agent_Fun() {
        let url = this.ApiUrl + '/api/user/getAgents'
        this.$http({
          method: 'get',
          url: url,
          params: {}
        }).then((response) => {
          if (response.data.success == true) {
            this.agent = response.data.payload;
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });

      },
      //开通商户
      sendAgent() {

        if (this.merchantName == '') {
          this.$notify.error({
            title: '错误',
            message: '请填写用户名'
          });
          return
        }

        if(this.merchantType==2 || this.merchantType ==3){


          if (this.bankRate < 0 || this.bankRate == '') {
            this.$notify.error({
              title: '错误',
              message: '银行费率不能小于0'
            });
            return
          } else if (this.aliPayRate < 0 || this.aliPayRate == '') {
            this.$notify.error({
              title: '错误',
              message: '支付宝率不能小于0'
            });
            return
          }
          else if (this.weChatPayRate < 0 || this.weChatPayRate == '') {
            this.$notify.error({
              title: '错误',
              message: '微信费率率不能小于0'
            });
            return
          }
        }

        let url = this.ApiUrl + '/api/user/upgradeMerchant'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            merchantName:this.merchantName,
            merchantType:this.merchantType,
            bankRate:this.bankRate,
            aliPayRate:this.aliPayRate,
            weChatPayRate:this.weChatPayRate,
            userId: this.userIdMask,
            // agentsId: this.agentID,
            // adStatus: this.AdvertisementID,
            // remark: this.Remarks
          })
        }).then((response) => {
          if (response.data.success == true) {
            this.$notify({
              title: '开通商户成功',
              message: '这是一条成功的提示消息',
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.merchantName = '';
            this.merchantType = 1;
            this.bankRate = '';
            this.aliPayRate = '';
            this.weChatPayRate = '';
            this.statusData();
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
      getUserId(index, row) {
        this.dialogFormVisible = true;
        this.userIdMask = row.userId;
      },

      //判断状态
      isReviewed(Reviewed) {
        if (Reviewed.identity == '商户') {
          return true
        } else {
          return false
        }
      },
      //判断审核状态
      isName(Reviewed) {
        if (Reviewed.name == '') {
          return '未认证'
        } else {
          return Reviewed.name
        }
      },
      //判断状态
      regPlatFormFun(Reviewed) {
        if (Reviewed.regPlatForm == 1) {
          return 'web'
        }
        else if (Reviewed.regPlatForm == 2) {
          return 'ios'
        }
        else {
          return 'Android'
        }
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
    .el-input {
      width: 80%;
    }
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

  .el-radio__input {
    .el-radio__label {
      color: white;
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
