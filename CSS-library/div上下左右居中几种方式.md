# [元素上下左右居中几种方式](https://github.com/danygitgit/document-library)

> create by **db** on **2020-8-28 19:00:54**  
> Recently revised in **2020-8-28 19:00:58**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a name="menu-catalog" id="menu-catalog">目录</a>

- <a name="menu-preface" id="menu-preface"></a>[前言](#preface)

- <a name="menu-main-body" id="menu-main-body"></a>[正文](#main-body)

  - <a name="menu-chapter-1" id="menu-chapter-1"></a>[子元素上下左右居中几种方式](#chapter-1)

    - [绝对定位](#chapter-1-1)
    - [transform](#chapter-1-3)
    - [flex 布局方式](#chapter-1-4)
    - [table-cell 方式](#chapter-1-5)

- <a name="menu-chapter3" id="menu-chapter3"></a>[总结](#chapter3)

# <a name="preface" id="preface">前言</a>

&emsp;作为一个前端切图仔，页面布局是必会技能之一。本文总结了部分常用的盒模型上下左右居中几种方式。现分享给大家，以供参考。


# <a name="main-body" id="main-body">正文</a>

## <a name="chapter-1" id="chapter-1">子元素上下左右居中几种方式</a>

### <a name="chapter-1-1" id="chapter-1-1">1.绝对定位</a>

> [返回目录](#menu-catalog)

**实现方式：**

- 绝对定位+margin: auto;

**备注：**

- 子元素需要有宽高

```html
<div class="father_box">
  <div class="child_box"></div>
</div>
<style>
  .father_box {
    width: 200px;
    height: 200px;
    background: yellow;
    position: relative;
  }

  .child_box {
    height: 100px;
    width: 100px;
    background: red;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>
```

### <a name="chapter-1-3" id="chapter-1-3">transform</a>

备注：用于不确定当前 div 的宽度和高度

**实现方式：**

- Transform 属性应用于元素的 2D 或 3D 转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。

**备注：**

- 可以用于不确定当前子元素的宽度和高度

```html
<div class="father_box">
  <div class="child_box"></div>
</div>
<style>
  .father_box {
    width: 200px;
    height: 200px;
    background: yellow;
    position: relative;
  }

  .child_box {
    width: 100px;
    height: 100px;
    background: red;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

### <a name="chapter-1-4" id="chapter-1-4">flex 布局方式</a>

**实现方式：**

- flex(弹性盒模型)，详见[Flex 布局教程 | 阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

**备注：**

- 只需要父元素设置样式

- 可以用于不确定当前子元素的宽度和高度

```html
<div class="father_box">
  <div class="child_box"></div>
</div>
<style>
  .father_box {
    width: 200px;
    height: 200px;
    background: yellow;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .child_box {
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
```

### <a name="chapter-1-5" id="chapter-1-5">table-cell</a>

**实现方式：**

- `table-cell`可以赋予`div`类似于<table>等标签的布局特性，详见[display:table-cell 实现水平垂直居中](https://www.cnblogs.com/yangshifu/p/6954364.html)

**备注：**

- 这在子元素不确定宽高和数量时，特别实用

- table-cell 不感知 margin，在父元素上设置 table-row 等属性，也会使其不感知 height。

```html
<div class="father_box">
  <div class="child_box"></div>
</div>
<style>
  .father_box {
    width: 200px;
    height: 200px;
    background: yellow;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .child_box {
    width: 100px;
    height: 100px;
    background: red;
    margin: auto;
  }
</style>
```

# <a name="chapter3" id="chapter3">总结</a>

&emsp;路漫漫其修远兮，与诸君共勉。

&emsp;2020，诸位珍重！！！

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
