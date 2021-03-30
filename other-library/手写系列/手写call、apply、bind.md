# [手写 call、apply、bind](https://github.com/danygitgit/document-library)

> create by **db** on **2021-3-29 18:47:1**  
> Recently revised in **2021-3-30 15:52:42**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [call](#chapter-1)
  - [apply](#chapter-2)
  - [bind](#chapter-3)
  - [实现 myCall](#chapter-4)
  - [实现 myApply](#chapter-5)
  - [实现 myBind](#chapter-6)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;我们都知道 call apply bind 都可以改变函数调用的 this 指向。那么它们三者有什么区别，什么时候该用哪个呢？

&emsp;然后我们尝试一下自己实现这三个函数
# <a  id="main-body">正文</a>

## <a  id="chapter-1">call</a>

> [返回目录](#catalog)

详情请参考：[Function.prototype.call() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

&emsp;`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。
x
&emsp;注意：该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。

#### 语法：

`function.call(thisArg, arg1, arg2, ...)`

#### 参数：

- `thisArg`：可选的。在 function 函数运行时使用的 this 值。请注意，
  - 非严格模式：如果不传参数，或者第一个参数是 null 或 nudefined，this 都指向**window**。
  - 严格模式：第一个参数是谁，this 就指向谁，包括 null 和 undefined，如果不传参数 this 就是**undefined**
- `arg1, arg2, ...`：指定的参数列表

#### 返回值:

&emsp;使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。

#### 使用：

```js
function Product(name, price) {
  this.name = name
  this.price = price
}

function Food(name, price) {
  Product.call(this, name, price)
  this.category = 'food'
}

const food = new Food('cheese', 5)
console.log(food.name) // 'cheese'
```

## <a  id="chapter-2">apply</a>

> [返回目录](#catalog)

详情请参考：[Function.prototype.apply() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

&emsp;apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

#### 语法：

`function.apply(thisArg, [argsArray])`

#### 参数：

- `thisArg`：必选的。在 function 函数运行时使用的 this 值，和 call 基本一致。
- `[argsArray]`：可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。

#### 返回值:

&emsp;调用有指定 this 值和参数的函数的结果。

#### 使用：

```js
const numbers = [5, 6, 2, 3, 7]

const max = Math.max.apply(null, numbers)
console.log(max) // 7

const min = Math.min.apply(null, numbers)
console.log(min) // 2

Math.min.apply(null, 1)
```

## <a  id="chapter-3">bind</a>

> [返回目录](#catalog)

详情请参考：[Function.prototype.bind() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

&emsp;bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

#### 语法：

`function.bind(thisArg, arg1, arg2, ...)`

#### 参数：

- `thisArg`：调用绑定函数时作为 this 参数传递给目标函数的值。 如果使用 new 运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，或者 thisArg 是 null 或 undefined，执行作用域的 this 将被视为新函数的 thisArg。

- `arg1, arg2, ...`：当目标函数被调用时，被预置入绑定函数的参数列表中的参数。

#### 返回值:

一个原函数的拷贝，并拥有指定的 this 值和初始参数。我们如果需要使用的话，需要去主动调用这个函数。

#### 使用：

```js
const module = {
  x: 42,
  getX: function () {
    return this.x
  },
}

const unboundGetX = module.getX
console.log(unboundGetX()) // undefined
// 谁调用指向谁，这里 unboundGetX = module.getX
// 让 getX 里面的 this 指向了 window
// 而 window 里面并没有 x 方法
// 当然，在前面加上 window.x = 43 就有了

const boundGetX = unboundGetX.bind(module)
console.log(boundGetX()) // 42
// 通过 bind，将 this 指向 module
```

## <a  id="chapter-4">实现 myCall</a>

> [返回目录](#catalog)

考虑两点:

- 第一个参数为 undefined 或 null 的时候，那么会转变为 window
- 改变了 this 执行，让新的对象可以执行该函数。

代码实现：

```js
Function.prototype.myCall = function (context, ...args) {
  // 首先context为可选参数，如果不传的话默认上下文是window
  context = context || window
  // 接下来给content创建一个_fn属性，并将值设置为需要调用的函数
  context._fn = this
  // 调用函数，将这个执行结果传给 result
  let result = context._fn(...args)
  // 将对象上的函数删除
  delete context._fn
  // 返回 result 结果
  return result
}
```

## <a  id="chapter-5">实现 myApply</a>

> [返回目录](#catalog)

apply 和 call 实现类似，不同的就是对参数的判断及处理

代码实现：

```js
Function.prototype.myApply = function (context, args) {
  // 首先context为可选参数，如果不传的话默认上下文是window
  context = context || window
  // 接下来给content创建一个_fn属性，并将值设置为需要调用的函数
  context._fn = this
  // 判断参数数组是否存在，不存在
  if (!args) {
    return context._fn()
  }
  // 如果参数不是数组，则跑出错位
  if (!(args instanceof Array)) {
    throw new Error('params must be array')
  }
  // 调用函数，将这个执行结果传给 result
  let result = context._fn(...args)
  // 将对象上的函数删除
  delete context._fn
  // 返回 result 结果
  return result
}
```

## <a  id="chapter-6">实现 myBind</a>

> [返回目录](#catalog)

因为 bind 转换后的函数可以作为构造函数使用，此时 this 应该指向构造出的实例，而不是 bind 绑定的第一个参数

代码实现：

```js
Function.prototype.myBind = function (context, ...args1) {
  // 首先context为可选参数，如果不传的话默认上下文是window
  context = context || window
  ///返回一个绑定this的函数，这里我们需要保存this指向
  let that = this
  // 返回的一个新函数
  return function (...args2) {
    // 接下来给content创建一个_fn属性，并将值设置为需要调用的函数
    context._fn = that
    // 调用函数，将这个执行结果传给 result
    let result = context._fn(...[...args1, ...args2])
    // 将对象上的函数删除
    delete context._fn
    // 返回 result 结果
    return result
  }
}
```

### <a  id="chapter-7">验证我们的实现</a>

我们可以验证一下自己实现的 myCall、myApply 、myBind 函数：

```js
function add(c, d) {
  return this.a + this.b + c + d
}
const obj = {
  a: 1,
  b: 2,
}
console.log('===============myCall================')
console.log(add.myCall(obj, 3, 4)) // 10
console.log(add.myCall({ a: 3, b: 9 }, 3, 4)) // 19
console.log(add.myCall({ a: 3, b: 9 }, { xx: 1 }, 4)) // 12[object Object]4

console.log('==============myApply=================')
console.log(add.myApply(obj)) // NaN
console.log(add.myApply(obj, [3, 4])) // 10
console.log(add.myApply(obj, [1, 'abc', '2'])) // 4abc

console.log('===============myBind================')
console.log(add.myBind(obj, 3, 4)()) // 10
console.log(add.myBind({ a: 3, b: 9 }, 3, 4)()) // 19
console.log(add.myBind({ a: 3, b: 9 }, { xx: 1 }, 4)()) // 12[object Object]4
```

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;我们对比一下`call` / `apply` / `bind`

## 区别

- call 跟 apply 的用法几乎一样，唯一的不同就是传递的参数不同
  - call **只能一个参数一个参数的传入**。
  - apply 则**只支持传入一个数组**，哪怕是一个参数也要是数组形式。最终调用函数时候这个数组会拆成一个个参数分别传入。
- bind 参数方式跟 call 方法一致。不过 bind 是直接改变这个函数的 this 指向并且**返回一个新的函数**，之后再次调用这个函数的时候 this 都是指向 bind 绑定的第一个参数

## 使用场景

- 当我们使用一个函数需要改变 this 指向的时候才会用到 `call` / `apply` / `bind`
- 如果你要**传递的参数不多**，则可以使用 `fn.call(thisObj, arg1, arg2 ...)`
- 如果你要**传递的参数很多**，则可以用数组将参数整理好调用 `fn.apply(thisObj, [arg1, arg2 ...])`
- 如果你想**生成一个新的函数长期绑定某个函数给某个对象使用**，则可以使用 `const newFn = fn.bind(thisObj); newFn(arg1, arg2...)`

### <a  id="reference-documents">参考文献</a>

- [jsliang 求职系列 - 10 - 手写 call/apply/bind | 掘金-jsliang](https://juejin.cn/post/6893642486556655630#heading-6)

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
