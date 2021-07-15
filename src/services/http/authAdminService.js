import { SessionStorage } from 'quasar'

export const addCredentials = (state, data) => {
	SessionStorage.set('uidAdmin', data)
	SessionStorage.set('statusAd', true)
	state.session.status = true
	state.session.uidAdmin = data
}

export const deleteCredentials = (state) => {
	state.session.status = false
	state.session.uidAdmin = null
	SessionStorage.set('uidAdmin', null)
	SessionStorage.set('statusAd', false)
}
