<script>
import { ref, computed } from 'vue'
import { useCentralStore } from '@store/centralStore.js'

export default {
	name: 'd-menu-notificacions',
	setup() {
		/** Modo dark */
		const centralStore = useCentralStore()
		const isDark = computed(()=> centralStore.isDark$)

		/** Opcion de notificacion leida*/
		const seeding = ref(true)

		return {
			seeding,
			isDark,
		}
	}
}
</script>

<template>
<q-btn dense flat round icon="notifications" class="q-mr-md">
	<q-badge color="red" floating>1</q-badge>
	<q-menu fit anchor="bottom right" self="top right" auto-close style="max-width:420px">
		<q-item clickable to="/user/notifications">
			<q-item-section avatar style="min-width:40px;">
				<q-icon color="one" name="message" />
			</q-item-section>
			<q-item-section>
				<q-item-label lines="1">
					<q-icon name="check_circle"/> Ya puedes buscar tu compra
				</q-item-label>
				<q-item-label caption>
					<q-icon name="event"/> February 22nd, 2019
				</q-item-label>
				<q-item-label caption>
					<q-icon name="store"/> tienda: Calibus
				</q-item-label>
			</q-item-section>
			<q-item-section side top>
				<q-item-label caption class="q-mb-sm">
					<q-icon name="access_time"/> 5 min ago
				</q-item-label>
				<q-btn flat round :color="isDark ? 'one-light-1' : 'one'" :icon="seeding ? 'visibility':'visibility_off'" @click="seeding=!seeding" />
			</q-item-section>
		</q-item>
	</q-menu>
</q-btn>
</template>
