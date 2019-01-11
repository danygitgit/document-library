@[Vue项目就够详解](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/Git%E5%91%BD%E4%BB%A4%E5%85%A5%E9%97%A8.md)

> create by **db** on **2019-1-10 16:28:10**   
> Recently revised in **2019-1-10 19:37:50**

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/vue-cli%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE.md)**

&emsp;查阅网上诸多资料，并结合自己的学习经验，写下这篇Vue学习笔记，以记录自己的学习心得。现分享给大家，以供参考。

&emsp;作为一只前端菜鸟，这是我掘金分享的第四篇文章。如有不足，还请多多指教，谢谢大家。

# 前言

&emsp;在上一篇项目搭建文章中，我们已经下载安装了node环境以及vue-cli，并且已经成功构建了一个vue-cli项目，那么接下来，我们来梳理一下vue-cli项目的结构。

&emsp;参考文献：

- [vue-cli入门（二）——项目结构 | 思否-Reachel](https://segmentfault.com/a/1190000009151589)
- [Vue-cli创建vue项目以及配置文件梳理 | 思否-AshleyLv](https://segmentfault.com/a/1190000010659925)
- [Vue系列之WebPack与Eslint | 充电实践 ](https://www.toutiao.com/i6378822382726939138/?group_id=6378816803061907713&group_flags=0)

# 正文

## Vue项目结构一览

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

在webpack的配置文件里，设置了main.js是入口文件，我们的项目默认访问index.html，这个文件里面<div id="app"></div>和App.vue组件里面的容器完美的重合了，也就是把组件挂载到了index页面，然后我们只需要去建设其他组件就好了，在App组件中我们也可以引入，注册，应用其他组件，后面我会介绍如何通过路由将其他组件渲染在App组件，这样我们就只需要去关注每个组件的功能完善。

就是说vue的默认页面是index.html，index中的<div id="app"></div>挂载了App.vue这个大组件，然后所有的其他子组件（hello.vue等）都归属在App.vue这个主组件下。


## 主要文件详解

在vue-cli的项目中，其中src文件夹是需要掌握的，其中的文件可参考以下文章：
- [vue-cli入门（二）——项目结构 | 思否-Reachel](https://segmentfault.com/a/1190000009151589)

，至于其他配置文件，详情可参考以下文章：
- [Vue-cli创建vue项目以及配置文件梳理 | 思否-AshleyLv](https://segmentfault.com/a/1190000010659925)

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

### 1、安装node

&emsp;Vue项目通常通过webpack工具来构建，而webpack命令的执行是依赖node.js的环境的，所以首先要安装node.js。node.js的官方地址为：`https://nodejs.org/en/download/`，下载相应版本
![](../../public-repertory/img/vue-cli-img/node.png)


# 总结 

&emsp;路漫漫其修远兮，希望Git及GitHub可以帮我们记录每一个脚印，每一步成长。与诸君共勉。

&emsp;祝大家2019更上一层楼！

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/vue-cli%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE.md)**

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="wzh" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。