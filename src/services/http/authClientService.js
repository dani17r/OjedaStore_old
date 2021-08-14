import { SessionStorage } from 'quasar'

export const addCredentials = (state, data) => {
	state.session.status = true
	state.session.uidClient = data
	SessionStorage.set('uidClient', data)
	SessionStorage.set('status', true)
}

export const deleteCredentials = (state) => {
	state.session.status = false
	state.session.uidClient = null
	SessionStorage.set('uidClient', null)
	SessionStorage.set('status', false)
}
