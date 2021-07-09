[关于 GET  和 POST 的区别](https://github.com/danygitgit/document-library)
===

> create by **db** on **2021-2-25 20:00:34**   
> Recently revised in **2021-7-9 16:26:51**
>  

**闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a name="chapter-menu" id="chapter-menu">目录</a>

* <a name="catalog-chapter-1" id="catalog-chapter-1"></a>[前言](#chapter-1)

* <a name="catalog-chapter-2" id="catalog-chapter-2"></a>[正文](#chapter-2)

* <a name="catalog-chapter3" id="catalog-chapter3"></a>[总结](#chapter3) 
# <a name="chapter-1" id="chapter-1">前言</a>

> [返回目录](#chapter-menu)

 &emsp; `GET` 和 `POST` 是HTTP请求的两种基本方法，要说它们的区别，接触过WEB开发的人都能说出一二。

&emsp; 最直观的区别就是 `GET` 把参数包含在URL中， `POST` 通过request body传递参数。

&emsp; 你可能自己写过无数个 `GET` 和 `POST` 请求，或者已经看过很多权威网站总结出的他们的区别，你非常清楚知道什么时候该用什么。

# <a name="chapter-2" id="chapter-2">正文</a>

> [返回目录](#chapter-menu)

&emsp; 首先让我们回忆一下他们的区别:

| 区别                         | `GET` | `POST` |
| ---------------------------- | ------------------------------------------------- | ------------------ |
| 浏览器回退                   | 回退时是无害的                                    | 会再次提交请求     |
| URL地址记录                  | URL可以被记录，用于再次访问                       | 不可以             |
| 浏览器缓存                   | 主动缓存                                          | 可手动设置         |
| 编码方式                     | 只能进url编码                                     | 支持多种编码方式   |
| 参数会否保留在浏览器历史记录 | 完整保留                                          | 不保留             |
| 参数长度                     | 有长度限制                                        | 无                 |
| 参数数据类型                 | 只接受ASCII字符                                   | 无限制             |
| 参数位置                     | 通过URL传递                                       | 放在Request body中 |
| 安全性                       | 低，参数直接暴露在URL上，所以不能用来传递敏感信息 | 相对高一些         |

&emsp; 其实记住表格的内容就已经及格了。不过，仅仅是这样子吗？

&emsp; `GET` 和 `POST` 是什么？

* HTTP协议中的两种发送请求的方法。

&emsp; HTTP是什么？

* HTTP是基于TCP/IP的关于数据如何在万维网中如何通信的协议。

&emsp; HTTP的底层是TCP/IP。所以 `GET` 和 `POST` 的底层也是TCP/IP，也就是说， `GET` / `POST` 都是TCP链接。 `GET` 和 `POST` 能做的事情是一样一样的。你要给 `GET` 加上request body，给 `POST` 带上url参数，技术上是完全行的通的。

&emsp; 那么，“标准答案”里的那些区别是怎么回事？

&emsp; 在我大万维网世界中，TCP就像汽车，我们用TCP来运输数据，它很可靠，从来不会发生丢件少件的现象。但是如果路上跑的全是看起来一模一样的汽车，那这个世界看起来是一团混乱，送急件的汽车可能被前面满载货物的汽车拦堵在路上，整个交通系统一定会瘫痪。

&emsp; 为了避免这种情况发生，交通规则HTTP诞生了。HTTP给汽车运输设定了好几个服务类别，有 `GET` , `POST` , PUT, DELETE等等，HTTP规定，当执行 `GET` 请求的时候，要给汽车贴上 `GET` 的标签（设置method为 `GET` ），而且要求把传送的数据放在车顶上（url中）以方便记录。如果是 `POST` 请求，就要在车上贴上 `POST` 的标签，并把货物放在车厢里。

&emsp; 当然，你也可以在 `GET` 的时候往车厢内偷偷藏点货物，但是这是很不光彩；也可以在 `POST` 的时候在车顶上也放一些数据，让人觉得傻乎乎的。HTTP只是个行为准则，而TCP才是 `GET` 和 `POST` 怎么实现的基本。

&emsp; 但是，我们只看到HTTP对 `GET` 和 `POST` 参数的传送渠道（url还是requrest body）提出了要求。“标准答案”里关于参数大小的限制又是从哪来的呢？
图片

&emsp; 在我大万维网世界中，还有另一个重要的角色：运输公司。不同的浏览器（发起http请求）和服务器（接受http请求）就是不同的运输公司。虽然理论上，你可以在车顶上无限的堆货物（url中无限加参数）。

&emsp; 但是运输公司可不傻，装货和卸货也是有很大成本的，他们会限制单次运输量来控制风险，数据量太大对浏览器和服务器都是很大负担。业界不成文的规定是，（大多数）浏览器通常都会限制url长度在2K个字节，而（大多数）服务器最多处理64K大小的url。

&emsp; 超过的部分，恕不处理。如果你用 `GET` 服务，在request body偷偷藏了数据，不同服务器的处理方式也是不同的，有些服务器会帮你卸货，读出数据，有些服务器直接忽略，所以，虽然 `GET` 可以带request body，也不能保证一定能被接收到哦。

&emsp; 好了，现在你知道， `GET` 和 `POST` 本质上就是TCP链接，**并无差别**。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。

# <a name="chapter3" id="chapter3">总结</a>

> [返回目录](#chapter-menu)

**附**
&emsp; 本文系转载，其中作者举出了发包方式的区别：

* 对于`GET`方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
* 而对于`POST`，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

&emsp; 然而这个存在争议，等有时间详细了解之后再说；搜罗了一些相关博文，具体可看**参考文章**。不过能记住这些就能拿80分了，莫装B就好。

**参考文章**：
  
1. [GET和POST两种基本请求方法的区别](https://www.cnblogs.com/logsharing/p/8448446.html)
2. [从TCP层面分析POST请求 |开源博客-cloes](https://my.oschina.net/cloes/blog/1604256)
3. [HTTP POST请求发送两个TCP包？| CSDN-john-zen](https://blog.csdn.net/zerooffdate/article/details/78962818)

 
**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议 

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2020/2/2/17001b902951cd22?imageslim" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
