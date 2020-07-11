# [Markdown 博客模板](https://github.com/danygitgit/document-library)

> create by **db** on **2020-6-27 15:43:09**  
> Recently revised in **2020-6-27 16:34:03**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a name="menu-catalog" id="menu-catalog">目录</a>

- <a name="menu-preface" id="menu-preface"></a>[前言](#preface)

- <a name="menu-main-body" id="menu-main-body"></a>[正文](#main-body)

  - <a name="menu-chapter-1" id="menu-chapter-1"></a>[一、第一章](#chapter-1)

    - [1.绝对定位](#chapter-1-1)
    - [2、margin 负值](#chapter-1-2)
    - [3、css3 transform](#chapter-1-3)
    - [3、css3 transform](#chapter-1-4)
    - [3、css3 transform](#chapter-1-5)


- <a name="menu-chapter3" id="menu-chapter3"></a>[总结](#chapter3)

  - [参考文档](#reference-documents)

# <a name="preface" id="preface">前言</a>

> [返回目录](#menu-catalog)

&emsp;这里是前言内容！

# <a name="main-body" id="main-body">正文</a>

&emsp;这里是正文内容！






复制代码
4、flex 布局方式

````html
<div class="box">
  <div class="child">child</div>
</div>
<style>
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
```　
 5、table-cell 方式 
```html
<div class="box">
  <div class="child">child</div>
</div>
<style>
  .box {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
</style>
````

## <a name="chapter-1" id="chapter-1">一、第一章</a>

&emsp;第一章开始内容！

### <a name="chapter-1-1" id="chapter-1-1">1.绝对定位</a>

> [返回目录](#menu-catalog)

1、绝对定位（常用于登录模块）
备注：前提条件 div 需要有宽高

```html
<div class="box"></div>
<style>
  .box{
  position:absolute/fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin:auto;
</style>
```

### <a name="chapter-1-2" id="chapter-1-2">2、margin 负值</a>

> [返回目录](#menu-catalog)

2、margin 负值
备注：前提条件 div 需要有宽高

```HTML
<div class="box"></div>
<style>
.box{
width:200px;
height: 200px;
position: absolute;
left:50%;
top:50%;
margin-left:-100px;
margin-top:-100px;
}
</style>
```

### <a name="chapter-1-3" id="chapter-1-3">3、css3 transform</a>

3、css3 transform
备注：用于不确定当前 div 的宽度和高度

复制代码

```html
<div class="box"></div>
<style>
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

### <a name="chapter-1-4" id="chapter-1-4">3、css3 transform</a>


### <a name="chapter-1-5" id="chapter-1-5">3、css3 transform</a>

# <a name="chapter3" id="chapter3">总结</a>

> [返回目录](#menu-catalog)

&emsp;这里是总结内容！

### <a name="reference-documents" id="reference-documents">参考文献</a>

- [Markdown 博客模板 | 掘金-豆包君](https://juejin.im/user/5b1a3eb7f265da6e572b3ada)

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
