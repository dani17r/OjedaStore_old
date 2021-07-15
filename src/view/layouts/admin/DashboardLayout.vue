<script>
import DScrollMain from "@components/scroll/DScrollMain.vue";
import DToolbarAdmin from "@components/toolbars/DToolbarAdmin.vue";

export default {
  name: "layout-dashboard-admin",
  components: {
    DScrollMain,
    DToolbarAdmin
  }
};
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="admin">
    <DToolbarAdmin/>
    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <DScrollMain :currentRoute="route">
          <component :is="Component" />
        </DScrollMain>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
