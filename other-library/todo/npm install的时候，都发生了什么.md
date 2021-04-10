# [Markdown 博客模板](https://github.com/danygitgit/document-library)

> create by **db** on **2020-9-2 13:30:46**  
> Recently revised in **2020-9-2 13:30:51**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [一、第一章](#chapter-1)
  - [二、第二章](#chapter-2)
  - [三、第三章](#chapter-3)
  - [四、第四章](#chapter-4)
  - [五、第五章](#chapter-5)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;这里是前言内容！

# <a  id="main-body">正文</a>

&emsp;这里是正文内容！

## <a  id="chapter-1">一、第一章</a>

> [返回目录](#catalog)

&emsp;vue install 注册全局组件

木槿之夏 2019-07-19 18:20:55  12544  收藏 14
分类专栏： vue
版权
项目中的有些组件使用的频率比较高，这时候我们可以注册全局的组件，这样就不用每次使用的组件的时候一次次的导入
具体使用的步骤如下
一般会把这个常用的组件在main.js文件中注册好
1.首先先建立一个公用的组件

// Cmponent.vue 公用的组件
<template>
    <div>
        我是组件
    </div>
</template>
 
<script>
    export default {
 
    }
</script>
 
<style scoped>
    div{
        font-size:40px;
        color:#fbb;
        text-align:center;
    }
</style>
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
2.新建一个install.js文件

import component from './Cmponent.vue'
const component = {
    install:function(Vue){
        Vue.component('component-name',component)
    }  //'component-name'这就是后面可以使用的组件的名字，install是默认的一个方法 component-name 是自定义的，我们可以按照具体的需求自己定义名字
    
}
// 导出该组件
export default component
1
2
3
4
5
6
7
8
9
3.在main.js文件中注册

// 引入组件
import install from '@plugins/install'; 
// 全局挂载utils
Vue.use(install);
1
2
3
4
4.在页面中使用

 
<template>
   <div>
      <component-name></component-name>
   </div>    
</template>
————————————————
版权声明：本文为CSDN博主「木槿之夏」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_34543252/article/details/96489045
## <a  id="chapter-2">二、第二章</a>

> [返回目录](#catalog)
https://segmentfault.com/a/1190000022802059
&emsp;深入理解Vue的插件机制与install

Ekko_
发布于 2020-06-01
前言
我们在使用Vue的时候，经常会使用并写一些自定义的插件，然后利用Vue.use引入。所以提到写插件，install这个方法是必不可少的。Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象。这是Vue官方对Vue插件的规范。那这install函数到底是什么东东呢，Vue内部到底用它做了什么处理，怎么调用的，今天我就给大家伙从源码层面把他整的明明白白。
看完这篇文章，你将学到：

install函数可以做些什么；
install内部是怎么实现的；
Vuex，Vue-Router插件在install期间到底干了什么；
好啦，闲话不多说，咱们直接开始！！！
d4c88a54f4f720394d3ac795268dd6c6.jpg

install在Vuex&Vue-Router中的处理
这里先抛出两个问题，大家可以思考下，算是挖坑，下面再逐一解答：

为什么我们在项目中可以直接使用$router $store来获取其中的值以及一些方法；
为什么使用这俩插件都是先用Vue.use引入。然后才创建实例，在Vue实例中传入；
二者其实原理相同，这里我们用Vue-Router来举例，首先我们来看一下它内部install的具体实现：

class Router {
    constructor(options) {
        ...
    }
}

Router.install = function(_Vue) {

    _Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                _Vue.prototype.$router = this.$options.router
            }
        }
    })

}

export default Router;
_Vue.mixin全局混入是什么呢？相当于在所有的组件中混入这个方法；
beforeCreate是什么呢？当然是Vue的一个生命周期，在create之前执行；
既然如此，我们大胆的做一个判断。Vue-Router其实是在install函数里面使用了一个全局混入，在beforeCreate这个生命周期触发的时候把this.$options.router挂载到Vue的原型上，这样我们就可以使用this.$router来调用router实例啦。
同学A：等一下，stop！！！你说的我很李姐，但是this.$options.router这又是什么东西，从哪来的啊？
141239d5226d826b85e775d02d9d359c.jpg

安啦，这咱们才刚刚解决了第一个问题，下面咱们来填第二个坑。

咱们平时使用Vue-Router，以及定义入口文件的Vue实例大概是这样子

// router/index.js
import VueRouter form 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const _router = [
    ...
]

const Router = new VueRouter(_router);

export default Router;

// main.js
import Vue from 'vue';
import router from 'router';

new Vue({
    router,
    ...
}).$mount('#app');
结合最开始的例子，我们先来分析一波。

Vue.use()主要是调用插件内部的install方法，并将Vue实例作为参数传入；
上面使用的是this.$options.router，options通常代表的是配置项；
在main.js中我们把Router实例作为配置项传入到Vue实例中
叮！！！要素察觉，那我们来大胆推测一波。
Vue-Router先use其实是做了一个全局混入，为了在合适的时间点，获取到Vue根实例配置项中的router实例，执行挂载。紧接着在new Vue()根实例创建的时候，注入router实例，然后触发全局混入中的生命周期，这个时候根实例的配置项this.$options已经包含了router实例，最后完成挂载流程！！！
光这一段的代码也是逻辑缜密，编程思路巧妙，令人直呼内行啊！兄弟萌，把内行打在公屏上，hhhh。
c16b9c11f6d1eb1cf4e03ab9651e1c83.jpg

install在Vue中的内部实现
看完了常用库install的使用，不知大家是否有收获。接下来热身结束后，我们就可以开始看一看install内部实现了，先上源码。

export function initUse (Vue: GlobalAPI) {
    // 注册一个挂载在实例上的use方法
    Vue.use = function (plugin: Function | Object) {
        // 初始化当前插件的数组
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
        // 如果这个插件已经被注册过了，那就不作处理
        if (installedPlugins.indexOf(plugin) > -1) {

            return this

        }

        ...
        
        // 重点来了哦！！！
        if (typeof plugin.install === 'function') {
        // 当插件中install是一个函数的时候，调用install方法，指向插件，并把一众参数传入
            plugin.install.apply(plugin, args)

        } else if (typeof plugin === 'function') {
        // 当插件本身就是一个函数的时候，把它当做install方法，指向插件，并把一众参数传入
            plugin.apply(null, args)

        }
        
        // 将插件放入插件数组中
        installedPlugins.push(plugin)

        return this
    }
}
源码这部分写的很简洁，可读性很高。就是在use的时候，判断插件类型，执行install或者插件本身。其实细化一下官网的解释就是，Class类的插件应该暴露一个 install 方法。

结语
这次的分享到这里就结束啦，不知道大家对于Vue的插件机制有没有更深入的了解呢？其实开发插件的时候利用install我们可以做茫茫多的事儿。
比如Vue-Router在install中其实还注册了Router-view和Router-link的全局组件。感兴趣的同学们可以去看一下vue-router的原理？我们来手撸一个vue-router！
再次感谢你的阅读。好啦，兄弟萌再见咯！

## <a  id="chapter-3">三、第三章</a>

> [返回目录](#catalog)

&emsp;第三章内容！

## <a  id="chapter-4">四、第四章</a>

> [返回目录](#catalog)

&emsp;第四章内容！

## <a  id="chapter-5">五、第五章</a>

> [返回目录](#catalog)
https://www.jianshu.com/p/710fbbff15ba?from=groupmessage
&emsp;Vue.use原理及源码解读

茶树菇小学生
0.18
2018.03.11 19:32:59
字数 142
阅读 6,594
vue.use（plugin, arguments） 语法
参数：plugin(Function | Object)

用法：
如果vue安装的组件类型必须为Function或者是Object

如果是个对象，必须提供install方法

如果是一个函数，会被直接当作install函数执行

install函数接受参数，默认第一个参数为Vue,其后参数为注册组件时传入的arguments

组件.js
    export const testObj = {
        install(Vue, arg) {
            
        }
    }
    export const testFn = founction(Vue, arg) {
        
    }
    
index.js
    import { testObj, testFn } from './组建.js'
    Vue.use(testObj, arg)
    Vue.use(testFn, arg)
    
建议组件采用第一种写法，根据use源码，当采用第二种写法时，this指针指向null

    if (typeof plugin.install === 'function') {
          plugin.install.apply(plugin, args)
        } else if (typeof plugin === 'function') {
          plugin.apply(null, args)
        }
官方use源码

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
 Vue.use = function (plugin: Function | Object) {
// 限制了自定义组建的类型
   const installedPlugins = (this._installedPlugins || (this._installedPlugins =
[]))
//保存注册组件的数组，不存在及创建
   if (installedPlugins.indexOf(plugin) > -1) {
//判断该组件是否注册过，存在return Vue对象
     return this
   }
//调用`toArray`方法
   const args = toArray(arguments, 1)
   args.unshift(this)
//将Vue对象拼接到数组头部
   if (typeof plugin.install === 'function') {
//如果组件是对象，且提供install方法，调用install方法将参数数组传入，改变`this`指针为该组件
     plugin.install.apply(plugin, args)
   } else if (typeof plugin === 'function') {
//如果传入组件是函数，这直接调用，但是此时的`this`指针只想为`null` 
     plugin.apply(null, args)
   }
//在保存注册组件的数组中添加
   installedPlugins.push(plugin)
   return this
 }
}
toArray方法源码

export function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
//将存放参数的数组转为数组，并除去第一个参数（该组件）
  const ret: Array<any> = new Array(i)
//循环拿出数组
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}




# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;这里是总结内容！

### <a  id="reference-documents">参考文献</a>

- [Markdown 博客模板 | 掘金-豆包君](https://juejin.im/user/5b1a3eb7f265da6e572b3ada)

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
