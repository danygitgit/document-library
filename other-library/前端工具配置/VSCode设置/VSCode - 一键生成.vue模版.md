@[VSCode - 一键生成.vue模版](https://github.com/danygitgit/document-library/blob/master/other-library/%E9%94%AE%E7%9B%98%E5%BF%AB%E6%8D%B7%E9%94%AE%E7%AC%94%E8%AE%B0.md)

> create by **db** on **2020-1-16 14:25:40**   
> Recently revised in **2020-1-16 16:23:23**

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/other-library/%E9%94%AE%E7%9B%98%E5%BF%AB%E6%8D%B7%E9%94%AE%E7%AC%94%E8%AE%B0.md)**

# 前言


# 正文

## 新建模板配置文件`vue.json`

&emsp;有三个方法,用哪个都行：

- 使用快捷`Ctrl` + `Shift` + `P`唤出控制台，然后输入`snippets`并选择,输入 `vue.json` ，然后回车。

- `文件`>`首选项`>`用户代码片断`里面，输入 `vue.json` ，然后回车 

- `file` > `Preferences` > `User Snippets`，当弹出搜索框之后，输入 `vue.json` ，然后回车
 
## 更改模板内容

&emsp;将`vue.json`文件替换以下模板内容（可根据个人需求修改当中的模板内容）   
```json
{
  // Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and description. 
  // The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the same ids are connected.
  "Print to console": {
    "prefix": "vue",
    "body": [
      "<!-- 我的页面$1 -->",
      "<template>",
      "  <div class='my_page'>",
      "    <el-container>",
      "      <el-header>Header</el-header>",
      "      <el-main>Main</el-main>",
      "      <el-footer>Footer</el-footer>",
      "    </el-container>",
      "  </div>",
      "</template>",
      "",
      "<script>",
      "// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）",
      "// 例如：import 《组件名称》 from '《组件路径》'",
      "",
      "export default {",
      "  // import引入的组件需要注入到对象中才能使用",
      "  components: {},",
      "  data () {",
      "    // 这里存放数据",
      "    return {",
      "",
      "    }",
      "  },",
      "  // 监听属性 类似于data概念",
      "  computed: {},",
      "  // 监控data中的数据变化",
      "  watch: {},",
      "  // 生命周期 - 创建完成（可以访问当前this实例）",
      "  created () {",
      "",
      "  },",
      "  // 生命周期 - 挂载完成（可以访问DOM元素）",
      "  mounted () {",
      "",
      "  },",
      "  beforeCreate () { }, // 生命周期 - 创建之前",
      "  beforeMount () { }, // 生命周期 - 挂载之前",
      "  beforeUpdate () { }, // 生命周期 - 更新之前",
      "  updated () { }, // 生命周期 - 更新之后",
      "  beforeDestroy () { }, // 生命周期 - 销毁之前",
      "  destroyed () { }, // 生命周期 - 销毁完成",
      "  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发",
      "  // 方法集合",
      "  methods: {",
      "",
      "  }",
      "}",
      "</script>",
      "",
      "<style lang='less' scoped>",
      "//@import url($3); 引入公共css类",
      "$4",
      "</style>",
      ""
    ],
    "description": "Log output to console"
  }
}
```
## 模板使用

&emsp;新建一个 `test.vue` 文件，输入“`vue`”，按下`回车键`或者`Tab`键，模板就自动生成了



# 总结 

&emsp;


**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/other-library/Git%E7%AC%94%E8%AE%B0/Git%E5%91%BD%E4%BB%A4%E5%85%A5%E9%97%A8.md)**

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
