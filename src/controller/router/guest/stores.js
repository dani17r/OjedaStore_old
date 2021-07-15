import { startUser } from '@middlewares/authUser.js'

export default [
	{
		path: '/stores',
		component: async () => await import('@layouts/MainLayout.vue'),
		beforeEnter: [startUser],
		children: [
			{
				path: '',
				name:'stores',
				component: async () => await import('@pages/Stores.vue'),
				meta:{},
			},			
			{
				path: 'products',
				name: 'stores-products',
				component: async () => await import('@pages/Products.vue'),
				meta:{},
			},
			{
				path: '/stores:pathMatch(.*)*',
				name: 'stores-error',
				component: async () => await import('@pages/user/errors/ErrorStores.vue'),
				meta:{},
			},
			{
				path: '/stores/products:pathMatch(.*)*',
				name: 'products-error',
				component: async () => await import('@pages/user/errors/ErrorProducts.vue'),
				meta:{},
			}
		]
	},
	{
		path: '/store',
		component: async () => await import('@layouts/MainLayout.vue'),
		beforeEnter: [startUser],
		children: [
			{
				path: 'profile/:name',
				name:'store-profile',
				component: async () => await import('@pages/ProfileStore.vue'),
			},
			{
				path: 'product/:name',
				name: 'store-product-profile',
				component: async () => await import('@pages/ProfileProduct.vue'),
			},
			{
				path: '/store/product/:name:pathMatch(.*)*',
				name: 'store-product-error',
				component: async () => await import('@pages/user/errors/ErrorProduct.vue'),
			},
			{
				path: '/store:pathMatch(.*)*',
				name: 'store-error',
				component: async () => await import('@pages/user/errors/ErrorStore.vue'),
			},
		]
	},
]
