<script>
import { useQuasar } from 'quasar'
import { useAuthUserStore } from '@store/user/authUserStore.js'

export default {
	name: 'DMenuUser',
	setup() {
		const $q = useQuasar()
		const authUserStore = useAuthUserStore()

		const onLogout = () => authUserStore.logout({ $q })
		return {
			onLogout
		}
	}
}
</script>

<template>
<q-btn flat dense round icon="view_quilt" class="q-mr-sm menu-user">
	<q-menu anchor="bottom right" self="top right" auto-close>

		<q-item clickable v-ripple to="/user/terms-conditions">
			<q-item-section avatar>
				<q-icon color="primary" name="help" />
			</q-item-section>
			<q-item-section>Terminos y condiciones</q-item-section>
		</q-item>

		<q-item clickable v-ripple to="/user/configurations">
			<q-item-section avatar>
				<q-icon color="primary" name="settings" />
			</q-item-section>
			<q-item-section>Configuración</q-item-section>
		</q-item>

		<q-item clickable v-ripple to="/user/profile">
			<q-item-section avatar>
				<q-icon color="primary" name="person" />
			</q-item-section>
			<q-item-section>Perfil</q-item-section>
		</q-item>

		<q-item clickable v-ripple @click="onLogout">
			<q-item-section avatar>
				<q-icon color="primary" name="logout" />
			</q-item-section>
			<q-item-section>Salir</q-item-section>
		</q-item>

	</q-menu>
</q-btn>
</template>
