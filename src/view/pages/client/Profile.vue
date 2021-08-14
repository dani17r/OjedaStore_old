<script>
import { ref, computed } from "vue";
import { useMeta } from "quasar";
import { userSeo } from "@seo";

import {
  userUpdateBasic,
  userUpdateLocations,
  userUpdatePhones,
  deleteAccount
} from "@modules/pages/user/profile.cmp.js";

import { storeGlobal } from "@modules/store.cmp.js";

import DInputEdit from "@components/inputs/DInputEdit.vue";
import DInputDate from "@components/inputs/DInputDate.vue";
import DImgProfile from "@components/images/DImgProfile.vue";
import DDialogPassword from "@components/dialog/DDialogPassword.vue";

export default {
  name: "PageProfileUser",
  components: {
    DDialogPassword,
    DImgProfile,
    DInputEdit,
    DInputDate
  },
  setup() {
    useMeta(userSeo.profile);

    /** dialog --------------- **/
    const dialogPassword = ref(false);
    const isEmpty = val => _.isEmpty(val);

    return {
      ...userUpdateLocations(),
      ...userUpdatePhones(),
      ...userUpdateBasic(),
      ...deleteAccount(),
      ...storeGlobal(),

      dialogPassword,
      isEmpty
    };
  }
};
</script>

<template>
  <q-page-sticky expand position="top" class="row element-sticky-fixed">
    <q-toolbar class="row card-justify">
      <q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
        <strong class="text-h6">
          <q-icon name="account_circle" size="25px" style="margin-top:-5px;" />
          Perfil de usuario
        </strong>
        <p class="no-margin q-pt-xs">
          Modificación de los datos de la cuenta.
        </p>
      </q-card>
    </q-toolbar>
  </q-page-sticky>

  <div class="container spaces">
    <div class="row justify-center">
      <q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
        <strong class="text-h6">
          <q-icon name="person" size="25px" style="margin-top:-5px;" />
          Información de la cuenta
        </strong>
        <div class="flex q-mt-lg">
          <DImgProfile :src="user.image" :isDark="isDark" />

          <div class="col q-px-md">
            <DInputEdit
              v-model="user.fullname"
              name="fullname"
              placeholder="Nombre y apellido"
              label="Nombre completo"
              @update="updateUser"
              :isDark="isDark"
            />

            <DInputEdit
              v-model="user.email"
              name="email"
              placeholder="Email"
              label="E-mail"
              @update="updateUser"
              :isDark="isDark"
            />

            <DInputEdit
              v-model="user.username"
              name="username"
              placeholder="User name"
              label="Nombre de usuario"
              @update="updateUser"
              :isDark="isDark"
            />

            <DInputDate
              v-model="user.birthDate"
              name="birthDate"
              placeholder="Fecha de nacimiento"
              label="Fecha de nacimiento"
              @update="updateUser"
              :isDark="isDark"
            />

            <q-btn
              color="one"
              icon="https"
              label="Cambiar contraseña"
              class="q-mb-md btn-left-full"
              @click="dialogPassword = true"
            />

            <q-btn
              color="one"
              icon="delete"
              label="Eliminar cuenta"
              class="q-mb-md btn-left-full"
              @click="deleteUser($q)"
            />
          </div>
        </div>
      </q-card>
    </div>

    <!-- Telefonos -->
    <div class="row justify-center">
      <q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
        <strong class="text-h6">
          <q-icon name="contact_phone" size="25px" style="margin-top:-5px;" />
          Telefonos
        </strong>
        <div class="flex q-mt-lg">
          <div class="col q-px-md">
            <q-btn
              color="one"
              icon="phone"
              label="Agregar telefono"
              class="btn-left-full q-mb-md"
              @click="addPhone"
            />

            <div v-for="(phone, index) in user.phones" :key="index">
              <div class="row q-my-xs">
                <div class="col-11">
                  <!-- Phone  -->
                  <DInputEdit
                    class="col-12"
                    placeholder="Numero de telefono activo"
                    label="Numero de telefono"
                    :index="index"
                    :value="phone"
                    :isDark="isDark"
                    :edit="editPhone"
                    @update="updatePhone"
                    @blur="blurPhone(phone)"
                  />
                </div>
                <div class="col-1 flex justify-center self-center">
                  <q-btn
                    flat
                    fab
                    round
                    icon="delete"
                    color="red-4"
                    v-if="index != 0"
                    @click="deletePhone(index)"
                  />
                </div>
              </div>
              <q-separator
                v-if="user.phones.length != index + 1"
                color="one"
                class="q-mb-md"
              />
            </div>
            <p
              v-if="isEmpty(user.phones)"
              :class="isDark ? 'text-red-4' : 'text-red-6'"
            >
              Porfavor agrega un numero.
            </p>
          </div>
        </div>
      </q-card>
    </div>

    <!-- Direcciones -->
    <div class="row justify-center">
      <q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
        <strong class="text-h6">
          <q-icon name="pin_drop" size="25px" style="margin-top:-5px;" />
          Direcciones
        </strong>
        <div class="flex q-mt-lg">
          <div class="col q-px-md">
            <q-btn
              color="one"
              icon="add_location"
              label="Agregar dirección"
              class="btn-left-full q-mb-md"
              @click="addLocation"
            />

            <div v-for="(location, index) in user.locations" :key="index">
              <div class="row q-my-xs">
                <div class="col-11">
                  <DInputEdit
                    class="col-12"
                    placeholder="Dirección para recibir sus pedidos por delivery"
                    label="Dirección"
                    name="address"
                    v-model="location.address"
                    :index="index"
                    :isDark="isDark"
                    :edit="editAddress"
                    @update="updateLocation"
                    @blur="blurLocation(location.address)"
                  />

                  <DInputEdit
                    class="col-12"
                    placeholder="Referencia - color de casa, cerca de, etc."
                    label="Referencia"
                    name="reference"
                    v-model="location.reference"
                    :index="index"
                    :isDark="isDark"
                    @update="updateLocation"
                  />
                </div>
                <div class="col-1 flex justify-center self-center">
                  <q-btn
                    flat
                    fab
                    round
                    icon="delete"
                    color="red-4"
                    v-if="index != 0"
                    @click="deleteLocation(index)"
                  />
                </div>
              </div>
              <q-separator
                v-if="user.locations.length != index + 1"
                color="one"
                class="q-mb-md"
              />
            </div>

            <p
              v-if="isEmpty(user.locations)"
              :class="isDark ? 'text-red-4' : 'text-red-6'"
            >
              Porfavor agrega una ubicación.
            </p>
          </div>
        </div>
      </q-card>
    </div>
  </div>
  <DDialogPassword v-model="dialogPassword" @closed="dialogPassword = false" />
</template>

<style lang="scss">
.mode--dark {
  .card-profile {
    background-color: $grey-8;
    color: $grey-4;
  }
}
.element-sticky-fixed {
  background-color: #58537e;
}
.spaces {
  margin-top: 135px;
}
.element-sticky-fixed {
  z-index: 100;
}
.card-justify {
  justify-content: center;
  padding: 0;
}
.card-profile {
  margin: 16px;
  padding: 24px;
  color: $grey-8;
}
.btn-left-full {
  text-transform: initial;
  width: 100%;
  .q-btn__content {
    justify-content: end !important;
  }
}
.q-icon-active {
  position: absolute;
  background-color: #707070;
  color: #fff;
  opacity: 0.22;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
