<script>
import { capitalize } from 'lodash'

export default {
	name: 'DItemTabLink',
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
	<q-route-tab class="item-router-tab" v-bind="propsSelection" :target="targetValidated" exact ripple no-caps narrow-indicator>
		<q-item-section v-if="icon" avatar>
			<q-icon :name="icon" />
		</q-item-section>

		<q-item-section>
			<q-item-label>{{ capitalize(title) }}</q-item-label>
			<q-item-label caption class="caption-label-tab">
				{{ capitalize(caption) }}
			</q-item-label>
		</q-item-section>
	</q-route-tab>
</template>

<style lang="scss">
.item-router-tab {
    justify-content: start;
    text-align: start;
    padding: 0 16px !important;
}
.mode--dark {
    .guest {
        .caption-label-tab {
            color: $grey-3;
        }
    }
}
</style>
