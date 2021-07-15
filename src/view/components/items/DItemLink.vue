<script>
import { capitalize } from 'lodash'
export default {
	name: 'DItemLink',
	props: {
		title: {
			type: String,
			required: true
		},
		caption: {
			type: String,
			default: ''
		},
		href: {
			type: String,
			default: null
		},
		to: {
			type: String,
			default: null
		},
		icon: {
			type: String,
			default: ''
		},
		target: {
			type: Boolean,
			default: false
		},
		style: {
			type: Object,
			default: null
		}
	},
	setup(props, { attrs, slots, emit }) {

		const { target, to, href, style } = props

		const targetValidated = target ? '_blank' : null

		const propsSelection = { to, href, style }

		return {
			propsSelection,
			targetValidated,
			capitalize,
		}
	}
}
</script>

<template>
<q-item v-bind="propsSelection" clickable tag="a" :target="targetValidated" exact>
	<q-item-section v-if="icon" avatar>
		<q-icon :name="icon" />
	</q-item-section>

	<q-item-section>
		<q-item-label>{{ capitalize(title) }}</q-item-label>
		<q-item-label caption class="caption-label-tab">
			{{ capitalize(caption) }}
		</q-item-label>
	</q-item-section>
</q-item>
</template>
