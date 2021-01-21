@[JS 三座大山之异步和单线程](https://github.com/danygitgit/document-library)

> create by **db** on **2021-1-12 16:47:32**  
> Recently revised in **2021-1-12 16:47:37**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)

- [正文](#main-body)

- [总结](#summary)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;作为一个前端工程师，javaScript 应该是我们赖以生存的本事了。那么，你知道所谓的 javaScript 的三座大山是什么吗？

&emsp;对！那就是我们刚学习 js 时老师所强调的：

- 原型和原型链

- 作用域和闭包

- 异步和单线程

下面我们就来爬上第一座大山——原型和原型链，去领略一下吧。

# <a  id="main-body">正文</a>

> [返回目录](#catalog)

## 异步和同步

### 同步：

&emsp;举个例子来说，一家餐厅吧来了 5 个客人，同步的意思就是说，来第一个点菜，点了个鱼，好， 厨师去捉鱼杀鱼，过了半小时鱼好了给第一位客人，开始下位一位客人，就这样一个一个来，按顺序来。

**同步的优点**

- 同步是按照顺序一个一个来，不会乱掉，更不会出现上面代码没有执行完就执行下面的代码，

**同步的缺点**

- 解析的速度没有异步的快；

举个栗子：

```js
console.log(100)

alert(200)

console.log(300)

// 100
// 300
// 200
```

&emsp;我们发现最开始输出 `100`，然后弹出了 `200`，再不点击`确认`的情况下，永远不会输出 `300`，这就是同步，顺序执行。

### 异步：

&emsp;异步的意思就是来第一位客人，点什么，点鱼，给它一个牌子，让他去一边等吧，下一位客人接着点菜，点完接着点让厨师做去吧，哪个的菜先好就先端出来。

**异步的优点**

- 异步是接取一个任务，直接给后台，在接下一个任务，一直一直这样，谁的先读取完先执行谁的，

**异步的缺点**

- 没有顺序 ，谁先读取完先执行谁的 ，会出现上面的代码还没出来下面的就已经出来了，会报错；

举个栗子：

```js
console.log(100)

setTimeout(function () {
  console.log(200)
}, 1000)

console.log(300)

// 100
// 300
// 200
```

&emsp;运行之后我们会发现，先输出了 `100`，然后是 `300`，1 秒之后再输出了 `200`，这就是异步,即下面的代码不受上面代码的影响。

&emsp;对比之后我们发现，同步是有**阻塞**的，需要等待前面的执行完才会继续执行后面代码。而异步是**非阻塞**，无需等待的。

### 什么时候需要异步

&emsp;**需要等待但是又不能阻塞程序的时候需要使用异步**

前端使用异步的场景有：

1. 定时任务

- setTimeout,setInverval

2. 网络请求

- ajax 请求，img 图片的动态加载

3. 事件绑定或者叫 DOM 事件

- 比如一个点击事件，我不知道它什么时候点，但是在它点击之前，我该干什么还是干什么。用 addEventListener 注册一个类型的事件的时候，浏览器会有一个单独的模块去接收这个东西，当事件被触发的时候，浏览器的某个模块，会把相应的函数扔到异步队列中，如果现在执行栈中是空的，就会直接执行这个函数。

4. ES6 中的 Promise
## 单线程与多线程

### 单线程
### 多线程

单线程就是一次只能执行一个任务。

这一个个任务形成任务队列等待执行，这时有些任务是耗时的，比如图片加载、网络请求、时间监听，如果让他们用同步一个一个区执行的话，效率会非常低，还有可能出现卡死的情况，这个时候异步的解决方案就出现了。

这里我们要注意，异步只是解决了同步阻塞的情况，并非是解决了单线程，js 就是单线程语言。

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;路漫漫其修远兮，与诸君共勉。

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2c2a873bdad472f88ee6143620245de~tplv-k3u1fbpfcp-zoom-1.image" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
