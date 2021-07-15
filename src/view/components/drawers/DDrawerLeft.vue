<script>
import DItemTabLink from '@components/items/DItemTabLink.vue'
import DItemLink from '@components/items/DItemLink.vue'
import DToolbarDrawerUser from '@components/toolbars/DToolbarDrawerUser.vue'

import { guestPrivadeLinks, guestFreeLinks } from '@directs/guest.js'
import { userFreeLinks } from '@directs/user.js'
import { autorLinks } from '@directs/autor.js'
import { computed, ref } from 'vue'

import { useAuthUserStore } from '@store/user/authUserStore.js'

export default {
	name: 'DDrawerLeft',
	components: {
		DToolbarDrawerUser,
		DItemTabLink,
		DItemLink,
	},
	setup(props, { attrs }) {
		const { modelValue } = attrs
		const attrsSelection = { modelValue }

		/** authenticared user----*** **/
		const authUserStore = useAuthUserStore()
		const isSession = computed(() => authUserStore.isSession$)

		return {
			/** attributes selection by v-bind*/
			attrsSelection,

			/** directs router */
			guestPrivadeLinks,
			guestFreeLinks,
			userFreeLinks,
			autorLinks,

			/** authenticared of user */
			isSession,
		}
	}
}
</script>

<template>
<q-drawer v-bind="attrsSelection" show-if-above bordered class="drawer">
	<q-list>
		<DToolbarDrawerUser v-if="isSession"/>

		<q-item-label header class="title-header-drawer">
			Rutas principales
		</q-item-label>

		<q-tabs inline-label vertical style="height:250;" active-color="primary">
			<template v-for="(link, index) in guestFreeLinks" :key="index">
				<DItemTabLink v-bind="link" />
			</template>
			<template v-for="(link, index) in guestPrivadeLinks" :key="index" v-if="!isSession">
				<DItemTabLink v-bind="link" />
			</template>
			<template v-for="(link, index) in userFreeLinks" :key="index" v-if="isSession">
				<DItemTabLink v-bind="link" />
			</template>
		</q-tabs>

		<DItemLink v-bind="autorLinks[0]" />
	</q-list>
</q-drawer>
</template>

<style lang="scss">
.drawer {
	background-color: $grey-1;
	.title-header-drawer {
		color: $grey-8;
	}
}
.mode--dark {
    .guest {
        .q-drawer--left.q-drawer--bordered {
            border-right: 1px solid #464646;
        }
        .drawer {
            background-color: #4a4a4a;
            color: $grey-1;
            .title-header-drawer {
                color: $grey-1;
            }
        }
    }
}
</style>
