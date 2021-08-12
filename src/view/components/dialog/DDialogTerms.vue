<script>
// import { storeGlobal } from '@modules/store.cmp.js'
// import { ref, watch, computed } from 'vue'

export default {
  name: "DDialogTerms",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
<q-dialog v-model="modelValue" @before-hide="$emit('closed')">
  <q-card style="min-width: 650px" class="dialog-dark-mode">
    <q-card-section>
      <div class="text-h5 text-terms">Uso de terminos y condiciones</div>
      <div class="text-h6 text-terms">OjedaStore</div>
    </q-card-section>

    <q-card-section>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </q-card-section>

    <q-card-actions align="right" class="text-one">
      <q-btn flat label="Cerrar" @click="$emit('closed')" color="red-4" />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

<style lang="scss">
@import "@scss/app.scss";

.mode--dark {
		.dialog-dark-mode {
			background-color: $one-light-2;
			color: $one-light-1;
		}
		.text-terms{
			color: $one-light-2;
		}
}
.text-terms{
	color: $one;
}
</style>
