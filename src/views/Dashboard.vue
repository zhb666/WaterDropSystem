<template>
  <div>
    <div class="animated slideInLeft" style="padding: 20px;box-sizing: border-box;">
      <el-row class="breadcrumb">
        <el-col :span="4"><h3>Dashboard</h3></el-col>
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card>
            <el-row>
              <el-col>
                <h3>10</h3>
                <p class="text-muted"><i class="fa fa-fw fa-plus"></i> 新任务</p>
              </el-col>
              <el-col>
                <el-progress :percentage="10"></el-progress>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <el-row>
              <el-col>
                <h3>15</h3>
                <p class="text-muted"><i class="fa fa-fw fa-pause"></i> 已挂起</p>
              </el-col>
              <el-col>
                <el-progress :percentage="15"></el-progress>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <el-row>
              <el-col>
                <h3>70</h3>
                <p class="text-muted"><i class="fa fa-fw fa-check"></i> 已完成</p>
              </el-col>
              <el-col>
                <el-progress :percentage="70"></el-progress>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <el-row>
              <el-col>
                <h3>5</h3>
                <p class="text-muted"><i class="fa fa-fw fa-hand-paper-o"></i> 已终止</p>
              </el-col>
              <el-col>
                <el-progress :percentage="5"></el-progress>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card>
            <div id="pieChart" style="width:100%;height:450px;">
            </div>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card>
            <div id="lineChart" style="width:100%;height:450px;">
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card>
            <el-table :data="userList" style="width: 100%">
              <el-table-column label="姓名">
                <template slot-scope="scope">
                  <el-col :span="6"><img src="../assets/avatar.png" style="width:80px;"></el-col>
                  <el-col :span="18">
                    <p>{{scope.row.name}}</p>
                    <p>{{scope.row.job}}</p>
                  </el-col>
                </template>
              </el-table-column>
              <el-table-column label="优先级">
                <template slot-scope="scope">
                  <el-tag>{{scope.row.priority}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="薪资">
                <template slot-scope="scope">
                  <span>￥{{scope.row.salary}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: "Dashboard",
    data() {
      return {
        userList: [{name: '张三', priority: '高', salary: 5000, job: 'Web Designer'}, {
          name: '张三',
          priority: '高',
          salary: 5000,
          job: 'Web Designer'
        }, {name: '张三', priority: '高', salary: 5000, job: 'Web Designer'}, {
          name: '张三',
          priority: '高',
          salary: 5000,
          job: 'Web Designer'
        }]
      }
    },
    mounted: function () {
      var myChart = echarts.init(document.getElementById('lineChart'));
      var option = {
        title: {
          text: '渠道分析'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };

      myChart.setOption(option);

      var myPieChart = echarts.init(document.getElementById('pieChart'));
      var option1 = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      };
      myPieChart.setOption(option1);
    }
  }
</script>
