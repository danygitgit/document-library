@[关于 Git 提交规范](https://github.com/danygitgit/document-library)

> create by **db** on **2021-1-25 16:34:46**  
> Recently revised in **2021-1-25 19:34:56**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)

- [正文](#main-body)

- [总结](#summary)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;无规矩不成方圆，编程也一样。

&emsp;如果你有一个项目，从始至终都是自己写，那么你想怎么写都可以，没有人可以干预你。可是如果在团队协作中，大家都张扬个性，那么代码将会是一团糟，好好的项目就被糟践了。不管是开发还是日后维护，都将是灾难。

&emsp;这时候，有人提出了何不统一标准，大家都按照这个标准来。于是 ESLint，JSHint 等代码工具如雨后春笋般涌现，成为了项目构建的必备良品。

&emsp;Git Commit 规范可能并没有那么夸张，但如果你在版本回退的时候看到一大段糟心的 Commit，恐怕会懊恼不已吧。所以，严格遵守规范，利人利己。

# <a  id="main-body">正文</a>

> [返回目录](#catalog)

## 提交规范的作用

&emsp;大多数情况下，看提交历史的人跟提交代码的人都不是同一个人，当别人阅读你的提交历史时，他很可能是不知道具体代码细节的，你如何在最短的时间内让他一眼知道每次提交的意义：

- 每次提交影响的具体范围？
- 这个 bug 在哪次提交中被修复了？
- 这个新功能是在哪次提交中增加的？
- 修改是否向下兼容？
- 是否回滚了代码？
- 是否只是修改了文档、调整了代码格式？
- 是否修改了测试、是否进行了重构？
- 是否对代码进行了性能优化？

## 提交规范的格式

&emsp;用什么规范？

&emsp;现在市面上比较流行的方案是**约定式提交规范**（Conventional Commits），它受到了 Angular 提交准则的启发，并在很大程度上以其为依据。

&emsp;`约定式提交规范`是一种基于提交消息的轻量级约定。 它提供了一组用于创建清晰的提交历史的简单规则；这使得编写基于规范的自动化工具变得更容易。这个约定与 SemVer 相吻合，在提交信息中描述新特性、bug 修复和破坏性变更。

&emsp;它的 message 格式如下:

```js
<type>[optional scope]: <description> // header
// 空一行
[optional <body>]
// 空一行
[optional <footer(s)>]

```

举个简单的例子：

```
feat(config): 允许 config 对象直接从其他 config 继承

BREAKING CHANGE: 在 config 对象中增加 `extends` 字段，用于从其他继承 config

close issue #23
```

当然我们也可以写的简洁一些

```
feat: 允许 config 对象直接从其他 config 继承
```

**注：**

- 在命令行里 git commit 时，如果你想进行多行 commit 编辑，可以通过 `git commit -a` 进入编辑界面；如果是单行，可以直接 `git commit -m 'COMMIT MESSAGE'` 完成提交。

## 格式讲解

### 一. header(必填)

&emsp;header 部分只有一行，包括三个字段：`type`（必需）、`scope`（可选）和 `description`（必需）。

&emsp;总的来说，关键就是 `header` 这部分，至于`<body>`和`<footer(s)>`可省略

例如:

```
feat:新增财务报表
```

#### 1. type(必填)

&emsp;type 为必填项，用于指定 commit 的类型，约定了 `feat`、`fix` 两个主要 type，以及 `docs`、`style`、`build`、`refactor`、`revert` 五个特殊 type，其余 type 暂不使用。（参考[人人贷大前端技术中心](https://juejin.cn/post/6844903871832145927#heading-1)）

```python
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
```

**注：**

- 当一次改动包括主要 type 与特殊 type 时，统一采用主要 type。

#### 2. scope(选填)

&emsp;可选项，用来说明此次修改的影响范围，格式为项目名/模块名，可以是一个文件的地址，如 `/lib/utils`；也可以是某个功能点 parser，不建议超过两个单词

如：

```
.all       //表示影响面大 ，如修改了网络框架 会对真个程序产生影响
.loation   //表示影响小，某个小小的功能
.module    //表示会影响某个模块 如登录模块、首页模块 、用户管理模块等等
```

**注：**

- 如果一次 commit 修改多个模块，建议拆分成多次 commit，以便更好追踪和维护。

#### 3. description(必填)

&emsp;必填项，是 commit 目的的简短描述，不超过 50 个字符。

规范如下：

- 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

### 二. body(选填)

&emsp;可选项，具体的修改信息 应该尽量详细，一般不用写。

&emsp;body 主要描述改动之前的情况及修改动机，对于小的修改不作要求，但是重大需求、更新等必须添加 body 来作说明。

### 三. footer(s)(选填)

&emsp;可选项，放置备注啥的，如果是 bug ，可以把 bug id 放入，一般不用写。

## 相关工具推荐

## commitizen

&emsp;这个一款基于 Node 的交互式约束命令工具，适合喜欢使用命令行的小伙伴。

&emsp;使用详情请参考 [Git commit message 规范 | 掘金 - 人人贷大前端技术中心 ](https://juejin.cn/post/6844903871832145927#heading-1)

## git 设置模板

&emsp;对于喜欢使用 如sourceTree一样有着界面的git工具的同学，就可以采用 git 配置模板的方式。

&emsp;使用详情请参考 [老鸟都应该注意的git 提交规范| 博客园 - Four two ](https://juejin.cn/post/6844903871832145927#heading-1)


# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;当然了，实际中，也不一定要采用这种规则，但是你可以借鉴它的，然后自己那边再根据实际情况变动。

&emsp;提交规范在于以后维护方面是非常有利的，先不说远的，近的话，使用 Git 时，合并代码通常会有冲突，有些突发意外，比如另外的人不小心将你的代码覆盖了，而且这个功能已经是很久之前的了，那怎么办呢？通常情况，本地有备份固然好，但是估计也没有那个人会将自己每次提交，都本地保存一份，因为那样显得效率低下和根据项目的周期和需求，项目越来越大，这样的话，本地备份的包也会越来越多。没有人会选择这种方式。最后的方式就是版本回退，当然了，前提是你提交信息必须简洁明了，不然的话像鬼知道是哪个。

&emsp;另外关于什么时候提交，尽可能是完成一个新的功能或者是优化某个功能，解决某个 bug 等等就提交。但是这里有个前提就是，你本地必须测试没有问题，否则那样等于做无用工。

&emsp;路漫漫其修远兮，与诸君共勉。

## 参考文档：

- [关于 Git 提交规范 | 博客园 - 挑战者 V ](https://www.cnblogs.com/youcong/p/9470585.html)

- [Git commit message 规范 | 掘金 - 人人贷大前端技术中心 ](https://juejin.cn/post/6844903871832145927#heading-1)

- [老鸟都应该注意的git 提交规范| 博客园 - Four two ](https://juejin.cn/post/6844903871832145927#heading-1)

- [Git 提交规范 | 知乎 - yinfxs ](https://zhuanlan.zhihu.com/p/67804026)

- [template_git | GitHub - ctaodream](tps://github.com/ctaodream/template_git/blob/master/.template_git)

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2c2a873bdad472f88ee6143620245de~tplv-k3u1fbpfcp-zoom-1.image" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
