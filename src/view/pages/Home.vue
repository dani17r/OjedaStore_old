<script>
import { reactive } from 'vue'
import { guestSeo } from '@seo'
import { useMeta } from 'quasar'

import DCarouselResponsive from '@components/carousels/DCarouselResponsive.vue'
import DViewProducts from '@components/views/DViewProducts.vue'

export default {
	name: 'PageHome',
	components: {
		DCarouselResponsive,
		DViewProducts
	},
	setup() {
		useMeta(guestSeo.home)
	}
}
</script>

<template>
<q-page class="row justify-center">
	<DCarouselResponsive />
	<DViewProducts />
</q-page>
</template>

<style lang="scss">
.my-card {
    width: 100%;
    max-width: 250px;
}
.mode--dark {
    .my-card {
        background: #4f4f4f;
        color: #fff;
    }
}
</style>
