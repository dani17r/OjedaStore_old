<script>
import { ReverseValue } from "@tools/utils.js";
import { useCentralStore } from "@store/centralStore.js";
import { ref, computed } from "vue";

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
    const centralStore = useCentralStore();

    //*----Drawer left ----
    const leftDrawerOpen = computed({
      get: () => centralStore.leftDrawerOpen,
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
