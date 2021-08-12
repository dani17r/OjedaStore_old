<script>
export default {
	name: 'Error404'
}
</script>

<template>
<div class="fullscreen bg-one text-white text-center flex flex-center">
	<div class="col-12">
		<div style="font-size: 12vh">Error 404</div>

		<div class="text-h2" style="opacity:.4">
			La ruta que estas buscando, no existe.
		</div>

		<q-btn class="q-mt-xl" color="white" text-color="one" unelevated to="/" label="Ir al inicio" no-caps />
	</div>
</div>
</template>
