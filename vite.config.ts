// vite.config.js
const path = require('path')

module.exports = {
	port: 8077, // 服务端口
	proxy: {
		// 代理
		// string shorthand
		'/foo': 'http://localhost:4567/foo',
		// with options
		'/api': {
			target: 'http://localhost:5000',
			changeOrigin: true,
			// rewrite: (path) => path.replace(/^\/api/, ''),
		},
	},
	// less
	transpileDependencies: ['vuetify'],
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [
				// 存放less变量文件的路径
				path.resolve(__dirname, './src/assets/less/parameter.less'),
			],
		},
	},
	css: {
		loaderOptions: {
			less: {
				lessOptions: {
					modifyVars: {
						'primary-color': '#ec6800',
					},
					javascriptEnabled: true,
				},
			},
		},
	},
}
