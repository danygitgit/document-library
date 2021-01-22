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

### 什么是进程？

&emsp;当一个程序开始运行时，它就是一个进程，进程包括运行中的程序和程序所使用到的内存和系统资源。

&emsp;而一个进程又是由多个线程所组成的。

### 什么是线程？

&emsp;线程是程序中的一个执行流，每个线程都有自己的专有寄存器(栈指针、程序计数器等)，但代码区是共享的，

&emsp;即不同的线程可以执行同样的函数。

### 什么是多线程？

&emsp;多线程是指程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务。

&emsp;也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。

**多线程的好处：**

- 可以提高 CPU 的利用率。在多线程程序中，一个线程必须等待的时候，CPU 可以运行其它的线程而不是等待，

- 这样就大大提高了程序的效率。

**多线程的不利方面：**

- 线程也是程序，所以线程需要占用内存，线程越多占用内存也越多；
- 多线程需要协调和管理，所以需要 CPU 时间跟踪线程；
- 线程之间对共享资源的访问会相互影响，必须解决竞用共享资源的问题；
- 线程太多会导致控制太复杂，最终可能造成很多 Bug；

### 什么是单线程？

&emsp;单线程是指程序中仅包含 1 个执行流，即一次只能执行一个任务

&emsp;也就是说程序执行时，所跑的程序路径（处理的东西）是连续顺序下来的，必须前面的处理好，后面的才会执行到。

**单线程的优点：**

- 单线程顺序执行任务的方式比较符合编程人员按顺序思考的思维方式，不需要考虑太多状况，实现起来比较简单，执行环境相对单纯；

**单线程的缺点：**

- 效率低，只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行

## 关于 JavaScript

### JavaScript 是单线程的

&emsp;我们都知道，**JavaScript 是一个单线程的语言。**

&emsp;那为什么不设计成多线程？

- 假设有个 `DOM` 节点，现在有线程 `A` 操作它，删除了这个 `DOM`；
- 然后线程 `B` 又操作它，修改了这个 `DOM` 某部分。
- 那么现在问题来了，咱听谁的？
- 所以干脆设计成一个单线程，安全稳妥不出事。
- 哪怕后期 `HTML5` 出了个 `Web Worker` 也是不允许操作 `DOM `结构的，可以完成一些分布式的计算。

### 浏览器内核是多线程的

&emsp;而 JavaScript 是运行在浏览器或者 nodeJS 中的， 浏览器内核是怎样的呢？

&emsp;浏览器内核是多线程的，在内核控制下各线程相互配合以保持同步，一个浏览器通常由以下常驻线程组成：

- GUI 渲染线程：解析 HTML、CSS 等。在 JavaScript 引擎线程运行脚本期间，GUI 渲染线程处于挂起状态，也就是被 “冻结” 了。
- JavaScript 引擎线程：负责处理 JavaScript 脚本。
- 定时触发器线程：setTimeout、setInterval 等。事件触发线程会将计数完毕后的事件加入到任务队列的尾部，等待 JS 引擎线程执行。
- 事件触发线程：负责将准备好的事件交给 JS 引擎执行。
- 异步 http 请求线程：负责执行异步请求之类函数的线程，例如 Promise.then()、ajax 等。

&emsp;以 Chrome 浏览器中为例，当你打开一个 Tab 页时，其实就是创建了一个进程。

&emsp;一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。

&emsp;当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。

### 为什么需要异步？

&emsp;这时候又有问题了，如果调用某个接口（`Ajax`），或者加载某张图片的时候，我们卡住了，这样页面是不是就一直不能渲染？

&emsp;然后因为单线程只能先让前面的程序走完，即便这个接口或者图片缓过来了，我下面还有其他任务没做呢，这不就卡死了么？

&emsp;所以这时候**异步**来了：

&emsp;在涉及某些需要等待的操作的时候，我们就选择让程序继续运行。

&emsp;等待接口或者图片返回过来后，就通知程序我做好了，你可以继续调用了。

&emsp;总的来说，一部

作者：jsliang
链接：https://juejin.cn/post/6892164887456251918
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

作者：jsliang
链接：https://juejin.cn/post/6892164887456251918
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;路漫漫其修远兮，与诸君共勉。

http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html

作者：jsliang
链接：https://juejin.cn/post/6892164887456251918
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

https://www.cnblogs.com/onesea/p/13608642.html
**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2c2a873bdad472f88ee6143620245de~tplv-k3u1fbpfcp-zoom-1.image" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
