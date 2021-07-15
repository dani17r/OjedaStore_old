import { boot } from "quasar/wrappers";
import { api } from "@boot/axios.js";
import { useAuthAdminStore } from "@store/admin/authAdminStore.js";
import { LoadingBar } from "quasar";

const getSessionServer = async () => (await api.get("admin/session")).data;

const isSessionActive = async () => {
  const store = await useAuthAdminStore();
  const sesionServer = await getSessionServer();
  LoadingBar.stop();

  if (sesionServer?.error) {
    store.setSession(false);
  } else {
    store.setSession(sesionServer);
  }

  return store.isSession$;
};

export const startAdmin = async (to, from, next) => {
  await isSessionActive();
  LoadingBar.stop();
  next();
};

export const authenticared = async (to, from, next) => {
  const isSession = await isSessionActive();

  if (isSession) next({ name: "dashboard-main" });
  LoadingBar.stop();
  next();
};

export const guest = async (to, from, next) => {
  const isSession = await isSessionActive();
  LoadingBar.stop();

  if (isSession) next();
  next({ name: 'login-admin'});
};
