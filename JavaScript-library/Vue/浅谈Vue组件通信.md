@[浅谈Vue组件通信](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98%EF%BC%88%E4%B8%80%EF%BC%89%E2%80%94%E2%80%94ToDoList.md)

> create by **db** on **2019-8-15 19:41:55**   
> Recently revised in **2019-9-25 17:11:00**

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98%EF%BC%88%E4%B8%80%EF%BC%89%E2%80%94%E2%80%94ToDoList.md)**

&emsp;这是一篇欠下很久的文章了。对于以Vue为工作栈的我来说，Vue组件之间的通信问题是接触最多的问题之一。因此，参考一些文章，并结合自己的工作及学习经验，写下这篇博客——温故而知新。
&emsp;作为一只前端菜鸟，本篇文章旨在记录自己的学习心得，如有不足，还请多多指教，谢谢大家。

# 前言

> I hear and I fogorget.

> I see and I remember.

> I do and I understand.

&emsp;组件间的通信是是实际开发中非常常用的一环，Vue中实现组件之间的通信方式有很多种， props,eventBus, Vuex, v-on, ref...等等。如何使用组件通信，对项目整体设计、开发、规范都有很实际的的作用。Vue文档上以及各类大佬博客中对总结vue组件间通信都写的很详细了，我也抛砖引玉，浅谈一下vue组件间通信的几种方式以及各自的使用场景。

&emsp;参考文献：

- [Vue组件通信 | 思否-老虎不长牙 ](https://segmentfault.com/a/1190000015040856#articleHeader8)
- [vue组件通信--注意事项及经验总结 | 掘金-王文健 ](http://blog.wwenj.com/index.php/archives/69/)

# 正文

&emsp;Vue组件通信包括：子组件与父组件之间，兄弟组件之间，模块之间

## 父子组件通信

### props & $emit

一言不合上代码：

`index.vue`  父组件

```html
<template>
  <div>
    <h1>我是父元素</h1>
    <child title="静态文字"
           :img-width="344"
           :img-height="imgHeight"
           :before-close="closeFuction"
           @dadEmit='sonEmit'></child>
  </div>
</template>
<script>
import child from './child.vue'  // 引入子组件
export default {
  data () {
    return {
      imgHeight: 300,
    }
  },
  components: {
    child                    // 声明子组件
  },
  methods: {
    closeFuction () {
      console.log('叫爸爸！')
    },
    sonEmit (msg) {
      console.log('儿子你说啥？')
      console.log(msg)
    }
  }
}
</script>
```
`child.vue`  子组件

```html

<template>
  <div class="hello">
    <h1>我是子元素</h1>
    <h1>{{ title }}</h1>
    <button @click="clickEmit">点我给父元素传值</button>
  </div>
</template>

<script>
export default {
  name: 'child',
  // 接收父子组件参数
  props: {
    imgWidth: {
      type: Number,  // 数据类型
      default: 300   // 默认值
    },
    imgHeight: {
      type: Number
    },
    title: {
      type: String,
      default: ''
    },
    beforeClose: {
      type: Function,
      default: function () {
        console.log('你闭嘴');
      }
    }
  },
  created () {
    console.log(this.imgWidth)
    console.log(this.imgHeight)
    this.beforeClose()
  },
  methods: {
    // $emit给父组件传值
    clickEmit () {
      this.$emit('dadEmit', "你这个糟老头太坏了！")
    }
  }
}
</script>
<style scoped>
.hello {
  background: yellow;
}
</style>
```
#### **父传子 —— props**
1. 父组件传递数据时类似在标签中写了一个属性，如果是传递的数据是`data`中的自然是要在传递属性前加`：`(`v-bind`的缩写)，如果传递的是一个已知的固定值呢
    -  `字符串`是静态的可直接传入无需在属性前加`：`
    - `数字`，`布尔`，`对象`，`数组`，因为这些是js表达式而不是字符串，所以即使这些传递的是静态的，也需要前面加上`：`绑定，把数据放到`data`中引用，

2. 如果`prop`传到子组件中的数据是一个`对象`的话，要注意传递的是一个`对象引用`，虽然父子组件看似是分离的但最后都是在同一对象下。

    - 如果`prop`传到子组件的值只是作为初始值使用，且在父组件中不会变化赋值到`data`中使用
    - 如果传到子组件的`prop`的数据在父组件会被改变的，放到**计算属性**中监听变化使用。因为**如果传递的是个`对象`的话，只改变下面的某个属性子组件中是不会响应式更新的，如果子组件需要在数据变化时响应式更新那只能放到`computed`中或者用`watch`深拷贝`deep:true`才能监听到变化**
    - 当然如果你又需要在子组件中通过`prop`传递数据的变化做些操作，那么写在`computed`中会报警告，因为计算属性中不推荐有任何数据的改变，最好只进行计算。如果你非要进行数据的操作那么可以把监听写在`watch`（注意deep深拷贝）或者使用`computed`的`get`和`set`。
    - 
&emsp;但问题又来了，如果你传进来的是个`对象`，同时你又需要在子组件中操作传进来的这个数据，那么在父组件中的这个数据也会改变，因为你传递的只是个引用， 即使你把`prop`的数据复制到`data`中也是一样的，无论如何赋值都是引用的赋值，你只能对对象做**深拷贝**创建一个副本才能继续操作，你可以用JSON的方法先转化字符串在转成对象更方便一点
  - `JSON.stringify(obj)`      将JSON对象转为字符串。
  - `JSON.parse(string)`      将字符串转为JSON对象格式。

&emsp;所以在父子传递数据时要先考虑好数据要如何使用，否则你会遇到很多问题或子组件中修改了父组件中的数据，这是很隐蔽并且很危险的。

#### **子传父 —— $emit**

```javaScript
m.$emit( eventName, […args] )
参数：
{string} eventName // 父元素中定义的事件名称
[...args]          // 参数

// 触发当前实例上的事件。附加参数都会传给监听器回调。
```
&emsp;以上是Vue官网给`$emit`的定义。

&emsp;简而言之，可以通过监听当前实例上的自定义事件，通过`vm.$emit`触发父元素上定义的事件，将[...args]中的参数传给父元素


## 兄弟组件通信

&emsp;兄弟组件通信有两种方法，`eventBus`，`Vuex`。

### 模块通信 eventBus

&emsp;`eventBus`的原理是引入一个新的`vue`实例，然后通过分别调用这个实例的事件触发和监听来实现通信和参数传递。

`eventBus.js`文件 —— 我们一般会直接用一个公共文件来存放vue实例

```javaScript
import Vue from 'vue';  
export default new Vue(); 
``` 
&emsp;我们在`apple.vue`中监听一个事件

`apple.vue`文件
```html
<template>
  <div class="hello">
    <h1>我是苹果</h1>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import eventBus from './eventBus.js'

export default {
  name: 'orange',
  data () {
    return {
      title: 300
    }
  },
  // 我们在created钩子中监听方法
  created () {
    // 在created（）钩子中调用eventBus监听getTarget事件，并接受参数,绑定方法
    eventBus.$on('getTarget', this.getTarget)
    // eventBus.$on('getTarget', target => {  // 也可以在后面直接写方法
    //   this.title = target
    // })
  },
  beforeDestroy () {
    // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    eventBus.$off('getTarget', this.getTarget)
  },
  methods: {
    getTarget (param) {
      this.title = param
    }
  }
}
</script>
<style scoped>
.hello {
  background: red;
}
</style>
```
&emsp;我们在`orange.vue`中触发eventBus

`orange.vue`文件

```html
<template>
  <div class="hello">
    <h1>我是橙子</h1>
    <h1>{{ title }}</h1>
    <button @click="doSomething">点击触发eventBus</button>
  </div>
</template>

<script>
import eventBus from './eventBus.js'

export default {
  name: 'orange',
  data () {
    return {
      title: 300
    }
  },
  methods: {
    // $emit触发事件getTarget事件
    doSomething () {
      // 向getTarget方法传参22
      eventBus.$emit('getTarget', 22)
    }
  }
}
</script>
<style scoped>
.hello {
  background: orange;
}
</style>

```
&emsp;`eventBus`其实非常方便，任何的组件通信都能用它来完成。但是，我们会根据情况来选择更易维护的方式。因为`eventBus`比较不好找到对应的监听或者触发事件具体实现的地方，所以一般组件通信更考虑`Vuex`的实现方式。

&emsp;在模块之间通信利用`eventBus`，然后在模块内部，利用`Vuex`通信，维护数据，会在逻辑上比较清晰。

### 状态管理 Vuex 

&emsp;当非父子组件之间通信较多时，用`eventBus`很容易逻辑混乱，较难维护。`Vuex`将状态管理单独拎出来，应用统一的方式进行处理，可以理解为组件间公用的一个全局对象。

#### 使用Vuex

安装vuex，使用命令：

> npm install vuex --save

`store/index.js`
```javaScript
import Vuex from 'vuex' // 引入Vuex
import Vue from 'vue' // 引入Vue
// 使用Vuex
Vue.use(Vuex)

// 创建Vuex实例
const store = new Vuex.Store({
  // state：vuex中的数据源，我们需要保存的数据就保存在这里，可以在页面通过 this.$store.state.stateName来获取我们定义的数据；
  state: {
    stateName: '哈哈哈'
  },
  // mutations：修改store中的值唯一的方法就是提交mutation，可以在组件中使用 this.$store.commit('xxx') 提交 mutation
  mutations: {
    mutationsName (state, params) { // 定义更改state的方法，可以传参，必须是同步函数
      state.stateName = params
    }
  },
  // Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。类似于vue的methods。可以在组件中使用this.$store.dispatch('actionName', 'xxx')分发
  actions: {
    actionName (contest, params) { // 触发mutation 方法要用commit分发，以此改变state
      contest.commit('mutationsName', params)
    }
  },
  // getters：相当于Vue中的computed,可以用于监听、state中的值的变化，返回计算后的结果。可以在组件中使用this.$store.getters.getStateName获取其中的值
  getters: {
    getStateName: state => {
      return state.stateName
    }
  }

})
export default store // 导出store

```
`main.js`文件
```javaScript
// store为实例化生成的
import store from './store/index.js';
new Vue({
  el: '#app',
  store,           // 将store挂载到vue实例上
  render: h => h(App)
})
```
#### 在组件中使用

&emsp;如果我们不喜欢这种在页面上使用

> this.$store.state.stateName

> this.$store.getters.getStateName

> this.$store.dispatch('actionName', 'xxx')
> 
这种很长的写法，那么我们可以使用`mapState`、`mapGetters`、`mapActions`就不会这么麻烦了；

`child.vue` 文件
```html

<template>
  <div class="hello">
    <h1>我是香蕉</h1>
    mapState取值：<h2>{{ stateName }}</h2>
    mapGetters取值：<h2>{{ getStateName }}</h2>
    <button @click="clickAction">使用action改值</button>
    <button @click="clickMutation">使用mutation改值</button>
    <button @click="clickCommit">使用commit改值</button>
    <button @click="clickDispatch">使用dispatch改值</button>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'

export default {
  name: 'banana',
  computed: {
    ...mapGetters(['getStateName']),
    ...mapState(['stateName'])
  },

  methods: {
    // 使用辅助函数直接将触发函数映射到methods上
    ...mapActions(['actionName']),
    ...mapMutations(['mutationsName']),
    // 点击触发
    clickAction () {
      this.actionName('使用action改值')
    },
    clickMutation () {
      this.mutationsName('使用mutation改值')
    },
    clickCommit () {
      this.$store.commit('mutationsName', '使用commit改值')
    },
    clickDispatch () {
      this.$store.dispatch('actionName', '使用dispatch改值')
    }
  }
}
</script>
<style scoped>
.hello {
  background: yellow;
}
</style>

```
当兄弟组件很多，涉及到的处理数据庞大的时候，可以用到vuex中的modules，使得结构更加清晰
```javaScript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
vuex讲细篇幅很长，更多更复杂的内容，参考官方教程


## 6、总结


&emsp;路漫漫其修远兮，与诸君共勉。

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/Vue/Vue%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98%EF%BC%88%E4%B8%80%EF%BC%89%E2%80%94%E2%80%94ToDoList.md)**

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。