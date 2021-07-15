import { startUser } from '@middlewares/authUser.js'

export default [{
		path: '/',
		component: async () => await import('@layouts/MainLayout.vue'),
		children: [{
			path: '',
			name:'home',
			component: async () => await import('@pages/Home.vue')
		}],
		beforeEnter: [startUser],
	},
	{
		path: '/:catchAll(.*)*',
		name:'user-error',
		component: async () => await import('@pages/user/errors/404.vue')
	}
]
