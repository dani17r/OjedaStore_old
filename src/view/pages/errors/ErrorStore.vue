<script>
export default {
	name: 'ErrorStore'
}
</script>

<template>
<div class="fullscreen bg-one text-white text-center flex flex-center">
	<div class="col-12">
		<div style="font-size: 12vw" class="col">Error 404</div>

		<div class="col text-h2" style="opacity:.4">
			<b>OjedaStore</b><br>
			<div style="padding:20px; width: 600px;">
				Esta tienda no existe.
			</div>
		</div>

		<q-btn class="col q-mt-xl" color="white" text-color="one" unelevated to="/stores" label="Ir a tiendas" no-caps />
	</div>
</div>
</template>
