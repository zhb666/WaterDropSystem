webpackJsonp([11],{"3ntp":function(t,e){},AXiH:function(t,e){},BG3w:function(t,e){},D9hl:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("xd7I"),i=n("rflr"),s=n.n(i),a=n("xHD2"),r=n.n(a),l=n("2sCs"),u=n.n(l),c=n("R4Sj"),d=(n("fzw+"),n("BG3w"),n("uxEr"),n("t0aP"),n("X21A"),n("KGCO")),p=n("CtzY"),h=n.n(p),m={name:"Login",data:function(){return{user:{userName:"",password:"",code:""},code:"",isLogsin:!1,isLogsins:!1}},mounted:function(){this.SendCode()},methods:{Login:function(){var t=this;if(""==this.user.userName)return this.$message.error("错了哦，请填写用户名"),!1;if(""==this.user.password)return this.$message.error("错了哦，请填写密码"),!1;if(""==this.user.code)return this.$message.error("错了哦，请填写验证码"),!1;this.isLogsin=!0;var e=this.ApiUrl+"/user/login";this.$http({method:"post",url:e,data:h.a.stringify({account:this.user.userName,password:this.user.password,code:this.user.code})}).then(function(e){0==e.data.code?(t.$store.commit("name",t.user.userName),t.$store.commit("passwor",t.user.password),t.$store.commit("yesLogin"),window.sessionStorage.setItem("isLogin",!0),window.sessionStorage.setItem("name",t.user.userName),window.sessionStorage.setItem("passwor",t.user.password),t.isLogsin=!1,t.$router.push({path:"/activation"})):(t.$message.error(e.data.msg),t.isLogsin=!1)}).catch(function(t){console.log(t)})},SendCode:function(){var t=this,e=this.ApiUrl+"/user/getcode";this.$http({method:"get",url:e}).then(function(e){0==e.data.code?t.code=e.data.data:t.$notify.error({title:"错误",message:e.data.msg})}).catch(function(t){console.log(t)})}}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login"},[n("div",{staticClass:"animated bounce"},[n("div",{staticClass:"login_main"},[n("el-row",{staticStyle:{"z-index":"1"}},[n("el-col",{attrs:{model:t.user}},[n("el-card",{directives:[{name:"loading",rawName:"v-loading",value:t.$store.state.loading,expression:"$store.state.loading"}],staticClass:"login-box",attrs:{"element-loading-background":"rgba(33, 33, 33, 0.8)"}},[n("el-form",[n("h1",{staticClass:"title",staticStyle:{margin:"20px 0","font-size":"24px"}},[t._v("水滴管理系统")]),t._v(" "),n("el-form-item",[n("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"用户名","suffix-icon":"fa fa-user"},model:{value:t.user.userName,callback:function(e){t.$set(t.user,"userName",e)},expression:"user.userName"}})],1),t._v(" "),n("el-form-item",[n("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"密码",id:"addCLick","suffix-icon":"fa fa-lock"},model:{value:t.user.password,callback:function(e){t.$set(t.user,"password",e)},expression:"user.password"}})],1),t._v(" "),n("el-form-item",{staticClass:"boxCode"},[n("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"验证码","suffix-icon":"fa fa-lock"},on:{keyup:function(e){return e.type.indexOf("key")||13===e.keyCode?t.login(e):null}},model:{value:t.user.code,callback:function(e){t.$set(t.user,"code",e)},expression:"user.code"}}),t._v(" "),n("p",{staticClass:"codeTEXT",on:{click:t.SendCode}},[t._v(t._s(t.code))])],1),t._v(" "),n("el-form-item",[n("el-button",{staticClass:"pull-right",staticStyle:{width:"100%"},attrs:{type:"primary",id:"btnclick",loading:t.isLogsin},on:{click:t.Login}},[t._v("\n                  登录\n                ")])],1)],1)],1)],1)],1)],1)])])},staticRenderFns:[]};var g=n("C7Lr")(m,f,!1,function(t){n("AXiH")},null,null).exports;o.default.use(d.a);var w=function(t){n.e(2).then(function(){var e=[n("poSA")];t.apply(null,e)}.bind(this)).catch(n.oe)},v=[{path:"/",component:g,name:"login",meta:{title:"水滴智慧管理系统",requireAuth:!1}},{path:"/dashboard",component:w,children:[{path:"/",component:function(t){n.e(0).then(function(){var e=[n("npFY")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"首页",requireAuth:!0}}]},{path:"/activation",component:w,children:[{path:"/",component:function(t){n.e(1).then(function(){var e=[n("x2Q2")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"激活管理",requireAuth:!0}}]},{path:"/edition",component:w,children:[{path:"/",component:function(t){n.e(9).then(function(){var e=[n("L7f8")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"版本管理",requireAuth:!0}}]},{path:"/customer",component:w,children:[{path:"/",component:function(t){n.e(3).then(function(){var e=[n("qa3b")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"客户管理",requireAuth:!0}}]},{path:"/subject",component:w,children:[{path:"/",component:function(t){n.e(4).then(function(){var e=[n("FE5l")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"客户管理",requireAuth:!0}}]},{path:"/typeAdmin",component:w,children:[{path:"/",component:function(t){n.e(7).then(function(){var e=[n("og/3")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"类型管理",requireAuth:!0}}]},{path:"/userAdmin",component:w,children:[{path:"/",component:function(t){n.e(8).then(function(){var e=[n("iJXl")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"用户管理",requireAuth:!0}}]},{path:"/adminList",component:w,children:[{path:"/",component:function(t){n.e(6).then(function(){var e=[n("Yxd1")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"管理员管理",requireAuth:!0}}]},{path:"/my",component:w,children:[{path:"profile",component:function(t){n.e(5).then(function(){var e=[n("DzZc")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"个人中心",requireAuth:!0}}]}],b=new d.a({routes:v});o.default.use(c.a);var y=window.sessionStorage.getItem("isLogin"),q=window.sessionStorage.getItem("name"),x=window.sessionStorage.getItem("password"),$=window.sessionStorage.getItem("token"),L=new c.a.Store({state:{isLogin:y,name:q,password:x,token:$},mutations:{yesLogin:function(t){return t.isLogin=!0},name:function(t,e){t.name=e},passwor:function(t,e){t.password=e},tokenAdd:function(t,e){t.token=e},noLogin:function(t){return t.isLogin=!1},deleteName:function(t){return t.name=""},deletePasswor:function(t){return t.password=""},deleteToken:function(t){return t.token=""}}});b.beforeEach(function(t,e,n){n()}),b.afterEach(function(t){});var _={render:function(){var t=this.$createElement;return(this._self._c||t)("router-view",{attrs:{id:"app"}})},staticRenderFns:[]},S=n("C7Lr")({name:"app"},_,!1,null,null,null).exports;let k=window.location.host;"localhost:8089"==k||"192.168.0.12:8089"==k?o.default.prototype.ApiUrl="http://192.168.0.13:8089/studyassistant":"admin.becent.cc"==k?(o.default.prototype.ApiUrl="https://api-admin.becent.cc",o.default.prototype.ApiUrlKuang="https://api-admin.becent.cc"):(o.default.prototype.ApiUrl="studyassistant",o.default.prototype.ApiUrlKuang="studyassistant"),o.default.prototype.Signout=function(){this.$message.error("登录超时，重新登录"),b.push({path:"/"}),window.sessionStorage.removeItem("isLogin"),window.sessionStorage.removeItem("name"),window.sessionStorage.removeItem("passwor"),window.sessionStorage.removeItem("token"),store.commit("deleteName"),store.commit("deletePasswor"),store.commit("noLogin"),store.commit("deleteToken")},o.default.prototype.changeSize=function(){let t=`${document.documentElement.clientWidth}`;return t=t<1600?"250px":"420px"},u.a.interceptors.response.use(t=>(t.data.success,t),t=>(t.response.status,404===t.response.status&&b.push({name:"error-404"}),401===t.response.status&&b.push({name:"login"}),Promise.resolve(t.response))),o.default.config.productionTip=!1,o.default.use(s.a),o.default.use(r.a),o.default.use(c.a),o.default.prototype.$http=u.a,o.default.prototype.$http.defaults.headers["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8",o.default.prototype.$http.defaults.withCredentials=!0,b.beforeEach(function(t,e,n){t.matched.some(function(t){return t.meta.requireAuth})?L.state.isLogin?(document.title=t.meta.title,n()):(alert("请登录"),document.title="登录",n({path:"/",query:{redirect:t.fullPath}})):(document.title=t.meta.title,n())}),new o.default({el:"#app",router:b,store:L,render:function(t){return t(S)}})},SS5X:function(t,e){},X21A:function(t,e){},fwVn:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n("D9hl"),n("3ntp"),n("lMgl"),window.Quill||(window.Quill=n("crgx"));var o={name:"quill-editor",data:function(){return{_content:"",defaultModules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image","video"]]}}},props:{content:String,value:String,disabled:Boolean,options:{type:Object,required:!1,default:function(){return{}}}},mounted:function(){this.initialize()},beforeDestroy:function(){this.quill=null},methods:{initialize:function(){if(this.$el){var t=this;t.options.theme=t.options.theme||"snow",t.options.boundary=t.options.boundary||document.body,t.options.modules=t.options.modules||t.defaultModules,t.options.modules.toolbar=void 0!==t.options.modules.toolbar?t.options.modules.toolbar:t.defaultModules.toolbar,t.options.placeholder=t.options.placeholder||"Insert text here ...",t.options.readOnly=void 0!==t.options.readOnly&&t.options.readOnly,t.quill=new Quill(t.$refs.editor,t.options),(t.value||t.content)&&t.quill.pasteHTML(t.value||t.content),t.quill.on("selection-change",function(e){e?t.$emit("focus",t.quill):t.$emit("blur",t.quill)}),t.quill.on("text-change",function(e,n,o){var i=t.$refs.editor.children[0].innerHTML,s=t.quill.getText();"<p><br></p>"===i&&(i=""),t._content=i,t.$emit("input",t._content),t.$emit("change",{editor:t.quill,html:i,text:s})}),this.disabled&&this.quill.enable(!1),t.$emit("ready",t.quill)}}},watch:{content:function(t,e){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},value:function(t,e){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},disabled:function(t,e){this.quill&&this.quill.enable(!t)}}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"quill-editor"},[this._t("toolbar"),this._v(" "),e("div",{ref:"editor"})],2)},staticRenderFns:[]};var s=n("C7Lr")(o,i,!1,function(t){n("SS5X")},null,null);e.default=s.exports},"fzw+":function(t,e){},lMgl:function(t,e){},t0aP:function(t,e){},uxEr:function(t,e){}},["NHnr"]);