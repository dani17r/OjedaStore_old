import { centralStore } from '@store/centralStore.js'
import { boot } from 'quasar/wrappers'
import { LoadingBar } from 'quasar'
import { computed} from 'vue'

const modeDark = () => {
	let isDark$ = computed(()=>centralStore.isDark$.value)
	let colorBg = isDark$.value ? 'bg-dark' : 'bg-light'
	let color = isDark$.value ? 'white' : 'primary'
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

	router.beforeEach((to, from) => {
		guieTo = GuieToRouter(to.fullPath)
		const { colorBg, color } = modeDark()

		if(guieTo) {
			getHtmlId().add(`bg-loading`, `${colorBg}`)

			LoadingBar.setDefaults({
				color,
				size: '3px',
				position: 'top'
			})
			LoadingBar.start()
		}
	})

	router.afterEach((to, from) => {
		const { colorBg } = modeDark()

		if(guieTo) {
			setTimeout(() => {
				getHtmlId().remove(`bg-loading`, `${colorBg}`)
				LoadingBar.stop()
			}, 1000)
		}
	})

})
