<script>
import { ref } from 'vue'
export default {
	name: 'DImgProfile',
	props:{
		src: {
			type: String,
			default: null
		},
	},
	setup() {

	},
}
</script>

<template>
<q-btn round class="click-image-profile q-mr-md">
	<q-avatar style="height:auto; width:100%;">
		<q-icon name="camera_alt" class="q-icon-active"/>
		<img :src="src"/>
	</q-avatar>
</q-btn>
</template>

<style lang="scss">
	.q-icon-active {
		transition: 0.2s all;
		visibility: hidden;
	}
	.click-image-profile {
		max-width:200px !important;
		max-height:200px !important;
		&:hover{
			.q-icon-active {
				transition: 0.2s all;
				visibility:visible;
			}
		}
	}
</style>
