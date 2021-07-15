import { LocalStorage } from 'quasar'
import { Validated } from '@tools/utils.js'

 const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)

const nameModeDark = (type) => {
	return `modeDark_${capitalize(type)}`
}

export const Dark = {
	set(type, value) {
		if (Validated(type)) {
			const ElementBody = document.getElementsByTagName('body')[0];
			ElementBody.classList.remove("body--light")

			// const ElementBody = document.getElementById("body")
			if(value) {
				ElementBody.classList.add("mode--dark")
				ElementBody.classList.remove("mode--light")
				LocalStorage.set(nameModeDark(type), true)

			}else {
				ElementBody.classList.add("mode--light")
				ElementBody.classList.remove("mode--dark")
				LocalStorage.set(nameModeDark(type), false)
			}
		}
		else {
			throw new Error('The "type" of mode Dark is undefined')
		}
	},

	isActive(type){
		return LocalStorage.getItem(nameModeDark(type)) || false
	}
}
