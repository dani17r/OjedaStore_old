<script>
import DItemTabLink from '@components/items/DItemTabLink.vue'
import DItemLink from '@components/items/DItemLink.vue'
import DToolbarDrawerClient from '@components/toolbars/DToolbarDrawerClient.vue'

import { guestPrivadeLinks, guestFreeLinks } from '@directs/guest.js'
import { clientFreeLinks } from '@directs/client.js'
import { autorLinks } from '@directs/autor.js'
import { computed, ref } from 'vue'

import { useauthClientStore } from '@store/client/authClientStore.js'

export default {
  name: 'DDrawerLeft',
  components: {
    DToolbarDrawerClient,
    DItemTabLink,
    DItemLink,
  },
  setup(props, { attrs }) {
    const { modelValue } = attrs
    const attrsSelection = { modelValue }

    /** authenticared user----*** **/
    const authclientStore = useauthClientStore()
    const isSession = computed(() => authclientStore.isSession$)

    return {
      /** attributes selection by v-bind*/
      attrsSelection,

      /** directs router */
      guestPrivadeLinks,
      guestFreeLinks,
      clientFreeLinks,
      autorLinks,

      /** authenticared of user */
      isSession,
    }
  }
}
</script>

<template>
<q-drawer v-bind="attrsSelection" show-if-above bordered class="drawer">
  <q-list>
    <DToolbarDrawerClient v-if="isSession" />

    <q-item-label header class="title-header-drawer">
      Rutas principales
    </q-item-label>

    <q-tabs inline-label vertical style="height:250;" active-color="one">
      <template v-for="(link, index) in guestFreeLinks" :key="index">
        <DItemTabLink v-bind="link" />
      </template>
      <template v-for="(link, index) in guestPrivadeLinks" :key="index" v-if="!isSession">
        <DItemTabLink v-bind="link" />
      </template>
      <template v-for="(link, index) in clientFreeLinks" :key="index" v-if="isSession">
        <DItemTabLink v-bind="link" />
      </template>
    </q-tabs>

    <DItemLink v-bind="autorLinks[0]" />
  </q-list>
</q-drawer>
</template>

<style lang="scss">
.drawer {
    background-color: $grey-1;
    .title-header-drawer {
        color: $grey-8;
    }
}
.mode--dark {
    .q-drawer--left.q-drawer--bordered {
        border-right: 1px solid #464646;
    }
    .drawer {
        background-color: #4a4a4a;
        color: $grey-1;
        .title-header-drawer {
            color: $grey-1;
        }
    }
}
</style>
