<script>
import { ReverseValue } from "@tools/utils.js";
import { centralStore } from "@store/centralStore.js";
import { computed } from "vue";

import DDrawerLeft from "@components/drawers/DDrawerLeft.vue";
import DToolbarMain from "@components/toolbars/DToolbarMain.vue";
import DScrollMain from "@components/scroll/DScrollMain.vue";

export default {
  name: "MainLayout",
  components: {
    DDrawerLeft,
    DToolbarMain,
    DScrollMain
  },
  setup() {

    //*----Drawer left ----
    const leftDrawerOpen = computed({
      get: () => centralStore.state.leftDrawerOpen,
      set: val => centralStore._toggleLeftDrawer_()
    });

    const toggleLeftDrawer = () => centralStore._toggleLeftDrawer_();

    return {
      leftDrawerOpen,
      toggleLeftDrawer
    };
  }
};
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="guest">
    <DToolbarMain @menu="toggleLeftDrawer()" />

    <!--/** MENU DE BARRA ISQUIERDO -->
    <DDrawerLeft v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <DScrollMain :currentRoute="route">
          <component :is="Component" />
        </DScrollMain>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
