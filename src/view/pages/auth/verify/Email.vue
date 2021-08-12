<script>
import { useMeta } from 'quasar'

const metaData = {
	title: 'Verify - Email of user',
	titleTemplate: title => `${title}`,
	meta: {
		description: {
			name: 'description',
			content: 'Page verify email of user'
		},
		keywords: {
			name: 'keywords',
			content: 'verify email website'
		},
		equiv: {
			'http-equiv': 'Content-Type',
			content: 'text/html; charset=UTF-8'
		},
		ogTitle: {
			property: 'og:title',
			template: (ogTitle) => `${ogTitle}`
		}
	},
	noscript: {
		default: 'This is content for browsers with no JS (or disabled JS)'
	}
}
export default {
	name: 'pages-verify-email-user',
	setup() {

		useMeta(metaData)
	}
}
</script>

<template>
<div class="pages-verify-email-user">
	Pagina de verify de email de usuario
</div>
</template>
