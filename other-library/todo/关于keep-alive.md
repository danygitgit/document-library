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

&emsp;彻底揭秘keep-alive原理
一、前言
原文链接：github.com/qi...

本文介绍的内容包括：

keep-alive用法：动态组件&vue-router
keep-alive源码解析
keep-alive组件及其包裹组件的钩子
keep-alive组件及其包裹组件的渲染
二、keep-alive介绍与应用
2.1 keep-alive是什么
keep-alive是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中；使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

2.2 一个场景
用户在某个列表页面选择筛选条件过滤出一份数据列表，由列表页面进入数据详情页面，再返回该列表页面，我们希望：列表页面可以保留用户的筛选（或选中）状态。keep-alive就是用来解决这种场景。当然keep-alive不仅仅是能够保存页面/组件的状态这么简单，它还可以避免组件反复创建和渲染，有效提升系统性能。 总的来说，keep-alive用于保存组件的渲染状态。

2.3 keep-alive用法
在动态组件中的应用
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <component :is="currentComponent"></component>
</keep-alive>
复制代码
在vue-router中的应用
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <router-view></router-view>
</keep-alive>
复制代码
include定义缓存白名单，keep-alive会缓存命中的组件；exclude定义缓存黑名单，被命中的组件将不会被缓存；max定义缓存组件上限，超出上限使用LRU的策略置换缓存数据。

三、源码剖析
keep-alive.js内部另外还定义了一些工具函数，我们按住不表，先看它对外暴露的对象。

// src/core/components/keep-alive.js
export default {
  name: 'keep-alive',
  abstract: true, // 判断当前组件虚拟dom是否渲染成真是dom的关键

  props: {
    include: patternTypes, // 缓存白名单
    exclude: patternTypes, // 缓存黑名单
    max: [String, Number] // 缓存的组件实例数量上限
  },

  created () {
    this.cache = Object.create(null) // 缓存虚拟dom
    this.keys = [] // 缓存的虚拟dom的健集合
  },

  destroyed () {
    for (const key in this.cache) { // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    // 实时监听黑白名单的变动
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    // 先省略...
  }
}
复制代码
可以看出，与我们定义组件的过程一样，先是设置组件名为keep-alive，其次定义了一个abstract属性，值为true。这个属性在vue的官方教程并未提及，却至关重要，后面的渲染过程会用到。props属性定义了keep-alive组件支持的全部参数。

keep-alive在它生命周期内定义了三个钩子函数：

created

初始化两个对象分别缓存VNode（虚拟DOM）和VNode对应的键集合

destroyed

删除this.cache中缓存的VNode实例。我们留意到，这里不是简单地将this.cache置为null，而是遍历调用pruneCacheEntry函数删除。

// src/core/components/keep-alive.js
function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy() // 执行组件的destory钩子函数
  }
  cache[key] = null
  remove(keys, key)
}
复制代码
删除缓存VNode还要对应执行组件实例的destory钩子函数。

mounted

在mounted这个钩子中对include和exclude参数进行监听，然后实时地更新（删除）this.cache对象数据。pruneCache函数的核心也是去调用pruneCacheEntry。

render

  // src/core/components/keep-alive.js
  render () {
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot) // 找到第一个子组件对象
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) { // 存在组件参数
      // check pattern
      const name: ?string = getComponentName(componentOptions) // 组件名
      const { include, exclude } = this
      if ( // 条件匹配
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null // 定义组件的缓存key
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) { // 已经缓存过该组件
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key) // 调整key排序
      } else {
        cache[key] = vnode // 缓存组件对象
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) { // 超过缓存数限制，将第一个删除
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true // 渲染和执行被包裹组件的钩子函数需要用到
    }
    return vnode || (slot && slot[0])
  }
复制代码
第一步：获取keep-alive包裹着的第一个子组件对象及其组件名；
第二步：根据设定的黑白名单（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例（VNode），否则执行第三步；
第三步：根据组件ID和tag生成缓存Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该key在this.keys中的位置（更新key的位置是实现LRU置换策略的关键），否则执行第四步；
第四步：在this.cache对象中存储该组件实例并保存key值，之后检查缓存的实例数量是否超过max的设置值，超过则根据LRU置换策略删除最近最久未使用的实例（即是下标为0的那个key）。
第五步：最后并且很重要，将该组件实例的keepAlive属性值设置为true。这个在@不可忽视：钩子函数 章节会再次出场。
四、重头戏：渲染
4.1 Vue的渲染过程
借一张图看下Vue渲染的整个过程：


Vue的渲染是从图中的render阶段开始的，但keep-alive的渲染是在patch阶段，这是构建组件树（虚拟DOM树），并将VNode转换成真正DOM节点的过程。
简单描述从render到patch的过程

我们从最简单的new Vue开始：

import App from './App.vue'

new Vue({
  render: h => h(App),
}).$mount('#app')
复制代码
Vue在渲染的时候先调用原型上的_render函数将组件对象转化为一个VNode实例；而_render是通过调用createElement和createEmptyVNode两个函数进行转化；
createElement的转化过程会根据不同的情形选择new VNode或者调用createComponent函数做VNode实例化；
完成VNode实例化后，这时候Vue调用原型上的_update函数把VNode渲染为真实DOM，这个过程又是通过调用__patch__函数完成的（这就是pacth阶段了）
用一张图表达：


4.2 keep-alive组件的渲染
我们用过keep-alive都知道，它不会生成真正的DOM节点，这是怎么做到的？

// src/core/instance/lifecycle.js
export function initLifecycle (vm: Component) {
  const options = vm.$options
  // 找到第一个非abstract的父组件实例
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  vm.$parent = parent
  // ...
}
复制代码
Vue在初始化生命周期的时候，为组件实例建立父子关系会根据abstract属性决定是否忽略某个组件。在keep-alive中，设置了abstract: true，那Vue就会跳过该组件实例。

最后构建的组件树中就不会包含keep-alive组件，那么由组件树渲染成的DOM树自然也不会有keep-alive相关的节点了。

keep-alive包裹的组件是如何使用缓存的？

在patch阶段，会执行createComponent函数：

// src/core/vdom/patch.js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    let i = vnode.data
    if (isDef(i)) {
      const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */)
      }

      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue)
        insert(parentElm, vnode.elm, refElm) // 将缓存的DOM（vnode.elm）插入父元素中
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
        }
        return true
      }
    }
  }
复制代码
在首次加载被包裹组件时，由keep-alive.js中的render函数可知，vnode.componentInstance的值是undefined，keepAlive的值是true，因为keep-alive组件作为父组件，它的render函数会先于被包裹组件执行；那么就只执行到i(vnode, false /* hydrating */)，后面的逻辑不再执行；
再次访问被包裹组件时，vnode.componentInstance的值就是已经缓存的组件实例，那么会执行insert(parentElm, vnode.elm, refElm)逻辑，这样就直接把上一次的DOM插入到了父元素中。
五、不可忽视：钩子函数
5.1 只执行一次的钩子
一般的组件，每一次加载都会有完整的生命周期，即生命周期里面对应的钩子函数都会被触发，为什么被keep-alive包裹的组件却不是呢？ 我们在@源码剖析 章节分析到，被缓存的组件实例会为其设置keepAlive = true，而在初始化组件钩子函数中：

// src/core/vdom/create-component.js
const componentVNodeHooks = {
  init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      )
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  }
  // ...
}
复制代码
可以看出，当vnode.componentInstance和keepAlive同时为truly值时，不再进入$mount过程，那mounted之前的所有钩子函数（beforeCreate、created、mounted）都不再执行。

5.2 可重复的activated
在patch的阶段，最后会执行invokeInsertHook函数，而这个函数就是去调用组件实例（VNode）自身的insert钩子：

// src/core/vdom/patch.js
  function invokeInsertHook (vnode, queue, initial) {
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue
    } else {
      for (let i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i])  // 调用VNode自身的insert钩子函数
      }
    }
  }
复制代码
再看insert钩子：

// src/core/vdom/create-component.js
const componentVNodeHooks = {
  // init()
  insert (vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        queueActivatedComponent(componentInstance)
      } else {
        activateChildComponent(componentInstance, true /* direct */)
      }
    }
  // ...
}
复制代码
在这个钩子里面，调用了activateChildComponent函数递归地去执行所有子组件的activated钩子函数：

// src/core/instance/lifecycle.js
export function activateChildComponent (vm: Component, direct?: boolean) {
  if (direct) {
    vm._directInactive = false
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false
    for (let i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i])
    }
    callHook(vm, 'activated')
  }
}
复制代码
相反地，deactivated钩子函数也是一样的原理，在组件实例（VNode）的destroy钩子函数中调用deactivateChildComponent函数。

参考
Vue技术揭秘|keep-alive
Vue源码

## <a  id="chapter-2">二、第二章</a>

> [返回目录](#catalog)

&emsp;第二章内容！

## <a  id="chapter-3">三、第三章</a>

> [返回目录](#catalog)

&emsp;第三章内容！

## <a  id="chapter-4">四、第四章</a>

> [返回目录](#catalog)

&emsp;第四章内容！

## <a  id="chapter-5">五、第五章</a>

> [返回目录](#catalog)

&emsp;第五章内容！

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;这里是总结内容！

### <a  id="reference-documents">参考文档</a>

- [Markdown 博客模板 | 掘金-豆包君](https://juejin.im/user/5b1a3eb7f265da6e572b3ada)

https://juejin.cn/post/6844903837770203144

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
