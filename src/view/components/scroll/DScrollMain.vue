<script>
import { computed, ref, watch } from 'vue'
import { centralStore } from '@store/centralStore.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { isEmpty } from 'lodash'

export default {
	name: 'DScrollMain',
	props: ['currentRoute'],
	setup(props) {
		const refScroll = ref(null)
		const currentRoute = computed(() => props.currentRoute)
		const scrollRoutes = computed(() => centralStore.state.scroll)
		const RoutesMemory = []
		const countRoutePass = ref(0)

		const scrollForRouter = (current) => {

			if (countRoutePass.value < 2) {
				RoutesMemory.push(current.name)
			}
			else {
				RoutesMemory.splice(0, 1)
				RoutesMemory.push(current.name)
			}

			countRoutePass.value++

			if (!scrollRoutes.value[RoutesMemory[0]]) {
				centralStore.state.scroll[RoutesMemory[0]] = refScroll.value.getScrollPosition().top
			}

			const currentPosition = scrollRoutes.value[RoutesMemory[1]]
			refScroll.value.setScrollPosition('vertical', currentPosition, 700)

		}

		setTimeout(() => scrollForRouter(currentRoute.value), 500)

		watch(() => props.currentRoute, (currentRoute) => {
			scrollForRouter(currentRoute)
		})


		const contentStyle = {
			backgroundColor: 'rgba(0,0,0,0.02)',
			color: '#555'
		}

		const contentActiveStyle = {
			backgroundColor: '#eee',
			color: 'black'
		}

		const thumbStyle = {
			right: '2px',
			borderRadius: '5px',
			width: '10px',
			zIndex: 1000,
			opacity: 0.75
		}

		return {
			contentStyle,
			contentActiveStyle,
			thumbStyle,
			refScroll,
			currentRoute,
		}
	},
}
</script>

<template>
<q-scroll-area :thumb-style="thumbStyle" :content-style="contentStyle" :content-active-style="contentActiveStyle" class="DScrollMain" :visible="true" :ref="el => refScroll = el">
	<div class="content-scroll-spaces">
		<slot></slot>
	</div>
</q-scroll-area>
</template>

<style lang="scss">
.DScrollMain {
    height: 100vh;
    // width:100%;
    .q-scrollarea__thumb {
        background-color: $grey-9;
    }
}
.content-scroll-spaces {
    margin-bottom: 50px;
}
.mode--dark {
    .DScrollMain {
        .q-scrollarea__thumb {
            background-color: $grey-2;
        }
    }
}
</style>
