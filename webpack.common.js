const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
require('babel-core/register')
require('babel-polyfill')

module.exports = {
	entry: ['babel-polyfill', './main.js'],
	output: {
		path: __dirname + '/dist',
		filename: 'main.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|glb|gltf)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			inject: false,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: __dirname + '/GLTF', to: __dirname + '/dist/GLTF' }
			],

		})
	],
}
