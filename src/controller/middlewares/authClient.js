import { boot } from "quasar/wrappers";
import { api } from "@boot/axios.js";
import { authClientStore } from "@store/client/authClientStore.js";
import { LoadingBar } from "quasar";
import {computed} from 'vue'

const getSessionServer = async () => (await api.get("user/session")).data;

const isSessionActive = async () => {
  const store = authClientStore
  const sesionServer = await getSessionServer();
  LoadingBar.stop();

  if (sesionServer?.error) {
    store.setSession(false);
  } else {
    store.setSession(sesionServer);
  }

  return computed(()=>store.isSession$.value).value;
};

export const startClient = async (to, from) => {
  const isSession = await isSessionActive();
  // console.log('startClient', isSession);
  LoadingBar.stop();
};

export const authenticared = async (to, from, next) => {
  const isSession = await isSessionActive();
  // console.log('authenticared', isSession);
  LoadingBar.stop();

  if (isSession) next("/");
  else next();
};

export const guest = async (to, from, next) => {
  const isSession = await isSessionActive();
  // console.log('guest', isSession);
  LoadingBar.stop();

  if (isSession) next();
  else next("/login");
};
