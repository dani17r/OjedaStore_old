<script>
import { ref, computed } from 'vue'
import { useUserStore } from '@store/user/userStore.js'
import DInputEdit from '@components/inputs/DInputEdit.vue'
import DInputDate from '@components/inputs/DInputDate.vue'
import DImgProfile from '@components/images/DImgProfile.vue'
import DDialogPassword from '@components/dialog/DDialogPassword.vue'
import { useMeta } from 'quasar'
import { userSeo } from '@seo'

export default {
	name: 'PageProfileUser',
	components: {
		DInputEdit,
		DInputDate,
		DImgProfile,
		DDialogPassword,
	},
	setup() {
		useMeta(userSeo.profile)

		/** userStore --------------- **/
		const userStore = useUserStore()
		const form = computed(() => userStore.user)

		/** dialog --------------- **/
		const dialogPassword = ref(false)

		/** Address --------------- **/
		const modeEditAddress = ref(false)
		const addStatusAddress = ref(false)

		const blurEditonAddress = (field) => {
			if (_.isEmpty(field)) {
				if (addStatusAddress.value) {
					userStore.$patch(({ user }) => {
						user.locations.pop()
					})
					setTimeout(function () {
						addStatusAddress.value = false
					}, 250)
				}
			}
		}
		const addAddress = () => {
			addStatusAddress.value = true
			modeEditAddress.value = true
			userStore.$patch(({ user }) => {
				user.locations.push({
					address: '',
					reference: '',
				})
			})
		}
		const deleteAddress = (index) => {
			userStore.$patch(({ user }) => {
				user.locations.splice(index, 1)
			})
		}

		/** Phones --------------- **/
		const modeEditPhone = ref(false)
		const addStatusPhone = ref(false)
		const deleteStatusPhone = ref(false)

		const blurEditonPhone = (field) => {
			if (_.isEmpty(field)) {
				if (addStatusPhone.value) {
					userStore.$patch(({ user }) => {
						user.phones.pop()
					})
					setTimeout(function () {
						addStatusPhone.value = false
					}, 250)
				}
			}
		}
		const addPhones = () => {
			addStatusPhone.value = true
			modeEditPhone.value = true
			userStore.$patch(({ user }) => {
				user.phones.push('')
			})
		}
		const deletePhones = (index) => {
			userStore.$patch(({ user }) => {
				user.phones.splice(index, 1)
			})
			
			deleteStatusPhone.value = true
			setTimeout(()=> deleteStatusPhone.value = false, 250)
		}

		return {
			dialogPassword,
			form,

			addAddress,
			deleteAddress,
			modeEditAddress,
			blurEditonAddress,

			addPhones,
			deletePhones,
			modeEditPhone,
			blurEditonPhone,
			deleteStatusPhone,
		}
	},
}
</script>

<template>
	<q-page-sticky expand position="top" class="row element-sticky-fixed">
		<q-toolbar class="row card-justify">
			<q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
				<strong class="text-h6">
					<q-icon name="account_circle" size="25px" style="margin-top:-5px;" />
					Perfil de usuario
				</strong>
				<p class="no-margin q-pt-xs">
					Modificacion de los datos de la cuenta.
				</p>
			</q-card>
		</q-toolbar>
	</q-page-sticky>

	<div class="container spaces">
		<div class="row justify-center">
			<q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
				<strong class="text-h6">
					<q-icon name="person" size="25px" style="margin-top:-5px;" />
					Informacion de la cuenta
				</strong>
				<div class="flex q-mt-lg">

					<DImgProfile :src="form.image" />

					<div class="col q-px-md">

						<DInputEdit v-model="form.fullname" namekey="name" :mutation="form" placeholder="Nombre y apellido" label="Nombre completo" />

						<DInputEdit v-model="form.email" namekey="email" :mutation="form" placeholder="Email" label="E-mail" />

						<DInputEdit v-model="form.username" namekey="username" :mutation="form" placeholder="User name" label="Nombre de usuario" />

						<DInputDate v-model="form.birthDate" namekey="birthDate" :mutation="form" placeholder="Fecha de nacimiento" label="Fecha de nacimiento" />

					</div>
				</div>
			</q-card>
		</div>
		<!-- Telefonos -->
		<div class="row justify-center">
			<q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
				<strong class="text-h6">
					<q-icon name="pin_drop" size="25px" style="margin-top:-5px;" />
					Telefonos
				</strong>
				<div class="flex q-mt-lg">
					<div class="col q-px-md">
						<q-btn color="primary" icon="add_location" label="Agregar dirección" class="btn-left-full q-mb-md" @click="addPhones" />

						<div v-for="(phone, index) in form.phones" :key="index">
							<div class="row q-my-xs">
								<div class="col-11">
									<!-- Phone  -->
									<DInputEdit :value="phone" :namekey="['phones', index]" :mutation="form" placeholder="Numero de telefono activo" label="Numero de telefono" class="col-12" :edition="modeEditPhone" style="margin-bottom: -12px;" @blur="blurEditonPhone(phone)" deepField="phones" :updateField="form.phones" :delete="deleteStatusPhone"/>
								</div>
								<div class="col-1 flex justify-center self-center">
									<q-btn flat fab round icon="delete" color="red-4" v-if="index!=0" @click="deletePhones(index)" />
								</div>
							</div>
							<q-separator v-if="form.phones.length != index+1" color="primary" class="q-mb-md" />
						</div>

					</div>
				</div>
			</q-card>
		</div>

		<!-- Direcciones -->
		<div class="row justify-center">
			<q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
				<strong class="text-h6">
					<q-icon name="pin_drop" size="25px" style="margin-top:-5px;" />
					Direcciones
				</strong>
				<div class="flex q-mt-lg">
					<div class="col q-px-md">
						<q-btn color="primary" icon="add_location" label="Agregar dirección" class="btn-left-full q-mb-md" @click="addAddress" />

						<div v-for="(location, index) in form.locations" :key="index">
							<div class="row q-my-xs">
								<div class="col-11">
									<DInputEdit v-model="location.address" namekey="address" :mutation="location" placeholder="Dirección para recibir sus pedidos por delivery" label="Dirección" class="col-12" :edition="modeEditAddress" style="margin-bottom: -12px;" deepField="locations" :updateField="form.locations" @blur="blurEditonAddress(location.address)"/>

									<DInputEdit v-model="location.reference" namekey="reference" :mutation="location" placeholder="Referencia - color de casa, cerca de, etc." label="Referencia" class="col-12" deepField="locations" :updateField="form.locations"/>
								</div>
								<div class="col-1 flex justify-center self-center">
									<q-btn flat fab round icon="delete" color="red-4" v-if="index!=0" @click="deleteAddress(index)" />
								</div>
							</div>
							<q-separator v-if="form.locations.length != index+1" color="primary" class="q-mb-md" />
						</div>

					</div>
				</div>
			</q-card>
		</div>

		<!-- Cambiar contraseña -->
		<div class="row justify-center">
			<q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
				<strong class="text-h6">
					<q-icon name="lock_open" size="25px" style="margin-top:-5px;" />
					Contraseña de usuario
				</strong>
				<div class="flex q-mt-lg">
					<div class="col q-px-md">
						<q-btn color="primary" icon="https" label="Cambiar contraseña" class="full-width q-mb-md btn-left-full" @click="dialogPassword = true"/>
					</div>
				</div>
			</q-card>
		</div>

		<!-- Eliminar o Suspender -->
		<div class="row justify-center">
			<q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
				<strong class="text-h6">
					<q-icon name="pan_tool" size="25px" style="margin-top:-5px;" />
					Acciones de la cuenta
				</strong>
				<div class="flex q-mt-lg">
					<div class="col q-px-md">

						<q-btn color="primary" icon="delete" label="Eliminar cuenta" class="full-width q-mb-md btn-left-full" />

						<q-btn color="primary" icon="info" label="Suspender cuenta" class="full-width q-mb-md btn-left-full" />

					</div>
				</div>
			</q-card>
		</div>
	</div>
	<DDialogPassword v-model="dialogPassword" @closed="dialogPassword = false"/>
</template>

<style lang="scss">
.mode--dark {
    .card-profile {
        background-color: $grey-8;
        color: $grey-4;
    }
}
.element-sticky-fixed {
    background-color: #58537e;
}
.spaces {
    margin-top: 135px;
}
.element-sticky-fixed {
    z-index: 100;
}
.card-justify {
    justify-content: center;
    padding: 0;
}
.card-profile {
    margin: 16px;
    padding: 24px;
    color: $grey-8;
}
.btn-left-full {
    text-transform: initial;
    width: 100%;
    .q-btn__content {
        justify-content: end !important;
    }
}
.q-icon-active {
    position: absolute;
    background-color: #707070;
    color: #fff;
    opacity: 0.22;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>
