# [手写new](https://github.com/danygitgit/document-library)

> create by **db** on **2020-9-2 13:30:46**  
> Recently revised in **2021-3-30 18:00:04**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [flat](#chapter-1)
  - [实现 myFlat](#chapter-2)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;如题。

# <a  id="main-body">正文</a>

## <a  id="chapter-1">flat</a>

> [返回目录](#catalog)

详情请参考：[new 运算符 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

&emsp;`new` 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。


#### 语法：

`new constructor[([arguments])]`

#### 参数：

- `constructor` 一个指定对象实例的类型的类或函数。
  
- `arguments` 一个用于被 constructor 调用的参数列表。

#### 返回值:

&emsp;一个包含构造函数（父对象）属性和方法的新对象。

#### 使用：

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);
// Eagle
```
#### 实现过程
&emsp;new 关键字会进行如下的操作：

1. 创建一个空的简单JavaScript对象（即{}）；
2. 链接该对象（设置该对象的constructor）到另一个对象 ；
3. 将步骤1新创建的对象作为this的上下文 ；
4. 如果该函数没有返回对象，则返回this。

## <a  id="chapter-2">实现 myFlat</a>

> [返回目录](#catalog)

代码实现：

```js
function myNew (fn,...args) {
  // 判断第一个参数是一个函数
  if(typeof fn !== 'function'){
    throw '参数异常'
  }
  // 创建对象
  const obj = {}
  // 使用setPrototypeOf更改新建对象obj的原型对象，将其指向fn的原型对象
  // 这样obj就能访问构造函数原型所在原型链上的属性了
  Object.setPrototypeOf(obj,fn.prototype)
  // 通过apply绑定this执行并且获取执行后的结果
  let result = fn.apply(obj,...args)
  // 判断result是否为对象，是则返回，否则返回新创建obj
  return result instanceof Object?result:obj
}


// 测试
function Person(name) {
  this.name = name;
  return function() { // 用来测试第 5 点
    console.log('返回引用数据类型');
  };
}
// 用来测试第 2 点和第 3 点
Person.prototype.sayName = function() {
  console.log(`My name is ${this.name}`);
}
const me = myNew(Person, 'jsliang'); // 用来测试第 4 点
me.sayName(); // My name is jsliang
console.log(me); // Person {name: 'jsliang'}

// 作者：jsliang
// 链接：https://juejin.cn/post/6894142886456229902
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

[Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

简洁版：

```js
// 重写数组flat方法
// 1.会去掉数组的空项
// 2.返回新数组

Array.prototype.myFlat = function (dep = 1) {
  return this.reduce((acc, val) => {
    return acc.concat(
      Array.isArray(val) && dep > 0
        ? // 这里的三目就是防止这个现象：[3].concat([4]) // 结果为[3, 4]
          val.myFlat(--dep)
        : Array.isArray(val)
        ? [val]
        : val
    )
  }, [])
}
```

### 循环实现

```js
Array.prototype.myFlat = function (dep = 1) {
  // 声明一个新数组
  let result = this
  // // 当原数组内存在数组并且层级dep大于时循环
  while (result.some(Array.isArray) && dep > 0) {
    // 连接数组，并去除空值
    result = [].concat(...result.filter((item) => item))
    dep--
  }
  return result
}
```

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;路漫漫其修远兮，与诸君共勉。 

### <a  id="reference-documents">参考文献</a>、

- [JS 数组扁平化(flat)方法总结详解 ](http://www.45fan.com/article.php?aid=19062442766002048192992081)

- [带你手动实现 JS 数组扁平化 flat()方法| CSDN - 选择远方](https://juejin.im/user/5b1a3eb7f265da6e572b3ada)

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
