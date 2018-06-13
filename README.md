# vueProject

> A Vue.js project

## Build Setup

```bash
# 步骤
# 1、初始化git版本控制
git init
# 添加 .gitignore 文件忽略node_module等文件
# 2、初始化项目生成package.json
npm init
# 2.1 安装项目依赖
npm install

# 3、初始化eslint验证生成eslint.js文件
eslint --init
#安装eslint依赖
npm install  --save-dev eslint eslint-loader
# 安装eslint-config-standard规则
npm install standard --save-dev

# 4、安装html-webpack-plugin 用于使用index.html
npm i html-webpack-plugin
# 根据提示  需要安装webpack及其依赖
npm install --save-dev webpack

# 5、安装css预处理插件postcss及其依赖,autoprefixer
npm i -D postcss-loader
npm install autoprefixer

# 6、安装babel 用来支持ES6
npm install --save-dev babel-loader babel-core babel-preset-env webpack
# 安装babel-plugin-transform-vue-jsx vue中支持jsx
npm i babel-plugin-transform-vue-jsx
# 根据提示安装依赖
npm i babel-helper-vue-jsx-merge-props babel-plugin-syntax-jsx
#根目录新建.babelrc文件
# {
#  "presets": [
#    "env"   需要使用的套件
#  ],
#  "plugins": [
#    "transform-vue-jsx"  需要使用的插件
#  ]
#}
#根目录新建.postcss.config.js文件
#/* postcss作用：帮助我们后处理css(已经经过处理之后的style转换出来的css)，再经过postcss优化 */
#const autoprefixer = require('autoprefixer')

#module.exports = {
#  /* 具体通过以下插件优化 */
#  plugins: [
#    /* 为css添加浏览器前缀 */
#    autoprefixer()
#  ]
#}
#  安装webpack-dev-server 启动项目
npm i --save-dev webpack-dev-server

# 安装cross-env 能跨平台地设置及使用环境变量
npm install --save-dev cross-env

# 安装vue 及其vue-loader,vue-router
npm install vue
npm install css-loader
npm install vue-loader
npm install vue-router
npm install vue-template-compiler
# 安装extract-text-webpack-plugin CSS单独抽取打包
npm i extract-text-webpack-plugin
# ExtractPlugin作用：将非Javascript的代码单独打包成一个静态资源文件
# 1、webpack.config.js配置  const ExtractPlugin = require('extract-text-webpack-plugin')
#
# 根目录下新建webpack.config.js文件, 新建index.html文件
#
# 引入element-ui
npm install element-ui -S
# 安装url-loader
npm install --save-dev url-loader
npm install --save-dev file-loader
```
