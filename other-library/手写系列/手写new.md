# [手写 new](https://github.com/danygitgit/document-library)

> create by **db** on **2021-4-8 15:30:26**  
> Recently revised in **2021-4-8 16:30:29**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [new](#chapter-1)
  - [实现 new](#chapter-2)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;如题。

# <a  id="main-body">正文</a>

## <a  id="chapter-1">new</a>

> [返回目录](#catalog)

详情请参考：[new 运算符 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

&emsp;`new` 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

### 语法：

`new constructor[([arguments])]`

### 参数：

- `constructor` 一个指定对象实例的类型的类或函数。
- `arguments` 一个用于被 constructor 调用的参数列表。

### 返回值:

&emsp;一个包含构造函数（父对象）属性和方法的新对象。

### 使用：

```js
function Car(make, model, year) {
  this.make = make
  this.model = model
  this.year = year
}

const car1 = new Car('Eagle', 'Talon TSi', 1993)

console.log(car1.make)
// Eagle
```

### 实现过程

&emsp;new 关键字会进行如下的操作：

1. 创建一个空的简单 JavaScript 对象（即{}）；
2. 链接该对象（设置该对象的 constructor）到另一个对象 ；
3. 将步骤上 1 新创建的对象作为 this 的下文 ；
4. 如果该函数没有返回对象，则返回 this。

## <a  id="chapter-2">实现 new</a>

> [返回目录](#catalog)

### 代码实现：

```js
function myNew(fn, ...args) {
  // 1.创建一个空对象obj
  const obj = {}
  // 2.配置原型链：使用setPrototypeOf更改新建对象obj的原型对象，将其指向fn的原型对象
  // 这样obj就能访问构造函数原型所在原型链上的属性了
  Object.setPrototypeOf(obj, fn.prototype)
  // 3.通过apply使this指向obj，执行函数fn并且获取执行后的结果
  let result = fn.apply(obj, args)
  // 4.判断result是否为对象，是则返回result，否则返回新创建obj
  return result instanceof Object ? result : obj
}
```

### 测试：

```js
const car1 = new Car('Eagle', 'Talon TSi', 1993)
const car2 = myNew(Car, '五菱', '五菱宏光', 2020)

console.log('car1', car1)
console.log('car2', car2)
```

### `__proto__`

详情请参考：[Object.prototype.**proto**(已废弃) | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

&emsp;`__proto__` 属性（前后各两个下划线），用来读取或设置当前对象的 prototype 对象。

&emsp;该属性没有写入 ES6 的正文，而是写入了附录，原因是 `__proto__` 前后的双下划线，说明它本质是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而是从兼容性的角度，都**不要使用这个属性**，而是使用 Object.setPrototypeOf() （写操作）、Object.getPrototypeOf()（读操作）、Object.create（生成操作）代替。

```js
// es6 的写法
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// es5 的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
```

### setPrototypeOf

详情请参考：[Object.setPrototypeOf() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

&emsp;`Object.setPrototypeOf()` 方法的作用与 `__proto__` 相同，用来设置一个对象的 prototype 对象，返回参数对象本身，它是 ES6 **正式推荐**的设置原型对象的方法。

```js
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null)
```

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;路漫漫其修远兮，与诸君共勉。

### <a  id="reference-documents">参考文档</a>、

- [jsliang 求职系列 - 11 - 手写 new | 掘金 | jsliang ](https://juejin.cn/post/6894142886456229902)

- [ES6-对象的扩展-_proto_ 属性，Object.setPrototypeOf()，Object.getPrototypeOf()| CSDN - 宋极北](https://juejin.im/user/5b1a3eb7f265da6e572b3ada)

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
