import { computed } from 'vue'

import { useCentralStore } from '@store/centralStore.js'
import { useUserStore } from '@store/user/userStore.js'

export const storeGlobal = () => {

  /** isDark --------------- **/
  const centralStore = useCentralStore();
  const isDark = computed(() => centralStore.isDark$('guest'))

  /** userStore --------------- **/
  const userStore = useUserStore()
  const user = computed(() => userStore.user)

  return {
      centralStore,
      userStore,
      isDark,
      user,
  }
}
