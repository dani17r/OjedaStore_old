import { useQuasar } from 'quasar'
import { Validated } from '@tools/utils.js'

let _default_ = {
	// color: 'red-7',
	// icon: 'warning',
	textColor: 'white',
	message: 'default text',
	html: false,
	progress: true,
	timeout: 7000,
	multiLine:true,
	position: 'bottom', /* op-left top-right bottom-left bottom-right top bottom left right center */
}
export default (type, _default_) => {
	if (type == 'warning') {
		_default_.type = 'warning'
		useQuasar().notify(_default_)
	}
	else if (type == 'success') {
		_default_.type = 'positive'
		useQuasar().notify(_default_)
	}
	else if (type == 'error') {
		_default_.type = 'negative'
		useQuasar().notify(_default_)
	}
	else if (type == 'status') {
		_default_.type = 'info'
		useQuasar().notify(_default_)
	}
	else {
		_default_.type = 'ongoing'
		useQuasar().notify(_default_)
	}
}
