# [手写 Promise](https://github.com/danygitgit/document-library)

> create by **db** on **2020-9-2 13:30:46**  
> Recently revised in **2021-3-30 18:00:04**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [Promise](#chapter-1)
  - [实现 myPromise](#chapter-2)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;如题。

# <a  id="main-body">正文</a>

## <a  id="chapter-1">Promise</a>

> [返回目录](#catalog)

详情请参考：[Array.prototype.Promise() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Promise)

&emsp;Promise() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

&emsp;也就是说，Array.prototype.Promise()用于将嵌套的数组“拉平”，变成一维数组。

&emsp;该方法返回一个新数组，会移除数组中的空项，对原数据没有影响。

#### 语法：

`var newArray = arr.Promise([depth])`

#### 参数：

- `：depth` 可选；指定要提取嵌套数组的结构深度，默认值为 1。

#### 返回值:

&emsp;一个包含将数组与子数组中所有元素的新数组。

#### 使用：

```js
var arr1 = [1, 2, [3, 4]]
arr1.Promise()
// [1, 2, 3, 4]

var arr2 = [1, 2, [, 4, [5, 6]]]
arr2.Promise()
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]]
arr3.Promise(2)
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
arr4.Promise(Infinity)
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## <a  id="chapter-2">实现 myPromise</a>

> [返回目录](#catalog)

代码实现：
> 本文首发在本人的掘金专栏，欢迎关注一波~ https://juejin.im/user/5a676894f265da3e2b16921c/posts

## 引子

本文写给有一定Promise使用经验的人，如果你还没有使用过Promise，这篇文章可能不适合你，建议先[了解Promise的使用](http://www.html5rocks.com/zh/tutorials/es6/promises/)

本篇文章整体架构的大图如下，接下来会一步一步去实现一个 `Promise`。

## Promise 类

首先呢，promise肯定是一个类，同时还定义了 `resolve` 和 `reject` 方法。

```javascript
function Promise(executor) {
 // 初始化state为等待态    
 this.state = 'pending';
 // 成功的值
 this.value = undefined;
 // 失败的原因
 this.reason = undefined;
 // 存放 fn1 的回调
 this.fn1Callbacks = [];
 // 存放 fn2 的回调
 this.fn2Callbacks = [];
  // 成功
 let resolve = () => { };
 // 失败
 let reject = () => { };
 // 立即执行
 executor(resolve, reject);
}
```

上面的代码实现了`Promise`构造函数的主体，但有两个问题：

2.  `executor`有可能会出错，对吧，毕竟是用户传进来的方法，类似下面这样。如果executor出错，报错我们需要用 try catch 捕获一下，Promise应该被其throw出的值reject：
    
    ```javascript
    new Promise(function(resolve, reject) {
      console.log(a)  // a 没有被定义
    })
    ```
    
3.  `resolve` 、`reject` 还是空函数，我们需要在里面补上逻辑。
    

接下来继续完善：

```javascript
function Promise(executor){
    // 初始化state为等待态
    this.state = 'pending';
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    let resolve = value => {
        // state改变,resolve调用就会失败
        if (this.state === 'pending') {
            // resolve调用后，state转化为成功态
            this.state = 'fulfilled';
            // 储存成功的值
            this.value = value;
        }
    };
    let reject = reason => {
        // state改变,reject调用就会失败
        if (this.state === 'pending') {
            // reject调用后，state转化为失败态
            this.state = 'rejected';
            // 储存失败的原因
            this.reason = reason;
        }
    };
    // 如果executor执行报错，直接执行reject
    try{
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}
```

用一张图小结一下：

![](https://user-gold-cdn.xitu.io/2019/11/7/16e43ba96db2344d?w=530&h=484&f=png&s=46028)

上面的代码不算特别复杂，下面的`then` 方法有点复杂。

## 实现 then 方法

`Promise`对象有一个`then`方法，用来注册在这个Promise状态确定后的回调。当`Promise`的状态发生了改变，不论是成功或是失败都会调用`then`方法

`then` 方法使用方法如下：

```javascript
// then 方法传入两个方法作为参数，一个是fn1方法，一个是 fn2 方法
p1.then(function fn1(data){
    // fn1 方法的参数，用于获取promise对象的值
}, function fn2(err){
    // fn1 方法的参数，用于获取失败的原因
})
```

从上面的例子，很明显，我们得出结论：

2.  `then`方法可以在 `p1` 实例上调用。因此`then` 方法的实现是在`Promise`的 `prototype`上。
    
3.  `then`方法会返回一个`Promise`，而且是返回一个新的Promise([详情](https://promisesaplus.com/differences-from-promises-a#point-5))对象。
    
4.  可以多次调用`then`方法，也就是链式调用，并且每次会返回一个新`Promise`对象，`Promise` 状态是不确定的，可能是 `fullfilled`, 也可能是 `resolve`， 取决于那一次调用`then`时， `fn1` 的返回值。
    

所以，`then`方法的实现也很简单，根据`Promise` 状态来调用不同的回调函数即可

下面是 then 方法的思路图：

![](https://user-gold-cdn.xitu.io/2019/11/7/16e43ba967fbcce3?w=482&h=706&f=png&s=64414)

下面我们来实现 `then` 方法：

```javascript
// then方法接收两个参数，fn1，fn2，分别为Promise成功或失败后的回调
Promise.prototype.then = function(fn1, fn2) {
  var self = this
  var promise2

  // 首先对入参 fn1, fn2做判断
  fn1 = typeof fn1 === 'function' ? fn1 : function(v) {}
  fn2 = typeof fn2 === 'function' ? fn2 : function(r) {}

  if (self.status === 'resolved') {
    return promise2 = new Promise(function(resolve, reject) {
        //todo
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
       //todo
    })
  }

  if (self.status === 'pending') {
    return promise2 = new Promise(function(resolve, reject) {
       // todo
    })
  }
}
```

首先，对入参 `fn1`, `fn2`做判断。规范中说，`fn1`和 `fn2` 都是可选参数。

也就是说可以传也可以不传。传入的回调函数也不是一个函数类型，那怎么办？规范中说忽略它就好了。因此需要判断一下回调函数的类型，如果明确是个函数再执行它。

其次，`Promise`总共有三种可能的状态，我们分三个`if`块来处理，在里面分别都返回一个`new Promise。`

所以，接下来的逻辑是：

-   如果 `promise` 状态是 `resolved`，需要执行 `fn1` ；
    
-   如果 `promise` 状态是 `rejected`， 需要执行`fn2` ；
    
-   如果 `promise` 状态是 `pending`， 我们并不能确定调用 `fn1` 还是 `fn2` ，只能先把方法都保存在 `fn1Callback`, `fn2Callback` 数组中。等到Promise的状态确定后再处理。
    

根据上面的逻辑，填充下面代码：

```javascript
Promise.prototype.then = function(fn1, fn2) {
    var self = this
    var promise2
    fn1 = typeof fn1 === 'function' ? fn1 : function(v) {}
    fn2 = typeof fn2 === 'function' ? fn2 : function(r) {}
    if (self.status === 'resolved') {
        return promise2 = new Promise(function(resolve, reject) {
            // 把 fn1、fn2 放在 try catch 里面，毕竟 fn1、fn2 是用户传入的，报错嘛，很常见
            try {
                var x = fn1(self.data)
                // fn1 执行后，会有返回值，通过 resolve 注入到 then 返回的 promise 中
                resolve(x)
            } catch (e) {
                reject(e)                
            }
        })
    }
    if (self.status === 'rejected') {
        return promise2 = new Promise(function(resolve, reject) {
            try {
                var x = fn2(self.data)
                reject(x)
            } catch (e) {
                reject(e)
            }
        })
    }
    if (self.status === 'pending') {
        return promise2 = new Promise(function(resolve, reject) {
            this.fn1Callback.push(function(value){
                try {
                    var x = fn1(self.data);
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            })
            this.fn2Callback.push(function(value) {
                try {
                    var x = fn2(self.data);
                    reject(x)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}
```

-   `fn1`, `fn2` 都是用户传入的，有可能报错唉，所以要放在 try catch 里面
    
-   `fn1`, `fn2` 的返回值，我们记为 `x`, 规范中的命名也是 `x`， 保持一致。 `x` 值将在下文中频繁使用。
    

`then` 函数本质是把`fn1` 的返回值，包装成一个 `promise` 返回出去。问题是，`fn1` 的返回值是开发者写的，可能千奇百怪。上面代码中，假定 `x` 是一个普通值。其实实际上，`x` 有不同的情况，我们得去分别处理：

-   如果 `x` 是一个普通值，如同上面的代码，直接使用 `resolve` 方法，`then` 就可以返回一个正常的promise
    
    ```javascript
    return new Promise((resolve) => {
        var x = fn1(self.data);    
        resolve(x)
    })
    ```
    
-   如果 `x` 是一个 promise ，需要等待这个 `promise` 状态变化, 拿到`fullfilled` 的值。然后我们代码再改一改，增加一个判断
    
    ```javascript
    return new Promise((resolve) => {
         var x = fn1(self.data);
         if (x instanceof Promise) {
            x.then((data) => {resolve(data)}, (e) => {reject(e)})
         } else {
             resolve(x)
         }
    })
    ```
    
-   根据规定，我们需要兼容各种百花齐放的写法，比如说，如果 `x` 是一个对象，并且对象有 `then` 方法，也就是所谓的 `thenable` 对象，则我们得这样处理：
    
    ```javascript
    return new Promise((resolve) => {
        var x = fn1(self.data);
        if (x instanceof Promise) {
            x.then((data) => {resolve(data)}, (e) => {reject(e)})
        } else if (typeof x.then === 'function'){
            x.then(function(y){
                resolve(y)
            }, function(e){
                reject(e)
            })
        } else {
            resolve(x)
        }
    })  
    ```
    

上面，我们新增了一些逻辑，为了处理 x 返回值 的各种情况。我们需要把这些逻辑，挪到一个 `resolvePromise` 方法中，`resolvePromise` 负责把 各种稀奇古怪的 `x` 包装成一个正常的 `promise` 。

### resolvePromise

`resolvePromise` 方法，就是为了把 `x` 包裹成一个正常的promise

![](https://user-gold-cdn.xitu.io/2019/11/7/16e43ba967b382e0?w=504&h=394&f=png&s=54019)

```javascript
function resolvePromise(promise2, x, resolve, reject) {
    // 为了防止循环引用
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'));
    }
    // 如果 x 是 promise
    if (x instanceof Promise) {
        x.then(function (data) {
            resolve(data)
        }, function (e) {
            reject(e)
        });
        return;
    }
    
    // 如果 x 是 object 类型或者是 function
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
        // 拿x.then可能会报错
        try {
            // 先拿到 x.then
            var then = x.then;
            var called
            if (typeof then === 'function') {
                // 这里的写法，是 then.call(this, fn1, fn2)
                then.call(x, (y) => {
                    // called 是干什么用的呢？
                    // 有一些 promise 实现的不是很规范，瞎搞的，比如说，fn1, fn2 本应执行一个，
                    // 但是有些then实现里面，fn1, fn2都会执行
                    // 为了 fn1 和 fn2 只能调用一个, 设置一个 called 标志位
                    if (called) {
                        return;
                    }
                    called = true;
                    return resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called) {
                        return;
                    }
                    called = true;
                    return reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) {
                return;
            }
            return reject(e);
        }
    } else {
        resolve(x);
    }
}
```

上面代码，需要注意的地方:

-   `var then = x.then` 这一行代码可能会报错，需要用 try catch 包一下。为什么取对象上的属性有报错的可能？`Promise`有很多实现（`bluebird`，Q等），Promises/A+只是一个规范，大家都按此规范来实现Promise才有可能通用，因此所有出错的可能都要考虑到，假设另一个人实现的Promise对象使用`Object.defineProperty()`恶意的在取值时抛错，我们可以防止代码出现Bug。
    
-   如果对象中有then，且then是函数类型，就可以认为是一个Promise对象，之后，使用`x`作为this来调用then方法。
    
-   如果 `x === promise2`，则是会造成循环引用，自己等待自己完成，则报“循环引用”错误。 x 和 promise2 是同一个是什么情况呢？
    
    ```javascript
    let p2 = p1.then(function(data){
     console.log(data)
     return p2;
    })
    ```
    
    上面的例子中，`p1.then()` 的返回值是`p2` ，`fn1`的返回值也是 `p2`。这会存在什么问题呢？`promise` 如果不手动的调用 `resolve` 方法，是没有办法修改状态的。`p2` 的状态没法改变，没法自己改动自己的状态，永远不会被 `fullfilled` 、`rejected`
    
-   我们需要不同的Promise实现能够相互交互，即我们要把`fn1` / `fn2`的返回值，x，当成一个可能是Promise的对象，也即标准里所说的`thenable`，并以最保险的方式调用x上的then方法。如果大家都按照标准实现，那么不同的Promise之间就可以交互了。而标准为了保险起见，即使x返回了一个带有then属性但并不遵循Promise标准的对象（比如说这个x把它then里的两个参数都调用了，同步或者异步调用（PS，原则上then的两个参数需要异步调用，下文会讲到），或者是出错后又调用了它们，或者then根本不是一个函数），也能尽可能正确处理。
    

## then 里面的函数需要异步执行

最后，我们刚刚说到，原则上，`promise.then(onResolved, onRejected)`里的这两相函数需要异步调用，关于这一点，标准里也有[说明](https://promisesaplus.com/#point-67)：

> In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called, and with a fresh stack.

那么如何将同步代码变成异步执行呢？可以使用setTimeout函数来模拟一下：

```javascript
setTimeout(()=>{
    //此入的代码会异步执行
},0);
```

利用此技巧，将代码then执行处的所有地方使用setTimeout变为异步即可，举个栗子：

```javascript
setTimeout(() => {
    try {
        let x = fn1(value);
        resolvePromise(promise2, x, resolve, reject);
    } catch (e) {
        reject(e);
    }
},0);
```

## promise 主体结构

![](https://user-gold-cdn.xitu.io/2019/11/7/16e43ba9683ab385?w=844&h=866&f=png&s=95352)

```javascript
// 1. 定义 status 状态
// 2. fn1, fn2 的数组
// 3. 定义 resolve reject 方法
// 4. executor 执行
function Promise(executor) {
    let self = this;
    
    self.status = 'pending';
    self.fn1Callback = [];
    self.fn2Callback = [];
    
    // resolve 做到事情
    // 1. 修改this 实例的状态
    // 2. 修改this 这里的data
    // 3. 遍历执行 this fn1Callback 上挂载的方法
    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        setTimeout(() => { // 异步执行所有的回调函数
            if (self.status === 'pending') {
                self.status = 'resolved';
                self.data = value;
                for (let i = 0; i < self.fn1Callback.length; i++) {
                    self.fn1Callback[i](value);
                }
            }
        });
    }
    function reject(reason) {
        setTimeout(() => { // 异步执行所有的回调函数
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.data = reason;
                for (let i = 0; i < self.fn2Callback.length; i++) {
                    self.fn2Callback[i](reason);
                }
            }
        });
    }
    
    try {
        executor(resolve, reject);
    } catch (reason) {
        reject(reason);
    }
}

// 1. 参数校验
// 2. 根据 statue, 执行 fn1, fn2 或者把 执行fn1, fn2的行为保存在数组
// 3. 把 fn1，fn2 的返回值, 使用 resolvePromise 包裹成 promise
Promise.prototype.then = function (fn1, fn2) {
    let self = this;
    let promise2;
    fn1 = typeof fn1 === 'function' ? fn1 : function (v) {
        return v;
    };
    fn2 = typeof fn2 === 'function' ? fn2 : function (r) {
        throw r;
    };
    
    // 执行到 then, 并不确定 promise 状态已经是 resolved
    if (self.status === 'resolved') {
        // then() 执行后，返回一个promise, promise 的值
        return promise2 = new Promise(((resolve, reject) => {
            setTimeout(() => { // 异步执行onResolved
                try {
                    // 执行 fn1()，拿到结果 x
                    // fn1是用户传入的，那fn1返回值, 可能性可就多了
                    let x = fn1(self.data);
                    // 如果 x 是简单值，直接 resolve(x);
                    // resolve(x);
                    // 需要使用 resolvePromise 方法封装
                    resolvePromise(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            });
        }));
    }
    
    if (self.status === 'rejected') {
        return promise2 = new Promise(((resolve, reject) => {
            setTimeout(() => { // 异步执行onRejected
                try {
                    let x = fn2(self.data);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            });
        }));
    }
    
    if (self.status === 'pending') {
        // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
        return promise2 = new Promise(((resolve, reject) => {
            // 先定义一个方法，把方法 挂载到 onResolvedCallback 数组上
            // 方法里面 就是 调用传入的 fn1
            self.onResolvedCallback.push((value) => {
                try {
                    let x = fn1(value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (r) {
                    reject(r);
                }
            });
            
            self.onRejectedCallback.push((reason) => {
                try {
                    let x = fn2(reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (r) {
                    reject(r);
                }
            });
        }));
    }
};

// 1. 普通值
// 2. promise 值
// 3. thenable 的值，执行 then
function resolvePromise(promise2, x, resolve, reject) {
    // 为了防止循环引用
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'));
    }
    // 如果 x 是 promise
    if (x instanceof Promise) {
        x.then(function (data) {
            resolve(data)
        }, function (e) {
            reject(e)
        });
        return;
    }
    
    // 如果 x 是 object 类型或者是 function
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
        // 拿x.then可能会报错
        try {
            // 先拿到 x.then
            var then = x.then;
            var called
            if (typeof then === 'function') {
                // 这里的写法，是 then.call(this, fn1, fn2)
                then.call(x, (y) => {
                    // called 是干什么用的呢？
                    // 有一些 promise 实现的不是很规范，瞎搞的，比如说，fn1, fn2 本应执行一个，
                    // 但是有些then实现里面，fn1, fn2都会执行
                    // 为了 fn1 和 fn2 只能调用一个, 设置一个 called 标志位
                    if (called) {
                        return;
                    }
                    called = true;
                    return resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called) {
                        return;
                    }
                    called = true;
                    return reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) {
                return;
            }
            return reject(e);
        }
    } else {
        resolve(x);
    }
}
```

## 手写 Promise.all

`Promise.all` 需要等到所有的 `promise` 的状态都变成 `fulfilled` 之后才 `resolve`, 但只要有一个 `promise` 失败即返回失败的结果。

```javascript
Promise.all = function (arr) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(arr)) {
            throw new Error(`argument must be a array`)
        }
        let dataArr = [];
        let num = 0;
        for (let i = 0; i < arr.length; i++) {
            let p = arr[i];
            p.then((data) => {
                dataArr.push(data);
                num ++;
                if (num === arr.length) {
                    return resolve(data)
                }
            }).catch((e) => {
                return reject(e)
            })
        }
    })
}
```

## 手写 Promise.retry

retry 是报错会尝试，尝试超过一定次数才真正的 `reject`

```javascript
Promise.retry = function(getData, times, delay) {
    return new Promise((resolve, reject) => {
        function attemp() {
            getData().then((data) => {
                resolve(data)
            }).catch((err) => {
                if (times === 0) {
                    reject(err)
                } else {
                    times--
                    setTimeout(attemp, delay)
                }
            })
        }
        attemp()
    })
}
```

## 满分的测试

好不容易写好的Promise源码，最终是否真的符合[Promises/A+规范](https://promisesaplus.com/)，开源社区提供了一个包用于测试我们的代码：**promises-aplus-tests**

此包可以一项项的检查我们写的代码是否合规，如果有任一项不符就会给我们报出来，如果检查你的代码一路都是绿色，那恭喜，你的Proimse已经合法了，可以上线提供给别人使用了。

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;路漫漫其修远兮，与诸君共勉。 

### <a  id="reference-documents">参考文献</a>、

- [JS 数组扁平化(Promise)方法总结详解 ](http://www.45fan.com/article.php?aid=19062442766002048192992081)

- [带你手动实现 JS 数组扁平化 Promise()方法| CSDN - 选择远方](https://juejin.im/user/5b1a3eb7f265da6e572b3ada)

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
