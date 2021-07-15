import MainLayout from '@layouts/MainLayout.vue'

import { guest } from '@middlewares/authUser.js'

export default [
{
        path: '/user',
	component: MainLayout,
	beforeEnter: [guest],
        children: [
	        {
                        path: 'shopping-cart',
			name:'user-shopping-cart',
                        component: () => import('@pages/user/ShoppingCart.vue'),
                },
		{
                        path: 'profile',
			name: 'user-profile',
                        component: () => import('@pages/user/Profile.vue'),
                },
                {
                        path: '/user/notifications',
                        name: 'user-notifications',
                        component: () => import('@pages/user/Notifications.vue'),
                },
                {
                        path: 'configurations',
                        name: 'user-configurations',
                        component: () => import('@pages/user/Configurations.vue'),
                },
                {
                        path: 'terms-conditions',
                        name: 'user-terms-conditions',
                        component: () => import('@pages/user/TermsConditions.vue'),
                },
        ],      
}
]
