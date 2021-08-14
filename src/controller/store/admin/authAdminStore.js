import { addCredentials, deleteCredentials } from "@http/authAdminService.js";
import { getResponseInHtml, activeError } from "@tools/utils.js";
import { uid, SessionStorage } from "quasar";
import { api } from "@boot/axios.js";
import { defineStore } from "pinia";
import { clone } from "lodash";

export const useAuthAdminStore = defineStore({
  id: "authAdminStore",
  state: () => ({
    session: {
      status: SessionStorage.getItem("statusAd") || false,
      uidAdmin: SessionStorage.getItem("uidAdmin") || null
    }
  }),
  getters: {
    isSession$: state => state.session.status
  },
  actions: {
    setSession(value) {
      this.session.status = value;
    },

    async register({ $q, credentials }) {
      let result = false;

      let copyCredentials = clone({
        username: credentials.username.value,
        password: credentials.password.value,
        passwordConfirmation: credentials.passwordConfirmation.value
      });

      $q.loading.show();
      const response = await api.post("admin/register", copyCredentials);

      try {
        const registerResp = response?.data;

        const msg = getResponseInHtml(registerResp);

        if (!registerResp?.error) {
          $q.notify({
            type: "positive",
            message: msg,
            html: true
          });
          result = true;
        } else {
          const actErr = activeError(registerResp, credentials);

          if (actErr) {
            $q.notify({
              type: "warning",
              message: msg,
              html: true
            });
          }
        }
      } catch (e) {
        console.log(e);
        $q.notify({
          type: "negative",
          message: `Ocurrio un error inesperado, porfavor
							  revise su conexion a internet`
        });
      } finally {
        $q.loading.hide();
      }

      return result;
    },

    async login({ $q, credentials }) {
      const $uid = uid();
      let result = false;

      let copyCredentials = clone({
        username: credentials.username.value,
        password: credentials.password.value
      });

      $q.loading.show();
      const response = await api.post("admin/login", copyCredentials);

      try {
        const loginResp = response?.data;

        const msg = getResponseInHtml(loginResp);

        if (!loginResp?.error) {
          addCredentials(this, {
            uid: $uid,
            expires: loginResp.expires,
            createdAt: loginResp.createdAt
          });

          $q.notify({
            type: "positive",
            message: msg,
            html: true
          });
          result = true;
        } else {
          const actErr = activeError(loginResp, credentials);

          if (actErr) {
            $q.notify({
              type: "warning",
              message: msg,
              html: true
            });
          }
        }
      } catch (e) {
        console.log(e);
        $q.notify({
          type: "negative",
          message: `Ocurrio un error inesperado, porfavor revise su conexion a internet`
        });
      } finally {
        $q.loading.hide();
      }

      return result;
    },

    async logout({ $q }) {
      $q.loading.show();
      const response = await api.post("admin/logout");
      try {
        let logoutResp = response?.data;
        if (!logoutResp?.error) {
          deleteCredentials(this);
          const msg = getResponseInHtml(logoutResp);

          $q.notify({
            type: "positive",
            message: msg,
            html: true
          });
        }
        setTimeout(() => location.reload(), 700);
      } catch (e) {
        console.log(e);
        $q.notify({
          type: "negative",
          message: `Ocurrio un error, porfavor intente nuevamente`
        });
      } finally {
        $q.loading.hide();
      }
    }
  }
});
