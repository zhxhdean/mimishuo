
建议给每个router保证一个provider，在pages/页面中通过inject的方式获取
pages/pagename/index.js 只做页面布局逻辑，业务逻辑放到对应的store.js文件中
全局css放到/index.css, 每个页面的可放到pages/pagename/index.css


### `yarn `
安装node依赖包

### `yarn start`
开发环境<br>
打开 [http://localhost:8181](http://localhost:8181) 

### `yarn run build`
打包发布

# 目录结构
### /public 静态目录
### /src 源码目录
### |----/assets 静态资源
### |----/components 组件目录
### |------/head 组件
### |----/pages 页面目录
### |------/index 首页
### |--------index.js 页面布局文件
### |--------index.css 页面css
### |--------store.js 业务逻辑文件
### |----index.js 主入口文件

