const path = require('path')
const { configure } = require('quasar/wrappers');

module.exports = configure(function(ctx) {
	return {
		supportTS: false,
		preFetch: false,
		sourceFiles: {
			rootComponent: 'src/view/Main.vue',
			router: 'src/controller/router',
			indexHtmlTemplate: 'public/index.template.html',
		},
		boot: [
			'i18n',
			'axios',
			'pinia',
			'guards',
		],
		css: [
			'~/src/assets/scss/app.scss',
			// 'app.sass', // referring to /src/css/app.sass
		],
		extras: [
			'roboto-font',
			'material-icons',
		],
		build: {
			vueRouterMode: 'history', // 'hash', 'history'
			// transpileDependencies: [],
			// transpile: false,
			// rtl: true,
			preloadChunks: false, //default true
			showProgress: true,
			gzip: true,
			analyze: false,
			// extractCSS: false,
			chainWebpack(chain) {
				chain.resolve.alias
					.set('@app', path.resolve(__dirname, '.'))
					.set('@src', path.resolve(__dirname, './src'))

					.set('@boot', path.resolve(__dirname, './src/boot'))

					.set('@config', path.resolve(__dirname, './src/config'))
					.set('@directs', path.resolve(__dirname, './src/config/directs'))
					.set('@seo', path.resolve(__dirname, './src/config/seo'))

					.set('@tools', path.resolve(__dirname, './src/tools')) //------
					.set('@validates', path.resolve(__dirname, './src/tools/validates'))
					.set('@utils', path.resolve(__dirname, './src/tools/utils'))
					.set('@helps', path.resolve(__dirname, './src/tools/helps'))

					.set('@view', path.resolve(__dirname, './src/view')) //------
					.set('@components', path.resolve(__dirname, './src/view/components'))
					.set('@layouts', path.resolve(__dirname, './src/view/layouts'))
					.set('@pages', path.resolve(__dirname, './src/view/pages'))

					.set('@assets', path.resolve(__dirname, './src/assets'))

					.set('@services', path.resolve(__dirname, './src/services')) //------
					.set('@falses', path.resolve(__dirname, './src/services/falses'))
					.set('@http', path.resolve(__dirname, './src/services/http'))
					.set('@translate', path.resolve(__dirname, './src/services/translate'))

					.set('@controller', path.resolve(__dirname, './src/controller')) //------
					.set('@middlewares', path.resolve(__dirname, './src/controller/middlewares'))
					.set('@router', path.resolve(__dirname, './src/controller/router'))
					.set('@store', path.resolve(__dirname, './src/controller/store'))
			},
		},
		devServer: {
			https: false,
			port: 7000,
			open: false
		},
		framework: {
			config: {
				brand: {
					primary: '#756dba',
					primary_dark: '#4c486e',
					dark: '#3b3b3b',
				}
			},
			// iconSet: 'material-icons'
			// lang: 'en-US'
			// components: [],
			// directives: [],
			plugins: [
				'Notify',
				'Cookies',
				'Loading',
				'LoadingBar',
			]
		},

		// animations: 'all', // --- includes all animations
		animations: [],
		ssr: {
			pwa: false,
			// manualStoreHydration: true,
			// manualPostHydrationTrigger: true,
			prodPort: 3000,
			maxAge: 1000 * 60 * 60 * 24 * 30,
			chainWebpackWebserver( /*chain, { isServer, isClient }*/ ) {},
			middlewares: [ ctx.prod ? 'compression' : '', 'render' ]
		},
		pwa: {
			workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
			workboxOptions: {}, // only for GenerateSW
			chainWebpackCustomSW( /*chain, { isServer, isClient }*/ ) {},
			manifest: {
				name: `app-n`,
				short_name: `app-n`,
				description: `template in vue 3, with all modules for login, user, admin, sud-admin, tables, add, remove, move, delete, and more much`,
				display: 'standalone',
				orientation: 'portrait',
				background_color: '#ffffff',
				theme_color: '#027be3',
				icons: [{
						src: 'icons/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png'
					},
					{
						src: 'icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'icons/icon-256x256.png',
						sizes: '256x256',
						type: 'image/png'
					},
					{
						src: 'icons/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png'
					},
					{
						src: 'icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		},
		cordova: {},
		capacitor: { hideSplashscreen: true },
		electron: {
			bundler: 'packager', // 'packager' or 'builder'
			packager: {
				// OS X / Mac App Store
				// appBundleId: '',
				// appCategoryType: '',
				// osxSign: '',
				// protocol: 'myapp://path',
				// Windows only
				// win32metadata: { ... }
			},
			builder: { appId: 'template-quasar-next' },
			chainWebpackMain( /*chain, { isServer, isClient }*/ ) {},
			chainWebpackPreload( /*chain, { isServer, isClient }*/ ) {},
		}
	}
});
