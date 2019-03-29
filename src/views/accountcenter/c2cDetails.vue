<template>
  <div class="userDetails">
    <div class="animated fadeInDown">
      <el-row class="breadcrumb">
        <el-col :span="4"><h3>商户详情</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>财务中心</el-breadcrumb-item>
            <el-breadcrumb-item>商户详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <!--<el-tag>用户信息</el-tag>-->
      <h3 class="userDetails_title">商户信息</h3>
      <p class="biaoqian">UID : </p>
      <p class="biaoqian">用户名 : </p>
      <p class="biaoqian">注册时间 : </p>
      <p class="biaoqian">上级用户UID : </p>

      <h3 class="userDetails_title">认证资料</h3>
      <p class="biaoqian">手机号 : </p>
      <p class="biaoqian">邮箱 : </p>
      <p class="biaoqian">真实姓名 : </p>
      <p class="biaoqian">身份证 : </p>
      <p class="biaoqian">银行卡 : </p>

      <h3 class="userDetails_title">个人推广中心</h3>
      <p class="biaoqian">推广二维码 : </p>
      <img class="kuangao"
           src="http://img4.imgtn.bdimg.com/it/u=1629746404,3726140182&fm=27&gp=0.jpg"
           alt="">
      <p class="biaoqian">推广邀请码 : </p>
      <p class="biaoqian">推广链接 : </p>
      <p class="biaoqian">推广状态:
        <el-switch
          v-model="offZhuantai"
          active-text="开启"
          inactive-text="关闭">
        </el-switch>
      </p>

      <h3 class="userDetails_title">资产状况</h3>
      <p class="biaoqian">用户状态:
        <!--<el-alert-->
        <!--title="冻结后将导致该用户无法登录平台"-->
        <!--type="warning">-->
        <!--</el-alert>-->
        <el-switch
          v-model="offyonghu"
          active-text="开启"
          inactive-text="关闭">
        </el-switch>
      </p>

      <h3 class="userDetails_title">商户信息</h3>
      <p class="biaoqian">开通商户时间 : </p>
      <p class="biaoqian">账户状态:
        <!--<el-alert-->
        <!--title="冻结后将导致该用户无法登录平台"-->
        <!--type="warning">-->
        <!--</el-alert>-->
        <el-switch
          v-model="offzhanghu"
          active-text="开启"
          inactive-text="关闭">
        </el-switch>
      <p class="biaoqian">广告功能:
        <!--<el-alert-->
        <!--title="冻结后将导致该用户无法登录平台"-->
        <!--type="warning">-->
        <!--</el-alert>-->
        <el-switch
          v-model="offguanggao"
          active-text="开启"
          inactive-text="关闭">
        </el-switch>
      </p>
      <p class="biaoqian">代理商 : 小邹
        <el-popover
          placement="top"
          width="400"
          trigger="click">
          <el-input v-model="dailishangmingcheng" placeholder="输入代理商名称"></el-input>
          <div style="margin: 20px 0;"></div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="备注内容，如：商户联系方式、保证金金额、特殊说明"
            v-model="beizhuneirong">
          </el-input>
          <div style="margin: 20px 0;"></div>
          <el-button type="primary">保存</el-button>
          <el-button slot="reference" type="primary" icon="el-icon-edit" circle></el-button>
          <!--<el-button >click 激活</el-button>-->
        </el-popover>
      </p>
      <p class="biaoqian">联系方式 : 1581744555，保证金 : 5000</p>

      <!--<div class="open_mark">-->
      <!--<div class="open_markMain">-->
      <!--<div></div>-->
      <!--&lt;!&ndash;<el-select v-model="value" placeholder="请选择">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option&ndash;&gt;-->
      <!--&lt;!&ndash;v-for="item in options"&ndash;&gt;-->
      <!--&lt;!&ndash;:key="item.value"&ndash;&gt;-->
      <!--&lt;!&ndash;:label="item.label"&ndash;&gt;-->
      <!--&lt;!&ndash;:value="item.value">&ndash;&gt;-->
      <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
      <!--<el-input v-model="dailishangmingcheng" placeholder="输入代理商名称"></el-input>-->

      <!--<el-input-->
      <!--type="textarea"-->
      <!--:autosize="{ minRows: 2, maxRows: 4}"-->
      <!--placeholder="备注内容，如：商户联系方式、保证金金额、特殊说明"-->
      <!--v-model="beizhuneirong">-->
      <!--</el-input>-->
      <!--<el-button type="primary">保存</el-button>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "userDetails",
    data() {
      return {
        offZhuantai: '',//推广状态
        offyonghu: '',//用户状态
        offzhanghu: '',//账户状态
        offguanggao: '',//广告功能
        dailishangmingcheng: '',//代理商名称
        beizhuneirong: '',//备注内容
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      }
    },
    mounted() {
      console.log(this.$route.query.id)
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

  .kuangao {
    width: 200px;
    height: 200px;
  }

  .open_mark {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    left: 0;
    top: 0;
    .open_markMain {
      width: 500px;
      height: auto;
      overflow: hidden;
      margin: 5% auto;
      position: relative;
      background: #fff;
      text-align: center;
      .el-input {
        width: 80%;
        margin: 40px 0;
      }
      .el-textarea {
        width: 80%;
      }
      .el-button {
        width: 80%;
        margin: 40px 0;
      }
    }
  }
</style>
