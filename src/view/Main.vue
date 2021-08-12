<script>
export default {
	name: 'main-app',
}
</script>

<template>
<router-view v-slot="{ Component }">
	<div id="transition">
		<q-circular-progress indeterminate size="50px" class="text-one progress" />
	</div>
	<component :is="Component" />
</router-view>
</template>

<style lang="scss">
.progress {
    display: none;
}
.transition {
    overflow: hidden;
}
.bg-loading {
    position: fixed;
    z-index: 3000;
    width: 100%;
    height: 100vh;

    align-items: center;
    display: flex;
    justify-content: center;

    .progress {
        display: flex;
    }
}
</style>
