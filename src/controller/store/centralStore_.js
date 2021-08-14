import { Dark } from "@tools/helps/modeDark.js";
import {reactive} from 'vue'

const state = reactive({
  scroll: {},
  leftDrawerOpen: false,
  dark: {
    status: Dark.isActive(),
  }
})

const actions = {

}
const getters = {
  // isDark$: {
  //   Dark.set(state.dark.status);
  //   return state.dark.status;
  // }
}

export const useCentralStore = {
  debug:true,
  state,
  getters: {
  },
  actions: {
    _setDark_() {
      this.dark.status = !this.dark.status
    },
    _toggleLeftDrawer_() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
}
