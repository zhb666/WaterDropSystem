<template>
  <div class="user">

    <div class="animated fadeInDown">

      <el-row class="breadcrumb">
        <el-col :span="4"><h3>c2c商户</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>财务中心</el-breadcrumb-item>
            <el-breadcrumb-item>c2c商户</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <div class="user_header">
        <el-input v-model="uid" placeholder="uid"></el-input>
        <el-input v-model="usernmae" placeholder="用户名"></el-input>

        <span>注册时间</span>
        <el-date-picker
          v-model="startDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>

        <el-input v-model="up_uid" placeholder="上级uid"></el-input>

        <span>代理商</span>
        <el-select v-model="zhuantai" placeholder="代理商">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-button type="primary" :loading="logins">搜索</el-button>

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
            prop="uid"
            label="uid">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="shimingrenzhen"
            label="开通时间">
          </el-table-column>
          <el-table-column
            prop="yinghangka"
            label="可用btm">
          </el-table-column>
          <el-table-column
            prop="tuiguang"
            label="冻结btm">
          </el-table-column>
          <el-table-column
            prop="shangjiUid"
            label="代理商">
          </el-table-column>
          <el-table-column
            prop="zhuantai"
            label="广告功能">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
              <!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">开通商户</el-button>-->
            </template>
          </el-table-column>
        </el-table>

      </div>

      <div class="mark_open" v-if="open_off">
        <div class="mark_open_box">
          <span>代理商：</span>
          <el-input v-model="agent" placeholder="代理商"></el-input>
        </div>

        <!--<br>-->
        <!--<span>广告功能：</span>-->
        <!--<el-input v-model="usernmae" placeholder="用户名"></el-input>-->
        <!--<br>-->
        <!--<span>备注：</span>-->
        <!--<el-input v-model="usernmae" placeholder="用户名"></el-input>-->
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        options: [
          {
            value: '选项1',
            label: '黄糕'
          }, {
            value: '选项2',
            label: '双奶'
          }],
        tableData: [
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡大熊',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡小鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡大鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡笨鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡小鸡',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡大熊',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡小鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡大鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡笨鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡小鸡',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡大熊',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡小鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡大鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡笨鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡小鸡',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡大熊',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡小鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡大鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡笨鸟',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          },
          {
            uid: '123456789',
            name: '王小虎',
            shimingrenzhen: '蔡小鸡',
            yinghangka: '已绑定',
            tuiguang: 45687,
            date: '2016-05-04',
            shangjiUid: '88888888',
            zhuantai: '正常'
          }
        ],
        uid: '',
        usernmae: '',
        startDate: '',
        up_uid: '',
        zhuantai: '',
        agent: '',
        logins: false,
        open_off: false
      }
    },
    methods: {
      handleEdit(index, row) {
        // console.log(index, row.uid);
        this.$router.push({path: '/c2cDetails', query: {id: row.uid}});
      },
      handleDelete(index, row) {
        console.log(index, row.uid);
      },
      open5() {
        this.$alert('<div class="mark_open" v-if="open_off"><div class="mark_open_box"><span>代理商：</span><el-input v-model="agent" placeholder="代理商"></el-input></div></div>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
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
      height: 100px;
      /*background: red;*/
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
