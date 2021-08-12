import LayoutAuthPublic from '@layouts/AuthLayout.vue'

import {authenticared, guest} from '@middlewares/authClient.js'

export default[
  {
    path: '/',
    component: LayoutAuthPublic,
    children: [
      {
        path: 'login',
        name: 'login-user',
        beforeEnter: [authenticared],
        component: async () => await import ('@pages/auth/Login.vue'),
      }, {
        path: 'register',
        name: 'register-user',
        beforeEnter: [authenticared],
        component: async () => await import ('@pages/auth/Register.vue'),
      }
    ]
  }, {
    path : '/verify',
    component: LayoutAuthPublic,
    children: [
      {
        path: '',
        redirect: to => window.history.go(1) || {
          name: 'login-user'
        }
      }, {
        path: 'email',
        name: 'verify-email',
        beforeEnter: [authenticared],
        component: async () => await import ('@pages/auth/verify/Email.vue'),
      }, {
        path: 'password',
        name: 'verify-password',
        beforeEnter: [authenticared],
        component: async () => await import ('@pages/auth/verify/Password.vue'),
      }
    ]
  }
]
