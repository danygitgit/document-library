@[探秘Promise](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/ES6/%E6%8E%A2%E7%A7%98Promise.md)  

> create by **db** on **2019-8-18 18:54:39**   
> Recently revised in **2019-9-2 21:53:12**  

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/ES6/%E6%8E%A2%E7%A7%98Promise.md)**  

&emsp;查阅网上诸多资料，并结合自己的学习经验，写下这篇学习笔记，以记录自己的学习心得。现分享给大家，以供参考。  

# 前言  

> I hear and I fogorget.  

> I see and I remember.  

> I do and I understand.  

&emsp;我们都知道，js的世界是单线程执行的，也就是说一个任务完成之后才能进行另一个任务，这是因为js是运行在宿主进程多脚本语言，比如浏览器，比如node，宿主进程只会为其分配一个js引擎线程。

&emsp;那么对于耗时比较长的操作，例如一些ajax异步请求，这些请求之间有一种关系，就是下一次请求的参数是上一次请求的结果——回调地狱。所幸ES6给我们提供了异步编程的一种解决方案——Promise。

  
&emsp;参考文档

- [廖雪峰的官方网站 | 廖雪峰 ](https://www.liaoxuefeng.com/wiki/1022910821149312/1023023924160384) 
- [关于ES6的Promise的使用 |简书-紫陌兰溪 ](https://www.jianshu.com/p/1ec8d1c4e287)  
 
# 正文

## 什么是Promise

### Promise的含义
 
&emsp;Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

&emsp;所谓promise，简单说是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果，从语法上说，promise是一个对象，从它可以获取异步操作的消息，promise提供了统一的API，各种异步操作都可以用同样的方法进行处理。

### Promise对象的特点

**Promise的优点**

1. 对象的状态不受外界影响。promise对象代表一个异步操作，有三种状态，`pending`（进行中）、`fulfilled`（已成功）、`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态，这也是promise这个名字的由来——“**承诺**”；

2. 一旦状态改变就不会再变，任何时候都可以得到这个结果。promise对象的状态改变，只有两种可能：从`pending`变为`fulfilled`，从`pending`变为`rejected`。这时就称为`resolved`（已定型）。如果改变已经发生了，你再对promise对象添加回调函数，也会立即得到这个结果。这与事件（event）完全不同，事件的特点是：如果你错过了它，再去监听是得不到结果的。

&emsp;有了Promise对象，就可以将异步操作以同步操作的流程表达出来，可以使用一种链式调用的方式来组织代码，避免了层层嵌套的回调函数。让代码更加的直观。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

**Promise的缺点**

1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
3. 当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 那我们为什么要使用promise？

比如我们在工作中经常会碰到这么一个需求，比如我使用ajax发一个A请求后，成功后拿到数据，我们需要把数据传给B请求；那么我们需要如下编写代码：
```javaScript
$.ajax({
    url: '',
    dataType:'json',
    success: function(data) { // 获取data数据 传给下一个请求
      var id = data.id;
      $.ajax({
        url:'',
        data:{"id":id},
        success:function(){ // .....
 }
      });
    }
});
```
&emsp;如上代码；上面的代码有如下几点缺点：

1. 后一个请求需要依赖于前一个请求成功后，将数据往下传递，会导致多个ajax请求嵌套的情况，代码不够直观。
2. 如果前后两个请求不需要传递参数的情况下，那么后一个请求也需要前一个请求成功后再执行下一步操作，这种情况下，那么也需要如上编写代码，导致代码不够直观。 
## 如何创建promise对象?

&emsp;要想创建promise对象，可以使用`new`来调用promise的构造器来进行实例化。

如下代码：
```javaScript

var promise = new Promise(function(resolve,reject){
  // ... some code
  if(/*异步操作成功*/) {
  resolve(value) // 成功调用resolve 往下传递参数 且只接受一个参数
  }else {
  reject(error)  // 失败调用reject  往下传递参数 且只接受一个参数
  }   
});
```
&emsp;对通过`new` 生成的`promise`对象为了设置其值在`resolve`(成功) / `reject`(失败) 时调用的回调函数，可以使用`promise.then()`实例方法。

如下代码：
```javaScript
promise.then(onFulfilled, onRejected);
```
&emsp;`resolve`(成功) 时 调用`onFulfilled` 方法，`reject`(失败) 时 调用`onRejected`方法;

&emsp;`Promise.then` 成功和失败时都可以使用，如果出现异常的情况下可以采用`promise.then(undefined,onRejected)` 这种方式，只指定onRejected回调函数即可，不过针对这种情况下我们有更好的选择是使用catch这个方法；代码如下：
```javaScript
promise.catch(onRejected);
```
&emsp;上面啰嗦了这么多，我们来分别来学习相关的promise对象中的方法知识点吧！

## Promise.resolve

&emsp;一般情况下我们都会使用`new Promise()`来创建promise对象，但是我们也可以使用`promise.resolve `和 `promise.reject`这两个方法；

&emsp;`Promise.resolve(value)`的返回值也是一个promise对象，我们可以对返回值进行.then调用；

如下代码：
```javaScript
Promise.resolve(11).then(function(value){
  console.log(value); // 打印出11
});
```
`resolve(11)`代码中，会让promise对象进入确定(`resolve`状态)，并将参数`11`传递给后面的`then`所指定的`onFulfilled` 函数；

&emsp;我们上面说过创建promise对象，可以使用`new Promise`的形式创建对象，但是我们这边也可以使用`Promise.resolve(value)`的形式创建promise对象；

## Promise.reject

&emsp;`Promise.reject` 也是`new Promise`的快捷形式，也创建一个promise对象。

比如如下代码：
```javaScript
Promise.reject(new Error(“我错了，请原谅俺！！”));
```
就是下面的代码new Promise的简单形式：
```javaScript
new Promise(function(resolve,reject){
   reject(new Error("我错了，请原谅俺！！"));
});
```
&emsp;下面我们来综合看看使用resolve方法和reject方法。

demo如下：
```javaScript
function testPromise(ready) {
  return new Promise(function(resolve,reject){
    if(ready) {
      resolve("hello world");
    }else {
      reject("No thanks");
    }
  });
};
// 方法调用
testPromise(true).then(function(msg){
  console.log(msg);
},function(error){
  console.log(error);
});
```
&emsp;上面的代码的含义是给`testPromise`方法传递一个参数，返回一个promise对象，如果为`true`的话，那么调用promise对象中的`resolve()`方法，并且把其中的参数传递给后面的`then`第一个函数内，因此打印出 “`hello world`”, 如果为`false`的话，会调用promise对象中的`reject()`方法，则会进入`then`的第二个函数内，会打印`No thanks`；

## 理解Promise异步调用的操作

```javaScript
var promise = new Promise(function(resolve){
  console.log(1);
  resolve(3);
});
promise.then(function(value){
  console.log(value);
});
console.log(2);
```
&emsp;上面的代码输出我们可以看到，结果分别为`1,2,3`； 

&emsp;首先代码从上往下执行，首先输出`1`，然后调用`resolve(3)`这个方法，这时候promise对象变为确定状态，即调用`onFulFilled`这个方法，从上面了解到，`resolve(成功)` 时 调用`onFulfilled` 方法，`Promise.then` 成功和失败时都可以使用，因此第一个函数是成功调用的，但是Promise对象是以异步方式调用的，所以先执行`console.log(2)`，输出的是`2`，然后输出的是`3`；

### 理解是同步调用还是异步调用

```javaScript
function ready(fn){
  var readyState = document.readyState;
  if (readyState === 'interactive' || readyState === 'complete') {
    fn();
  } else {
    window.addEventListener('DOMContentLoaded', fn);
  }
}
ready(function(){
  console.log("DOM Load Success");
});
console.log("我是同步输出的");
```
&emsp;如上代码；如果在调用`ready()`方法之前DOM已经载入完成的话，就会对回调函数进行同步调用，先输出`DOM Load Success `后输出 `我是同步输出的` ；如果在调用`ready()`方法之前DOM为未载入完成的话，那么代码先会执行 `window.addEventListener(‘DOMContentLoaded’, fn);`
就会异步调用该函数，那么就会先输出 “`我是同步输出的`”，后输出“`DOM Load Success`”;
为了解决上面的同步或者异步混乱的问题，我们现在可以使用promise对象使用异步的方式来解决；

如下代码：
```javaScript
function readyPromise(){
  return new Promise(function(resolve,reject){
    var readyState = document.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('DOMContentLoaded', resolve);
    }
  });
}
readyPromise().then(function(){
  console.log("DOM Load Success");
});
console.log("我是同步加载的，先执行我");
```
&emsp;输出如下：先输出“``我是同步加载的，先执行我``” 后输出 “`DOM Load Success`”。因为promise对象是异步加载的。

## 理解promise的三种状态
Promise 对象有三种状态：

- `Resolve `可以理解为成功的状态；
- `Rejected` 可以理解为失败的状态；
- `Pending`既不是`Resolve`也不是`Rejected`状态；可以理解为Promise对象实例创建时候的初始状态；

&emsp;比如Promise对象中的`resolve`方法就是调用`then`对象的第一个函数，也就是成功的状态；而`reject`方法就是调用then对象的第二个函数，也就是失败的状态；

## 理解then()

&emsp;还是之前的例子：
```javaScript
function testPromise(ready) {
  return new Promise(function(resolve,reject){
    if(ready) {
      resolve("hello world");
    }else {
      reject("No thanks");
    }
  });
};
// 方法调用
testPromise(true).then(function(msg){
  console.log(msg);
},function(error){
  console.log(error);
});
```
&emsp;上面的代码就是利用了 `then(onFulfilled，onRejected)`方法来执行的，第一个方法就是成功状态的标志，第二个方法是失败的状态标志；

&emsp;当然在多个任务的情况下then方法同样可以使用；比如上面的代码改成如下：

```javaScript
function testPromise(ready) {
  return new Promise(function(resolve,reject){
    if(ready) {
      resolve("hello world");
    }else {
      reject("No thanks");
    }
  });
};
// 方法调用
testPromise(true).then(function(msg){
  console.log(msg);
}).then(testPromise2)
  .then(testPromise3);
function testPromise2(){
  console.log(2);
}
function testPromise3(){
  console.log(3);
}
```
输出如下：`hello world ，2,3`

&emsp;上面的代码是`then`的链式调用方式，输出是按顺序输出的 分别为 `hello world , 2,3;` 使用链式调用的原因是每次调用后都会返回promise对象；

## 理解Promise.catch()方法

&emsp;`Promise.catch()`方法是`promise.then(undefined,onRejected)`方法的一个别名，该方法用来注册当promise对象状态变为`Rejected`的回调函数。

如下代码：
```javaScript
var promise = Promise.reject(new Error("message"));
promise.catch(function(error) {
  console.log(error);
});
```
<!-- 打印如下所示： -->
&emsp;不管是then还是catch方法调用，都返回一个新的promise对象；

下面我们来看看这个例子：
```javaScript
var promise1 = new Promise(function(resolve){
  resolve(1);
});
var thenPromise = promise1.then(function(value){
  console.log(value);
});
var catchPromise = thenPromise.catch(function(error){
  console.log(error);
});
console.log(promise1 !== thenPromise); // true
console.log(thenPromise !== catchPromise); //true
```
&emsp;如上代码，打印的都是`true`，这说明不管是`then`还是`catch`都返回了和新创建的promise是不同的对象；

&emsp;如果我们知道了then方法每次都会创建返回一个新的promise对象的话，那么久不难理解下面的代码了；

如下：
```javaScript
var promise1 = new Promise(function(resolve){
  resolve(1);
});
promise1.then(function(value){
  return value * 2;
});
promise1.then(function(value){
  return value * 2;
});
promise1.then(function(value){
  console.log("1"+value);
});
```
&emsp;如上的代码；打印出`11`；因为他们每次调用`then`方法时，是使用的不同的promise对象；因此最后打印的value还是`1`；但是如果我们then方法是连续调用的话，那情况就不一样了。

比如如下代码：
```javaScript
var promise1 = new Promise(function(resolve){
  resolve(2);
});
promise1.then(function(value){
  return value * 2;
}).then(function(value){
  return value * 2;
}).then(function(value){
  console.log("1"+value);
});
```
&emsp;打印出`18`，即 “1” + 2 * 2 * 2 = 18;

&emsp;上面第一种方法没有使用方法链的调用，上面第一种那种写法`then` 调用几乎是同时开始进行的，且传给每个`then`的value都是`1`；

&emsp;第二种方式是使用方法链的`then`，使多个`then`方法连接在一起了，因此函数会严格执行 `resolve – then — then – then`的顺序执行，并且传递每个`then`方法的value的值都是前一个promise对象中return的值；因此最后的结果就是`18`了；

&emsp;现在我们再回过头一刚开始我们讨论的为什么要使用promise的原因的问题了，比如2个ajax请求，后一个ajax请求需要获取到前一个ajax请求的数据，我们之前在使用jquery写代码是如下的：

```javaScript
$.ajax({
   url: '',
   dataType:'json',
   success: function(data) {
  // 获取data数据 传给下一个请求
  var id = data.id;
  $.ajax({
    url:'',
    data:{"id":id},
    success:function(){
      // .....
    }
  });
  }
});
```
&emsp;现在我们学习了`then`方法后，我们可以重新编写上面的代码变成如下：

```javaScript
var ajaxPromise = new Promise(function(resolve){
  resolve();
});
ajaxPromise.then(function(){
  $.ajax({
    url:'',
    dataType:'json',
    success: function(data) {
      var id = data.id;
      return id;
    }
  })
}).then(function(id){
  $.ajax({
    url:'',
    dataType:'json',
    data:{"id":id},
    success: function(data){
      console.log(data);
    }
  })
});
```
## 理解Promise.all

&emsp;`Promise.all`方法用于将多个Promise实例包装成一个新的Promise实例。

&emsp;Promise.all可以接受一个元素为Promise对象的**数组**作为参数，当这个数组里面所有的promise对象都变为resolve时，该方法才会返回。

如下代码：
```javaScript
var promise1 = new Promise(function(resolve){
  setTimeout(function(){
    resolve(1);
  },3000);
});
var promise2 = new Promise(function(resolve){
  setTimeout(function(){
    resolve(2);
  },1000);
});
Promise.all([promise1,promise2]).then(function(value){
  console.log(value); // 打印[1,2]
});
```
&emsp;如上代码 打印的是`[1,2]`; 如上我们看到`promise1`对象中的setTimeout是3秒的时间，而`promise2`对象中的setTimeout是1秒的时间，但是在`Promise.all`方法中会按照数组的原先顺序将结果返回；

&emsp;在我们平时的需求中，或许有这种情况的需求，比如我们需要发2个ajax请求时，不管他们的先后顺序，当这2个ajax请求都同时成功后，我们需要执行某些操作的情况下，这种情况非常适合。

## 理解Promise.race

&emsp;如上可知：`Promise.all `在接收到的所有对象promise都变为`FulFilled`或者 `Rejected`状态之后才会继续后面的处理，但是`Promise.race`的含义是只要有一个promise对象进入FulFilled或者Rejected状态的话，程序就会停止，且会继续后面的处理逻辑；

如下代码：
```javaScript
// `delay`毫秒后执行resolve
function timerPromise(delay){
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve(delay);
    },delay);
  });
}
// 任何一个promise变为resolve或reject 的话程序就停止运行
Promise.race([
  timerPromise(1),
  timerPromise(32),
  timerPromise(64),
  timerPromise(128)
]).then(function (value) {
  console.log(value);  // => 1
});
```
&emsp;如上代码创建了4个promise对象，这些promise对象分别在1ms,32ms,64ms,128ms后变为确定状态，并且在第一个变为确定状态后1ms后，`then`函数就会被调用，这时候`resolve()`方法给传递的值为`1`，因此执行`then`的回调函数后，值变为`1`；

&emsp;我们再来看看当一个promise对象变为确定状态(FulFiled)的时候，他们后面的promise对象是否还在运行呢？我们继续看如下代码运行：

```javaScript
var runPromise = new Promise(function(resolve){
  setTimeout(function(){
    console.log(1);
    resolve(2);
  },500);
});
var runPromise2 = new Promise(function(resolve){
  setTimeout(function(){
    console.log(3);
    resolve(4);
  },1000);
});

// 第一个promise变为resolve后程序停止
Promise.race([runPromise,runPromise2]).then(function(value){
  console.log(value);
});
```
&emsp;如上代码是使用定时器调用的，上面是2个promise对象，我们看到第一个promise对象过500毫秒后加入到执行队列里面去，如果执行队列没有其他线程在运行的时候，就执行该定时器，所以第一次打印`1`，然后调用`resolve(2)`; 接着调用`promise.race`方法，该方法只要有一个变为成功状态(FulFiled)的时候，程序就会停止，因此打印出`2`，同时后面的promise对象接着执行，因此打印出`3`，但是由于`promise.race()`该方法已经停止调用了，所以`resolve(4)`不会有任何输出；因此最后输出的是`1,2,3`；

&emsp;由此我们得出结论:当一个promise对象变为(FulFilled)成功状态的时候，后面的promise对象并没有停止运行。

<!-- ## Deferred和Promise的关系
Deferred 包含 Promise；
Deferred具备Promise的状态进行操作的特权方法；
下面我们来看看使用promise来实现deferred;如下代码：
function Deferred(){
  this.promise = new Promise(function(resolve,reject){
    this._resolve = resolve;
    this._reject = reject;
  }.bind(this));
}
Deferred.prototype.resolve = function(value) {
  this._resolve.call(this.promise,value);
};
Deferred.prototype.reject = function(reason) {
  this._reject.call(this.promise,reason);
};
function getURL(URL){
  var deferred = new Deferred();
  var req = new XMLHttpRequest();
  req.open('GET',URL,true);
  req.onload = function(){
    if(req.status === 200) {
      deferred.resolve(req.responseText);
    }else {
      deferred.reject(new Error(req.statusText));
    }
  };
  req.onerror = function(){
    deferred.reject(new Error(req.statusText));
  };
  req.send();
  return deferred.promise;
}
var URL = 'http://127.0.0.1/promise/promise.php';
getURL(URL).then(function onFulfilled(value){
  console.log(value);
});

其中promise.php代码输出的是一个json的数据，代码如下：
<?php 
  $data = json_decode(file_get_contents("php://input"));
  header("Content-Type: application/json; charset=utf-8");
  echo ('{"id" : ' . $data->id . ', "age" : 24, "sex" : "boy", "name" : "huangxueming"}');
?>

最后执行打印console的出来是：
{“id” : , “age” : 24, “sex” : “boy”, “name” : “huangxueming”}

使用promise封装deferred的方法，无非就是使用promise对象中的resolve和Reject等调用方法，下面我们再来看看使用promise对象对ajax请求的封装如下：
function getURL(URL){
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}
var URL = 'http://127.0.0.1/promise/promise.php';
getURL(URL).then(function onFulfilled(value){
  console.log(value);
});

上面分别两种方式使用promise对象实现ajax请求的封装对比如下：
Deferred那种方式不需要将promise代码括起来。
Promise代表了一个对象，这个对象的状态现在还不确定，但是未来一个时间点它的状态要么变为正常值（FulFilled），要么变为异常值（Rejected）；而Deferred对象表示了一个处理还没有结束的这种事实，在它的处理结束的时候，可以通过Promise来取得处理结果 -->

# 总结  

&emsp;作为javascript的新标准，ES6为我们提供了很多新语法及新特性，让我们的代码更加简单与易用。

&emsp;作为一只前端菜鸟，本篇文章旨在记录自己的学习心得，如有不足，还请多多指教，谢谢大家。

&emsp;路漫漫其修远兮，与诸君共勉。  

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/ES6/%E6%8E%A2%E7%A7%98Promise.md)**  

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。  