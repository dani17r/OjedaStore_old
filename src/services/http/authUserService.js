import { SessionStorage } from 'quasar'

export const addCredentials = (state, data) => {
	SessionStorage.set('uidUser', data)
	SessionStorage.set('status', true)
	state.session.status = true
	state.session.uidUser = data
}

export const deleteCredentials = (state) => {
	state.session.status = false
	state.session.uidUser = null
	SessionStorage.set('uidUser', null)
	SessionStorage.set('status', false)
}
