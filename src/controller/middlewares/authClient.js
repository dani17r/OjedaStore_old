import { boot } from "quasar/wrappers";
import { api } from "@boot/axios.js";
import { useauthClientStore } from "@store/client/authClientStore.js";
import { LoadingBar } from "quasar";

const getSessionServer = async () => (await api.get("user/session")).data;

const isSessionActive = async () => {
  const store = await useauthClientStore();
  const sesionServer = await getSessionServer();
  LoadingBar.stop();

  if (sesionServer?.error) {
    store.setSession(false);
  } else {
    store.setSession(sesionServer);
  }

  return store.isSession$;
};

export const startClient = async (to, from) => {
  await isSessionActive();
  LoadingBar.stop();
};

export const authenticared = async (to, from, next) => {
  const isSession = await isSessionActive();
  LoadingBar.stop();

  if (isSession) next("/");
  else next();
};

export const guest = async (to, from, next) => {
  const isSession = await isSessionActive();
  LoadingBar.stop();

  if (isSession) next();
  else next("/login");
};
