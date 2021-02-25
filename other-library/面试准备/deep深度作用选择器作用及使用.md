[聊聊三栏布局](https://github.com/danygitgit/document-library)
===
> create by **db** on **2020-5-12 01:23:06**   
> Recently revised in **2020-5-12 02:42:55**
> 
**闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a name="chapter-menu" id="chapter-menu">目录</a>

- <a name="catalog-chapter-1" id="catalog-chapter-1"></a>[前言](#chapter-1)

- <a name="catalog-chapter-2" id="catalog-chapter-2"></a>[正文](#chapter-2)


- <a name="catalog-chapter3" id="catalog-chapter3"></a>[总结](#chapter3) 

# <a name="chapter-1" id="chapter-1">前言</a>

> [返回目录](#chapter-menu)


# <a name="chapter-2" id="chapter-2">正文</a>

/deep/深度作用选择器作用及使用

努力吧灰灰兔 2019-12-15 12:29:38  5636  收藏 16
分类专栏： webpack和vue的结合使用
版权
作用:
当你不想写全局样式,想写scoped局部样式不污染全局,又想更改子组件内的样式,此时就可以用/deep/深度作用选择器.满足你所有想法

初识/deep/时百度搜索看了好多人的文章,有些内容不全有些理解错误(仅个人观点)
自己记录下

在了解/deep/之前需先了解scoped属性作用
看博文https://blog.csdn.net/weixin_45842655/article/details/103490900或者点我跳转
看官方文档 比较全面
https://vue-loader.vuejs.org/zh/guide/scoped-css.html或者点我跳转
一: scoped属性
1.scoped会给局部区域的非组件元素和组件根元素(不含组件内子元素)增加一个不重复的data属性
2.加了scoped后若写样式,会在每句css选择器的末尾（编译后生成的css语句）加一个当前组件(大的.a)的data属性选择器,若多层也是给最后末尾设置

因给.c设置了.a的属性选择器,然后.c属于子组件内的子元素不会增加.a的属性所以自然获取不到此元素 样式无效

//.a为大div父组件 .b为子组件根元素 .c为子组件内的子元素
 .a .b .c{//多层
    color:red
  }
  //会渲染成
  .a .b .c[data-v-2311c06a]{
    color:red
  }
1
2
3
4
5
6
7
8
二: /deep/深度作用选择器
当scoped时,#app是父组件 button是子组件内的子元素 [data-v-7ba5bd90]是app的属性

//渲染前的源代码 
  #app button{
    background-color: red;
  }
  #app /deep/ button{
    background-color: yellow;
  }
1
2
3
4
5
6
7
//不加/deep/的渲染效果 样式无效
#app button[data-v-7ba5bd90] {
	background-color: red;
}
//加了/deep/的渲染效果 样式有效
#app[data-v-7ba5bd90] button {
	background-color: yellow;
}
1
2
3
4
5
6
7
8
[data-v-7ba5bd90]是app的属性,button是子组件内的子元素并无此属性,所以不加/deep/样式,获取不到元素,样式无效
加了/deep/后 属性选择器跑到前面去了
1. 若/deep/后有多层嵌套

//渲染前
  #app /deep/ button{
    background-color: yellow;
    span{
      color:blue;
    }
  }
//渲染后 样式有效
#app[data-v-7ba5bd90] button span {
	color: blue;
}
1
2
3
4
5
6
7
8
9
10
11
2. 再换种写法 移动/deep/位置

//渲染前
  #app button{
    /deep/ span{
      color:pink;
    }
  }
//渲染后 data-v-7ba5bd90是#app的属性 所以无效
#app button[data-v-7ba5bd90] span {
	color: pink;
}
1
2
3
4
5
6
7
8
9
10
3. 再换一种 又加个子元素

//渲染前 
  #app button{
    span{
      /deep/ span{
        color:pink
      }
    }
  }
//渲染后
#app button span[data-v-7ba5bd90] span {
	color: pink;
}
1
2
3
4
5
6
7
8
9
10
11
12
综上可以看出.在哪里加的/deep/ ,data属性选择器就会跑到写的上一层去.

4. 若写多个/deep/
多个/deep/的情况下,只有最外层的/deep/有效,内层的其他/deep/都是无效的,写了也没意义,不建议写.

//渲染前
  #app /deep/ button{
    /deep/ span{
        color:yellow
    }
  }
//打包后的样式显示
#app[data-v-7ba5bd90] button /deep/ span {
	color: yellow;
}
1
2
3
4
5
6
7
8
9
10
完结撒花
————————————————
版权声明：本文为CSDN博主「努力吧灰灰兔」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45842655/article/details/103547362

# <a name="chapter3" id="chapter3">总结</a>

> [返回目录](#chapter-menu)




* **参考文献**：

1. [CSS实现三栏布局(5种)](https://www.cnblogs.com/webtaotao/p/11031723.html)
2. [css实现三栏布局的几种方法及优缺点](https://blog.csdn.net/kaixinyitian77/article/details/92010198)


 
**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议 
> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2020/2/2/17001b902951cd22?imageslim" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。

