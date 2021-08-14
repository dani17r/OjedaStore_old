import {computed, reactive} from 'vue';

import {useCentralStore} from '@store/centralStore.js';
import {clientStore} from '@store/client/clientStore.js';

export const storeGlobal = () => {

  /** isDark --------------- **/
  const centralStore = useCentralStore();
  const isDark = computed(() => centralStore.isDark$);

  /** clientStore --------------- **/
  const user = computed(()=>clientStore.state.user);

  return {centralStore, clientStore, isDark, user};
};
