const path = require('path');
const { merge } = require('webpack-merge');  
const baseConfig = require('./webpack.base');  
const HtmlWebpackPlugin = require('html-webpack-plugin');  
  
module.exports = merge(baseConfig, {  
  mode: 'development',  
  devtool: 'inline-source-map', // 或者使用更高效的source map，比如cheap-module-eval-source-map  
  devServer: {  
    hot: true, // 启用热模块替换  
    client: {
        overlay: {
            errors: false,
            warnings: false,
            runtimeErrors: false
        }
    }
  },  
  plugins: [  
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
        inject: true, // 自动注入静态资源
    }),
  ],  
});
