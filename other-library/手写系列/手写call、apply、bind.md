# [手写 call、apply、bind](https://github.com/danygitgit/document-library)

> create by **db** on **2021-3-29 18:47:18**  
> Recently revised in **2021-3-29 18:47:22**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [call](#chapter-1)
  - [apply](#chapter-2)
  - [bind](#chapter-3)
  - [关于 this的指向](#chapter-4)
  - [五、第五章](#chapter-5)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;这里是前言内容！

# <a  id="main-body">正文</a>

## <a  id="chapter-4">关于 this的指向</a>

> [返回目录](#catalog)

&emsp;如果要判断一个运行中函数的`this`绑定，就需要找到这个函数的直接调用位置。找到之后可以应用四条规则来判断`this`的绑定对象。

### 1. new 绑定

&emsp;使用new来调用foo(..)时，我们会构造一个新对象并且把它绑定到foo(..)调用中的this上，即此时的this指向新创建的对象。此时的绑定行为我们称之为**new绑定**。
示例如下：
```js
var a = 2
function foo(a) {
  this.a = a
}
var obj = new foo(3)
console.log('a的值是', obj.a)
// a的值是 3
```

### 2. 显示绑定
&emsp;即使用函数的`call`、`apply`或者`bind`方法绑定，此时`this`指向被绑定的对象，即函数的第一个参数。
示例如下：
```js
var a = 2
var obj = {
  a: 3
}
function foo() {
  console.log('当前this指向', this)
  console.log('a的值是', this.a)
}
foo.call(obj) 
// 当前this指向 {a: 2, foo: ƒ}   --> 直接调用形成隐式绑定，指向obj
// a的值是 3
```
&emsp;因为你可以最直接指定this的绑定对象，因此我们称之为**显式绑定**。

### 3. 隐式绑定
&emsp;即被对象直接调用，此时`this`指向当前上下文对象。
示例如下：
```js
var a = 2
var obj = {
  a: 3,
  foo: foo
}
function foo() {
  console.log('当前this指向', this)
  console.log('a的值是', this.a)
}
obj.foo()
// 当前this指向 {a: 2, foo: ƒ}   --> 直接调用形成隐式绑定，指向obj
// a的值是 3
```

### 4. 默认绑定
&emsp;如果以上绑定都不存在，或者说函数不带任何修饰被直接调用，那就属于**默认绑定**，此时氛围两种情况：
1. 非严格模式
   - 函数指向全局对象，及`window`
示例如下：
```js
var a = 2
let b = 3
function foo() {
  console.log('当前this指向', this)
  console.log('a的值', this.a) 
  console.log('b的值', this.b)
}
foo()
// 当前this指向 Window {window: Window, self: Window, document: document…}               --> this指向window
// a的值是 2              
// b的值是 undefined      --> 因为let在全局作用域中声明的变量不会成为window对象的属性
```
2. 严格模式
   - 函数指向`undefind`

示例如下：
```js
'use strict'
var a = 2
function foo() {
  console.log('当前this指向', this)
  console.log('a的值是', this.a)
}
foo()

// 当前this指向 undefined
//  TypeError: Cannot read property 'a' of undefined  
```

### 优先级

先说结论：

new绑定 > 显示绑定 > 隐式绑定 > 默认绑定

也就是说，我们可以根据以下顺序进行判断

## <a  id="chapter-1">call</a>

> [返回目录](#catalog)

&emsp;`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。
x
&emsp;注意：该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。

#### 语法：

`function.call(thisArg, arg1, arg2, ...)`

#### 参数：

- `thisArg`：可选的。在 function 函数运行时使用的 this 值。
- `arg1, arg2, ...`：指定的参数列表

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

### 手写 call

## <a  id="chapter-2">apply</a>

> [返回目录](#catalog)

&emsp;第二章内容！

## <a  id="chapter-3">bind</a>

> [返回目录](#catalog)

&emsp;第三章内容！



## <a  id="chapter-5">五、第五章</a>

> [返回目录](#catalog)

&emsp;第五章内容！

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;这里是总结内容！

### <a  id="reference-documents">参考文献</a>

- [jsliang 求职系列 - 10 - 手写 call/apply/bind | 掘金-jsliang](https://juejin.cn/post/6893642486556655630#heading-6)

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
