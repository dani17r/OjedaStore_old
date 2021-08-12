import { startClient } from '@middlewares/authClient.js'

export default [{
		path: '/',
		component: async () => await import('@layouts/MainLayout.vue'),
		children: [{
			path: '',
			name:'home',
			component: async () => await import('@pages/Index.vue')
		}],
		beforeEnter: [startClient],
	},
	{
		path: '/:catchAll(.*)*',
		name:'user-error',
		component: async () => await import('@pages/errors/Error404.vue')
	}
]
