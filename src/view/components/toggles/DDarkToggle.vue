<script>
import { useCentralStore } from '@store/centralStore.js'

export default {
	name: 'DDarkToggle',
	props: {
		type: {
			type: String,
			require: true,
		},
	},
	setup({ type }) {
		const store = useCentralStore()

		//*----Mode dark ----
		const toggle = {
			get value() { return store.isDark$ },
			set value(v) { store._setDark_(type) }
		}
		//----Mode dark ----*

		return {
			toggle,
		}
	}
}
</script>

<template>
	<q-toggle v-model="toggle.value" color="grey-8" size="sm"
	checked-icon="panorama_fish_eye" unchecked-icon="brightness_2"/>
</template>
