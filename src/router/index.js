import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Muves from '@/components/Muves';
import MuvesCreate from '@/components/muvesCreate';
import MuvesRead from '@/components/muvesRead';
import MuvesUpdate from '@/components/muvesUpdate';
import MuvesDestroy from '@/components/muvesDestroy';
import Users from '@/components/Users';
import UsersCreate from '@/components/usersCreate';
import UsersRead from '@/components/usersRead';
import UsersUpdate from '@/components/usersUpdate';
import UsersDestroy from '@/components/usersDestroy';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
import eachSeries from 'async/eachSeries';
import AuthStore from '@/stores/AuthStore';

Vue.use(Router);

function isAuthenticated(to, from, next) {
  console.log('isAuthenticated ::: ', AuthStore.state.isAuthenticated)
  console.log('token ::: ', AuthStore.getters.token)
  if (!AuthStore.state.isAuthenticated) return next({ path: '/login' });
  return next();
};

function isNotAuthenticated(to, from, next) {
  if (!AuthStore.state.isAuthenticated) return next();
  return next(false);
};

export function addRoutes(routes) {
  instance.addRoutes(routes);
  routes.push(routes);
}

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: isAuthenticated,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: isNotAuthenticated,
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    beforeEnter: isAuthenticated,
    meta: {
      requireAuth: true,
      keepAlive: false,
    },
  },
  {
    path: '/muves',
    name: 'muves',
    component: Muves,
    beforeEnter: isAuthenticated,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: 'create',
        name: 'muves.create',
        component: MuvesCreate,
      },
      {
        path: ':id',
        name: 'muves.read',
        component: MuvesRead,
      },
      {
        path: ':id/update',
        name: 'muves.update',
        component: MuvesUpdate,
      },
      {
        path: ':id/destroy',
        name: 'muves.destroy',
        component: MuvesDestroy,
      },
    ],
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    beforeEnter: isAuthenticated,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: 'create',
        name: 'users.create',
        component: UsersCreate,
      },
      {
        path: ':id',
        name: 'users.read',
        component: UsersRead,
      },
      {
        path: ':id/update',
        name: 'users.update',
        component: UsersUpdate,
      },
      {
        path: ':id/destroy',
        name: 'users.destroy',
        component: UsersDestroy,
      },
    ],
  },
];

export const instance = new Router({
  routes,
  mode: 'history',
});
