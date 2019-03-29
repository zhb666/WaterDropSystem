import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let isLogins = window.sessionStorage.getItem("isLogin"); //一进来获取是不是登陆过
let names = window.sessionStorage.getItem("name"); //一进来获取是不是存在的用户
let passwords = window.sessionStorage.getItem("password"); //一进来获取是不是存在的密码
let token = window.sessionStorage.getItem("token"); //一进来获取是不是存在的token
// console.log(isLogins)

export default new Vuex.Store({
  state: {
    isLogin: isLogins,//判断是否登录
    name: names,
    password: passwords,
    token : token
  },
  mutations: {
    //保存记录的值
    yesLogin: state => state.isLogin = true,
    name: (state, name) => {
      state.name = name;
    },
    passwor: (state, pass) => {
      state.password = pass
    },
    tokenAdd: (state, token) => {
      state.token = token
    },
    //删除记录的值
    noLogin: state => state.isLogin = false,
    deleteName:state => state.name = '',
    deletePasswor:state => state.password = '',
    deleteToken:state => state.token = ''

  }
})
