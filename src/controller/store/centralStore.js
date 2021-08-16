import {Dark} from "@tools/helps/modeDark.js";
import {reactive, computed} from 'vue'

const state = reactive({
	scroll: {},
	leftDrawerOpen: false,
	dark: {
		status: Dark.isActive()
	}
})

const actions = {
  _setDark_() {
    state.dark.status = !state.dark.status
  },
  _toggleLeftDrawer_() {
    state.leftDrawerOpen = !state.leftDrawerOpen
  }
}

const getters = {
	isDark$: computed(() => {
		Dark.set(state.dark.status);
    // console.log('state', state.dark.status);
		return state.dark.status;
	})
}

export const centralStore = {
	debug: true,
	state,
	...getters,
	...actions,
}
