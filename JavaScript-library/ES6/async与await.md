@[探秘Promise](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/ES6/%E6%8E%A2%E7%A7%98Promise.md)  

> create by **db** on **2019-12-15 20:19:47**   
> Recently revised in **2019-12-15 20:19:52**  

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/ES6/%E6%8E%A2%E7%A7%98Promise.md)**  

&emsp;查阅网上诸多资料，并结合自己的学习经验，写下这篇学习笔记，以记录自己的学习心得。现分享给大家，以供参考。  

# 前言  

> I hear and I fogorget.  

> I see and I remember.  

> I do and I understand.  

&emsp;我们都知道，js的世界是单线程执行的，也就是说一个任务完成之后才能进行另一个任务，这是因为js是运行在宿主进程多脚本语言，比如浏览器，比如node，宿主进程只会为其分配一个js引擎线程。

&emsp;那么对于耗时比较长的操作，例如一些ajax异步请求，这些请求之间有一种关系，就是下一次请求的参数是上一次请求的结果——回调地狱。所幸ES6给我们提供了异步编程的一种解决方案——Promise。

  
&emsp;参考文献

- [廖雪峰的官方网站 | 廖雪峰 ](https://www.liaoxuefeng.com/wiki/1022910821149312/1023023924160384) 
- [关于ES6的Promise的使用 |简书-紫陌兰溪 ](https://www.jianshu.com/p/1ec8d1c4e287)  
 
# 正文

## 什么是Promise

### Promise的含义
 
&emsp;Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

### Promise对象的特点

**Promise的优点**



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
前段时间领导给我们出了一道题，关于async/await、promise和setTimeout的执行顺序，网上查了查资料，这是头条的一道笔试题，记录一下，加深理解。

题目如下：
```javaScript
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('asnyc1 end');
}
async function async2() {
	console.log('async2');
}
console.log('script start');
setTimeout(() => {
	console.log('setTimeOut');
}, 0);
async1();
new Promise(function (reslove) {
	console.log('promise1');
	reslove();
}).then(function () {
	console.log('promise2');
})
console.log('script end');
```
执行结果：

```javaScript
script start
async1 start
async2
promise1
script end
asnyc1 end
promise2
setTimeOut
```
首先，我们先来了解一下基本概念：
js EventLoop 事件循环机制:
JavaScript的事件分两种，宏任务(macro-task)和微任务(micro-task)

宏任务：包括整体代码script，setTimeout，setInterval
微任务：Promise.then(非new Promise)，process.nextTick(node中)

事件的执行顺序，是先执行宏任务，然后执行微任务，这个是基础，任务可以有同步任务和异步任务，同步的进入主线程，异步的进入Event Table并注册函数，异步事件完成后，会将回调函数放入Event Queue中(宏任务和微任务是不同的Event Queue)，同步任务执行完成后，会从Event Queue中读取事件放入主线程执行，回调函数中可能还会包含不同的任务，因此会循环执行上述操作。
注意： setTimeOut并不是直接的把你的回掉函数放进上述的异步队列中去，而是在定时器的时间到了之后，把回掉函数放到执行异步队列中去。如果此时这个队列已经有很多任务了，那就排在他们的后面。这也就解释了为什么setTimeOut为什么不能精准的执行的问题了。setTimeOut执行需要满足两个条件：

1. 主进程必须是空闲的状态，如果到时间了，主进程不空闲也不会执行你的回掉函数 
2. 这个回掉函数需要等到插入异步队列时前面的异步函数都执行完了，才会执行 

 上面是比较官方的解释，说一下自己的理解吧：

了解了什么是宏任务和微任务，就好理解多了，首先执行 宏任务 => 微任务的Event Queue => 宏任务的Event Queue

promise、async/await
首先，new Promise是同步的任务，会被放到主进程中去立即执行。而.then()函数是异步任务会放到异步队列中去，那什么时候放到异步队列中去呢？当你的promise状态结束的时候，就会立即放进异步队列中去了。

带async关键字的函数会返回一个promise对象，如果里面没有await，执行起来等同于普通函数；如果没有await，async函数并没有很厉害是不是
await 关键字要在 async 关键字函数的内部，await 写在外面会报错；await如同他的语意，就是在等待，等待右侧的表达式完成。此时的await会让出线程，阻塞async内后续的代码，先去执行async外的代码。等外面的同步代码执行完毕，才会执行里面的后续代码。就算await的不是promise对象，是一个同步函数，也会等这样操作
步入正题：


 根据图片显示我们来整理一下流程：

1、执行console.log('script start')，输出script start；
2、执行setTimeout，是一个异步动作，放入宏任务异步队列中；
3、执行async1()，输出async1 start，继续向下执行；
4、执行async2()，输出async2，并返回了一个promise对象，await让出了线程，把返回的promise加入了微任务异步队列，所以async1()下面的代码也要等待上面完成后继续执行;
5、执行 new Promise，输出promise1，然后将resolve放入微任务异步队列；
6、执行console.log('script end')，输出script end；
7、到此同步的代码就都执行完成了，然后去微任务异步队列里去获取任务
8、接下来执行resolve（async2返回的promise返回的），输出了async1 end。
9、然后执行resolve（new Promise的），输出了promise2。
10、最后执行setTimeout，输出了settimeout。

以上为自己的见解，如错误请及时指正，谢谢！！！
————————————————
版权声明：本文为CSDN博主「yun_hou」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/yun_hou/article/details/88697954

# 总结  

&emsp;作为javascript的新标准，ES6为我们提供了很多新语法及新特性，让我们的代码更加简单与易用。

&emsp;作为一只前端菜鸟，本篇文章旨在记录自己的学习心得，如有不足，还请多多指教，谢谢大家。

&emsp;路漫漫其修远兮，与诸君共勉。  

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/ES6/%E6%8E%A2%E7%A7%98Promise.md)**  

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。  