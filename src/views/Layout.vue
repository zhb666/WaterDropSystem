<template>
  <div>
    <el-container style="height: 100%">
      <el-header style="height: 61px;">
        <div class="logo">
          <img @click="ifMenu" id="imgIf" v-if="imaIf" :class="isCollapse ? 'imgTrue' : 'imgFalse'"
               src="../../static/common/images/open.png"
               alt="">
          <img style="float: left;margin: 18px 20px 0 20px;" src="../../static/common/images/logo.png" alt="">
          <h1 style="float: left;">水滴管理系统</h1>
        </div>
        <div class="header-nav">
          <el-menu mode="horizontal" background-color="#212121" text-color="#ffffff" active-text-color="#ffffff"
                   :router="true">
            <el-submenu index="my">
              <template slot="title"><img src="../assets/head.gif" style="width:30px;border-radius: 20px;">
                {{$store.state.name}}
              </template>
              <el-menu-item index="/my/profile"><i class="fa fa-fw fa-cog"></i> 个人设置</el-menu-item>
              <el-menu-item @click="loginOut" index=""><i class="fa fa-fw fa-sign-out"></i> 安全退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-container>
        <!--<el-aside :width="menuWidths">-->
        <el-menu :unique-opened="isFalse" :default-active="$route.path" :router="true" :collapse="isCollapse">

          <!--<el-menu-item index="/dashboard">-->
          <!--<i class="fa fa-fw fa-dashboard"></i>-->
          <!--<span slot="title">首页</span>-->
          <!--</el-menu-item>-->
          <!--</el-submenu>-->

          <!--<el-submenu v-for="(key,index) in mentList" :index="'index'+index" :key="index">-->

          <!--<template slot="title">-->
          <!--<i :class="key.icon"></i>-->
          <!--<span slot="title">{{key.title}}</span>-->
          <!--</template>-->

          <!--<el-menu-item v-for="(keys,item) in key.children" :index="keys.path" :key="item">-->
          <!--<i :class="keys.icon"></i>-->
          <!--<span slot="title">{{keys.title}}</span>-->
          <!--</el-menu-item>-->

          <!--</el-submenu>-->

          <!--<el-submenu v-for="(key,item) in mentList" :index="item" :key="item">-->

          <!--<template slot="title">-->
          <!--<i :class="key.icon"></i>-->
          <!--<span slot="title">{{key.title}}</span>-->
          <!--</template>-->

          <!--<el-menu-item v-for="(keys,item) in key.childs" :index="keys.path" :key="item">-->
          <!--<i :class="keys.icon"></i>-->
          <!--<span slot="title">{{keys.title}}</span>-->
          <!--</el-menu-item>-->

          <!--</el-submenu>-->

          <!--<el-submenu index="menuManagement">-->

          <!--<template slot="title">-->
          <!--<i class="fa fa-cog"></i>-->
          <!--<span slot="title">菜单设置</span>-->
          <!--</template>-->

          <!--<el-menu-item index="/menuManagement">-->
          <!--<i class="fa fa-fw fa-user"></i>-->
          <!--<span slot="title">菜单管理</span>-->
          <!--</el-menu-item>-->

          <!--<el-menu-item index="/twomenu">-->
          <!--<i class="fa fa-fw fa-user"></i>-->
          <!--<span slot="title">资源管理</span>-->
          <!--</el-menu-item>-->


          <!--</el-submenu>-->


          <el-submenu index="menuManagement">

            <template slot="title">
              <i class="fa fa-fw fa-user"></i>
              <span slot="title">客户中心</span>
            </template>

            <el-menu-item index="/activation">
              <i class="fa fa-fw fa-user"></i>
              <span slot="title">激活管理</span>
            </el-menu-item>

            <el-menu-item index="/edition">
              <i class="fa fa-fw fa-cog"></i>
              <span slot="title">版本管理</span>
            </el-menu-item>

            <el-menu-item index="/customer">
              <i class="fa fa-fw fa-users"></i>
              <span slot="title">客户管理</span>
            </el-menu-item>


          </el-submenu>

          <el-submenu index="subject">

            <template slot="title">
              <i class="fa fa-fw fa-wpforms"></i>
              <span slot="title">科目中心</span>
            </template>

            <el-menu-item index="/subject">
              <i class="fa fa-fw fa-wpforms"></i>
              <span slot="title">科目管理</span>
            </el-menu-item>

          </el-submenu>

          <el-submenu index="admin">

            <template slot="title">
              <i class="fa fa-fw fa-cog"></i>
              <span slot="title">系统管理</span>
            </template>

            <el-menu-item index="/adminList">
              <i class="fa fa-fw fa-cog"></i>
              <span slot="title">管理员管理</span>
            </el-menu-item>


          </el-submenu>


        </el-menu>
        <!--</el-aside>-->
        <el-container>
          <el-main>
            <!--<keep-alive>-->
            <router-view></router-view>
            <!--</keep-alive>-->
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: "App",
    data() {
      return {
        isCollapse: false,
        isFalse: true,
        menuWidths: '200px',//侧边栏宽度
        screenWidth: `${document.documentElement.clientWidth}`,//浏览器视图大小
        imaIf: true,//控制图片显示
        mentList: [],//侧边栏数据
      }
    },
    mounted() {
      // this.getMentlist();
      this.changeSize();
      this.windSize();
    },
    methods: {
      //获取权限侧边栏
      getMentlist() {
        // let url = this.ApiUrl + '/api/index/menuList'
        let url = this.ApiUrlKuang + '/api/admin/getMenus'
        this.$http({
          method: 'get',
          url: url,
          params: {}
        }).then((response) => {
          if (response.data.success == true) {
            this.mentList = response.data.payload;
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
      //退出账号
      loginOut() {
        var self = this;

        let url = this.ApiUrl + '/api/login/logout'
        this.$http({
          method: 'get',
          url: url,
          params: {}
        }).then((response) => {
        }).catch((error) => {
          console.log(error);
        });

        window.sessionStorage.removeItem('isLogin');
        window.sessionStorage.removeItem('name');
        window.sessionStorage.removeItem('passwor');
        window.sessionStorage.removeItem('token');

        //改变登录状态存储登录信息
        self.$store.commit('deleteName');
        self.$store.commit('deletePasswor');
        self.$store.commit('noLogin');
        self.$store.commit('deleteToken');

        self.$router.push({path: '/'});

      },
      //侧边栏取反
      ifMenu() {
        this.isCollapse = !this.isCollapse;
      },
      //监听视图大小
      changeSize() {
        const that = this;
        window.onresize = function temp() {
          that.screenWidth = `${document.documentElement.clientWidth}`;
          // that.windSize();
        };
      },
      //进来判断视图大小
      windSize() {
        if (this.screenWidth < 1600) {
          this.isCollapse = true;
          this.imaIf = true;
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-submenu__title i {
    color: #fff;
  }

  .el-menu {
    background: #333;
  }

  .el-menu-item i {
    color: #fff;
  }

  #imgIf {
    float: left;
    margin: 18px 20px 0 20px;
    width: 20px;
    cursor: pointer;
    transition: transform 1s;
  }

  .el-cascader__label span, .el-cascader__label {
    color: white;
  }

  .imgTrue {
    transform: rotate(0deg);
  }

  .imgFalse {
    transform: rotate(90deg);
  }

  .el-menu-item {
    color: #fff;

    .is-active {
      color: #409EFF;
    }
  }

  .el-submenu__title {
    color: #fff;
  }

  .el-submenu {
    color: #fff;

    ul {
      background: #333;
    }
  }

  .breadcrumb h3 {
    color: #fff;
  }

  .el-container {
    background: #000;
  }

  .el-menu--horizontal {
    border: none
  }

  .el-menu {
    border: none;
  }

  .el-breadcrumb__inner {
    color: #fff !important;
  }

  .el-table th, .el-table td, .el-table th {
    background: #212121;
    color: #fff;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  }

  .el-table--border, .el-table--group {
    border: none;
  }

  .el-table th, .el-table tr {
    /*background-color: #ea6c41;*/
  }

  /*tr:hover{background:red!important;}*/
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #1a1a1a;
  }

  .el-input__inner {
    background: #212121;
    border: #4a4747 solid 1px;
    color: #fff
  }

  .el-textarea__inner {
    background: #212121;
    border: #4a4747 solid 1px;
    color: #fff
  }

  .el-input--small .el-input__inner {
    background: white;
    color: #000;
  }

  /*.el-input.is-disabled .el-input__inner{color: #212121;}*/

  /*.el-table tr:hover{background-color: red;}*/
  /*tr{pointer-events: none; }*/
  /*tbody .el-table__row:hover{background: #ccc;}*/
  .el-date-editor .el-range-input {
    background: #212121;
  }

  .el-date-editor .el-range-separator {
    color: #fff;
  }

  .el-dialog__header {
    background: #212121;
  }

  .el-dialog__body {
    background: #212121;
  }

  .el-dialog__title {
    color: #fff;
  }

  .el-menu-item:focus, .el-menu-item:hover {
    background: #ea6c41;
  }

  .el-table__expanded-cell:hover {
    background: #212121;
  }

  .el-table th, .el-table tr:hover {
    background: #212121;
  }

  .el-table th, .el-table tr {
    background: #212121;
  }

  .el-submenu__title:hover {
    background: #333;
  }

  .el-table td {
    color: #999;
  }

  .el-button--primary {
    background-color: #177ec1;
    border: 1px solid #177ec1;
  }

  .el-tree-node:focus > .el-tree-node__content, .el-tree-node__content:hover {
    background: #212121;
  }

  .el-tree {
    background: #212121;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box
  }

  .el-button--primary:focus, .el-button--primary:hover {
    background: rgba(23, 126, 193, 0.85);
    border: solid 1px rgba(23, 126, 193, 0.1);
  }

  .el-tree-node__content {
    height: 36px;
  }

  .breadcrumb {
    margin-bottom: 20px;
    border-bottom: 1px solid #212121;
    padding-bottom: 20px;
  }

  .el-main {
    padding: 0;
  }

  .el-submenu__icon-arrow {
    position: absolute;
    top: 50%;
    right: 8px;
    margin-top: -4px;
    transition: transform .3s;
    font-size: 12px;
  }

  .el-table th, .el-table td, .el-table th {
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box
  }

  .el-header, .el-menu--horizontal {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1)
  }

  /*.el-menu--horizontal{}*/
  .el-header .logo h1 {
    font-size: 22px;
  }

  .el-header .logo {
    width: 270px;
  }

  /*.el-table td, .el-table th.is-leaf {*/
  /*text-align: center;*/
  /*}*/

  /*.user_main {*/
  /*padding-left: 15px;*/
  /*box-sizing: border-box;*/
  /*background: #212121;*/
  /*}*/

  .el-menu-item:focus, .el-menu-item:hover {
    background: #212121;
  }

  .el-menu-item.is-active {
    color: #ea6c41;
  }

  .el-submenu ul {
    background: #212121;
  }

  .el-button--success {
    background: #469408;
    border: 1px solid #469408;
  }

  .el-table__empty-block {
    background: #212121;
  }

  /*el-table__row*/
  .el-badge__content {
    background: #ea6c41;
  }

  /*滚动条整体部分,必须要设置*/
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: red;
  }

  /*滚动条的轨道*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .3);
    background-color: #000;
  }

  /*滚动条的滑块按钮*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #212121;
    box-shadow: inset 0 0 5px #000;
  }

  /*滚动条的上下两端的按钮*/
  ::-webkit-scrollbar-button {
    height: 0px;
    background-color: #212121;
  }

  .el-table::before {
    height: 0;
  }

  .el-pagination .btn-next, .el-pagination .btn-prev {
    background: #212121;
  }

  .el-pager li {
    background: #212121;
    color: #fff;
  }

  .el-table--fit {
    background: #212121;
  }

  .el-pagination button:disabled {
    background: #212121
  }

  .el-pagination {
    display: inline-block;
  }

  .el-input__suffix {
    right: 5px;
    left: 76%;
  }

  .el-select {
    width: 118px;
  }

  .pageBox {
    width: 100%;
    height: 50px;
    margin-top: 30px;
    text-align: right;
  }

  .el-button + .el-button {
    margin-left: 0;
  }

  .el-button--success.is-disabled, .el-button--success.is-disabled:hover {
    color: #9d9d9d;
    background-color: #4c4c4c;
    border-color: #4c4c4c;
  }

  .el-button--primary.is-disabled, .el-button--primary.is-disabled:hover {
    color: #9d9d9d;
    background-color: #4c4c4c;
    border-color: #4c4c4c;
  }

  .el-date-editor--daterange.el-input__inner {
    width: 260px;
  }

  .el-form-item__label {
    color: #fff;
  }

  .el-input.is-disabled .el-input__inner {
    background: none;
  }

  .el-message-box__wrapper {
    top: -260px;
  }

  .el-radio.is-bordered {
    border: none;
  }

  .el-button--danger.is-disabled {
    color: #9d9d9d;
    background-color: #4c4c4c;
    border-color: #4c4c4c;
  }

  /*.el-table__body-wrapper{background:#212121;}*/
  /*.el-table--fit{padding: 4px;background: #212121;box-sizing: border-box;border-radius: 4px}*/

  .el-button--danger.is-disabled, .el-button--danger.is-disabled:active, .el-button--danger.is-disabled:focus, .el-button--danger.is-disabled:hover {
    color: #9d9d9d;
    background-color: #4c4c4c;
    border-color: #4c4c4c;
  }
</style>
