import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Login from '@/views/Login.vue'

const Layout = resolve => {
  require(['@/views/Layout.vue'], resolve)
};
const Dashboard = resolve => {
  require(['@/views/Dashboard.vue'], resolve)
};
const Profile = resolve => {
  require(['@/views/my/Profile.vue'], resolve) 
};


//水滴智慧
const Edition = resolve => {
  require(['@/views/wisdomNew/edition.vue'], resolve)
};

const Activation = resolve => {
  require(['@/views/wisdomNew/activation.vue'], resolve)
};

const Customer = resolve => {
  require(['@/views/wisdomNew/customer.vue'], resolve)
};

const Subject = resolve => {
  require(['@/views/subjectCenter/subject.vue'], resolve)
};

const AdminList = resolve => {
  require(['@/views/admin/adminList.vue'], resolve)
};

const TypeAdmin = resolve => {
  require(['@/views/wisdomNew/typeAdmin.vue'], resolve)
};
const UserAdmin = resolve => {
  require(['@/views/wisdomNew/userAdmin.vue'], resolve)
};

//水滴智慧


const routes = [
  {
    path: '/',
    component: Login,
    name: 'login',
    meta: {
      title: '管理系统',
      requireAuth: false
    }
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [{
      path: '/',
      component: Dashboard,
      meta: {
        title: '首页',
        requireAuth: true
      }
    }],
  },
  {
    path: '/activation',
    component: Layout,
    children: [{
      path: '/',
      component: Activation,
      meta: {
        title: '激活管理',
        requireAuth: true
      }
    }],
  },
  {
    path: '/edition',
    component: Layout,
    children: [{
      path: '/',
      component: Edition,
      meta: {
        title: '版本管理',
        requireAuth: true
      }
    }],
  },
  {
    path: '/customer',
    component: Layout,
    children: [{
      path: '/',
      component: Customer,
      meta: {
        title: '客户管理',
        requireAuth: true
      }
    }],
  },
  {
    path: '/subject',
    component: Layout,
    children: [{
      path: '/',
      component: Subject,
      meta: {
        title: '客户管理',
        requireAuth: true
      }
    }],
  },
  {
    path: '/typeAdmin',
    component: Layout,
    children: [{
      path: '/',
      component: TypeAdmin,
      meta: {
        title: '类型管理',
        requireAuth: true
      }
    }],
  },
  {
    path: '/userAdmin',
    component: Layout,
    children: [{
      path: '/',
      component: UserAdmin,
      meta: {
        title: '用户管理',
        requireAuth: true
      }
    }],
  },
  {
    path: '/adminList',
    component: Layout,
    children: [{
      path: '/',
      component: AdminList,
      meta: {
        title: '管理员管理',
        requireAuth: true
      }
    }],
  },
  {
    path: '/my',
    component: Layout,
    children: [{
      path: 'profile',
      component: Profile,
      meta: {
        title: '个人中心',
        requireAuth: true
      }
    }]
  },
  // {
  //   path: '/jurisdiction',
  //   component: Layout,
  //   children: [{
  //     path: '/',
  //     component: Jurisdiction,
  //     meta: {
  //       title: '权限管理',
  //       requireAuth: true
  //     }
  //   }]
  // },
  // {
  //   path: '/forms',
  //   component: Layout,
  //   children: [{
  //     path: '/',
  //     component: Forms
  //   }],
  //   meta: {
  //     title: '注册',
  //     requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  //   }
  // }
];

const router = new Router({
  routes: routes,
  // linkActiveClass: 'active'
});

export default router

