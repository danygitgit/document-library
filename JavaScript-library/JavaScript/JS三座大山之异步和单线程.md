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

## 什么是原型？

&emsp;要想知道这个问题的答案，为我们需要从 javaScript 第一课——`数据类型`开始里聊起。

### javaScript 数据类型

&emsp;众所周知，javaScript 是一门弱类型语言，具有如下的数据类型

- **值类型(基本类型)：** 字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol。

- **引用数据类型：**对象(Object)、函数(Function)。

&emsp;而**原型**需要研究的就是引用数据类型——`object`和`function`，他们可以统称为**对象**

### 对象

&emsp;接口传参要对象，数据处理要对象，编程过程中，我们总是随手就 new 一对象，那到底什么是对象呢？

&emsp;那你就有可能说：**万物皆对象**

&emsp;——这话没毛病！

&emsp;在 JavaScript 的世界里，我们只有两个东西：`变量`和`函数`，变量拥有数据，而函数是会被执行的一些特殊的行为。我们将变量和函数保存到一个单元中，并将封装为完整实体，这就是`对象`。
&emsp;一言以蔽之，对象就是一些变量和函数的集合,举个栗子 🌰

```js
let laoWang = {
  name: '老王',
  feature: '热心肠',
  skill: function () {
    alert('特长是修水管')
  },
}
```

### 构造函数

&emsp;说完了对象，我们来看看构造函数。什么是构造函数？

&emsp;当任意一个普通函数用于创建一个类对象时，它就被称作构造函数，或构造器。

它有几点特性：

- 默认函数首字母大写
- 通过 `new` 调用一个函数
- 构造函数返回的是一个对象

举个栗子 🌰

```js
function Person(name, feature, skill) {
  this.name = name,
  this.feature = feature,
  this.skill: function () {
    alert(skill)
  }
}
let laoWang = new Person('老王','热心肠','特长是修水管')
console.log(laoWang)
```

复制代码
这里的 Person 就是构造函数，而 person 则是构造函数 Person 的 实例对象（后面简称实例）。
要清楚构造函数具体内容，我们应该看一下 new 的实现机制，但是现在知识点前置不足，我们后面章节再进行讲解。

作者：jsliang
链接：https://juejin.cn/post/6890716797436166152
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

上面的例子很好理解，但是数组和函数好像不能这样去定义属性，但他们也是对象啊，不要迷惑，他们有自己定义属性的方法。以函数为例：

var laoWang=function( ){
alert('修水管');
}
laoWang.skill='热心肠';
laoWang.skill2='爱串门';
laoWang.skill3={
'a':'亲切问候邻居家孩子'
}
这不，function 就被赋予了 skill、skill2、skill3 这三个属性。

上面说到 function 和 objec 这两个返回值是对象，既然都是对象，为什么返回的不是一个值。由于 function 和 object 的关系比较特殊所以返回的值不同，我在下文会详细讲到 function 和 object 的'特殊关系'。

function 和 object 的关系

上文说道 function 和 object 都是对象，但是 function 的返回值是 function 而不是 object，那么他俩之间肯定有某种'神秘的关系'。

function 和 object 的关系其实就像'先有蛋还是先有鸡'这种让你抓狂的问题。function 是 object 的一种，但是 object 又是由 function 创建的，什么，你要打我脸？

var arr=['a','b','c'];
var obj={
'name':'老王',
'age':'99'
}
以上两个都是对象，但是都不是由 function 创建的，不要忘记了这种写法只是用字面量的方式来创建对象的。这种写法只是为了让代码更简单明了更容易理解。归根到底以上两种对象是由 function 创建的，请看以下代码：

var arr=new Arry('a','b','c');
var obj=new Object();
obj.name='老王';
obj.age='99';
在以上代码中 Arry( )和 Object( )都是函数，通常我们把他们当做构造函数，由构造函数我们可以 new 出很多实例对象，构造函数和我们平常自定义的函数没有语法上的区别，区分就是构造函数一般首字母是大写的。

是不是感觉很乱？为什么 function 和 object 的关系是这样的，不要慌张，耐心看完本文你就会豁然开朗。

原型(prototype)

上面扯了半天对象，到这里终于讲到本文的主要内容了--原型(prototype)。

那么 prototype 到底是什么呢？不要着急，让我们一步步来。

上面我们说到 function 也是一种对象，现在对这个应该没有任何疑问了，如果有疑问请滑动你的鼠标从头开始看！！

function 作为对象，那么他肯定是若干属性的集合，在 JavaScript 中，function 默认有一个属性，这个属性就是 prototype，既然是属性那么肯定有相对应的属性值，prototype 的属性值是一个对象，既然是对象，那么肯定是若干属性的集合，这个对象里有一个默认的属性：constructor，这个属性相当于一个'指针'，指向这个函数本身。
以下图为例：

prototype 既然作为对象，属性的集合，不可能就只有 constructor 这一个属性，肯定可以自定义的增加许多属性，如上图所示。
上图还出现了 person1 这个实例函数，他是由构造函数 Person 实例化出来的，上文说到每个 function 都有 prototype 这个属性，person1 也不例外，他的 prototype 大家会发现和 Person 这个构造函数的是一样的，实例对象的原型指向的是其构造函数的原型对象。我们再看一段代码：

var Person=function(){};
Person.prototype.name='Nicholas';
Person.prototype.age='29';
Person.prototype.job='Software Engineer';
var person1=new Person();
console.log(person1.name); // 'Nicholas'
console.log(person1.age); // '29'
在上面代码中 person1 是由构造函数 Person 实例化出来的，而且我们也没有给 person1 定义任何属性，但是 person1.name=='Nicholas';这是为什么？那我们就不得不说起-proto-这个属性了，每个对象都有这个属性，这个属性一般是隐藏的我们看不到，但是并不妨碍我们去了解他。

这个属性指向了创建这个对象的构造函数的 prototype。即：person1._ proto_ ===Person.prototype，下面我们来看看这个'_ proto_'是什么鬼。

_ proto_,隐式原型

上文我们提到* proto*，那到底这个* proto*是什么呢？我看下面的代码：

var Person=function(){};
Person.prototype.name='Nicholas';
Person.prototype.age='29';
Person.prototype.job='Software Engineer';
var person1=new Person();
console.log(person1._proto_===Person.prototype);//true
通过看上面的代码会发现结果为 true，你没有看错，这也不是巧合，这是必然的结果。

实质上 person1 是被 Person 实例化出来的，那么 person1._ proto_===Person.prototype，下面用图给你展示一下：

上图的 o1 和 o2 是由 Object 实例化出来的，他们的* proto*指向的是 Object.prototype，这就说明:每个对象都有一个* proto*属性，指向创建该对象的构造函数的 prototype。
那么你肯定会问'每个对象都有一个* proto*属性，指向创建该对象的构造函数的 prototype'，那 Object 也是一个对象，肯定也有* proto*属性，那他指向谁？

关于 Object.* proto*的指向问题很特殊，在这个 Object.* proto*是个特例，它指向 null，这个地方大家一定要牢记。

也许你还会有另一个疑问，函数也是对象，实例化出来的函数的* proto*属性指向其构造函数，那么其构造函数的* proto*指向谁？

Function 这个前面没有提到，现在拿出来晒晒，构造函数是由谁创建的，就是由 Function 这个函数创建的，所以你上面的疑问就很好解答了。再用一张图让你更清晰的看清他们的关系：

这张图清晰的表明了自定义构造函数、Object、Function 之间的关系！

眼神好的人会在上图发现一个问题：自定义函数 Foo.* proto*指向 Function.prototype，Object.* proto*指向 Function.prototype，怎么 Function.* proto*也指向 Function.prototype，这不就是形成了一个'死循环'么，来，让我们仔细捋一捋，Function 也是一个函数，既然是函数那么他肯定是由 Function 创建的，那么上面的'死循环'就解释通了。

在这里我还要解释一个地方，Function.prototype 也是一个对象，那其肯定有* proto*属性，那么指向谁呢？其指向 Object.prototype,为什么呢？Function.prototype 是一个普通的对象，就可以看成这个对象是由 Object 实例化出来的，那么 Function.prototype.* proto*指向就是 Object.prototype 了。

下面上一张完整的图片，大家可以按照下面这种图片捋一下自己的思路，因为上面讲了那么多肯定会有些乱。

这张图完整的呈现出了实例对象、自定义函数、Object、Function 之间种种错综复杂的关系，不要怕麻烦，一条一条的去找对应的关系。

继承

为什么会说到继承呢，因为继承是通过原型链来体现的，所以一并放在这里讲了。我们先看一段代码：

function Person（）{ }
var p1=new Person();
Person.prototype.name='老王';
Person.prototype.age='99';
console.log(p1.name);//'老王'
以上代码中，p1 是 Person 实例化出来的函数，我并没有给 p1 定义 name 这个属性，那 p1.name 是怎么来的--是从 Person.prototype 来的，因为 p1.* proto*指向 Person.prototype，当访问对象的某个属性时，现在这个对象本身去找，如果找不到那就顺着* proto*往上找，直到找到或者 Object.prototype 为止。

由于所有的对象的原型链都会找到 Object.prototype，因此所有的对象都会有 Object.prototype 的方法。这就是所谓的“继承”。

讲到这里，关于原型和原型链就结束了，希望各位能深刻的理解。

作者：我住隔壁我姓吴
链接：https://www.jianshu.com/p/700a2a579351
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 为什么是原型

## 什么是原型链

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;路漫漫其修远兮，与诸君共勉。

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2c2a873bdad472f88ee6143620245de~tplv-k3u1fbpfcp-zoom-1.image" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
