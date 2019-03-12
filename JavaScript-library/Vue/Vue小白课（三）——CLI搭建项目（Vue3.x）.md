@[Vue-CLI3搭建项目](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E5%B0%8F%E7%99%BD%E8%AF%BE%EF%BC%88%E4%B8%89%EF%BC%89%E2%80%94%E2%80%94CLI%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE%EF%BC%88Vue3.X%EF%BC%89.md)

> create by **db** on **2019-1-10 16:28:10**
> Recently revised in **2019-3-9 21:41:55**

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E5%B0%8F%E7%99%BD%E8%AF%BE%EF%BC%88%E4%B8%89%EF%BC%89%E2%80%94%E2%80%94CLI%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE%EF%BC%88Vue3.x%EF%BC%89.md)**

&emsp;查阅网上诸多资料，并结合自己的学习经验，写下这篇Vue3.0学习笔记，现分享给大家，以供参考。

&emsp;作为一只前端菜鸟，本篇文章旨在记录自己的学习心得，如有不足，还请多多指教，谢谢大家。

# 前言

&emsp;Vue-CLI 是 vue 官方团队推出的一款快速开发 vue 项目的构建东西，具有开箱即用并且供给简练的自定义配备等功用。包括三个组件：
* **CLI**：@vue/cli 全局安装的 npm 包，提供了终端里的vue命令（如：vue create 、vue serve 、vue ui 等命令）
* **CLI** 服务：@vue/cli-service是一个开发环境依赖。构建于 webpack 和 webpack-dev-server 之上（提供 如：serve、build 和 inspect 命令）
* **CLI 插件**：给Vue 项目提供可选功能的 npm 包 （如： Babel/TypeScript 转译、ESLint 集成、unit和 e2e测试 等）

&emsp;Vue-CLI 3.0 正式版于 2018年8月10号发布，大神尤雨溪表示，Vue CLI 3.0与其他的版本完全不同，它经历了重构，目的是：

1. 尽可能减少现代前端工具在配置上的烦恼，尤其是在开发者将多个工具混合使用时；
2. 尽可能在工具链中加入最佳实践，并让其成为Vue应用程序的默认实践。

&emsp;与Vue-CLI 2.0相比，Vue-CLI 3.0发生了很多变化。。。

&emsp;一言以蔽之，就是**让开发更简单！**

&emsp;此笔记旨在帮助Vue小白了解并应用Vue3项目的命令行搭建过程，希望能帮得到大家。

&emsp;参考文献：

- [Vue3.x官方文档](https://cli.vuejs.org/)

- [vue cli 3.0快速创建项目 | CSDN-徐子玉](https://blog.csdn.net/xuqipeter/article/details/80452271)

- [利用vue-cli3快速搭建vue项目详细过程 | 简书-zhyzhyzz](https://www.jianshu.com/p/8105d6c16d80)

# 正文

## 搭建Vue-CLI3.x开发环境

### 1、更新npm到最新版本
&emsp;Vue CLI 3需要 nodeJs ≥ 8.9 (官方推荐 8.11.0+，你可以使用 nvm 或 nvm-windows在同一台电脑中管理多个 Node 版本）。

&emsp;命令运行

> npm install -g npm

&emsp;npm就自动为我们更新到最新版本

&emsp;更新完成之后，以管理员身份打开cmd管理工具，，输入 `node -v `，回车，可查看node版本号.

### 2、安装全局Vue-CLI3.x脚手架

&emsp;Vue-CLI是vue官方提供的一个命令行工具，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需一分钟即可启动带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。

&emsp;首先查看我们当前vue版本号，在命令行输入

>vue -V

&emsp;如果出现`2.X.X`，则说明我们现在安装的Vue-CLI2；

然后我们就需要更新升级了，命令行输入以下命令，回车；

> cnpm i -g @vue/cli

&emsp;再次查看Vue的版本号`3.x.x`，则说明更新成功；

## 命令行创建Vue-CLI3项目

### 1、通过Vue-CLI3创建一个vue项目

&emsp;进入你需要创建项目的文件夹，打开命令行。

输入以下命令，回车

> <font color=red> vue create</font> test

&emsp;这里`test`指的是项目名，该命令执行后会创建一个名为`test`的目录，也就是我们所搭建的项目。

此处有两个选择：

* `default (babel, eslint)`：默认套餐，提供`babel`和`eslint`支持

* `Manually select features`：自己去选择需要的功能，提供更多的特性选择。比如如果想要支持 `TypeScript` ，就应该选择这一项。

&emsp;可以使用<kbd>上下方向键</kbd>来切换选项。如果只需要 `babel` 和 `eslint` 支持，那么选择第一项，就完事了，静静等待 vue 初始化项目。

&emsp;Vue-CLI3 内置支持了8个功能特性，可以多选：使用<kbd>方向键</kbd>在特性选项之间切换，使用<kbd>空格键</kbd>选中当前特性，使用<kbd> a </kbd>键切换选择所有，使用<kbd> i </kbd>键翻转选项。

对于每一项的功能，此处做个简单描述：

```
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) Babel                           //转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。                      
 ( ) TypeScript// TypeScript是一个JavaScript（后缀.js）的超集（后缀.ts）包含并扩展了 JavaScript 的语法，需要被编译输出为 JavaScript在浏览器运行，目前较少人再用
 ( ) Progressive Web App (PWA) Support// 渐进式Web应用程序
 ( ) Router                           // vue-router（vue路由）
 ( ) Vuex                             // vuex（vue的状态管理模式）
 ( ) CSS Pre-processors               // CSS 预处理器（如：less、sass）
 ( ) Linter / Formatter               // 代码风格检查和格式化（如：ESlint）
 ( ) Unit Testing                     // 单元测试（unit tests）
 ( ) E2E Testing                      // e2e（end to end） 测试
```
我选择了 `Router`，`Vuex`，`CSS Pre-processors`，`Linter / Formatter`

按住`enter`进入下一步，接下来都是对之前每项选项的更详细的选择。

* css:选择SCSS/SASS

* Linter / Formatter:选择prettier

&emsp;这一步就是要选择配置文件的位置了。对于 `Babel` 、` PostCSS` 等，都可以有自己的配置文件： `.babelrc` 、 `.postcssrc` 等等，同时也可以把配置信息放在 `package.json` 里面。此处出于对编辑器（ Visual Studio Code ）的友好支持（编辑器一般默认会在项目根目录下寻找配置文件），选择把配置文件放在外面，选择 `In dedicated config files`

**补充**

`Save this as a preset for future projects?`:这个就是问要不要把当前的这一系列选项配置保存起来，方便下一次创建项目时复用。选择y。

选完之后， Vue-CLI 就根据前面选择的内容，开始初始化项目了。

&emsp;最后出现如下代码

```
To get started:

  cd test
  npm run serve
```
&emsp;说明已经初始化成功，Vue-CLI3已经将项目搭建完成。

### 2、进入你的项目文件夹

&emsp;项目搭建好了，现在就可以进入项目文件夹。

输入以下命令，回车进入新建的项目。

> <font color=red>cd</font> test

### 3、通过npm在项目里安装依赖

&emsp;因为各个模板之间都是相互依赖的，所以现在我们要安装依赖。

输入以下命令，回车安装依赖
> <font color=red>npm install</font>

### 4、启动项目

&emsp;一切环境依赖安装准备就绪，我们来测试一下自己新建的vue项目的运行情况。

输入以下命令，回车启动项目

> <font color=red>npm run serve</font>

结果会弹出一个浏览器访问地址默认为`localhost:8080`，如下：

```

```
&emsp;在浏览器中打开`http://localhost:8080`，就能看到你的项目了
![](../../public-repertory/img/Vue-CLI-img/Vue-CLI2.png)

## vue ui 图形化界面创建项目

&emsp;Vue-CLI3.x给我们同样提供了图形化界面,用来管理和创建项目

> vue ui

命令行输入命令，操作如下


## 项目打包

&emsp;在开发完项目之后，就应该打包上线了。 Vue-CLI3 也提供了打包的命令，在项目根目录下执行：

> npm run build

&emsp;执行完之后，可以看到在项目根目录下多出了一个 `dist `目录，该目录下就是打包好的所有静态资源，直接部署到静态资源服务器就好了。

&emsp;实际上，在部署的时候要注意，假设静态服务器的域名是 `http://static.baidu.com` ，那么对应到访问 `<项目根目录>/dist/index.html` 的 URL 一定要是 `http://static.baidu.com/index.html` ，其他的静态资源以此类推。



# 总结 

&emsp;至此，我们的Vue3.0项目就搭建完成了。万里长征第一步，加油！

&emsp;如需进一步了解关于vue项目结构的基础知识，请戳[Vue小白课（四）——项目结构解析（Vue4.x）](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E5%B0%8F%E7%99%BD%E8%AF%BE%EF%BC%88%E5%9B%9B%EF%BC%89%E2%80%94%E2%80%94%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90%EF%BC%88Vue3.x%EF%BC%89.md)

&emsp;路漫漫其修远兮，与诸君共勉。

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E5%B0%8F%E7%99%BD%E8%AF%BE%EF%BC%88%E4%B8%89%EF%BC%89%E2%80%94%E2%80%94CLI%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE%EF%BC%88Vue3.x%EF%BC%89.md)**

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="wzh" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。