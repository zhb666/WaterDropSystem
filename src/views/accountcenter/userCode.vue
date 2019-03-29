<template>
  <div class="user">

    <el-dialog title="选择不通过的理由" :show-close="false" :visible.sync="dialogVisible">

      <div class="Reason_box" v-for="(key,item) in cancelArror" :key="item">
        <el-radio v-model="radio" :label="item">{{key}}</el-radio>
      </div>

      <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click="Reason_fun">确定</el-button>
        <el-button @click="cancel_fun">取 消</el-button>
      </div>
    </el-dialog>

    <!--备注-->
    <el-dialog title="选择备注" :show-close="false" :visible.sync="RemarksVisible">

      <div class="Reason_box" v-for="(key,item) in RemarksArron" :key="item">
        <el-radio v-model="RemarksValue" :label="key.value">{{key.label}}</el-radio>
      </div>

      <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click="Remarks_fun">确定</el-button>
        <el-button @click="RemarksVisible_cancel">取 消</el-button>
      </div>
    </el-dialog>

    <div class="animated fadeInDown">

      <el-row class="breadcrumb">
        <el-col :span="4"><h3>身份审核</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>账户中心</el-breadcrumb-item>
            <el-breadcrumb-item>身份审核</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <div class="addPadding">

        <div class="user_header">
          <el-input v-model="userId" placeholder="用户ID"></el-input>
          <el-input v-model="nickName" placeholder="用户名"></el-input>

          <el-date-picker
            v-model="dateTime"
            type="datetimerange"
            range-separator="至"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

          <el-select v-model="status" clearable placeholder="选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-autocomplete
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="选择国籍"
            @select="handleSelect"
          ></el-autocomplete>

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
              prop="userId"
              width="130px"
              label="用户ID">
              <template slot-scope="scope">
                <span v-html="getUserId(scope.row)"></span>
                <el-tooltip v-if="RemarksIcon_fun(scope.row).off" :content="RemarksIcon_fun(scope.row).text" placement="top" effect="light">
                  <i :class="RemarksIcon_fun(scope.row).icon" :style="RemarksIcon_fun(scope.row).color"></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="username"
              width="200px"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="stateDesc"
              width="100px"
              label="国籍">
            </el-table-column>
            <el-table-column
              prop="name"
              width="100px"
              label="姓名">
            </el-table-column>
            <el-table-column
              width="210px"
              prop="idCardNo"
              label="证件号码">
            </el-table-column>
            <el-table-column
              width="320px"
              label="手持照片">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="getImg(1,scope.row)">人像面</el-button>
                <el-button size="mini" type="primary" @click="getImg(3,scope.row)">国徽面</el-button>
                <el-button size="mini" type="primary" @click="getImg(2,scope.row)">手持照</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              width="180px"
              label="提交时间">
            </el-table-column>
            <el-table-column
              prop="checkStatusDesc"
              label="状态">
            </el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <el-tooltip content="审核通过" placement="bottom" effect="light">
                  <el-button size="mini" :disabled="isReviewed(scope.row)" type="primary" icon="el-icon-check"
                             @click="ToexamineIMG(3, scope.row,'此操作将审核通过, 是否继续?')">
                  </el-button>
                </el-tooltip>
                <el-tooltip content="不通过" placement="bottom" effect="light">
                  <el-button size="mini" :disabled="isReviewed(scope.row)" type="danger" icon="el-icon-close"
                             @click="openMask_dialogVisible(scope.row)">
                  </el-button>
                </el-tooltip>
                <el-tooltip content="备注" placement="bottom" effect="light">
                  <el-button size="mini" @click="openMask_fun(scope.row)" type="warning">备注</el-button>
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

        <div class="openErweima animated fadeInDown" v-show="openerweima">
          <div class="clone_x" @click="clone_fun">关闭</div>
          <div class="openErweima_main">
            <h2>{{kycTitle}}</h2>
            <div class="textListnamr">
              <span>姓名 : {{xingmin}}</span>
              <span>身份证 : {{shenfenzhen}}</span>
              <span>国籍 : {{guojihaoma}}</span>
            </div>
            <img :src="imgURl" alt="" class="erweima" id="erweima">
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: "userCode",
    data() {
      return {
        options: [
          {
            value: '2',
            label: '审核中'
          },
          {
            value: '3',
            label: '审核通过'
          },
          {
            value: '4',
            label: '审核不通过'
          },
        ],
        tableData: [],
        userId: '',//用户id
        nickName: '',//用户名
        identity: '',//身份 1:用户 2:商户
        start: '',//开始时间
        end: '',//结束时间
        dateTime: [],
        inviteUserId: '',//上级UID
        status: '',//状态 1:正常 2:禁止登陆 3:冻结交易 4:禁用
        limit: '',//每页显示记录数
        page: 1,//当前页码
        imgURl: '',//图片路径
        logins: false,//加载状态
        openerweima: false,//打开二维码
        dialogFormVisible: false,//开通商户
        Advertisement: [
          {
            value: 'true',
            label: '开启'
          },
          {
            value: 'false',
            label: '关闭'
          },
        ],//开启true 关闭true
        Remarks: '',//备注
        AdvertisementID: '',//广告功能选择
        userIdMask: '',//用户ID
        totalRecords: 0,//总页数
        kycFaceUrl: '',// 身份证人像面图片url
        kycNationalUrl: '', // 身份证国徽面图片url
        kycHandUrl: '',// 手持身份证图片url
        kycTitle: '',//身份证标题
        state: '',//国籍编号
        xingmin: '',//展示的姓名
        guojihaoma: '',//展示的国籍
        shenfenzhen: '',//展示的身份证
        dialogVisible: false,//开启审核失败弹窗
        radio: '',//选择不通过的条件
        listDeleteNum: '',//审核不成功是哪行
        cancelArror: [],//不通过理由
        restaurants: [],
        state1: '',
        RemarksArron: [
          {
            value: '1',
            label: '正常'
          },
          {
            value: '2',
            label: '羊毛'
          },
          {
            value: '3',
            label: 'ps痕迹'
          },
          // {
          //   value: '9',
          //   label: '其它'
          // },
        ],//备注理由
        RemarksVisible: false,//备注弹框开关
        RemarksValue: '',//备注理由
        maskID:'',//弹框ID
      }
    },
    mounted() {
      this.statusData();
      this.getGuoji();
      this.getAllKycFailList();
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        //判断时间格式
        if (!this.dateTime) {
          this.dateTime = []
        }
        let url = this.ApiUrl + '/api/UserIdentityReview/userIdentityLists'
        this.logins = true;
        this.$http({
          method: 'get',
          url: url,
          params: {
            userId: this.userId,//用户id
            username: this.nickName,//用户名
            state: this.state,//国籍
            start: this.dateTime[0],//开始时间
            end: this.dateTime[1],//结束时间
            checkStatus: this.status,//状态
            limit: '10',//每页显示记录数
            page: val//当前页码
          }
        }).then((response) => {
          if (response.data.success == true) {
            this.tableData = response.data.payload.data;
            this.totalRecords = response.data.payload.totalRecords;
            this.logins = false;
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
      handleEdit(index, row) {
        this.$router.push({path: '/userDetails', query: {id: row.userId}})
      },
      statusData(num) {
        //判断有没有参数，有的话是搜索，要把页数清零
        if (num) {
          this.page = 1;
        }

        //判断有没有输入国籍
        if (this.state1 == '') {
          this.state = '';
        }
        //判断时间格式
        if (!this.dateTime) {
          this.dateTime = []
        }
        let url = this.ApiUrl + '/api/UserIdentityReview/userIdentityLists'
        this.logins = true;
        this.$http({
          method: 'get',
          url: url,
          params: {
            userId: this.userId,//用户id
            username: this.nickName,//用户名
            state: this.state,//国籍
            start: this.dateTime[0],//开始时间
            end: this.dateTime[1],//结束时间
            checkStatus: this.status,//状态
            limit: '10',//每页显示记录数
            page: this.page//当前页码
          }
        }).then((response) => {
          if (response.data.success == true) {
            this.tableData = response.data.payload.data;
            this.totalRecords = response.data.payload.totalRecords;
            this.logins = false;
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
      //关闭二维码遮罩
      clone_fun() {
        this.openerweima = false;
      },
      //审核是否通过
      ToexamineIMG(num, row, text) {
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.ApiUrl + '/api/UserIdentityReview/review'
          this.$http({
            method: 'post',
            url: url,
            data: qs.stringify({
              id: row.id,
              checkStatus: num
            })
          }).then((response) => {
            if (response.data.success == true) {
              this.$notify({
                title: '审核成功',
                message: '',
                type: 'success'
              });
              this.statusData();
            } else {
              if (response.data.error.code == '403') {
                this.Signout();
              }
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
      //审核不通过
      Reason_fun() {
        if (this.radio == '') {
          this.$message({
            type: 'info',
            message: '请选择失败原因'
          });
          return false
        }
        let url = this.ApiUrl + '/api/UserIdentityReview/review'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            id: this.listDeleteNum,
            checkStatus: 4,
            failReason: this.radio
          })
        }).then((response) => {
          if (response.data.success == true) {
            this.$notify({
              title: '审核成功',
              message: '',
              type: 'success'
            });
            this.statusData();
            this.dialogVisible = false;
            this.radio = '';
          } else {
            if (response.data.error.code == '403') {
              this.Signout();
            }
            this.dialogVisible = false;
            this.radio = '';
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      //开启审核失败弹窗
      openMask_dialogVisible(row) {
        this.dialogVisible = true;
        this.listDeleteNum = row.id;
      },
      //取消审核
      cancel_fun() {
        this.dialogVisible = false;
        this.radio = '';
        this.$message({
          type: 'info',
          message: '已取消审核'
        });
      },
      //下拉搜索可以输入国籍
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //国籍选中会触发
      handleSelect(item) {
        this.state = item.address;
      },
      //获取国籍下拉
      getGuoji() {
        let url = this.ApiUrl + '/api/UserIdentityReview/citizenshipList'
        this.logins = true;
        this.$http({
          method: 'get',
          url: url,
          params: {}
        }).then((response) => {
          if (response.data.success == true) {
            this.restaurants = response.data.payload;
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      //获取审核不通过理由
      getAllKycFailList() {
        let url = this.ApiUrl + '/api/UserIdentityReview/allKycFailList'
        this.logins = true;
        this.$http({
          method: 'get',
          url: url,
          params: {}
        }).then((response) => {
          if (response.data.success == true) {
            this.cancelArror = response.data.payload;
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      //显示图片img
      isIMG(num, Reviewed) {
        if (num == 1) {
          return Reviewed.kycFaceUrl
        } else if (num == 2) {
          return Reviewed.kycHandUrl
        } else {
          return Reviewed.kycNationalUrl
        }
      },
      //点击获取身份证照片url
      getImg(num, Reviewed) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let imgKey = '';
        this.xingmin = Reviewed.name;
        this.guojihaoma = Reviewed.stateDesc;
        this.shenfenzhen = Reviewed.idCardNo;
        if (num == 1) {
          imgKey = Reviewed.kycFaceUrl;
          this.kycTitle = '身份证人像面图片';
        } else if (num == 2) {
          imgKey = Reviewed.kycHandUrl;
          this.kycTitle = '手持身份证图片';
        } else {
          imgKey = Reviewed.kycNationalUrl;
          this.kycTitle = '身份证国徽面图片';
        }
        let url = this.ApiUrl + '/api/UserIdentityReview/IdCard'
        this.$http({
          method: 'get',
          url: url,
          params: {
            key: imgKey
          }
        }).then((response) => {
          if (response.data.success == true) {
            this.openerweima = true;
            this.imgURl = 'data:image/jpeg;base64,' + response.data.payload.imgObj;
            loading.close();
          } else {
            if (response.data.error.code == '403') {
              this.Signout();
            }
            if (response.data.success == false) {
              this.openerweima = false;
              loading.close();
              this.$message.error('图片读取失败！');
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      //判断审核状态
      isReviewed(Reviewed) {
        if (Reviewed.checkStatus == 2) {
          return false
        } else {
          return true
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
      //获取用户ID
      getUserId(row) {
        return row.userId
      },
      //打开备注弹框
      openMask_fun(row){
        this.RemarksVisible = true;
        this.maskID = row.userId
        this.RemarksValue = row.userMark;
      },
      //关闭备注弹窗
      RemarksVisible_cancel(){
        this.RemarksVisible = false;
        this.RemarksValue = '';
      },
      //备注请求
      Remarks_fun() {
        let url = this.ApiUrl + '/api/user/userMark'
        this.$http({
          method: 'get',
          url: url,
          params: {
            userId: this.maskID,
            mark:this.RemarksValue
          }
        }).then((response) => {
          if (response.data.success == true) {
            this.$notify({
              title: '备注成功',
              message: '',
              type: 'success'
            });
            this.RemarksVisible = false;
            this.statusData();
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
      //处理备注图标
      RemarksIcon_fun(row){
        if(row.userMark==1){
          return {
            off:false,
          }
        }
        else if(row.userMark==2){
          return {
            off:true,
            icon:'el-icon-question',
            text:'羊毛党',
            color:'color:#e6a23c;'
          }
        }
        else if(row.userMark==3){
          return {
            off:true,
            icon:'el-icon-warning',
            text:'ps痕迹',
            color:'color:#f56c6c;'
          }
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
    .user_header {
      width: 100%;
      height: auto;
      padding: 0 0 10px 0;
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
    background: rgba(0, 0, 0, .6);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10000;
    .clone_x {
      position: fixed;
      right: 50px;
      top: 0;
      color: #fff;
      font-size: 30px;
      cursor: pointer;
    }
    .openErweima_main {
      /*width: 800px;*/
      /*height: 600px;*/
      /*max-height: 600px;*/
      /*background: #fff;*/
      margin: 2%;
      text-align: center;
      border-radius: 8px;
      overflow: hidden;
      h2, h3, h4 {
        margin-top: 20px;
        color: white;
      }
      .textListnamr {
        color: white;
        margin-top: 20px;
        span {
          margin-left: 20px;
        }
      }
      .erweima {
        width: 85%;
        height: 70%;
        margin: 20px 0;
        background-size: cover;
      }
    }
  }
  .imgSize {
    width: 56px;
    height: 30px;
    float: left;
    margin-left: 20px;
    cursor: pointer;
  }
  .mouse-cover-canvas {
    width: 300px !important;
    height: 200px !important;
    right: 0 !important;
  }
  .Reason_box {
    margin-bottom: 20px;
  }
  .el-radio {
    color: white;
  }
</style>
