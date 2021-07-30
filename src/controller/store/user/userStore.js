import { api } from '@boot/axios.js'
import { defineStore } from 'pinia'
import axios from 'axios'

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

		async getUser(){

			if (this.init <= 1) {
				const response = (await api.get('user/profile')).data
				if (!response?.error) {
					this.user = response.user
					this.user.image = 'images/users/profiles/1.jpg'
					this.user.birthDate = '2019/02/01'
				}
			}
			this.init++
		},
		async updateUser(update){
			/*const response = */await (api.post('user/profile/update', update)).data
		},
	}
})