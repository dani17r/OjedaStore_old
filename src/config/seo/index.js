const seoDescription = 'tu tienda online en Ciudad Ojeda'
export const userSeo = {
	profile:{
		title: 'Perfil de usuario',
		titleTemplate: title => `${title} - ${seoDescription}`,
		noscript: {
			default: 'This is content for browsers with no JS (or disabled JS)'
		}
	},
	register: {
		title: 'Registro de usuario - OjedaStore - Registrarme',
		titleTemplate: title => `${title} - ${seoDescription}`,
		meta: {
			description: {
				name: 'description',
				content: 'Pagina de registro de usuario - Page register of user'
			},
			keywords: {
				name: 'keywords',
				content: 'Register register website registrarme registro-ojedastore Registro-OjedaStore Registrarme'
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
	},
	login: {
		title: 'Inicio de sesion para el usuario',
		titleTemplate: title => `${title} - ${seoDescription}`,
		meta: {
			description: {
				name: 'description',
				content: 'Pagina de inicio de sesion de usuario - Page login of user'
			},
			keywords: {
				name: 'keywords',
				content: 'Login login website log in InicioSesion inicio-sesion inicioSesion inicioSesionOjedaStore inicioSesion-OjedaStore'
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
	},
}
export const guestSeo = {
	home: {
		title: 'Inicio OjedaStore',
		titleTemplate: title => `${title} - ${seoDescription}`,
		meta: {
			description: { name: 'description', content: 'Pagina de inicio de Ojedastore con contenido principal - Page home of content primary' },
			keywords: { name: 'keywords', content: 'inicio-ojedastore Home home website index ojedastore OjedaStore ojedaStore inicioOjedaStore InicioOjedaStore' },
			equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },

			ogTitle: {
				property: 'og:title',
				template: (ogTitle) => `${ogTitle}`
			}
		},
		noscript: {
			default: 'This is content for browsers with no JS (or disabled JS)'
		}
	},
}
export const adminSeo = {}
