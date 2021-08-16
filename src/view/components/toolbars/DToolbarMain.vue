<script>
import DMenuNotifications from "@components/menus/DMenuNotifications.vue";
import DMenuShoppingCart from "@components/menus/DMenuShoppingCart.vue";
import DDarkToggle from "@components/toggles/DDarkToggle.vue";
import DMenuUser from "@components/menus/DMenuUser.vue";

import { computed } from "vue";
import { authClientStore } from "@store/client/authClientStore.js";

export default {
  name: "DToolbarMain",
  components: {
    DMenuNotifications,
    DMenuShoppingCart,
    DDarkToggle,
    DMenuUser
  },
  setup() {
    //----Session user ----*
    const isSession = computed(() => authClientStore.isSession$.value);

    return {
      isSession
    };
  }
};
</script>

<template>
  <q-header elevated class="header-custom-main">
    <q-toolbar class="bg-one">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$emit('menu')"
      />

      <q-toolbar-title> OjedaStore </q-toolbar-title>

      <q-tabs inline-label v-if="!isSession">
        <q-route-tab
          icon="login"
          label="Iniciar sesion"
          to="/login"
          exact
          ripple
          no-caps
        />
        <q-route-tab
          icon="person_add"
          label="Registrar"
          to="/register"
          exact
          ripple
          no-caps
        />
      </q-tabs>

      <div class="auth-user-content" v-else>
        <DMenuShoppingCart />
        <DMenuNotifications />
        <DMenuUser />
      </div>

      <div class="rigth">
        <DDarkToggle type="guest" />
      </div>
    </q-toolbar>
  </q-header>
</template>


<style lang="scss">
.header-custom-main{
  .q-toolbar {
    min-height: 47px;
  }
}
</style>
