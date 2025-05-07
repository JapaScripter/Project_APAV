const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const path = require('path');

module.exports = {
	entry: './assets/js/script.js',  // Caminho do JS de entrada
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/js/script.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource', // Usando asset/resource para lidar com imagens
				generator: {
					filename: 'assets/images/[path][name][ext]',
				},
			},
			{
				test: /\.(ttf|woff|woff2|eot|otf)$/i, // Adicionando as fontes
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]',
				},
			},
		],
	},
	plugins: [
		// Gerar CSS para style.css
		new MiniCssExtractPlugin({
			filename: 'assets/css/style.css',
		}),

		// Gerar HTML para index.html
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
		}),

		// Gerar HTML para todas as páginas dentro de /pages
		...glob.sync('./pages/**/*.html').map((file) => {
			const fileName = file.replace('./pages/', 'pages/');
			return new HtmlWebpackPlugin({
				template: file,  // Usando o caminho do arquivo HTML encontrado
				filename: fileName,
			});
		}),
	],
	mode: 'production',
};