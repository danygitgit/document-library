@[JS 三座大山之作用域和闭包](https://github.com/danygitgit/document-library)

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

下面我们就来爬上第二座大山——作用域和闭包，去领略一下吧。

# <a  id="main-body">正文</a>

> [返回目录](#catalog) >

## 作用域

&emsp;作用域是根据名称找变量的一套规则。

&emsp;变量的赋值操作会执行两个动作，首先编译器会在当前作用域中声明一个变量(如果之前没有声明过)，然后在运行时引擎会在作用域中查找该变量，如果能够找到就会对它赋值。

&emsp;引擎在查找变量时执行怎样的查找，会影响最终的查找结果。

&emsp;当变量出现在赋值操作的左侧时进行LHS查询，出现在右侧时进行RHS查询：

console.log(a)对a的引用是一个RHS引用，这里a并没有赋予任何值。相应地，需要查找并取得a的值，这样才能将值传递给console.log(..)。

a = 2对a的引用是LHS引用，因为实际上我们并不关心当前的值是什么，只是 为=2这个赋值操作找到一个目标。

当一个块或函数嵌套在另一块或函数中时，就发生了作用域的嵌套。在当前作用域中无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查找，直到找到该变量，或抵达最外层的作用域为止。
&emsp;ES5 中只有全局作用域和函数作用域，我们都知道他没有块级作用域。

&emsp;ES6 中多了一个 let，他可以保证外层块不受内层块的影响。即内层块形成了一个块级作用域，这是 let 的一个特点。

```js
var a = 1
function f1() {
  var b = 2
  function f2() {
    var c = b
    b = a
    a = c
    console.log(a, b, c)
  }
  f2()
}
f1() //2,1,2
```

上面的代码，有三个执行上下文环境(EC)，全局 EC，f1EC，f2EC。全局环境下有一个变量 a 和一个函数 f1()，在 f1 环境中，有一个变量 b 和一个函数 f2()，在 f2 环境中有一个变量 c。但在 f2 中，可以访问到 f1 环境中的 b，也可以访问到全局环境中的 a，在 f1 中，可以访问到全局环境下的 a，但不可以访问 f2 中的 c，在全局中，不可以访问 f1 中的 b 也不可以访问 f2 中的 c。这就是一个作用域链。

函数的内部环境可以通过作用域链访问到所有的外部环境，但是外部环境却不可以访问外部环境，这就是作用域的关键。但是我们要知道，作用域是在一个函数创建时就已经形成的，而不是调用时。

复制代码
var a=10;
function fn(){
var a=20;
return function b(){
console.log(a);
};
}
var g=fn();
g();//20
复制代码
此图说明了作用域链向上查找是寻找创建它的那个作用域。

2. 闭包

“闭包，允许使用内部函数(即函数定义和函数表达式位于另一个函数的函数体内)，而且，这些内部函数可以访问他们所在的外部函数中的声明的所有局部变量丶参数和声明的其他内部函数，当其中一个这样的内部函数在包含他们的外部函数之外被调用时，就会形成闭包。即内部函数会在外部函数返回后被执行。而当这个内部函数执行时，它仍然必须访问其外部函数的局部变量丶参数以及其他内部函数。这些局部变量丶参数和函数声明(最初时)的值是外部函数返回时的值，但也会受到内部函数的影响。”

简单来说，就是在一个函数 a 内部定义的另一个函数 b，当 b 在 a 之外被执行时，就会形成闭包。同时 b 函数仍然可以访问到 a 函数中的局部变量与函数。

复制代码
function fn(){
var array=[];
for(var i=0;i<10;i++){
array[i]=function(){
return i;
}
}
return array;
}
fn();//[ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ, ƒ]
复制代码
闭包保存的是定义它的那个函数内部的局部变量丶参数和其他内部函数，也就是说保存的是这个函数执行上下文中的整个 VO，而不是一个变量。上面代码中的函数作用域链中都保存着 fn 的活动对象，他们引用的都是一个 i，当 fn 返回时，i 的值是 10，所以每个函数都引用保存 i 那个变量的同一个变量。我们如果想得到原先想得到的那个结果，可以加上另一个匿名函数改变他的父作用域(其实应该是创建它的作用域)，将它包裹起来。

复制代码
function fn(){
var array=[];
for(var i=0;i<10;i++){
array[i]=function(num){
return function(){
return num;
};
}(i);
}
return array;
}
复制代码
这个匿名函数有一个参数 num，同时是返回值。在调用每个匿名函数时，传入了变量 i。由于参数是按值传递的，所以 i 就会复制给 num，而这个匿名函数的内部又创建了一个访问 num 的闭包，返回后能够访问到该匿名函数中的 VO 变量对象（Variable Object）(包括参数)，于是每个函数返回的都是 num 的一个副本，所以可以得到不同的值。

闭包的两个场景;

1. 函数作为函数的返回值

复制代码
function f(){
var a=1;
return function(){
console.log(a);
}  
}

var g=f();
g();//1;
复制代码 2. 函数作为参数传递

复制代码
function f(){
var a=1;
return function(){
console.log(a);
}  
}
var g=f();
g();//1;

function F(fn){
var a=2;
fn();
}
F(g);//1
复制代码
上面两个小例子也正好说明了闭包可以访问定义它的那个函数作用域下的内部变量和内部函数。其实是整个 VO 变量对象（Variable Object），所以还包含参数。

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;

http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html

https://www.cnblogs.com/fuGuy/p/9206350.html

https://www.cnblogs.com/gzhjj/p/9014556.html

http://blog.sina.com.cn/s/blog_173fe976d0102wxcu.html

https://www.jianshu.com/p/a57a7cfc9755

https://www.cnblogs.com/sarah-wen/p/10809542.html

https://juejin.cn/post/6891097178064814088#heading-1

https://segmentfault.com/a/1190000017136436

https://juejin.cn/book/6844733713780047886/section/6844733713830379533

&emsp;路漫漫其修远兮，与诸君共勉。

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2c2a873bdad472f88ee6143620245de~tplv-k3u1fbpfcp-zoom-1.image" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
