<script>
import { ref, reactive, computed, watch } from 'vue'
import { useCentralStore } from '@store/centralStore.js'
import { useUserStore } from "@store/user/userStore.js";

import { clone } from 'lodash'

export default {
	name: 'page-profile-user',
	props: {
		modelValue: {
			type: [String, Number],
			default: '',
		},
		value: {
			type: [String, Number],
			default: '',
		},
		delete:{
			type: Boolean,
			default: false,
		},
		namekey: {
			type: [String, Array],
		},
		mutation: {
			type: [Object, Array],
		},
		edition: {
			type: Boolean,
			default: false,
		},
		deepField: {
			type: String,
			default: null,
		},
		updateField: {
			type: [Object, Array],
		}
	},
	setup(props, { emit }) {
		const centralStore = useCentralStore();
		const userStore = useUserStore();

		const isDark = computed(() => centralStore.isDark$('guest'))
		const activeInput = ref(false)
		const focusInput = ref(false)

		const modelValueMemory = ref(null)
		const dRef = ref(null)

		const modelValue = computed({
			get: () => props.modelValue || props.value,
			set: val => modelValueMemory.value = val
		})

		const blurEvent = () => {
			activeInput.value = false
			setTimeout(() => {
				modelValue.value = props.modelValue
				focusInput.value = false
			}, 250)
		}

		const classProperty = computed(() => {
			return ['input-modify', { 'change': activeInput.value }]
		})

		const updateData = () => {
			if (_.isArray(props.namekey)) {
				props.mutation[props.namekey[0]][props.namekey[1]] = modelValueMemory.value
			}
			else {
				props.mutation[props.namekey] = modelValueMemory.value
			}

			if (!_.isEmpty(props.deepField)) {
				userStore.updateUser({
					[props.deepField]: props.updateField
				})
			} else {
				if (_.isArray(props.namekey)) {
					userStore.updateUser({
						[props.namekey[0]]: modelValueMemory.value
					})
				}
				else {
					userStore.updateUser({
						[props.namekey]: modelValueMemory.value
					})
				}
			}
		}

		const activeEdit = () => {

			if (!focusInput.value) {
				setTimeout(() => dRef.value.focus(), 250)
				activeInput.value = !activeInput.value
			} else activeInput.value = false

			if (!activeInput.value) {
				let compared = null

				if (_.isArray(props.namekey)) {
					compared = props.mutation[props.namekey[0]][props.namekey[1]] != modelValueMemory.value
				}
				else {
					compared = props.mutation[props.namekey]  != modelValueMemory.value
				}

				const isNotEmpy = modelValueMemory.value != null || '' || undefined

				if (compared && isNotEmpy) {
					updateData()
				}
			}
		}

		watch(() => props.delete, (value) => {
			if (value) setTimeout(()=> delteData(), 300)
		})

		const delteData = () => {
			// userStore.updateUser({
			// 	[props.deepField]: props.updateField
			// })
		}

		const press = (e) => {
			if (e.code == 'Enter') {
				activeEdit()
			} else if (e.code == 'Escape') {
				blurEvent()
			}
		}

		if (props.edition) {
			activeEdit()
		}

		return {
			classProperty,
			activeInput,
			focusInput,
			activeEdit,
			modelValue,
			blurEvent,
			isDark,
			press,
			dRef,
		}
	},
}
</script>

<template>
<q-input :borderless="!activeInput" :dark="isDark" :class="classProperty" :ref="(el)=> dRef=el" @blur="blurEvent" @focus="focusInput=true" :disable="!activeInput" v-model="modelValue" @keydown="press">
	<template v-slot:after>
		<q-btn @click="activeEdit" :icon="activeInput ? 'save': 'edit'" :dark="isDark" size="11px" flat round />
	</template>
</q-input>
</template>

<style lang="scss">
.mode--dark {
    .input-modify {
        .q-field__control {
            .q-field__label {
                color: #b5adff !important;
            }
        }
    }
}
.input-modify {
    // width: 60%;
    .q-field__control {
        height: 30px;
        margin-top: 13px;
        .q-field__label {
            top: 0 !important;
        }
        .q-field--float {
            transition: 0;
        }
    }
    &.change {
        .q-field__control {
            height: 27px;
            margin-top: 14px;
        }
    }
    &.q-field--disabled .q-field__inner {
        cursor: auto !important;
    }
    .q-field--labeled .q-field__native,
    .q-field--labeled .q-field__prefix,
    .q-field--labeled .q-field__suffix {
        padding: 15px !important;
        line-height: 10px !important;
    }

}
.q-field--labeled .q-field__native,
.q-field--labeled .q-field__prefix,
.q-field--labeled .q-field__suffix {
    line-height: 15px;
    padding-top: 15px;
    padding-bottom: 10px;
}
</style>
