项目中想统计页面的点击次数、浏览人数等，类似百度统计吧，但是很简单，就很随意的功能。
 
**实现思路打算：**

> 前端页面，ajax 直接传递一些相关参数，记录到 mysql 中，然后后台分析...

 ```
	mysql 字段：
		id
		user_id - 如果用户登录，顺带记录下 uid
		unique_id - 唯一标识
		path - 访问页面路径
		user_agent - 记录用户的完成 user agent
		device - 设备(pc、android、ios等，对 user agent 的解析)
		created_at
		updated_at
 ```

功能很简单，但是有个问题，如何识别 "唯一用户"，这个并不是基于我们用户登录后，进行统计，没法通过用户的 uid 来判断。
 
一般认定的唯一用户应该是：只要通过不同的设备端口，来访问页面，就属于不同的用户。即使现实中同一用户，使用了不同的设备，例如：我通过手机和电脑，各访问了一次，这也算不同的用户。
 
我没看过百度统计的原理，想到的唯一性，就是通过用户的 ip 和 user agent md下作为用户的唯一值(但这种应该相当的不准确，同一区域的ip可能都相同，加上访问的 user agent 重复性也太高，这种只适合粗略的统计下)。
 
同事可能了解过点，是给每个用户从后端设置上 cookie 来记录唯一用户。但是使用 cookie 的缺点是，当用户 "清除浏览器缓存"，会将 cookie 清除掉。
 
开始百度，搜索到一篇问题：
	https://segmentfault.com/q/1010000000670397
 
里面提到了2个方案：
evercookie：
	https://github.com/samyk/evercookie
 
fingerprintjs：
	https://github.com/Valve/fingerprintjs
 
简单介绍下：

**evercookie：**

evercookie 是在浏览器中生成一个极其持久的 cookie。它的终极目标是，即使用户已经删除了标准的 cookie，Flash cookies，以及其他的一些相关数据，仍然能够识别出客户端的唯一性。

evercookie 的实现原理是，将 cookies 数据存储到尽可能多的浏览器存储机制中。如果从任意的存储机制中，删除了 cookies 数据，只要有一个存储机制中的 cookies 数据是完好的，evercookie 都会在其他存储机制中，重新创建 cookies 数据。

如果 Flash LSO、Silverlight 或 Java 机制可用，Evercookie 甚至可以在同一客户机上的不同浏览器之间传播 cookie!(这几个机制，支持 cookie 跨同一设备的不同浏览器)

文章提到了，好多浏览器的 "存储机制"，我们非常有必要了解下！！！

```
HTTP Cookies
Local Storage
Session Storage
Global Storage
...
```
还有未实现的技术：

TLS Session Resumption

HPKP
...

**注意事项：**

Evercookie 可能会给我们和我们的用户带来潜在的问题：

1. 一些存储机制，会在客户端浏览器中，加载 Silverlight 或 Flash。在一些浏览器中，可能会加载的比较慢，并且伴随着大量的磁盘抖动。在更老的移动设备上，还可能会网站无法渲染。

2. 使用的 CSS History Knocking 技术，会在首次设置 cookie 时，产生大量的 HTTP 请求。

3. 在某些圈子里，认为使用 Evercookie 过于粗暴。所以，在生产环境中，使用 Evercookie，需要考虑我们的声誉和受众。

4. 浏览器供应商，正在尽最大努力，来填补 Evercookie 利用的许多漏洞技术。这对互联网发展来说是好事，但同时也意味着现在 evercookie 正常使用的技术，以后可能就失效了。(比较关键！)

使用：
```html
<script type="text/javascript" src="evercookie.js"></script>
<script>
	var ec = new evercookie();

	// 设置 cookie
	ec.set('id', '123456');

	// 获取 cookie，传递一个简单函数
	ec.get('id', function(value){
		console.log('cookie value is ' + value);
	});

	// 获取 cookie，传递一个高级函数(第二个参数，是 evercookie 所有的 "存储机制")
	ec.get('id', function(value, all_candidates){
		console.log('cookie value is ' + value);
		for(var i in all_candidates){
			document.write('storage mechanism ' + i + ' returned: ' + all_candidates[i] + '<br>');
		}	
	});
</script>
```

源码文件：

> git clone https://github.com/samyk/evercookie.git

目录结构：

```
assets/
css/
js/
php/
index.html
```

简单解析：

我们可以打开 index.html 查看，作者的使用方法：

1. 引入的 js 文件，包含的 java 相关的存储机制不了解：
```html
<script type="text/javascript" src="js/swfobject-2.2.min.js"></script>
<script type="text/javascript" src="http://www.java.com/js/dtjava.js"></script>
<script type="text/javascript" src="js/evercookie.js"></script>
```

2. 实例化时的配置：

```javascript
// 这里对应着我们下载的源码的访问目录(结合自己项目使用)
var ec = new evercookie({
	baseurl: '/evercookie', http://localhost/evercookie
	asseturi: '/evercookie/assets', http://localhost/evercookie/assets
	phpuri: '/evercookie/php' http://localhost/evercookie/php
});
```

## 总结：

evercookie 应该是个识别客户端唯一性的好方法，各种存储机制，最大程度上保证了可靠性。项目中应该可以采用。(不过目前我还没有在项目中使用，只是先记录个笔记，知道有这个方法！大家有兴趣可以自己尝试！)

fingerprintjs：

根据浏览器的 user agent、screen color depth、language、安装的支持 MIME 的插件、timezone offset，以及浏览器的一些其他能力，例如：local storage、session storage。然后使用了 'murmur' hash 函数，来生成唯一值。

这个原理，其实和最初想的根据用户的 ip 和 user agent 来通过 md5 来生成唯一值，一个道理，不过作者加入了更多内容，来保证更精确，以及使用了 murmur 更快速！

作者经过了4个月的生产测试，统计的结果是：

1>89% 的准确率
2>手机端的准确率好像很差
3>如果你的应用是基于 PC，同时能忍受 10-12% 的误差，可以使用。(作者自己公司，最终移除了该方案！)

fingerprintjs 作者写的关于 fingerprintjs 的博文，记录了自己的实现过程：

http://valve.github.io/blog/2013/07/14/anonymous-browser-fingerprinting/

hash 函数，为什么使用了 Murmur：

https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed

作者参考了 murmur 算法 javascript 的实现，将它添加到了 fingerprintjs 代码中

https://github.com/garycourt/murmurhash-js

为了抛弃对 jquery 的依赖，也在 fingerprintjs 实现了 each() 和 map() 函数，不依赖任何第三方类库

使用方法，参考：

http://valve.github.io/fingerprintjs/

获取客户端唯一值：

var fingerprint = new Fingerprint().get();

自定义 hash 函数：
var hasher = new function(value, seed){ return value.length % seed; }
var fingerprint = new Fingerprint(hasher).get();

查看了下源码，可自定义 options 有：
```javascript
if (typeof options == 'object'){
		this.hasher = options.hasher;
		this.screen_resolution = options.screen_resolution;
		this.screen_orientation = options.screen_orientation;
		this.canvas = options.canvas;
		this.ie_activex = options.ie_activex;
} else if(typeof options == 'function'){
		this.hasher = options;
}
```
1. options 可以只传递一个 function，即表示 hash 函数

2. options 可以传递一个对象

> hasher - hash 函数(function)

// 作者在文章中，还专门提到了 '屏幕分辨率' 的问题：

// 最初也添加了屏幕分辨率，但一位同事建议可以在一台笔记本电脑上使用多台显示器，例如在办公室工作时连接外接显示器，所以将其删除

// 外接屏幕，其实还是同一个客户端，但是具有不同的分辨率，这里交给我们自己自定义了

```
screen_resolution - 是否添加 '屏幕分辨率' 识别(boolean)
screen_orientation - 是否添加 '屏幕方向' 识别(boolean)
canvas - 是否添加 'canvas' 识别(boolean)
ie_activex - 是否添加 'ActiveXObject' 识别(boolean)
```
 
