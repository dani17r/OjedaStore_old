import { addCredentials, deleteCredentials } from '@http/authClientService.js'
import { getResponseInHtml, activeError } from '@tools/utils.js'
import { uid, SessionStorage } from 'quasar'
import { api } from '@boot/axios.js'
import { clone } from 'lodash'
import { ref, unref, watch, computed, reactive } from 'vue'
import { get } from '@vueuse/core'

const state = reactive({
	session: {
		status: SessionStorage.getItem('status') || false,
		uiClient: SessionStorage.getItem('uiClient') || null,
	}
})

const actions = {

	setSession(value) {
		state.session.status = value
	},

	async register({ $q, credentials }) {

		let result = false

		let copyCredentials = clone({
			email: credentials.email.value,
			username: credentials.username.value,
			fullname: credentials.fullname.value,
			password: credentials.password.value,
			passwordConfirmation: credentials.passwordConfirmation.value,
		})

		$q.loading.show()
		const response = await api.post('user/register', copyCredentials)

		try {
			const registerResp = response?.data

			const msg = getResponseInHtml(registerResp)

			if(!registerResp?.error) {

				$q.notify({
					type: 'positive',
					message: msg,
					html: true,
				})
				result = true
			}
			else {
				const actErr = activeError(registerResp, credentials)

				if(actErr) {
					$q.notify({
						type: 'warning',
						message: msg,
						html: true,
					})
				}
			}
		}
		catch (e) {
			console.log(e)
			$q.notify({
				type: 'negative',
				message: `Ocurrio un error inesperado, porfavor
				revise su conexion a internet`,
			})

		}
		finally {
			$q.loading.hide()
		}

		return result
	},

	async login({ $q, credentials }) {

		const $uid = uid()
		let result = false

		let copyCredentials = clone({
			email: credentials.email.value,
			password: credentials.password.value,
		})

		$q.loading.show()
		const response = await api.post('user/login', copyCredentials)
		try {
			const loginResp = response?.data

			const msg = getResponseInHtml(loginResp)

			if(!loginResp?.error) {

				addCredentials(state, {
					uid: $uid,
					expires: loginResp.expires,
					createdAt: loginResp.createdAt
				})

				$q.notify({
					type: 'positive',
					message: msg,
					html: true,
				})
				result = true
			}
			else {
				const actErr = activeError(loginResp, credentials)

				if(actErr) {
					$q.notify({
						type: 'warning',
						message: msg,
						html: true,
					})
				}
			}
		} catch (e) {
			console.log(e)
			$q.notify({
				type: 'negative',
				message: `Ocurrio un error inesperado, porfavor
				revise su conexion a internet`,
			})

		} finally {
			$q.loading.hide()
		}

		return result
	},

	async logout({ $q }){

		$q.loading.show()
		const response = await api.post('user/logout')
		try {

			let logoutResp = response?.data
			if(!logoutResp?.error) {

				deleteCredentials(state)
				const msg = getResponseInHtml(logoutResp)

				$q.notify({
					type: 'positive',
					message: msg,
					html: true,
				})
			}
			// setTimeout(() => location.reload(), 700)

		} catch (e) {
			console.log(e)
			$q.notify({
				type: 'negative',
				message: `Ocurrio un error, porfavor intente nuevamente`,
			})
		} finally {
			$q.loading.hide()
		}
	},

	async getPassword(password){
		const response = (await api.post('user/profile/password', { password })).data
		return response.status
	},

	async changePassword(password, $q){
		const response = (await api.post('user/profile/password/update', { password })).data
		const msg = getResponseInHtml(response)

		if(!response?.error) {
			$q.notify({
				type: 'positive',
				message: msg,
				html: true,
			})
			return true
		}
		else{
			$q.notify({
				type: 'negative',
				message: msg,
				html: true,
			})
			return false
		}
	},

}

const getters = {
	// isSession$: computed(()=>state.session.status),
	isSession$: computed(()=>{
		console.log('computed', state.session.status);
		return state.session.status
	}),
}

export const authClientStore = {
	debug:true,
	state,
	...getters,
	...actions,
}
