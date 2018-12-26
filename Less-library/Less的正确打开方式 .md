@[Less笔记](这里写自定义目录标题)

# 前言

## CSS短板

&emsp;&emsp;作为前端学习者的我们，或多或少都要学习一些CSS，它作为前端开发三大基石之一，时刻引领着Web的发展方向。而CSS作为一门标语言，可能给初学者的印象是简单易懂，毫无逻辑，而且选择器及样式重复率高，不像编程该有的样子。在语法更新时，每当CSS新属性的提出，又会成为浏览器的兼容性问题的绊脚石。一言以蔽之，CSS的短板不容忽视。
<br>
&emsp;&emsp;问题的诞生往往伴随着新技术的兴起，在Web飞速发展的这几年，为了让CSS富有逻辑性，更有效率，涌现出了一些神奇的预处理语言。它们让CSS彻底变成一门可以使用变量、循环、继承、自定义方法等多种特性的标记语言，逻辑性得到大大的增强。

## 预处理语言的诞生

- **Sass**
> Sass诞生于2007年，Ruby编写，其功能及语法都十分全面，可以说完全把CSS变成了一门编程语言，在国内外都十分受欢迎。是一门非常优秀的的预处理语言。
- **Stylus**
> Stytus诞生于2010年，来自Node.js社区，其语法功能与Sass不相伯仲，是一门十分独特的创新型语言。
- **Less**
> Less诞生于2009年，受Sass影响创建的一个开源项目。它扩充了CSS语言，增加了诸如变量、混合、函数等功能，让CSS更易于维护、方便。

## 预处理语言的选择

&emsp;&emsp;这是一个十分纠结的问题。
<br>
&emsp;&emsp;在网上讨论看来，Sass 与 Stylus 相比于 Less 功能更为丰富，但对于学习成本以及适应时间 ，Less 稍胜一筹。Less 没有去掉任何 CSS 的功能，而是在现有的语法上，增添了许多额外的功能特性，所以学习 Less 是一件非常舒服的事情。
<br>
&emsp;&emsp;如果你之前没有接触过预处理语言，纠结应该学哪一个，不如先看看 下面 Less 的介绍，我相信你会爱上它的。

## Less的正确打开方式 

1. 在页面中引用Less.js
可以在[官网](https://www.css88.com/doc/less/#)下载或者使用[CDN](//cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js)
```javascript
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script>
```
需要注意的是，link标签一定要在引入Less.js之前引入，并且link标签的的rel属性要设置为stylesheet/less
```javascript
<link rel="stylesheet/less" herf="style.less">
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script>
```
2. 在命令行，使用Node包管理工具npm来安装:
```javascript
npm install -g less 
```
一旦安装完成，就可以在命令行中调用，例如:
```javascript
lessc styles.less
```
这样的话编译后的CSS将会输出到 'stdout' 中，你可以选择将这个输出重定向到文件中:
```javascript
$ lessc styles.less > styles.css
```
详细步骤请参考官方文档
* 如果你在本地环境，可以使用第一种方式，非常简单；但在生产环境中，性能非常重要，最好使用第二种方式

# 正文
* Less的功能特性
## 变量（Variables）
&emsp;&emsp;我们常常在CSS中看到同一个值重复出现了了很多次，这样不仅降低效率，还使得代码难以维护。
<br>
&emsp;&emsp;**变量**通过为你提供一种在一个地方管理这些值的方法让你的代码变得更容易维护（值得一提的是，其变量是常量 ，所以只能定义一次，不能重复使用。
### 值变量
以@开头定义变量，并且使用时直接键入@名称
```less
/* less */
//定义值变量
@color: #999; 
@bgColor: skyblue; //不要添加引号
@width: 50%;
//使用值变量
#warp { 
  color: @color;
  width: @width;
}

/* 生成后的CSS */
 #wrap {
  color: #999;
  width: 50%;
}
```
在平时工作中，我们可以把变量封装到一个文件中，这样有利于代码的组织维护。
```less
@lightPrimaryColor: #c5cae9;
@textPrimaryColor: #fff;
@accentColor: rgb(99,137,185;
@primaryTextColor: #646464;
@secondaryTextColor: #000;
@dividerColor: #b6b6b6;
@borderColor: #dadada;
```
### 选择器及属性变量 
让选择器或者属性名变成动态值
```less
/* Less */
//定义选择器变量
@mySelector: #wrap;
@Wrap: wrap;
@{mySelector}{ //变量名 必须使用大括号包裹
  color: #999;
  width: 50%;
}
.@{Wrap}{
  color:#ccc;
}
#@{Wrap}{  
  color:#666;
}

/* 生成的 CSS */
#wrap{ 
  color: #999;
  width: 50%;
}
.wrap{
  color:#ccc;
}
#wrap{  
  color:#666;
}
```
### url变量
项目结构修改时，改变其变量名就好
```less
/* Less */
@images: "../img";//需要加引号
body {
  background: url("@{images}/dog.png");//变量名 必须使用大括号包裹
}

/* 生成的 CSS */
body {
  background: url("../img/dog.png");
}
    
```
### 声明变量
类似于混合方法
```less
-结构：@name: { 属性：值 }
-使用：@name()
```
```less
 /* Less */
@background: {background:red;};
#main{
  @background();
}
@Rules:{
  width: 200px;
  height: 200px;
  border: solid 1px red;
};
#con{
  @Rules();
}

/* 生成的 CSS */
#main{
  background:red;
}
#con{
  width: 200px; 
  height: 200px;
  border: solid 1px red;
}
```
### 变量运算
任何数值，颜色和变量都可以进行运算，=-*/都可以，计算一方带单位就好
```less
/* Less */
@width:300px;
@color:#222;
#wrap{
  width:@width-20;
  height:@width-20*5;
  margin:(@width-20)*5;
  color:@color*2;
  background-color:@color + #111;
}

/* 生成的 CSS */
#wrap{
  width:280px;
  height:200px;
  margin:1400px;
  color:#444;
  background-color:#333;
}   
```
### 变量的作用域
延迟加载，块级作用域
<br>Less 中的作用域与编程语言中的作用域概念非常相似。首先会在局部查找变量和混合，如果没找到，编译器就会在父作用域中查找，依次类推。
```less
/* Less */
@var: @a;
@a: 100%;
#wrap {
  width: @var;
  @a: 9%;
}

/* 生成的 CSS */
#wrap {
  width: 9%;
}
```
## 嵌套（Nested）
模仿了 HTML 的结构，代码更简洁
```less
/* Less */
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}

/* 生成的 CSS */
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```
### & 的妙用
& ：代表的上一层选择器的名字，此例便是header
* 要点：
  `.` 与 `#` 皆可作为 方法前缀。
  方法后写不写 `()` 看个人习惯。
```Less
/* Less */
#header{
  &:after{
    content:"Less is more!";
  }
  .title{
    font-weight:bold;
  }
  &_content{//理解方式：直接把 & 替换成 #header
    margin:20px;
  }
}
/* 生成的 CSS */
#header:after{
  content:"Less is more!";
}
#header .title{ //嵌套了
  font-weight:bold;
}
#header_content{//没有嵌套！
    margin:20px;
}
```
## 混合（Mixins）
混合就是一种将一系列属性从一个规则集引入(“混合”)到另一个规则集的方式。
### 普通混合（无参数）
方法犹如 声明的集合，使用时 直接键入名称即可
```less
/* Less */
.card { // 等价于 .card()
    background: #f6f6f6;
    -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
    box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
}
#wrap{
  .card;//等价于.card();
}
/* 生成的 CSS */
#wrap{
  background: #f6f6f6;
  -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
  box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
}
```
### 传参混合
Less 可以使用默认参数，如果 没有传参数，那么将使用默认参数。
<br>
@arguments 犹如 JS 中的 arguments 指代的是 全部参数。
<br>
传的参数中 必须带着单位。
```less
/* Less */
.border(@a:10px,@b:50px,@c:30px,@color:#000){
  border:solid 1px @color;
  box-shadow: @arguments;//指代的是 全部参数
}
#main{
  .border(0px,5px,30px,red);//必须带着单位
}
#wrap{
  .border(0px);
}
#content{
  .border;//等价于 .border()
}

/* 生成的 CSS */
#main{
  border:solid 1px red;
  box-shadow:0px,5px,30px,red;
}
#wrap{
  border:solid 1px #000;
  box-shadow: 0px 50px 30px #000;
}
#content{
  border:solid 1px #000;
  box-shadow: 10px 50px 30px #000;
}  
```
### 方法的匹配模式
以某个参数作为匹配符，与面向对象中的多态很相似
```less
/* Less */
.triangle(top,@width:20px,@color:#000){
  border-color:transparent  transparent @color transparent ;
}
.triangle(right,@width:20px,@color:#000){
  border-color:transparent @color transparent  transparent ;
}

.triangle(bottom,@width:20px,@color:#000){
  border-color:@color transparent  transparent  transparent ;
}
.triangle(left,@width:20px,@color:#000){
  border-color:transparent  transparent  transparent @color;
}
.triangle(@_,@width:20px,@color:#000){
  border-style: solid;
  border-width: @width;
}
#main{
  .triangle(left, 50px, #999)
}
/* 生成的 CSS */
#main{
  border-color:transparent  transparent  transparent #999;
  border-style: solid;
  border-width: 50px;
}
```
* 要点
```less
  - 第一个参数 `left` 要会找到方法中匹配程度最高的，如果匹配程度相同，将全部选择，并存在着样式覆盖替换。

  - 如果匹配的参数 是变量，则将会匹配，如 `@_` 。
```
### 方法的命名空间
让方法更加规范
```less
/* Less */
#card(){
  background: #723232;
  .d(@w:300px){
    width: @w;
        
    #a(@h:300px){
      height: @h;//可以使用上一层传进来的方法
      width: @w;
    }
  }
}
#wrap{
  #card > .d > #a(100px); // 父元素不能加 括号
}
#main{
  #card .d();
}
#con{
  //不得单独使用命名空间的方法
  //.d() 如果前面没有引入命名空间 #card ，将会报错
    
  #card; // 等价于 #card();
  .d(20px); //必须先引入 #card
}
/* 生成的 CSS */
#wrap{
  height:100px;
  width:300px;
}
#main{
  width:300px;
}
#con{
  width:20px;
}
```
* 要点
```less
  - 在 CSS 中`>` 选择器，选择的是 儿子元素，就是 必须与父元素 有直接血源的元素。
  - 在引入命令空间时，如使用 `>` 选择器，父元素不能加 括号。
  - 不得单独使用命名空间的方法 必须先引入命名空间，才能使用 其中方法。
  - 子方法 可以使用上一层传进来的方法
```
### 方法的条件筛选
Less 没有 if else，可是它有 when
```less
/* Less */
#card{      
  // and 运算符 ，相当于 与运算 &&，必须条件全部符合才会执行
  .border(@width,@color,@style) when (@width>100px) and(@color=#999){
    border:@style @color @width;
  }
  // not 运算符，相当于 非运算 !，条件为 不符合才会执行
  .background(@color) when not (@color>=#222){
    background:@color;
  }
  // , 逗号分隔符：相当于 或运算 ||，只要有一个符合条件就会执行
  .font(@size:20px) when (@size>50px) , (@size<100px){
      font-size: @size;
  }
}
#main{
  #card>.border(200px,#999,solid);
  #card .background(#111);
  #card > .font(40px);
}
/* 生成后的 CSS */
#main{
  border:solid #999 200px;
  background:#111;
  font-size:40px;
}
```
* 要点
```less
  - 比较运算有： > >= = =< <。
  - = 代表的是等于
  - 除去关键字 true 以外的值都被视为 false：
```
### 数量不定的参数
如果你希望你的方法接受数量不定的参数，你可以使用... ，犹如 ES6 的扩展运算符
```less
/* Less */
.boxShadow(...){
  box-shadow: @arguments;
}
.textShadow(@a,...){	
  text-shadow: @arguments;
}
#main{
  .boxShadow(1px,4px,30px,red);
  .textShadow(1px,4px,30px,red);
}

/* 生成后的 CSS */
#main{
  box-shadow: 1px 4px 30px red;
  text-shadow: 1px 4px 30px red;
}
```
### 方法使用important！
使用方法 非常简单，在方法名后 加上关键字即可。
```less
/* Less */
.border{
  border: solid 1px red;
  margin: 50px;
}
#main{
  .border() !important;
}
/* 生成后的 CSS */
#main {
  border: solid 1px red !important;
  margin: 50px !important;
}
```
### 实战技巧
下面是官网中的一个非常赞的 Demo
```less
/* Less */
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}

div {
  .average(16px, 50px); // 调用 方法
  padding: @average;    // 使用返回值
}

/* 生成的 CSS */
div {
  padding: 33px;
}
```
可以说 Less 是一门优雅编程语言。
## 继承
extend 是 Less 的一个伪类。它可继承 所匹配声明中的全部样式。
<br>
**特点**：性能高，灵活度低，不能传参，无括号。
### extend 关键字的使用
```less
/* Less */
.animation{
  transition: all .3s ease-out;
  .hide{
    transform:scale(0);
  }
}
#main{
    &:extend(.animation);
}
#con{
  &:extend(.animation .hide);
}

/* 生成后的 CSS */
.animation,#main{
  transition: all .3s ease-out;
}
.animation .hide , #con{
  transform:scale(0);
}
```
### 减少代码的重复性
从表面看来，extend 与 方法 最大的差别，就是 extend 是同个选择器共用同一个声明，而 方法 是使用自己的声明，这无疑 增加了代码的重复性。
<br>
方法示例 与上面的 extend 进行对比：
```less
/* Less */
.Method{
  width: 200px;
  &:after {
    content:"Less is good!";
  }
}
#main{
  .Method;
}
#wrap{
  .Method;
}

/* 生成的 CSS */
#main{
  width: 200px;
  &:after{
    content:"Less is good!";
  }  
}
#wrap{
  width: 200px;
  &:after{
    content:"Less is good!";
  }  
}
```
- 要点
  - 选择器和扩展之间 是允许有空格的：pre:hover :extend(div pre).
  - 可以有多个扩展: pre:hover:extend(div pre):extend(.bucket tr) - 注意这与 pre:hover:extend(div pre, .bucket tr)一样。
这是不可以的，扩展必须在最后 : pre:hover:extend(div pre).nth-child(odd)。
  - 如果一个规则集包含多个选择器，所有选择器都可以使用extend关键字。
## 导入
### 文件导入
1. 导入less文件可省略后缀
```javascript
import "main";
// 等价于
import "main.less";
```
2. @omport 的位置可以随意放置
```less
#main {
  font-size:150px;
}
@import "style"
```
### reference
Less中最强大的特性
<br>
使用@import (reference)导入外部文件，但不会添加 把导入的文件 编译到最终输出中，只引用。
```less
/* Less */
@import (reference) "bootstrap.less"; 

#wrap:extend(.navbar all){}
```
### once
@import语句的默认行为。这表明相同的文件只会被导入一次，而随后的导入文件的重复代码都不会解析。
```less
@import (once) "foo.less";
@import (once) "foo.less"; // this statement will be ignored
```
### multiple
使用@import (multiple)允许导入多个同名文件。
```less
/* Less */   
// file: foo.less
.a {
  color: green;
}
// file: main.less
@import (multiple) "foo.less";
@import (multiple) "foo.less";
   
/* 生成后的 CSS */
.a {
  color: green;
}
.a {
  color: green;
}
```
## 函数
### 判断类型
1. **isnumber**
 判断给定的值 是否 是一个数字。
 ```less
  isnumber(#ff0);     // false
  isnumber(blue);     // false
  isnumber("string"); // false
  isnumber(1234);     // true
  isnumber(56px);     // true
  isnumber(7.8%);     // true
  isnumber(keyword);  // false
  isnumber(url(...)); // false
```
2. **iscolor**
> 判断给定的值是否是一个颜色。
3. **isurl**
> 判断给定的值是否是一个 url。
### 颜色操作
1. **saturate** 
> 增加一定数值的颜色饱和度。 
2. **lighten**
> 降低一定数值的颜色亮度。
3. **darken**
> 降低一定数值的颜色亮度。
4. **fade**
> 给颜色设定一定数值的透明度。
5. **mix** 
> 根据比例混合两种颜色。
### 数学函数
1. **ceil** 
> 向上取整。 
2. **floor** 
> 向下取整。
3. **percentage** 
> 将浮点数转换为百分比字符串。
4. **round** 
> 四舍五入。
5. **abs** 
> 计算数字的绝对值，原样保持单位。
由于文章篇幅有限，所以只能介绍一些使用效率高的函数。
如果你想了解更多，可以去官网的[函数链接](http://lesscss.cn/functions/)
## 其他
### 注释
- /* */ 
> CSS原生注释，会被编译到CSS文件中
- // 
>Less提供的注释，不会被编辑到CSS中
### 避免编译
结构： `~' 值 '`
```less
/* Less */
#main{
  width:~'calc(300px-30px)';
}

/* 生成后的 CSS */
#main{
  width:calc(300px-30px);
}
```
### 使用JS
因为 Less 是由 JS 编写，所以 Less 有一得天独厚的特性：代码中使用 Javascript 。
```less
/* Less */
@content:`"aaa".toUpperCase()`;
#randomColor{
  @randomColor: ~"rgb(`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`)";
}
#wrap{
  width: ~"`Math.round(Math.random() * 100)`px";
  &:after{
      content:@content;
  }
  height: ~"`window.innerHeight`px";
  alert:~"`alert(1)`";
  #randomColor();
  background-color: @randomColor;
}
/* 生成后的 CSS */

// 弹出 1
#wrap{
  width: 随机值（0~100）px;
  height: 743px;//由电脑而异
  background: 随机颜色;
}
#wrap::after{
  content:"AAA";
}
```

