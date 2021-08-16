<script>
import { authAdminStore } from "@store/admin/authAdminStore.js";
//import { userSeo } from '@config/seo'
import { clearObject } from "@tools/utils.js";
import { useMeta, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";

export default {
  name: "pages-login-admin",
  setup() {
    //useMeta(userSeo.login)

    const $q = useQuasar();
    const router = useRouter();

    const form = reactive({
      username: {
        value: "@_admin",
        error: false,
        msgError: ""
      },
      password: {
        value: "1234567#",
        error: false,
        msgError: ""
      },
      extendSession: false,
      isPwd: false
    });

    const onSubmit = async () => {
      const isLogin = await authAdminStore.login({ $q, credentials: form });
      if (isLogin)
        setTimeout(() => router.push({ name: "dashboard-main" }), 600);
    };
    const onReset = () => clearObject(form);

    return {
      onSubmit,
      onReset,
      form
    };
  }
};
</script>

<template>
  <div class="row justify-center">
    <div class="col-12 col-sm-7 col-md-5 col-lg-4">
      <div class="pages-login-admin q-pa-md q-mt-lg">
        <div class="title-login">
          <h5 class="title-h5">Inicio de sesion</h5>
          <span>Administrador</span>
        </div>

        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            clearable
            v-model="form.username.value"
            filled
            placeholder="nombre de usuario"
            class="color-border-input"
            :error="form.username.error"
            :error-message="form.username.msgError"
          />

          <q-input
            v-model="form.password.value"
            filled
            :type="!form.isPwd ? 'password' : 'text'"
            placeholder="Tu contraseña"
            class="color-border-input"
            clearable
            :error="form.password.error"
            :error-message="form.password.msgError"
          >
            <template v-slot:append>
              <q-icon
                :name="!form.isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="form.isPwd = !form.isPwd"
              />
            </template>
          </q-input>

          <q-toggle
            v-model="form.extendSession"
            label="Quiero extender mi session por mas tiempo"
            class="toggle-terms-accept"
          />

          <div class="row">
            <q-btn
              label="Aceptar"
              type="submit"
              color="one"
              dense
              class="col-8"
            />
            <q-btn
              label="Limpiar"
              type="reset"
              color="one"
              flat
              class="col-4"
              dense
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mode--dark {
  .color-border-input {
    .q-field__control:before {
      border-bottom: 1px solid #fff;
    }
    .q-field__native,
    .q-icon {
      color: white;
    }
  }
  .title-login {
    color: white;
  }
  .toggle-terms-accept {
    color: white;
  }
}
.pages-login-admin {
  .title-login {
    display: inline-block;
    margin: 10px 0;
    .title-h5 {
      padding: 0;
      margin: 0;
    }
  }
}
</style>
