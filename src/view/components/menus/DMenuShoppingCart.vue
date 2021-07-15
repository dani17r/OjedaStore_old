<script>
export default {
	name: 'DMenuShoppingCart',
}
</script>

<template>
<q-btn dense flat round icon="shopping_cart" class="q-mr-md">
	<q-badge color="grey-8" floating>1</q-badge>
	<q-menu fit anchor="bottom right" self="top right" auto-close style="max-width:420px">
		<q-item clickable to="/user/shopping-cart">
			<q-item-section avatar style="min-width:40px;">
				<!-- <q-icon color="primary" name="message" /> -->
				<q-avatar size="60px">
					<img src="images/products/1.jpg" />
				</q-avatar>
			</q-item-section>
			<q-item-section>
				<q-item-label lines="1">Chaqueta de cuero - stanbulk</q-item-label>
				<q-item-label caption>precio: $11.6 - cantidad: 2 - total: $33.2</q-item-label>
				<q-item-label caption><q-icon name="store"/> Tienda: Nardo</q-item-label>
				<q-item-label caption><q-icon name="event"/> Agregado el 22/07/21</q-item-label>
			</q-item-section>
		</q-item>
	</q-menu>
</q-btn>
</template>
