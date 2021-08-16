<script>
import { centralStore } from '@store/centralStore.js'

export default {
	name: 'DDarkToggle',
	setup() {

		//*----Mode dark ----
		const toggle = {
			get value() { return centralStore.isDark$.value },
			set value(v) { centralStore._setDark_() }
		}

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
