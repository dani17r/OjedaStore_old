import { computed } from 'vue'

import { useCentralStore } from '@store/centralStore.js'
import { useclientStore } from '@store/client/clientStore.js'

export const storeGlobal = () => {

  /** isDark --------------- **/
  const centralStore = useCentralStore();
  const isDark = computed(() => centralStore.isDark$)

  /** clientStore --------------- **/
  const clientStore = useclientStore()
  const user = computed(() => clientStore.user)

  return {
      centralStore,
      clientStore,
      isDark,
      user,
  }
}
