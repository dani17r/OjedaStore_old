import LayoutAuthAdmin from '@layouts/admin/AuthLayout.vue'
import { authenticared, guest } from '@middlewares/authAdmin.js'

export default [
	{
		path: '/admin',
		component: LayoutAuthAdmin,
		children: [
			{
				path: '',
				redirect: { name:'login-admin' },
			},
			{
				path: 'login',
				name: 'login-admin',
				component: () => import('@pages/admin/auth/Login.vue'),
				beforeEnter: [authenticared],
			},
			{
				path: 'register/:hash',
				name: 'register-admin',
				props: { default:true },
				component: () => import('@pages/admin/auth/Register.vue'),
				beforeEnter: [authenticared],
			},
		]
	},
	{
        path: '/admin:pathMatch(.*)*', //:catchAll(.*)*
        component: () => import('@layouts/ErrorLayout.vue'),
        children: [{
            path: '',
            name: 'admin-error',
            component: () => import('@pages/admin/errors/404.vue'),
        }]
    }

]
