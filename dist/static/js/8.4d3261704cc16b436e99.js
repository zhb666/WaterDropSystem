webpackJsonp([8],{iJXl:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("CtzY"),i=a.n(n),l={name:"userAdmin",data:function(){return{options:[{value:"",label:"全部"},{value:"0",label:"未激活"},{value:"1",label:"已激活"}],getcustomerlist:[],tableData:[],name:"",limit:"",totalRecords:0,page:1,logins:!1,open_off:!1}},mounted:function(){this.sendCharge()},methods:{handleCurrentChange:function(e){var t=this;this.logins=!0;var a=this.ApiUrl+"/weixin/getwxuserlistbypage";this.$http({method:"post",url:a,data:i.a.stringify({name:this.name,pageNum:e,pageSize:10})}).then(function(e){0==e.data.code?(t.logins=!1,t.tableData=e.data.data.data,t.totalRecords=e.data.data.totalCount):("403"==e.data.code&&t.Signout(),t.$message.error(e.data.msg))}).catch(function(e){console.log(e)})},sendCharge:function(e){var t=this;e&&(this.page=1),this.logins=!0;var a=this.ApiUrl+"/weixin/getwxuserlistbypage";this.$http({method:"post",url:a,data:i.a.stringify({name:this.name,pageNum:this.page,pageSize:10})}).then(function(e){0==e.data.code?(t.logins=!1,t.tableData=e.data.data.data,t.totalRecords=e.data.data.totalCount):("403"==e.data.code&&t.Signout(),t.$message.error(e.data.msg))}).catch(function(e){console.log(e)})},isReviewed:function(e){return e.use_memory+"/"+e.max_memory},deleteFun:function(e,t){var a=this;this.$confirm("确定删除？","提示",{confirmButtonText:"确认通过",cancelButtonText:"取消",type:"warning"}).then(function(){var e=a.ApiUrl+"/weixin/delwxuser";a.$http({method:"post",url:e,data:i.a.stringify({id:t.id})}).then(function(e){0==e.data.code?(a.$notify({title:"删除成功",message:"这是一条成功的提示消息",type:"success"}),a.sendCharge()):a.$message.error(e.data.msg)}).catch(function(e){console.log(e)})}).catch(function(){a.$message({type:"info",message:"已取消审核"})})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user"},[a("div",{staticClass:"animated fadeInDown"},[a("el-row",{staticClass:"breadcrumb"},[a("el-col",{attrs:{span:4}},[a("h3",[e._v("激活管理")])]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[e._v("客户中心")]),e._v(" "),a("el-breadcrumb-item",[e._v("激活管理")])],1)],1)],1),e._v(" "),a("div",{staticClass:"addPadding"},[a("div",{staticClass:"user_header"},[a("el-input",{attrs:{placeholder:"客户名"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),a("el-button",{attrs:{type:"primary",title:"搜索",icon:"el-icon-search",loading:e.logins},on:{click:function(t){return e.sendCharge(1)}}})],1),e._v(" "),a("div",{staticClass:"user_main"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.logins,expression:"logins"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(33, 33, 33, 0.8)"}},[a("el-table-column",{attrs:{prop:"id",label:"ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"用户名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"blackboard_write",label:"板书"}}),e._v(" "),a("el-table-column",{attrs:{prop:"annotate",label:"批注"}}),e._v(" "),a("el-table-column",{attrs:{formatter:e.isReviewed,label:"云盘"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"180px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{content:"删除",placement:"right",effect:"light"}},[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.deleteFun(t.$index,t.row)}}},[e._v("删除\n                ")])],1)]}}])})],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.totalRecords>10,expression:"totalRecords>10"}],staticClass:"pageBox"},[a("el-pagination",{attrs:{"current-page":e.page,"page-size":10,layout:"prev, pager, next, jumper",total:e.totalRecords},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.page=t},"update:current-page":function(t){e.page=t}}})],1)])],1)])},staticRenderFns:[]};var s=a("C7Lr")(l,o,!1,function(e){a("rMe/")},"data-v-3535f3eb",null);t.default=s.exports},"rMe/":function(e,t){}});