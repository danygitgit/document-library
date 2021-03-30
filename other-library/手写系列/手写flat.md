# [手写 flat](https://github.com/danygitgit/document-library)

> create by **db** on **2020-9-2 13:30:46**  
> Recently revised in **2021-3-30 18:00:04**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [flat](#chapter-1)
  - [实现 myFlat](#chapter-2)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;如题。

# <a  id="main-body">正文</a>

## <a  id="chapter-1">flat</a>

> [返回目录](#catalog)

详情请参考：[Array.prototype.flat() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

&emsp;flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

&emsp;也就是说，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维数组。

&emsp;该方法返回一个新数组，会移除数组中的空项，对原数据没有影响。

#### 语法：

`var newArray = arr.flat([depth])`

#### 参数：

- `：depth` 可选；指定要提取嵌套数组的结构深度，默认值为 1。

#### 返回值:

&emsp;一个包含将数组与子数组中所有元素的新数组。

#### 使用：

```js
var arr1 = [1, 2, [3, 4]]
arr1.flat()
// [1, 2, 3, 4]

var arr2 = [1, 2, [, 4, [5, 6]]]
arr2.flat()
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]]
arr3.flat(2)
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
arr4.flat(Infinity)
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## <a  id="chapter-2">实现 myFlat</a>

> [返回目录](#catalog)

代码实现：

### 递归实现

```js
Array.prototype.myFlat = function (dep = 1) {
  // 声明一个新数组
  let result = []
  // 遍历原数组
  this.forEach((item, index) => {
    // 当原数组内存在数组并且层级dep大于时递归
    if (Array.isArray(item) && dep > 0) {
      // 层级递减
      dep--
      // 使用concat链接数组
      result = result.concat(item.myFlat(dep))
    } else {
      result.push(item)
    }
  })
  return result
}
```

简洁版：

```js
// 重写数组flat方法
// 1.会去掉数组的空项
// 2.返回新数组

Array.prototype.myFlat = function (dep = 1) {
  return this.reduce((acc, val) => {
    return acc.concat(
      Array.isArray(val) && dep > 0
        ? // 这里的三目就是防止这个现象：[3].concat([4]) // 结果为[3, 4]
          val.myFlat(--dep)
        : Array.isArray(val)
        ? [val]
        : val
    )
  }, [])
}
```

### 循环实现

```js
Array.prototype.myFlat = function (dep = 1) {
  // 声明一个新数组
  let result = this
  // // 当原数组内存在数组并且层级dep大于时循环
  while (result.some(Array.isArray) && dep > 0) {
    // 连接数组，并去除空值
    result = [].concat(...result.filter((item) => item))
    dep--
  }
  return result
}
```

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;路漫漫其修远兮，与诸君共勉。 

### <a  id="reference-documents">参考文献</a>、

- [JS 数组扁平化(flat)方法总结详解 ](http://www.45fan.com/article.php?aid=19062442766002048192992081)

- [带你手动实现 JS 数组扁平化 flat()方法| CSDN - 选择远方](https://juejin.im/user/5b1a3eb7f265da6e572b3ada)

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
