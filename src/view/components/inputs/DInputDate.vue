<script>
import { ref, reactive, computed } from 'vue'
import { useCentralStore } from '@store/centralStore.js'
import { clone } from 'lodash'


export default {
	name: 'page-profile-user',
	props: {
		modelValue: {
			type: String,
			default: '1980/01/01',
		},
		namekey: {
			type: String,
			default: '',
		},
		mutation: {
			type: Object,
			default: {},
		}
	},
	setup(props) {

		const centralStore = useCentralStore()
		const isDark = computed(() => centralStore.isDark$('guest'))

		const modelValueCopy = computed(()=> props.modelValue)
		const modelValueMut = ref(props.modelValue)
		const modelValue = computed({
			get: () => modelValueMut.value,
			set: val => modelValueMut.value = val
		})

		const popupStatus = ref(false)
		const inputActive = ref(false)
		const inputDisable = ref(true)
		const blur = ref(true)

		const dRef = ref(null)


		const classProperty = ['input-modify input-date', {
			'q-field--float q-field--focused q-field--highlighted': inputActive
		}]

		const showDatePicker = () => {
			if (inputActive.value == false) {
				setTimeout(() => dRef.value.focus(), 250)
				popupStatus.value = true
				inputDisable.value = false
				inputActive.value = true
			}
		}

		const cancelEvent = () => {
			popupStatus.value = false
			inputActive.value = false
			inputDisable.value = true
		}

		const hideDatePicker = () => {
			if (blur.value) {
				modelValue.value = modelValueCopy.value
				cancelEvent()
			}
		}

		const cancelBirthDate = () => {
			blur.value = false
			modelValue.value = modelValueCopy.value
			cancelEvent()
			setTimeout(() => blur.value = true, 800)
		}
		const saveBirthDate = () => {
			blur.value = false
			if (props.mutation[props.namekey] != modelValue.value) {
				props.mutation[props.namekey] = modelValue.value
			}
			cancelEvent()
			setTimeout(() => blur.value = true, 800)
		}

		const press = (e) => {
			if (e.code == 'Enter') {
				saveBirthDate()
			} else if (e.code == 'Escape') {
				cancelBirthDate()
			}
		}
		return {
			showDatePicker,
			hideDatePicker,

			cancelBirthDate,
			saveBirthDate,

			inputDisable,
			inputActive,
			popupStatus,
			blur,

			classProperty,
			modelValue,
			press,

			isDark,
			dRef,
		}
	},
}
</script>

<template>
<q-input :borderless="!inputActive" :dark="isDark" :class="classProperty" @click.double="showDatePicker" :ref="(el)=> dRef=el" v-model="modelValue" v-bind="$attrs" :disable="inputDisable">
	<template v-slot:after>
		<q-icon name="event" class="cursor-pointer" size="20px" @click="showDatePicker" />
	</template>
</q-input>
<div style="width:200px; margin-left:28%">
	<q-popup-proxy transition-show="scale" transition-hide="scale" v-model="popupStatus" @hide="hideDatePicker">
		<q-date v-model="modelValue" :dark="isDark" @keydown="press">
			<div class="row items-center justify-center">

				<q-btn v-close-popup label="Guardar" color="primary" flat @click="saveBirthDate" />
				<q-btn v-close-popup label="Cancelar" color="negative" flat @click="cancelBirthDate" />
			</div>
		</q-date>
	</q-popup-proxy>
</div>
</template>

<style lang="scss">

.input-date {

    .disabled {

        &.q-field--disabled .q-field__control > div {
            opacity: 1 !important;
        }
    }
}
</style>
