<script>
import DMenuNotifications from "@components/menus/DMenuNotifications.vue";
import DMenuShoppingCart from "@components/menus/DMenuShoppingCart.vue";
import DDarkToggle from "@components/toggles/DDarkToggle.vue";
import DMenuUser from "@components/menus/DMenuUser.vue";

import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { authAdminStore } from "@store/admin/authAdminStore.js";

export default {
  name: "DToolbarAdmin",
  components: {
    DDarkToggle
  },
  setup() {
    const $q = useQuasar();

    const logout = () => authAdminStore.logout({ $q });
    return {
      logout
    };
  }
};
</script>

<template>
  <q-header elevated>
    <q-toolbar class="bg-one">
      <q-toolbar-title> OjedaStore-Admin </q-toolbar-title>

      <q-tabs inline-label>
        <q-btn
          icon="logout"
          label="cerrar sesion"
          ripple
          no-caps
          @click="logout"
        />
      </q-tabs>

      <div class="rigth">
        <DDarkToggle type="admin" />
      </div>
    </q-toolbar>
  </q-header>
</template>
