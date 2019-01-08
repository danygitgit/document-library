@[Git笔记](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/Git%E5%91%BD%E4%BB%A4%E5%85%A5%E9%97%A8.md)

> create by **db** on **2019-1-7 13:48:41**   
> Recently revised in **2019-1-7 15:58:48**

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/Git%E5%91%BD%E4%BB%A4%E5%85%A5%E9%97%A8.md)**

&emsp;查阅网上诸多资料，并结合自己的学习经验，写下这篇玩转GitHub，以记录自己的学习心得。现分享给大家，以供参考。

&emsp;作为一只前端菜鸟，这是我掘金分享的第三篇文章。如有不足，还请多多指教，谢谢大家。

# 前言

&emsp;参考文献：

- [Git教程 | 廖雪峰的官方网站-廖雪峰 ](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
- [如何使用 GitHub？ | 知乎-珊姗是个小太阳](http://www.zhihu.com/question/20070065/answer/79557687)
- [GitHub 是怎样的一个存在？| 知乎-古土雷柏](https://www.zhihu.com/question/28976652/answer/322376795)
- [两小时学会Git玩转Github | CSDN-唯恋殊雨](https://blog.csdn.net/tichimi3375/article/details/79844514)
- [GitHub 系列之「怎样使用 GitHub？」| CSDN-周小董](https://blog.csdn.net/xc_zhou/article/details/80637759)

注：有的文章没找到原创，只有转载出处链接，见谅！

## 什么是GitHub

&emsp;“全球最大同性交友网站”

<div style="text-align: right">——摘自[维基百科](https://zh.wikipedia.org/wiki/GitHub)</div>

&emsp;github是共产主义在软件开发领域的具体实现样板之一，即以生产资料社会公有制为基础（代码开源），以社会化合作（离散化的个人、组织等社会颗粒）为生产方式，主要采用合作社组织形式（项目组）的技术支撑平台。

<div style="text-align: right">——摘自[古土雷柏的知乎回答](https://www.zhihu.com/question/28976652/answer/322376795)</div>

&emsp;简单来说，Git 是一个管理你的「代码的历史记录」的工具。

<div style="text-align: right">——摘自[珊姗是个小太阳的知乎回答](http://www.zhihu.com/question/20070065/answer/79557687)</div>

&emsp;**妹子说的对！

&emsp;github是一个基于git的代码托管平台，付费用户可以建私人仓库，我们一般的免费用户只能使用公共仓库，也就是代码要公开。

&emsp;Git本身完全可以做到版本控制，但其所有内容以及版本记录只能保存在本机，如果想要将文件内容以及版本记录同时保存在远程，则需要结合GitHub来使用。使用场景：
* 无GitHub：在本地 .git 文件夹内维护历时文件
* 有GitHub：在本地 .git 文件夹内维护历时文件，同时也将历时文件托管在远程仓库

## 我们能用GitHub做什么

&emsp;我们一直用GitHub作为免费的远程仓库，如果是个人的开源项目，放到GitHub上是完全没有问题的。其实GitHub还是一个开源协作社区，通过GitHub，既可以让别人参与你的开源项目，也可以参与别人的开源项目。

&emsp;在GitHub出现以前，开源项目开源容易，但让广大人民群众参与进来比较困难，因为要参与，就要提交代码，而给每个想提交代码的群众都开一个账号那是不现实的，因此，群众也仅限于报个bug，即使能改掉bug，也只能把diff文件用邮件发过去，很不方便。

&emsp;但是在GitHub上，利用Git极其强大的克隆和分支功能，广大人民群众真正可以第一次自由参与各种开源项目了。

### 小结

* 在GitHub上，可以任意Fork开源仓库；
* 自己拥有Fork后的仓库的读写权限；
* 可以推送pull request给官方仓库来贡献代码。
* 在GitHub上，可以建博客；
* 在GitHub上，可以写文档；

# 正文

## 一、注册 GitHub

1. 先去[GitHub官网](https://github.com)注册（Sign Up）个账号，注册页面如下：


## 一些 GitHub 的基本概念

### Overview 
&emsp;概览：包括Popular repositories（公开仓库）、contributions（你的提交记录）等

### Repository 

&emsp;仓库的意思，即你的项目。你想在 GitHub 上开源一个项目，那就必须要新建一个 Repository ，如果你开源的项目多了，你就拥有了多个 Repositories 。

### Star 
&emsp;这个好理解，就是你的项目获得的点赞数。但是在 GitHub 上的点赞远比微博、知乎点赞难的多，如果你有一个项目获得100个star都算很不容易了！

### Pull Request 
&emsp;发起请求，这个其实是基于 Fork 的，还是上面那个例子，如果别人在你基础上做了改进，后来觉得改进的很不错，应该要把这些改进让更多的人收益，于是就想把自己的改进合并到原有项目里，这个时候他就可以发起一个 Pull Request（简称PR） ，原有项目创建人就可以收到这个请求，这个时候他会仔细review你的代码，并且测试觉得OK了，就会接受你的PR，这个时候你做的改进原有项目就会拥有了。


### Issue 
&emsp;问题的意思，举个例子，就是你开源了一个项目，别人发现你的项目中有bug，或者哪些地方做的不够好，他就可以给你提个 Issue ，即问题，提的问题多了，也就是 Issues ，然后你看到了这些问题就可以去逐个修复，修复ok了就可以一个个的 Close 掉。

### Watch 
&emsp;这个也好理解就是观察，如果你 Watch 了某个项目，那么以后只要这个项目有任何更新，你都会第一时间收到关于这个项目的通知提醒。

### Fork 
&emsp;这个不好翻译，如果实在要翻译我把他翻译成分叉，什么意思呢？你开源了一个项目，别人想在你这个项目的基础上做些改进，然后应用到自己的项目中，这个时候他就可以 Fork 你的项目，这个时候他的 GitHub 主页上就多了一个项目，只不过这个项目是基于你的项目基础（本质上是在原有项目的基础上新建了一个分支，分支的概念后面会在讲解Git的时候说到），他就可以随心所欲的去改进，但是丝毫不会影响原有项目的代码与结构。

### Gist 
&emsp;有些时候你没有项目可以开源，只是单纯的想分享一些代码片段，那这个时候 Gist 就派上用场了

&emsp;如何参与一个开源项目呢？

&emsp;比如人气极高的bootstrap项目，这是一个非常强大的CSS框架，你可以访问它的项目主页`https://github.com/twbs/bootstrap`，点“Fork”就在自己的账号下克隆了一个bootstrap仓库，然后，从自己的账号下clone：

> clone git@github.com:michaelliao/bootstrap.git

&emsp;一定要从自己的账号下clone仓库，这样你才能推送修改。如果从bootstrap的作者的仓`it@github.com:twbs/bootstrap.git`克隆，因为没有权限，你将不能推送修改。

* 如果你想修复bootstrap的一个bug，或者新增一个功能，立刻就可以开始干活，干完后，往自己的仓库推送。
* 如果你希望bootstrap的官方库能接受你的修改，你就可以在GitHub上发起一个pull request。当然，对方是否接受你的pull request就不一定了。

* 如果你没能力修改bootstrap，但又想要试一把pull request，那就Fork一下廖雪峰老师的仓库`https://github.com/michaelliao/learngit`，创建一个your-github-id.txt的文本文件，写点自己学习Git的心得，然后推送一个pull request给我，我会视心情而定是否接受。

### 小结
* 在GitHub上，可以任意Fork开源仓库；

* 自己拥有Fork后的仓库的读写权限；

* 可以推送pull request给官方仓库来贡献代码。

# 总结 

&emsp;路漫漫其修远兮，希望Git及GitHub可以帮我们记录每一个脚印，每一步成长。与诸君共勉。

&emsp;祝大家2019更上一层楼！

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/Git%E5%91%BD%E4%BB%A4%E5%85%A5%E9%97%A8.md)**

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="wzh" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。