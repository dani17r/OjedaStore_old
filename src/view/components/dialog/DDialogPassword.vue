<script>
import { useAuthUserStore } from '@store/user/authUserStore.js'
import { useUserStore } from '@store/user/userStore.js'
import { useQuasar } from 'quasar'

import { ref, watch, computed } from 'vue'
import { isEmpty } from 'lodash'
export default {
	name: "DDialogPassword",
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {

		/** Quasar --------------- **/
		const $q = useQuasar()

		/** userStore --------------- **/
		const authUserStore = useAuthUserStore()
		const userStore = useUserStore()
		const user = computed(() => userStore.user)

		/** stepper --------------- **/
		const step = ref(1)

		/** inputPassword --------------- **/
		const password = ref('')
		const newPassword = ref('')
		const confirmPassword = ref('')

		const isPwd = ref(true)
		const newIsPwd = ref(true)
		const confirmIsPwd = ref(true)

		const errorPass = ref(false)
		const errorNewPass = ref(false)
		const msgNewErrorPass = ref('')
		const msgErrorPass = ref('')

		const rulesPass = [
			val => !!val || 'No puede estar vacio',
			val => val.length >= 8 || 'La contraseña debe ser mayor a 8 digitos',
		]
		const rulesPassConfirm = [
			val => !!val || 'No puede estar vacio',
			val => val.length >= 8 || 'La contraseña debe ser mayor a 8 digitos',
			val => val != newPassword.value ? 'No coincide' : null,
		]
		const changeErrorPass = () => {
			if (errorPass.value) {
				errorPass.value = false
				msgErrorPass.value = ''
			}
		}
		const changeNextPass = async () => {
			if (!isEmpty(password.value)) {
				const result = await authUserStore.getUserPassword(password.value)
				if (result) {
					step.value = 2
				}
				else{
					msgErrorPass.value = 'Error de contraseña - incorrecta!'
					errorPass.value = true
				}
			}
		}
		const changePassword = () => {
			if (newPassword.value == confirmPassword.value) {
				const result = authUserStore.changeUserPassword(newPassword.value, $q)
				if (result) {
					emit('closed')
					step.value = 1
				}
			}
			else if (confirmPassword.value == "") {
				errorNewPass.value = true
				msgNewErrorPass.value = "Confirma la contraseña"
			}
		}

		watch(()=> props.modelValue, (val, oldVal) => {
			if (!val) {
				setTimeout(() => step.value = 1, 300000);
			}
		})
		return {
			rulesPassConfirm,
			changeErrorPass,
			confirmPassword,
			changeNextPass,
			msgNewErrorPass,
			changePassword,
			msgErrorPass,
			errorNewPass,
			confirmIsPwd,
			newPassword,
			errorPass,
			rulesPass,
			password,
			newIsPwd,
			isPwd,
			step,
		}
	},
}
</script>

<template>
<q-dialog v-model="modelValue" persistent>
	<q-card class="dialog-password">
		<q-card-section>
			<div class="text-h6 text-one">Cambio de contraseña</div>
		</q-card-section>

		<q-stepper v-model="step" vertical color="one" animated class="no-padding">
			<q-step :name="1" title="Contraseña actual" icon="lock_open" :done="step > 1" caption="Clave">

				<q-input v-model="password" filled autofocus :type="isPwd ? 'password' : 'text'" label="Ingresa tu contraseña actual para continuar" :rules="rulesPass" debounce="500" :clearable="true" :error="errorPass" :error-message="msgErrorPass" @update:model-value="changeErrorPass" @clear="changeErrorPass" @keyup.enter="changeNextPass">
					<template v-slot:append>
						<q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
					</template>
				</q-input>
			</q-step>

			<q-step :name="2" title="Cambiar contraseña" caption="Nueva clave" icon="lock_open" :done="step > 2">
				<q-input v-model="newPassword" filled autofocus :type="newIsPwd ? 'password' : 'text'" label="Ingresa una nueva contraseña" :rules="rulesPass" clearable debounce="500" :error="errorNewPass" :error-message="msgNewErrorPass">
					<template v-slot:append>
						<q-icon :name="newIsPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="newIsPwd = !newIsPwd" />
					</template>
				</q-input>
				<br>
				<q-input v-model="confirmPassword" filled :type="confirmIsPwd ? 'password' : 'text'" label="Confirmar la nueva contraseña" :rules="rulesPassConfirm" clearable debounce="500">
					<template v-slot:append>
						<q-icon :name="confirmIsPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="confirmIsPwd = !confirmIsPwd" />
					</template>
				</q-input>
			</q-step>

		</q-stepper>

		<q-card-actions align="right" class="text-one">
			<q-btn flat label="Cerrar" @click="$emit('closed')" color="red-4" />
			<q-btn flat :label="step == 1 ? 'Continuar': 'Aceptar'" @click="step == 1 ? changeNextPass() : changePassword()" />
		</q-card-actions>
	</q-card>
</q-dialog>
</template>

<style lang="scss">
	.mode--dark {
			.dialog-password {
				background-color: #3a3a3a;
				color: white;
			}
	}
	.dialog-password{
		min-width: 450px
	}
</style>
