import dashboard_admin from './admin/dashboard.js'
import auth_admin from './admin/auth.js'
const admin = [
	...dashboard_admin,
	...auth_admin,
]


import auth_user from './user/auth.js'
import main_user from './user/user.js'
const user = [
	...auth_user,
	...main_user,
]

import main_guest from './guest/main.js'
import stores_guest from './guest/stores.js'
const guest = [
	...main_guest,
	...stores_guest,
]

export default [
	...guest,
	...user,
	...admin,
]
