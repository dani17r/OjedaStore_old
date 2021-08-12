import { startClient } from '@middlewares/authClient.js'

export default [
	{
		path: '/vendors',
		component: async () => await import('@layouts/MainLayout.vue'),
		beforeEnter: [startClient],
		children: [
			{
				path: '',
				name:'vendors',
				component: async () => await import('@pages/vendor/Vendors.vue'),
				meta:{},
			},
			{
				path: 'products',
				name: 'vendors-products',
				component: async () => await import('@pages/vendor/Products.vue'),
				meta:{},
			},
			{
				path: '/vendors:pathMatch(.*)*',
				name: 'vendors-error',
				component: async () => await import('@pages/errors/ErrorStores.vue'),
				meta:{},
			},
			{
				path: '/vendors/products:pathMatch(.*)*',
				name: 'products-error',
				component: async () => await import('@pages/errors/ErrorProducts.vue'),
				meta:{},
			}
		]
	},
	{
		path: '/store',
		component: async () => await import('@layouts/MainLayout.vue'),
		beforeEnter: [startClient],
		children: [
			{
				path: 'profile/:name',
				name:'store-profile',
				component: async () => await import('@pages/vendor/Vendor.vue'),
			},
			{
				path: 'product/:name',
				name: 'store-product-profile',
				component: async () => await import('@pages/vendor/Product.vue'),
			},
			{
				path: '/store/product/:name:pathMatch(.*)*',
				name: 'store-product-error',
				component: async () => await import('@pages/errors/ErrorProduct.vue'),
			},
			{
				path: '/store:pathMatch(.*)*',
				name: 'store-error',
				component: async () => await import('@pages/errors/ErrorStore.vue'),
			},
		]
	},
]
