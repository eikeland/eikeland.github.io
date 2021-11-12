const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* global __dirname */
// se config example: https://webpack.js.org/configuration/
module.exports = {
	// multiple entries
	entry: {
		main: './assets/src/index.js',
		style: './assets/src/style.js'
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components|.git)/,
				loader: 'babel-loader',
				options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
			},
			{
				test: /\.scss$/,
				use: [
					process.env.npm_lifecycle_event === 'serve' ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader:'css-loader',
						options: {
							sourceMap: true,
							import: false,
							url: false
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									'postcss-flexbugs-fixes',
									[
										'postcss-preset-env',
										{
											autoprefixer: {
												flexbox: 'no-2009',
											},
											stage: 3
										}
									],
									'postcss-normalize',
								]
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								outputStyle: 'compressed'
							}
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	devServer: {
		// use ypur own ssl certs here, ask eikeland for help setting up.
		https: {
			key: '/Applications/MAMP/conf/ssl/eikeland.pem',
			cert: '/Applications/MAMP/conf/ssl/eikeland.pem',
			ca: '/Applications/MAMP/conf/ssl/eikeland.pem',
		},
		hot: true,
		static: path.join(__dirname, ''),
		allowedHosts: ['*']
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'assets/js'),
		filename: '[name].js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: (data) => {
				// put css files in assets/css or main stylesheet in root for wp themes
				return data.chunk.name === 'style' ? '../../[name].css' : '../css/[name].css';
			}
		})
	]
};
