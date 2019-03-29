<template>
  <div class="userDetails">

    <div class="userDetails_main">
      <el-dialog title="选择代理商" :visible.sync="dialogFormVisible">
        <el-select v-model="titleShang" placeholder="选择代理商">
          <el-option
            v-for="item in agents"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
        <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendGongyingshang">保存</el-button>
        </div>
      </el-dialog>

      <!--修改信息-->
      <el-dialog title="修改信息" :visible.sync="Revisenotes">

        <el-form label-width="120px" v-if="merchantType==1">
          <el-form-item label="商户账户名 : ">
            <el-input v-model="merchantNameValue" placeholder="填写商户账户名"></el-input>
          </el-form-item>
        </el-form>

        <el-form label-width="120px" v-if="merchantType==2">
          <el-form-item label="商户账户名 : ">
            <el-input v-model="merchantNameValue" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="银行卡费率(%) : ">
            <el-input v-model="bankRateValue" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="微信费率(%) : ">
            <el-input v-model="weChatPayRateValue" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="支付宝费率(%) : ">
            <el-input v-model="aliPayRateValue" placeholder=""></el-input>
          </el-form-item>
        </el-form>

        <el-form label-width="120px" v-if="merchantType==3">
          <el-form-item label="商户账户名 : ">
            <el-input v-model="merchantNameValue" placeholder="填写商户账户名"></el-input>
          </el-form-item>
          <el-form-item label="银行卡费率(%) : ">
            <el-input v-model="bankRateValue" placeholder="填写银行卡收款费率"></el-input>
          </el-form-item>
          <el-form-item label="微信费率(%) : ">
            <el-input v-model="weChatPayRateValue" placeholder="填写微信支付收款费率"></el-input>
          </el-form-item>
          <el-form-item label="支付宝费率(%) : ">
            <el-input v-model="aliPayRateValue" placeholder="填写支付宝收款费率"></el-input>
          </el-form-item>
        </el-form>

        <div slot="" class="dialog-footer" style="margin-top: 20px;text-align: right">
          <el-button @click="Revisenotes = false">取 消</el-button>
          <el-button type="primary" @click="Revisenotes_fun">保存</el-button>
        </div>
      </el-dialog>

      <div class="animated fadeInDown">
        <el-row class="breadcrumb">
          <el-col :span="4"><h3>用户详情</h3></el-col>
          <el-col :span="20">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>财务中心</el-breadcrumb-item>
              <el-breadcrumb-item>用户详情</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>

        <!--<el-tag>用户信息</el-tag>-->
        <div class="colorBack">
          <h3 class="userDetails_title">用户信息</h3>
          <p class="biaoqian">UID : {{userId}} </p>
          <p class="biaoqian">用户名 : {{nickName}}</p>
          <p class="biaoqian">头像</p>
          <img class="kuangao" :src="avatar" alt="">
          <p class="biaoqian">注册时间 : {{createTime}}</p>
          <p class="biaoqian">上级用户UID : {{inviteUserId}} </p>

          <h3 class="userDetails_title">认证资料</h3>
          <p class="biaoqian">手机号 : {{phone}} </p>
          <p class="biaoqian">邮箱 : {{email}}</p>
          <p class="biaoqian">真实姓名 : {{name}}</p>
          <p class="biaoqian">证件号码 : {{idCardNo}} </p>
          <p class="biaoqian">银行卡 : {{cardNo}}</p>

          <h3 class="userDetails_title">个人推广中心</h3>
          <p class="biaoqian">推广二维码 :<br>
            <img :src="imgURl" alt="" class="erweima">
          </p>
          <p class="biaoqian">推广邀请码 : {{inviteCode}}</p>
          <!--<p class="biaoqian">推广链接 : https://trans.becent.cc/#/register?invite_code={{inviteCode}}</p>-->
          <!--<p class="biaoqian">推广状态:-->
          <!--<el-switch-->
          <!--v-model="inviteCodeSwitch"-->
          <!--active-text="开启"-->
          <!--@change="tuiguangFun('inviteCodeSwitch')"-->
          <!--inactive-text="关闭">-->
          <!--</el-switch>-->
          <!--</p>-->

          <h3 class="userDetails_title">资产状况</h3>
          <p class="biaoqian">用户状态:
            <el-switch
              v-model="status"
              active-text="正常"
              @change="tuiguangFun('status')"
              inactive-text="冻结">
            </el-switch>
          </p>

          <p class="biaoqian">谷歌验证状态:
            <el-switch
              v-model="goolgeStatus"
              active-text="已绑定"
              @change="googleFun()"
              :disabled="googleBoolen"
              inactive-text="未绑定">
            </el-switch>
          </p>

          <div class="off_shangjia" v-if="merchantType">
            <h3 class="userDetails_title">商户信息</h3>
            <p class="biaoqian">开通商户时间 : {{merCreateAd}} </p>
            <p class="biaoqian">商户名称 : {{merchantName}} </p>

            <p class="biaoqian" v-show="merchantType == 1">商户类型 : OTC商家 </p>
            <p class="biaoqian" v-show="merchantType == 2">商户类型 : 支付商户 </p>
            <!--<p class="biaoqian" v-show="merchantType == 3">商户类型 : 代充商家 </p>-->

            <div v-show="merchantType != 1">
              <p class="biaoqian">银行卡支付费率 : {{bankRate + '%'}} </p>
              <p class="biaoqian">支付宝支付费率 : {{aliPayRate +'%'}} </p>
              <p class="biaoqian">微信支付费率 : {{weChatPayRate +'%'}} </p>
            </div>

            <p v-if="merchantType == 1" class="biaoqian">广告功能:
              <el-switch
                v-model="adStatus"
                active-text="开启"
                @change="adStatusFun()"
                inactive-text="关闭">
              </el-switch>
            </p>
            <!--<p class="biaoqian">代理商 : {{merchantsname}}-->
            <!--<el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"></el-button>-->
            <!--&lt;!&ndash;<el-popover&ndash;&gt;-->
            <!--&lt;!&ndash;placement="top"&ndash;&gt;-->
            <!--&lt;!&ndash;width="400"&ndash;&gt;-->
            <!--&lt;!&ndash;trigger="click">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-input v-model="dailishangmingcheng" placeholder="输入代理商名称"></el-input>&ndash;&gt;-->
            <!--&lt;!&ndash;<div style="margin: 20px 0;"></div>&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<el-input&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;type="textarea"&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;:autosize="{ minRows: 2, maxRows: 4}"&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;placeholder="备注内容，如：商户联系方式、保证金金额、特殊说明"&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;v-model="beizhuneirong">&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;</el-input>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;<div style="margin: 20px 0;"></div>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="primary">保存</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button slot="reference" type="primary" icon="el-icon-edit" circle></el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<el-button >click 激活</el-button>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;</el-popover>&ndash;&gt;-->
            <!--</p>-->
            <p class="biaoqian">
              <el-button type="primary" @click="Revisenotes = true">修改</el-button>
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'

  export default {
    name: "userDetails",
    data() {
      return {
        userId: "", // 用户id
        nickName: "", // 用户昵称
        avatar: "", // 头像
        createTime: "", // 注册时间
        idCardNo: "", // 身份证
        inviteUserId: "", // 邀请方用户Id(上级用户UID)
        inviteCodeSwitch: "", // 推广状态
        status: "", // 用户状态(资产状态)
        phone: "", // 手机号
        email: "", // 电子邮箱
        name: "", // 真实姓名
        username: "", // 用户名
        bankName: "", // 银行名称
        cardNo: "", // 银行卡号
        offgusanggao: false,//商家off
        dailishangmingcheng: '',//商家off
        beizhuneirong: '',//商家off
        offzhsanghu: false,//商家off
        off_shangjia: '',//判断是不是商户
        adStatus: '',//判断商家广告功能
        merchantsname: '',//代理商姓名
        remark: '',//商家备注
        merchantName: '',//商户账户名
        bankRate: '',//银行卡支付费率
        aliPayRate: '',//支付宝支付费率
        weChatPayRate: '',//微信支付费率
        merchantType: '',//商户类型
        dialogFormVisible: false,
        Revisenotes: false,
        RevisenotesMain: '',//修改备注消息
        agents: [], //供应商列表
        titleShang: '',//供应商
        textarea: '',//修改备注信息
        merCreateAd: '',//开通商户时间
        inviteCode: '',//邀请码
        imgURl: '',//二维码
        gerenInviteCode: '',//个人二维码
        goolgeStatus: true,//解绑谷歌
        googleBoolen: false,//是否禁用谷歌

        merchantNameValue: '',//商户账户名
        bankRateValue: '',//银行卡支付费率
        aliPayRateValue: '',//支付宝支付费率
        weChatPayRateValue: '',//微信支付费率
      }
    },
    mounted() {
      this.detailsFun(this.$route.query.id);
      this.seeErweima();
    },
    methods: {
      detailsFun(usersId) {
        let url = this.ApiUrl + '/api/user/merchantsDetail'
        this.$http({
          method: 'get',
          url: url,
          params: {
            userId: usersId,//用户id
          }
        }).then((response) => {
          if (response.data.success == true) {
            this.userId = response.data.payload.userId;
            this.nickName = response.data.payload.nickName;
            this.avatar = response.data.payload.avatar;
            this.createTime = response.data.payload.createTime;
            this.idCardNo = response.data.payload.idCardNo;
            this.inviteUserId = response.data.payload.inviteUserId;
            this.inviteCodeSwitch = response.data.payload.inviteCodeSwitch;
            this.status = response.data.payload.status;
            this.inviteCode = response.data.payload.inviteCode;
            this.phone = response.data.payload.phone;
            this.email = response.data.payload.email;
            this.name = response.data.payload.name;
            this.username = response.data.payload.username;
            this.bankName = response.data.payload.bankName;
            this.cardNo = response.data.payload.cardNo;
            this.agents = response.data.payload.agents;
            if (response.data.payload.isBindGa == 1) {
              this.goolgeStatus = true;
              this.googleBoolen = false;
            } else {
              this.goolgeStatus = false;
              this.googleBoolen = true;
            }
            this.seeErweima()

            this.adStatus = response.data.payload.merchants.adStatus;
            this.remark = response.data.payload.merchants.remark;
            this.merCreateAd = response.data.payload.merchants.merCreateAd;

            this.merchantType = response.data.payload.merchants.merchantType;
            this.merchantName = response.data.payload.merchants.merchantName;
            this.bankRate = response.data.payload.merchants.bankRate;
            this.aliPayRate = response.data.payload.merchants.aliPayRate;
            this.weChatPayRate = response.data.payload.merchants.weChatPayRate;

            this.merchantNameValue = response.data.payload.merchants.merchantName;
            this.bankRateValue = response.data.payload.merchants.bankRate;
            this.aliPayRateValue = response.data.payload.merchants.aliPayRate;
            this.weChatPayRateValue = response.data.payload.merchants.weChatPayRate;
          }
          else {
            if (response.data.error.code == '403') {
              this.Signout();
            }
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });

      },
      //二维码
      seeErweima() {
        let url = this.ApiUrl + '/api/user/createQrcode?inviteCode='
        this.imgURl = url + this.inviteCode;
        this.gerenInviteCode = this.inviteCode;
      },
      sendGongyingshang() {
        this.dialogFormVisible = false;
        let url = this.ApiUrl + '/api/user/updateStatus'
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            userId: this.userId,//用户id
            type: 'agentsId',
            status: this.titleShang
          })
        }).then((response) => {
          if (response.data.success == true) {
            this.$notify({
              title: '修改供应商成功',
              message: response.data.payload.msg,
              type: 'success'
            });
          }
          else {
            alert(response.data.msg)
          }
        }).catch((error) => {
          console.log(error);
        });

      },
      //根据参数修改状态
      tuiguangFun(types) {
        let url = this.ApiUrl + '/api/user/updateStatus';
        let canshu = 0;
        //用户状态
        if (types == 'status') {
          if (this.status == true) {
            canshu = 1;
          } else {
            canshu = 4;
          }
        }

        //推广状态
        if (types == 'inviteCodeSwitch') {
          if (this.inviteCodeSwitch == true) {
            canshu = 1;
          } else {
            canshu = 0;
          }
        }

        //广告状态
        if (types == 'adStatus') {
          if (this.adStatus == true) {
            canshu = 1;
          } else {
            canshu = 0;
          }
        }

        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            userId: this.userId,//用户id
            type: types,
            status: canshu
          })
        }).then((response) => {
          if (response.data.success == true) {
            this.$notify({
              title: '修改状态成功',
              message: response.data.payload.msg,
              type: 'success'
            });
          }
          else {
            alert(response.data.msg)
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      //修改状态
      adStatusFun() {
        let url = this.ApiUrl + '/api/user/updateAdStatus';
        let canshu = 0;
        if (this.adStatus == true) {
          canshu = 1;
        } else {
          canshu = 0;
        }
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            userId: this.userId,//用户id
            adStatus: canshu
          })
        }).then((response) => {
          if (response.data.success == true) {
            this.$notify({
              title: '修改状态成功',
              message: response.data.payload.msg,
              type: 'success'
            });
          }
          else {
            this.$notify.error({
              title: '错误',
              message: response.data.msg
            });
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      Revisenotes_fun() {
        this.Revisenotes = false;
        let url = this.ApiUrl + '/api/user/updateMerchant'
        let canshu = 0;
        if (this.adStatus == true) {
          canshu = 1;
        } else {
          canshu = 0;
        }
        this.$http({
          method: 'post',
          url: url,
          data: qs.stringify({
            userId: this.userId,//用户id
            // remark: this.textarea
            merchantName: this.merchantNameValue,
            bankRate: this.bankRateValue,
            aliPayRate: this.aliPayRateValue,
            weChatPayRate: this.weChatPayRateValue,
            adStatus: canshu
          })
        }).then((response) => {
          if (response.data.success == true) {
            this.$notify({
              title: '修改信息成功',
              message: response.data.payload.msg,
              type: 'success'
            });
            this.detailsFun(this.$route.query.id);
          }
          else {
            this.$notify.error({
              title: '错误',
              message: response.data.msg
            });
          }
        }).catch((error) => {
          console.log(error);
        });
      },

      //解绑谷歌
      googleFun() {
        this.$confirm('是否解绑谷歌', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.ApiUrl + '/api/user/closeGa'
          this.$http({
            method: 'post',
            url: url,
            data: qs.stringify({
              userId: this.userId,//用户id
            })
          }).then((response) => {
            if (response.data.success == true) {
              this.$notify({
                title: '解绑成功',
                message: '',
                type: 'success'
              });
              this.googleBoolen = true;
            }
            else {
              alert(response.data.msg)
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

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .userDetails {
    width: 100%;
    height: auto;
    overflow: hidden;
    .userDetails_title {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px #ccc solid;
    }
  }

  .userDetails_main {
    padding: 20px;
    box-sizing: border-box;
  }

  .kuangao {
    width: 200px;
    height: 200px;
  }

  .colorBack {
    background: #fff;
    padding: 60px 30px;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .biaoqian {
    margin-top: 20px;
  }

  .el-input--suffix .el-input__inner {
    background: #fff;
  }
</style>
