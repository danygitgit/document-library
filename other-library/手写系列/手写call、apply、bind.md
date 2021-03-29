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
  - [关于 this](#chapter-4)
  - [五、第五章](#chapter-5)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;这里是前言内容！

# <a  id="main-body">正文</a>

&emsp;这里是正文内容！

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

## <a  id="chapter-4">关于 this</a>

> [返回目录](#catalog)

&emsp;第四章内容！

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
