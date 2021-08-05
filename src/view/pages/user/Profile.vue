<script>
import { ref, computed } from 'vue'
import { useMeta } from 'quasar'
import { userSeo } from '@seo'

import { useCentralStore } from '@store/centralStore.js'
import { useUserStore } from '@store/user/userStore.js'

import DInputEdit from '@components/inputs/DInputEdit.vue'
import DInputDate from '@components/inputs/DInputDate.vue'
import DImgProfile from '@components/images/DImgProfile.vue'
import DDialogPassword from '@components/dialog/DDialogPassword.vue'

export default {
	name: 'PageProfileUser',
	components: {
		DDialogPassword,
		DImgProfile,
		DInputEdit,
		DInputDate,
	},
	setup() {
		useMeta(userSeo.profile)

		/** isDark --------------- **/
		const centralStore = useCentralStore();
		const isDark = computed(() => centralStore.isDark$('guest'))

		/** userStore --------------- **/
		const userStore = useUserStore()
		const user = computed(() => userStore.user)

		/** dialog --------------- **/
		const dialogPassword = ref(false)

		/** form user--------------- **/
		const updateUser = ({ field, value }) => {
			console.log('funciona', field, value);
			userStore.$patch(store => {
				store.user[field] = value
				userStore.updateUser({ [field]: value })

			})
		}

		/** locations --------------- **/
		const addStatusLocation = ref(false)
		const editAddress = ref(false)

		const updateLocation = ({ field, value, key}) => {
			userStore.$patch(({ user }) => {
				user.locations[key][field] = value
				userStore.updateUser({ locations: user.locations })
			})
		}
		const deleteLocation = (index) => {
			userStore.$patch(({ user }) => {
				user.locations.splice(index, 1)
				userStore.updateUser({ locations: user.locations })
			})
		}
		const blurLocation = (field) => {
			if (_.isEmpty(field)) {
				if (addStatusLocation.value) {
					userStore.$patch(({ user }) => {
						user.locations.pop()
					})
					setTimeout(function () {
						addStatusLocation.value = false
					}, 250)
				}
			}
		}
		const addLocation = (field) => {
			addStatusLocation.value = true
			editAddress.value = true
			userStore.$patch(({ user }) => {
				user.locations.push({
					address: '',
					reference: '',
				})
			})
		}

		/** Phones --------------- **/
		const addStatusPhone = ref(false)
		const editPhone = ref(false)

		const updatePhone = ({value, key}) => {
			userStore.$patch(({ user }) => {
				user.phones[key] = value
				userStore.updateUser({ phones: user.phones })
			})
		}
		const deletePhone = (index) => {
			userStore.$patch(({ user }) => {
				user.phones.splice(index, 1)
				userStore.updateUser({ phones: user.phones })
			})
		}
		const blurPhone = (field) => {
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
		const addPhone = () => {
			addStatusPhone.value = true
			editPhone.value = true
			userStore.$patch(state => {
				state.user.phones.push('')
			})
		}

		return {
			dialogPassword,
			updateUser,
			isDark,
			user,

			updateLocation,
			deleteLocation,
			blurLocation,
			addLocation,
			editAddress,

			deletePhone,
			updatePhone,
			editPhone,
			blurPhone,
			addPhone,
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
					Modificación de los datos de la cuenta.
				</p>
			</q-card>
		</q-toolbar>
	</q-page-sticky>

	<div class="container spaces">
		<div class="row justify-center">
			<q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
				<strong class="text-h6">
					<q-icon name="person" size="25px" style="margin-top:-5px;" />
					Información de la cuenta
				</strong>
				<div class="flex q-mt-lg">

					<DImgProfile :src="user.image"  :isDark="isDark"/>

					<div class="col q-px-md">

						<DInputEdit v-model="user.fullname" name="fullname" placeholder="Nombre y apellido" label="Nombre completo" @update="updateUser" :isDark="isDark"/>

						<DInputEdit v-model="user.email" name="email" placeholder="Email" label="E-mail" @update="updateUser" :isDark="isDark"/>

						<DInputEdit v-model="user.username" name="username" placeholder="User name" label="Nombre de usuario" @update="updateUser" :isDark="isDark"/>

						<DInputDate v-model="user.birthDate" name="birthDate" placeholder="Fecha de nacimiento" label="Fecha de nacimiento" @update="updateUser" :isDark="isDark"/>

					</div>
				</div>
			</q-card>
		</div>
		<!-- Telefonos -->
		<div class="row justify-center">
			<q-card elevation="7" class="card-profile col-12 col-sm-10 col-lg-9">
				<strong class="text-h6">
					<q-icon name="contact_phone" size="25px" style="margin-top:-5px;" />
					Telefonos
				</strong>
				<div class="flex q-mt-lg">
					<div class="col q-px-md">
						<q-btn color="primary" icon="phone" label="Agregar dirección" class="btn-left-full q-mb-md" @click="addPhone" />

						<div v-for="(phone, index) in user.phones" :key="index">
							<div class="row q-my-xs">
								<div class="col-11">
									<!-- Phone  -->
									<DInputEdit class="col-12" placeholder="Numero de telefono activo" label="Numero de telefono" :index="index" :value="phone" :isDark="isDark" :edit="editPhone" @update="updatePhone" @blur="blurPhone(phone)" />
								</div>
								<div class="col-1 flex justify-center self-center">
									<q-btn flat fab round icon="delete" color="red-4" v-if="index!=0" @click="deletePhone(index)" />
								</div>
							</div>
							<q-separator v-if="user.phones.length != index+1" color="primary" class="q-mb-md" />
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
						<q-btn color="primary" icon="add_location" label="Agregar dirección" class="btn-left-full q-mb-md" @click="addLocation" />

						<div v-for="(location, index) in user.locations" :key="index">
							<div class="row q-my-xs">
								<div class="col-11">
									<DInputEdit class="col-12" placeholder="Dirección para recibir sus pedidos por delivery" label="Dirección" name="address" v-model="location.address" :index="index" :isDark="isDark" :edit="editAddress" @update="updateLocation" @blur="blurLocation(location.address)" />

									<DInputEdit class="col-12" placeholder="Referencia - color de casa, cerca de, etc." label="Referencia" name="reference" v-model="location.reference" :index="index" :isDark="isDark" @update="updateLocation" />
								</div>
								<div class="col-1 flex justify-center self-center">
									<q-btn flat fab round icon="delete" color="red-4" v-if="index!=0" @click="deleteLocation(index)" />
								</div>
							</div>
							<q-separator v-if="user.locations.length != index+1" color="primary" class="q-mb-md" />
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
