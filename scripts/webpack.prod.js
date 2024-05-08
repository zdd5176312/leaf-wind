const { merge } = require('webpack-merge');  
const TerserPlugin = require('terser-webpack-plugin');  
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');  
const baseConfig = require('./webpack.base');  
  
module.exports = merge(baseConfig, {  
  mode: 'production',  
  optimization: {  
    minimize: true,  
    minimizer: [  
      new TerserPlugin(),  
      new CssMinimizerPlugin(),  
    ],  
    // 其他优化选项...  
  },  
  output: {  
    // 如果需要，可以覆盖base中的output配置  
    filename: '[name].bundle.js',  
  },
});
