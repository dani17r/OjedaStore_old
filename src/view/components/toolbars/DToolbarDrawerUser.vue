<script>
import { computed, ref } from "vue";
import { useUserStore } from "@store/user/userStore.js";

export default {
  name: "DToolbarDrawerUser",
  setup() {
    /** get user - data----*** **/
    const userStore = useUserStore();
    userStore.getUserFetch();
    const user = computed(() => userStore.user);

    return {
      /** data of user */
      user
    };
  }
};
</script>

<template>
  <div class="content-toolbar-user">
    <q-toolbar>
      <q-btn round to="/user/profile">
        <q-avatar size="60px">
          <img src="images/users/profiles/1.jpg" />
        </q-avatar>
      </q-btn>

      <q-toolbar-title>
        <span>{{ user.fullname }}</span>
        <p class="username">Usuario: dani17r</p>
      </q-toolbar-title>

      <q-btn flat round dense icon="settings" to="/user/configurations" />
    </q-toolbar>
  </div>
</template>

<style lang="scss">
.content-toolbar-user {
  background-color: #4c486e;
  height: 80px;
  padding: 10px 0;
  color: white;
  .username {
    font-size: 12px;
    margin: 0px;
  }
}
</style>
