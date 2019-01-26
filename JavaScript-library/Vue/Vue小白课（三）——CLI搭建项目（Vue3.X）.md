@[vue-cli搭建项目](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue-cli%E5%85%A5%E9%97%A8%EF%BC%88%E4%B8%80%EF%BC%89%E2%80%94%E2%80%94%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA.md)

> create by **db** on **2019-1-10 16:28:10**
> Recently revised in **2019-1-26 20:28:44**

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/vue-cli%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE.md)**

&emsp;查阅网上诸多资料，并结合自己的学习经验，写下这篇Vue2.0学习笔记，以记录自己的学习心得。现分享给大家，以供参考。

&emsp;作为一只前端菜鸟，这是我掘金分享的第四篇文章。如有不足，还请多多指教，谢谢大家。

# 前言

&emsp;作为一款前端框架，Vue 因其易上手，轻量级，受到广泛的应用。

&emsp;vue-cli3.0作为Vue的脚手架工具，集成了webpack环境及主要依赖，只需要几分钟的时间就可以运行起来一个项目。对于项目的搭建、打包、维护管理等都非常方便快捷。

Vue CLI 3.0 已发布，该版本经历了重构，旨在：

减少现代前端工具的配置烦扰，尤其是在将多个工具混合在一起使用时；

尽可能在工具链中加入最佳实践，让它成为任意 Vue 应用程序的默认实践。

Vue CLI 是 Vue 应用的标准化构建工具（链），核心是提供基于 webpack 4 构建的预配置构建设置，目标是最大限度地减少开发者必须经历的配置过程。因此，Vue CLI 3 对具备以下特点的项目都支持开箱即用：

* 预配置的 webpack 功能，如模块热替换、代码分割、 摇树优化（tree-shaking）、高效持久化缓存、错误覆盖等；

* 通过 Babel 7 + preset-env 对 ES2017 进行转换和基于使用情况的 polyfill 注入

* 支持 PostCSS（默认启用 autoprefixer）和所有主要的 CSS 预处理器

* 具有 hashed asset link 和预加载/预取资源提示的 Auto-generated HTML

* 通过 .env 文件的模式和级联环境变量 

* 现代模式：并行发布原生 ES2017 +bundle 和传统 bundle

* 多页面模式：构建具有多个 HTML / JS 入口点的应用程序

* 构建目标：将 Vue 单文件组件构建为库或原生 Web 组件
&emsp;此笔记旨在帮助Vue小白了解并应用Vue2.0项目搭建过程，希望能帮得到大家。
https://cli.vuejs.org/

&emsp;参考文献：

- [vue-cli搭建项目 | 思否-villelee](https://segmentfault.com/a/1190000015475645)
- [windows下搭建vue开发环境 | 充电实践 ](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
- [十分钟上手-搭建vue开发环境（新手教程） | 简书-祈澈菇凉](https://www.jianshu.com/p/0c6678671635)
- [vue-cli入门（一）——项目搭建 | 思否-Reachel](https://segmentfault.com/a/1190000009151389)
  
&emsp;另：个人以为，学习vue最好的途径还是[官方文档](https://cn.vuejs.org/)

# 正文

## 搭建Vue开发环境

### 1、更新npm到最新版本

&emsp;命令运行

> npm install -g npm

npm就自动为我们更新到最新版本
安装好node之后，以管理员身份打开cmd管理工具，，输入 `node -v `，回车，查看node版本号，出现版本号则说明安装成功。

> node -v

### 2、安装全局vue-cli3.X脚手架

&emsp;vue-cli是vue官方提供的一个命令行工具，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需一分钟即可启动带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。

&emsp;首先查看我们当前vue版本号，在命令行输入

>vue -V

&emsp;如果出现`2.X.X`，则说明我们现在安装的VueCLI2；

然后我们就要更新升级了，命令行输入以下命令，回车；

> cnpm i -g @vue/cli

&emsp;现在出现的是vue的版本号`3.X.X`，则说明更新成功；

## 创建vue项目

### 1、通过vue-cli3创建一个vue项目

&emsp;进入你需要创建在项目的文件夹，打开命令行。

输入以下命令，回车

> <font color=red> vue create</font> test

&emsp;这里test指的是项目名，该命令执行后会创建一个名为test的目录，也就是我们所搭建的项目。

此处有两个选择：

* `default (babel, eslint)`：默认套餐，提供`babel`和`eslint`支持

* `Manually select features`：自己去选择需要的功能，提供更多的特性选择。比如如果想要支持 `TypeScript` ，就应该选择这一项。

&emsp;可以使用`上下方向键`来切换选项。如果只需要 `babel` 和 `eslint` 支持，那么选择第一项，就完事了，静静等待 vue 初始化项目。
vue-cli 内置支持了8个功能特性，可以多选：使用方向键在特性选项之间切换，使用空格键选中当前特性，使用 a 键切换选择所有，使用 i 键翻转选项。

对于每一项的功能，此处做个简单描述：

* `TypeScript`: 支持使用 TypeScript 书写源码
* `Progressive Web App (PWA) Support`: PWA 支持。
* `Router`: 支持 vue-router 。
* `Vuex`: 支持 vuex 。
* `CSS Pre-processors~: 支持 CSS 预处理器。
* `Linter / Formatter`: 支持代码风格检查和格式化。
* `Unit Testing`: 支持单元测试。
* `E2E Testing`: 支持 E2E 测试。

我选择了 Router，Vuex，CSS Pre-processors，Linter / Formatter

按住enter进入下一步，接下来都是对之前每项选项的更详细的选择。

css选择SCSS/SASS
Linter / Formatter选择prettier

这一步就是要选择配置文件的位置了。对于 Babel 、 PostCSS 等，都可以有自己的配置文件： .babelrc 、 .postcssrc 等等，同时也可以把配置信息放在 package.json 里面。此处出于对编辑器（ Visual Studio Code ）的友好支持（编辑器一般默认会在项目根目录下寻找配置文件），选择把配置文件放在外面，选择 In dedicated config files
待补充
Save this as a preset for future projects?这个就是问要不要把当前的这一系列选项配置保存起来，方便下一次创建项目时复用。选择y。
选完之后， vue-cli 就根据前面选择的内容，开始初始化项目了。

## 启动项目
初始完之后，进入到项目根目录：
cd my-project
启动项目：
npm run serve
稍等一会儿，可以看到自动在浏览器中打开了



安装postcss-import和postcss-url插件
$ npm install postcss-import和$ npm install postcss-url
postcss-import相关配置点击这里。主要功有是解决@import引入路径问题。使用这个插件，可以让你很轻易的使用本地文件、node_modules或者web_modules的文件。这个插件配合postcss-url让你引入文件变得更轻松。
postcss-url相关配置可以点击这里。该插件主要用来处理文件，比如图片文件、字体文件等引用路径的处理。在Vue项目中，vue-loader已具有类似的功能，只需要配置中将vue-loader配置进去。
autoprefixer插件是用来自动处理浏览器前缀的一个插件。如果你配置了postcss-cssnext，其中就已具备了autoprefixer的功能。在配置的时候，未显示的配置相关参数的话，表示使用的是Browserslist指定的列表参数，你也可以像这样来指定last 2 versions 或者 > 5%。如此一来，你在编码时不再需要考虑任何浏览器前缀的问题，可以专心撸码。这也是PostCSS最常用的一个插件之一。
其他插件
我们要完成vw的布局兼容方案，或者说让我们能更专心的撸码，还需要配置下面的几个PostCSS插件：

postcss-aspect-ratio-mini
postcss-px-to-viewport
postcss-write-svg
postcss-cssnext
cssnano
postcss-viewport-units
--------------------- 
作者：徐子玉 
来源：CSDN 
原文：https://blog.csdn.net/xuqipeter/article/details/80452271 
版权声明：本文为博主原创文章，转载请附上博文链接！


接下来会要求你进行一些选项设置，其实就是初始化项目：

```
? Project name (test)        // 项目名称，按Enter确定就好
? Project name test
? Project description (A Vue.js project)        // 项目描述，按Enter确定就好 
? Project description A Vue.js project
? Author (villelee)        // 作者，按Enter确定就好 
? Author villelee
? Vue build (Use arrow keys)        // 开始选项设置，按Enter确定就好 
? Vue build standalone
? Install vue-router? (Y/n) Y        // 安装路由，需要的话可以选Y，不需要就选n
? Install vue-router? Yes
? Use ESLint to lint your code? (Y/n) Y        // 是否使用ESlint统一代码风格，编码规范，建议选Y
? Use ESLint to lint your code? Yes
? Pick an ESLint preset (Use arrow keys)
> Standard (https://github.com/standard/standard)
? Pick an ESLint preset Airbnb
? Set up unit tests (Y/n) n        // 是否安装单元测试
? Set up unit tests No
? Setup e2e tests with Nightwatch? (Y/n) n        // 是否安装e2e测试编码规范
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recom
? Should we run `npm install` for you after the project has been created? (recom
mended) npm
   vue-cli · Generated "test".
```

&emsp;最后出现如下代码

```
To get started:

  cd test
  npm run dev
```
&emsp;说明已经初始化成功，vue-cli已经将项目搭建完成。

### 2、进入你的项目文件夹

&emsp;项目搭建好了，现在就可以进入项目文件夹。

输入以下命令，回车进入新建的项目。

> <font color=red>cd</font> test

### 3、通过cnpm在项目里安装依赖

&emsp;因为各个模板之间都是相互依赖的，所以现在我们要安装依赖。

输入以下命令，回车安装依赖
> <font color=red>cnpm install</font>

### 4、启动项目

&emsp;一切环境依赖安装准备就绪，我们来测试一下自己新建的vue项目的运行情况。

输入以下命令，回车启动项目

> <font color=red>npm run dev</font>

结果会弹出一个浏览器访问地址默认为localhost:8080，如下：

```
$ npm run dev

> test@1.0.0 dev D:\ptest\test
> webpack-dev-server --inline --progress --config build/webpack.dev.conf.js

 95% emitting DONE  Compiled successfully in 5547ms11:59:13

 I  Your application is running here: http://localhost:8080
```
&emsp;在浏览器中打开`http://localhost:8080`，就能看到你的项目了
![](../../public-repertory/img/vue-cli-img/vue-cli.png)

### 项目打包

运行`npm run build`

运行后打包成功会在项目中生成dist文件夹

部署服务器是把文件夹中的文件丢上服务器即可

# 总结 

&emsp;至此，我们的Vue项目就搭建完成了。万里长征第一步，加油！

&emsp;如需进一步了解关于vue项目结构的基础知识，请戳[Vue小白课（二）——项目结构解析（Vue2.x）](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E5%B0%8F%E7%99%BD%E8%AF%BE%EF%BC%88%E4%BA%8C%EF%BC%89%E2%80%94%E2%80%94%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90%EF%BC%88Vue2.x%EF%BC%89.md)

&emsp;路漫漫其修远兮，与诸君共勉。

&emsp;祝大家2019更上一层楼！

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue-cli%E5%85%A5%E9%97%A8%EF%BC%88%E4%B8%80%EF%BC%89%E2%80%94%E2%80%94%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA.md)**

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="wzh" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。