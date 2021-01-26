@[JS 三座大山之作用域和闭包](https://github.com/danygitgit/document-library)

> create by **db** on **2021-1-12 16:47:32**  
> Recently revised in **2021-1-26 14:50:43**
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

下面我们就来爬上第二座大山——作用域和闭包，去领略一下吧。

求票
&emsp;本人正在参与掘金2020年度人气创作者榜单排名，希望各位小伙伴帮我投票，2021年会给大家带来更多优质的文章，感谢大家。
# <a  id="main-body">正文</a>

> [返回目录](#catalog) >

&emsp;阮一峰老师说：要理解闭包，首先必须理解 Javascript 特殊的`变量作用域。`

## 作用域

&emsp;**作用域**是程序源代码中定义变量的区域。它规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

举个栗子：

```js
// 全局作用域
if (true) {
  var personName = 'zhangsan'
}

// 函数作用域
function fn() {
  var personAge = 18
  console.log(personAge) // 18
}

fn()

console.log(personName) // zhangsan
console.log(personAge) // personAge is not defined
```

&emsp;上面的 `personName` 就被暴露到了全局了，而 `personAge` 则只能再函数 fn 内部可以访问，在 ES6 到来之前，javaScript 中只有**全局作用域**和**函数作用域**

&emsp;从上面的例子可以体会到作用域的概念，作用域就是**一个独立的地盘，让变量不会外泄、暴露出去**。

### 全局作用域

&emsp;全局作用域就是**最外层的作用域**，如果我们写了很多行 JS 代码，变量定义都没有用函数包括，那么它们就全部都在全局作用域中。

&emsp;拥有全局作用域的变量叫做**全局变量**，他们在代码中任何地方都能访问到的，谁都可以对其更改，这样的坏处就是很容易撞车、冲突。

举个栗子：

```js
// 张三写的代码中
var data = { a: 100 }

// 李四写的代码中
var data = { x: true }

console.log(data) //  { x: true }
```

### 函数作用域

&emsp;我们将使用`var`将变量声明在函数内部（`function(){....}`），就形成了**函数作用域**。

&emsp;像这样，定义在函数内部的变量叫做**局部变量**，局部变量只能在它被调用的作用域范围内进行读和写的操作，对该函数外部来说，局部变量是不可见的，当然也不可更改。

举个栗子：

```js
function fn() {
  var a = 200
  console.log('fn', a)
}

fn() // fn 200

console.log('global', a) // Error: a is not defined
```

&emsp;这就是为何 jQuery、Zepto 等库的源码，所有的代码都会放在`(function(){....})()`中。因为放在里面的所有变量，都不会被外泄和暴露，不会污染到外面，不会对其他的库或者 JS 脚本造成影响。这是函数作用域的一个体现。

### 块级作用域

&emsp;现在我们有了 ES6， ES6 定义了`let`和`const`，他们可以保证外层块不受内层块的影响。即内层块形成了一个块级作用域（`{}`）。

举个栗子：

```js
if (true) {
  let personName = 'zhangsan'

  console.log(personName) // zhangsan
}
console.log(personName) // personName is not defined
```

&emsp;从上可以看出，`let`定义的`personName`是在if这个块级作用域内定义的，因此只能在块内访问。
## 作用域链

&emsp;首先认识一下什么叫做**自由变量** 。

### 自由变量

&emsp;如我在全局中定义了一个变量`a`，然后我在函数中使用了这个`a`，这个`a`就可以称之为`自由变量`。可以这样理解，**凡是跨了自己的作用域的变量都叫自由变量**。

举个栗子：

```js
var a = 100
function fn() {
  var b = 200
  console.log(a)
  console.log(b)
}

fn() // 100  200
```

&emsp;如上代码中，`console.log(a)`要得到 `a` 变量，但是在当前的作用域中没有定义 `a`（可对比一下 `b`）。 `a`就是`自由变量` 。

&emsp;那么问题来了，`a`在当前作用域没有定义，他又是如何打印出来的呢？

&emsp;没错，向父级作用域寻找。

&emsp;如果父级也没呢？再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是**作用域链** 。

举个栗子：

```js
var a = 100
function F1() {
  var b = 200
  function F2() {
    var c = 300
    console.log(a) // 自由变量，顺作用域链向父作用域找
    console.log(b) // 自由变量，顺作用域链向父作用域找,找到全局作用域
    console.log(c) // 本作用域的变量
    console.log(d) // 没有定义，找到全局作用域找不到返回错误
  }
  F2()
}
F1() // 100  200  300  Error：d is not defined
```

## 闭包

&emsp;了解了`作用域`和`作用域链`，我们就可以看看`闭包`了

### 什么是闭包

&emsp;在 JavaScript 中，根据变量作用域的规则，内部函数总是可以访问其外部函数中声明的变量。

&emsp;当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为**闭包**。

简单来说：

- 在函数 A 中还有函数 B，函数 B 调用了函数 A 中的变量，那么函数 B 就称为函数 A 的闭包。

&emsp;通俗来讲，JS 所有的 function 都是一个闭包。

举个栗子：

```js
function foo() {
  let num = 0
  return function () {
    num++
    console.log(num)
  }
}
const f = foo()
var num = 100
f() // 1
f() // 2
```

&emsp; 自由变量将从作用域链中去寻找，所以自由变量`num`找到函数`foo`中就找到了，于是`num`的值是`1`;

&emsp;函数`foo`执行时创建了一个内部函数，这个内部函数作为返回值，以某种方式保留下来（`num`一直存在），所以每次调用`num`都会 + 1。这里就用了闭包。

<!-- ### 闭包的特点


1. 作为一个函数变量的一个引用，当函数返回时，其处于激活状态。
一个闭包就是当一个函数返回时，一个没有释放资源的栈区。 -->

#### 闭包的用途场景

&emsp;也许你会疑惑，闭包就这？这有啥用？

1. 匿名自执行函数

&emsp;我们创建了一个匿名的函数，并立即执行它，由于外部无法引用它内部的变量，因此在函数执行完后会立刻释放资源，关键是不污染全局对象。

代码如下：

```js
;(function () {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today = new Date(),
    msg = 'Today is ' + days[today.getDay()] + ', ' + today.getDate()
  alert(msg)
})()
```

2. 结果缓存

&emsp;我们开发中会碰到很多情况，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，那么我们就需要将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找，如果找不到，则进行计算，然后更新缓存并返回值，如果找到了，直接返回查找到的值即可。

&emsp;闭包正是可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留。
代码如下：

```js
var CachedSearchBox = (function () {
  var cache = {},
    count = []
  return {
    attachSearchBox: function (dsid) {
      if (dsid in cache) {
        //如果结果在缓存中
        return cache[dsid] //直接返回缓存中的对象
      }
      var fsb = new uikit.webctrl.SearchBox(dsid) //新建
      cache[dsid] = fsb //更新缓存
      if (count.length > 100) {
        //保正缓存的大小<=100
        delete cache[count.shift()]
      }
      return fsb
    },

    clearSearchBox: function (dsid) {
      if (dsid in cache) {
        cache[dsid].clearSelection()
      }
    },
  }
})()
```

3. 封装

代码如下：

```js
var person = (function () {
  //变量作用域为函数内部，外部无法访问
  var personName = 'default'
  return {
    getName: function () {
      return personName
    },
    setName: function (newName) {
      personName = newName
    },
  }
})()
```

4. 实现类和继承

代码如下：

```js
function Person() {
  var personName = 'default'
  return {
    getName: function () {
      return personName
    },
    setName: function (newName) {
      personName = newName
    },
  }
}

var p = new Person()
p.setName('Tom')
alert(p.getName()) //Tom

var Jack = function () {}
//继承自Person
Jack.prototype = new Person()
//添加私有方法
Jack.prototype.Say = function () {
  alert('Hello,my personName is Jack')
}
var j = new Jack()
j.setName('Jack')
j.Say()
alert(j.getName()) //Jack
```

#### 闭包的优缺点

**优点：**

1.  函数作为返回值，缓存数据

- 可以让这些局部变量隐藏起来。保存在内存中，不被 GC 回收，实现变量数据共享。

2.  函数作为参数传递

- 利用闭包特性完成柯里化（通过将多个参数换成一个参数，每次运行返回新函数的技术）,详见[详解 JS 函数柯里化](https://www.jianshu.com/p/2975c25e4d71)

**缺点：**

1.  内存消耗

- 由于闭包会使得函数中的变量都被保存在内存中，无法被销毁，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在 IE 中可能导致内存泄露。

- 解决方法是：在退出函数之前，将不使用的局部变量全部删除。

2.  闭包会在父函数外部，改变父函数内部变量的值。

- 如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;关于作用域和闭包，就先说这些了。好好学习，天天向上。

&emsp;路漫漫其修远兮，与诸君共勉。

## 参考文献：

- [jsliang 求职系列 - 03 - 闭包与柯里化 | 掘金-jsliang ](https://juejin.cn/post/6891097178064814088)

- [js 中闭包的理解、用途场景、优缺点及解决办法 | 简书-sdcV ](https://www.jianshu.com/p/8376170fb228)

&emsp;路漫漫其修远兮，与诸君共勉。

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2c2a873bdad472f88ee6143620245de~tplv-k3u1fbpfcp-zoom-1.image" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
