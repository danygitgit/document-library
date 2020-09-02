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

&emsp;第一章内容！
1、设置定时器

```JS
mounted() {
   this.timer = setInterval(function(){
		//执行内容
	}, 60000);
},
```

2、清除定时器
```JS
beforeDestroy() {
    clearInterval(this.timer);
}
```

## <a  id="chapter-2">二、第二章</a>

> [返回目录](#catalog)

&emsp;第二章内容！

js实现定时任务，每隔N秒请求后台
```JS
//生成了随机秒数60-150之间
	var num = Math.round(Math.random()*90+60);
	alert(num);
	//循环执行，每隔60-150秒钟执行一次showMsgIcon() 
	window.setInterval(showMsgIcon, 1000*num); 
	function showMsgIcon(){ 
		$.getJSON("${ctx}/todoTask/getTodoTaskList.do?processed=0", function(result){
			if(result.rows.length > 0){
				var msgPicFadeOutIn = setInterval(function(){$("#msgPic").fadeOut(500).fadeIn(500);}, 1000);
				$("#msgPic").attr("title", "您有待办任务、未读消息，点击查看");
				$("#msgPic").click(function(){
					if(msgPicFadeOutIn != ""){
						clearInterval(msgPicFadeOutIn);
						msgPicFadeOutIn = "";
					}
					$("#msgPic").fadeOut();
					toAction("/todoTask/showMyUnProcessedTask.do", "我的待办任务", this);
				});
			}else{
				$("#msgPic").fadeOut();
			}
		}); 
	}
```

## <a  id="chapter-3">三、第三章</a>

> [返回目录](#catalog)

&emsp;第三章内容！

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

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
