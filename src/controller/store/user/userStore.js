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
		showImage(image) {
			if (!_.isEmpty(image))
			  return `http://localhost:3000/user/profile/avatar/${image}`
			else
				return `images/users/profiles/1.png`
		},
		async getUser(){
			if (this.init <= 1) {
				const response = (await api.get('user/profile')).data
				if (!response?.error) {
					this.user = response.user
					this.user.image = this.showImage(response.user.image)
				}
			}
			this.init++
		},
		async updateUser(update){
			/*const response = */await (api.post('user/profile/update', update)).data
		},
		async deleteUser(){
			await api.post('user/profile/delete')
		},
	}
})
