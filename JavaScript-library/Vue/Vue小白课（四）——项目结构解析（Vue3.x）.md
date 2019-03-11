@[Vue项目结构解析](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E5%B0%8F%E7%99%BD%E8%AF%BE%EF%BC%88%E5%9B%9B%EF%BC%89%E2%80%94%E2%80%94%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90%EF%BC%88Vue3.x%EF%BC%89.md)

> create by **db** on **2019-1-10 16:28:10**
> Recently revised in **2019-3-9 21:52:41**

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E5%B0%8F%E7%99%BD%E8%AF%BE%EF%BC%88%E5%9B%9B%EF%BC%89%E2%80%94%E2%80%94%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90%EF%BC%88Vue3.x%EF%BC%89.md)**

&emsp;查阅网上诸多资料，并结合自己的学习经验，写下这篇Vue3.0学习笔记，现分享给大家，以供参考。

&emsp;作为一只前端菜鸟，本篇文章旨在记录自己的学习心得，如有不足，还请多多指教，谢谢大家。
# 前言

&emsp;在上一篇项目搭建文章中，我们已经下载安装了node环境以及Vue-CLI3，并且已经成功构建了一个Vue-CLI3项目——见[Vue小白课（三）——CLI搭建项目（Vue3.x）](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E5%B0%8F%E7%99%BD%E8%AF%BE%EF%BC%88%E4%B8%89%EF%BC%89%E2%80%94%E2%80%94CLI%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE%EF%BC%88Vue3.x%EF%BC%89.md)。那么接下来，我们来梳理一下Vue-CLI3项目的结构。

&emsp;参考文献：

- [Vue-CLI3入门（二）——项目结构 | 思否-Reachel](https://segmentfault.com/a/1190000009151589)

# 正文

&emsp;vue-cli3.0默认项目目录与2.0的相比，更精简:
1. 移除的配置文件根目录下的，build和config等目录，
2. 移除了static文件夹，新增了public文件夹，并且index.html移动到public中。
3. 在src文件夹中新增了views文件夹，用于分类 试图组件 和 公共组件 。
4. 大部分配置 都集成到 vue.config.js这里,在项目根目录下

## Vue-CLI3项目结构一览

```
├── build --------------------------------- 项目构建(webpack)相关配置文件，配置参数什么的，一般不用动 
│   ├── build.js --------------------------webpack打包配置文件
│   ├── check-versions.js ------------------------------ 检查npm,nodejs版本
│   ├── dev-client.js ---------------------------------- 设置环境
│   ├── dev-server.js ---------------------------------- 创建express服务器，配置中间件，启动可热重载的服务器，用于开发项目
│   ├── utils.js --------------------------------------- 配置资源路径，配置css加载器
│   ├── vue-loader.conf.js ----------------------------- 配置css加载器等
│   ├── webpack.base.conf.js --------------------------- webpack基本配置
│   ├── webpack.dev.conf.js ---------------------------- 用于开发的webpack设置
│   ├── webpack.prod.conf.js --------------------------- 用于打包的webpack设置
├── config ---------------------------------- 配置目录，包括端口号等。我们初学可以使用默认的。
│   ├── dev.env.js -------------------------- 开发环境变量
│   ├── index.js ---------------------------- 项目配置文件
│   ├── prod.env.js ------------------------- 生产环境变量
│   ├── test.env.js ------------------------- 测试环境变量
├── node_modules ---------------------------- npm 加载的项目依赖模块
├── src ------------------------------------- 我们要开发的目录，基本上要做的事情都在这个目录里。
│   ├── assets ------------------------------ 静态文件，放置一些图片，如logo等
│   ├── components -------------------------- 组件目录，存放组件文件，可以不用。
│   ├── main.js ----------------------------- 主js
│   ├── App.vue ----------------------------- 项目入口组件，我们也可以直接将组件写这里，而不使用 components 目录。
│   ├── router ------------------------------ 路由
├── static ---------------------------- 静态资源目录，如图片、字体等。
├── .babelrc--------------------------------- babel配置文件
├── .editorconfig---------------------------- 编辑器配置
├── .gitignore------------------------------- 配置git可忽略的文件
├── index.html ------------------------------ 	首页入口文件，你可以添加一些 meta 信息或统计代码啥的。
├── package.json ---------------------------- node配置文件，记载着一些命令和依赖还有简要的项目描述信息 
├── .README.md------------------------------- 项目的说明文档，markdown 格式。想怎么写怎么写，不会写就参照github上star多的项目，看人家怎么写的
```

## Vue实现原理

&emsp;在webpack的配置文件里，设置了main.js是入口文件，我们的项目默认访问index.html，这个文件里面`<div id="app"></div>`和App.vue组件里面的容器完美的重合了，也就是把组件挂载到了index页面，然后我们只需要去建设其他组件就好了，在App组件中我们也可以引入，注册，应用其他组件，可以通过路由将其他组件渲染在App组件，这样我们就只需要去关注每个组件的功能完善。

&emsp;就是说vue的默认页面是index.html，index中的`<div id="app"></div>`挂载了App.vue这个大组件，然后所有的其他子组件（hello.vue等）都归属在App.vue这个主组件下。


## 主要文件详解

### src——[项目核心文件]

&emsp;在Vue-CLI3的项目中，其中src文件夹是必须要掌握的，因为基本上要做的事情都在这个目录里。

#### index.html——[主页]

&emsp;index.html如其他html一样，但一般只定义一个空的根节点，在main.js里面定义的实例将挂载在根节点下，内容都通过vue组件来填充

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>vuedemo</title>
  </head>
  <body>
      <!-- 定义的vue实例将挂载在#app节点下 -->
    <div id="app"></div>
  </body>
</html>
```

#### App.vue——[根组件]

&emsp;一个vue页面通常由三部分组成:模板(template)、js(script)、样式(style)

```html
<!-- 模板 -->
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<!-- script -->
<script>
export default {
  name: 'app'
}
</script>

<!-- 样式 -->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
【template】

&emsp;其中模板只能包含一个父节点，也就是说顶层的div只能有一个（例如上面代码，父节点为#app的div，其没有兄弟节点）

&emsp;`<router-view></router-view>`是子路由视图，后面的路由页面都显示在此处

&emsp;打一个比喻吧,`<router-view>`类似于一个插槽，跳转某个路由时，该路由下的页面就插在这个插槽中渲染显示

【script】

&emsp;vue通常用es6来写，用`export default`导出，其下面可以包含数据data，生命周期(mounted等)，方法(methods)等，具体语法请看vue.js文档。

【style】

&emsp;样式通过style标签<style></style>包裹，默认是影响全局的，如需定义作用域只在该组件下起作用，需在标签上加scoped.

`<style scoped></style>`

&emsp;如要引入外部css文件，首先需给项目安装css-loader依赖包，打开cmd，进入项目目录，输入`npm install css-loader`,回车。

&emsp;安装完成后，就可以在style标签下import所需的css文件，例如：

```css
<style>
    import './assets/css/public.css'
</style>

```
#### main.js——[入口文件]

&emsp;main.js主要是引入vue框架，根组件及路由设置，并且定义vue实例，下面的
`components:{App}`就是引入的根组件App.vue

&emsp;后期还可以引入插件，当然首先得安装插件。

```javascript
/*引入vue框架*/
import Vue from 'vue'
/*引入根组件*/
import App from './App'
/*引入路由设置*/
import router from './router'

/*关闭生产模式下给出的提示*/ 
Vue.config.productionTip = false

/*定义实例*/ 
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```

#### router——[路由配置]

&emsp;vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。

&emsp;router文件夹下，有一个index.js，即为路由配置文件。

```javascript
/*引入vue框架*/
import Vue from 'vue'
/*引入路由依赖*/
import Router from 'vue-router'
/*引入页面组件，命名为Hello*/ 
import Hello from '@/components/Hello'

/*使用路由依赖*/ 
Vue.use(Router)

/*定义路由*/ 
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
```
&emsp;这里定义了路径为'/'的路由，该路由对应的页面是Hello组件，所以当我们在浏览器url访问http://localhost:8080/#/时就渲染的Hello组件

&emsp;类似的，我们可以设置多个路由，‘/index’,'/list'之类的，当然首先得引入该组件，再为该组件设置路由。

### 其他配置文件

&emsp;主要包括webpack的配置，项目配置，项目依赖等等。

详情可参考以下文章：
- [Vue-CLI3创建vue项目以及配置文件梳理 | 思否-AshleyLv](https://segmentfault.com/a/1190000010659925)


### vue 模板文件

这是我自己做的一个vue模板文件，符合Eslint规则
```html
<!--  -->
<template>
  <div/>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {

  }
}

</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>
```

# 总结

&emsp;Vue-CLI3给创建vue项目提供了很大的便利。但是同时大量的第三方库的使用，会让打包后的js变的很大，所以还是要熟悉配置,熟悉第三方插件的使用，才可以开发更高效的开发web应用。这里把Vue-CLI3的一些相关内容给自己做一个总结，便于以后查阅。也是希望对其他开发者有帮助。有不足之处请指正。

&emsp;路漫漫其修远兮，与诸君共勉。

&emsp;祝大家2019更上一层楼！

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E5%B0%8F%E7%99%BD%E8%AF%BE%EF%BC%88%E5%9B%9B%EF%BC%89%E2%80%94%E2%80%94%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90%EF%BC%88Vue3.x%EF%BC%89.md)**

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="wzh" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。