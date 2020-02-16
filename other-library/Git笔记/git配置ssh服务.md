@[git配置ssh服务](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/git%E9%85%8D%E7%BD%AEssh%E6%9C%8D%E5%8A%A1.md)
> create by **db** on **2020-2-16 18:49:26**   
> Recently revised in **2020-2-16 18:49:31**

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/git%E9%85%8D%E7%BD%AEssh%E6%9C%8D%E5%8A%A1.md)**

# 前言

&emsp;在管理Git项目上，很多时候都是直接使用`https url`克隆到本地，当然也有有些人使用`SSH url`克隆到本地。

&emsp;这两种方式的主要区别在于：

- 使用`https url`克隆对初学者来说会比较方便，复制`https url`然后到git Bash里面直接用clone命令克隆到本地就好了，但是每次fetch和push代码都需要输入账号和密码，这也是https方式的麻烦之处。

- 而使用`SSH url`克隆却需要在克隆之前先配置和添加好`SSH key`，因此，如果你想要使用`SSH url`克隆的话，你必须是这个项目的拥有者。否则你是无法添加`SSH key`的，另外ssh默认是每次fetch和push代码都不需要输入账号和密码，如果你想要每次都输入账号密码才能进行fetch和push也可以另外进行设置。

&emsp;下面主要是讲述如何配置使用ssh方式来提交和克隆代码。

# 正文
## 配置本机ssh

### 一、确定的是你的电脑上是安装过Git

打开`cmd`，查看git版本：

```
输入：git --version
显示：git version 2.20.1.windows.1
```

&emsp;如果显示类似`git version 2.20.1.windows.1`的Git版本，说明你的电脑是安装过Git的；否则请左转[打开Git的正确姿势](https://juejin.im/post/5c2743f7e51d45673971ce6c#heading-4)，把Git安装完了再来，不送。

### 二、查看是否配置了git用户名和邮箱
```
输入：git config user.name
显示：用户名
输入：git config user.email
显示用户邮箱
```
如果没有配置，那么需要配置用户名和邮箱：

```
输入：git config --global user.name "xxx"

输入：git config --global user.email "xxx"
```

### 三、查看是否配置过SSH Key(密钥)
```
输入：cd ~/.ssh
输入：ls，
```
&emsp;查看该文件下的文件，看是否存在 `id_isa` 和 `id_isa.pub` 文件（也可以是别的文件名，只要 `yourName` 和 `yourName.pub` 成对存在就可以），如果存在的话，证明已经存在 ssh key了，可以直接跳过`4、生成SSH Key`这一步骤，

### 四、生成SSH Key(密钥)
```
输入: ssh-keygen -t rsa -C "你的邮箱"
```
&emsp;此处会提示`Enter file in which to save the key (/Users/shutong/.ssh/id_rsa):`这样一段内容,让我们输入文件名，如果第3步的文件存在的话最好在这里修改一下文件名以防覆盖之前的内容；如果第3步的文件不存在的话则直接按`enter`键就好了。

&emsp;之后会有提示你是否需要设置密码，如果设置了每次使用Git都会用到密码，一般都是直接不写为空，直接`enter`就好了。

&emsp;上述操作执行完毕后，在`~/.ssh/`目录会生成`XXX-rsa`(私钥)和`XXX-rsa.pub`(公钥)，它们默认的存储路径是：
 > C:\Users\Administrator\.ssh  

**注意**
> 个人建议生成的rsa最好单独命名不要使用默认名称，因为有可能sshkey可能会用在多个地方，一不小心就可能被覆盖然后导致git功能异常
> 
### 五、添加公钥到你的远程仓库（github） 

#### 1 、查看你生成的公钥：
```
输入：cat ~/.ssh/id_rsa.pub
```
&emsp;这里会把公钥显示出来，我们把这段内容复制出来。

#### 2、添加公钥到远程仓库:

&emsp;登陆你的github帐户 -> 点击你的头像，然后点击  `Settings` -> 左栏点击 `SSH and GPG keys` -> 点击 `New SSH key`

&emsp;然后将复制的公钥内容，粘贴进`Key`文本域内。 `title`域，自己随便起个名字。

&emsp;点击 `Add SSH key`。

#### 2、查看 ssh文件是否配置成功
```
输入： ssh -T git@github.com
输出： Hi danygitgit! You've successfully authenticated, but GitHub does not provide shell access.
```
&emsp;恭喜你，你的设置已经成功了。

### 六、修改git的remote url

&emsp;如果之前添加的是`HTTPS`协议的github仓库地址，那么每次push或者pull仍然需要密码，所以，我们需要将其修改为`ssh`协议的，这样，就不需要这么麻烦了。

&emsp;那么我们应该怎么办呢？

#### 1、查看当前的 remote url

&emsp;首先进入本地仓库，右键 -> `Git Bash Here`
```
输入： git remote -v
输出： origin https://github.com/danygitgit/document-library.git (fetch)
输出： origin https://github.com/danygitgit/document-library.git (push)
```
&emsp; 如果是以上的结果那么说明此项目是使用`https`协议进行访问的（如果地址是git开头则表示是`git`协议）

#### 2、复制远程仓库的ssh链接

&emsp;登陆你的远程仓库，在上面可以看到你的ssh协议相应的url，类似：

> git@github.com:danygitgit/document-library.git

复制此ssh链接。

#### 2、修改git的remote url

方法有三种：

1. 修改命令
   
> git remote origin set-url [url]

1. 先删后加

> git remote rm origin
> git remote add origin [url]

3. 直接修改`config`文件
  
&emsp;找到仓库下 `.git` 文件夹下的`config`文件，打开，可以看到以下内容

 > [core] repositoryformatversion = 0 filemode = false bare = false logallrefupdates = true symlinks = false ignorecase = true[remote "origin"] url =https://github.com/danygitgit/document-library.git fetch = +refs/heads/*:refs/remotes/origin/*[branch "master"] remote = origin merge = refs/heads/master 

&emsp;将文件中的 `url =https://github.com/danygitgit/document-library.git `更改为 `url = git@github.com:danygitgit/document-library.git` 即可。

&emsp;修改后的文件如下

 > [core] repositoryformatversion = 0 filemode = false bare = false logallrefupdates = true symlinks = false ignorecase = true[remote "origin"] url = git@github.com:danygitgit/document-library.git fetch = +refs/heads/*:refs/remotes/origin/*[branch "master"] remote = origin merge = refs/heads/master 

&emsp;以后，不管是push还是pull，你都不需要再提交密码了。

### 七、Sourcetree配置ssh密钥

&emsp;`SourceTree`是一款git管理可视化工具，就不需要繁琐的敲打命令行了。个人比较推荐，无论在windows环境还是mac的os环境。[官网链接](https://www.sourcetreeapp.com/)

&emsp;关于`SourceTree`的安装及配置就不赘述了，具体请参考
- [Git SourceTree 免登陆安装及配置 生成ssh](https://blog.csdn.net/wangjiangrong/article/details/80287041)
- [SOURCETREE 3.1.3 版本跳过BITBUCKET注册方法（亲测好用） | 淡忘&天涯](https://www.cnblogs.com/liuxin-673855200/p/11151835.html)
- [Sourcetree配置ssh密钥](https://jingyan.baidu.com/article/9faa7231cdec65473d28cb11.html)


# 总结 

&emsp;磨刀不误砍柴工。勇于尝试，善于总结。开启你的Git踩坑之旅吧！
  
&emsp;路漫漫其修远兮，希望Git可以帮我们记录每一个脚印，每一步成长。与诸君共勉。

&emsp;祝大家2020更上一层楼！

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/git%E9%85%8D%E7%BD%AEssh%E6%9C%8D%E5%8A%A1.md)**

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
