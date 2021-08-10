<script>
import 'babel-polyfill';
import { ref, computed, reactive } from 'vue'
import MyUpload from 'vue-image-crop-upload';
import { useUserStore } from '@store/user/userStore.js'


const url = `http://localhost:3000/user/profile/avatar/upload`
const leng = {
	hint: 'click o arrastra la imagen aqui para subirla',
	loading: 'Subiendo…',
	noSupported: 'Este navegador no soporta los estadares javascript de esta web ',
	success: 'Imagen subida correctamente',
	fail: 'fallo la carga de la imagen',
	preview: 'Previsualización',
	btn: {
		off: 'Cancelar',
		close: 'Cerrar',
		back: 'Borrar',
		save: 'Guardar'
	},
	error: {
		onlyImg: 'Solo una imagen',
		outOfSize: 'la imagen a exedido el limite de tamaño: ',
		lowestPx: 'El tamaño de la imagen es demasiado bajo. Se espera al menos:'
	}
}
export default {
	name: 'DImgProfile',
	components:{
		MyUpload
	},
	props:{
		src: {
			type: String,
		},
		isDark:{
			type:Boolean,
			default:false,
		},
	},
	setup() {
		
		/** userStore --------------- **/
		const userStore = useUserStore()
		const user = computed(() => userStore.user)

		const show = ref(false)
		const image = ref('')

		const toggleShow = () => show.value = !show.value;

		const cropSuccess = async (imgData) => {
			console.log('-------- crop success --------');
			image.value = imgData;
		}

		const cropUploadSuccess = (jsonData) => {
			const name = jsonData.imageName
			const newImage = `http://localhost:3000/user/profile/avatar/${name}`
			image.value = newImage
			user.value.image = newImage
		}

		const cropUploadFail = (status) => {
			console.log('-------- upload fail --------');
			//console.log(status);
		}

		return {
			show,
			toggleShow,
			cropSuccess,
			cropUploadSuccess,
			cropUploadFail,
			image,
			leng,
			url,
		}
	},
}
</script>

<template>
	<MyUpload
		@crop-success="cropSuccess"
		@crop-upload-success="cropUploadSuccess"
		@crop-upload-fail="cropUploadFail"
		:width="300"
		:height="300"
		:noSquare="true"
		:class="isDark ? 'dark': null"
		:langExt="leng"
		:url="url"
		:withCredentials="true"
		method="POST"
		field="avatar"
		v-model="show"
	/>

	<q-btn round class="click-image-profile q-mr-md" @click="toggleShow">
		<q-avatar style="height:auto; width:100%;">
			<q-icon name="camera_alt" class="q-icon-active"/>
			<img :src="image ? image : src">
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
	.dark{
		.vicp-step1{
			background-color: #4a4a4a !important;
		}
		.vicp-wrap{
			background-color: #3a3a3a !important;
		}
		.vicp-icon1-arrow{
		    border-bottom: 14.7px solid #ffffff4d !important;
		}
		.vicp-icon1-body{
			background-color: #ffffff4d !important;
		}
		.vicp-icon1-bottom{
			// border: 6px solid #ffffff4d !important;
		}
		.vicp-hint, .vicp-no-supported-hint{
			color: white !important;
		}
		.vicp-drop-area{
			border: 1px dashed #ffffff40 !important;
		}
		.vicp-operate{
			a{
				color: #756dba !important;
			}
		}
	}
	.vicp-preview{
		height: 225px !important;
		.vicp-preview-item img{
			width: 100% !important;
			height: auto !important;
		}
	}
	// .vicp-img-container{
	// 	border-radius: 50%;
	// 	height: 240px !important;
	// 	.vicp-img-shade{
	// 		display: none;
	// 	}
	// }
</style>
