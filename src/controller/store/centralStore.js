import { Dark } from "@tools/helps/modeDark.js";
import { defineStore } from "pinia";

export const useCentralStore = defineStore({
  id: "centralStore",
  state: () => ({
    scroll: {},
    leftDrawerOpen: false,
    dark: {
      status: Dark.isActive(),
    }
  }),
  getters: {
    isDark$: state => {
      Dark.set(state.dark.status);
      return state.dark.status;
    }
  },
  actions: {
    _setDark_() {
      this.dark.status = !this.dark.status
    },
    _toggleLeftDrawer_() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
});
