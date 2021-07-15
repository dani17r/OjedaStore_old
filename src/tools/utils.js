import { uid, format } from 'quasar'
const { capitalize } = format

let invalidated = [
	'', '#', '0', 'null', 'NaN', 'undefined',
	0, null, NaN, undefined
]

/**
 * @function
 * @name Validated
 * @param { Any } value - valor que recive para validar
 * @return { Boolean }
 */
export const Validated = (value) => {
	return !invalidated.includes(value)
}

export const KeyBy = (arr, key) => {
	return arr.reduce((acc, el) => {
		acc[el[key]] = el
		return acc
	}, {})
}

export const ReverseValue = (value, property) => {
	if(Validated(property)){
		value[property] = !value[property]
	} else {
		if(Validated(value.value)) {
			value.value = !value.value
		}
	}
	return
}
export const getResponseInHtml = (data) => {
	let html = ''
	if (data?.info?.length > 0) {
		data.info.forEach(msg => html += `<li>${capitalize(String(msg))}</li>`)
	}
	return html
}
export const activeError = (data, modify) => {
	let retrn = false
	if (data?.info?.length > 0) {
		data.info.forEach(msg => {
			const key = String(msg).split('"')[1]
			if (key) {
				modify[key].error = true
				modify[key].msgError = String(msg)
			}
			else {
				retrn = true
			}
		})
	}
	return retrn
}

export const clearObject = (value) => {

	for (let key in value) {

		if (typeof value[key] == 'object') {
			clearObject(value[key])
		}
		if (typeof value[key] == 'boolean') {
			value[key] = false
		}
		if (typeof value[key] == 'string') {
			value[key] = null
		}
		if (typeof value[key] == 'number') {
			value[key] = 0
		}
	}
}
