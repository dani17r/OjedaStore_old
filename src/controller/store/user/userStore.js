import { api } from '@boot/axios.js'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
	id: 'userStore',
	state: () => ({
		init:1,
		user:{},
		shoppingCart:{}
	}),
	getters: {
		// isSession$: (state) => state.session.status,
	},
	actions: {

		async getUserFetch(){

			if (this.init <= 1) {
				const response = (await api.get('profile')).data
				if (!response?.error) {
					this.user = response.user
					this.user.image = 'images/users/profiles/1.jpg'
					this.user.birthDate = '2019/02/01'
					this.user.locations = [{
						address: 'Barrio obrero, los peruanos, casa #135',
						reference: 'casa color amarilla, diagonal a la bodega de repuestos ´a que luis´'
					}]
				}
			}
			this.init++
		},

	}
})
