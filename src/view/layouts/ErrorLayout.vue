<script>
export default {
	name: 'ErrorLayout',
}
</script>

<template>
	<div ErrorLayout>
		<h1 class="h1-layout">Error layout public</h1>
		<router-view v-slot="{ Component, route }">
			<component :is="Component" />
		</router-view>
	</div>
</template>
