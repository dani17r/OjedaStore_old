<script>
import DDarkToggle from '@components/toggles/DDarkToggle.vue'
export default {
	name: 'LayoutAuthAdmin',
	components: {
		DDarkToggle,
	}
}
</script>

<template>
<q-layout view="lHh Lpr lFf" class="admin">
	<q-header elevated>
		<q-toolbar class="bg-blue-7">
			<q-toolbar-title> Login Admin </q-toolbar-title>

			<div class="rigth">
				<DDarkToggle type="admin" />
			</div>
		</q-toolbar>
	</q-header>

	<q-page-container>
		<router-view />
	</q-page-container>
</q-layout>
</template>
