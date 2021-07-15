<script>
	import { useRouter } from 'vue-router'
export default {
	name: 'd-view-products',
	setup() {
		const router = useRouter()
		return {
			router
		}
	}
}
</script>

<template>
	<div class="q-pa-sm row items-start justify-center q-gutter-md" style="margin-top:390px">
		<q-card class="my-card" v-for="elem in 16" :key="elem.key">
			<div class="content-image">
				<div class="hover-image" @click="router.push({name: 'store-product-profile', params:{name:'other'}})">
					Ver producto
				</div>
				<img src="images/products/1.jpg">
			</div>
			<q-card-section>
				<div class="text-h6">Chaqueta semi-cuero</div>
				<div class="p-h2">2 colores</div>
				<div class="text-subtitle2">precio: $7</div>
			</q-card-section>
		</q-card>
	</div>
</template>

<style lang="scss">
.my-card {
    width:100%;
	max-width: 250px;
}
.content-image{
	position: relative;
	img{
		width: 100%;
	}
	&:hover{
		.hover-image{
			position: absolute;
			background-color: #756dba;
			width: 100%;
			height: 98%;
			z-index: 100;
			opacity: 0.3;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-size: xx-large;
			visibility: visible;
			border-radius: 5px;
			cursor: pointer;
			transition: all 0.2s;
		}
	}
}
.hover-image{
	position: absolute;
	visibility: hidden;
}

.mode--dark {
    .my-card {
        background: #4f4f4f;
        color: #fff;
    }
}
</style>
