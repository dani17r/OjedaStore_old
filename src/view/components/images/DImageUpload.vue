<script>
import 'babel-polyfill'; // es6 shim
import {ref, reactive} from 'vue';
import myUpload from 'vue-image-crop-upload';
export default {
	components: {
		'my-upload': myUpload
	},
	setup(){
		const show = ref(true)
		const params = reactive({
			token: '123456798',
			name: 'avatar'
		})
		const headers = reactive({
			smail: '*_~'
		})
		const imgDataUrl = ref('')

		const toggleShow = () => {
			this.show.value = !this.show.value;
		}

		const cropSuccess = (imgDataUrl, field) => {
			console.log('-------- crop success --------');
			this.imgDataUrl = imgDataUrl;
		}

		const cropUploadSuccess = (jsonData, field) => {
			console.log('-------- upload success --------');
			console.log(jsonData);
			console.log('field: ' + field);
		}

		const cropUploadFail = (status, field) => {
			console.log('-------- upload fail --------');
			console.log(status);
			console.log('field: ' + field);
		}

		return {
			show,
			params,
			headers,
			imgDataUrl,
			toggleShow,
			cropSuccess,
			cropUploadSuccess,
			cropUploadFail,
		}
	},
}
</script>

<template>
	<div class="">
		<a class="btn" @click="toggleShow">set avatar</a>
		<my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="show" :width="300" :height="300" url="/upload" :params="params" :headers="headers" img-format="png"></my-upload>
		<img :src="imgDataUrl">

	</div>
</template>
