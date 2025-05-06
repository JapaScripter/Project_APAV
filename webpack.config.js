const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const path = require('path');

module.exports = {
	entry: './assets/js/script.js',  // Caminho do JS de entrada
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							outputPath: 'images/', // Onde colocar as imagens no /dist
						},
					},
				],
			},
			{
				test: /\.(ttf|woff|woff2|eot|otf)$/i, // Adicionando as fontes
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							outputPath: 'font/',    // Coloca as fontes na pasta dist/font
							publicPath: '/font/',   // Ajusta o caminho público para as fontes
						},
					},
				],
			},
		],
	},
	plugins: [
		// Gerar HTML para index.html
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
		}),

		// Gerar HTML para todas as páginas dentro de /pages
		...glob.sync('./pages/**/*.html').map((file) => {
			return new HtmlWebpackPlugin({
				template: file,  // Usando o caminho do arquivo HTML encontrado
				filename: file.replace('pages/', ''), // Remove o prefixo "pages/" para gerar o arquivo no root
			});
		}),
	],
	mode: 'production',
};