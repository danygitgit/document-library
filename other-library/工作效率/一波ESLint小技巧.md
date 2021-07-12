@[一波ESLint小技巧](https://github.com/danygitgit/document-library)

> create by **db** on **2019-10-28 16:31:00**   
> Recently revised in **2021-7-12 20:11:06**

&emsp; **Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

&emsp; 最近借鉴总结了一波ESLint的小技巧，以记录自己的学习心得。现分享给大家，以供参考。如有不足，还请多多指教，谢谢大家。

&emsp; 参考文档：

* [1-VScode格式化ESlint-方法（最全最好用方法！） | 简书-Guoyubo](https://www.jianshu.com/p/23a5d6194a4b)

* [我是如何在公司项目中使用ESLint来提升代码质量的 | 慕课网-码农土哥](https://www.imooc.com/article/32222)

* [vue-cli项目中 eslint语法检测在单文件中关闭检测的几种方式 | CSDN-csl125 ](https://blog.csdn.net/csl125/article/details/86591186)
# 前言

## 关于ESLint

&emsp; 在团队开发中，出于代码规范的考虑，我们通常按照ESlint规范书写代码。加入ESLint有非常多的好处，比如说可以帮助我们避免一些非常低级的错误，一些格式上的问题导致我们在运行生产环境的时候出现一些不明所以的报错。还有就是在跟团队协作的时候，每个人都保持同一个风格进行代码书写，这样团队内部相互去看别人的代码的时候，就可以更容易的看懂。

&emsp; 但有些低级的格式问题经常被死板的ESLint卡住。。。所以我们应该有个自动格式化工具。

# 正文

##  文件一键格式化

&emsp; vsCode有着丰富的插件资源。我们可以利用插件实现Vue文件的一键格式化。

&emsp; 首先安装插件：

1. ESlint
* javascript代码检测工具，可以配置每次保存时格式化js，但每次保存只格式化一点点，你得连续按住Ctrl+S好几次, 才格式化好，自行体会~~

2. vetur
* 可以格式化html、标准css（有分号 、大括号的那种）、标准js（有分号 、双引号的那种）、vue文件，
但是！格式化的标准js文件不符合ESlint规范，会给你加上双引号、分号等。

3. Prettier - Code formatter：
* 只关注格式化，并不具有eslint检查语法等能力，只关心格式化文件(最大长度、混合标签和空格、引用样式等)，包括JavaScript · Flow · TypeScript · CSS · SCSS · Less · JSX · Vue · GraphQL · JSON · Markdown
  
4. Manta's Stylus Supremacy
* 格式化stylus的插件（不用就不装），因为vetur会把css格式化有分号 、大括号的那种，此插件会把css格式化成stylus风格。

5. markdown-formatter
* 格式化markdown文件的插件（不用就不装）

&emsp; 然后，在vscode的 `文件` - `首选项` - `设置` 里，右侧配置里添加如下代码即可（代码有注释！），从此直接 `Shift+Alt+F` 就能一键格式化了。

```json
{
  // "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  "vetur.validation.template": false,
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.ts": "vscode-typescript",
  "window.zoomLevel": 2,
  "editor.tabSize": 2,
  "files.autoSave": "off",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "eslint.options": {
    "plugins": [
      "html"
    ]
  },
  "git.ignoreMissingGitWarning": true,
  // "git.autofetch": true
  "editor.wordWrap": "on",
  "search.location": "sidebar",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "liveServer.settings.donotShowInfoMsg": true,
  "liveServer.settings.donotVerifyTags": true,
  "workbench.colorCustomizations": {
    "activityBarBadge.background": "#2979FF",
    "list.activeSelectionForeground": "#2979FF",
    "list.inactiveSelectionForeground": "#2979FF",
    "list.highlightForeground": "#2979FF",
    "scrollbarSlider.activeBackground": "#2979FF50",
    "editorSuggestWidget.highlightForeground": "#2979FF",
    "textLink.foreground": "#2979FF",
    "progressBar.background": "#2979FF",
    "pickerGroup.foreground": "#2979FF",
    "tab.activeBorder": "#2979FF",
    "notificationLink.foreground": "#2979FF",
    "editorWidget.resizeBorder": "#2979FF",
    "editorWidget.border": "#2979FF",
    "settings.modifiedItemIndicator": "#2979FF",
    "settings.headerForeground": "#2979FF",
    "panelTitle.activeBorder": "#2979FF",
    "breadcrumb.activeSelectionForeground": "#2979FF",
    "menu.selectionForeground": "#2979FF",
    "menubar.selectionForeground": "#2979FF",
    "editor.findMatchBorder": "#2979FF",
    "selection.background": "#2979FF40"
  },
  "materialTheme.accent": "Blue",
  "terminal.integrated.rendererType": "dom",
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化 
  // "editor.formatOnSave": true,
  "editor.formatOnSave": false,
  // #每次保存的时候将代码按eslint格式进行修复
  // "eslint.autoFixOnSave": true,
  "eslint.autoFixOnSave": false,
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  //  #让prettier使用eslint的代码格式进行校验 
  "prettier.eslintIntegration": true,
  //  #去掉代码结尾的分号 
  "prettier.semi": false,
  //  #使用带引号替代双引号 
  "prettier.singleQuote": true,
  //  #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // #这个按用户自身习惯选择 
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // #让vue中的js按编辑器自带的ts格式进行格式化 
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
      // #vue组件中html代码格式化样式
    }
  },
  // 格式化stylus, 需安装Manta's Stylus Supremacy插件
  "stylusSupremacy.insertColons": false, // 是否插入冒号
  "stylusSupremacy.insertSemicolons": false, // 是否插入分好
  "stylusSupremacy.insertBraces": false, // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": false, // 两个选择器中是否换行
  "editor.fontSize": 18,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[markdown]": {
      "editor.defaultFormatter": "mervin.markdown-formatter"
  }
}
```

## 终端命令自动修复报错

&emsp; 在报很多错误之后，如果我们一条一条地去修复，就会变的非常的麻烦，相信刚接触ESLint的童鞋都深有体会。其实这些错误都可以让ESLint帮助我们自动地修复。

&emsp; 在命令行输入：

```
 npm run lint -- --fix
```

&emsp; 你会发现，世界一下安静了许多，没有那么多飘红的报错，没有满屏的error和warning。

## 手动关闭项目eslint检测

&emsp; eslint当然可以手动关闭的，虽然不建议这样做。

&emsp; 我们进入 `bulid/webpack.base.conf.js` 中，找到ESlint的检验方法 `createLintingRule` , 将其方法内容注释掉，就可以成功关闭ESlint啦。

&emsp; 如下：

```js
const createLintingRule = () => ({
    // test: /\.(js|vue)$/,
    // loader: 'eslint-loader',
    // enforce: 'pre',
    // include: [resolve('src'), resolve('test')],
    // options: {
    //   formatter: require('eslint-friendly-formatter'),
    //   emitWarning: !config.dev.showEslintErrorsInOverlay
    // }
})
```

&emsp; 你会发现，世界一下安静了许多，没有那么多飘红的报错，没有满屏的error和warning。

## 组件内关闭eslint检测

&emsp; 直接在代码文件中以注释的方式定义 需要注意的是，代码文件内以注释配置的规则会覆盖配置文件里的规则，即优先级要更高。

### 某个文件

#### 在整个文件中取消eslint检查：

```javaScript
/* eslint-disable */

// Disables all rules for the rest of the file 
alert(‘foo’);
```

#### 在整个文件中禁用某一项eslint规则的检查：

```javaScript
/* eslint-disable no-alert */

// Disables no-alert for the rest of the file 
alert(‘foo’);
```

### 某段代码

#### 临时在一段代码中取消eslint检查，可以如下设置： 

```javaScript
/* eslint-disable */

// Disables all rules between comments 
alert(‘foo’);

/* eslint-enable */
```

#### 临时在一段代码中取消个别规则的检查（如no-alert, no-console）：

```javaScript
/* eslint-disable no-alert, no-console */

// Disables no-alert and no-console warnings between comments 
alert(‘foo’);
console.log(‘bar’);

/* eslint-enable no-alert, no-console */
```

### 某行代码

#### 针对某一行禁用eslint检查：

```javaScript
alert(‘foo’); // eslint-disable-line

// eslint-disable-next-line 
alert(‘foo’);
```

#### 针对某一行的某一具体规则禁用eslint检查：

```javaScript
alert(‘foo’); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert 
alert(‘foo’);
```

#### 针对某一行禁用多项具体规则的检查：

```javaScript
alert(‘foo’); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi 
alert(‘foo’);
```

# 总结 

&emsp; ……其实都是些取巧的小方法。

&emsp; 路漫漫其修远兮，与诸君共勉。

&emsp; PMP，必胜！！！

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
