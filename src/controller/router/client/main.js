import MainLayout from '@layouts/MainLayout.vue'

import {guest} from '@middlewares/authClient.js'

export default[
  {
    path: '/user',
    component: MainLayout,
    beforeEnter: guest,
    children: [
      {
        path: 'shopping-cart',
        name: 'user-shopping-cart',
        component: () => import ('@pages/client/ShoppingCart.vue')
      }, {
        path: 'profile',
        name: 'user-profile',
        component: () => import ('@pages/client/Profile.vue')
      }, {
        path: '/user/notifications',
        name: 'user-notifications',
        component: () => import ('@pages/notify/ClientNotify.vue')
      }, {
        path: 'configurations',
        name: 'user-configurations',
        component: () => import ('@pages/config/ClientConfig.vue')
      }, {
        path: 'terms-conditions',
        name: 'user-terms-conditions',
        component: () => import ('@pages/Terms.vue')
      }
    ]
  }
]
