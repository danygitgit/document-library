# [Markdown 博客模板](https://github.com/danygitgit/document-library)

> create by **db** on **2020-9-2 13:30:46**  
> Recently revised in **2020-9-2 13:30:51**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [一、第一章](#chapter-1)
  - [二、第二章](#chapter-2)
  - [三、第三章](#chapter-3)
  - [四、第四章](#chapter-4)
  - [五、第五章](#chapter-5)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;这里是前言内容！

# <a  id="main-body">正文</a>

&emsp;这里是正文内容！

## <a  id="chapter-1">一、第一章</a>

> [返回目录](#catalog)
什么是Vue.nextTick()？？
 

定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

所以就衍生出了这个获取更新后的DOM的Vue方法。所以放在Vue.nextTick()回调函数中的执行的应该是会对DOM进行操作的 js代码；

理解：nextTick()，是将回调函数延迟在下一次dom更新数据后调用，简单的理解是：当数据更新了，在dom中渲染后，自动执行该函数，

<template>
  <div class="hello">
    <div>
      <button id="firstBtn" @click="testClick()" ref="aa">{{testMsg}}</button>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      testMsg:"原始值",
    }
  },
  methods:{
    testClick:function(){
      let that=this;
      that.testMsg="修改后的值";
      console.log(that.$refs.aa.innerText);   //that.$refs.aa获取指定DOM，输出：原始值
    }
  }
}
</script>
 
使用this.$nextTick()

  methods:{
    testClick:function(){
      let that=this;
      that.testMsg="修改后的值";
      that.$nextTick(function(){
        console.log(that.$refs.aa.innerText);  //输出：修改后的值
      });
    }
  }
注意：Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM，

 

什么时候需要用的Vue.nextTick()？？
 

1、Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中，原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载已完成。

  created(){
    let that=this;
    that.$nextTick(function(){  //不使用this.$nextTick()方法会报错
        that.$refs.aa.innerHTML="created中更改了按钮内容";  //写入到DOM元素
    });
  },
 

2、当项目中你想在改变DOM元素的数据后基于新的dom做点什么，对新DOM一系列的js操作都需要放进Vue.nextTick()的回调函数中；通俗的理解是：更改数据后当你想立即使用js操作新的视图的时候需要使用它

<template>
  <div class="hello">
    <h3 id="h">{{testMsg}}</h3>
  </div>
</template>
 
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      testMsg:"原始值",
    }
  },
  methods:{
    changeTxt:function(){
      let that=this;
      that.testMsg="修改后的文本值";  //vue数据改变，改变dom结构
      let domTxt=document.getElementById('h').innerText;  //后续js对dom的操作
      console.log(domTxt);  //输出可以看到vue数据修改后DOM并没有立即更新，后续的dom都不是最新的
      if(domTxt==="原始值"){
        console.log("文本data被修改后dom内容没立即更新");
      }else {
        console.log("文本data被修改后dom内容被马上更新了");
      }
    },
 
  }
}
</script>
 
正确的用法是：vue改变dom元素结构后使用vue.$nextTick()方法来实现dom数据更新后延迟执行后续代码

    changeTxt:function(){
      let that=this;
      that.testMsg="修改后的文本值";  //修改dom结构
       
      that.$nextTick(function(){  //使用vue.$nextTick()方法可以dom数据更新后延迟执行
        let domTxt=document.getElementById('h').innerText; 
        console.log(domTxt);  //输出可以看到vue数据修改后并没有DOM没有立即更新，
        if(domTxt==="原始值"){
          console.log("文本data被修改后dom内容没立即更新");
        }else {
          console.log("文本data被修改后dom内容被马上更新了");
        }
      });
    },
 

3、在使用某个第三方插件时 ，希望在vue生成的某些dom动态发生变化时重新应用该插件，也会用到该方法，这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法。

待完善？？？

 

Vue.nextTick(callback) 使用原理：
原因是，Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOm操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新。
当你设置 vm.someData = 'new value'，DOM 并不会马上更新，而是在异步队列被清除，也就是下一个事件循环开始时执行更新时才会进行必要的DOM更新。如果此时你想要根据更新的 DOM 状态去做某些事情，就会出现问题。。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。


## <a  id="chapter-2">二、第二章</a>

> [返回目录](#catalog)

&emsp;简单理解Vue中的nextTick
Vue中的nextTick涉及到Vue中DOM的异步更新，感觉很有意思，特意了解了一下。其中关于nextTick的源码涉及到不少知识，很多不太理解，暂且根据自己的一些感悟介绍下nextTick。

一、示例
先来一个示例了解下关于Vue中的DOM更新以及nextTick的作用。

模板

<div class="app">
  <div ref="msgDiv">{{msg}}</div>
  <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
  <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
  <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
  <button @click="changeMsg">
    Change the Message
  </button>
</div>
复制代码
Vue实例

new Vue({
  el: '.app',
  data: {
    msg: 'Hello Vue.',
    msg1: '',
    msg2: '',
    msg3: ''
  },
  methods: {
    changeMsg() {
      this.msg = "Hello world."
      this.msg1 = this.$refs.msgDiv.innerHTML
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
      })
      this.msg3 = this.$refs.msgDiv.innerHTML
    }
  }
})
复制代码
点击前


点击后


从图中可以得知：msg1和msg3显示的内容还是变换之前的，而msg2显示的内容是变换之后的。其根本原因是因为Vue中DOM更新是异步的（详细解释在后面）。

二、应用场景
下面了解下nextTick的主要应用的场景及原因。

在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。

在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。
具体原因在Vue的官方文档中详细解释：

Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0)代替。

例如，当你设置vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。

三、nextTick源码浅析
作用

Vue.nextTick用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象。

源码

/**
 * Defer a task to execute it asynchronously.
 */
export const nextTick = (function () {
  const callbacks = []
  let pending = false
  let timerFunc

  function nextTickHandler () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve()
    var logError = err => { console.error(err) }
    timerFunc = () => {
      p.then(nextTickHandler).catch(logError)
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) setTimeout(noop)
    }
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    var counter = 1
    var observer = new MutationObserver(nextTickHandler)
    var textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
      characterData: true
    })
    timerFunc = () => {
      counter = (counter + 1) % 2
      textNode.data = String(counter)
    }
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = () => {
      setTimeout(nextTickHandler, 0)
    }
  }

  return function queueNextTick (cb?: Function, ctx?: Object) {
    let _resolve
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx)
        } catch (e) {
          handleError(e, ctx, 'nextTick')
        }
      } else if (_resolve) {
        _resolve(ctx)
      }
    })
    if (!pending) {
      pending = true
      timerFunc()
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        _resolve = resolve
      })
    }
  }
})()
复制代码
首先，先了解nextTick中定义的三个重要变量。

callbacks
用来存储所有需要执行的回调函数

pending
用来标志是否正在执行回调函数

timerFunc
用来触发执行回调函数

接下来，了解nextTickHandler()函数。

function nextTickHandler () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }
复制代码
这个函数用来执行callbacks里存储的所有回调函数。

接下来是将触发方式赋值给timerFunc。

先判断是否原生支持promise，如果支持，则利用promise来触发执行回调函数；
否则，如果支持MutationObserver，则实例化一个观察者对象，观察文本节点发生变化时，触发执行所有回调函数。
如果都不支持，则利用setTimeout设置延时为0。
最后是queueNextTick函数。因为nextTick是一个即时函数，所以queueNextTick函数是返回的函数，接受用户传入的参数，用来往callbacks里存入回调函数。


上图是整个执行流程，关键在于timeFunc()，该函数起到延迟执行的作用。
从上面的介绍，可以得知timeFunc()一共有三种实现方式。

Promise
MutationObserver
setTimeout
其中Promise和setTimeout很好理解，是一个异步任务，会在同步任务以及更新DOM的异步任务之后回调具体函数。

下面着重介绍一下MutationObserver。

MutationObserver是HTML5中的新API，是个用来监视DOM变动的接口。他能监听一个DOM对象上发生的子节点删除、属性修改、文本内容修改等等。 调用过程很简单，但是有点不太寻常：你需要先给他绑回调：

var mo = new MutationObserver(callback)
复制代码
通过给MutationObserver的构造函数传入一个回调，能得到一个MutationObserver实例，这个回调就会在MutationObserver实例监听到变动时触发。

这个时候你只是给MutationObserver实例绑定好了回调，他具体监听哪个DOM、监听节点删除还是监听属性修改，还没有设置。而调用他的observer方法就可以完成这一步:

var domTarget = 你想要监听的dom节点
mo.observe(domTarget, {
      characterData: true //说明监听文本内容的修改。
})
复制代码

在nextTick中 MutationObserver的作用就如上图所示。在监听到DOM更新后，调用回调函数。
其实使用 MutationObserver的原因就是 nextTick想要一个异步API，用来在当前的同步代码执行完毕后，执行我想执行的异步回调，包括Promise和 setTimeout都是基于这个原因。其中深入还涉及到microtask等内容，暂时不理解，就不深入介绍了。

## <a  id="chapter-3">三、第三章</a>

> [返回目录](#catalog)

&emsp;Vue中$nextTick源码解析
  在做项目的时候，我们经常会用到nextTick，简单的理解就是它就是一个setTimeout函数，将函数放到异步后去处理；将它替换成setTimeout好像也能跑起来，但它仅仅这么简单吗？那为什么我们不直接用setTimeout呢？让我们深入剖析一下。

发现问题
  记得之前有一个需求，就是根据文字的行数来显示展开更多的一个按钮，因此我们在Vue中给数据赋值之后需要获取文字高度。

<div id="app">
    <div class="msg">
        {{msg}}
    </div>
</div>
new Vue({
    el: '#app',
    data: function(){
        return {
            msg: ''
        }
    },
    mounted(){
        this.msg = '我是测试文字'
        console.log(document.querySelector('.msg').offsetHeight) //0
    }
})
复制代码
  这时不管怎么获取，文字的Div高度都是0；但是直接获取却是有值：

problem.png
  同样的情况也发生在给子组件传参上；我们给子组件传参数后，在子组件中调用函数查看参数。

<div id="app">
    <div class="msg">
        <form-report ref="child" :name="childName"></form-report>
    </div>
</div>
Vue.component('form-report', {
    props: ['name'],
    methods: {
        showName(){
            console.log('子组件name：'+this.name)
        }
    },
    template: '<div>{{name}}</div>'
})
new Vue({
    el: '#app',
    data: function(){
        return {
            childName: '',
        }
    },
    mounted(){
        this.childName = '我是子组件名字'
        this.$refs.child.showName()
    }
})
复制代码
  虽然页面上展示了子组件的name，但是打印出来却是空值：

problem1.png
异步更新
  我们发现上述两个问题的发生，不管子组件还是父组件，都是在给data中赋值后立马去查看数据导致的。由于“查看数据”这个动作是同步操作的，而且都是在赋值之后；因此我们猜测一下，给数据赋值操作是一个异步操作，并没有马上执行，Vue官网对数据操作是这么描述的：

可能你还没有注意到，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

  也就是说我们在设置this.msg = 'some thing'的时候，Vue并没有马上去更新DOM数据，而是将这个操作放进一个队列中；如果我们重复执行的话，队列还会进行去重操作；等待同一事件循环中的所有数据变化完成之后，会将队列中的事件拿出来处理。

  这样做主要是为了提升性能，因为如果在主线程中更新DOM，循环100次就要更新100次DOM；但是如果等事件循环完成之后更新DOM，只需要更新1次。还不了解事件循环的童鞋，可以看我的另一篇文章从一道面试题来理解JS事件循环

  为了在数据更新操作之后操作DOM，我们可以在数据变化之后立即使用Vue.nextTick(callback)；这样回调函数会在DOM更新完成后被调用，就可以拿到最新的DOM元素了。

//第一个demo
this.msg = '我是测试文字'
this.$nextTick(()=>{
    //20
    console.log(document.querySelector('.msg').offsetHeight)
})
//第二个demo
this.childName = '我是子组件名字'
this.$nextTick(()=>{
    //子组件name：我是子组件名字
    this.$refs.child.showName()
})
复制代码
nextTick源码分析
  了解了nextTick的用法和原理之后，我们就来看一下Vue是怎么来实现这波“操作”的。

opt.jpg
  Vue把nextTick的源码单独抽到一个文件中，/src/core/util/next-tick.js，删掉注释也就大概六七十行的样子，让我们逐段来分析。

const callbacks = []
let pending = false
let timerFunc

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
复制代码
  我们首先找到nextTick这个函数定义的地方，看看它具体做了什么操作；看到它在外层定义了三个变量，有一个变量看名字就很熟悉：callbacks，就是我们上面说的队列；在nextTick的外层定义变量就形成了一个闭包，所以我们每次调用$nextTick的过程其实就是在向callbacks新增回调函数的过程。

  callbacks新增回调函数后又执行了timerFunc函数，pending用来标识同一个时间只能执行一次。那么这个timerFunc函数是做什么用的呢，我们继续来看代码：

export let isUsingMicroTask = false
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  //判断1：是否原生支持Promise
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  //判断2：是否原生支持MutationObserver
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  //判断3：是否原生支持setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  //判断4：上面都不行，直接用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
复制代码
  这里出现了好几个isNative函数，这是用来判断所传参数是否在当前环境原生就支持；例如某些浏览器不支持Promise，虽然我们使用了垫片(polify)，但是isNative(Promise)还是会返回false。

  可以看出这边代码其实是做了四个判断，对当前环境进行不断的降级处理，尝试使用原生的Promise.then、MutationObserver和setImmediate，上述三个都不支持最后使用setTimeout；降级处理的目的都是将flushCallbacks函数放入微任务(判断1和判断2)或者宏任务(判断3和判断4)，等待下一次事件循环时来执行。MutationObserver是Html5的一个新特性，用来监听目标DOM结构是否改变，也就是代码中新建的textNode；如果改变了就执行MutationObserver构造函数中的回调函数，不过是它是在微任务中执行的。

  那么最终我们顺藤摸瓜找到了最终的大boss：flushCallbacks；nextTick不顾一切的要把它放入微任务或者宏任务中去执行，它究竟是何方神圣呢？让我们来一睹它的真容：

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
复制代码
  本来以为有多复杂的flushCallbacks，居然不过短短的8行。它所做的事情也非常的简单，把callbacks数组复制一份，然后把callbacks置为空，最后把复制出来的数组中的每个函数依次执行一遍；所以它的作用仅仅是用来执行callbacks中的回调函数。

总结
  到这里，整体nextTick的代码都分析完毕了，总结一下它的流程就是：

把回调函数放入callbacks等待执行
将执行函数放到微任务或者宏任务中
事件循环到了微任务或者宏任务，执行函数依次执行callbacks中的回调
  再回到我们开头说的setTimeout，可以看出来nextTick是对setTimeout进行了多种兼容性的处理，宽泛的也可以理解为将回调函数放入setTimeout中执行；不过nextTick优先放入微任务执行，而setTimeout是宏任务，因此nextTick一般情况下总是先于setTimeout执行，我们可以在浏览器中尝试一下：

setTimeout(()=>{
    console.log(1)
}, 0)
this.$nextTick(()=>{
    console.log(2)
})
this.$nextTick(()=>{
    console.log(3)
})
//运行结果 2 3 1
复制代码
  最后验证猜想，当前宏任务执行完成后，优先执行两个微任务，最后再执行宏任务。

更多前端资料请关注公众号【前端壹读】。

## <a  id="chapter-4">四、第四章</a>

> [返回目录](#catalog)

&emsp;第四章内容！

## <a  id="chapter-5">五、第五章</a>

> [返回目录](#catalog)

&emsp;第五章内容！

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;这里是总结内容！

### <a  id="reference-documents">参考文献</a>

- [Markdown 博客模板 | 掘金-豆包君](https://juejin.im/user/5b1a3eb7f265da6e572b3ada)

————————————————
版权声明：本文为CSDN博主「广积粮缓称王」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zhouzuoluo/article/details/84752280


https://juejin.cn/post/6844903557372575752#heading-0


https://juejin.cn/post/6844904147804749832#heading-2


**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
