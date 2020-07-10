1、绝对定位（常用于登录模块）
备注：前提条件div需要有宽高
```html
<div class="box"></div>
#css
.box{
position:absolute/fixed;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;
}
```
 

2、margin负值
备注：前提条件div需要有宽高

```html
<div class="box"></div>
#css
.box{
width:200px;
height: 200px;
position: absolute;
left:50%;
top:50%;
margin-left:-100px;
margin-top:-100px;
}
```
 

3、css3 transform
备注：用于不确定当前div的宽度和高度

复制代码
```html
<div class="box"></div>
#css
.box{
position: absolute;
left:50%;
top:50%;
transform: translate(-50%, -50%);
}
```
复制代码
4、flex 布局方式

```html
<div class="box">
<div class="child">child</div>
</div>
#css
.box{
display:flex;
align-items:center;
justify-content:center;
}
```　

5、table-cell 方式

```html
<div class="box">
<div class="child">child</div>
</div>
<style>
.box{
display: table-cell;
vertical-align: middle;
text-align: center;
}
</style>
```