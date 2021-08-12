import { boot } from 'quasar/wrappers'
import { LoadingBar } from 'quasar'
import { useCentralStore } from '@store/centralStore.js'

const modeDark = ({ store, type }) => {
	let isDark$ = store.isDark$(type)
	let colorBg = isDark$ ? 'bg-dark' : 'bg-light'
	let color = isDark$ ? 'white' : 'one'
	return { colorBg, color }
}

const getHtmlId = (value) => {
	return document.getElementById('transition').classList
}
let RoutesMemory = []
let guieTo = true
const GuieToRouter = (currentRoute) => {
	if (!RoutesMemory.includes(currentRoute)) {
		RoutesMemory.push(currentRoute)
		return true
	}
	else return false
}


export default boot(function({ router }) {

	router.beforeEach((to, from, next) => {

		guieTo = GuieToRouter(to.fullPath)
		const centralStore = useCentralStore()
		const { colorBg, color } = modeDark({ store: centralStore, type: 'guest' })

		if(guieTo) {
			getHtmlId().add(`bg-loading`, `${colorBg}`)

			LoadingBar.setDefaults({
				color,
				size: '3px',
				position: 'top'
			})
			LoadingBar.start()
		}
		next()
	})

	router.afterEach((to, from) => {
		const centralStore = useCentralStore()
		const { colorBg } = modeDark({ store: centralStore, type: 'guest' })

		if(guieTo) {
			setTimeout(() => {
				getHtmlId().remove(`bg-loading`, `${colorBg}`)
				LoadingBar.stop()
			}, 1000)
		}
	})

})
