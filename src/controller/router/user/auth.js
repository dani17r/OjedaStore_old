import LayoutAuthPublic from '@layouts/AuthLayout.vue'

import { authenticared, guest } from '@middlewares/authUser.js'

export default [{
        path: '/',
		component: LayoutAuthPublic,
        children: [
			{
                path: 'login',
                name: 'login-user',
                component: async () => await import('@pages/user/auth/Login.vue'),
				beforeEnter: [authenticared],
            },
            {
                path: 'register',
                name: 'register-user',
                component: async () => await import('@pages/user/auth/Register.vue'),
				beforeEnter: [authenticared],
            },
        ],
    },
	{
		path: '/verify',
		component: LayoutAuthPublic,
		children: [
			{
				path: '',
				redirect: to => window.history.go(1) || { name:'login-user' },
			},
			{
				path: 'email',
				name: 'verify-email',
				component: async () => await import('@pages/user/auth/verify/Email.vue'),
				beforeEnter: [authenticared],
			},
			{
				path: 'password',
				name: 'verify-password',
				component: async () => await import('@pages/user/auth/verify/Password.vue'),
				beforeEnter: [authenticared],
			}
		]
	}
]
