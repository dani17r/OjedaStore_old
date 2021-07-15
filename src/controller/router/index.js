import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

const routerMode = process.env.VUE_ROUTER_MODE === 'history'
const definedHistory = routerMode ? createWebHistory : createWebHashHistory
const createHistory = process.env.SERVER ? createMemoryHistory : definedHistory
const modeHistorySrr = process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE

export default route(() => {

	const Router = createRouter({
		scrollBehavior: () => ({ left: 0, top: 0 }),
		history: createHistory(modeHistorySrr),
		routes: routes,
	})

	return Router
})
