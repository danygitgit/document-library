# [Echarts 提示框自定义显示百分号](https://github.com/danygitgit/document-library)

> create by **db** on **2021-3-13 13:01:09**  
> Recently revised in **2021-3-13 13:01:13**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)
- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;Echarts 提示框自定义显示百分号

# <a  id="main-body">正文</a>

## Echarts 提示框自定义显示百分号

```js
// Echarts提示框自定义显示百分号
tooltip: {
  trigger: 'axis',
   formatter: '{b0}<br/>' +
       '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#c23531"></span>{a0}:{c0}%<br/>' +
       '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#2F4554"></span>{a1}:{c1}%<br/>' +
       '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#61A0A8"></span>{a2}:{c2}%<br/>' +
       '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#D48265"></span>{a3}:{c3}%<br/>' +
       '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#91C7AE"></span>{a4}:{c4}%<br/>', // 显示百分比
   padding:5, // 内边距
   axisPointer:{
       type:'cross',
       lineStyle:{
           type:'dashed'
       }
   }
},
```

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;这里是总结内容！

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
