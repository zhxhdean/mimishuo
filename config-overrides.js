const { injectBabelPlugin } = require('react-app-rewired');
//px自动转换rem
const px2rem = require('postcss-px2rem')
// const rewireDefinePlugin = require('react-app-rewire-define-plugin')
// 按需加载
module.exports = function override (config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);

  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [px2rem({remUnit: 75})]
        }
      }
    ]
  })

  injectBabelPlugin('transform-decorators-legacy', config);

  // config = rewireDefinePlugin(config, env, {
  //   'process.env.PUBLIC_URL': JSON.stringify('mobile/'),
  //   });
  

  return config;
};