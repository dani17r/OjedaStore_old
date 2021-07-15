import { boot } from "quasar/wrappers";
import { api } from "@boot/axios.js";
import { useAuthUserStore } from "@store/user/authUserStore.js";
import { LoadingBar } from "quasar";

const getSessionServer = async () => (await api.get("user/session")).data;

const isSessionActive = async () => {
  const store = await useAuthUserStore();
  const sesionServer = await getSessionServer();
  LoadingBar.stop();

  if (sesionServer?.error) {
    store.setSession(false);
  } else {
    store.setSession(sesionServer);
  }

  return store.isSession$;
};

export const startUser = async (to, from, next) => {
  await isSessionActive();
  LoadingBar.stop();

  next();
};

export const authenticared = async (to, from, next) => {
  const isSession = await isSessionActive();
  LoadingBar.stop();

  if (isSession) next("/");
  next();
};

export const guest = async (to, from, next) => {
  const isSession = await isSessionActive();
  LoadingBar.stop();

  if (isSession) next();
  next("/login");
};
