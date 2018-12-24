const path = require('path');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATH = path.resolve(__dirname, '../');
const isDev = process.env.NODE_ENV !== 'production';

console.log( 'mode: ', isDev );
console.log( '__dirname: ', __dirname );
console.log( 'dist: ', path.join(__dirname, '../dist') );
console.log( 'PATH: ', PATH, '\n\n\n');

module.exports = {
	mode: 'development',
	context: PATH,
	entry: {
		index: './src/main.js',
	},
	output: {
		filename: 'main-bundle.js',
		path: path.resolve( PATH, 'dist'),
	},

	module: {
		rules: [
			{ test: /\.js$/, 
				exclude: /node_modules/, 
				loader: "babel-loader" 
				// options: { presets: ['env'] }
			},
			/*{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader',
					// 'autoprefixer-loader'
				]
			},*/
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract(
					{
						fallback: 'style-loader',
						use: ['css-loader', 'sass-loader']
					})
			}
			/*{
				test: /\.scss$/,
				use: ['css-loader', 'sass-loader']
			}*/
		]
	},
	
	plugins: [
		// make sure to include the plugin for the magic
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin(
			{filename: 'main.css'}          // in 'dist' folder by default
		),
	  ],
	
	devtool: 'source-map',
	
	devServer: {
		/* issue with Invalid Host/Origin header [WDS] Disconnected! */
		headers:          { 'Access-Control-Allow-Origin': '*' },
		https:            false,
		disableHostCheck: true,
		/* -------------------------------------------------------- */
		contentBase: './',			// html
		publicPath: '/dist/',		// js bundle
		open: true,
		hot: true                   // plugin required
	}
	
};
