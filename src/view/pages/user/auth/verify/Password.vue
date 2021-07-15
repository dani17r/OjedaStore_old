<script>
import { useMeta } from 'quasar'

const metaData = {
	title: 'Verify - Reset password of user',
	titleTemplate: title => `${title}`,
	meta: {
		description: {
			name: 'description',
			content: 'Page verify reset password of user'
		},
		keywords: {
			name: 'keywords',
			content: 'verify reset password user website confirmated'
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
	name: 'pages-verify-reset-password-user',
	setup() {

		useMeta(metaData)
	}
}
</script>

<template>
<div class="flex flex-center pages-verify-reset-password-user">
	Pagina de verify para resetear la contraseña del usuario
</div>
</template>
