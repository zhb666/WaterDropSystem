<template>
  <div>
    <el-row class="breadcrumb">
      <el-col :span="4"><h3>列表</h3></el-col>
      <el-col :span="20">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>增删改查</el-breadcrumb-item>
          <el-breadcrumb-item>查询</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card>
          <el-form>
            <el-form-item label="关键词">
              <el-input placeholder="关键词" v-model="criteria.q" suffix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item label="标签">
              <el-input placeholder="标签" v-model="criteria.tag" suffix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header">
            <el-button-group>
              <el-tooltip content="新增" placement="top">
                <el-button size="medium" type="primary" icon="el-icon-plus" @click="showAdd=true"></el-button>
              </el-tooltip>
              <el-tooltip content="导出" placement="top">
                <el-button size="medium" type="primary" icon="fa fa-fw fa-download" :disabled="selectedRows.length==0"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button size="medium" type="primary" icon="el-icon-delete" :disabled="selectedRows.length==0"></el-button>
              </el-tooltip>
            </el-button-group>
          </div>
          <el-table :data="movieList" style="width: 100%" stripe highlight-current-row @selection-change="onSelectionChange" v-loading="$store.state.loading">
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="year" label="年代" width="80" :filters="[{ text: '2010', value: '2010' }, { text: '2011', value: '2011' }]" :filter-method="filterYear">
              <template slot-scope="scope">
                <el-tag>{{scope.row.year}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="标题">
              <template slot-scope="scope">
                <span>{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rating.average" label="评分" width="80" sortable></el-table-column>
            <el-table-column prop="genres" label="分类" width="120"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="small">编辑</el-button>
                <el-popover placement="top" trigger="click" v-model="scope.row.confirm">
                  <p>确定吗 ?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="scope.row.confirm = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="scope.row.confirm = false,deleteRow(scope.row)">确定</el-button>
                  </div>
                  <el-button size="small" type="danger" slot="reference">删除</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination :current-page.sync="criteria.pageNo" :page-size="criteria.pageSize" :total="criteria.total" :page-sizes="$store.state.paginationPageSizes" :layout="$store.state.paginationLayout" @current-change="currentChange" @size-change="pageSizeChange"></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="收货地址" :visible="showAdd" @close="closeAddDialog">
      <el-form :model="user" ref="user" label-width="80px" v-loading="formLoading">
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="user.realName"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="user.age" :min="1" :max="200" class="full-width"></el-input-number>
        </el-form-item>
        <el-form-item label="注册日期" prop="createDate">
          <el-date-picker v-model="user.createDate" type="datetime" class="full-width" placeholder="选择注册日期" align="right" :picker-options="$store.state.pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio class="radio" v-model="user.gender" :label="1">男</el-radio>
          <el-radio class="radio" v-model="user.gender" :label="0">女</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取 消</el-button>
        <el-button type="primary" @click="save" :loading="formLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "List",
    data() {
      return {
        criteria: {q: '特工', tag: '', pageNo: 1, pageSize: 15, total: 0},
        movieList: [],
        selectedRows: [],
        showAdd: false,
        user: {realName: '', age: 20, gender: 1, createDate: ''},
        formLoading: false
      }
    },
    mounted: function () {
      this.query();
    },
    methods: {
      query() {
        var self = this;
        self.$store.dispatch('Loading', true);
        var start = self.criteria.pageNo * self.criteria.pageSize;
        self.$http.get('/api/movie/search?q=' + self.criteria.q + '&tag=' + self.criteria.tag + '&start=' + start + '&count=' + self.criteria.pageSize).then(function (res) {
          self.movieList = res.data.subjects;
          self.criteria.total = res.data.total;
          self.$store.dispatch('Loading', false);
        }).catch(function () {
            self.$store.dispatch('Loading', false);
          }
        );
      },
      currentChange(pageNo) {
        this.query();
      },
      pageSizeChange(pageSize) {
        this.criteria.pageSize = pageSize;
        this.query();
      },
      filterYear(value, row) {
        return row.year === value;
      },
      deleteRow(row) {
        console.log(row);
        this.query();
      },
      onSelectionChange(rows) {
        this.selectedRows = rows.map(item => item.id);
      },
      save() {
        var self = this;
        self.$refs['user'].validate((valid) => {
          if (valid) {
            self.formLoading = true;
            setTimeout(function () {
              self.$notify({title: '系统提示', message: '保存成功！', type: 'success'});
              self.formLoading = false;
              self.showAdd = false;
              self.query();
            }, 1500);
          } else {
            return false;
          }
        });
      },
      closeAddDialog() {
        this.showAdd = false;
        this.$refs['user'].resetFields();
      }
    }
  }
</script>
