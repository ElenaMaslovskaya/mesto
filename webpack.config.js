const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   mode: 'development',
   entry: './src/pages/index.js',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
   },
   devServer: {
      static: './dist', // путь, куда "смотрит" режим разработчика
      compress: true, // это ускорит загрузку в режиме разработки
      port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
      open: true // сайт будет открываться сам при запуске npm run dev
   },
   module: {
      rules: [
         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
         {
            test: /\.(png|jpg|gif|svg)$/i,
            type: 'asset/resource'
         },
         {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, {
               loader: "css-loader",
               // добавьте объект options
               options: { importLoaders: 1 }
            },
               'postcss-loader'],
         },
         {
            test: /\.html$/i,
            loader: "html-loader",
         },
      ],
   },
   plugins: [new HtmlWebpackPlugin({
      template: './src/index.html'
   }),
   new MiniCssExtractPlugin(),
   ],
};