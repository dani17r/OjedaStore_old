<script>
import { authClientStore } from '@store/client/authClientStore.js'
import DDialogTerms from '@components/dialog/DDialogTerms'
import { clearObject } from '@tools/utils.js'
import { useMeta, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { userSeo } from '@config/seo'
import { api } from '@boot/axios.js'
import { reactive, ref } from 'vue'

export default {
  name: 'pages-register-user',
  components: {
    DDialogTerms,
  },
  setup() {

    useMeta(userSeo.register)
    const router = useRouter()
    const $q = useQuasar()

    const form = reactive({
      email: {
        value: 'marioperez@perez.com',
        error: false,
        msgError: '',
      },
      passwordConfirmation: {
        value: '1234567#',
        error: false,
        msgError: '',
      },
      username: {
        value: 'Perez17m',
        error: false,
        msgError: '',
      },
      fullname: {
        value: 'Mario Perez jimenez',
        error: false,
        msgError: '',
      },
      password: {
        value: '1234567#',
        error: false,
        msgError: '',
      },
      accept: false,
      isPwd: false,
    })

    const dialogTerms = ref(false)

    const onSubmit = async () => {
      const isRegister = await authClientStore.register({ $q, credentials: form })
      if (isRegister) setTimeout(() => router.push('/login'), 600)
    }

    const onReset = () => clearObject(form)

    return {
      dialogTerms,
      onSubmit,
      onReset,
      form,
    }

  }
}
</script>

<template>
<div class="row justify-center">
  <div class="col-12 col-sm-7 col-md-5 col-lg-4">

    <div class="pages-register-user q-pa-md q-mt-lg">
      <div class="title-register">
        <h5 class="title-h5">Registro</h5>
        <span>De usuario</span>
      </div>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">

        <q-input filled autofocu clearable v-model="form.fullname.value" placeholder="Nombre completo" class="color-border-input" :error="form.fullname.error" :error-message="form.fullname.msgError" />

        <q-input filled autofocu clearable v-model="form.username.value" placeholder="Username ejemplo: user01" class="color-border-input" :error="form.username.error" :error-message="form.username.msgError" />

        <q-input clearable v-model="form.email.value" filled type="email" placeholder="Email" class="color-border-input" :error="form.email.error" :error-message="form.email.msgError" />

        <q-input clearable filled v-model="form.password.value" type="password" placeholder="Contraseña" class="color-border-input" :error="form.password.error" :error-message="form.password.msgError" />

        <q-input clearable filled v-model="form.passwordConfirmation.value" :type="!form.isPwd ? 'password' : 'text'" placeholder="Contraseña de confirmación" class="color-border-input" :error="form.passwordConfirmation.error"
          :error-message="form.passwordConfirmation.msgError">
          <template v-slot:append>
            <q-icon :name="!form.isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="form.isPwd = !form.isPwd" />
          </template>
        </q-input>

        <div class="block">
          <q-toggle v-model="form.accept" label="Yo acepto los terminos y condiciones" class="toggle-terms-accept" />
          <p class="terms-conditions">
            <a href="javascript:void(0)" @click="dialogTerms=true">Leer aqui - terminos y condiciones</a>
          </p>
          <DDialogTerms v-model="dialogTerms" @closed="dialogTerms=false" />
        </div>

        <div class="row q-pt-md">
          <q-btn label="Registrar" type="submit" color="one" class="col-8" />
          <q-btn label="Limpiar" type="reset" color="one" flat class="col-4" />
        </div>
      </q-form>

    </div>
  </div>
</div>
</template>

<style lang="scss">
@import "@scss/app.scss";
.mode--dark {
    .color-border-input {
        .q-field__control:before {
            border-bottom: 1px solid $one-light-1;
        }
        .q-field__native,
        .q-icon {
            color: $one-light-1;
        }
    }
    .title-register {
        color: $one-light-1;
    }
    .toggle-terms-accept {
        color: $one-light-1;
    }
    .terms-conditions {
        a {
            color: $red-4;
        }
    }
}
.pages-register-user {

    .title-register {
        display: inline-block;
        margin: 10px 0;
        .title-h5 {
            padding: 0;
            margin: 0;
        }
    }
    .terms-conditions {
        margin: 0;
        padding-left: 10;
        a {
            color: $red-8;
        }
    }
}
</style>
