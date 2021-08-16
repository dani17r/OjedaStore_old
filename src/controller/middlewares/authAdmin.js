import { boot } from "quasar/wrappers";
import { api } from "@boot/axios.js";
import { authAdminStore } from "@store/admin/authAdminStore.js";
import { LoadingBar } from "quasar";
import { computed } from 'vue'

const getSessionServer = async () => (await api.get("admin/session")).data;

const isSessionActive = async () => {
  const store = await authAdminStore;
  const sesionServer = await getSessionServer();
  LoadingBar.stop();

  if (sesionServer?.error) {
    store.setSession(false);
  } else {
    store.setSession(sesionServer);
  }

  return computed(()=>store.isSession$.value).value;
};

export const startAdmin = async (to, from) => {
  await isSessionActive();
  LoadingBar.stop();
};

export const authenticared = async (to, from, next) => {
  const isSession = await isSessionActive();
  LoadingBar.stop();

  if (isSession) next({ name: "dashboard-main" });
  else next();
};

export const guest = async (to, from, next) => {
  const isSession = await isSessionActive();
  LoadingBar.stop();

  if (isSession) next();
  else next({ name: 'login-admin'});
};
