<script>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { authClientStore } from '@store/client/authClientStore.js'

import DDarkToggle from '@components/toggles/DDarkToggle.vue'
import DScrollMain from '@components/scroll/DScrollMain.vue'

export default {
	name: 'layout-auth',
	components: {
		DDarkToggle,
		DScrollMain,
	},
	setup() {
		const $q = useQuasar()
		// const store = authClientStore

		const isSession = computed(() => authClientStore.isSession$.value)
		const onLogout = () => store.logout({ $q })

		return {
			isSession,
			onLogout,
		}
	}
}
</script>

<template>
<q-layout view="lHh Lpr lFf" class="guest">
	<q-header elevated>
		<q-toolbar class="bg-one">
			<q-btn round fab-mini class="bg-white text-one" icon="reply" to="/" />
			<q-toolbar-title>
				OjedaStore
			</q-toolbar-title>

			<q-tabs inline-label v-if="!isSession">
				<q-route-tab icon="login" label="Iniciar sesion" to="/login" exact ripple no-caps/>
				<q-route-tab icon="person_add" label="Registrar" to="/register" exact ripple no-caps/>
			</q-tabs>

			<q-tabs inline-label v-else>
				<q-btn flat label="Salir" @click="onLogout" icon="logout" />
			</q-tabs>

			<div class="rigth">
				<DDarkToggle type="guest" />
			</div>
		</q-toolbar>
	</q-header>

	<q-page-container>
		<router-view v-slot="{ Component, route }">
			<DScrollMain :currentRoute="route">
				<component :is="Component" />
			</DScrollMain>
		</router-view>
	</q-page-container>
</q-layout>
</template>
