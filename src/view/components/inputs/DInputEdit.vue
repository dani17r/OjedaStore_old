<script>
import { ref, reactive, computed, watch } from 'vue'
import { useCentralStore } from '@store/centralStore.js'
import { useclientStore } from "@store/client/clientStore.js";

export default {
	name: 'page-profile-user',
	props: {
		modelValue: {
			type: [String, Number],
			default: null,
		},
		value: {
			type: [String, Number],
			default: null,
		},
		edit: {
			type: Boolean,
			default: false,
		},
		isDark: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			default: '',
		},
		index: {
			type: [String, Number],
		},
	},
	setup(props, { emit }) {

		const activeInput = ref(false)
		const focusInput = ref(false)

		const memory = ref(null)
		const dRef = ref(null)

		const modelvalue = computed({
			get: () => props.modelValue || props.value,
			set: val => memory.value = val
		})

		const blurEvent = () => {
			activeInput.value = false
			setTimeout(() => {
				modelvalue.value = props.modelValue
				focusInput.value = false
			}, 250)
		}

		const classProperty = computed(() => {
			return ['input-modify', { 'change': activeInput.value }]
		})

		const activeEdit = () => {

			if (!focusInput.value) {
				setTimeout(() => dRef.value.focus(), 250)
				activeInput.value = !activeInput.value
			} else activeInput.value = false

			if (!activeInput.value) {
				const compared = modelvalue.value != memory.value
				const isNotEmpy = memory.value != null || '' || undefined
				if (compared && isNotEmpy) {
					emit('update', {
						field: props.name,
						value: memory.value,
						key: props.index,
					})
				}
			}
		}

		const press = (e) => {
			if (e.code == 'Enter') activeEdit()
			else if (e.code == 'Escape') blurEvent()
		}

		if (props.edit) activeEdit()

		return {
			classProperty,
			activeInput,
			focusInput,
			activeEdit,
			modelvalue,
			blurEvent,
			press,
			dRef,
		}
	},
}
</script>

<template>
<q-input :borderless="!activeInput" :dark="isDark" :class="classProperty" :ref="(el)=> dRef=el" @blur="blurEvent" @focus="focusInput=true" :disable="!activeInput" v-model="modelvalue" @keydown="press">
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
