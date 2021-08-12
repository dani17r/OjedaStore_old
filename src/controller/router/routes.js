import dashboard_admin from './admin/dashboard.js'
import auth_admin from './admin/auth.js'
const admin = [
	...dashboard_admin,
	...auth_admin,
]


import auth_client from './client/auth.js'
import main_client from './client/main.js'
const client = [
	...auth_client,
	...main_client,
]

import main_guest from './guest/main.js'
const guest = [
	...main_guest,
]

import main_vendor from './vendor/main.js'
const vendor = [
	...main_vendor,
]

export default [
	...guest,
	...vendor,
	...client,
	...admin,
]
