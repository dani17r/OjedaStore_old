import {api} from '@boot/axios.js'
import {reactive} from 'vue';

const showImage = (image) => {
  if (!_.isEmpty(image))
    return `http://localhost:3000/user/profile/avatar/${image}`
  else
    return 'images/users/profiles/1.png'
}

const state = reactive({
  init: 1,
  user: {},
  shoppingCart: {}
})

const actions = {

  async getClient() {
    if (state.init <= 1) {
      const res = (await api.get('user/profile')).data
      if (!res.error) {
        state.user = res.user
        state.user.image = showImage(res.user.image)
      }
    }
    state.init++
  },

  async updateClient(update) {
    await api.post('user/profile/update', update)
  },

  async deleteClient() {
    await api.post('user/profile/delete')
  }

}
const getters = {}


export const clientStore = {
  debug: true,
  state,
  ...actions,
  ...getters,
};
