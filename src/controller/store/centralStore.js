import { Dark } from "@tools/helps/modeDark.js";
import { ReverseValue } from "@tools/utils.js";
import { defineStore } from "pinia";

export const useCentralStore = defineStore({
  id: "centralStore",
  state: () => ({
    scroll: {},
    leftDrawerOpen: false,
    dark: {
      guest: Dark.isActive("guest"),
      admin: Dark.isActive("admin"),
      user: Dark.isActive("user")
    }
  }),
  getters: {
    isDark$: state => type => {
      Dark.set(type, state.dark[type]);
      return state.dark[type];
    }
  },
  actions: {
    _setDark_(type) {
      ReverseValue(this.dark, type);
    },
    _toggleLeftDrawer_() {
      ReverseValue(this, "leftDrawerOpen");
    }
  }
});
