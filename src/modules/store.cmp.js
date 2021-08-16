import {computed, reactive} from 'vue';

import {centralStore} from '@store/centralStore.js';
import {clientStore} from '@store/client/clientStore.js';

export const storeGlobal = () => {

  /** isDark --------------- **/
  const isDark = computed(() => centralStore.isDark$.value);

  /** clientStore --------------- **/
  const user = computed(()=>clientStore.state.user);

  return {centralStore, clientStore, isDark, user};
};
