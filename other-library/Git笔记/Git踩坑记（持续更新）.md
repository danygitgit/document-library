@[Git踩坑记](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/Git%E8%B8%A9%E5%9D%91%E8%AE%B0%EF%BC%88%E6%8C%81%E7%BB%AD%E6%9B%B4%E6%96%B0%EF%BC%89.md)
> create by **db** on **2018-12-25 12:10:36**   
> Recently revised in **2019-1-8 09:33:45**

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/Git%E5%91%BD%E4%BB%A4%E5%85%A5%E9%97%A8.md)**

# 前言

&emsp;成长之路从不是一帆风顺的，作为Git新手，难免会遇到一些小坑。但只要有耐心，没有什么是解决不了的。

&emsp;在此，记录一下自己遇到的一些小问题以及解决方案。其中有好多方法都是在大神博客汇总的，以免自己以后找不到。在此，向那些大神致以诚挚的谢意。

&emsp;作为一只前端菜鸟，这是我掘金分享的第三篇文章。如有不足，还请多多指教，谢谢大家。

# 正文

## 1、使用git在本地创建一个项目的过程

1. `$ makdir ~/hello-world` //创建一个项目目录hello-world
2. `$ cd ~/hello-world` //进入这个项目目录
3. `$ git init` //初始化，创建版本库 
4. `$ touch README` //创建README文件
5. `$ git add README` //将README文件添加到暂存区
6. `$ git commit -m 'first commit'` //提交更新到仓库，并注释信息“first commit”
7. `$ git remote add origin git@github.com:dedsf/hello-world.git` //连接远程github项目  
8. `$ git push -u origin master`  //将本地项目更新到github项目上去

## 2、多人多分支协作项目中的大体流程

### 1、下载远程仓库代码至本地修改（多人协作）

1. `git clone -b [分支名] [仓库位置]` //下载远程仓库代码至本地
2. `git checkout [分支名]`  //切换到所需分支
3. `git checkout -b [个人本地分支名]` //创建并切换到个人本地分支

- 注：更改代码的时候，在个人本地分支进行更改，需上传时再更新并合并

### 2、项目中代码上传（多人协作）

1. `git add .`  //添加代码至暂存区
2. `git commit -m "注释"` //提交更新至仓库
3. `git checkout [分支名]`  //切换到所需分支
4. `git merge [个人本地分支名]` //合并个人本地分支
5. `git pull origin [分支名]` //拉去远程仓库代码刷新分支
6. `git push origin [分支名]` // 上传本地分支至远程仓库
7. `git branch -d [个人本地分支名]` //删除个人本地分支

 - 注：若5冲突，解决并重复1~7

## 3、ssh链接不上GitHub

&emsp;如果输入`$ ssh -T git@github.com`，出现错误提示：`Permission denied (publickey)`，因为新生成的key不能加入ssh就会导致连接不上github。

- 解决办法如下：

1. 先输入`$ ssh-agent`，再输入`$ ssh-add ~/.ssh/id_key`，这样就可以了。

2. 如果还是不行的话，输入`ssh-add ~/.ssh/id_key` 命令后出现报错`Could not open a connection to your authentication agent`.解决方法是key用Git Gui的ssh工具生成，这样生成的时候key就直接保存在ssh中了，不需要再ssh-add命令加入了，其它的user，token等配置都用命令行来做。

3. 最好检查一下在你复制id_rsa.pub文件的内容时有没有产生多余的空格或空行，有些编辑器会帮你添加这些的。

## 4、提交错误

&emsp;如果输入`$ git push origin master`，提示出错信息：`error:failed to push som refs to .......`

- 解决办法如下：

1. 先输入`$ git pull origin master` //先把远程服务器github上面的文件拉下来
2. 再输入`$ git push origin master`

## 5、删除分支

删除分支的时候一定要切换到其他分支，再执行

1. `git branch -D <barnchName>` //切换分支
2. `git branch -d [branch-name]`  //删除分支

## 6、 重命名文件件或文件夹，并将此更改上传

1. - `git mv -f [oldfolder] [newfolder]`  //更改文件夹名称
   - `git mv [foldername tempname] && git mv [tempname folderName]`  //
   在大小写不敏感的系统中，如windows，重命名文件的大小写,使用临时文件名
   - 更改文件名称，需带路径或进入该文件所在文件夹
2. `git add -u [newfolder]` //-u选项会只更新已经追踪的文件和文件夹
3. `git commit -m "changed the foldername whaddup"` //提交更改

## 7、删除文件夹，并将此更改上传

1. `git rm -r --cached [folderName]` 
2. `git commit -m '删除了folderName'`  
3. `git push -u origin [分支名]`  

## 8、git add -u与-A .三者的区别

- 添加当前目录下的所有存在更改文件到暂存区
- （包括提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件）
> <font color=red> $ git add .</font>

- 添加已经被add的文件且存在更改的文件（Git根路径以下所有文件）到暂存区
- （提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)）
> $ git add -u

- 添加所有变化（Git根路径以下所有文件）到暂存区
- （包括提交新文件(new)、被修改(modified)文件以及被删除(deleted)文件）
> <font color=red> $ git add --all</font>

> <font color=red> $ git add -A</font> // 简写

## 9、git回退版本并提交

1. 直接找到要回退的版本号（这里是：83ff2785），reset之后，强行推送到服务器端

> git reset --hard 83ff2785

> git push --force

2. 此时如果有人获取了更新的版本，可能拉去不下来，执行以下操作：

> git fetch --all

> git reset --hard origin/branchname

&emsp;&emsp;branchname就是分支的名称，这时候就和服务器端一致了。

## 小结

* 勇于尝试，善于总结。开启你的Git踩坑之旅吧！

# 总结 
&emsp;&emsp;路漫漫其修远兮，希望Git及GitHub可以帮我们记录每一个脚印，每一步成长。与诸君共勉。

&emsp;祝大家2019更上一层楼！

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/Git%E5%91%BD%E4%BB%A4%E5%85%A5%E9%97%A8.md)**

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="wzh" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
